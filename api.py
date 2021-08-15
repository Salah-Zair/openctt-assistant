import secrets
from http import cookies
from starlette.requests import Request
from starlette.middleware.sessions import SessionMiddleware

from fastapi import FastAPI
from fastapi import Header

app = FastAPI()
app.add_middleware(SessionMiddleware,
                   secret_key=secrets.token_urlsafe(16),
                   session_cookie=secrets.token_urlsafe(16),
                   max_age=10
                   )


@app.get("/")
async def root(request: Request):
    print(request.session.setdefault("me",'sfsdaf'))
    print(request.session.get("me"))
    c = cookies.SimpleCookie()
    c['MySessionID'] = secrets.token_urlsafe(16)
    c['MySessionID']['max-age'] = 1  # seconds
    return {"message": "Hello World", 'co': request.cookies}


@app.get("/items/")
async def read_items(*, user_agent: str = Header(None), cooks: str = Header(None), request: Request):
    request.cookies["mytest"] = "gsd567f"
    print(request.session.get("me"))

    return {"User-Agent": user_agent, "Cookies": request.cookies}
