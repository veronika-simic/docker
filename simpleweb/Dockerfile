# Specify base image
# alpine does not have npm so we can use another image or build our own
# we are using a predefined image, for that go to docker hub
FROM node:14-alpine

#Install dependencies
# first slash means everything from the current directory, second means to the current container
COPY ./ ./ 
RUN npm install

# Default
CMD [ "npm","start" ]