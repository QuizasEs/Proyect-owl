import { Router } from 'express';
import pool from '../db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  const { us_username, us_password, us_role } = req.body;
  const hashedPassword = await bcrypt.hash(us_password, 10);
  await pool.query('INSERT INTO user (us_username, us_password, us_role) VALUES (?, ?, ?)', [us_username, hashedPassword, us_role]);
  res.status(201).send({ message: 'User registered' });
});

authRouter.post('/login', async (req, res) => {
  const { us_username, us_password } = req.body;
  const [user] = await pool.query('SELECT * FROM user WHERE us_username = ?', [us_username]);

  if (!user || !(await bcrypt.compare(us_password, user.us_password))) {
    return res.status(401).send('Invalid credentials');
  }

  const token = jwt.sign({ id: user.us_id, role: user.us_role }, 'secret', { expiresIn: '1h' });
  res.status(200).send({ token });
});

export default authRouter;
