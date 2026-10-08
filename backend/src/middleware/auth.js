import jwt from "jsonwebtoken";

/*
|--------------------------------------------------------------------------
| AUTH MIDDLEWARE
|--------------------------------------------------------------------------
| Checks whether the request contains a valid JWT token.
|
| Header format:
| Authorization: Bearer YOUR_TOKEN
|--------------------------------------------------------------------------
*/

export function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required. Please login first.",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Authentication token missing.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);

    return res.status(401).json({
      message: "Invalid or expired authentication token.",
    });
  }
}


/*
|--------------------------------------------------------------------------
| ADMIN ONLY MIDDLEWARE
|--------------------------------------------------------------------------
| Allows only the administrator account to access protected
| admin routes.
|--------------------------------------------------------------------------
*/

export function adminOnly(req, res, next) {
  try {
    const adminEmail = (
      process.env.ADMIN_EMAIL || ""
    ).trim().toLowerCase();

    const loggedInEmail = (
      req.user?.email || ""
    ).trim().toLowerCase();

    const userRole = req.user?.role;

    /*
     * Both conditions must be true:
     *
     * 1. Logged-in email must match ADMIN_EMAIL
     * 2. JWT role must be "admin"
     */

    if (
      !loggedInEmail ||
      loggedInEmail !== adminEmail ||
      userRole !== "admin"
    ) {
      return res.status(403).json({
        message: "Admin access denied.",
      });
    }

    next();
  } catch (error) {
    console.error("Admin authorization error:", error.message);

    return res.status(403).json({
      message: "Admin access denied.",
    });
  }
}