const express = require('express');
const app = express();
const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/user');
require('./config/initdb');

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})