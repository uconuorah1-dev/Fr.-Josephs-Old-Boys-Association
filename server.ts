import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import 'dotenv/config';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/send-verification-email", async (req, res) => {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: "Email and name are required." });
    }

    try {
      // Use configured SMTP or fallback to Ethereal (for testing)
      let transporter;
      
      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: process.env.SMTP_PORT === '465',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });
      } else {
        // Generate test SMTP service account from ethereal.email
        console.log("No SMTP configured. Falling back to Ethereal email for testing.");
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });
      }

      const info = await transporter.sendMail({
        from: '"Alumni Association" <noreply@alumni-association.org>',
        to: email,
        subject: "🎉 Registration Verified!",
        text: `Hello ${name},\n\nCongratulations! Your registration has been verified by the administrator. You are now officially recognized as a member of the Alumni Association.\n\nThank you for joining us!\n\nBest regards,\nThe Admin Team`,
        html: `
          <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
            <h2>Hello ${name},</h2>
            <p><strong>Congratulations!</strong> Your registration has been verified by the administrator.</p>
            <p>You are now officially recognized as a member of the Alumni Association.</p>
            <p>Thank you for joining us! We look forward to seeing you at our upcoming events.</p>
            <br/>
            <p>Best regards,</p>
            <p><strong>The Admin Team</strong></p>
          </div>
        `,
      });

      console.log("Message sent: %s", info.messageId);
      
      // Preview only available when sending through an Ethereal account
      const previewUrl = nodemailer.getTestMessageUrl(info);
      if (previewUrl) {
        console.log("Preview URL: %s", previewUrl);
      }

      res.json({ success: true, messageId: info.messageId, previewUrl });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
