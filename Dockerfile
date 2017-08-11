FROM node:boron

# Create app directory
RUN mkdir -p /usr/app/dist
WORKDIR /usr

# Install app dependencies
COPY package.json /usr

# Install app dependencies
RUN yarn install
RUN yarn add gulp

COPY ./app /usr/app
COPY ./index.js /usr
COPY ./gulpfile.babel.js /usr

# Build production code
RUN gulp build

EXPOSE 8080
CMD [ "yarn", "start" ]
