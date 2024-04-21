# Utiliza una imagen base con Node.js
FROM node:14

# Variables de entorno
#Nombre de host de todos los servers
ENV DB_HOST='localhost'

# VE PostgreSQL
ENV DBPS_PORT=5432
ENV DBPS_NAME='mydatabase'
ENV DBPS_USER='myuser'
ENV DBPS_PASSWORD='mypassword'

# VE Redis
ENV DBR_HOST="redisHost"
ENV DBR_PORT=6379

# VE MongoDB
#Puerto de MongoDB express
ENV DBM_PORT=8081 
ENV DBM_NAME='nombreBD'
ENV DBM_USER='root'
ENV DBM_PASSWORD='example'

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json para instalar dependencias
COPY package*.json ./
COPY package.json .
COPY package-lock.json .

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Puerto en el que se ejecuta la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD [ "node", "app.js" ]
