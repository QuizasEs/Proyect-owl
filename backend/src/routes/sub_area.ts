import { Router } from 'express';
import pool from '../db';

const subAreaRouter = Router();

// Obtener todas las sub_áreas
subAreaRouter.get('/', async (req, res) => {
  const [subAreas] = await pool.query('SELECT * FROM sub_area WHERE sub_estado = 1');
  res.status(200).send(subAreas);
});

// Agregar nueva sub_área
subAreaRouter.post('/', async (req, res) => {
  const { sub_nombre, area_id } = req.body;
  await pool.query('INSERT INTO sub_area (sub_nombre, area_id, sub_estado) VALUES (?, ?, 1)', [sub_nombre, area_id]);
  res.status(201).send({ message: 'Sub-área agregada' });
});

// Editar sub_área existente
subAreaRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { sub_nombre } = req.body;
  await pool.query('UPDATE sub_area SET sub_nombre = ? WHERE sub_id = ?', [sub_nombre, id]);
  res.status(200).send({ message: 'Sub-área actualizada' });
});

// Eliminar sub_área
subAreaRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM sub_area WHERE sub_id = ?', [id]);
  res.status(200).send({ message: 'Sub-área eliminada' });
});

export default subAreaRouter;
