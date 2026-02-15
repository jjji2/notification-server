const express = require("express");
const admin = require("firebase-admin");

const app = express();
app.use(express.json());

// 🔥 এখানে পরে আমরা Firebase key বসাবো
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

app.post("/send", async (req, res) => {
  const { token, title, body } = req.body;

  try {
    await admin.messaging().send({
      token: token,
      notification: {
        title: title,
        body: body,
      },
    });

    res.status(200).send("Notification sent!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending notification");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
