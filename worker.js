export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }

    const headers = {
      ...cors,
      "Content-Type": "application/json"
    };

    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({ message: "Hamza Tech API is running!" }),
        { headers }
      );
    }

    try {
      const data = await request.json();

      const name = String(data.name || "").trim();
      const email = String(data.email || "").trim();
      const message = String(data.message || "").trim();

      if (!name || !email || !message) {
        return new Response(
          JSON.stringify({ error: "All fields are required." }),
          { status: 400, headers }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: "Message received successfully!"
        }),
        { status: 200, headers }
      );
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid request." }),
        { status: 400, headers }
      );
    }
  }
};
