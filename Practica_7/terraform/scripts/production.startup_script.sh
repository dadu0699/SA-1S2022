#!/bin/bash

sudo apt update
sudo apt install -y docker.io
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

docker run -d -p 80:80 --restart always --name practica7 201800726/pareja3:latest
