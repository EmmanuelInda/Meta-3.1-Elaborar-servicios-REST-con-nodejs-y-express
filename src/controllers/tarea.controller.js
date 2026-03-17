const tareaModel = require('../models/tarea.model');

const obtenerTodas = (req, res) => {
  try {
    const tareas = tareaModel.obtenerTodas();
    const formato = req.query.formato;

    if (formato === 'text') {
      let texto = "--- LISTA DE TAREAS ---\n\n";
      tareas.forEach(t => {
        texto += `ID: ${t.id} | Titulo: ${t.titulo} | Completada: ${t.completada}\n`;
      });
      return res.type('text/plain').send(texto);
    }

    res.json({
      success: true,
      data: tareas,
      count: tareas.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener las tareas',
      error: error.message
    });
  }
};

const buscar = (req, res) => {
  try {
    const q = req.query.q;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'El parametro de busqueda "q" es requerido'
      });
    }

    const tareas = tareaModel.buscarPorTitulo(q);
    
    res.json({
      success: true,
      data: tareas,
      count: tareas.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en la busqueda',
      error: error.message
    });
  }
};

const obtenerPorId = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID invalido. Debe ser un numero'
      });
    }
    
    const tarea = tareaModel.obtenerPorId(id);
    if (!tarea) {
      return res.status(404).json({
        success: false,
        message: `Tarea con ID ${id} no encontrada`
      });
    }
    
    res.json({
      success: true,
      data: tarea
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener la tarea',
      error: error.message
    });
  }
};

const crear = (req, res) => {
  try {
    const { titulo, completada } = req.body;
    if (!titulo) {
      return res.status(400).json({
        success: false,
        message: 'El campo "titulo" es requerido'
      });
    }
    
    const nuevaTarea = tareaModel.crear({ titulo, completada });
    res.status(201).json({
      success: true,
      message: 'Tarea creada exitosamente',
      data: nuevaTarea
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear la tarea',
      error: error.message
    });
  }
};

const actualizarCompleta = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { titulo, completada } = req.body;
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID invalido. Debe ser un numero'
      });
    }
    if (!titulo) {
      return res.status(400).json({
        success: false,
        message: 'El campo "titulo" es requerido'
      });
    }
    
    const tareaActualizada = tareaModel.actualizarCompleta(id, { titulo, completada });
    if (!tareaActualizada) {
      return res.status(404).json({
        success: false,
        message: `Tarea con ID ${id} no encontrada`
      });
    }
    
    res.json({
      success: true,
      message: 'Tarea actualizada completamente',
      data: tareaActualizada
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar la tarea',
      error: error.message
    });
  }
};

const actualizarParcial = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const datosParciales = req.body;
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID invalido. Debe ser un numero'
      });
    }
    if (Object.keys(datosParciales).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Debe enviar al menos un campo para actualizar'
      });
    }
    
    const tareaActualizada = tareaModel.actualizarParcial(id, datosParciales);
    if (!tareaActualizada) {
      return res.status(404).json({
        success: false,
        message: `Tarea con ID ${id} no encontrada`
      });
    }
    
    res.json({
      success: true,
      message: 'Tarea actualizada parcialmente',
      data: tareaActualizada
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar la tarea',
      error: error.message
    });
  }
};

const eliminar = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID invalido. Debe ser un numero'
      });
    }
    
    const tareaEliminada = tareaModel.eliminar(id);
    if (!tareaEliminada) {
      return res.status(404).json({
        success: false,
        message: `Tarea con ID ${id} no encontrada`
      });
    }
    
    res.json({
      success: true,
      message: 'Tarea eliminada exitosamente',
      data: tareaEliminada
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la tarea',
      error: error.message
    });
  }
};

module.exports = {
  obtenerTodas,
  buscar,
  obtenerPorId,
  crear,
  actualizarCompleta,
  actualizarParcial,
  eliminar
};
