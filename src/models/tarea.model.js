let tareas = [
  { id: 1, titulo: 'Aprender Express', completada: false },
  { id: 2, titulo: 'Implementar MVC', completada: false },
  { id: 3, titulo: 'Probar API con Postman', completada: true }
];

let idActual = 4;

const obtenerTodas = () => {
  return tareas;
};

const obtenerPorId = (id) => {
  return tareas.find(tarea => tarea.id === id);
};

const buscarPorTitulo = (query) => {
  return tareas.filter(tarea => tarea.titulo.toLowerCase().includes(query.toLowerCase()));
};

const crear = (datosTarea) => {
  const nuevaTarea = {
    id: idActual++,
    titulo: datosTarea.titulo,
    completada: datosTarea.completada || false
  };
  tareas.push(nuevaTarea);
  return nuevaTarea;
};

const actualizarCompleta = (id, datosTarea) => {
  const indice = tareas.findIndex(t => t.id === id);
  if (indice === -1) return null;
  
  tareas[indice] = {
    id: id,
    titulo: datosTarea.titulo,
    completada: datosTarea.completada || false
  };
  return tareas[indice];
};

const actualizarParcial = (id, datosParciales) => {
  const indice = tareas.findIndex(t => t.id === id);
  if (indice === -1) return null;
  
  tareas[indice] = {
    ...tareas[indice],
    ...datosParciales,
    id: id
  };
  return tareas[indice];
};

const eliminar = (id) => {
  const indice = tareas.findIndex(t => t.id === id);
  if (indice === -1) return null;
  
  const tareaEliminada = tareas[indice];
  tareas.splice(indice, 1);
  return tareaEliminada;
};

module.exports = {
  obtenerTodas,
  obtenerPorId,
  buscarPorTitulo,
  crear,
  actualizarCompleta,
  actualizarParcial,
  eliminar
};
