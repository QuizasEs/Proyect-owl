import { Router } from 'express';
import pool from '../db';

const areaRouter = Router();

// Obtener todas las áreas
areaRouter.get('/', async (req, res) => {
  const [areas] = await pool.query('SELECT * FROM area WHERE area_estado = 1');
  res.status(200).send(areas);
});

// Agregar nueva área
areaRouter.post('/', async (req, res) => {
  const { area_nombre } = req.body;
  await pool.query('INSERT INTO area (area_nombre, area_estado) VALUES (?, 1)', [area_nombre]);
  res.status(201).send({ message: 'Área agregada' });
});

// Editar área existente
areaRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { area_nombre } = req.body;
  await pool.query('UPDATE area SET area_nombre = ? WHERE area_id = ?', [area_nombre, id]);
  res.status(200).send({ message: 'Área actualizada' });
});

// Eliminar área
areaRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM area WHERE area_id = ?', [id]);
  res.status(200).send({ message: 'Área eliminada' });
});

export default areaRouter;
