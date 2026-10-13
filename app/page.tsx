"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const recommendations = [
  {
    initials: "MM",
    name: "Mahathir Aldiafis Mochammad",
    role: "Digital Transformation Manager",
    company: "Telkom Indonesia",
    quote:
      "Risa was one of my mentees at Telkom, and I had the pleasure of working closely with her on the Eventeer project. She demonstrated remarkable adaptability to the work environment and consistently excelled in collaboration, especially in communication. Risa’s ability to implement clean code practices significantly contributed to the project's success and made my work much easier. I highly recommend Risa for her professionalism, technical expertise, and strong teamwork skills—she would be a valuable asset to any team.",
  },
  {
    initials: "DK",
    name: "Dimas Eka Mahendra Karsoma",
    role: "Application Developer",
    company: "IBM",
    quote:
      "Good at problem solving, collaborate with others and contribute to a positive work environment.",
  },
  {
    initials: "MR",
    name: "Muhammad Rayhan Ravianda",
    role: "Software Engineer",
    company: "Gotrade",
    quote:
      "Risa is a great work partner, who has great technical and communication skill, a team player, and able to adapt with new technology and tech stacks. Looking forward to work together again and see her on top!",
  },
  {
    initials: "RS",
    name: "Rivaldi Agustinus Nugraha Siringoringo",
    role: "Software Engineering Enthusiast",
    company: "PT Mitra Berlian Unggas (MBU Group)",
    quote:
      "Skilled developer, supportive colleague, and also a great person to work with.",
  },
  {
    initials: "MD",
    name: "Monica Davita",
    role: "Senior Associate",
    company: "PwC Indonesia",
    quote:
      "Risa is a very talented person with an amazing will to learn something new. She could adapt to the new environment quickly and can be thrived in any circumstances. She is really well-known of her advanced skill on Frontend Mobile Development and I am agree about that too. I am looking forward to work with her in the future.",
  },
  {
    initials: "WP",
    name: "Wahyu Styo Pratama",
    role: "Software Developer",
    quote:
      "Risa is a great informatics engineer. She has a really wonderful experience in programming skills and team work. She always brings an excellent results in her work.",
  },
  {
    initials: "NR",
    name: "Nasywa Rana",
    role: "Product Designer",
    company: "Kitalulus",
    quote:
      "She is very good at her work and always give the best results with her efforts.",
  },
  {
    initials: "PR",
    name: "Putri Audi Rachma Sugiharto",
    role: "Business Analyst",
    company: "Telkom Sigma",
    quote:
      "Risa is always striving to reach a goal with a good plan and good preparation with her skill.",
  },
  {
    initials: "RB",
    name: "Reza Berlian",
    role: "Web Designer & Developer | Coding Educator",
    company: "Inntexia Academy",
    quote:
      "She is so multitalented and so skillful, also always did everything all out.",
  },
  {
    initials: "NV",
    name: "Natasya Valencia",
    role: "Frontend Developer",
    company: "Vlink",
    quote:
      "She is skillful in her field, has good teamwork, and try to give her best.",
  },
  {
    initials: "FA",
    name: "Faisal Affan",
    role: "Solution Architect Lead",
    company: "Bank Mandiri",
    quote:
      "Risa has a good team working and high critical thinking to solve team problem.",
  },
];

function DownloadIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M12 3v12m0 0 5-5m-5 5-5-5M5 20h14" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.2 2.5 3.3 5.5 3.3 9S14.2 18.5 12 21M12 3C9.8 5.5 8.7 8.5 8.7 12S9.8 18.5 12 21" />
    </svg>
  );
}

export default function Home() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const playHoverPop = () => {
    const context = audioContextRef.current ?? new AudioContext();
    audioContextRef.current = context;

    if (context.state === "suspended") {
      void context.resume();
    }

    const now = context.currentTime;

    const playTone = (start: number, from: number, to: number, volume: number) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(from, start);
      oscillator.frequency.exponentialRampToValueAtTime(to, start + 0.07);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(volume, start + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.075);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(start);
      oscillator.stop(start + 0.08);
    };

    playTone(now, 480, 760, 0.2);
    playTone(now + 0.065, 720, 1120, 0.24);
  };

  return (
    <main className="portfolio" id="home">
      <header className="site-header">
        <div className="header-info">
          <span className="location"><GlobeIcon /> Jakarta, ID</span>
          <span aria-hidden="true">|</span>
          <a
            className="resume-link"
            href="https://docs.google.com/document/d/1iF1SgyGbqCnEb_FFK9CWiVWShR0wskvD/export?format=pdf"
          >
            Resume <DownloadIcon />
          </a>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <h1 id="hero-title">Risa Augusta</h1>

        <p className="role" id="about">Software Engineer</p>

        <div className="hero-visual" id="gallery">
          <Image
            src="/hero-laptop.png"
            alt="3D avatar Risa melambaikan tangan dari layar laptop"
            fill
            priority
            sizes="(max-width: 700px) 100vw, 760px"
          />
        </div>

        <Link
          className="glass-card floating-card glass-card--travel"
          href="/travel"
          aria-label="I love traveling"
          onPointerEnter={playHoverPop}
        >
          <strong>I Love Traveling</strong>
          <span>Explore more →</span>
        </Link>

        <a
          className="glass-card floating-card glass-card--art"
          href="https://www.instagram.com/risartwork.psd/"
          target="_blank"
          rel="noreferrer"
          aria-label="Lihat karya seni di Instagram"
          onPointerEnter={playHoverPop}
        >
          <strong>I Create Art</strong>
          <span>Explore more →</span>
        </a>

        <a
          className="glass-card floating-card glass-card--projects"
          href="https://drive.google.com/file/d/1tkysibf8uWgKBwur2it6uPvfj4t8q_PW/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
          aria-label="Buka portfolio di tab baru"
          onPointerEnter={playHoverPop}
        >
          <strong>Portfolio.</strong>
          <span>Explore more →</span>
        </a>

        <a
          className="glass-card floating-card glass-card--writing"
          href="https://risaaugusta.medium.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="Baca tulisan di Medium"
          onPointerEnter={playHoverPop}
        >
          <strong>Also Writing!</strong>
          <span>Explore more →</span>
        </a>

        <div className="recommendations" aria-label="LinkedIn recommendations">
          <div className="recommendations-track">
            {[...recommendations, ...recommendations].map((recommendation, index) => (
              <article
                className="glass-card recommendation-card"
                key={`${recommendation.initials}-${index}`}
                aria-hidden={index >= recommendations.length}
              >
                <span className="recommendation-avatar">{recommendation.initials}</span>
                <a
                  href="https://www.linkedin.com/in/risaaugusta/"
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={index >= recommendations.length ? -1 : undefined}
                >
                  <strong>{recommendation.name}</strong>
                  {(recommendation.role || recommendation.company) && (
                    <span className="recommendation-role">
                      {recommendation.role}
                      {recommendation.company ? ` · ${recommendation.company}` : ""}
                    </span>
                  )}
                  <p>“{recommendation.quote}”</p>
                </a>
              </article>
            ))}
          </div>
        </div>

      </section>

      <footer className="site-footer">© 2026 Risa Augusta Murti</footer>
    </main>
  );
}
