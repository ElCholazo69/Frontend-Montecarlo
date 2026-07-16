# Club Deportivo Montecarlo - Frontend 🏆⚽

## 1. Descripción

El frontend del sistema web del Club Deportivo Montecarlo fue desarrollado utilizando Angular y TypeScript, permitiendo la construcción de una aplicación web dinámica, escalable y organizada mediante una arquitectura basada en componentes.

La aplicación permite a los usuarios gestionar funcionalidades relacionadas con el club deportivo, como autenticación, consulta de canchas, registro de reservas, pagos y consultas. Asimismo, cuenta con un panel administrativo para la gestión de usuarios, reservas, pagos, canchas y consultas.

El proyecto implementa una estructura modular basada en funcionalidades, separando los componentes por dominios dentro de la carpeta `features`. Además, utiliza servicios para la comunicación con el backend, interfaces para la definición de modelos de datos, guards para la protección de rutas e interceptores para la gestión de solicitudes HTTP.

## 2. Arquitectura del sistema

El frontend está organizado siguiendo una arquitectura basada en funcionalidades, donde cada módulo funcional del sistema mantiene sus propios componentes y vistas. Esta organización permite una mejor escalabilidad, mantenimiento y separación de responsabilidades.

La estructura principal del proyecto se divide en:

- **Core:** Contiene elementos globales relacionados con la seguridad de la aplicación, como guards e interceptores.
  - `guards`: Protección de rutas según autenticación y permisos de usuario.
  - `interceptors`: Intercepta solicitudes HTTP para agregar información necesaria, como el token JWT.

- **Features:** Contiene las funcionalidades principales del sistema agrupadas por dominio.
  - `auth`: Gestión de autenticación (inicio de sesión y registro).
  - `canchas`: Consulta y detalle de canchas deportivas.
  - `reservas`: Registro y consulta de reservas.
  - `pagos`: Gestión del proceso de pago y consulta de pagos.
  - `consultas`: Registro y seguimiento de consultas.
  - `admin`: Funcionalidades administrativas del sistema.
  - `pages`: Páginas generales como la página de inicio.

- **Models:** Contiene las interfaces TypeScript utilizadas para definir la estructura de los datos manejados por la aplicación, como usuarios, reservas, pagos, canchas y consultas.

- **Services:** Contiene los servicios Angular encargados de la comunicación con la API REST del backend mediante `HttpClient`.

- **Shared:** Contiene componentes reutilizables utilizados en diferentes partes de la aplicación, como la barra de navegación y pie de página.

## 3. Instalación y configuración

### Requisitos previos

- Tener instalado Node.js.
- Tener instalado Angular CLI.
- Un editor de código como Visual Studio Code.

### Paso 1: Clonar el repositorio

```bash
# Clonar el repositorio y acceder a la carpeta raíz
git clone https://github.com/ElCholazo69/Frontend-Montecarlo.git
cd Frontend-Montecarlo
```

### Paso 2: Instalar dependecias necesarias:

```bash
npm install
```

### Paso 3: Ejecutar el proyecto
```bash
# Levantar el proyecto
ng serve

# Luego ingresar desde el navegador a
http://localhost:4200
```
## 4. Tecnologías Utilizadas

- **Angular:** Framework principal para el desarrollo de la aplicación modular y basada en componentes.
- **TypeScript:** Lenguaje de programación para la lógica de negocio con tipado estático y seguro.
- **HTML5:** Estructuración semántica de todas las vistas e interfaces del usuario.
- **SCSS:** Estilos visuales modernos, organizados y reutilizables mediante variables y nesting.

## 5. Funcionalidades principales

El frontend del sistema web del Club Deportivo Montecarlo implementa las siguientes funcionalidades, permitiendo a los usuarios interactuar con las diferentes áreas del sistema según el rol asignado.

| Funcionalidad | Descripción |
|---|---|
| Autenticación de usuarios | Permite el registro e inicio de sesión de usuarios mediante credenciales de acceso. |
| Gestión de canchas | Permite consultar las canchas disponibles y visualizar la información detallada de cada una. |
| Gestión de reservas | Permite a los usuarios registrar reservas, consultar sus reservas realizadas y visualizar el detalle de cada reserva. |
| Gestión de pagos | Permite registrar pagos asociados a las reservas y consultar el historial de pagos realizados. |
| Gestión de consultas | Permite registrar consultas y revisar el historial de solicitudes realizadas por los usuarios. |
| Panel administrativo | Permite al administrador gestionar las principales entidades del sistema, como dashboard, usuarios, canchas, reservas, pagos y consultas. |
| Gestión por roles | El sistema adapta las funcionalidades disponibles según el rol del usuario, diferenciando los accesos administrativos y usuarios generales. |

## 6. Páginas implementadas

El frontend del sistema cuenta con diferentes páginas organizadas según las funcionalidades disponibles para usuarios y administradores.

### Páginas de usuario

| Página | Archivo HTML | Descripción |
|---|---|---|
| Inicio | `inicio.html` | Página principal del sistema donde se muestra información general del Club Deportivo Montecarlo. |
| Login | `login.html` | Permite a los usuarios ingresar al sistema mediante sus credenciales de acceso. |
| Registro | `registro.html` | Permite crear una nueva cuenta de usuario para acceder a las funcionalidades del sistema. |
| Lista de canchas | `lista-canchas.html` | Permite visualizar las canchas disponibles para consulta y selección. |
| Detalle de cancha | `detalle-cancha.html` | Muestra información específica de una cancha seleccionada. |
| Mis reservas | `mis-reservas.html` | Permite al usuario consultar las reservas realizadas. |
| Detalle de reserva | `detalle-reserva.html` | Permite visualizar la información completa de una reserva seleccionada. |
| Formulario de pago | `formulario-pago.html` | Permite realizar el registro del pago asociado a una reserva. |
| Mis pagos | `mis-pagos.html` | Permite consultar el historial de pagos realizados por el usuario. |
| Crear consulta | `crear-consulta.html` | Permite registrar consultas dirigidas al club deportivo. |
| Mis consultas | `mis-consultas.html` | Permite consultar el historial de solicitudes realizadas. |

### Páginas administrativas

| Página | Archivo HTML | Descripción |
|---|---|---|
| Dashboard administrativo | `dashboard-admin.html` | Panel principal para la visualización de información administrativa del sistema. |
| Gestión de canchas | `canchas.html` | Permite al administrador gestionar las canchas registradas. |
| Gestión de reservas | `reservas.html` | Permite administrar y actualizar el estado de las reservas. |
| Gestión de pagos | `pagos.html` | Permite consultar y gestionar los pagos registrados. |
| Gestión de usuarios | `usuarios.html` | Permite administrar los usuarios registrados en el sistema. |
| Gestión de consultas | `consultas.html` | Permite revisar y gestionar las consultas realizadas por los usuarios. |
| Configuración administrativa | `configuracion-admin.html` | Permite gestionar configuraciones generales del sistema. |

## 7. Autenticación y Seguridad

El frontend implementa un sistema de autenticación basado en JSON Web Token (JWT), permitiendo controlar el acceso a las funcionalidades del sistema según el estado de autenticación y el rol del usuario.

Las principales medidas de seguridad implementadas son:

| Elemento | Descripción |
|---|---|
| Autenticación mediante JWT | Permite validar la identidad del usuario mediante un token generado por el backend después del inicio de sesión. |
| Auth Guard | Protege las rutas que requieren autenticación, evitando el acceso de usuarios no registrados a determinadas páginas del sistema. |
| Admin Guard | Restringe el acceso a las funcionalidades administrativas únicamente a usuarios con permisos de administrador. |
| Interceptor HTTP | Gestiona automáticamente el envío del token JWT en las solicitudes realizadas hacia los servicios protegidos. |
| Control de acceso por roles | Permite diferenciar las funcionalidades disponibles para usuarios generales y administradores. |

## 8. Licencia

Este proyecto tiene carácter académico y fue desarrollado con fines demostrativos, de aprendizaje y evaluación.

Los derechos de desarrollo y diseño pertenecen a sus creadores y al Club Deportivo Montecarlo, siendo su uso destinado exclusivamente para fines educativos y como parte del portafolio profesional.

No se permite la distribución, modificación o uso comercial del proyecto sin la autorización correspondiente de sus propietarios.
