include .env

.PHONY: mongo-run
mongo-run:
	docker run -d \
	-p ${DB_PORT}:${DB_PORT} \
	-v ${PWD}/database:/data/db \
	-e MONGO_INITDB_ROOT_USERNAME=${DB_USER} \
  -e MONGO_INITDB_ROOT_PASSWORD=${DB_PASS} \
  -e MONGO_INITDB_DATABASE=${DB_NAME} \
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

.PHONY: mongo-wipe-all
mongo-wipe-all:
	docker rm -fv ${DB_CONTAINER} && \
	rm -rf database

.PHONY: remove-modules
remove-modules:
	rm -rf node_modules
