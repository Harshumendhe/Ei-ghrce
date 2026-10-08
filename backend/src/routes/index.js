import { Router } from "express";
import jwt from "jsonwebtoken";
import uploadRoutes from "./upload.js";

import {
  TeamMember,
  Event,
  Project,
  Gallery,
  JoinRequest,
  ContactMessage,
  User,
} from "../models/index.js";

import { auth, adminOnly } from "../middleware/auth.js";

const r = Router();


// =========================================================
// CLOUDINARY UPLOAD ROUTES
// =========================================================

r.use("/upload", uploadRoutes);


// =========================================================
// ADMIN LOGIN
// =========================================================

r.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return res.status(500).json({
        message: "Admin credentials are not configured on server.",
      });
    }

    const emailMatches =
      email.trim().toLowerCase() === adminEmail.trim().toLowerCase();

    const passwordMatches = password === adminPassword;

    if (!emailMatches || !passwordMatches) {
      return res.status(401).json({
        message: "Invalid admin email or password.",
      });
    }

    const token = jwt.sign(
      {
        email: adminEmail,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.json({
      message: "Admin login successful.",
      token,
      admin: {
        email: adminEmail,
        role: "admin",
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      message: "Unable to login. Please try again.",
    });
  }
});


// =========================================================
// ADMIN PROFILE
// =========================================================

r.get("/admin/me", auth, adminOnly, async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      {
        email: req.user.email,
        name: "Engineering India Admin",
        role: "admin",
      },
      {
        upsert: true,
        new: true,
      }
    );

    res.json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
});


// =========================================================
// SINGLE EVENT DETAIL
// =========================================================
// Public route
// Used by: /events/:id
// =========================================================

r.get("/events/:id", async (req, res, next) => {
  try {
    const data = await Event.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: "Event not found.",
      });
    }

    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
});


// =========================================================
// CONTENT CRUD
// =========================================================

const models = {
  team: TeamMember,
  events: Event,
  projects: Project,
  gallery: Gallery,
};


// =========================================================
// GET / CREATE / UPDATE / DELETE
// =========================================================

for (const [key, Model] of Object.entries(models)) {

  // -------------------------------------------------------
  // GET ALL
  // -------------------------------------------------------

  r.get(`/${key}`, async (req, res, next) => {
    try {
      const data = await Model.find().sort({
        createdAt: -1,
      });

      res.json({
        data,
      });
    } catch (error) {
      next(error);
    }
  });


  // -------------------------------------------------------
  // CREATE
  // -------------------------------------------------------

  r.post(`/${key}`, auth, adminOnly, async (req, res, next) => {
    try {
      const data = await Model.create(req.body);

      res.status(201).json({
        message: `${key} created successfully.`,
        data,
      });
    } catch (error) {
      next(error);
    }
  });


  // -------------------------------------------------------
  // UPDATE
  // -------------------------------------------------------

  r.put(`/${key}/:id`, auth, adminOnly, async (req, res, next) => {
    try {
      const data = await Model.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!data) {
        return res.status(404).json({
          message: `${key} not found.`,
        });
      }

      res.json({
        message: `${key} updated successfully.`,
        data,
      });
    } catch (error) {
      next(error);
    }
  });


  // -------------------------------------------------------
  // DELETE
  // -------------------------------------------------------

  r.delete(`/${key}/:id`, auth, adminOnly, async (req, res, next) => {
    try {
      const data = await Model.findByIdAndDelete(req.params.id);

      if (!data) {
        return res.status(404).json({
          message: `${key} not found.`,
        });
      }

      res.json({
        message: `${key} deleted successfully.`,
      });
    } catch (error) {
      next(error);
    }
  });
}


// =========================================================
// JOIN APPLICATIONS
// =========================================================

// ---------------------------------------------------------
// PUBLIC - Submit Join Application
// ---------------------------------------------------------

r.post("/join", async (req, res, next) => {
  try {
    const data = await JoinRequest.create(req.body);

    res.status(201).json({
      message: "Your application has been submitted successfully.",
      data,
    });
  } catch (error) {
    next(error);
  }
});


// ---------------------------------------------------------
// ADMIN - Get Join Applications
// ---------------------------------------------------------

r.get("/join", auth, adminOnly, async (req, res, next) => {
  try {
    const data = await JoinRequest.find().sort({
      createdAt: -1,
    });

    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
});


// ---------------------------------------------------------
// ADMIN - Delete Join Application
// ---------------------------------------------------------

r.delete("/join/:id", auth, adminOnly, async (req, res, next) => {
  try {
    const data = await JoinRequest.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: "Join application not found.",
      });
    }

    res.json({
      message: "Join application deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
});


// =========================================================
// CONTACT MESSAGES
// =========================================================

// ---------------------------------------------------------
// PUBLIC - Contact Form
// ---------------------------------------------------------

r.post("/contact", async (req, res, next) => {
  try {
    const data = await ContactMessage.create(req.body);

    res.status(201).json({
      message: "Your message has been sent successfully.",
      data,
    });
  } catch (error) {
    next(error);
  }
});


// ---------------------------------------------------------
// ADMIN - Get Contact Messages
// ---------------------------------------------------------

r.get("/contact", auth, adminOnly, async (req, res, next) => {
  try {
    const data = await ContactMessage.find().sort({
      createdAt: -1,
    });

    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
});


// ---------------------------------------------------------
// ADMIN - Delete Contact Message
// ---------------------------------------------------------

r.delete("/contact/:id", auth, adminOnly, async (req, res, next) => {
  try {
    const data = await ContactMessage.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: "Message not found.",
      });
    }

    res.json({
      message: "Message deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
});


// =========================================================
// EXPORT
// =========================================================

export default r;