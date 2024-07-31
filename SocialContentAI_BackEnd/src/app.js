const express = require('express');
const app = express();
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const contentRoutes = require('./routes/contentRoutes');
app.use(cors());

app.use(express.json()); 

app.use('/api/users', userRoutes);
app.use('/api/content', contentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
