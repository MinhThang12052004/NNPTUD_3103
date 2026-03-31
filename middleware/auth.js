// Stub auth middleware - assumes req.user.id from JWT
// Replace with real implementation using jwt.verify

const mongoose = require('mongoose');
const auth = (req, res, next) => {
  try {
    // TODO: Implement real JWT verification
    // For demo/testing: hardcode current user ID
    req.user = { id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439011') }; // sample ObjectId
    
    // Real implementation example:
    // const token = req.header('Authorization')?.replace('Bearer ', '');
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = decoded;
    
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Không có quyền truy cập'
    });
  }
};

module.exports = auth;
