# Backend

## Environment

If a file is used, one is necessary for each environment

```.env
MONGO_USERNAME=
MONGO_PASSWORD=
MONGO_CLUSTER=
MONGO_DBNAME=
```

## Docker

build:

```bash
docker build -t gcr.io/sa-1s2022/backend:latest .
```

push:

```bash
docker push gcr.io/sa-1s2022/backend:latest
```
