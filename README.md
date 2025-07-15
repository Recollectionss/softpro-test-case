> ⚠️ **Warning**  
> This repository contains shell script:  and `int_db.sh`.  
> Please review their contents before executing, as they can modify your system environment or database.


## Project setup

### Set configuration variables
First you need copy all from example.env to .env

```bash
$ cp example.env .env
```


Start docker
```bash
$ docker compose up
```


### API
```url
http://localhost:5010/api/docs/
```

### Users
- Client
    - username: client@gmail.com
    - password: client1
- Provider
    - username: provider@gmail.com
    - password: provider