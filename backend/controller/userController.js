import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { ErrorHandler } from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { generateToken } from "../utlils/jwtToken.js"
import { sendEmail } from "../utlils/sendEmail.js";
import crypto from "crypto"

export const register = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Avatar and resume are  Required!", 400));
  }
  const { avatar, resume } = req.files;

  const cloudinaryAvatar = await cloudinary.uploader.upload(
    avatar.tempFilePath,
    { folder: "Avatars" }
  );
  if (!cloudinaryAvatar || cloudinaryAvatar.error) {
    console.error(
      "cloudinary Error :",
      cloudinaryAvatar.error || "Unknown Cloudinary Error"
    );
  }
  const cloudinaryResume = await cloudinary.uploader.upload(
    resume.tempFilePath,
    { folder: "My_Resume" }
  );
  if (!cloudinaryResume || cloudinaryResume.error) {
    console.error(
      "cloudinary Error :",
      cloudinaryResume.error || "Unknown Cloudinary Error"
    );
  }

  const {
    fullName,
    email,
    Phone,
    aboutMe,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    facebookURL,
    twitterURL,
    linkedInURL,
  } = req.body;

  const user = await User.create({
    fullName,
    email,
    Phone,
    aboutMe,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    facebookURL,
    linkedInURL,
    twitterURL,
    avatar: {
      public_id: cloudinaryAvatar.public_id,
      url: cloudinaryAvatar.secure_url,
    },
    resume: {
      public_id: cloudinaryResume.public_id,
      url: cloudinaryResume.secure_url,
    },
  });

  generateToken(user, "User Registerd", 201, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new ErrorHandler("Email and Password are required"));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    next(new ErrorHandler(" Invalid Email or password"));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    next(new ErrorHandler(" Invalid Email or password"));
  }

  generateToken(user, "Logged In", 200, res);
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged Out",
    });
});

export const getUser = catchAsyncErrors(async (req, res, next) => {
  console.log("User ID from req.user:", req.user?.id); // Check if user ID is present

  if (!req.user) {
    console.error("No user found in request object!");
    return next(new ErrorHandler("User not authenticated", 401));
  }

  const user = await User.findById(req.user.id);
  
  if (!user) {
    console.error("User not found in MongoDB!");
    return next(new ErrorHandler("User not found", 404));
  }

  console.log("User Data:", user); // Check what data is fetched

  res.status(200).json({
    success: true,
    user,
  });
});


export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    fullName: req.body.fullName,
    email: req.body.email,
    Phone: req.body.Phone,
    aboutMe: req.body.aboutMe,
    portfolioURL: req.body.portfolioURL,
    githubURL: req.body.githubURL,
    instagramURL: req.body.instagramURL,
    facebookURL: req.body.facebookURL,
    linkedInURL: req.body.linkedInURL,
    twitterURL: req.body.twitterURL,
  };

  if (req.files && req.files.avatar) {
    const avatar = req.files.avatar;
    const user = await User.findById(req.user.id);
    const profileImageId = user.avatar.public_id;
    await cloudinary.uploader.destroy(profileImageId);
    const cloudinaryRespone = await cloudinary.uploader.upload(
      avatar.tempFilePath,
      { folder: "Avatars" }
    );
    newUserData.avatar = {
      public_id: cloudinaryRespone.public_id,
      url: cloudinaryRespone.secure_url,
    };
  }

  if (req.files && req.files.resume) {
    const resume = req.files.resume;
    const user = await User.findById(req.user.id);
    const resumeId = user.resume.public_id;
    await cloudinary.uploader.destroy(resumeId);
    const cloudinaryRespone = await cloudinary.uploader.upload(
      resume.tempFilePath,
      { folder: "My_Resume" }
    );
    newUserData.resume = {
      public_id: cloudinaryRespone.public_id,
      url: cloudinaryRespone.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "profile updated",user,
  });
});

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { currentPassword, newPassword, comfirmPassword } = req.body;
  if (!currentPassword || !newPassword || !comfirmPassword) {
    return next(new ErrorHandler("please fill all feilds"), 400);
  }
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMAtched = await user.comparePassword(currentPassword);
  if (!isPasswordMAtched) {
    return next(new ErrorHandler("Incorrect Current password"), 400);
  }

  if (newPassword !== comfirmPassword) {
    return next(new ErrorHandler("Don't match password"), 400);
  }

  user.password = newPassword;
  await user.save();
  res.status(200).json({
    success:true,
    message:"Password Updated"
  })
});




export const getUserForPortfolio = catchAsyncErrors(async (req, res, next) => {
  // const {id} = req.params;
  // console.log(id);
  
  const id = "67a732d624fa5132fc636cf1";  // single user then uski id jo last m hofa 
  const user = await User.findById(id);
  res.status(200).json({
    success: true,
    user,
  });
});

// export const getUserForPortfolio = catchAsyncErrors(async (req, res, next) => {
//   try {
//     console.log("Authenticated User ID:", req.user?._id); // Debugging

//     if (!req.user) {
//       return res.status(401).json({ success: false, message: "Unauthorized. Please log in." });
//     }

//     const user = await User.findById(req.user._id);
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found." });
//     }

//     res.status(200).json({ success: true, user });
//   } catch (error) {
//     console.error("Error in getUserForPortfolio:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });
//FORGOT PASSWORD
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User Not Found!", 404));
  }
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.DASHBOARD_URL}/password/reset/${resetToken}`;

  const message = `Your Reset Password Token is:- \n\n ${resetPasswordUrl}  \n\n If 
  You've not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Personal Portfolio Dashboard Password Recovery`,
      message,
    });
    res.status(201).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//RESET PASSWORD
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.params.id;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(
        "Reset password token is invalid or has been expired.",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password & Confirm Password do not match"));
  }
  user.password = await req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  generateToken(user, "Reset Password Successfully!", 200, res);
});
