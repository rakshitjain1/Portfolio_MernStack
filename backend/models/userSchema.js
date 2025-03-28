import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto"

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Name Required"],
  },
  email: {
    type: String,
    required: [true, "Email Required"],
  },
  Phone: {
    type: String,
    required: [true, "Phone Number Required"],
  },
  aboutMe: {
    type: String,
    required: [true, "About Me field is Required"],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    minLength: [8, " password must contain at least 8 charcters"],
    select: false,
  },
  avatar: {
    public_id: {
      type:String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  portfolioURL: {
    type: String,
    required: [true, "portfolio URL is Required"],
  },
  githubURL: String,
  instagramURL: String,
  facebookURL: String,
  twitterURL: String,
  linkedInURL: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified or is new
  if (!this.isModified("password")) {
    return next();
  }
  try {
    // Hash the password with a salt round of 10
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error); // Pass errors to the next middleware
  }
});

// Method to compare provided password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Method to generate JSON Web Token
userSchema.methods.generateWebToken = function () {
  return jwt.sign(
    { id: this._id }, // Payload contains the user's unique ID
    process.env.JWT_SECRET_KEY, // Secret key from environment variables
    {
      expiresIn: process.env.JWT_EXPIRES, // Token expiration time from environment variables
    }
  );
}
userSchema.methods.getResetPasswordToken = function () {
  //Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hashing and Adding Reset Password Token To UserSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //Setting Reset Password Token Expiry Time
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};


export const User = mongoose.model("User", userSchema);
