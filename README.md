# Administración de E-commerce

Este proyecto tiene como objetivo desarrollar un sistema de administración para un e-commerce. El sistema permitirá gestionar proveedores, productos, promociones y otras entidades importantes para el funcionamiento del e-commerce.

## Funcionalidades principales

El sistema de administración del e-commerce contendrá las siguientes funcionalidades principales:

**1. Gestión de Proveedores:**
   - Alta, baja y modificación de proveedores.
   - Registro de información relevante de los proveedores, como nombre, dirección, información de contacto, etc.
   - Asociación de productos específicos a cada proveedor.

**2. Gestión de Productos:**
   - Alta, baja y modificación de productos.
   - Registro de información detallada sobre los productos, como nombre, descripción, precio, cantidad en stock, etc.
   - Categorización de productos para facilitar su búsqueda y organización.

**3. Gestión de Usuarios:**
   - Creación, modificación y eliminación de usuarios.
   - Autenticacion con JWT y Cookies
     
## Tecnologías utilizadas

El proyecto  utilizará las siguientes tecnologías:

- Lenguaje de programación: [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)
- Framework Backend: [Node.js](https://nodejs.org/)
- Base de datos: [MySQL](https://www.mysql.com/)
- Framework de desarrollo web: [Express.js](https://expressjs.com/)

## Diagrama Base de Datos
![image](https://github.com/AngelVelasco1/admin_ecommerce/blob/main/diagrama.png)

## Configuración

### Instalación

1. Clona este repositorio en tu máquina local:

   ```shell
   git clone https://github.com/tu-usuario/nombre-del-proyecto.git
   ```

2. Navega hasta el directorio del proyecto:

   ```shell
   cd nombre-del-proyecto
   ```

3. Instala las dependencias del proyecto:

   ```shell
   npm install -E -D
   ```
4. Inicia el servidor mediante el comando `npm run dev`.



El proyecto utiliza variables de entorno para la configuración de la conexión a la base de datos.

### ENV

La variable de entorno `CONFIG` define la configuración del servidor de la base de datos. Debes proporcionar el hostname y el puerto de conexión. 

```
CONFIG = {"hostname": "localhost", "port": 5050}
```



La variable de entorno `CONNECT` define los parámetros de conexión a la base de datos, como el host, usuario, contraseña, base de datos y puerto.

```
CONNECT = {"host": "localhost", "user": "user", "database": "database", "password": "....", "port": 3306}
```

### Dependencias

El proyecto utiliza las siguientes dependencias:

- dotenv (v16.3.1)
- express (v4.18.2)
- jose (v4.14.4)

***
- class-transformer (v0.5.1)
- class-validator (v0.14.0)
- mysql2 (v3.5.2)
- nodemon (v3.0.1)
- reflect-metadata (v0.1.13)
- typescript (v5.1.6)


##  Consultas Principales

### Crear un Nuevo Cliente

- **URL:** `http://${CONNECT}/customer/create`

1. Copia la URL (`http://${CONNECT}/customer/create`) 
2. Crea una nueva solicitud POST.
3. Agrega el encabezado `Content-Type: application/json`.
4. Ingresa el cuerpo de la solicitud JSON:
   ```json
   {
     "name": "John Doe",
     "address": "123 Main St",
     "email": "john.doe@example.com"
   }
   ```

Si es exitoso, recibirás una respuesta con el código de estado `201 Created` y los datos del cliente creado junto con el token JWT.


###  Iniciar Sesión del Customer

- **URL:** (`http://${CONNECT}/customer/login`) 


1. Copia la URL(`http://${CONNECT}/customer/login`)
2. Crea una nueva solicitud GET.
3. Agrega el encabezado `Content-Type: application/json`.
4. Ingresa el cuerpo de la solicitud JSON:
   ```json
   {
     "name": "John Doe",
     "email": "john.doe@example.com"
   }
   ```

- El endpoint implementa un middleware que realiza la verificacion del JWT

- Si los datos de inicio de sesión son correctos, recibirás una respuesta con el código de estado `200 OK`, indicando que el usuario ha sido encontrado y autenticado correctamente.

- Si falta alguno de los campos requeridos (nombre o email), recibirás una respuesta con el código de estado `404 Not Found`, indicando que debes enviar los datos requeridos.

- Si no se encuentra un usuario con los datos proporcionados, recibirás una respuesta con el código de estado `404 Not Found`, indicando que el usuario no ha sido encontrado.



## Autor

**Angel David Velasco**

## Licencia

Este proyecto está bajo la Licencia MIT. Puedes consultar el archivo LICENSE para más detalles.

