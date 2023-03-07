# Valhalla

This is the ReactJS demo web app running on https://valhalla.openstreetmap.de. It provides routing and isochrones with a magnitude of options and makes requests to [Valhalla](https://github.com/valhalla/valhalla), an open source routing engine and accompanying libraries for use with OpenStreetMap data.

![valhalla_screenshot](https://user-images.githubusercontent.com/10322094/144841673-18ec0772-129d-443e-a040-5172480b0f92.png)

## 🛠️ Development

Using one of the following ways you can contribute to the repo; please pick your favourite from:

1. Local development
2. Local development with Docker Compose

### Local development

#### Prerequisites

Before contributing or adding a new feature, please make sure you have already installed the following tools:

- [NodeJs](https://nodejs.org/en/download/)

#### Commands

You can set this up locally with the following steps:

1. `npm install`
2. `npm run start`

You can now access the app on http://localhost:3000

### Local development with Docker Compose

This will allow you to run your favourite IDE but not have to install any dependencies on your computer like NodeJS.

#### Prerequisites

- Docker
- [Docker Compose](https://github.com/docker/compose) V2.

#### Commands

1. `docker-compose up` 

You can now access the app on http://localhost:3000