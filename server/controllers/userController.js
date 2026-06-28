const User = require('../models/User');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');


const updateAddress = async (req,res)=>{

  try{

    const user =
      await User.findByIdAndUpdate(

        req.params.id,

        {
          address:req.body
        },

        {
          new:true
        }

      );

    res.json(user);

  }

  catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};
// REGISTER USER
// CHANGE PASSWORD
const changePassword = async (req, res) => {

    try {

        const {
            currentPassword,
            newPassword
        } = req.body;

        const user = await User.findById(
            req.params.id
        );

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        const isMatch =
            await bcrypt.compare(

                currentPassword,

                user.password

            );

        if (!isMatch) {

            return res.status(400).json({

                message:
                    "Current password is incorrect"

            });

        }

        const salt =
            await bcrypt.genSalt(10);

        user.password =
            await bcrypt.hash(

                newPassword,

                salt

            );

        await user.save();

        res.json({

            message:
                "Password changed successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};



const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // Check existing user
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        // Generate salt
        const salt = await bcrypt.genSalt(10);

        // Hash password
        const hashedPassword = await bcrypt.hash(
            password,
            salt
        );

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};



// LOGIN USER
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid Email'
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid Password'
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            token,
            user: {
  _id: user._id,
  name: user.name,
  email: user.email,
  isAdmin: user.isAdmin
}
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


const getUsers = async (req,res)=>{

  try{

    const users =
      await User.find()

      .select("-password");

    res.json(users);

  }

  catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};


module.exports = {

    registerUser,

    loginUser,

    updateAddress,

    changePassword,

    getUsers

};