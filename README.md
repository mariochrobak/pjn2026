# Sistema de Gestión de Expedientes (Mesa de Entradas)

Un sistema integral web diseñado para la administración y análisis estadístico de causas judiciales. Permite la gestión centralizada de expedientes, organismos judiciales, parámetros y el padrón de personas involucradas, garantizando la integridad referencial y facilitando la visualización de datos.

## Tecnologías Utilizadas

Este proyecto está construido bajo una arquitectura cliente-servidor (Frontend + Backend) utilizando el siguiente stack:

### Frontend
* **React 18** + **TypeScript**: Construcción de interfaces de usuario.
* **Vite**: Entorno de desarrollo.
* **Ant Design (antd)**: Biblioteca principal de componentes UI (Tablas ordenables, Formularios, Modales).
* **@ant-design/plots (v2)**: Visualización de datos para el Dashboard de estadísticas.
* **Axios**: Cliente HTTP para la comunicación con la API.

### Backend
* **Node.js** + **Express**: Servidor web y enrutador de la API REST.
* **TypeScript**: Tipado estático para la lógica de negocio.
* **Sequelize**: ORM para la gestión y consulta de la base de datos relacional.
* **Base de Datos**: SQLite - Sistema de gestion de base de datos relacional liviano.

---

## Características Principales

1. **Dashboard Estadístico:**
   * Visualización del volumen total de expedientes.
   * Gráficos interactivos de distribución por Ciudad y por fuero.
   * Histórico cronológico de altas por año calendario.

2. **Gestión de Organismos:**
   * Alta, Baja, Modificación de Organismos.
   * **Autogeneración inteligente de códigos:** El sistema genera automáticamente las nomenclaturas (Ej: `JNQFA`) combinando los códigos oficiales de Ciudad y Fuero.
   * Blindaje de edición para mantener la integridad de la historia judicial.

3. **Mesa de Entradas (Expedientes):**
   * Registro de expedientes.
   * Vinculación dinámica con Organismos.
   * Asignación de Personas (Actores/Demandados/Etc.).
   * Tablas con ordenamiento dinámico.

4. **Parámetros:**
   * Gestión de diccionarios del sistema (Ciudades y Fueros) con asignación de códigos oficiales de 2 letras.

---

## Instalación y Configuración Local

### 1. Clonar el repositorio e iniciar aplicación desde código fuente
```bash
git clone https://github.com/mariochrobak/jusneuquen2026
cd jusneuquen2026
npm install

cd frontend
npm install

cd ..\backend
npm install

# Iniciar aplicación
cd ..
npm run dev
```

---

## Descargar e iniciar versión "dockerizada"

##### Paso 1. Descargar el archivo ``docker-compose.yml`` de la carpeta ``dockerized`` de este repositorio

##### Paso 2. Abrir la linea de comandos (consola) y situarse en el carpeta donde descargo el archivo del paso 1
```bash
cd \ruta\a\la\carpeta
```
##### Paso 3. Ejecutar el siguiente comando
```bash
docker-compose up -d   
```
*Es necesario que la aplicación Docker Dektop o su equivalente según el OS está previemente instalada.

## Acceso a la aplciación

Para acceder a la interfaz de la apicación, en el mismo equipo donde se ejectua la misma, ya sea desde el código fuente o a través del contenedor, se debe abrir un navegador y acceder a [URL](http://localhost:5173) ( ``http://localhost:5173``).