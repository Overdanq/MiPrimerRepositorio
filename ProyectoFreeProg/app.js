// Importación de la librería Express para la creación de la aplicación web
const express = require('express');

// Importación de la librería Path para manipulación de rutas de archivos y directorios
const path = require('path');

// Importación de la librería MySQL para la conexión y manipulación de la base de datos
const mysql = require('mysql');

// Creación de la aplicación Express
const app = express();

// Puerto en el que se ejecutará el servidor
const port = 3000; 

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2024',
    database: 'appbd'
});

// Conexión a la base de datos y manejo de errores
connection.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conexión exitosa a la base de datos.');
});

// Middleware para el análisis de datos de formularios codificados en URL
app.use(express.urlencoded({ extended: true }));

// Middleware para el análisis de datos JSON
app.use(express.json());

// Configuración para que la aplicación sirva archivos estáticos desde la carpeta 'pagina_principal'
app.use(express.static(path.join(__dirname, 'pagina_principal')));

// Ruta para manejar la solicitud de guardar un nuevo curso mediante POST
app.post('/guardar_curso',(req, res) => {
    // Extracción de los datos del cuerpo de la solicitud
    const { nombre, apellido, correo, direccion, cursos } = req.body;
    // Consulta SQL para insertar los datos del curso en la base de datos
    const sql = 'INSERT INTO Cursos (nombre, apellido, correo, direccion, cursos) VALUES (?, ?, ?, ?, ?)';
    // Ejecución de la consulta SQL
    connection.query(sql, [nombre, apellido, correo, direccion, cursos], (err, result) => {
        if (err) throw err;
        console.log('Curso inscrito correctamente.');
        res.redirect('/');
    });
});

// Ruta para obtener la lista de cursos mediante GET
app.get('/cursos', (req, res) => {
    // Consulta SQL para seleccionar todos los cursos de la base de datos
    connection.query('SELECT * FROM Cursos', (err, rows) => {
        if (err) throw err;
        // Envío de la lista de cursos como respuesta (puede ser HTML o JSON)
        res.send(rows);
    });
});

// Ruta para eliminar un curso mediante DELETE
app.delete('/eliminar_usuario/:id', (req, res) => {
    // Obtención del ID del curso a eliminar desde la URL
    const id = req.params.id;
    // Consulta SQL para eliminar el curso con el ID proporcionado
    const sql = 'DELETE FROM Cursos WHERE id = ?';
    // Ejecución de la consulta SQL
    connection.query(sql, [id], (err, result) => {
        if (err) throw err;
        console.log('Curso dado de baja correctamente.');
        res.sendStatus(200); 
    });
});

// Ruta para actualizar los datos de un curso mediante POST
app.post('/modificar_datos', (req, res) => {
    // Extracción de los datos del cuerpo de la solicitud
    const { id, nombre, apellido, correo, direccion, cursos } = req.body;
    // Consulta SQL para actualizar los datos del curso en la base de datos
    const sql = 'UPDATE Cursos SET nombre = ?, apellido = ?, correo = ?, direccion = ?, cursos = ? WHERE id = ?';
    // Ejecución de la consulta SQL
    connection.query(sql, [nombre, apellido, correo, direccion, cursos, id], (err, result) => {
        if (err) {
            console.error('Error al modificar los datos del usuario:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        console.log('Datos modificados correctamente.');
        res.redirect('/listardatos.html');
    });
});

// Ruta para obtener los datos de un curso por su ID mediante GET
app.get('/cursos/:id', (req, res) => {
    // Extracción del ID del curso desde la URL
    const id = req.params.id;
    // Consulta SQL para obtener los datos del curso con el ID proporcionado
    connection.query('SELECT * FROM Cursos WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Error al obtener los datos del usuario:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        if (result.length === 0) {
            res.status(404).send('Registro no encontrado');
            return;
        }
        // Envío de los datos del curso como respuesta en formato JSON
        res.json(result[0]);
    });
});

// Inicio del servidor en el puerto especificado
app.listen(port, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
