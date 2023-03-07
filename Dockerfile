FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; then npm install --ignore-scripts; else npm install  --omit=dev --ignore-scripts; fi

COPY . ./

RUN npm run build

CMD ["npm", "start"]