const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "mySuperSecretKey"; // use .env in real projects

//Route 1: Create user
router.post(
  '/',
  [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      // 1. Validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
      }

      const { name, email, password } = req.body;

      // 2. Check existing user
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ error: "User already exists" });
      }

      // 3. Hash password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);

      // 4. Create user
      user = await User.create({
        name,
        email,
        password: secPass
      });

      // 5. JWT payload
      const data = {
        user: {
          id: user.id
        }
      };

      // 6. Generate token
      const authtoken = jwt.sign(data, JWT_SECRET);

      // 7. Response
      res.json({ success: true, authtoken });

    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

//Route 2: Authentication user
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, error: "Invalid credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ success: false, error: "Imansinvalid credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    };

    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ success: true, authtoken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//Route 3 getuser
//Route 3: Get logged in user details
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);   // 👈 THIS WAS MISSING
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

