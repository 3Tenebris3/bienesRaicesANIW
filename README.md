# Bienes Raices MVC  
## Andrés Núñez

LINK VIDEO: [CRUD-LOGIN](https://udlaec-my.sharepoint.com/:f:/g/personal/joaquin_nunez_udla_edu_ec/Eq9lSQfWxQRNmXe7SxEUIX8BaHqDhOzmNfOKNd2EVVy94g?e=65pSDS)

Proyecto Ingenieria WEB

Nombre del Sistema: Bienes Raices

Propósito del Sistema:
El sistema tiene como propósito el crear una plataforma para la publicación de bienes raices por la web, el programa permitira la publicación de cualquier tipo de propiedad para la venta de mismo, se podra publicar a lo largo del mundo y por ubicación geografica, tambien contara con un control para usuarios el cual te permitira que cualquier persona acceda para publicar sus propiedades.

Usuarios Destinatarios:
Este sistema se crea destinado a usuarios interesados en la venta de propiedades los cuales puedan tener un control o de algun modo se den a conocer.

### **Arquitectura**

El sistema de bienes raíces es una plataforma web robusta desarrollada utilizando tecnologías modernas para ofrecer una experiencia de usuario intuitiva y segura. Está basado en una arquitectura de aplicación web Node.js y Express.js, con la capa de presentación creada utilizando Pug y Tailwind CSS para un diseño elegante y receptivo.

#### **1. **Capa de Presentación (Frontend):**
   - **Pug y Tailwind CSS:** Se utiliza Pug como motor de plantillas para generar páginas HTML dinámicas y Tailwind CSS para un diseño estilizado y responsivo.
   - **Interfaz de Usuario (UI):** La interfaz de usuario incluye pantallas de logueo, creación de cuenta, recuperación de contraseña, confirmación de creación de cuentas y una página de inicio organizada por categorías de propiedades: casas, departamentos, bodegas, terrenos y cabañas.
   - **Mapa Interactivo:** Se integra un mapa interactivo que permite a los usuarios buscar propiedades por ubicación. Los usuarios pueden aplicar filtros basados en tipos de propiedades y rangos de precios para refinar su búsqueda.

#### **2. Capa de Aplicación (Backend):**
   - **Node.js y Express.js:** La lógica del servidor está construida sobre Node.js y Express.js para manejar las solicitudes HTTP y las rutas de la aplicación.
   - **Autenticación y Autorización:** Se implementa un sistema de autenticación seguro que incluye validación por correo electrónico para la creación de cuentas de usuario. Las contraseñas se almacenan en la base de datos después de ser hasheadas para garantizar la seguridad.
   - **Base de Datos MySQL y Sequelize:** Se utiliza MySQL como sistema de gestión de base de datos, y Sequelize como ORM para interactuar con la base de datos de manera eficiente. Los datos de propiedades y usuarios se gestionan a través de Sequelize para garantizar la integridad y consistencia de los datos.
   - **Funcionalidades del Usuario:** Los usuarios pueden configurar sus perfiles, gestionar sus propiedades existentes y publicar nuevas propiedades a través de la aplicación.

#### **3. Capa de Datos (Base de Datos):**
   - **MySQL Database:** La base de datos MySQL se utiliza para almacenar información sobre usuarios, propiedades y otros datos relevantes.
   - **Sequelize ORM:** Sequelize se utiliza como un ORM para mapear objetos de la aplicación a entidades en la base de datos, facilitando la manipulación y recuperación de datos.

#### **4. **Capa de Servicios Externos:**
   - **APIs de Mapas:** Se integran servicios de mapas para proporcionar funcionalidades de búsqueda basadas en ubicación.
   - **Servicios de Correo Electrónico:** Se utilizan servicios de correo electrónico para enviar confirmaciones y enlaces de restablecimiento de contraseña a los usuarios.

#### **5. **Seguridad:**
   - **Seguridad en las Contraseñas:** Las contraseñas de los usuarios se almacenan de forma segura en la base de datos después de ser hasheadas con algoritmos de hash seguros.
   - **Protección contra Inyección SQL:** Se implementan medidas para prevenir ataques de inyección SQL y asegurar que la base de datos sea segura contra manipulaciones no autorizadas.

#### **6. **Arquitectura del Frontend:**
   - **Componentización:** El frontend se organiza en componentes reutilizables para mejorar la modularidad y la facilidad de mantenimiento.
   - **Gestión de Estado:** Se utiliza un sistema de gestión de estado (por ejemplo, Redux) para manejar los estados de la aplicación y las interacciones del usuario de manera eficiente.

#### **7. **Escalabilidad y Mantenimiento:**
   - **Arquitectura Escalable:** La arquitectura se diseña para ser escalable horizontalmente, lo que permite manejar un gran número de usuarios y propiedades a medida que el sistema crece.
   - **Mantenibilidad:** El código se organiza siguiendo las mejores prácticas y está documentado adecuadamente para facilitar el mantenimiento continuo y las futuras expansiones del sistema.

Este sistema de bienes raíces proporciona a los usuarios una plataforma segura y fácil de usar para buscar, publicar y gestionar propiedades, todo respaldado por una arquitectura sólida y tecnologías modernas.
