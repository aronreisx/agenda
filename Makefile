include .env

.PHONY: mongo-run
mongo-run:
	docker run -d \
	-p ${DB_PORT}:27017 \
	-v ${PWD}/database:/data/db \
	-e MONGO_INITDB_ROOT_USERNAME=${DB_USER} \
    -e MONGO_INITDB_ROOT_PASSWORD=${DB_USER} \
	--name ${DB_CONTAINER} \
	mongo:latest

.PHONY: mongo-stop
mongo-stop:
	docker stop ${DB_CONTAINER}

.PHONY: mongo-terminal
mongo-terminal:
	docker exec -it ${DB_CONTAINER} bash

.PHONY: mongo-logs
mongo-logs:
	docker logs ${DB_CONTAINER}