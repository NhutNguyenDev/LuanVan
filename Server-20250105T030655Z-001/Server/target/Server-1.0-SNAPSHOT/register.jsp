
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <link rel="stylesheet" type="text/css" href="./css/register.css">
    </head>
    <body>
        <h2>Register</h2>
        <form action="http://localhost:8080/userService/api?action=add" method="POST">
            <div>
                <label for="gmail">Gmail:</label>
                <input type="email" id="gmail" name="gmail" required>
            </div>
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" name="userName" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" name="passWord" required>
            </div>
            <div>
                <button type="submit">Register</button>
            </div>
        </form>
        <p>Already have an account? <a href="login.jsp">Login here</a></p>
    </body>
</html>
