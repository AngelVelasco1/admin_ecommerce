# Administración de E-commerce

Este proyecto tiene como objetivo desarrollar un sistema de administración para un e-commerce. El sistema permitirá gestionar proveedores, productos, clientes y otros temas importantes.

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

**3. Gestión de clientes:**
   - Creación, modificación y eliminación de clientes.
   - Login con Autenticacion con JWT 
   - Compra de productos
   - Listado de compras de un cliente especifico
     
## Tecnologías utilizadas

El proyecto  utilizará las siguientes tecnologías:

- Lenguaje de programación: [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)
- Framework Backend: [Node.js](https://nodejs.org/)
- Base de datos: [MySQL](https://www.mysql.com/)
- Framework: [Express.js](https://expressjs.com/)

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
   npm i
   ```
4. Inicia el servidor mediante el comando `npm run dev`.



### ENV

Antes de ejecutar la aplicación, asegúrate de crear y configurar el archivo de entorno (`.env`) con la siguiente estructura y reemplazar los valores por los adecuados:

```plaintext

# Configuración general
CONFIG={"hostname": "localhost", "port": 5050}

# Conexión a la base de datos
CONNECT={"host": "localhost", "user": "username", "database": "database", "password": ".....", "port": 3306}

# Clave privada para JWT
PRIVATE_KEY="admin"
```

### Dependencias

El proyecto utiliza las siguientes dependencias:

- dotenv (v16.3.1)
- express (v4.18.2)
- jose (v4.14.4)
- class-transformer (v0.5.1)
- class-validator (v0.14.0)
- mysql2 (v3.5.2)
- nodemon (v3.0.1)
- reflect-metadata (v0.1.13)
- typescript (v5.1.6)


## Pasos para crear y configurar la base de datos

A continuación, se presentan los pasos para crear la base de datos y configurar las tablas requeridas. Asegúrate de tener instalado MySQL en tu sistema antes de seguir estos pasos.

### 1. Crear la base de datos


1. Ejecuta el siguiente comando para crear la base de datos:

```sql
CREATE DATABASE adminEcommerce;
```

### 2. Seleccionar la base de datos

Antes de crear las tablas, asegúrate de estar utilizando la base de datos que acabas de crear. Puedes hacerlo con el comando:

```sql
USE adminEcommerce;
```

#### 3. Crear la tabla 'categories'

```sql
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL
); 
```

#### 4. Crear la tabla 'role'

```sql
CREATE TABLE role (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
```

#### 5. Crear la tabla 'products'

```sql
CREATE TABLE products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    stock INT NOT NULL,
    discount_percentage TINYINT(2) NOT NULL DEFAULT '0',
    category INT NOT NULL,
    FOREIGN KEY (category) REFERENCES categories (id)
);
```

#### 6. Crear la tabla 'customer'

```sql
CREATE TABLE customer (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    address VARCHAR(50),
    email VARCHAR(255),
    role_id INT NOT NULL, 
    FOREIGN KEY (role_id) REFERENCES role (id)
);
```

#### 7. Crear la tabla 'suppliers'

```sql
CREATE TABLE suppliers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    role_id INT,
     FOREIGN KEY (role_id) REFERENCES role(id)
);
```

#### 8. Crear la tabla 'purchases'

```sql
CREATE TABLE purchases (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    customer_id BIGINT,
    product_id BIGINT,
    FOREIGN KEY (customer_id) REFERENCES customer(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

#### 9. Crear la tabla 'product_supplier'

```sql
CREATE TABLE product_supplier (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT,
    supplier_id INT,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
); 
```


## Endpoints

> ⚠️ **Importante:**
> Las consultas deben poseer en su body columnas referentes al endpoint, con valores logicos en cada campo para que la validacion del DTO sea correcta. (Puedes copiar los valores json dados como ejemplo).

### 1. Customer

### `create`

Este endpoint se utiliza para crear un nuevo cliente en la base de datos y generar un JWT para autenticación.

- Método: **POST**
- URL: `http://localhost:5050/customer/create`
- Cuerpo de la solicitud
  ```json
  {
    "name": "Angel Doe",
    "address": "124 Main Street",
    "email": "angel@example.com"
  }
  ```
> ⚠️ **Importante:**
> Guarda el token generado, lo necesitaras para ser autenticado en el login y ser autorizado a realizar diferentes acciones (comprar, actualizar, listar, etc)


###  `login`

Realiza el inicio de sesión con JWT. Se espera que el cliente proporcione su nombre y correo electrónico para realizar la autenticación y el token.

- Método: **GET**
- URL: `http://localhost:5050/customer/login`
-  Cuerpo de la solicitud
  ```json
  {
    "name": "Angel Doe",
    "email": "angel@example.com"
  }
  ```
- Agrega un header tipo Authorization con el valor del token generado en el registro.

🔔 **Listo:**
Ya estas autenticado, podras realizar los siguientes endpoints.

###  `delete`

Elimina un cliente por completo, usando su id. Reemplaza **numeroId** en el ejemplo de la url por el id en numero.

- Método: **delete**
- URL: `http://localhost:5050/customer/delete/numeroId`
-  Cuerpo de la solicitud
  ```json
  {
    "name": "Angel Doe",
    "email": "angel@example.com"
  }
  ```
- Si el usuario existe lo eliminara, de lo contrario mostrara que no existe o ya fue eliminado.

###  `update`

Actualiza informacion especifica de un cliente, usando su id para modificarlo. Reemplaza **numeroId** en el ejemplo de la url por el id en numero.

- Método: **patch**
- URL: `http://localhost:5050/customer/update/numeroId`
-  Cuerpo de la solicitud
  ```json
  {
  "name": "Juan Mart",
  "address": "12 Main Street",
  "email": "juan@gmail.com"
  }
  ```
> 📌  **Nota:**
> No es necesario actualizar todos los campos, solo actualiza los datos que necesites, los demas se mantendran con su valor de creacion.

###  `buy`

Permite a un cliente especifico comprar ciertos productos usando el id del producto. Cambia customerId por el id del cliente y productId por el id del producto a comprar

- Método: **post**
- URL: `http://localhost:5050/customer/customerId/buy/productId`
-  Cuerpo de la solicitud
  ```json
  {
  "name": "Juan Mart",
  "address": "12 Main Street",
  "email": "juan@gmail.com"
  }
  ```
- La tabla purchases relacionara este cliente con el producto que compro, añadiendo una compra al cliente y restandole al stock del producto 1 unidad.

###  `purchases`

Permite listar las compras que tiene un cliente por su id. Mostrando el nombre, precio y mas info sobre los productos comprados. Cambia el customerId por el id del cliente.

- Método: **get**
- URL: `http://localhost:5050/customer/purchases/customerId`
-  Cuerpo de la solicitud
  ```json
  {
  "name": "Juan Mart",
  "address": "12 Main Street",
  "email": "juan@gmail.com"
  }
  ```
- Si el cliente no tiene compras se enviara un mensaje indicando esto.

### 2. Productos

###  `add`

Permite añadir productos al inventario.

- Método: **post**
- URL: `http://localhost:5050/products/add`
-  Cuerpo de la solicitud
  ```json
  {
  "name": "Polo",
  "description": "Camiseta de manga corta, algodon.",
  "price": 20.99,
  "stock": 100,
  "discount_percentage": 10,
  "category": 2
  }
  ```
- Si ya existe no se creara y mandara dicho error.

### 3. Proveedores
###  `add`

Permite añadir proveedores

- Método: **post**
- URL: `http://localhost:5050/suppliers/add`
-  Cuerpo de la solicitud
  ```json
  {
  "name": "Proveedor X",
  "email": "proveedor@example.com",
  "phone": "555-123-4567"
  }
  ```
- Si ya existe no se creara y mandara dicho error.


## Autor

**Angel David Velasco**

## Licencia

Este proyecto está bajo la Licencia MIT. Puedes consultar el archivo LICENSE para más detalles.

