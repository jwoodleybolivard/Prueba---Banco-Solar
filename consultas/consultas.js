const { Pool } = require('pg');
require('dotenv').config();

// Crear conexión a la base de datos utilizando variables de entorno
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// Función para insertar un nuevo usuario en la base de datos
async function insertarUsuario(nombre, balance) {
    try {
        const result = await pool.query({
            text: 'INSERT INTO usuarios (nombre, balance) VALUES ($1, $2) RETURNING *',
            values: [nombre, balance]
        });
        return result.rows[0];
    } catch (error) {
        throw error; // Lanzar error para ser manejado en el lugar donde se llama a la función
    }
}

// Función para obtener todos los usuarios de la base de datos
async function obtenerUsuarios() {
    try {
        const result = await pool.query({
            text: 'SELECT * FROM usuarios'
        });
        return result.rows;
    } catch (error) {
        throw error; // Lanzar error para ser manejado en el lugar donde se llama a la función
    }
}

// Función para editar un usuario en la base de datos
async function editarUsuario(id, nombre, balance) {
    try {
        const result = await pool.query({
            text: 'UPDATE usuarios SET nombre = $1, balance = $2 WHERE id = $3 RETURNING *',
            values: [nombre, balance, id]
        });
        return result.rows[0];
    } catch (error) {
        throw error; // Lanzar error para ser manejado en el lugar donde se llama a la función
    }
}

// Función para eliminar un usuario de la base de datos
async function eliminarUsuario(id) {
    try {
        const result = await pool.query({
            text: 'DELETE FROM usuarios WHERE id = $1 RETURNING *',
            values: [id]
        });
        return result.rows[0];
    } catch (error) {
        throw error; // Lanzar error para ser manejado en el lugar donde se llama a la función
    }
}

// Función para realizar una transferencia entre usuarios en la base de datos
async function realizarTransferencia(emisor, receptor, monto) {
    console.log('DB transferencia: ', emisor, receptor, monto);
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Restar el monto al emisor
        await client.query('UPDATE usuarios SET balance = balance - $1 WHERE id = $2', [monto, emisor]);
        // Sumar el monto al receptor
        await client.query('UPDATE usuarios SET balance = balance + $1 WHERE id = $2', [monto, receptor]);
        // Registrar la transferencia
        const result = await client.query('INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *', [emisor, receptor, monto]);

        await client.query('COMMIT');
        return result.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        throw error; // Lanzar error para ser manejado en el lugar donde se llama a la función
    } finally {
        client.release();
    }
}

// Función para obtener todas las transferencias de la base de datos
async function obtenerTransferencias() {
    try {
        const result = await pool.query({
            text: 'SELECT * FROM transferencias'
        });
        return result.rows;
    } catch (error) {
        throw error; // Lanzar error para ser manejado en el lugar donde se llama a la función
    }
}

module.exports = { insertarUsuario, obtenerUsuarios, editarUsuario, eliminarUsuario, realizarTransferencia, obtenerTransferencias, pool };
