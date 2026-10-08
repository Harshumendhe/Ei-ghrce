import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Cpu,
  Lightbulb,
  Network,
  Rocket,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";

const stats = [
  {
    value: "50+",
    label: "Members",
    icon: Users,
  },
  {
    value: "20+",
    label: "Events",
    icon: Network,
  },
  {
    value: "10+",
    label: "Initiatives",
    icon: Rocket,
  },
  {
    value: "500+",
    label: "Students Reached",
    icon: Users,
  },
  {
    value: "∞",
    label: "Opportunities",
    icon: Lightbulb,
  },
];

export default function Home() {
  return (
    <div className="engineering-bg overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-[850px] overflow-hidden pt-32">
        <div className="glow glow-orange left-[-180px] top-[160px]" />
        <div className="glow glow-green right-[-200px] top-[420px]" />

        {/* Circuit decorations */}
        <div className="circuit-line left-[4%] top-[35%] w-[280px] rotate-[25deg]" />
        <div className="circuit-line right-[3%] top-[30%] w-[320px] rotate-[-28deg]" />

        <div className="circuit-dot left-[22%] top-[32%]" />
        <div className="circuit-dot right-[20%] top-[42%] bg-green-500 shadow-green-500" />

        <div className="container relative z-10 mx-auto grid min-h-[680px] items-center gap-16 px-5 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="eyebrow">
              A Socio-Technical Student Community
            </div>

            <h1 className="hero-title mt-8">
              ENGINEERING
              <br />
              <span className="text-orange-500">INDIA</span>
              <br />
              <span className="text-white/80">GHRCE</span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg">
              Engineering is better together. A student-led community helping
              students build skills, share ideas, collaborate and turn
              curiosity into action.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/about" className="btn-primary">
                Explore Our Community
                <ArrowUpRight size={17} />
              </Link>

              <Link to="/join-us" className="btn-secondary">
                Join Engineering India
              </Link>
            </div>

            <div className="mt-12 flex gap-7 text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-600">
              <span>Innovate</span>
              <span>Lead</span>
              <span className="text-green-500">Impact</span>
            </div>
          </motion.div>

          {/* LOGO VISUAL */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1,
              delay: 0.15,
            }}
            className="relative hidden h-[540px] lg:block"
          >
            <div className="absolute inset-[40px] rounded-full border border-white/[0.06]" />

            <div className="absolute inset-[90px] rounded-full border border-orange-500/20" />

            <div className="absolute inset-[145px] rounded-full border border-green-500/20" />

            <div className="absolute left-1/2 top-1/2 h-[1px] w-[90%] -translate-x-1/2 -translate-y-1/2 rotate-[20deg] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

            <div className="absolute left-1/2 top-1/2 h-[1px] w-[90%] -translate-x-1/2 -translate-y-1/2 rotate-[-25deg] bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative flex h-72 w-72 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] shadow-[0_0_100px_rgba(255,122,24,.12)]"
              >
                <div className="absolute inset-5 rounded-full border border-orange-500/20" />

                <img
                  src="/assets/engineering-india-ghrce-logo.png"
                  alt="Engineering India GHRCE official logo"
                  className="relative h-52 w-52 object-contain"
                />
              </motion.div>
            </div>

            <div className="absolute left-2 top-24 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-xl">
              <Cpu size={18} className="mb-3 text-orange-500" />
              <div className="text-xs text-zinc-300">Build & Learn</div>
            </div>

            <div className="absolute bottom-20 right-0 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-xl">
              <Network size={18} className="mb-3 text-green-500" />
              <div className="text-xs text-zinc-300">Connect & Create</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="container mx-auto px-5 pb-28 lg:px-8">
        <Reveal>
          <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] md:grid-cols-5">
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className={`p-7 ${
                    index
                      ? "border-t border-white/10 md:border-l md:border-t-0"
                      : ""
                  }`}
                >
                  <Icon
                    size={20}
                    className={
                      index % 2 === 0
                        ? "text-orange-500"
                        : "text-green-500"
                    }
                  />

                  <div className="mt-5 text-3xl font-black">
                    {stat.value}
                  </div>

                  <div className="mt-1 text-sm text-zinc-500">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* POINT OF VIEW */}
      <section className="container mx-auto px-5 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal>
            <div className="eyebrow">01 — Our Point of View</div>

            <h2 className="section-title mt-6">
              Less gatekeeping.
              <br />
              <span className="text-orange-500">More making.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="max-w-2xl text-lg leading-9 text-zinc-400">
              <p>
                Engineering India GHRCE exists to make learning feel shared.
                We create spaces where students can explore technology,
                exchange ideas, learn from one another and turn ideas into
                action.
              </p>

              <p className="mt-6">
                We value thoughtful questions, genuine collaboration and the
                courage to try before having all the answers.
              </p>

              <Link
                to="/events"
                className="mt-8 inline-flex items-center gap-2 font-semibold text-white"
              >
                Explore our activities
                <ArrowDownRight size={18} className="text-orange-500" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALUES */}
      <section className="border-y border-white/10 bg-[#07090a]">
        <div className="container mx-auto grid gap-12 px-5 py-24 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <div className="eyebrow">02 — How We Show Up</div>

            <h2 className="section-title mt-6">
              Make space for the
              <br />
              <span className="text-green-500">next idea.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              {[
                "Learn in public",
                "Build with care",
                "Share the credit",
                "Stay curious",
              ].map((item, index) => (
                <div
                  key={item}
                  className="group flex items-center justify-between border-b border-white/10 py-6"
                >
                  <span className="text-xs font-bold text-zinc-700">
                    0{index + 1}
                  </span>

                  <span className="text-lg font-semibold text-zinc-300 transition group-hover:text-white md:text-xl">
                    {item}
                  </span>

                  <ArrowUpRight
                    size={18}
                    className="text-zinc-700 transition group-hover:text-orange-500"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* LOCAL ROOTS */}
      <section className="container mx-auto px-5 py-24 lg:px-8 lg:py-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.025] p-8 md:p-14">
            <div className="glow glow-orange right-[-160px] top-[-180px]" />

            <div className="relative z-10 max-w-3xl">
              <div className="eyebrow">03 — Local Roots, Open Horizon</div>

              <h2 className="section-title mt-6">
                Rooted in GHRCE.
                <br />
                <span className="text-orange-500">
                  Connected beyond campus.
                </span>
              </h2>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
                Our community brings together students, faculty and
                collaborators who share ideas, experiences and opportunities.
                What starts on campus can lead much further.
              </p>

              <Link to="/team" className="btn-secondary mt-8">
                Meet the Community
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-5 pb-28 lg:px-8">
        <Reveal>
          <div className="rounded-[30px] border border-orange-500/20 bg-orange-500/[0.04] p-8 md:p-14">
            <div className="eyebrow">04 — Find Your Place</div>

            <div className="mt-6 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <h2 className="section-title max-w-3xl">
                There is room for your kind of{" "}
                <span className="text-green-500">curiosity.</span>
              </h2>

              <Link to="/join-us" className="btn-primary shrink-0">
                Join the Community
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}