# Notes for Udemy Course on Docker and Kubernetes

## Section 1

- Why use Docker ?
  Docker tries to make it easy to run an installer on any computer or any cloud based computing platform
  Docker makes it really easy to install and run software without worrying about setup or dependencies
- What is Docker ?
  Docker is a platform for creating and running containers
  Docker is composed of Docker Client, Server, Machine, Images, Hub, Compose. This tools alow us to create Docker Containers. 
- What is image ?
  When we run a command Docker CLI reaches out to Docker Hub and it downloads a Docker Image. Docker Image containes deps and config to run a program. Containers are instances of images, they run a program, they have their own harddrive. Containers are like a running program. It is a program with it's own set of resources
- Docker CLI or Docker Client 
  Tool we use to run commands and allows us to interact with Docker Server 
- Docker Server or Docker Daemon
  Responsible for everything with containers and images
- Running a command in Docker
  docker run hello-world -> Starts up docker Client and sends the message to docker Server which looks up the image first localy in image cache and if it does not find it then it goes to Docker Hub (repo with free public images).Docker Hub downloaded it to our local machine and then the server can use it. It creates a container of that image and runs a single program inside of that container.
- What is a container ?
  Kernel is a layer that governs access between programs and actual hard drive. Programs like spotify, chrome, nodejs talk to Kernel with System Calls. Kernel gives endpoints or functions which programs can use to actually interact with hard drive and write to it.
  Namespacing allows us to isolate resources per process, control group limits amount of resources used per process. Container is a set of processes. Image contains FS Snapshot and a Startup Command.
  Installing a docker on Windows installed Linux Virtual Machine and inside that machine are containers.

## Section 2

- Docker commands
  docker run image-name
  To create an container from an image docker image has a FS snapshot with a programm inside of it. When we run the command we take the snapshot of that program and put it into the container and then we execute the command. Each image has a default command that will be executed unless we specify differently.

  docker run busybox ls
  This command overwrites the default command run by busybox image and lists all the folders in busybox image

  docker ps
  Lists all runing containers

docker ps --all
Lists all containers we created

- Lifecicle of a container
  To create a container and run a container from an image we use docker run command which is composed of docker create + docker start
  docker run = docker create + docker start

Docker create is the process of taking the FS Snapshot to prepare the container, and to actually start it we user docker start
If the container exited we can the use its id to start it again

docker logs container_id
Gets the logs from the container, gets all the info from inside the container

docker stop container_id
stops the container but it allows it to finish its work

docker kill container_id
stops the container immediately

docker exec -it container_id command
allows us to execute an additional command in a container

-it flag
it is 2 flags -i + -t
-i means we want to attach our terminal to STDIN
-t makes sure that the text is formated

sudo docker exec -it fb1b5710140a sh
creates unix, great for debugging , exit with ctrl + c or ctrl + d
sh is a command processor or a shell

sudo docker run -it fb1b5710140a sh
allows us to poke arround the container but we wont be able to run any other container inside of it

although two containers can be running at the same time they are totally isolated

## Section 3
To create our own image we first create Dockerfile give it to Docker CLI which passes it to Docker Server which will do everything for us
First create docker file then pass it to docker client which passes it to docker server and then we will get the docker image
Inside the docker file we will specify base image, run some commands, and specify the command to run on container setup
Create a file that creates image that runs redis server
Writing a dockerfile is equall to being give a computer with no OS and being told to install Chrome on it.
Why use alpine? It is the same question as why use Windows or Ubuntu?
The answer is because they have some preinstalled programs that we want to use. 

First we install alpine like a basic image, our starting point. But what we actually want is redis. That's why we run apk add --update redis

What does docker build . do ?
It uses our docker file and creates an image out of it. The dot means build context, its a set of files and folders we want to encapsulate

1. From alpine tells docker server to download docker image. We use alpine because it has predefined programs we want
2. Then run was executed, it looked for the image from the previous step
3. It got the alpine image and creates temporary container inside which apk add --update redis was executed.
4. That command is executed in the container and now it has modified FS
5. Then we take the snapshot of that container, close the container and get the image ready for the next instruction. Image is the FS snapshot of that temporary container
6. CMD we pass alpine image but with redis on top of it
7. Get image from previous step, create container out of it, tell the container to execute the command when started "redis-server"
8. Shut down container, get the image from it
9. Output is the image from the last step

If we change something after the build the only thing that needs to be chagned is going to be changed, docker want repeat the whole process again

docker build . creates an image and to create a container we will run
docker run id....

Tagging an image
Its not always practical to copy paste the id, so we can do the following --> docker build -t yourDockerId/projectName:version
E.g. docker build -t vera/redis:latest and the run it with docker run vera/redis
Technically just the version is the tag

## Section 4

1. Create Node JS web app
2. Create a Dockerfile
3. Build image from dockerfile
4. Run image as container
5. Connect to web app from a browser

alpine is a tag for an image that is as small and compact as posible. When someone makes a request for port 3000 or 4000 we have to specify that this request should then go to the port inside the docker container. 
we have to specify that request should go from local computer to the container (port mapping). If anyone makes a request to some port, redirect it to the container and the port present there. This only applies to incoming containers. request goes to the container. Port changing is done in the runtime. We do not specify it inside the docker file

docker run -p 8080:8080 id
                | |
route incoming request on this port to this port inside container

## Section 5

Build a web page that generates number of visits (node + redis)
Instead of having one container for both node and redis we are going to have a seperate container for each of them
Each node container will connect to redis container and store number of visits
How are we going to make our containers to communicate?
We can use docker CLI Networking feature (pain in the neck) or Docker compose

Docker compose is seperate CLI installed with Docker. Used to start multiple containers at the same time
For that we are going to create a seperate file docker-compose.yml which is going to contain all the options we'd normally pass to docker-cli. Docker compose connects these two containers just by specifying them in the services. We don't have to connect them through some ports

In order to restart our container we have restart policies, by default its no.
Docker status of container docker-compose ps. It needs docker-compose.yml otherwise it won't work

## Section 6

Develop an app, test it, deploy it
First we are going to push our code to github. After we are done with that we are going to push our code to Travis CI. There our code is pulled and series of test is ran, which we are going to run ourselfs. And then we are going to push it to AWS

1. We are going to push our code to feature branch
2. Create pull request, merge it to master
3. Run tests, if they are success deploy it to AWS Elastic Beanstalk

Docker is not needed in this workflow. Docker is a tool that makes these tasks a lot easier.
First we are going to install react-app
These are the commands we are going to need:

1. npm run start (starts development server)
2. npm run test
3. npm run build (for building production version)

We are going to have 2 docker files: one for development and one for production

## Commands 
docker -v or docker version --> gives us a version of docker 
docker run image_name -> creates and runs container from image
docker run image_name command --> overrieds the default command that is available in the image
docker ps --> lists all running containers 
docker ps --all --> all the containers ever created
docker create image_name --> create container from an image
docker start -a conatiner_id --> start the container
docker system prune --> delets everything 
docker logs container_id --> gets all the info that container has
docker stop container_id
docker kill container_id
docker exec -it container_id command --> allows us to execute an additional command inside the running container
docker build .  --> give our Dockerfile to docker CLI 
docker build -t sometag . --> this way we can name our image what ever we want
docker run -p 8080:8080 image_name --> port mapping, move the request from this port on local machine to the request on the docker container by the same port number