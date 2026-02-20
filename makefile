COMPOSE = docker compose -f local.yml

.PHONY: build up down down-v show-logs show-logs-api \
        makemigrations migrate collectstatic superuser \
        db-volume mailpit-volume department-db

build:
	$(COMPOSE) up --build -d --remove-orphans

up:
	$(COMPOSE) up -d

down:
	$(COMPOSE) down

down-v:
	$(COMPOSE) down -v

show-logs:
	$(COMPOSE) logs

show-logs-api:
	$(COMPOSE) logs api

makemigrations:
	$(COMPOSE) run --rm api python manage.py makemigrations

migrate:
	$(COMPOSE) run --rm api python manage.py migrate

collectstatic:
	$(COMPOSE) run --rm api python manage.py collectstatic --no-input --clear

superuser:
	$(COMPOSE) run --rm api python manage.py createsuperuser

db-volume:
	docker volume inspect api_department_prod_postgres_data

mailpit-volume:
	docker volume inspect api_department_prod_mailpit_data

shell:
	$(COMPOSE) exec api bash

department-db:
	$(COMPOSE) exec postgres psql --username=mihawk-53 --dbname=estate