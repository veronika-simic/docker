# Specify base image but we cant just use alpine because it does not have npm inisde
# alpine does not have npm so we can use another image or build our own
# we are using a predefined image, for that go to docker hub
# alpine version means you are not getting a lot of depend from node or whatever you are using
FROM node:14-alpine

#Install dependencies
# first slash means everything from the current directory, second means to the current container
# npm install cant run without this because the package.json is not visible inside the temporary container
# we need to copy everything before npm install runs
COPY ./ ./ 
RUN npm install

# Default
CMD [ "npm","start" ]