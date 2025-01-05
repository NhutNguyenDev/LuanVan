<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Welcom page</title>
        <link rel="stylesheet" type="text/css" href="./css/CrudCssForUser.css">

    </head>
    <body>
        <h1>First page when start User Service !</h1>
        <h1>CRUD Operations</h1>

        <!-- Create Section -->
        <h2>Create Data</h2>
        <form method="GET">
            <label for="createGmail">Gmail:</label>
            <input type="email" name="gmail" id="createGmail" placeholder="Enter Gmail" required>
            <label for="createUserName">Username:</label>
            <input type="text" name="userName" id="createUserName" placeholder="Enter Username" required>
            <label for="createPassword">Password:</label>
            <input type="password" name="passWord" id="createPassword" placeholder="Enter Password" required>
            <button type="submit" id="createBtn">Create</button>
        </form>

        <!-- Read Section -->
        <div class="crud-section">
            <h2>Read Data</h2>
            <label for="readUserName">Username:</label>
            <input type="text" id="readUserName" placeholder="Enter Username">
            <button onclick="alert('Read operation triggered')">Read</button>
        </div>

        <!-- Update Section -->
        <div class="crud-section">
            <h2>Update Data</h2>
            <label for="updateGmail">Gmail:</label>
            <input type="email" id="updateGmail" placeholder="Enter Gmail">
            <label for="updateUserName">Username:</label>
            <input type="text" id="updateUserName" placeholder="Enter Username">
            <label for="updatePassword">Password:</label>
            <input type="password" id="updatePassword" placeholder="Enter Password">
            <button onclick="alert('Update operation triggered')">Update</button>
        </div>

        <!-- Delete Section -->
        <div class="crud-section">
            <h2>Delete Data</h2>
            <label for="deleteGmail">Gmail:</label>
            <input type="email" id="deleteGmail" placeholder="Enter Gmail">
            <button onclick="alert('Delete operation triggered')">Delete</button>
        </div>

        <script>
            document.getElementById("createBtn").addEventListener("click", function () {
                // Get input values
                const gmail = document.getElementById("createGmail").value;
                const userName = document.getElementById("createUserName").value;
                const passWord = document.getElementById("createPassword").value;

                // Prepare data for the POST request
                const requestData = {
                    gmail: gmail,
                    username: userName,
                    password: passWord
                };

                // Make an AJAX POST request
                const xhr = new XMLHttpRequest();
                xhr.open("GET", "http://localhost:8080/userService/api?action=new", true);
                xhr.setRequestHeader("Content-Type", "application/json");

                // Handle the response
                xhr.onload = function () {
                    const responseDiv = document.getElementById("createResponse");
                    if (xhr.status === 200) {
                        responseDiv.textContent = "User created successfully: " + xhr.responseText;
                    } else {
                        responseDiv.textContent = "Error creating user: " + xhr.status + " - " + xhr.statusText;
                    }
                };

                xhr.onerror = function () {
                    document.getElementById("createResponse").textContent = "An error occurred during the request.";
                };

                // Send the request
                xhr.send(JSON.stringify(requestData));
            });
        </script>
    </body>
</html>
