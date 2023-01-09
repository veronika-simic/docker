# Use an existing docker image as a base
# this is similar to installing an operating system
# gives us initial set up for an image that we can further customise
FROM alpine 


# Download and install dependency
# this does not have to do anything with docker
# we used alpine because it has this apk package that installs redis immediately
# it looks at the previous step and the last image we had, which is the alpine
# it then created a temporary container of that image

RUN apk add --update redis
RUN apk add --update gcc


# Tell the image what to do when container starts
# Look at the image from the previous step, create temporary container
# Your primary command should be redis-server but it does not get exectued 
# Its immediately shut down
CMD [ "redis-server" ]