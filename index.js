const express = require('express');
const cors = require('cors'); // Only need to import it once
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://instagram-mern-app-fe.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));


app.use(express.json());

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
