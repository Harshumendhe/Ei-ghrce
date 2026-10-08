import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import { AdminLogin, AdminDashboard } from "./pages/Admin";
import Home from "./pages/Home";

import {
  About,
  Contact,
  EventDetail,
  Events,
  Gallery,
  Join,
  Projects,
  Team,
} from "./pages/ContentPages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC WEBSITE ================= */}

        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
  path="/events/:id"
  element={<Layout><EventDetail /></Layout>}
/>

        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />

        <Route
          path="/team"
          element={
            <Layout>
              <Team />
            </Layout>
          }
        />

        <Route
          path="/events"
          element={
            <Layout>
              <Events />
            </Layout>
          }
        />

        <Route
          path="/projects"
          element={
            <Layout>
              <Projects />
            </Layout>
          }
        />

        <Route
          path="/gallery"
          element={
            <Layout>
              <Gallery />
            </Layout>
          }
        />

        <Route
          path="/join-us"
          element={
            <Layout>
              <Join />
            </Layout>
          }
        />

        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />

        {/* ================= ADMIN ================= */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}