// Función para manejo de errores
const errores = (error, res) => {
    // Se define un objeto para mapear códigos de error a mensajes descriptivos
    const errorMessages = {
        '28P01': "Error de autenticación: la contraseña es incorrecta o el usuario no existe.",
        '42P01': "La tabla especificada no existe.",
        '3D000': "La base de datos especificada no existe.",
        '42601': "Error de sintaxis en la instrucción SQL.",
        '4005': "Favor revisa los datos de conexión a la base de datos, al parecer una de ellas viene vacía.",
        '400': "Ninguno de los datos especificados puede estar vacío.",
        'ENOTFOUND': "No se puede encontrar el valor especificado como localhost.",
        'ECONNREFUSED': "Error de conexión al puerto de la base de datos.",
        'USR_EXISTENTE': "El usuario ya existe.",
        'BALANCE_INVALIDO': "El balance no puede ser negativo.",
        'DATOS_INCOMPLETOS': "Todos los campos son obligatorios.",
        'SALDO_INSUFICIENTE': "El emisor no tiene saldo suficiente para realizar la transferencia.",
        'default': "Error interno del servidor."
    };

    // Se obtiene el código de error del objeto error
    const errorCode = error.code || 'default';
    // Se obtiene el mensaje correspondiente al código de error
    const errorMessage = errorMessages[errorCode] || `Error interno del servidor. Código: ${errorCode}`;

    // Mostrar el mensaje de error y/o alguna otra pista para descubrir el error
    console.error(errorMessage);

    // Enviar una respuesta con el código de error y un mensaje genérico
    res.status(500).json({
        code: errorCode,
        message: errorMessage,
        hint: "Revisa los registros del servidor para obtener más detalles."
    });
};

module.exports = errores;
