const express = require("express");
const errores = require("./ManejoErrores/ManejoErrores.js"); // Importar el módulo de manejo de errores
const { insertarUsuario, obtenerUsuarios, editarUsuario, eliminarUsuario, realizarTransferencia, obtenerTransferencias } = require("./consultas/consultas.js"); // Importar las funciones de consultas
const { Console } = require("console");
const app = express();
const port = process.env.PORT || 3000; // Utilizar el puerto especificado en las variables de entorno o el puerto 3000 por defecto

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Ruta para servir el archivo HTML
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Ruta para agregar un nuevo usuario
app.post("/usuario", async (req, res) => {
    try {
        const { nombre, balance } = req.body;
        console.log('nombre y balance: ', nombre, balance);

        // Verificar si los campos están vacíos
        if (!nombre || balance === undefined || isNaN(balance)) {
            throw { code: "DATOS_INCOMPLETOS" };
        }

        // Verificar si el usuario ya existe
        const usuarios = await obtenerUsuarios();
        if (usuarios.some(usuario => usuario.nombre === nombre)) {
            throw { code: "USR_EXISTENTE" };
        }

        // Verificar si el balance es negativo
        if (balance < 0) {
            throw { code: "BALANCE_INVALIDO" };
        }

        // Insertar el nuevo usuario
        const nuevoUsuario = await insertarUsuario(nombre, balance);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        errores(error, res);
    }
});

// Ruta para obtener todos los usuarios
app.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await obtenerUsuarios(); // Obtener todos los usuarios
        res.json(usuarios);
    } catch (error) {
        errores(error, res);
    }
});

// Ruta para editar un usuario
app.put("/usuario/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, balance } = req.body;

        // Verificar si los campos están vacíos
        if (!nombre || balance === undefined || isNaN(balance)) {
            throw { code: "DATOS_INCOMPLETOS" };
        }

        // Verificar si el balance es negativo
        if (balance < 0) {
            throw { code: "BALANCE_INVALIDO" };
        }

        // Editar el usuario
        await editarUsuario(id, nombre, balance);
        res.send(`El usuario con ID ${id} ha sido editado correctamente`);
    } catch (error) {
        errores(error, res);
    }
});

// Ruta para eliminar un usuario
app.delete("/usuario", async (req, res) => {
    try {
        const { id } = req.query;
        await eliminarUsuario(id); // Eliminar el usuario
        res.send(`El usuario con ID ${id} ha sido eliminado correctamente`);
    } catch (error) {
        errores(error, res);
    }
});

// Ruta para realizar una transferencia
app.post("/transferencia", async (req, res) => {
    try {
        const { emisor, receptor, monto } = req.body;
        console.log('emisor, receptor y monto: ', emisor, receptor, monto);

        // Verificar si los campos están vacíos
        if (!emisor || !receptor || monto === undefined || isNaN(monto)) {
            throw { code: "DATOS_INCOMPLETOS" };
        }

        // Verificar si el monto es negativo o cero
        if (monto <= 0) {
            throw { code: "MONTO_INVALIDO" };
        }

        // Verificar si el emisor tiene saldo suficiente
        const usuarios = await obtenerUsuarios();
        // console.log('valor de usuarios: ', usuarios);
        const saldoEmisor = usuarios.find(usuario => usuario.nombre === emisor);
        // console.log('valor de saldoEmisor: ', saldoEmisor);
        if (saldoEmisor.balance < monto) {
            throw { code: "SALDO_INSUFICIENTE" };
        }

        // Realizar la transferencia
        await realizarTransferencia(emisor, receptor, monto);
        res.send(`Transferencia realizada correctamente de ${emisor} a ${receptor}`);
    } catch (error) {
        errores(error, res);
    }
});

// Ruta para obtener todas las transferencias
app.get("/transferencias", async (req, res) => {
    try {
        const transferencias = await obtenerTransferencias(); // Obtener todas las transferencias
        res.json(transferencias);
    } catch (error) {
        errores(error, res);
    }
});

// Iniciar el servidor
app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}, el enlace es http://localhost:${port}`));
