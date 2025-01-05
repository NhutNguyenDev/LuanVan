package service;

import dao.userDAO;
import model.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import com.google.gson.Gson;

import java.util.List;

/**
 *
 * @author b2110947
 */
public class userService {

    userDAO userDao = new userDAO();

    public void updateUser(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, SQLException {

        String gmail = request.getParameter("gmail");
        String userName = request.getParameter("userName");
        String passWord = request.getParameter("passWord");
        int id = Integer.parseInt(request.getParameter("id"));

        User newUser = new User(id, userName, passWord, gmail);

        // Update to DB
        String responseINSERT = userDao.updateUser(newUser);

        // Edit response
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Return response
        response.getWriter().write(responseINSERT);
    }

    public void addUser(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, SQLException {
        String gmail = request.getParameter("gmail");
        String userName = request.getParameter("userName");
        String passWord = request.getParameter("passWord");

        User newUser = new User(userName, passWord, gmail);

        // Insert to DB
        String responseINSERT = userDao.insertUser(newUser);

        // Edit response
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Return response
        response.getWriter().write(responseINSERT);
    }

    public void deleteUsers(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, SQLException {
        int id = Integer.parseInt(request.getParameter("id"));

        // Delete user in DB
        String responseDELETE = userDao.deleteUser(id);

        // Edit response
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Return response
        response.getWriter().write(responseDELETE);
    }

    public void listUsers(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, SQLException {

        // Get list user from DB
        List<User> users = userDao.getAllUsers();

        // Convert to JSON
        Gson gson = new Gson();
        String json = gson.toJson(users);

        // Edit response
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Return response
        response.getWriter().write(json);
    }

    public void login(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, SQLException {
        
        String userName = request.getParameter("userName");
        String passWord = request.getParameter("passWord");
        
        
        // Login
        String responseLOGIN = userDao.login(userName,passWord);

        // Edit response
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Return response
        response.getWriter().write(responseLOGIN);
    }
}
