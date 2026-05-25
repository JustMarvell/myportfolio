import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

type Project = {
    id: number;
    name: string;
    description: string;
    tags: string[];
    url: string;
    stars: number;
};

type Props = {
    projects?: Project[];
};

// ─── Static data (replace with real projects from your GitHub) ───────────────

const defaultProjects: Project[] = [
    {
        id: 1,
        name: 'Portfolio',
        description:
            'This very site — built with Laravel 13, Inertia.js v3, React 19, and Tailwind CSS v4.',
        tags: ['Laravel', 'React', 'Inertia', 'Tailwind'],
        url: 'https://github.com/JustMarvell',
        stars: 0,
    },
    {
        id: 2,
        name: 'Project Alpha',
        description:
            'Replace this with one of your real projects from GitHub. Add a short punchy description.',
        tags: ['PHP', 'Laravel', 'MySQL'],
        url: 'https://github.com/JustMarvell',
        stars: 0,
    },
    {
        id: 3,
        name: 'Project Beta',
        description:
            'Another project showcase. Update the name, description, tags, and URL to match your repo.',
        tags: ['JavaScript', 'React', 'Node'],
        url: 'https://github.com/JustMarvell',
        stars: 0,
    },
];

const skills = [
    'PHP',
    'Laravel',
    'React',
    'TypeScript',
    'MySQL',
    'Tailwind CSS',
    'Inertia.js',
    'REST APIs',
];

// ─── Cursor blink component ───────────────────────────────────────────────────

function Cursor() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => setVisible((v) => !v), 530);
        return () => clearInterval(interval);
    }, []);

    return (
        <span
            style={{
                display: 'inline-block',
                width: '0.6ch',
                height: '1.1em',
                background: visible ? '#00e5ff' : 'transparent',
                verticalAlign: 'text-bottom',
                marginLeft: '2px',
                transition: 'background 0.05s',
            }}
        />
    );
}

// ─── Typed text component ─────────────────────────────────────────────────────

function TypedText({ text, delay = 0 }: { text: string; delay?: number }) {
    const [displayed, setDisplayed] = useState('');
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const startTimer = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(startTimer);
    }, [delay]);

    useEffect(() => {
        if (!started) return;
        let i = 0;
        const interval = setInterval(() => {
            setDisplayed(text.slice(0, i + 1));
            i++;
            if (i >= text.length) clearInterval(interval);
        }, 45);
        return () => clearInterval(interval);
    }, [started, text]);

    return (
        <span>
            {displayed}
            {displayed.length < text.length && <Cursor />}
        </span>
    );
}

// ─── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const [hovered, setHovered] = useState(false);

    return (
        <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'block',
                border: `1px solid ${hovered ? '#00e5ff' : '#1e1e1e'}`,
                borderRadius: '2px',
                padding: '1.5rem',
                background: hovered ? 'rgba(0,229,255,0.04)' : '#111',
                transition: 'border-color 0.2s, background 0.2s, transform 0.2s',
                transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
                animationDelay: `${0.6 + index * 0.15}s`,
                animationFillMode: 'both',
                animationName: 'fadeSlideUp',
                animationDuration: '0.5s',
                textDecoration: 'none',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* corner accent */}
            <span
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '2px',
                    height: hovered ? '100%' : '0',
                    background: '#00e5ff',
                    transition: 'height 0.3s ease',
                }}
            />

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '0.6rem',
                }}
            >
                <span
                    style={{
                        fontFamily: '"Courier New", Courier, monospace',
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: '#f0f0f0',
                        letterSpacing: '0.03em',
                    }}
                >
                    {project.name}
                </span>
                {project.stars > 0 && (
                    <span
                        style={{
                            fontSize: '0.72rem',
                            color: '#555',
                            fontFamily: 'monospace',
                        }}
                    >
                        ★ {project.stars}
                    </span>
                )}
            </div>

            <p
                style={{
                    fontSize: '0.82rem',
                    color: '#888',
                    lineHeight: 1.6,
                    marginBottom: '1rem',
                    margin: '0 0 1rem',
                }}
            >
                {project.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {project.tags.map((tag) => (
                    <span
                        key={tag}
                        style={{
                            fontSize: '0.68rem',
                            color: '#00e5ff',
                            border: '1px solid rgba(0,229,255,0.25)',
                            borderRadius: '2px',
                            padding: '0.15rem 0.5rem',
                            fontFamily: 'monospace',
                            letterSpacing: '0.05em',
                        }}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <span
                style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    fontSize: '0.7rem',
                    color: hovered ? '#00e5ff' : 'transparent',
                    transition: 'color 0.2s',
                    fontFamily: 'monospace',
                }}
            >
                view →
            </span>
        </a>
    );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Welcome({ projects = defaultProjects }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Subtle particle/dot grid background
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawGrid();
        };

        const drawGrid = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(0,229,255,0.07)';
            const spacing = 36;
            for (let x = 0; x < canvas.width; x += spacing) {
                for (let y = 0; y < canvas.height; y += spacing) {
                    ctx.beginPath();
                    ctx.arc(x, y, 0.8, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        };

        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    return (
        <>
            <Head title="Marvell — Developer Portfolio" />

            <style>{`
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
                @keyframes scanline {
                    0%   { transform: translateY(-100%); }
                    100% { transform: translateY(100vh); }
                }
                * { box-sizing: border-box; }
                body { margin: 0; background: #0d0d0d; }
                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-track { background: #0d0d0d; }
                ::-webkit-scrollbar-thumb { background: #1e1e1e; }
                ::selection { background: rgba(0,229,255,0.25); }
                a { cursor: pointer; }
            `}</style>

            <div
                style={{
                    minHeight: '100vh',
                    background: '#0d0d0d',
                    color: '#f0f0f0',
                    position: 'relative',
                    overflowX: 'hidden',
                }}
            >
                {/* Dot grid canvas */}
                <canvas
                    ref={canvasRef}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        pointerEvents: 'none',
                        zIndex: 0,
                    }}
                />

                {/* Scanline sweep */}
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        pointerEvents: 'none',
                        zIndex: 1,
                        overflow: 'hidden',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '2px',
                            background:
                                'linear-gradient(transparent, rgba(0,229,255,0.06), transparent)',
                            animation: 'scanline 8s linear infinite',
                        }}
                    />
                </div>

                {/* Top bar */}
                <header
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 100,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1rem 2rem',
                        borderBottom: '1px solid #1a1a1a',
                        background: 'rgba(13,13,13,0.92)',
                        backdropFilter: 'blur(12px)',
                        animation: 'fadeIn 0.6s ease both',
                    }}
                >
                    <span
                        style={{
                            fontFamily: 'monospace',
                            fontSize: '0.85rem',
                            color: '#00e5ff',
                            letterSpacing: '0.1em',
                        }}
                    >
                        ~/marvell
                    </span>
                    <nav style={{ display: 'flex', gap: '2rem' }}>
                        {['about', 'projects', 'contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item}`}
                                style={{
                                    fontFamily: 'monospace',
                                    fontSize: '0.78rem',
                                    color: '#666',
                                    textDecoration: 'none',
                                    letterSpacing: '0.08em',
                                    transition: 'color 0.2s',
                                }}
                                onMouseEnter={(e) =>
                                    ((e.currentTarget as HTMLAnchorElement).style.color = '#00e5ff')
                                }
                                onMouseLeave={(e) =>
                                    ((e.currentTarget as HTMLAnchorElement).style.color = '#666')
                                }
                            >
                                {item}
                            </a>
                        ))}
                    </nav>
                </header>

                {/* ── HERO ─────────────────────────────────────────────── */}
                <section
                    id="about"
                    style={{
                        position: 'relative',
                        zIndex: 10,
                        minHeight: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        padding: 'clamp(6rem, 12vw, 8rem) clamp(1.5rem, 8vw, 6rem)',
                    }}
                >
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'auto 1fr',
                            gap: 'clamp(2rem, 6vw, 5rem)',
                            alignItems: 'center',
                            maxWidth: '900px',
                            width: '100%',
                        }}
                    >
                        {/* Avatar */}
                        <div
                            style={{
                                animationName: 'fadeSlideUp',
                                animationDuration: '0.6s',
                                animationFillMode: 'both',
                                animationDelay: '0.1s',
                            }}
                        >
                            <div
                                style={{
                                    position: 'relative',
                                    width: 'clamp(90px, 14vw, 140px)',
                                    aspectRatio: '1',
                                }}
                            >
                                {/* Glow ring */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: '-4px',
                                        borderRadius: '50%',
                                        background:
                                            'conic-gradient(from 0deg, #00e5ff, transparent, #00e5ff)',
                                        animation: 'scanline 4s linear infinite',
                                        zIndex: 0,
                                    }}
                                />
                                {/* Avatar placeholder — replace src with your actual photo */}
                                <div
                                    style={{
                                        position: 'relative',
                                        zIndex: 1,
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '50%',
                                        background:
                                            'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)',
                                        border: '2px solid #1e1e1e',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {/* Swap this div for <img src="/your-photo.jpg" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%'}} /> */}
                                    <span
                                        style={{
                                            fontFamily: 'monospace',
                                            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                                            color: '#00e5ff',
                                            fontWeight: 700,
                                        }}
                                    >
                                        M
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Text block */}
                        <div>
                            {/* Prompt line */}
                            <div
                                style={{
                                    fontFamily: 'monospace',
                                    fontSize: '0.78rem',
                                    color: '#00e5ff',
                                    letterSpacing: '0.12em',
                                    marginBottom: '0.75rem',
                                    animationName: 'fadeSlideUp',
                                    animationDuration: '0.5s',
                                    animationFillMode: 'both',
                                    animationDelay: '0.2s',
                                }}
                            >
                                $ whoami
                            </div>

                            {/* Name */}
                            <h1
                                style={{
                                    fontFamily: '"Courier New", Courier, monospace',
                                    fontSize: 'clamp(2.2rem, 6vw, 4.2rem)',
                                    fontWeight: 800,
                                    color: '#f0f0f0',
                                    margin: '0 0 0.3rem',
                                    letterSpacing: '-0.02em',
                                    lineHeight: 1.05,
                                    animationName: 'fadeSlideUp',
                                    animationDuration: '0.5s',
                                    animationFillMode: 'both',
                                    animationDelay: '0.3s',
                                }}
                            >
                                {/* Replace with your actual full name */}
                                <TypedText text="Marvell" delay={400} />
                            </h1>

                            {/* Role */}
                            <div
                                style={{
                                    fontFamily: 'monospace',
                                    fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
                                    color: '#00e5ff',
                                    marginBottom: '1.4rem',
                                    animationName: 'fadeSlideUp',
                                    animationDuration: '0.5s',
                                    animationFillMode: 'both',
                                    animationDelay: '0.35s',
                                }}
                            >
                                {/* Update your role here */}
                                Full-Stack Developer
                            </div>

                            {/* Bio */}
                            <p
                                style={{
                                    fontSize: 'clamp(0.85rem, 1.8vw, 1rem)',
                                    color: '#888',
                                    lineHeight: 1.75,
                                    maxWidth: '520px',
                                    margin: '0 0 2rem',
                                    animationName: 'fadeSlideUp',
                                    animationDuration: '0.5s',
                                    animationFillMode: 'both',
                                    animationDelay: '0.4s',
                                }}
                            >
                                {/* Replace with your actual bio */}
                                I build clean, fast web applications. Passionate about Laravel,
                                React, and turning complex problems into elegant solutions. Based
                                in Gorontalo, Indonesia.
                            </p>

                            {/* CTA buttons */}
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    flexWrap: 'wrap',
                                    animationName: 'fadeSlideUp',
                                    animationDuration: '0.5s',
                                    animationFillMode: 'both',
                                    animationDelay: '0.5s',
                                }}
                            >
                                <a
                                    href="#projects"
                                    style={{
                                        fontFamily: 'monospace',
                                        fontSize: '0.82rem',
                                        letterSpacing: '0.08em',
                                        padding: '0.7rem 1.6rem',
                                        background: '#00e5ff',
                                        color: '#0d0d0d',
                                        textDecoration: 'none',
                                        fontWeight: 700,
                                        borderRadius: '2px',
                                        transition: 'opacity 0.2s',
                                    }}
                                    onMouseEnter={(e) =>
                                        ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.85')
                                    }
                                    onMouseLeave={(e) =>
                                        ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')
                                    }
                                >
                                    view projects
                                </a>
                                <a
                                    href="https://github.com/JustMarvell"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        fontFamily: 'monospace',
                                        fontSize: '0.82rem',
                                        letterSpacing: '0.08em',
                                        padding: '0.7rem 1.6rem',
                                        border: '1px solid #2a2a2a',
                                        color: '#888',
                                        textDecoration: 'none',
                                        borderRadius: '2px',
                                        transition: 'border-color 0.2s, color 0.2s',
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLAnchorElement).style.borderColor =
                                            '#00e5ff';
                                        (e.currentTarget as HTMLAnchorElement).style.color =
                                            '#00e5ff';
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLAnchorElement).style.borderColor =
                                            '#2a2a2a';
                                        (e.currentTarget as HTMLAnchorElement).style.color = '#888';
                                    }}
                                >
                                    github →
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── SKILLS TICKER ────────────────────────────────────── */}
                <div
                    style={{
                        position: 'relative',
                        zIndex: 10,
                        borderTop: '1px solid #1a1a1a',
                        borderBottom: '1px solid #1a1a1a',
                        padding: '0.8rem 0',
                        overflow: 'hidden',
                        background: '#0d0d0d',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            gap: '3rem',
                            animation: 'scanline 0s linear',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {[...skills, ...skills, ...skills].map((skill, i) => (
                            <span
                                key={i}
                                style={{
                                    fontFamily: 'monospace',
                                    fontSize: '0.72rem',
                                    letterSpacing: '0.14em',
                                    color: i % 3 === 0 ? '#00e5ff' : '#333',
                                    textTransform: 'uppercase',
                                }}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ── PROJECTS ─────────────────────────────────────────── */}
                <section
                    id="projects"
                    style={{
                        position: 'relative',
                        zIndex: 10,
                        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 8vw, 6rem)',
                        maxWidth: '1000px',
                        margin: '0 auto',
                    }}
                >
                    {/* Section heading */}
                    <div style={{ marginBottom: '2.5rem' }}>
                        <div
                            style={{
                                fontFamily: 'monospace',
                                fontSize: '0.72rem',
                                color: '#00e5ff',
                                letterSpacing: '0.14em',
                                marginBottom: '0.5rem',
                            }}
                        >
                            $ ls ./projects
                        </div>
                        <h2
                            style={{
                                fontFamily: '"Courier New", Courier, monospace',
                                fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                                fontWeight: 800,
                                color: '#f0f0f0',
                                margin: 0,
                                letterSpacing: '-0.02em',
                            }}
                        >
                            Selected Work
                        </h2>
                    </div>

                    {/* Projects grid */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns:
                                'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
                            gap: '1rem',
                        }}
                    >
                        {projects.map((project, i) => (
                            <ProjectCard key={project.id} project={project} index={i} />
                        ))}
                    </div>

                    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                        <a
                            href="https://github.com/JustMarvell?tab=repositories"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                fontFamily: 'monospace',
                                fontSize: '0.78rem',
                                color: '#555',
                                textDecoration: 'none',
                                letterSpacing: '0.08em',
                                transition: 'color 0.2s',
                            }}
                            onMouseEnter={(e) =>
                                ((e.currentTarget as HTMLAnchorElement).style.color = '#00e5ff')
                            }
                            onMouseLeave={(e) =>
                                ((e.currentTarget as HTMLAnchorElement).style.color = '#555')
                            }
                        >
                            view all repositories on GitHub →
                        </a>
                    </div>
                </section>

                {/* ── CONTACT ──────────────────────────────────────────── */}
                <section
                    id="contact"
                    style={{
                        position: 'relative',
                        zIndex: 10,
                        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 8vw, 6rem)',
                        borderTop: '1px solid #1a1a1a',
                        maxWidth: '1000px',
                        margin: '0 auto',
                    }}
                >
                    <div
                        style={{
                            fontFamily: 'monospace',
                            fontSize: '0.72rem',
                            color: '#00e5ff',
                            letterSpacing: '0.14em',
                            marginBottom: '0.5rem',
                        }}
                    >
                        $ echo $CONTACT
                    </div>
                    <h2
                        style={{
                            fontFamily: '"Courier New", Courier, monospace',
                            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                            fontWeight: 800,
                            color: '#f0f0f0',
                            margin: '0 0 0.8rem',
                            letterSpacing: '-0.02em',
                        }}
                    >
                        Get in Touch
                    </h2>
                    <p
                        style={{
                            fontFamily: 'sans-serif',
                            fontSize: '0.9rem',
                            color: '#666',
                            lineHeight: 1.7,
                            maxWidth: '480px',
                            margin: '0 0 2rem',
                        }}
                    >
                        {/* Update with your actual contact info */}
                        Open to freelance work and collaborations. Drop me a message — I
                        usually respond within a day.
                    </p>

                    <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
                        {[
                            { label: 'GitHub', href: 'https://github.com/JustMarvell' },
                            // Add your actual email / LinkedIn / etc below:
                            // { label: 'Email', href: 'mailto:your@email.com' },
                            // { label: 'LinkedIn', href: 'https://linkedin.com/in/yourhandle' },
                        ].map(({ label, href }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    fontFamily: 'monospace',
                                    fontSize: '0.82rem',
                                    letterSpacing: '0.08em',
                                    padding: '0.65rem 1.4rem',
                                    border: '1px solid #2a2a2a',
                                    color: '#888',
                                    textDecoration: 'none',
                                    borderRadius: '2px',
                                    transition: 'border-color 0.2s, color 0.2s',
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                                        '#00e5ff';
                                    (e.currentTarget as HTMLAnchorElement).style.color = '#00e5ff';
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                                        '#2a2a2a';
                                    (e.currentTarget as HTMLAnchorElement).style.color = '#888';
                                }}
                            >
                                {label} →
                            </a>
                        ))}
                    </div>
                </section>

                {/* ── FOOTER ───────────────────────────────────────────── */}
                <footer
                    style={{
                        position: 'relative',
                        zIndex: 10,
                        borderTop: '1px solid #1a1a1a',
                        padding: '1.5rem clamp(1.5rem, 8vw, 6rem)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                    }}
                >
                    <span
                        style={{
                            fontFamily: 'monospace',
                            fontSize: '0.72rem',
                            color: '#333',
                            letterSpacing: '0.06em',
                        }}
                    >
                        ~/marvell — built with Laravel + React
                    </span>
                    <span
                        style={{
                            fontFamily: 'monospace',
                            fontSize: '0.72rem',
                            color: '#2a2a2a',
                        }}
                    >
                        {new Date().getFullYear()}
                    </span>
                </footer>
            </div>
        </>
    );
}