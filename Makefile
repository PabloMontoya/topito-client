.PHONY: build run stop

IMAGE_NAME := topito-client

# port mapping (host:container)
PORT := 8080:80

build:
	@echo "\033[1;34m🔨 Building $(IMAGE_NAME)...\033[0m"
	docker build -t $(IMAGE_NAME) .

run:
	@echo "\033[1;32m🚀 Running $(IMAGE_NAME)...\033[0m"
	docker run -d -p $(PORT) --name $(IMAGE_NAME)-container $(IMAGE_NAME)

stop:
	@echo "\033[1;31m🛑 Stopping $(IMAGE_NAME)...\033[0m"
	docker stop $(IMAGE_NAME)-container
	docker rm $(IMAGE_NAME)-container

nuke:
	@echo "\033[1;35m💥 Nuking all Docker data...\033[0m"
	docker system prune -a -f --volumes
