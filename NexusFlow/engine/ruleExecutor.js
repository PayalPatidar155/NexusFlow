
import { validateWorkflow } from "./validator.js";
import { compileWorkflow } from "./compiler.js";
import { evaluateCondition } from "./condition.js";
import { sendWebhook } from "./webhook.js";

export const executeWorkflow = async (workflow, telemetry) => {
  // 1. Validate workflow
  validateWorkflow(workflow);

  // 2. Compile workflow
  const executionOrder = compileWorkflow(workflow);

  let currentValue = telemetry.value;
  const results = [];

  // 3. Execute nodes
  for (const nodeId of executionOrder) {
    const node = workflow.nodes.find(
      (item) => item.id === nodeId
    );

    // Sensor Node
    if (node.type === "sensor") {
      currentValue = telemetry.value;
    }

    // Moving Average Node
    else if (node.type === "movingAverage") {
      const values = telemetry.values;
      const windowSize = node.data?.windowSize;

      if (
        !Array.isArray(values) ||
        !Number.isInteger(windowSize) ||
        windowSize < 1 ||
        values.length < windowSize ||
        values.some((value) => !Number.isFinite(value))
      ) {
        throw new Error("Invalid moving average input");
      }

      const window = values.slice(-windowSize);

      currentValue =
        window.reduce((sum, value) => sum + value, 0) /
        windowSize;

      results.push({
        nodeId,
        type: "movingAverage",
        value: currentValue
      });
    }

    // Math Node
    else if (node.type === "math") {
      const operation = node.data?.operation;
      const operand = node.data?.value;

      if (
        !Number.isFinite(currentValue) ||
        !Number.isFinite(operand)
      ) {
        throw new Error("Invalid math input");
      }

      switch (operation) {
        case "add":
          currentValue += operand;
          break;

        case "subtract":
          currentValue -= operand;
          break;

        case "multiply":
          currentValue *= operand;
          break;

        case "divide":
          if (operand === 0) {
            throw new Error("Division by zero is not allowed");
          }
          currentValue /= operand;
          break;

        default:
          throw new Error("Unsupported math operation");
      }

      results.push({
        nodeId,
        type: "math",
        operation,
        value: currentValue
      });
    }

    // Condition Node
    else if (node.type === "condition") {
      const passed = evaluateCondition(
        currentValue,
        node.data.operator,
        node.data.value
      );

      results.push({
        nodeId,
        type: "condition",
        passed
      });

      if (!passed) {
        break;
      }
    }

    // Alert Node
    else if (node.type === "alert") {
      results.push({
        nodeId,
        type: "alert",
        message: node.data.message,
        severity: node.data.severity,
        value: currentValue
      });
    }

    // Webhook Node
    else if (node.type === "webhook") {
      const webhookPayload = {
        message: node.data?.message || "NexusFlow alert",
        severity: node.data?.severity || "info",
        value: currentValue,
        nodeId,
        timestamp: new Date().toISOString()
      };

      const response = await sendWebhook(
        node.data?.url,
        webhookPayload
      );

      results.push({
        nodeId,
        type: "webhook",
        status: response.success ? "sent" : "failed",
        statusCode: response.status,
        message: response.success
          ? "Webhook sent successfully"
          : response.message,
        value: currentValue
      });
    }
  }

  // 4. Return execution result
  return {
    success: true,
    results
  };
};
