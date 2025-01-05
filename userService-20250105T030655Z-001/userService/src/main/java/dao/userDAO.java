package dao;

import model.User;
import util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author b2110947
 */
public class userDAO {

    private Connection conn;

    public userDAO() {
        conn = DBConnection.getConnection();
    }

    public String insertUser(User user) {
        String sql = "INSERT INTO users (gmail, userName, passWord) VALUES (?, ?, ?)";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, user.getGmail());
            stmt.setString(2, user.getUserName());
            stmt.setString(3, user.getPassWord());
            if (stmt.executeUpdate() > 0) {
                return "Add new user SUCCESS !";
            }
            return "Add new user FAIL !";
        } catch (SQLException e) {
            System.err.println("Error inserting user: " + e.getMessage());
        }
        return "Add new user FAIL !";
    }

    public List<User> getAllUsers() throws SQLException {
        List<User> users = new ArrayList<>();
        String sql = "SELECT * FROM users";
        try (Statement stmt = conn.createStatement(); ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                users.add(new User(
                        rs.getInt("id"),
                        rs.getString("userName"),
                        rs.getString("passWord"),
                        rs.getString("gmail")
                ));
            }
        }
        return users;
    }

    public String updateUser(User user) throws SQLException {
        String sql = "UPDATE users SET gmail = ?, userName = ?, passWord = ? WHERE id = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, user.getGmail());
            stmt.setString(2, user.getUserName());
            stmt.setString(3, user.getPassWord());
            stmt.setInt(4, user.getId());
            if (stmt.executeUpdate() > 0) {
                return "UPDATE user SUCCESS !";
            }
            return "UPDATE user FAIL !";
        } catch (SQLException e) {
            System.err.println("Error update user: " + e.getMessage());
        }
        return "UPDATE user FAIL !";
    }

    public String deleteUser(int userId) throws SQLException {
        String sql = "DELETE FROM users WHERE id = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, userId);
            if (stmt.executeUpdate() > 0) {
                return "DELETE user SUCCESS !";
            }
            return "DELETE user FAIL !";
        } catch (SQLException e) {
            System.err.println("Error DELETE user: " + e.getMessage());
        }
        return "DELETE user FAIL !";
    }

    public String login(String userName, String passWord) {
        String sql = "SELECT passWord FROM users WHERE userName = ?";
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            System.out.println("userName: " + userName + " PassWord: " + passWord);
            pstmt.setString(1, userName);

            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {

                    if (rs.getString("passWord").equals(passWord)) {
                        return "LOGIN SUCCESS!";
                    } else {
                        return "Incorrect Password!";
                    }
                } else {
                    return "User Not Found!";
                }
            }
        } catch (SQLException e) {
            System.err.println("Error LOGIN: " + e.getMessage());
        }

        return "LOGIN FAIL!";
    }

}
