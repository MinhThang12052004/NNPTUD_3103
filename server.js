require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/database');

// Load models after DB connection
connectDB();

// Force load models
require('./models/index');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('✅ Ready - Test: http://localhost:3000/api/messages');
});
