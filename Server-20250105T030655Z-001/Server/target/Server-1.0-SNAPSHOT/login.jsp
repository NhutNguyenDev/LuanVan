<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Welcom page</title>
        <link rel="stylesheet" type="text/css" href="./css/login.css">

    </head>
    <body>
        <h1>This is Server</h1>
        <h2>Login</h2>
        <form action="http://localhost:8080/userService/api?action=login" method="POST"> 
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" name="userName" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" name="passWord" required>
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
        <p>Don't have an account? <a href="register.jsp">Register here</a></p>
    </body>
</html>
