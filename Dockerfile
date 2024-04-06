FROM node:18-slim
WORKDIR /app
COPY . /app
RUN npm install && echo 'npm modules installed successfully'

CMD ["npm","start"]

EXPOSE 3000
