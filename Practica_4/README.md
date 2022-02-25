# Práctica 2

## Herramientas de desarrollo

### [Vite](https://github.com/vitejs/vite)

> Next Generation Frontend Tooling

- Inicio instantáneo del servidor
- HMR ultrarrápido
- Características enriquecidas
- Construcción optimizada
- Interfaz de complemento universal
- API completamente tipificadas

Vite (palabra francesa para "rápido", pronunciado [`/vit/`](https://cdn.jsdelivr.net/gh/vitejs/vite@main/docs/public/vite.mp3), como "veet") es una nueva generación de herramientas de construcción de frontend que mejora significativamente la experiencia de desarrollo de frontend. Consta de dos partes principales:

- Un servidor de desarrollo que sirve sus archivos de origen a través de [módulos ES nativos](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), con [ricas funciones integradas](https://vitejs.dev/guide/features.html) y [reemplazo de módulo activo (HMR)](https://vitejs.dev/guide/features.html#hot-module-replacement) asombrosamente rápido.

- Un [comando de compilación](https://vitejs.dev/guide/build.html) que agrupa su código con [Rollup](https://rollupjs.org), preconfigurado para generar activos estáticos altamente optimizados para producción.

Además, Vite es altamente extensible a través de su [API de complemento](https://vitejs.dev/guide/api-plugin.html) y [API de JavaScript](https://vitejs.dev/guide/api-javascript.html) con soporte completo de escritura.

[Lea las documentación para obtener más información](https://vitejs.dev).

### [Docker](https://www.docker.com/)

Docker elimina las tareas de configuración repetitivas y se utiliza durante todo el ciclo de vida del desarrollo para un desarrollo de aplicaciones rápido, sencillo y portátil: escritorio y en la nube. La plataforma completa de extremo a extremo de Docker incluye interfaces de usuario, CLI, API y seguridad que están diseñadas para funcionar juntas durante todo el ciclo de vida de la entrega de aplicaciones.

[Lea las documentación para obtener más información](https://docs.docker.com/).

## Desarrollo, compilación y ejecución

Para realizar el desarrollo de la práctica es necesario ejecutar un `npm install` y un `npm run dev` para que se ejecute el servidor y se compile el código. También es necesario crear un archivo [`.env`](#environmentVariables) con las variables de entorno necesarias para la práctica.

Para realizar la dockerizacion del proyecto es necesario crear un archivo llamado [Dockerfile](./Dockerfile) el cual cuenta con dos Stages donde el primero es la compilación de la pagina web y el segundo es la copia y ejecución del servidor que permitirá mostrar la página utilizando el puerto 80.

Para realizar la creación de la imagen de Docker es necesario ejecutar el siguiente comando:

```bash
# Compilar imagen
# docker build -t <username>/<app> .
docker build -t dadu0699/pareja3 .
```

Luego es necesario tener una cuenta en [Docker Hub](https://hub.docker.com/) para poder publicar la imagen de la práctica y así poder ser descargada por el otro integrante de la pareja.

```bash
# Publicar imagen en Docker hub
# docker push <username>/<app>:latest
docker push dadu0699/pareja3:latest

# Descargar imagen y ejecutar el contenedor
# docker run -d --name pareja3 -p 80:80 <username>/<app>
docker run -d --name pareja3 -p 80:80 dadu0699/pareja3
```

## Variables de entorno<a name="environmentVariables"></a>

```.env
VITE_STUDENT1ID=
VITE_STUDENT1NICKNAME=
VITE_STUDENT1NAME=
VITE_STUDENT1IMG=

VITE_STUDENT2ID=
VITE_STUDENT2NICKNAME=
VITE_STUDENT2NAME=
VITE_STUDENT2IMG=
```
