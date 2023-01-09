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