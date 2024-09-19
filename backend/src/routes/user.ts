import { Router } from 'express';
import pool from '../db';

const userRouter = Router();

// Obtener todos los usuarios (Solo admin)
userRouter.get('/', async (req, res) => {
  const [users] = await pool.query('SELECT * FROM user WHERE us_role = "user"');
  res.status(200).send(users);
});

// Eliminar usuario
userRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM user WHERE us_id = ?', [id]);
  res.status(200).send({ message: 'Usuario eliminado' });
});

export default userRouter;
