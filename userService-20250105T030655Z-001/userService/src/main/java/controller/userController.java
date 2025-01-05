package controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import service.userService;

import java.io.IOException;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author b2110947
 */
@WebServlet(name = "userController", urlPatterns = {"/api"})
public class userController extends HttpServlet {

    userService userService = new userService();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String action = request.getParameter("action");
        if (action == null) {
            action = "anything";
        }
        try {

            switch (action) {
                case "delete":
                    userService.deleteUsers(request, response);
                    break;
                case "list":
                    userService.listUsers(request, response);
                    break;
                default:
                    response.getWriter().write("You don't give me any action ( new,update,delete... )");
                    break;
            }
        } catch (SQLException ex) {
            Logger.getLogger(userController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String action = request.getParameter("action");
        try {
            switch (action) {
                case "add":
                    userService.addUser(request, response);
                    break;
                case "login":
                    userService.login(request, response);
                    break;
                case "update":
                    userService.updateUser(request, response);
                    break;
                default:
                    response.getWriter().write("POST request : You don't give me any action ( new,update,delete... )");
                    break;
            }
        } catch (SQLException ex) {
            Logger.getLogger(userController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
