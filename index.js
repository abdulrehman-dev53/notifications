import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import admin from "./firebase.js";
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.post("/send", async (req, res) => {
  try {
    const { token, title, body } = req.body;
    if (!token || !title || !body) {
      return res.status(400).json({ error: "token, title, and body are required" });
    }
    const message = {
      token,
      notification: { title, body },
      android: { priority: "high" },
    };
    const response = await admin.messaging().send(message);
    console.log("Notification sent successfully:", response);
    res.json({ success: true, messageId: response });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ error: error.message });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
