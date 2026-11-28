export const evaluateCondition = (
  value,
  operator,
  threshold
) => {

  switch (operator) {

    case "greaterThan":
      return value > threshold;

    case "lessThan":
      return value < threshold;

    case "equalTo":
      return value === threshold;

    case "greaterThanOrEqual":
      return value >= threshold;

    case "lessThanOrEqual":
      return value <= threshold;

    default:
      throw new Error("Unsupported operator");
  }
};