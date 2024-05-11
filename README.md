
## Acceso a datos en aplicaciones Node 📦

En  esta  prueba  validaremos nuestros  conocimientos  de  Conectar  una  base  de  datos PostgreSQL con Node, Realizar consultas DML con Node y el paquete pg, Realizar consultas TCL con Node y el paquete pg, Construir una API RESTful  utilizando PostgreSQL para la persistencia de datos, Manejar errores y Manejar códigos de estado HTTP.
Para lograrlo, necesitarás utilizar el archivo Apoyo Prueba - Banco Solar.
Lee todo el documento antes de comenzar el desarrollo individual, para asegurarte de tener el máximo de puntaje y enfocar bien los esfuerzos

## Visual
![image](https://github.com/jwoodleybolivard/Prueba---Banco-Solar/assets/125617339/78406972-397c-41c5-9b10-5a921416eff6)

## Construido con 🛠️

* "express": "^4.19.2",
* "node": "^18.0.4",
* "pg": "^8.11.5",
* "morgan": "^1.10.0",

## Contribuyendo 🖇️

Las rutas que deberás crear son las siguientes:
●    / GET: Devuelve la aplicación cliente disponible en el apoyo de la prueba.
●    /usuario POST: Recibe los datos de un nuevo usuario y los almacena en PostgreSQL.
●    /usuarios GET: Devuelve todos los usuarios registrados con sus balances.
●    /usuario PUT: Recibe los datos modificados de un usuario registrado y los actualiza.
●    /usuario DELETE: Recibe el id de un usuario registrado y lo elimina .
●    /transferencia POST: Recibe los datos para realizar una nueva transferencia. Se debe ocupar una transacción SQL en la consulta a la base de datos.
●    /transferencias GET: Devuelve todas las transferencias almacenadas en la base de datos en formato de arreglo.
Para iniciar con la persistencia de datos se deben ocupar las siguientes instrucciones SQL:
* CREATE  DATABASE  bancosolar;
* CREATE  TABLE  usuarios (id  SERIAL PRIMARY KEY, nombre VARCHAR(50), balance FLOAT CHECK (balance >= 0));
* CREATE  TABLE  transferencias (id  SERIAL PRIMARY KEY, emisor INT, receptor INT, monto FLOAT, fecha TIMESTAMP, FOREIGN KEY  (emisor) REFERENCES usuarios(id), FOREIGN KEY  (receptor) REFERENCES  usuarios(id));

## Requerimientos 📌

1.   Utilizar el paquete pg para conectarse a PostgreSQL y realizar consultas DML para la gestión y persistencia de datos. (3 Puntos)
2.   Usar transacciones SQL para realizar el registro de las transferencias. ( 2 Puntos)
3.   Servir una API RESTful en el servidor con los datos de los usuarios almacenados en PostgreSQL. (3 Puntos)
4. Capturar  los  posibles  errores  que  puedan  ocurrir  a  través  de  bloques  catch  o parámetros de funciones callbacks para condicionar las funciones del servidor.        (1 Punto)
5.   Devolver correctamente los códigos de estado según las diferentes situaciones.      (1 Punto)

## Autor ✒️

* **Jean Woodley Bolivard** - *Trabajo Completo* - [enlace_al_perfil_de_GitHub](https://github.com/jwoodleybolivard)

## Licencia 📄

Sin licencia

## Expresiones de Gratitud 🎁

* Deja un Like 👍

---
⌨️ con ❤️ por [Nombre del Autor](https://github.com/jwoodleybolivard) 😊
