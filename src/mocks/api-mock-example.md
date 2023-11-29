# backworker
js
- PUT localhost:4040/launch
{
    "devuser_secret": "sign secret",
    "token": "......",
    "back_json": {
        "data": {},
        "coffers": {},
        "info": {
            "messages": {},
            "settings": {
                "crono": false,
                "pii": false,
                "connection_pool": 20,
                "rate_limit": 50
            }
        },
        "jobs": {}
    }
}

- PUT localhost:4040/stop_back
{
	"devuser_secret": "sign secret",
	"token": "......."
}

- PUT localhost:4040/resume_back
{
	"devuser_secret": "sign secret",
	"token": "......."
}

- PUT localhost:4040/update_settings
{
	"devuser_secret": "sign secret",
	"token": ".......",
	"crono": "boolean",
	"pii": "boolean",
	"connection_pool": "integer",
	"rate_limit": "integer"
}

# Auther
js
- PUT localhost:5050/authenticate
{
	"email": "string",
	"password": "string"
}
return:
{
	"code": 200,
	"expiration_datetime": "date string",
	"auth_token": "sign secret"
}

- PUT localhost:5050/refresh
{
	"auth_token": "sign secret",
	"email": "string"
	
}
return:
{
	"code": 200,
	"expiration_datetime": "date string",
	"auth_token": "sign secret"
}

- PUT localhost:5050/signin
{
	"email": "string",
	"password": "string"
}
return
{
	"code": 200,
	"auth_code": "sign secret",
	"message": "success, please validate your email || email taked"
}

- GET localhost:5050/validate_email/:email/:code
return
{
	"code": 200,
	"result": "verified || no_effect"
}
