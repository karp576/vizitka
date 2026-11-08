import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import Aurora from '@/components/Aurora'
import ClickSpark from '@/components/ClickSpark'
import GradientText from '@/components/GradientText'
import Reveal from '@/components/Reveal'
import ShinyText from '@/components/ShinyText'
import SpotlightCard from '@/components/SpotlightCard'
import SplitText from '@/components/SplitText'
import StarBorder from '@/components/StarBorder'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------ */
/*  Данные — правьте под себя                                          */
/* ------------------------------------------------------------------ */

const profile = {
  initials: 'DJ',
  name: 'Doodle Jay',
  role: 'Fullstack-разработчик · UI-инженер',
  handle: 'krutoi',
  location: 'Москва, Россия',
  workMode: 'Удалённо · гибрид',
  email: 'hello@example.com',
  phone: '+7 999 123-45-67',
  telegram: '@placeholder',
  github: 'github.com/placeholder',
  telegramUrl: 'https://t.me',
  githubUrl: 'https://github.com',
}

type IconName = 'mail' | 'telegram' | 'github' | 'phone' | 'arrow' | 'pin'

type Contact = {
  label: string
  value: string
  href: string
  hint: string
  icon: IconName
  color: string
  external?: boolean
}

const contacts: Contact[] = [
  {
    label: 'Почта',
    value: profile.email,
    href: `mailto:${profile.email}`,
    hint: 'Отвечаю в течение дня',
    icon: 'mail' as const,
    color: '#7c5cff',
  },
  {
    label: 'Telegram',
    value: profile.telegram,
    href: profile.telegramUrl,
    hint: 'Самый быстрый канал',
    icon: 'telegram' as const,
    color: '#4de3ff',
    external: true,
  },
  {
    label: 'GitHub',
    value: profile.github,
    href: profile.githubUrl,
    hint: 'Код и пет-проекты',
    icon: 'github' as const,
    color: '#c4b5fd',
    external: true,
  },
  {
    label: 'Телефон',
    value: profile.phone,
    href: `tel:${profile.phone.replace(/[^+\d]/g, '')}`,
    hint: 'Пн–Пт, 10:00–19:00 МСК',
    icon: 'phone' as const,
    color: '#ff5cc8',
  },
]

const skills = [
  'React 19',
  'TypeScript',
  'Next.js',
  'Node.js',
  'Tailwind CSS',
  'GSAP',
  'Framer Motion',
  'PostgreSQL',
  'Figma',
  'CI/CD',
]

/* ------------------------------------------------------------------ */
/*  Иконки                                                             */
/* ------------------------------------------------------------------ */

const iconPaths: Record<IconName, ReactNode> = {
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="size-full">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4.5 7.5 7.5 5.6 7.5-5.6" />
    </svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-full">
      <path d="M21.9 4.3 18.7 19c-.2 1-.9 1.3-1.7.8l-4.6-3.4-2.2 2.1c-.3.3-.5.5-1 .5l.3-4.5 8.3-7.5c.4-.3-.1-.5-.6-.2L7.3 13.2l-4.4-1.4c-1-.3-1-1 .2-1.4l17.2-6.6c.8-.3 1.5.2 1.6.5Z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-full">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-1.93c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="size-full">
      <path d="M6.4 2.9a2 2 0 0 0-2.7.4L2.5 4.9a2 2 0 0 0-.4 1.8c1.6 6.1 6.3 10.8 12.4 12.4a2 2 0 0 0 1.8-.4l1.6-1.2a2 2 0 0 0 .4-2.7l-2.2-2.9a2 2 0 0 0-2.5-.5l-1.3.7a14.6 14.6 0 0 1-4.6-4.6l.7-1.3a2 2 0 0 0-.4-2.5L6.4 2.9Z" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="size-full">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="size-full">
      <path d="M12 21.5s6.5-5.2 6.5-10.7a6.5 6.5 0 1 0-13 0C5.5 16.3 12 21.5 12 21.5Z" />
      <circle cx="12" cy="10.6" r="2.3" />
    </svg>
  ),
}

function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <span aria-hidden className={cn('inline-block shrink-0', className)}>
      {iconPaths[name]}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Хуки и мелочи                                                      */
/* ------------------------------------------------------------------ */

const moscowClock = new Intl.DateTimeFormat('ru-RU', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/Moscow',
})

function useMoscowTime() {
  const [time, setTime] = useState(() => moscowClock.format(new Date()))

  useEffect(() => {
    const id = window.setInterval(() => setTime(moscowClock.format(new Date())), 15_000)
    return () => window.clearInterval(id)
  }, [])

  return time
}

/* ------------------------------------------------------------------ */
/*  Секции                                                             */
/* ------------------------------------------------------------------ */

function Background() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[1200px] overflow-hidden">
      <div className="absolute inset-0 opacity-90">
        <Aurora
          colorStops={['#7c5cff', '#4de3ff', '#ff5cc8']}
          amplitude={1.15}
          blend={0.62}
          speed={0.7}
          height={0.45}
          scale={1.1}
          glow={0.8}
          brightness={0.9}
          layers={2}
          opacity={0.75}
        />
      </div>
      <div className="grid-lines absolute inset-0" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#05060a]/80 via-[#05060a]/25 to-transparent" />
      <div className="absolute left-1/2 top-[-16rem] h-[38rem] w-[56rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(124,92,255,0.22),transparent)] blur-2xl" />
      <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-b from-transparent via-[#05060a]/70 to-[#05060a]" />
    </div>
  )
}

function Header() {
  return (
    <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6 sm:px-6">
      <a href="#top" className="group flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-xl bg-[conic-gradient(from_200deg,#7c5cff,#4de3ff,#ff5cc8,#7c5cff)] p-px">
          <span className="grid size-full place-items-center rounded-[11px] bg-[#070811] font-display text-[11px] font-semibold tracking-wide text-white">
            {profile.initials}
          </span>
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 transition group-hover:text-white/80">
          {profile.handle}
        </span>
      </a>

      <nav className="flex items-center gap-1 sm:gap-2">
        <a href="#contacts" className="hidden rounded-full px-4 py-2 text-sm text-white/55 transition hover:bg-white/5 hover:text-white sm:block">
          Контакты
        </a>
        <a href="#stack" className="hidden rounded-full px-4 py-2 text-sm text-white/55 transition hover:bg-white/5 hover:text-white sm:block">
          Стек
        </a>
        <a
          href={profile.telegramUrl}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:border-[#7c5cff]/60 hover:bg-[#7c5cff]/10 hover:text-white"
        >
          Написать
          <Icon name="arrow" className="size-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </nav>
    </header>
  )
}

function Hero({ time }: { time: string }) {
  return (
    <section id="top" className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pb-24 pt-10 text-center sm:pt-16">
      <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#05060a]/45 px-4 py-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-white/70 backdrop-blur sm:text-[10px]">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" />
          <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
        </span>
        Открыт к проектам
      </span>

      <div className="relative mt-9">
        <span aria-hidden className="absolute -inset-5 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,#7c5cff,#4de3ff,#ff5cc8,#7c5cff)] opacity-40 blur-xl" />
        <div className="relative rounded-full bg-[conic-gradient(from_140deg,#7c5cff,#4de3ff,#ff5cc8,#7c5cff)] p-[1.5px] shadow-[0_0_60px_-12px_rgba(124,92,255,0.9)]">
          <div className="grid size-24 place-items-center rounded-full bg-[#070811] sm:size-28">
            <span className="font-display text-2xl font-medium tracking-tight text-white sm:text-3xl">{profile.initials}</span>
          </div>
        </div>
        <span className="absolute -bottom-0.5 right-0 size-3.5 rounded-full border-[3px] border-[#05060a] bg-emerald-400" />
      </div>

      <SplitText
        text={profile.name}
        tag="h1"
        trigger="load"
        splitType="chars"
        delay={40}
        duration={1.1}
        staggerFrom="center"
        ease="power4.out"
        from={{ opacity: 0, y: 44, rotateX: -55 }}
        to={{ opacity: 1, y: 0, rotateX: 0 }}
        textAlign="center"
        className="mt-8 font-display text-[clamp(2.5rem,8.6vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-white"
      />

      <div className="mt-5 max-w-full px-2">
        <ShinyText
          text={profile.role}
          color="#8d93ad"
          shineColor="#ffffff"
          speed={4.5}
          delay={0.8}
          shineWidth={16}
          softness={0.9}
          glow={0.2}
          className="font-mono text-[10px] uppercase tracking-[0.28em] sm:text-[11px] sm:tracking-[0.34em]"
        />
      </div>

      <p className="mt-7 max-w-xl text-balance text-[15px] leading-relaxed text-white/55 sm:text-[17px]">
        Проектирую и собираю <span className="text-white/90">быстрые интерфейсы</span>, которые приятно трогать. React,
        TypeScript, дизайн-системы и немного магии.
      </p>

      <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
        <StarBorder
          as="a"
          href={profile.telegramUrl}
          target="_blank"
          rel="noreferrer"
          color="#a78bfa"
          trailColor="#4de3ff"
          radius={999}
          thickness={1}
          duration={3.6}
          glow={0.9}
          sparkle
          hover="brighten"
          backgroundColor="#0a0b12"
          textColor="#f4f5fb"
          className="w-full px-8 py-4 text-sm sm:w-auto"
        >
          <span className="flex items-center gap-2.5">
            Написать в Telegram
            <Icon name="arrow" className="size-4" />
          </span>
        </StarBorder>

        <a
          href={profile.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-white/10 px-7 py-4 text-sm text-white/70 transition hover:border-white/25 hover:bg-white/[0.04] hover:text-white sm:w-auto"
        >
          <Icon name="github" className="size-4" />
          GitHub
          <Icon name="arrow" className="size-3.5 opacity-40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
        </a>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 font-mono text-[9px] uppercase tracking-[0.22em] text-white/35 sm:text-[10px]">
        <span className="inline-flex items-center gap-2">
          <Icon name="pin" className="size-3.5 text-[#4de3ff]/70" />
          {profile.location}
        </span>
        <span className="size-1 rounded-full bg-white/20" />
        <span className="inline-flex items-center gap-2">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400/90" />
          </span>
          {time} МСК
        </span>
        <span className="size-1 rounded-full bg-white/20" />
        <span>{profile.workMode}</span>
      </div>
    </section>
  )
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: ReactNode; description?: string }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#8b7bff]">{eyebrow}</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      </div>
      {description ? <p className="max-w-sm text-sm leading-relaxed text-white/40">{description}</p> : null}
    </div>
  )
}

function ContactCard({ item, index }: { item: (typeof contacts)[number]; index: number }) {
  return (
    <Reveal delay={index * 70} className="h-full">
      <a
        href={item.href}
        target={item.external ? '_blank' : undefined}
        rel={item.external ? 'noreferrer' : undefined}
        className="group block h-full rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7c5cff]"
      >
        <SpotlightCard
          spotlightColor={item.color}
          intensity={0.22}
          spotlightSize={280}
          borderGlow={0.9}
          grain={0.18}
          className="flex h-full flex-col justify-between gap-10 p-6! transition-transform duration-300 group-hover:-translate-y-1 sm:p-7!"
          style={{ '--spotlight-card-surface': '#0a0b12' } as CSSProperties}
        >
          <div className="flex items-start justify-between gap-4">
            <span
              className="grid size-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.03]"
              style={{ color: item.color }}
            >
              <Icon name={item.icon} className="size-5" />
            </span>
            <Icon
              name="arrow"
              className="size-4 text-white/20 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/70"
            />
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">{item.label}</p>
            <p className="mt-2 break-all text-[15px] font-medium text-white/90 sm:text-base">{item.value}</p>
            <p className="mt-1 text-xs text-white/35">{item.hint}</p>
          </div>
        </SpotlightCard>
      </a>
    </Reveal>
  )
}

function ContactSection() {
  return (
    <section id="contacts" className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-6">
      <Reveal>
        <SectionHeading
          eyebrow="Контакты"
          title={
            <GradientText colors={['#c4b5fd', '#4de3ff', '#ff9ffc']} variant="flow" animationSpeed={7} glow={0.25}>
              Давайте поговорим
            </GradientText>
          }
          description="Выберите удобный канал — по почте и в Telegram отвечаю в течение рабочего дня."
        />
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {contacts.map((item, index) => (
          <ContactCard key={item.label} item={item} index={index} />
        ))}
      </div>
    </section>
  )
}

function StackSection() {
  return (
    <section id="stack" className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
      <Reveal>
        <SectionHeading
          eyebrow="Стек"
          title="Чем работаю"
          description="Подбираю инструменты под задачу, а не наоборот. Ниже — то, в чём чувствую себя как дома."
        />
      </Reveal>

      <div className="mt-8 flex flex-wrap gap-2.5">
        {skills.map((skill, index) => (
          <Reveal key={skill} delay={index * 40}>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/55 transition hover:border-[#7c5cff]/50 hover:bg-[#7c5cff]/10 hover:text-white">
              {skill}
            </span>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="mt-12 flex flex-col gap-4 rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex items-center gap-4">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            <p className="text-sm text-white/60">
              Свободен для новых проектов с <span className="text-white">декабря 2026</span>
            </p>
          </div>
          <a
            href={profile.telegramUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-[#a78bfa] transition hover:text-white"
          >
            Обсудить задачу
            <Icon name="arrow" className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </Reveal>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30 sm:flex-row sm:text-[10px]">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="inline-flex items-center gap-1.5">
          Собрано на
          <a href="https://reactbits.dev" target="_blank" rel="noreferrer" className="text-white/60 transition hover:text-white">
            React Bits
          </a>
        </span>
        <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition hover:text-white/70">
          Исходники
          <Icon name="arrow" className="size-3" />
        </a>
      </div>
    </footer>
  )
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */

export default function App() {
  const time = useMoscowTime()

  return (
    <ClickSpark
      sparkColor={['#7c5cff', '#4de3ff', '#ff5cc8']}
      sparkSize={9}
      sparkRadius={26}
      sparkCount={12}
      sparkWidth={1.4}
      duration={650}
      glow={0.55}
      ring
      shape="line"
    >
      <div className="noise-overlay relative min-h-svh overflow-hidden bg-[#05060a]">
        <Background />
        <Header />
        <main className="relative z-10">
          <Hero time={time} />
          <ContactSection />
          <StackSection />
        </main>
        <Footer />
      </div>
    </ClickSpark>
  )
}
