const express = require('express');
const tareaController = require('../controllers/tarea.controller');
const router = express.Router();

router.get('/buscar', tareaController.buscar);
router.get('/', tareaController.obtenerTodas);
router.get('/:id', tareaController.obtenerPorId);
router.post('/', tareaController.crear);
router.put('/:id', tareaController.actualizarCompleta);
router.patch('/:id', tareaController.actualizarParcial);
router.delete('/:id', tareaController.eliminar);

module.exports = router;
