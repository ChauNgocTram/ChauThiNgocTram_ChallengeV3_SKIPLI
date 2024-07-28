const express = require('express');
const app = express();

const userRoutes = require('./routes/userRoutes');
const contentRoutes = require('./routes/contentRoutes');



app.use('/api/users', userRoutes);
app.use('/api/content', contentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
