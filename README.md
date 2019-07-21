**Mini WordPress**
----------------------------------------
## Endpoint
baseUrl = http:localhost:3000
### Not requires a Token : 
#### User Routes
| `Routes`| `Method` | `Request Body` | `Response Data`| `Response Error` | `Description` |
|---------|----------|----------------|----------------|------------------|---------------|
| /users/register| POST | { name, email, password } | { access_token } | 400(email has been registered!) <br>400(email format is wrong!)<br> 400(email required!)<br> 400(password length more than 6 characters!)<br> 400(password required!)|Register a new user|
| /users/login | POST | { email, password }| { name, access_token }| 400(email/password wrong!) |Log in|
| /users/loginGoogle | POST | { id_token } | { name, access_token } | |Sign in with Google|
### Requires a Token :
#### Article Routes ({ headers: { token } })
| `Routes`| `Method` | `Request Body` | `Response Data`| `Response Error` | `Description` |
|---------|----------|----------------|----------------|------------------|---------------|
| / | GET | - | { data }| <br> 500 (Internal Server Error) |  Get all article
| / | POST | {title, content, image} | { data }| 401 (Invalid Token) <br> 401 (you have to login first!) <br> 500 (Internal Server Error) | Create new Article|
| /:id | GET | - | {data} | 401(Invalid Token) <br> 401(you have to login first!) <br> | Get article by params id |
| /getAll/myArticle | GET | - | {data} | 401 (Invalid Token)<br> 401 (you have to login first!) <br> 401 (Unauthorized) <br> 404 (Unauthorized) <br> 500 (Internal Server Error) | Get all article that belongs to user |
| /:id | DELETE | - | { completed } | 401 (Invalid Token)<br> 401 (you have to login first!) <br> 404 (Unauthorized) <br> 500 (Internal Server Error) | Delete your Article |
| /:id| PATCH | - | { success } | 401 (Invalid Token)<br> 401 (you have to login first!) <br> 404 (Unauthorized) <br> 500 (Internal Server Error) | Edit Article data |
| /upload | POST | - | ${ success message }| 401 (Invalid Token)<br> 401 (you have to login first!) <br> 500 (Internal Server Error) | Upload image to Google Cloud Storage |