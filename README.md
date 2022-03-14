# Auth-Module-Final-Project

this will be our final project for the auth module.

in this project, we are trying to imetitate a blog website where we have different roles for each user:

- User : who can only read articles.
- Writer : who can read and write articles.
- Editor : who can read, write and edit articles.
- Admin : who can read, write, edit and delete articles.

We have created a server containg only the home rout which can be accessed by sending a get request to the endpoint ("/").

Two route files were created, one for the user routes which has the following definition:

1. ## User routes

   - app.get("/users", getUsersHandler) ==> this route is to list all users added to the Users table in the database

   - router.post("/signup", signupHandler) ==> in this route, we are simply creating a record into the table using values passed in the request object body as a json format, but before we create the new user; we need to hash the password using the bcrypt.hash(password, 15) method.

   - router.post("/signin", basic(users), signinHandler) ==> in this route, we are implementing the basic authorization by the use of the basicAuth middleware, what it does is that it take the user name, search for the database for a record with this user name, and finally compare the entered password with the hashed password for this user name by using bcrypt.compare(password, user,password), if Yes we return the user and create anew web token for this user.

   - router.get("/articles", bearer(users), getArticlesHandler) ==> in this route, we are implementing the bearer authentication, inorder to be able to read articles on this page, you need to be signed in, which means that a bearer auth token must be provided.
     what we basicaly do is that we take the token from the request.headers.authorization and use JWT.verify method to get the user name, once we have a user name we search for the database to see if there is a valid user with this username and if yes then he/she will be authorized to access this route.

2. ## Article Routes

In this route is where we have implemented the Access Control List and Role Based Access Control.

    - router.get("/article", bearerAuth(users), acl("read"), readArticleHandler) ==> in this route, first we check if the user is already signed in and has a valid token, if yes we call the acl middleware with an action as input ("read"), what this middleware does is that it searches in the user actions array to see if the action passed here is found there, if yes then this user can read this article.

    - router.post("/article", bearerAuth(users), acl("create"), createNewArticle) ==> same as before, but for the user to be able to write an article; it needs to have ("create") property in his actions, so we pass the create as an argument for this middleware and search for it in the user actions array.

    - router.put("/article", bearerAuth(users), acl("update"), updateArticle) ==> nothing new in this route; only that this time the request is update so we search for ("update") in the user's actions array.

    - router.delete("/article", bearerAuth(users), acl("delete"), deleteArticle) ==> nothing new in this route; only that this time the request is delete so we search for ("delete") in the user's actions array. this can only be accessed by a user with a role of Admin.
    
## UML 
![UML](https://user-images.githubusercontent.com/90922969/158219930-99faaac8-aaae-435d-a3a6-eec53ffa0d58.jpg)

