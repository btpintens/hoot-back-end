import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

router.get('/sign-token', (req, res) => {
  const user = {
    _id: 1,
    username: 'test',
    password: 'test'
  }

  const token = jwt.sign({ user }, process.env.JWT_SECRET);
  
  res.json({ token });
});

router.post('/verify-token', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    res.json({ decoded });
  } catch (err) {
    res.status(401).json({ err: 'Invalid token.' });
  }
});

export default router;
