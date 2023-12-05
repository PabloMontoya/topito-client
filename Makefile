.PHONY: build run stop

# Docker
IMAGE_NAME := topito-client
DOCKER_TAG := 1.0
# port mapping (host:container)
PORT := 8080:80

build:
	@echo "\033[1;34m🔨 Building $(IMAGE_NAME)...\033[0m"
	docker build -t $(IMAGE_NAME):$(DOCKER_TAG) .

run:
	@echo "\033[1;32m🚀 Running $(IMAGE_NAME)...\033[0m"
	docker run -d -p $(PORT) --name $(IMAGE_NAME):$(DOCKER_TAG) $(IMAGE_NAME)

stop:
	@echo "\033[1;31m🛑 Stopping $(IMAGE_NAME)...\033[0m"
	docker stop $(IMAGE_NAME)
	docker rm $(IMAGE_NAME)

nuke:
	@echo "\033[1;35m💥 Nuking all Docker data...\033[0m"
	docker system prune -a -f --volumes

push:
	@echo "\033[1;36m📤 Pushing $(IMAGE_NAME):$(DOCKER_TAG) to Docker Hub...\033[0m"
	docker tag $(IMAGE_NAME):$(DOCKER_TAG) pablom392/topito-client:$(DOCKER_TAG)
	docker push pablom392/topito-client:$(DOCKER_TAG)
