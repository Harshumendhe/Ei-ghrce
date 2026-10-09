import { FormEvent, useEffect, useState } from "react";
import {
  BarChart3,
  CalendarDays,
  ChevronRight,
  FolderKanban,
  GalleryHorizontal,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Plus,
  RefreshCw,
  Settings,
  ShieldCheck,
  Pencil,
  Trash2,
  Users,
  X,
  Loader2,
  Eye,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

/* =========================================================
   CONFIG
========================================================= */

const API_URL = "http://localhost:5000/api";

/* =========================================================
   TYPES
========================================================= */

type ModuleName =
  | "Dashboard"
  | "Members"
  | "Events"
  | "Projects"
  | "Gallery"
  | "Join Applications"
  | "Messages"
  | "Settings";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  branch?: string;
  year?: string;
  domain?: string;
  photo?: string;
  linkedin?: string;
  instagram?: string;
  createdAt?: string;
}

interface EventItem {
  _id: string;
  title: string;
  date: string;
  location?: string;
  format?: string;
  category?: string;
  summary: string;
  description?: string;
  image?: string;
  status?: string;
  createdAt?: string;
}

interface ProjectItem {
  _id: string;
  name: string;
  problem: string;
  team?: string[];
  tools?: string[];
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
  category?: string;
  createdAt?: string;
}

interface GalleryItem {
  _id: string;
  image: string;
  caption?: string;
  category?: string;
  createdAt?: string;
}

interface JoinRequest {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
  branch?: string;
  year?: string;
  section?: string;
  domain?: string;
  interest?: string;
  status?: string;
  createdAt?: string;
}

interface ContactMessage {
  _id: string;
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  read?: boolean;
  reply?: string;
  createdAt?: string;
}

/* =========================================================
   MODULES
========================================================= */

const modules: {
  name: ModuleName;
  icon: any;
}[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Members",
    icon: Users,
  },
  {
    name: "Events",
    icon: CalendarDays,
  },
  {
    name: "Projects",
    icon: FolderKanban,
  },
  {
    name: "Gallery",
    icon: GalleryHorizontal,
  },
  {
    name: "Join Applications",
    icon: Mail,
  },
  {
    name: "Messages",
    icon: Mail,
  },
  {
    name: "Settings",
    icon: Settings,
  },
];

/* =========================================================
   ADMIN LOGIN
========================================================= */

export function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim() || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Invalid admin email or password."
        );
      }

      if (!data.token) {
        throw new Error("Authentication token was not received.");
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem(
        "adminEmail",
        data.admin?.email || email.trim()
      );
      localStorage.setItem(
        "adminRole",
        data.admin?.role || "admin"
      );

      setSuccess("Login successful! Opening Admin Panel...");

      setTimeout(() => {
        navigate("/admin", {
          replace: true,
        });
      }, 500);
    } catch (error: any) {
      console.error("Admin login error:", error);

      setError(
        error?.message ||
          "Unable to connect to server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="engineering-bg flex min-h-screen items-center justify-center px-5">
      <div className="glow glow-orange left-[-200px] top-[-100px]" />
      <div className="glow glow-green bottom-[-150px] right-[-150px]" />

      <div className="relative z-10 w-full max-w-md">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-3 text-sm text-zinc-500 transition hover:text-white"
        >
          ← Back to website
        </Link>

        <div className="premium-card p-7 md:p-9">
          <div className="flex items-center gap-4">
            <img
              src="/assets/engineering-india-ghrce-logo.png"
              alt="Engineering India GHRCE"
              className="h-16 w-16 rounded-full object-contain"
            />

            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-orange-500">
                Secure Access
              </div>

              <h1 className="mt-1 text-2xl font-black">
                Admin Login
              </h1>
            </div>
          </div>

          <p className="mt-6 text-sm leading-6 text-zinc-500">
            Sign in with your authorized Engineering India administrator
            account.
          </p>

          {error && (
            <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
              ❌ {error}
            </div>
          )}

          {success && (
            <div className="mt-5 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-400">
              ✅ {success}
            </div>
          )}

          <form
            onSubmit={submit}
            className="mt-7 space-y-4"
          >
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Admin Email
              </label>

              <input
                required
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className="input-field w-full"
                placeholder="Admin email"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Password
              </label>

              <input
                required
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="input-field w-full"
                placeholder="Password"
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                  Signing In...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In
                  <ShieldCheck size={17} />
                </span>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-white/10 pt-5 text-center text-xs text-zinc-600">
            Authorized administrators only.
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ADMIN DASHBOARD
========================================================= */

export function AdminDashboard() {
  const navigate = useNavigate();

  const [active, setActive] =
    useState<ModuleName>("Dashboard");

  const [mobileOpen, setMobileOpen] = useState(false);

  const [checking, setChecking] = useState(true);

  const [adminEmail, setAdminEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* =======================================================
     DATA STATES
  ======================================================= */

  const [members, setMembers] = useState<TeamMember[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [joinRequests, setJoinRequests] =
    useState<JoinRequest[]>([]);
  const [messages, setMessages] =
    useState<ContactMessage[]>([]);

  /* =======================================================
     FORM STATES
  ======================================================= */

  const [showMemberForm, setShowMemberForm] =
    useState(false);

  const [showEventForm, setShowEventForm] =
    useState(false);

  const [showProjectForm, setShowProjectForm] =
    useState(false);

  const [showGalleryForm, setShowGalleryForm] =
    useState(false);

  const [editingMember, setEditingMember] =
    useState<TeamMember | null>(null);

  const [editingEvent, setEditingEvent] =
    useState<EventItem | null>(null);

  const [editingProject, setEditingProject] =
    useState<ProjectItem | null>(null);

  const [editingGallery, setEditingGallery] =
    useState<GalleryItem | null>(null);

  /* =======================================================
     AUTH CHECK
  ======================================================= */

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const role = localStorage.getItem("adminRole");
    const email = localStorage.getItem("adminEmail");

    if (!token || role !== "admin" || !email) {
      navigate("/admin/login", {
        replace: true,
      });

      return;
    }

    setAdminEmail(email);
    setChecking(false);
  }, [navigate]);

  /* =======================================================
     API HELPER
  ======================================================= */

  const apiRequest = async (
    endpoint: string,
    options: RequestInit = {}
  ) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminEmail");
      localStorage.removeItem("adminRole");

      navigate("/admin/login", {
        replace: true,
      });

      throw new Error("Admin session expired.");
    }

    const headers = new Headers(options.headers);

    if (!(options.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }

    headers.set("Authorization", `Bearer ${token}`);

    const response = await fetch(
      `${API_URL}${endpoint}`,
      {
        ...options,
        headers,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminEmail");
        localStorage.removeItem("adminRole");

        navigate("/admin/login", {
          replace: true,
        });
      }

      throw new Error(
        data.message || "Something went wrong."
      );
    }

    return data;
  };

  /* =======================================================
     LOAD ALL DATA
  ======================================================= */

  const loadAllData = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        membersData,
        eventsData,
        projectsData,
        galleryData,
        joinData,
        contactData,
      ] = await Promise.all([
        apiRequest("/team"),
        apiRequest("/events"),
        apiRequest("/projects"),
        apiRequest("/gallery"),
        apiRequest("/join"),
        apiRequest("/contact"),
      ]);

      setMembers(membersData.data || []);
      setEvents(eventsData.data || []);
      setProjects(projectsData.data || []);
      setGallery(galleryData.data || []);
      setJoinRequests(joinData.data || []);
      setMessages(contactData.data || []);
    } catch (err: any) {
      console.error("Dashboard data error:", err);

      setError(
        err?.message ||
          "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!checking) {
      loadAllData();
    }
  }, [checking]);

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminRole");

    navigate("/admin/login", {
      replace: true,
    });
  };

  /* =======================================================
     DELETE HANDLER
  ======================================================= */

  const handleDelete = async (
    endpoint: string,
    id: string,
    successText: string
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);
      setError("");
      setMessage("");

      await apiRequest(`${endpoint}/${id}`, {
        method: "DELETE",
      });

      setMessage(successText);

      await loadAllData();
    } catch (err: any) {
      setError(
        err?.message ||
          "Unable to delete item."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     IMAGE UPLOAD
  ======================================================= */

  const uploadImage = async (file: File) => {
    if (!file) {
      throw new Error("Please select an image.");
    }

    if (!file.type.startsWith("image/")) {
      throw new Error("Please select a valid image file.");
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error("Image size must be less than 5MB.");
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);

      const data = await apiRequest("/upload/image", {
        method: "POST",
        body: formData,
      });

      if (!data?.url) {
        throw new Error("Image upload failed. URL was not received.");
      }

      return data.url as string;
    } finally {
      setUploading(false);
    }
  };

  /* =======================================================
     CREATE MEMBER
  ======================================================= */

  const createMember = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const photoFile = form.get("photo") as File | null;

    try {
      setLoading(true);
      setError("");
      setMessage("");

      let photoUrl = "";
      if (photoFile && photoFile.size > 0) {
        photoUrl = await uploadImage(photoFile);
      }

      const payload = {
        name: form.get("name"),
        role: form.get("role"),
        branch: form.get("branch"),
        year: form.get("year"),
        domain: form.get("domain"),
        photo: photoUrl,
        linkedin: form.get("linkedin"),
        instagram: form.get("instagram"),
      };

      await apiRequest("/team", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setShowMemberForm(false);

      e.currentTarget.reset();

      setMessage("Member added successfully.");

      await loadAllData();
    } catch (err: any) {
      setError(
        err?.message ||
          "Unable to add member."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     CREATE EVENT
  ======================================================= */

  const createEvent = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const imageFile = form.get("image") as File | null;

    try {
      setLoading(true);
      setError("");
      setMessage("");

      let imageUrl = "";
      if (imageFile && imageFile.size > 0) {
        imageUrl = await uploadImage(imageFile);
      }

      const payload = {
        title: form.get("title"),
        date: form.get("date"),
        location: form.get("location"),
        format: form.get("format"),
        category: form.get("category"),
        summary: form.get("summary"),
        description: form.get("description"),
        image: imageUrl,
        status: form.get("status"),
      };

      await apiRequest("/events", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setShowEventForm(false);

      e.currentTarget.reset();

      setMessage("Event added successfully.");

      await loadAllData();
    } catch (err: any) {
      setError(
        err?.message ||
          "Unable to add event."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     CREATE PROJECT
  ======================================================= */

  const createProject = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const teamValue =
      String(form.get("team") || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

    const toolsValue =
      String(form.get("tools") || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

    const imageFile = form.get("image") as File | null;

    try {
      setLoading(true);
      setError("");
      setMessage("");

      let imageUrl = "";
      if (imageFile && imageFile.size > 0) {
        imageUrl = await uploadImage(imageFile);
      }

      const payload = {
        name: form.get("name"),
        problem: form.get("problem"),
        team: teamValue,
        tools: toolsValue,
        image: imageUrl,
        demoUrl: form.get("demoUrl"),
        githubUrl: form.get("githubUrl"),
        category: form.get("category"),
      };

      await apiRequest("/projects", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setShowProjectForm(false);

      e.currentTarget.reset();

      setMessage("Project added successfully.");

      await loadAllData();
    } catch (err: any) {
      setError(
        err?.message ||
          "Unable to add project."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     CREATE GALLERY
  ======================================================= */

  const createGallery = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const imageFile = form.get("image") as File | null;

    try {
      setLoading(true);
      setError("");
      setMessage("");

      if (!imageFile || imageFile.size === 0) {
        throw new Error("Please select an image.");
      }

      const imageUrl = await uploadImage(imageFile);

      const payload = {
        image: imageUrl,
        caption: form.get("caption"),
        category: form.get("category"),
      };

      await apiRequest("/gallery", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setShowGalleryForm(false);

      e.currentTarget.reset();

      setMessage("Gallery image added successfully.");

      await loadAllData();
    } catch (err: any) {
      setError(
        err?.message ||
          "Unable to add gallery image."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     UPDATE MEMBER
  ======================================================= */

  const updateMember = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!editingMember) return;

    const form = new FormData(e.currentTarget);
    const photoFile = form.get("photo") as File | null;

    try {
      setLoading(true);
      setError("");
      setMessage("");

      let photoUrl = editingMember.photo || "";

      if (photoFile && photoFile.size > 0) {
        photoUrl = await uploadImage(photoFile);
      }

      const payload = {
        name: form.get("name"),
        role: form.get("role"),
        branch: form.get("branch"),
        year: form.get("year"),
        domain: form.get("domain"),
        photo: photoUrl,
        linkedin: form.get("linkedin"),
        instagram: form.get("instagram"),
      };

      await apiRequest(`/team/${editingMember._id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      setEditingMember(null);
      setShowMemberForm(false);
      setMessage("Member updated successfully.");

      await loadAllData();
    } catch (err: any) {
      setError(err?.message || "Unable to update member.");
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     UPDATE EVENT
  ======================================================= */

  const updateEvent = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!editingEvent) return;

    const form = new FormData(e.currentTarget);
    const imageFile = form.get("image") as File | null;

    try {
      setLoading(true);
      setError("");
      setMessage("");

      let imageUrl = editingEvent.image || "";

      if (imageFile && imageFile.size > 0) {
        imageUrl = await uploadImage(imageFile);
      }

      const payload = {
        title: form.get("title"),
        date: form.get("date"),
        location: form.get("location"),
        format: form.get("format"),
        category: form.get("category"),
        summary: form.get("summary"),
        description: form.get("description"),
        image: imageUrl,
        status: form.get("status"),
      };

      await apiRequest(`/events/${editingEvent._id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      setEditingEvent(null);
      setShowEventForm(false);
      setMessage("Event updated successfully.");

      await loadAllData();
    } catch (err: any) {
      setError(err?.message || "Unable to update event.");
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     UPDATE PROJECT
  ======================================================= */

  const updateProject = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!editingProject) return;

    const form = new FormData(e.currentTarget);

    const teamValue = String(form.get("team") || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const toolsValue = String(form.get("tools") || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const imageFile = form.get("image") as File | null;

    try {
      setLoading(true);
      setError("");
      setMessage("");

      let imageUrl = editingProject.image || "";

      if (imageFile && imageFile.size > 0) {
        imageUrl = await uploadImage(imageFile);
      }

      const payload = {
        name: form.get("name"),
        problem: form.get("problem"),
        team: teamValue,
        tools: toolsValue,
        image: imageUrl,
        demoUrl: form.get("demoUrl"),
        githubUrl: form.get("githubUrl"),
        category: form.get("category"),
      };

      await apiRequest(`/projects/${editingProject._id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      setEditingProject(null);
      setShowProjectForm(false);
      setMessage("Project updated successfully.");

      await loadAllData();
    } catch (err: any) {
      setError(err?.message || "Unable to update project.");
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     UPDATE GALLERY
  ======================================================= */

  const updateGallery = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!editingGallery) return;

    const form = new FormData(e.currentTarget);
    const imageFile = form.get("image") as File | null;

    try {
      setLoading(true);
      setError("");
      setMessage("");

      let imageUrl = editingGallery.image;

      if (imageFile && imageFile.size > 0) {
        imageUrl = await uploadImage(imageFile);
      }

      const payload = {
        image: imageUrl,
        caption: form.get("caption"),
        category: form.get("category"),
      };

      await apiRequest(`/gallery/${editingGallery._id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      setEditingGallery(null);
      setShowGalleryForm(false);
      setMessage("Gallery image updated successfully.");

      await loadAllData();
    } catch (err: any) {
      setError(err?.message || "Unable to update gallery image.");
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     LOADING SCREEN
  ======================================================= */

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050607] text-white">
        <div className="flex items-center gap-3 text-zinc-400">
          <Loader2
            size={20}
            className="animate-spin"
          />
          Verifying admin access...
        </div>
      </div>
    );
  }

  /* =======================================================
     DASHBOARD
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#050607] text-white">

      {/* ===================================================
          MOBILE OVERLAY
      =================================================== */}

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ===================================================
          SIDEBAR
      =================================================== */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-[#080a0b] p-5 transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <img
              src="/assets/engineering-india-ghrce-logo.png"
              alt="Engineering India"
              className="h-11 w-11 rounded-full object-contain"
            />

            <div>
              <div className="text-sm font-bold">
                ENGINEERING INDIA
              </div>

              <div className="text-[9px] tracking-[0.25em] text-zinc-600">
                ADMIN
              </div>
            </div>
          </Link>

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-10">

          <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-700">
            Management
          </div>

          <div className="space-y-1">

            {modules.map((module) => {
              const Icon = module.icon;

              return (
                <button
                  key={module.name}
                  onClick={() => {
                    setActive(module.name);
                    setMobileOpen(false);
                    setMessage("");
                    setError("");
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                    active === module.name
                      ? "bg-orange-500/10 text-orange-400"
                      : "text-zinc-500 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={17} />
                  {module.name}
                </button>
              );
            })}

          </div>
        </div>

        <button
          onClick={handleLogout}
          className="absolute bottom-6 left-5 right-5 flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-600 transition hover:bg-white/5 hover:text-white"
        >
          <LogOut size={17} />
          Logout
        </button>
      </aside>

      {/* ===================================================
          MAIN
      =================================================== */}

      <main className="lg:pl-72">

        {/* HEADER */}

        <header className="sticky top-0 z-30 flex min-h-20 items-center justify-between border-b border-white/10 bg-[#050607]/80 px-5 py-3 backdrop-blur-xl lg:px-8">

          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-xl border border-white/10 p-2 lg:hidden"
          >
            <Menu size={19} />
          </button>

          <div className="hidden lg:block">
            <div className="text-xs uppercase tracking-[0.2em] text-zinc-600">
              Admin Panel
            </div>

            <div className="mt-1 text-lg font-bold">
              {active}
            </div>
          </div>

          <div className="flex items-center gap-3">

            <button
              onClick={loadAllData}
              disabled={loading}
              className="rounded-xl border border-white/10 p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
              title="Refresh data"
            >
              <RefreshCw
                size={17}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />
            </button>

            <div className="hidden text-right sm:block">
              <div className="text-xs text-zinc-600">
                Signed in as
              </div>

              <div className="max-w-[250px] truncate text-sm font-semibold text-zinc-300">
                {adminEmail}
              </div>
            </div>

            <Link
              to="/"
              className="hidden items-center gap-2 text-sm text-zinc-500 transition hover:text-white md:flex"
            >
              View Website
              <ChevronRight size={15} />
            </Link>
          </div>
        </header>

        {/* CONTENT */}

        <div className="p-5 lg:p-8">

          {/* =================================================
              GLOBAL MESSAGE
          ================================================= */}

          {message && (
            <div className="mb-6 flex items-center justify-between rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
              <span>✅ {message}</span>

              <button
                onClick={() => setMessage("")}
              >
                <X size={16} />
              </button>
            </div>
          )}

          {uploading && (
            <div className="mb-6 flex items-center justify-between rounded-xl border border-orange-500/20 bg-orange-500/10 px-4 py-3 text-sm text-orange-400">
              <span>⏳ Uploading image...</span>
            </div>
          )}

          {error && (
            <div className="mb-6 flex items-center justify-between rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              <span>❌ {error}</span>

              <button
                onClick={() => setError("")}
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* =================================================
              DASHBOARD
          ================================================= */}

          {active === "Dashboard" && (
            <>
              <div className="mb-8">

                <div className="text-xs uppercase tracking-[0.2em] text-orange-500">
                  Overview
                </div>

                <h1 className="mt-2 text-4xl font-black tracking-tight">
                  Welcome back.
                </h1>

                <p className="mt-2 text-zinc-500">
                  Manage the Engineering India GHRCE website from one
                  place.
                </p>
              </div>

              {/* REAL STATS */}

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

                {[
                  [members.length, "Members"],
                  [events.length, "Events"],
                  [projects.length, "Projects"],
                  [gallery.length, "Gallery Images"],
                  [joinRequests.length, "Join Requests"],
                  [messages.length, "Messages"],
                ].map(([value, label], index) => (
                  <div
                    key={String(label)}
                    className="premium-card p-6"
                  >
                    <div className="flex items-center justify-between">

                      <span className="text-xs uppercase tracking-[0.15em] text-zinc-600">
                        {label}
                      </span>

                      <BarChart3
                        size={17}
                        className={
                          index % 2
                            ? "text-green-500"
                            : "text-orange-500"
                        }
                      />
                    </div>

                    <div className="mt-5 text-3xl font-black">
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              {/* QUICK ACTIONS */}

              <div className="mt-8 grid gap-5 lg:grid-cols-2">

                <div className="premium-card p-7">

                  <h2 className="font-bold">
                    Quick Actions
                  </h2>

                  <div className="mt-5 grid grid-cols-2 gap-3">

                    <button
                      onClick={() => {
                        setActive("Members");
                        setEditingMember(null);
                        setShowMemberForm(true);
                      }}
                      className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left text-sm text-zinc-400 transition hover:border-orange-500/30 hover:text-white"
                    >
                      <Plus
                        size={16}
                        className="text-orange-500"
                      />
                      Add Member
                    </button>

                    <button
                      onClick={() => {
                        setActive("Events");
                        setEditingEvent(null);
                        setShowEventForm(true);
                      }}
                      className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left text-sm text-zinc-400 transition hover:border-orange-500/30 hover:text-white"
                    >
                      <Plus
                        size={16}
                        className="text-orange-500"
                      />
                      Add Event
                    </button>

                    <button
                      onClick={() => {
                        setActive("Projects");
                        setEditingProject(null);
                        setShowProjectForm(true);
                      }}
                      className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left text-sm text-zinc-400 transition hover:border-orange-500/30 hover:text-white"
                    >
                      <Plus
                        size={16}
                        className="text-orange-500"
                      />
                      Add Project
                    </button>

                    <button
                      onClick={() => {
                        setActive("Gallery");
                        setEditingGallery(null);
                        setShowGalleryForm(true);
                      }}
                      className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left text-sm text-zinc-400 transition hover:border-orange-500/30 hover:text-white"
                    >
                      <Plus
                        size={16}
                        className="text-orange-500"
                      />
                      Add Photo
                    </button>

                  </div>
                </div>

                {/* RECENT APPLICATIONS */}

                <div className="premium-card p-7">

                  <div className="flex items-center justify-between">
                    <h2 className="font-bold">
                      Recent Applications
                    </h2>

                    <button
                      onClick={() =>
                        setActive("Join Applications")
                      }
                      className="text-xs text-orange-500"
                    >
                      View all
                    </button>
                  </div>

                  <div className="mt-5 space-y-4">

                    {joinRequests
                      .slice(0, 4)
                      .map((item) => (
                        <div
                          key={item._id}
                          className="border-b border-white/5 pb-4"
                        >
                          <div className="text-sm font-semibold text-zinc-300">
                            {item.name || "Unknown"}
                          </div>

                          <div className="mt-1 text-xs text-zinc-600">
                            {item.email || "No email"}
                          </div>
                        </div>
                      ))}

                    {joinRequests.length === 0 && (
                      <div className="py-5 text-center text-sm text-zinc-600">
                        No applications yet.
                      </div>
                    )}

                  </div>
                </div>
              </div>
            </>
          )}

          {/* =================================================
              MEMBERS
          ================================================= */}

          {active === "Members" && (
            <section>

              <SectionHeader
                title="Members"
                description="Manage Engineering India team members."
                buttonText="Add Member"
                onClick={() => {
                  setEditingMember(null);
                  setShowMemberForm(true);
                }}
              />

              {showMemberForm && (
                <MemberForm
                  member={editingMember}
                  onSubmit={editingMember ? updateMember : createMember}
                  onClose={() => {
                    setShowMemberForm(false);
                    setEditingMember(null);
                  }}
                  loading={loading}
                />
              )}

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">

                {members.map((member) => (
                  <div
                    key={member._id}
                    className="premium-card overflow-hidden"
                  >
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="h-52 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-52 items-center justify-center bg-white/[0.03]">
                        <Users
                          size={40}
                          className="text-zinc-700"
                        />
                      </div>
                    )}

                    <div className="p-5">

                      <div className="flex items-start justify-between gap-3">

                        <div>
                          <h3 className="font-bold">
                            {member.name}
                          </h3>

                          <p className="mt-1 text-sm text-orange-500">
                            {member.role}
                          </p>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingMember(member);
                              setShowMemberForm(true);
                            }}
                            className="rounded-lg p-2 text-zinc-600 transition hover:bg-orange-500/10 hover:text-orange-400"
                            title="Edit member"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                          onClick={() =>
                            handleDelete(
                              "/team",
                              member._id,
                              "Member deleted successfully."
                            )
                          }
                          className="rounded-lg p-2 text-zinc-600 transition hover:bg-red-500/10 hover:text-red-400"
                        >
                          <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 space-y-1 text-xs text-zinc-600">
                        {member.branch && (
                          <div>
                            Branch: {member.branch}
                          </div>
                        )}

                        {member.year && (
                          <div>
                            Year: {member.year}
                          </div>
                        )}

                        {member.domain && (
                          <div>
                            Domain: {member.domain}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

              </div>

              {members.length === 0 && (
                <EmptyState text="No members found." />
              )}
            </section>
          )}

          {/* =================================================
              EVENTS
          ================================================= */}

          {active === "Events" && (
            <section>

              <SectionHeader
                title="Events"
                description="Create and manage Engineering India events."
                buttonText="Add Event"
                onClick={() => {
                  setEditingEvent(null);
                  setShowEventForm(true);
                }}
              />

              {showEventForm && (
                <EventForm
                  event={editingEvent}
                  onSubmit={editingEvent ? updateEvent : createEvent}
                  onClose={() => {
                    setShowEventForm(false);
                    setEditingEvent(null);
                  }}
                  loading={loading}
                />
              )}

              <div className="mt-6 grid gap-4 lg:grid-cols-2">

                {events.map((event) => (
                  <div
                    key={event._id}
                    className="premium-card overflow-hidden"
                  >

                    {event.image && (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="h-48 w-full object-cover"
                      />
                    )}

                    <div className="p-6">

                      <div className="flex items-start justify-between gap-4">

                        <div>
                          <h3 className="text-xl font-bold">
                            {event.title}
                          </h3>

                          <p className="mt-2 text-sm text-orange-500">
                            {formatDate(event.date)}
                          </p>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingEvent(event);
                              setShowEventForm(true);
                            }}
                            className="rounded-lg p-2 text-zinc-600 transition hover:bg-orange-500/10 hover:text-orange-400"
                            title="Edit event"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                          onClick={() =>
                            handleDelete(
                              "/events",
                              event._id,
                              "Event deleted successfully."
                            )
                          }
                          className="rounded-lg p-2 text-zinc-600 transition hover:bg-red-500/10 hover:text-red-400"
                        >
                          <Trash2 size={16} />
                          </button>
                        </div>

                      </div>

                      <p className="mt-4 text-sm leading-6 text-zinc-500">
                        {event.summary}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">

                        {event.location && (
                          <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-500">
                            {event.location}
                          </span>
                        )}

                        {event.category && (
                          <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs text-orange-400">
                            {event.category}
                          </span>
                        )}

                        {event.status && (
                          <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                            {event.status}
                          </span>
                        )}

                      </div>
                    </div>
                  </div>
                ))}

              </div>

              {events.length === 0 && (
                <EmptyState text="No events found." />
              )}
            </section>
          )}

          {/* =================================================
              PROJECTS
          ================================================= */}

          {active === "Projects" && (
            <section>

              <SectionHeader
                title="Projects"
                description="Manage Engineering India projects."
                buttonText="Add Project"
                onClick={() => {
                  setEditingProject(null);
                  setShowProjectForm(true);
                }}
              />

              {showProjectForm && (
                <ProjectForm
                  project={editingProject}
                  onSubmit={editingProject ? updateProject : createProject}
                  onClose={() => {
                    setShowProjectForm(false);
                    setEditingProject(null);
                  }}
                  loading={loading}
                />
              )}

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">

                {projects.map((project) => (
                  <div
                    key={project._id}
                    className="premium-card overflow-hidden"
                  >

                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.name}
                        className="h-48 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-48 items-center justify-center bg-white/[0.03]">
                        <FolderKanban
                          size={40}
                          className="text-zinc-700"
                        />
                      </div>
                    )}

                    <div className="p-5">

                      <div className="flex items-start justify-between gap-3">

                        <h3 className="font-bold">
                          {project.name}
                        </h3>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingProject(project);
                              setShowProjectForm(true);
                            }}
                            className="rounded-lg p-2 text-zinc-600 transition hover:bg-orange-500/10 hover:text-orange-400"
                            title="Edit project"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                          onClick={() =>
                            handleDelete(
                              "/projects",
                              project._id,
                              "Project deleted successfully."
                            )
                          }
                          className="rounded-lg p-2 text-zinc-600 transition hover:bg-red-500/10 hover:text-red-400"
                        >
                          <Trash2 size={16} />
                          </button>
                        </div>

                      </div>

                      {project.category && (
                        <div className="mt-2 text-xs text-orange-500">
                          {project.category}
                        </div>
                      )}

                      <p className="mt-4 line-clamp-3 text-sm leading-6 text-zinc-500">
                        {project.problem}
                      </p>

                      {project.tools &&
                        project.tools.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {project.tools.map((tool) => (
                              <span
                                key={tool}
                                className="rounded-full bg-white/5 px-2 py-1 text-[11px] text-zinc-500"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        )}

                    </div>
                  </div>
                ))}

              </div>

              {projects.length === 0 && (
                <EmptyState text="No projects found." />
              )}
            </section>
          )}

          {/* =================================================
              GALLERY
          ================================================= */}

          {active === "Gallery" && (
            <section>

              <SectionHeader
                title="Gallery"
                description="Manage Engineering India gallery images."
                buttonText="Add Photo"
                onClick={() => {
                  setEditingGallery(null);
                  setShowGalleryForm(true);
                }}
              />

              {showGalleryForm && (
                <GalleryForm
                  gallery={editingGallery}
                  onSubmit={editingGallery ? updateGallery : createGallery}
                  onClose={() => {
                    setShowGalleryForm(false);
                    setEditingGallery(null);
                  }}
                  loading={loading}
                />
              )}

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {gallery.map((item) => (
                  <div
                    key={item._id}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#080a0b]"
                  >

                    <img
                      src={item.image}
                      alt={item.caption || "Gallery"}
                      className="h-60 w-full object-cover transition duration-300 group-hover:scale-105"
                    />

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 pt-12">

                      <div className="flex items-end justify-between gap-3">

                        <div>
                          <div className="text-sm font-semibold">
                            {item.caption ||
                              "Gallery Image"}
                          </div>

                          {item.category && (
                            <div className="mt-1 text-xs text-orange-400">
                              {item.category}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingGallery(item);
                              setShowGalleryForm(true);
                            }}
                            className="rounded-lg bg-black/50 p-2 text-zinc-300 transition hover:bg-orange-500/20 hover:text-orange-400"
                            title="Edit gallery image"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                          onClick={() =>
                            handleDelete(
                              "/gallery",
                              item._id,
                              "Gallery image deleted successfully."
                            )
                          }
                          className="rounded-lg bg-black/50 p-2 text-zinc-300 transition hover:bg-red-500/20 hover:text-red-400"
                        >
                          <Trash2 size={16} />
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}

              </div>

              {gallery.length === 0 && (
                <EmptyState text="No gallery images found." />
              )}
            </section>
          )}

          {/* =================================================
              JOIN APPLICATIONS
          ================================================= */}

          {active === "Join Applications" && (
            <section>

              <SectionHeader
                title="Join Applications"
                description="View applications submitted through the Join Us form."
                buttonText=""
              />

              <div className="mt-6 space-y-4">

                {joinRequests.map((item) => (
                  <div
                    key={item._id}
                    className="premium-card p-5"
                  >

                    <div className="flex flex-col justify-between gap-4 lg:flex-row">

                      <div>

                        <div className="flex flex-wrap items-center gap-3">

                          <h3 className="font-bold">
                            {item.name ||
                              "Unnamed applicant"}
                          </h3>

                          <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs text-orange-400">
                            {item.status || "New"}
                          </span>

                        </div>

                        <div className="mt-3 grid gap-2 text-sm text-zinc-500 sm:grid-cols-2">

                          <div>
                            📧 {item.email || "-"}
                          </div>

                          <div>
                            📱 {item.phone || "-"}
                          </div>

                          <div>
                            🎓 {item.branch || "-"}
                          </div>

                          <div>
                            📚 Year: {item.year || "-"}
                          </div>

                          <div>
                            Section: {item.section || "-"}
                          </div>

                          <div>
                            Domain: {item.domain || "-"}
                          </div>

                        </div>

                        {item.interest && (
                          <p className="mt-4 rounded-xl bg-white/[0.03] p-4 text-sm leading-6 text-zinc-500">
                            {item.interest}
                          </p>
                        )}

                      </div>

                      <div className="flex items-start gap-2">

                        <button
                          onClick={() =>
                            handleDelete(
                              "/join",
                              item._id,
                              "Application deleted successfully."
                            )
                          }
                          className="rounded-xl border border-red-500/10 p-3 text-red-400 transition hover:bg-red-500/10"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>

                    </div>
                  </div>
                ))}

              </div>

              {joinRequests.length === 0 && (
                <EmptyState text="No join applications found." />
              )}
            </section>
          )}

          {/* =================================================
              MESSAGES
          ================================================= */}

          {active === "Messages" && (
            <section>

              <SectionHeader
                title="Messages"
                description="Messages received from the Contact Us form."
                buttonText=""
              />

              <div className="mt-6 space-y-4">

                {messages.map((item) => (
                  <div
                    key={item._id}
                    className="premium-card p-5"
                  >

                    <div className="flex flex-col justify-between gap-4 lg:flex-row">

                      <div className="min-w-0 flex-1">

                        <div className="flex flex-wrap items-center gap-3">

                          <h3 className="font-bold">
                            {item.subject ||
                              "No subject"}
                          </h3>

                          {!item.read && (
                            <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                              New
                            </span>
                          )}

                        </div>

                        <div className="mt-2 text-sm text-zinc-500">
                          {item.name || "Unknown"} ·{" "}
                          {item.email || "No email"}
                        </div>

                        <p className="mt-4 whitespace-pre-wrap rounded-xl bg-white/[0.03] p-4 text-sm leading-6 text-zinc-500">
                          {item.message ||
                            "No message"}
                        </p>

                      </div>

                      <button
                        onClick={() =>
                          handleDelete(
                            "/contact",
                            item._id,
                            "Message deleted successfully."
                          )
                        }
                        className="self-start rounded-xl border border-red-500/10 p-3 text-red-400 transition hover:bg-red-500/10"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>
                  </div>
                ))}

              </div>

              {messages.length === 0 && (
                <EmptyState text="No messages found." />
              )}
            </section>
          )}

          {/* =================================================
              SETTINGS
          ================================================= */}

          {active === "Settings" && (
            <section>

              <SectionHeader
                title="Settings"
                description="Admin panel settings and session information."
                buttonText=""
              />

              <div className="mt-6 max-w-2xl">

                <div className="premium-card p-6">

                  <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
                      <ShieldCheck size={25} />
                    </div>

                    <div>
                      <h3 className="font-bold">
                        Administrator Account
                      </h3>

                      <p className="mt-1 text-sm text-zinc-500">
                        {adminEmail}
                      </p>
                    </div>

                  </div>

                  <div className="mt-6 border-t border-white/10 pt-6">

                    <div className="flex items-center justify-between">

                      <div>
                        <div className="text-sm font-semibold">
                          Authentication
                        </div>

                        <div className="mt-1 text-xs text-zinc-600">
                          JWT protected administrator session
                        </div>
                      </div>

                      <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                        Active
                      </span>

                    </div>

                  </div>

                </div>
              </div>
            </section>
          )}

        </div>
      </main>
    </div>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  title,
  description,
  buttonText,
  onClick,
}: {
  title: string;
  description: string;
  buttonText?: string;
  onClick?: () => void;
}) {
  return (
    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-orange-500">
          Management
        </div>

        <h1 className="mt-2 text-3xl font-black">
          {title}
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          {description}
        </p>
      </div>

      {buttonText && onClick && (
        <button
          onClick={onClick}
          className="btn-primary flex items-center justify-center gap-2"
        >
          <Plus size={17} />
          {buttonText}
        </button>
      )}

    </div>
  );
}

/* =========================================================
   MEMBER FORM
========================================================= */

function MemberForm({
  member,
  onSubmit,
  onClose,
  loading,
}: {
  member: TeamMember | null;
  onSubmit: (
    e: FormEvent<HTMLFormElement>
  ) => void;
  onClose: () => void;
  loading: boolean;
}) {
  return (
    <FormCard
      title={member ? "Edit Team Member" : "Add Team Member"}
      onSubmit={onSubmit}
      onClose={onClose}
      loading={loading}
    >
      <Input
        name="name"
        label="Name"
        placeholder="Member name"
        defaultValue={member?.name || ""}
        required
      />

      <Input
        name="role"
        label="Role"
        placeholder="President / Secretary / Developer"
        defaultValue={member?.role || ""}
        required
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          name="branch"
          label="Branch"
          placeholder="CSE AIML"
          defaultValue={member?.branch || ""}
        />

        <Input
          name="year"
          label="Year"
          placeholder="3rd Year"
          defaultValue={member?.year || ""}
        />
      </div>

      <Input
        name="domain"
        label="Domain"
        placeholder="Web Development"
        defaultValue={member?.domain || ""}
      />

      <Input
        name="photo"
        label="Photo"
        type="file"
        accept="image/*"
        required={!member}
      />

      <Input
        name="linkedin"
        label="LinkedIn URL"
        placeholder="https://linkedin.com/..."
        defaultValue={member?.linkedin || ""}
      />

      <Input
        name="instagram"
        label="Instagram URL"
        placeholder="https://instagram.com/..."
        defaultValue={member?.instagram || ""}
      />
    </FormCard>
  );
}

/* =========================================================
   EVENT FORM
========================================================= */

function EventForm({
  event,
  onSubmit,
  onClose,
  loading,
}: {
  event: EventItem | null;
  onSubmit: (
    e: FormEvent<HTMLFormElement>
  ) => void;
  onClose: () => void;
  loading: boolean;
}) {
  return (
    <FormCard
      title={event ? "Edit Event" : "Add Event"}
      onSubmit={onSubmit}
      onClose={onClose}
      loading={loading}
    >
      <Input
        name="title"
        label="Title"
        placeholder="Event title"
        defaultValue={event?.title || ""}
        required
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          name="date"
          label="Date"
          type="date"
          defaultValue={event?.date ? event.date.slice(0, 10) : ""}
          required
        />

        <Input
          name="location"
          label="Location"
          placeholder="GHRCE Nagpur"
          defaultValue={event?.location || ""}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          name="format"
          label="Format"
          placeholder="Offline / Online / Hybrid"
          defaultValue={event?.format || ""}
        />

        <Input
          name="category"
          label="Category"
          placeholder="Workshop / Hackathon"
          defaultValue={event?.category || ""}
        />
      </div>

      <Input
        name="summary"
        label="Summary"
        placeholder="Short event summary"
        defaultValue={event?.summary || ""}
        required
      />

      <TextArea
        name="description"
        label="Description"
        placeholder="Complete event description"
        defaultValue={event?.description || ""}
      />

      <Input
        name="image"
        label="Image"
        type="file"
        accept="image/*"
      />

      <Input
        name="status"
        label="Status"
        placeholder="Upcoming / Completed"
        defaultValue={event?.status || ""}
      />
    </FormCard>
  );
}

/* =========================================================
   PROJECT FORM
========================================================= */

function ProjectForm({
  project,
  onSubmit,
  onClose,
  loading,
}: {
  project: ProjectItem | null;
  onSubmit: (
    e: FormEvent<HTMLFormElement>
  ) => void;
  onClose: () => void;
  loading: boolean;
}) {
  return (
    <FormCard
      title={project ? "Edit Project" : "Add Project"}
      onSubmit={onSubmit}
      onClose={onClose}
      loading={loading}
    >
      <Input
        name="name"
        label="Project Name"
        placeholder="Project name"
        defaultValue={project?.name || ""}
        required
      />

      <TextArea
        name="problem"
        label="Problem"
        placeholder="What problem does this project solve?"
        defaultValue={project?.problem || ""}
        required
      />

      <Input
        name="team"
        label="Team Members"
        placeholder="Rahul, Harsh, Aditya"
        defaultValue={project?.team?.join(", ") || ""}
      />

      <Input
        name="tools"
        label="Tools / Technologies"
        placeholder="React, Node.js, MongoDB"
        defaultValue={project?.tools?.join(", ") || ""}
      />

      <Input
        name="category"
        label="Category"
        placeholder="AI / Web / IoT"
        defaultValue={project?.category || ""}
      />

      <Input
        name="image"
        label="Image"
        type="file"
        accept="image/*"
      />

      <Input
        name="demoUrl"
        label="Demo URL"
        placeholder="https://..."
        defaultValue={project?.demoUrl || ""}
      />

      <Input
        name="githubUrl"
        label="GitHub URL"
        placeholder="https://github.com/..."
        defaultValue={project?.githubUrl || ""}
      />
    </FormCard>
  );
}

/* =========================================================
   GALLERY FORM
========================================================= */

function GalleryForm({
  gallery,
  onSubmit,
  onClose,
  loading,
}: {
  gallery: GalleryItem | null;
  onSubmit: (
    e: FormEvent<HTMLFormElement>
  ) => void;
  onClose: () => void;
  loading: boolean;
}) {
  return (
    <FormCard
      title={gallery ? "Edit Gallery Image" : "Add Gallery Image"}
      onSubmit={onSubmit}
      onClose={onClose}
      loading={loading}
    >
      <Input
        name="image"
        label="Image"
        type="file"
        accept="image/*"
        required={!gallery}
      />

      <Input
        name="caption"
        label="Caption"
        placeholder="Engineering India event"
        defaultValue={gallery?.caption || ""}
      />

      <Input
        name="category"
        label="Category"
        placeholder="Events / Team / Workshop"
        defaultValue={gallery?.category || ""}
      />
    </FormCard>
  );
}

/* =========================================================
   FORM CARD
========================================================= */

function FormCard({
  title,
  children,
  onSubmit,
  onClose,
  loading,
}: {
  title: string;
  children: React.ReactNode;
  onSubmit: (
    e: FormEvent<HTMLFormElement>
  ) => void;
  onClose: () => void;
  loading: boolean;
}) {
  return (
    <div className="premium-card mt-6 p-6 md:p-7">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-lg font-bold">
            {title}
          </h2>

          <p className="mt-1 text-xs text-zinc-600">
            Fill the details below and save.
          </p>
        </div>

        <button
          onClick={onClose}
          type="button"
          className="rounded-xl border border-white/10 p-2 text-zinc-500 hover:text-white"
        >
          <X size={17} />
        </button>

      </div>

      <form
        onSubmit={onSubmit}
        className="mt-6 space-y-4"
      >
        {children}

        <div className="flex flex-col gap-3 pt-3 sm:flex-row">

          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2
                  size={16}
                  className="animate-spin"
                />
                Saving...
              </>
            ) : (
              <>
                <Plus size={16} />
                Save
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 px-5 py-3 text-sm text-zinc-500 transition hover:bg-white/5 hover:text-white"
          >
            Cancel
          </button>

        </div>
      </form>
    </div>
  );
}

/* =========================================================
   INPUT
========================================================= */

/* =========================================================
   INPUT
========================================================= */

function Input({
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  accept,
  defaultValue = "",
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  accept?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
        {label}
      </label>

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        accept={accept}
        defaultValue={type === "file" ? undefined : defaultValue}
        className="input-field w-full"
      />
    </div>
  );
}

/* =========================================================
   TEXTAREA
========================================================= */

function TextArea({
  name,
  label,
  placeholder,
  required = false,
  defaultValue = "",
}: {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
        {label}
      </label>

      <textarea
        name={name}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        rows={5}
        className="input-field w-full resize-none"
      />
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  text,
}: {
  text: string;
}) {
  return (
    <div className="mt-6 flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-white/10">
      <div className="text-center">

        <Eye
          size={30}
          className="mx-auto text-zinc-700"
        />

        <p className="mt-4 text-sm text-zinc-600">
          {text}
        </p>

      </div>
    </div>
  );
}

/* =========================================================
   DATE FORMATTER
========================================================= */

function formatDate(date: string) {
  if (!date) return "No date";

  try {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  } catch {
    return date;
  }
}