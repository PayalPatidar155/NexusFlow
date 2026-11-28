
import axios from "axios";

export const sendWebhook = async (url, payload) => {
  try {
    if (!url || typeof url !== "string") {
      throw new Error("Webhook URL is required");
    }

    const parsedUrl = new URL(url);

    // Only HTTPS webhooks are allowed
    if (parsedUrl.protocol !== "https:") {
      throw new Error("Only HTTPS webhook URLs are allowed");
    }

    // Allow only configured webhook hosts
    const allowedHosts = (
      process.env.WEBHOOK_ALLOWED_HOSTS || ""
    )
      .split(",")
      .map((host) => host.trim().toLowerCase())
      .filter(Boolean);

    if (!allowedHosts.includes(parsedUrl.hostname.toLowerCase())) {
      throw new Error("Webhook host is not allowed");
    }

    const response = await axios.post(url, payload, {
      timeout: 5000,
      maxRedirects: 0,
      maxContentLength: 1024 * 1024,
      maxBodyLength: 1024 * 1024,
      headers: {
        "Content-Type": "application/json"
      }
    });

    return {
      success: true,
      status: response.status,
      data: response.data
    };

  } catch (error) {
    return {
      success: false,
      message: error.message,
      status: error.response?.status || null
    };
  }
};
