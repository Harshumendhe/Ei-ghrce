import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { API_URL } from "../lib/api";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Code2,
  ExternalLink,
  Filter,
  Github,
  Globe2,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Sparkles,
  Users,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Reveal from "../components/Reveal";


export function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const response = await fetch(
`${API_URL}/events/${id}`        );

        if (!response.ok) {
          throw new Error("Event not found");
        }

        const result = await response.json();
        setEvent(result.data);
      } catch (err) {
        console.error(err);
        setError("Unable to load event.");
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050708] px-6 py-20 text-center text-gray-400">
        Loading event...
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="min-h-screen bg-[#050708] px-6 py-20 text-center">
        <p className="text-red-400">
          {error || "Event not found."}
        </p>

        <Link
          to="/events"
          className="mt-6 inline-block text-cyan-400"
        >
          ← Back to Events
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050708] text-white">
      <section className="mx-auto max-w-5xl px-6 py-20">

        <Link
          to="/events"
          className="mb-8 inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300"
        >
          ← Back to Events
        </Link>

        {/* Event Image */}
        {event.image && (
          <div className="mb-10 overflow-hidden rounded-3xl border border-white/10 bg-[#080a0b]">
            <img
              src={event.image}
              alt={event.title}
              className="max-h-[550px] w-full object-contain"
            />
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl font-bold md:text-5xl">
          {event.title}
        </h1>

        {/* Event Info */}
        <div className="mt-6 grid gap-4 text-gray-400 sm:grid-cols-2">
          {event.date && (
            <div>
              <span className="text-sm text-gray-500">
                Date
              </span>

              <p className="mt-1 text-white">
                📅{" "}
                {new Date(event.date).toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </p>
            </div>
          )}

          {event.location && (
            <div>
              <span className="text-sm text-gray-500">
                Venue
              </span>

              <p className="mt-1 text-white">
                📍 {event.location}
              </p>
            </div>
          )}

          {event.format && (
            <div>
              <span className="text-sm text-gray-500">
                Format
              </span>

              <p className="mt-1 text-white">
                {event.format}
              </p>
            </div>
          )}

          {event.category && (
            <div>
              <span className="text-sm text-gray-500">
                Category
              </span>

              <p className="mt-1 text-white">
                {event.category}
              </p>
            </div>
          )}
        </div>

        {/* Summary */}
        {event.summary && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold">
              About the Event
            </h2>

            <p className="mt-4 leading-8 text-gray-400">
              {event.summary}
            </p>
          </div>
        )}

        {/* Full Description */}
        {event.description && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">
              Event Details
            </h2>

            <div className="mt-4 whitespace-pre-line leading-8 text-gray-400">
              {event.description}
            </div>
          </div>
        )}

      </section>
    </main>
  );
}

const team = [
  {
    name: "Name",
    role: "Faculty Coordinator",
    branch: "Department",
    year: "Faculty",
    domain: "Management",
  },
  {
    name: "Name",
    role: "President",
    branch: "Branch / Department",
    year: "3rd Year",
    domain: "Management",
  },
  {
    name: "Name",
    role: "Technical Head",
    branch: "CSE / AIML",
    year: "3rd Year",
    domain: "Tech",
  },
  {
    name: "Name",
    role: "Design Head",
    branch: "Branch / Department",
    year: "3rd Year",
    domain: "Design",
  },
  {
    name: "Name",
    role: "Events Head",
    branch: "Branch / Department",
    year: "3rd Year",
    domain: "Events",
  },
  {
    name: "Name",
    role: "PR & Outreach Head",
    branch: "Branch / Department",
    year: "3rd Year",
    domain: "PR & Outreach",
  },
];

const events = [
  {
    title: "Technical Workshop",
    date: "Coming Soon",
    type: "Workshop",
    status: "UPCOMING",
    description:
      "A practical learning session designed around emerging engineering technologies.",
  },
  {
    title: "Community Meetup",
    date: "Coming Soon",
    type: "Meetup",
    status: "UPCOMING",
    description:
      "Students connect, exchange ideas and discover opportunities to collaborate.",
  },
  {
    title: "Innovation Challenge",
    date: "Coming Soon",
    type: "Competition",
    status: "UPCOMING",
    description:
      "A problem-solving challenge encouraging students to build meaningful solutions.",
  },
];

const projects = [
  {
    name: "Project Name",
    category: "AI / ML",
    problem: "Problem statement will be added by the project team.",
    team: "Student Project Team",
    tools: "Python · AI/ML · APIs",
  },
  {
    name: "Project Name",
    category: "Web Development",
    problem: "A student-built solution focused on solving a real-world problem.",
    team: "Student Project Team",
    tools: "React · Node.js · MongoDB",
  },
  {
    name: "Project Name",
    category: "IoT",
    problem: "Engineering ideas translated into a practical prototype.",
    team: "Student Project Team",
    tools: "IoT · Sensors · Embedded",
  },
];

const gallery = [
  {
    title: "Community",
    label: "COMMUNITY",
    number: "01",
  },
  {
    title: "Workshop",
    label: "WORKSHOP",
    number: "02",
  },
  {
    title: "Panel",
    label: "PANEL",
    number: "03",
  },
  {
    title: "Events",
    label: "EVENTS",
    number: "04",
  },
];

function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 pt-44 pb-24">
      <div className="glow glow-orange left-[-180px] top-20" />

      <div className="container relative z-10 mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="eyebrow">{eyebrow}</div>

          <h1 className="section-title mt-7 max-w-5xl">
            {title}
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
            {description}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================
   ABOUT
========================= */

export function About() {
  return (
    <div className="engineering-bg">
      <PageHero
        eyebrow="About Engineering India GHRCE"
        title="More Than a Club."
        description="A student-driven socio-technical community where students explore technology, exchange ideas, build together and create meaningful impact."
      />

      <section className="container mx-auto px-5 py-24 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal>
            <div className="eyebrow">Our Story</div>

            <h2 className="section-title mt-6">
              Learning becomes
              <br />
              <span className="text-orange-500">stronger together.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-6 text-lg leading-9 text-zinc-400">
              <p>
                Engineering India GHRCE brings together students, faculty and
                collaborators who believe that engineering is not only about
                learning concepts — it is about applying them.
              </p>

              <p>
                The community creates spaces for students to ask questions,
                experiment with technology, share knowledge and turn ideas
                into action.
              </p>

              <p>
                What starts as a small idea on campus can become a project,
                collaboration, initiative or opportunity that reaches much
                further.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#07090a]">
        <div className="container mx-auto grid gap-5 px-5 py-24 md:grid-cols-3 lg:px-8">
          {[
            {
              title: "Our Vision",
              text: "Build a collaborative engineering community where curiosity can turn into capability and impact.",
            },
            {
              title: "Our Mission",
              text: "Create spaces for students to learn, build, connect and contribute beyond the classroom.",
            },
            {
              title: "Our Values",
              text: "Innovation, leadership, collaboration, integrity and meaningful social impact.",
            },
          ].map((item, index) => (
            <Reveal key={item.title} delay={index * 0.1}>
              <div className="premium-card h-full p-8">
                <div className="text-xs font-bold text-orange-500">
                  0{index + 1}
                </div>

                <h3 className="mt-7 text-2xl font-bold">{item.title}</h3>

                <p className="mt-5 leading-7 text-zinc-500">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-5 py-24 lg:px-8">
        <Reveal>
          <div className="eyebrow">How We Show Up</div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              "Learn in public",
              "Build with care",
              "Share the credit",
              "Stay curious",
            ].map((value, index) => (
              <div
                key={value}
                className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.025] p-6"
              >
                <span className="text-sm font-bold text-orange-500">
                  0{index + 1}
                </span>

                <span className="text-lg font-semibold text-zinc-200">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}

/* =========================
   TEAM
========================= */

export function Team() {
  const [filter, setFilter] = useState("All");
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/team`);

        if (!response.ok) {
          throw new Error("Failed to fetch team members.");
        }

        const result = await response.json();

        setTeam(result.data || []);
      } catch (err) {
        console.error("Team fetch error:", err);
        setError("Unable to load team members.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  const filters = [
    "All",
    ...Array.from(
      new Set(
        team
          .map((member) => member.domain)
          .filter(Boolean)
      )
    ),
  ];

  const filtered =
    filter === "All"
      ? team
      : team.filter((member) => member.domain === filter);

  return (
    <div className="engineering-bg">
      <PageHero
        eyebrow="The People Behind It"
        title="Good work is never solo."
        description="Students make Engineering India what it is. Meet the people shaping the community and the areas they work in."
      />

      <section className="container mx-auto px-5 py-24 lg:px-8">
        <div className="mb-10 flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                filter === item
                  ? "border-orange-500 bg-orange-500 text-black"
                  : "border-white/10 text-zinc-500 hover:border-white/20 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-20 text-center text-zinc-500">
            Loading team members...
          </div>
        ) : error ? (
          <div className="py-20 text-center text-red-400">
            {error}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-zinc-500">
            No team members found.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((member, index) => (
              <Reveal
                key={member._id || `${member.role}-${index}`}
                delay={index * 0.05}
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  className="premium-card overflow-hidden"
                >
                  <div className="flex h-72 items-center justify-center bg-gradient-to-br from-orange-500/10 via-transparent to-green-500/10">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                        <Users size={42} className="text-zinc-600" />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
                      {member.role}
                    </div>

                    <h3 className="mt-3 text-xl font-bold">
                      {member.name}
                    </h3>

                    <p className="mt-2 text-sm text-zinc-500">
                      {member.branch} · {member.year}
                    </p>

                    {member.domain && (
                      <p className="mt-1 text-sm text-zinc-600">
                        {member.domain}
                      </p>
                    )}

                    <div className="mt-6 flex gap-2">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-white/10 p-2 text-zinc-500 hover:text-white"
                        >
                          <Linkedin size={15} />
                        </a>
                      )}

                      {member.instagram && (
                        <a
                          href={member.instagram}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-white/10 p-2 text-zinc-500 hover:text-white"
                        >
                          <Instagram size={15} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* =========================
   EVENTS
========================= */

export function Events() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/events`);

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const result = await response.json();
        setEvents(result.data || []);
      } catch (err) {
        console.error("Events loading error:", err);
        setError("Unable to load events.");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
   <main className="min-h-screen bg-[#050708] text-white ">
<section className="mx-auto max-w-5xl px-6 pb-20 pt-36 md:px-10 md:pt-40 lg:px-12">        <div className="mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Engineering India GHRCE
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Events
          </h1>

          <p className="mt-4 max-w-2xl text-gray-400">
            Stay updated with the latest events, workshops, competitions
            and activities organized by Engineering India GHRCE.
          </p>
        </div>

        {loading && (
          <div className="py-16 text-center text-gray-400">
            Loading events...
          </div>
        )}

        {error && (
          <div className="py-16 text-center text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] py-16 text-center">
            <p className="text-gray-400">
              No events available at the moment.
            </p>
          </div>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
  <article
    key={event._id}
    className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40"
  >
    <h2 className="text-2xl font-semibold text-white">
      {event.title}
    </h2>

    <div className="mt-4 space-y-2 text-sm text-gray-400">
      {event.date && (
        <p>
          📅{" "}
          {new Date(event.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      )}

      {event.location && (
        <p>📍 {event.location}</p>
      )}
    </div>

    {event.summary && (
      <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-400">
        {event.summary}
      </p>
    )}

    <Link
      to={`/events/${event._id}`}
      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
    >
      Know in Detail
      <span>→</span>
    </Link>
  </article>
))}
          </div>
        )}
      </section>
    </main>
  );
}

/* =========================
   PROJECTS
========================= */

export function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
`${API_URL}/projects`        );

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const result = await response.json();

        setProjects(result.data || []);
      } catch (err) {
        console.error("Projects loading error:", err);
        setError("Unable to load projects.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <main className="min-h-screen bg-[#050708] text-white">
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-36 md:px-10 md:pt-40 lg:px-12">

        {/* HEADER */}
        <div className="mb-14">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Engineering India GHRCE
          </p>

          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            Projects
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-400 md:text-lg">
            Explore the innovative projects and solutions built by
            Engineering India GHRCE.
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="py-20 text-center text-gray-400">
            Loading projects...
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="py-20 text-center text-red-400">
            {error}
          </div>
        )}

        {/* EMPTY */}
        {!loading && !error && projects.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-20 text-center">
            <p className="text-gray-400">
              No projects available at the moment.
            </p>
          </div>
        )}

        {/* PROJECTS */}
        {!loading && !error && projects.length > 0 && (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project._id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40"
              >

                {/* IMAGE */}
                {project.image ? (
                  <div className="flex h-60 items-center justify-center overflow-hidden bg-[#080a0b]">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="flex h-60 items-center justify-center bg-white/[0.03]">
                    <span className="text-gray-500">
                      No image
                    </span>
                  </div>
                )}

                <div className="p-6">

                  {/* CATEGORY */}
                  {project.category && (
                    <span className="inline-block rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">
                      {project.category}
                    </span>
                  )}

                  {/* NAME */}
                  <h2 className="mt-4 text-2xl font-semibold">
                    {project.name}
                  </h2>

                  {/* PROBLEM */}
                  {project.problem && (
                    <p className="mt-4 line-clamp-3 text-sm leading-7 text-gray-400">
                      {project.problem}
                    </p>
                  )}

                  {/* TOOLS */}
                  {project.tools?.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tools.map(
                        (tool: string, index: number) => (
                          <span
                            key={index}
                            className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-gray-300"
                          >
                            {tool}
                          </span>
                        )
                      )}
                    </div>
                  )}

                  {/* LINKS */}
                  <div className="mt-6 flex flex-wrap gap-4">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-cyan-400 hover:text-cyan-300"
                      >
                        View Project →
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-gray-300 hover:text-white"
                      >
                        GitHub →
                      </a>
                    )}
                  </div>

                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

/* =========================
   GALLERY
========================= */

export function Gallery() {
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadGallery = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
`${API_URL}/gallery`        );

        if (!response.ok) {
          throw new Error("Failed to fetch gallery");
        }

        const result = await response.json();

        setGallery(result.data || []);
      } catch (err) {
        console.error("Gallery loading error:", err);
        setError("Unable to load gallery.");
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  return (
    <main className="min-h-screen bg-[#050708] text-white">
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-36 md:px-10 md:pt-40 lg:px-12">

        {/* HEADER */}
        <div className="mb-14">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Engineering India GHRCE
          </p>

          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            Gallery
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-400 md:text-lg">
            Moments, activities and memories from Engineering India GHRCE.
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="py-20 text-center text-gray-400">
            Loading gallery...
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="py-20 text-center text-red-400">
            {error}
          </div>
        )}

        {/* EMPTY */}
        {!loading && !error && gallery.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-20 text-center">
            <p className="text-gray-400">
              No gallery images available at the moment.
            </p>
          </div>
        )}

        {/* GALLERY */}
        {!loading && !error && gallery.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((item) => (
              <div
                key={item._id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <div className="flex h-72 items-center justify-center overflow-hidden bg-[#080a0b]">
                  <img
                    src={item.image}
                    alt={item.caption || "Engineering India GHRCE"}
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                  />
                </div>

                {(item.caption || item.category) && (
                  <div className="p-5">
                    {item.category && (
                      <span className="text-xs font-medium uppercase tracking-wider text-cyan-400">
                        {item.category}
                      </span>
                    )}

                    {item.caption && (
                      <p className="mt-2 text-sm text-gray-300">
                        {item.caption}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

/* =========================
   JOIN
========================= */

export function Join() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      section: String(formData.get("section") || ""),
      interest: String(formData.get("interest") || ""),
    };

    try {
      const response = await fetch(`${API_URL}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit application.");
      }

      setSubmitted(true);
      form.reset();
    } catch (err) {
      console.error("Join application error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit application."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="engineering-bg">
      <PageHero
        eyebrow="Join Engineering India"
        title="Be Part of What’s Next."
        description="Bring your curiosity. You do not need a perfect application — just tell us what you want to learn, build or contribute."
      />

      <section className="container mx-auto px-5 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal>
            <div>
              <div className="eyebrow">Your First Step</div>

              <h2 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">
                There is a place for your kind of curiosity.
              </h2>

              <div className="mt-8 space-y-5 text-zinc-500">
                <div className="flex gap-4">
                  <CheckCircle2 className="shrink-0 text-green-500" />
                  <span>Explore technology and new ideas.</span>
                </div>

                <div className="flex gap-4">
                  <CheckCircle2 className="shrink-0 text-green-500" />
                  <span>Build projects with other students.</span>
                </div>

                <div className="flex gap-4">
                  <CheckCircle2 className="shrink-0 text-green-500" />
                  <span>Contribute to community initiatives.</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="premium-card p-6 md:p-8">
              {submitted ? (
                <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                    <CheckCircle2 size={40} />
                  </div>

                  <h3 className="mt-6 text-3xl font-bold">
                    Application Received
                  </h3>

                  <p className="mt-3 max-w-md leading-7 text-zinc-500">
                    Thank you for reaching out. The Engineering India team
                    will follow up using the contact details you provided.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  
                  <div className="grid gap-5 md:grid-cols-2">
  <input
    name="name"
    required
    className="input-field"
    placeholder="Your name *"
  />

  <input
    name="phone"
    required
    type="tel"
    className="input-field"
    placeholder="Phone *"
  />
</div>

<div className="grid gap-5 md:grid-cols-2">
  <input
    name="email"
    required
    type="email"
    className="input-field"
    placeholder="Email *"
  />

  <input
    name="branch"
    required
    className="input-field"
    placeholder="Branch *"
  />
</div>

<input
  name="year"
  required
  className="input-field"
  placeholder="Year *"
/>

<select
  name="interest"
  required
  className="input-field"
>
  <option value="">What are you interested in?</option>
  <option>Technical</option>
  <option>Design</option>
  <option>Content</option>
  <option>Events</option>
  <option>Management</option>
  <option>PR & Outreach</option>
</select>

                  <textarea
                    name="message"
                    required
                    rows={6}
                    className="input-field resize-none"
                    placeholder="What would you like to explore with us?"
                  />

                  {error && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Sending..." : "Send Application"}
                    <Send size={17} />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

/* =========================
   CONTACT
========================= */

export function Contact() {
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="engineering-bg">
      <PageHero
        eyebrow="Contact"
        title="Let’s Build Something Together."
        description="A question, a thought or a collaboration? Send the community a note."
      />

      <section className="container mx-auto px-5 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <div className="eyebrow">Talk With Us</div>

              <h2 className="mt-6 text-4xl font-black md:text-5xl">
                The best things start with a note.
              </h2>

              <div className="mt-10 space-y-6">
                <div className="flex gap-4">
                  <div className="rounded-xl bg-orange-500/10 p-3 text-orange-500">
                    <MapPin size={20} />
                  </div>

                  <div>
                    <div className="font-semibold">Address</div>
                    <div className="mt-1 text-sm leading-6 text-zinc-500">
                      G. H. Raisoni College of Engineering,
                      <br />
                      Nagpur, Maharashtra, India
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="rounded-xl bg-green-500/10 p-3 text-green-500">
                    <Mail size={20} />
                  </div>

                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="mt-1 text-sm text-zinc-500">
                      raisoniengineeringindia@gmail.com
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="rounded-xl bg-white/5 p-3 text-zinc-400">
                    <MessageCircle size={20} />
                  </div>

                  <div>
  <div className="font-semibold">Social</div>

  <div className="mt-2 flex gap-3">

    {/* Instagram */}
    <a
      href="https://www.instagram.com/engineeringindia_ghrce/"
      target="_blank"
      rel="noreferrer"
      aria-label="Instagram"
      className="transition hover:text-orange-500"
    >
      <Instagram size={17} />
    </a>

    {/* LinkedIn */}
    <a
      href="YOUR_LINKEDIN_LINK_HERE"
      target="_blank"
      rel="noreferrer"
      aria-label="LinkedIn"
      className="transition hover:text-orange-500"
    >
      <Linkedin size={17} />
    </a>

    {/* WhatsApp */}
    <a
      href="https://chat.whatsapp.com/Bv68Z3vKmJiEPDZP5WsGht"
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="transition hover:text-orange-500"
    >
      <MessageCircle size={17} />
    </a>

  </div>
</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="premium-card p-6 md:p-8">
              {sent ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                    <CheckCircle2 size={40} />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold">
                    Message Sent
                  </h3>

                  <p className="mt-3 text-zinc-500">
                    We will get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <input
                    required
                    className="input-field"
                    placeholder="Your name *"
                  />

                  <input
                    required
                    type="email"
                    className="input-field"
                    placeholder="Email address *"
                  />

                  <input
                    required
                    className="input-field"
                    placeholder="Subject *"
                  />

                  <textarea
                    required
                    rows={7}
                    className="input-field resize-none"
                    placeholder="Your message *"
                  />

                  <button type="submit" className="btn-primary w-full">
                    Send Message
                    <Send size={17} />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>

        {/* MAP */}
        <Reveal className="mt-16">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#080a0b]">
            <div className="flex h-80 items-center justify-center bg-[radial-gradient(circle_at_center,rgba(255,122,24,.08),transparent_45%)]">
              <div className="text-center">
                <MapPin
                  size={40}
                  className="mx-auto text-orange-500"
                />

                <h3 className="mt-5 text-xl font-bold">
                  GHRCE · Nagpur
                </h3>

                <p className="mt-2 text-sm text-zinc-600">
                  G. H. Raisoni College of Engineering
                </p>

                <a
                  href="https://maps.app.goo.gl/zBivUnksNcTyUYTK8?g_st=ac"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white"
                >
                  Open in Maps
                  <ExternalLink size={15} className="text-orange-500" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}