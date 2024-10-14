const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

// Crear la conexión con la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Cambia esto si tienes otro usuario
  password: '', // Cambia esto si tienes contraseña
  database: 'app_database', // Nombre de la base de datos
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Ruta para registrar un nuevo usuario
app.post('/api/register', (req, res) => {
  const { id, password, role } = req.body;

  if (!id || !password) {
    return res.status(400).json({ message: 'ID y contraseña son requeridos' });
  }

  // Verificar si el usuario ya existe
  const checkUserQuery = 'SELECT * FROM users WHERE id = ?';
  db.query(checkUserQuery, [id], (err, results) => {
    if (err) {
      console.error('Error al verificar el usuario:', err);
      return res.status(500).json({ message: 'Error del servidor' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Insertar el nuevo usuario en la base de datos
    const insertUserQuery = 'INSERT INTO users (id, password, role) VALUES (?, ?, ?)';
    db.query(insertUserQuery, [id, password, role || 'usuario'], (err, result) => {
      if (err) {
        console.error('Error al registrar el usuario:', err);
        return res.status(500).json({ message: 'Error del servidor' });
      }
      res.status(201).json({ message: 'Usuario registrado correctamente' });
    });
  });
});

// Ruta para iniciar sesión
app.post('/api/login', (req, res) => {
  const { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).json({ message: 'ID y contraseña son requeridos' });
  }

  const loginQuery = 'SELECT * FROM users WHERE id = ? AND password = ?';
  db.query(loginQuery, [id, password], (err, results) => {
    if (err) {
      console.error('Error al iniciar sesión:', err);
      return res.status(500).json({ message: 'Error del servidor' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    res.status(200).json(results[0]); // Devolver el usuario
  });
});

// Guardar ciclo seleccionado
app.post('/api/seleccionar-ciclo', (req, res) => {
  const { admin_id, ciclo_seleccionado } = req.body;

  const sql = 'INSERT INTO admin_ciclos (admin_id, ciclo_seleccionado) VALUES (?, ?)';
  db.query(sql, [admin_id, ciclo_seleccionado], (err, result) => {
    if (err) {
      console.error('Error al guardar el ciclo seleccionado:', err);
      return res.status(500).json({ message: 'Error al guardar el ciclo' });
    }
    res.status(201).json({ message: 'Ciclo seleccionado guardado correctamente' });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
