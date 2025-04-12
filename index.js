const express = require('express');
const cors = require('cors'); // Only need to import it once
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
