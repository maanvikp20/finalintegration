const mongoose = require('mongoose');
/**
 * User Model for Authentication
 * Password is stored in hashed format NEVER PLAIN TEXT
 */

const userSchema = new mongoose.Schema(
  {
    name: {type:String, required:true, trim:true, maxLength:80},
    email: {type:String, required:true, trim:true, unique:true, lowercase:true},
    passwordHash: {type: String, required:true},
  },
  {timestamps: true}
)

module.exports = mongoose.models.User || mongoose.model("User", userSchema);