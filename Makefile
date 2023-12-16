.PHONY: build-dev run-dev build-prod run-prod stop nuke push

# Docker
IMAGE_NAME := topito-client
IMAGE_NAME_DEV := topito-client-dev
DOCKER_TAG := 1.0
# port mapping for production (host:container)
PORT_PROD := 8080:80
# port mapping for development (host:container)
PORT_DEV := 3000:3000

# Development environment
build-dev:
	@echo "\033[1;34m🔨 Building $(IMAGE_NAME_DEV) for development...\033[0m"
	docker build -f Dockerfile.dev -t $(IMAGE_NAME_DEV):$(DOCKER_TAG) .

run-dev:
	@echo "\033[1;32m🚀 Running $(IMAGE_NAME_DEV) for development...\033[0m"
	docker run -it -v ${PWD}:/app -v /app/node_modules -p $(PORT_DEV) --rm --name $(IMAGE_NAME_DEV)-$(DOCKER_TAG) $(IMAGE_NAME_DEV):$(DOCKER_TAG)

# Production environment
build-prod:
	@echo "\033[1;34m🔨 Building $(IMAGE_NAME) for production...\033[0m"
	docker build -f Dockerfile.prod -t $(IMAGE_NAME):$(DOCKER_TAG) .

run-prod:
	@echo "\033[1;32m🚀 Running $(IMAGE_NAME) for production...\033[0m"
	docker run -d -p $(PORT_PROD) --name $(IMAGE_NAME)-$(DOCKER_TAG) $(IMAGE_NAME):$(DOCKER_TAG)

stop:
	@echo "\033[1;31m🛑 Stopping $(IMAGE_NAME) and $(IMAGE_NAME_DEV)...\033[0m"
	-docker stop $(IMAGE_NAME)-$(DOCKER_TAG)
	-docker rm $(IMAGE_NAME)-$(DOCKER_TAG)
	-docker stop $(IMAGE_NAME_DEV)-$(DOCKER_TAG)
	-docker rm $(IMAGE_NAME_DEV)-$(DOCKER_TAG)

nuke:
	@echo "\033[1;35m💥 Nuking all Docker data...\033[0m"
	docker system prune -a -f --volumes

push:
	@echo "\033[1;36m📤 Pushing $(IMAGE_NAME):$(DOCKER_TAG) to Docker Hub...\033[0m"
	docker tag $(IMAGE_NAME):$(DOCKER_TAG) pablom392/topito-client:$(DOCKER_TAG)
	docker push pablom392/topito-client:$(DOCKER_TAG)
