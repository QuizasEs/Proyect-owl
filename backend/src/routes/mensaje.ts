import { Router } from 'express';
import pool from '../db';

const mensajeRouter = Router();

// Obtener todos los mensajes
mensajeRouter.get('/', async (req, res) => {
  const [mensajes] = await pool.query('SELECT * FROM mensaje WHERE mensaje_estado = 1');
  res.status(200).send(mensajes);
});

// Agregar nuevo mensaje
mensajeRouter.post('/', async (req, res) => {
  const { mensaje_contenido } = req.body;
  await pool.query('INSERT INTO mensaje (mensaje_contenido, mensaje_estado) VALUES (?, 1)', [mensaje_contenido]);
  res.status(201).send({ message: 'Mensaje agregado' });
});

// Eliminar mensaje
mensajeRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM mensaje WHERE mensaje_id = ?', [id]);
  res.status(200).send({ message: 'Mensaje eliminado' });
});

export default mensajeRouter;
