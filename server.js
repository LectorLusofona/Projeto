const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(cors());
const upload = multer({ dest: 'uploads/' });

const transporter = nodemailer.createTransport({
  host: 'smtp.elasticemail.com',
  port: 2525,
  
  auth: {
    user: 'n352279@gmail.com', // Your Elastic Email account email
    pass: '49784C222C659E50CB3BB33C0E4E5D1FEC8BE7F9C78E7468F40AD5DC693D7C54CBC31446BFEEBC7C92DAA9A0D03ACE93', // API key from Elastic Email
  },
});

app.post('/send-email', upload.array('attachments'), async (req, res) => {
  try {
    const { to, subject, text } = req.body;
    const attachments = req.files.map(file => ({
      filename: file.originalname,
      path: file.path,
    }));

    await transporter.sendMail({
      from: '"Sender" <n352279@gmail.com>',
      to,
      subject,
      text,
      attachments,
    });

    res.status(200).json({ message: "Email sent!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(4000, () => console.log("Server running on port 4000"));