# Notes for Udemy Course on Docker and Kubernetes

## Section 1

- Why use Docker ?
  Docker tries to make it easy to run an installer on any computer or any cloud based computing platform
  Docker makes it really easy to install and run software without worrying about setup or dependencies
- What is Docker ?
  Docker is a platform for creating and running containers
  Docker is composed of Docker Client, Server, Machine, Images, Hub, Compose
- What is image ?
  When we run a command Docker CLI reaches out to Docker Hub and it downloads a Docker Image. Docker Image containes deps and config to run a program. Containers are instances of images, they run a program, they have their own harddrive
- Running a command in Docker
  docker run hello-world -> Starts up docker Client and sends the message to docker Server which looks up the image first localy in image cache and if it does not find it then it goes to Docker Hub (repo with free public images).Docker Hub downloaded it to our local machine and then the server can use it. It creates a container of that image and runs a single program inside of that container.
- What is a container ?
  Kernel is a layer that governs access between programs and actual hard drive. Programs like spotify, chrome, nodejs talk to Kernel with System Calls. Kernel gives endpoints which programs can use to actually interact with hard drive.
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

First create docker file then pass it to docker client which passes it to docker server and then we will get the docker image
Inside the docker file we will specify base image, run some commands, and specify the command to run on container setup
Create a file that creates image that runs redis server