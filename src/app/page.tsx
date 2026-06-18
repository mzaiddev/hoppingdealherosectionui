import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

type IconName =
  | "restaurant"
  | "lotus"
  | "home"
  | "coffee"
  | "pin"
  | "paw"
  | "theater"
  | "cart";

type DealCard = {
  key: string;
  label: string;
  kind: string;
  icon: IconName;
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
  color: string;
  labelColor: string;
  badgeColor: string;
  compact?: boolean;
};

const ARTBOARD = {
  width: 513,
  height: 641,
};

const cards: DealCard[] = [
  {
    key: "restaurants",
    label: "RESTAURANTS",
    kind: "restaurants",
    icon: "restaurant",
    x: 31,
    y: 315,
    width: 111,
    height: 80,
    rotate: -7,
    color: "#f2760e",
    labelColor: "#124aa0",
    badgeColor: "#c52d30",
  },
  {
    key: "beauty",
    label: "BEAUTY & SPAS",
    kind: "beauty",
    icon: "lotus",
    x: 154,
    y: 313,
    width: 106,
    height: 79,
    rotate: 0,
    color: "#f45d8f",
    labelColor: "#172d6f",
    badgeColor: "#f13da4",
  },
  {
    key: "home",
    label: "HOME SERVICES",
    kind: "home",
    icon: "home",
    x: 278,
    y: 312,
    width: 106,
    height: 78,
    rotate: -3,
    color: "#74b528",
    labelColor: "#245f20",
    badgeColor: "#4f9a2b",
  },
  {
    key: "coffee",
    label: "COFFEE & TEAS",
    kind: "coffee",
    icon: "coffee",
    x: 389,
    y: 314,
    width: 101,
    height: 78,
    rotate: 5,
    color: "#7517cf",
    labelColor: "#a81d32",
    badgeColor: "#5022c3",
  },
  // {
  //   key: "local",
  //   label: "LOCAL SERVICES",
  //   kind: "local",
  //   icon: "pin",
  //   x: 51,
  //   y: 493,
  //   width: 96,
  //   height: 61,
  //   rotate: -4,
  //   color: "#1c72e8",
  //   labelColor: "#153784",
  //   badgeColor: "#1767de",
  //   compact: true,
  // },
  // {
  //   key: "pets",
  //   label: "PETS",
  //   kind: "pets",
  //   icon: "paw",
  //   x: 161,
  //   y: 491,
  //   width: 93,
  //   height: 61,
  //   rotate: 0,
  //   color: "#c86610",
  //   labelColor: "#842c10",
  //   badgeColor: "#f07d20",
  //   compact: true,
  // },
  // {
  //   key: "entertainment",
  //   label: "ENTERTAINMENT & ARTS",
  //   kind: "entertainment",
  //   icon: "theater",
  //   x: 272,
  //   y: 492,
  //   width: 91,
  //   height: 61,
  //   rotate: 0,
  //   color: "#d02d21",
  //   labelColor: "#671114",
  //   badgeColor: "#d64230",
  //   compact: true,
  // },
  // {
  //   key: "shopping",
  //   label: "ONLINE SHOPPING",
  //   kind: "shopping",
  //   icon: "cart",
  //   x: 384,
  //   y: 490,
  //   width: 95,
  //   height: 63,
  //   rotate: 4,
  //   color: "#145cdb",
  //   labelColor: "#2267d9",
  //   badgeColor: "#125ed7",
  //   compact: true,
  // },
];

function pct(value: number, base: number) {
  return `${(value / base) * 100}%`;
}

export default function Home() {
  return (
    <main className="hero-screen" aria-label="Hopping Deals category menu">
      <section className="poster" aria-label="Hopping Deals mobile hero">
        <Image
          className="background-image"
          src="/bg-hero.png"
          alt=""
          fill
          priority
          sizes="(max-width: 513px) 100vw, 513px"
        />
        <Image
          className="brand-logo-image"
          src="/logo.png"
          alt="Hopping Deals"
          width={1024}
          height={1024}
          priority
        />
        <MenuButton />
        <div className="ticket-layer" aria-label="Deal categories">
          {cards.map((card) => (
            <TicketCard card={card} key={card.key} />
          ))}
        </div>
        <Image
          className="more-categories-image"
          src="/more-categories.png"
          alt="More Categories"
          width={254}
          height={45}
          priority
        />
      </section>
    </main>
  );
}

const CARD_THEMES: Record<string, { light: string; dark: string }> = {
  restaurants: { light: "#ffa93a", dark: "#cb4400" },
  beauty: { light: "#ff97c2", dark: "#d82465" },
  home: { light: "#a3f03b", dark: "#53950d" },
  coffee: { light: "#af52ff", dark: "#5209ac" },
  local: { light: "#4c97ff", dark: "#0f4fc2" },
  pets: { light: "#ff9835", dark: "#ae4400" },
  entertainment: { light: "#ff584d", dark: "#a61209" },
  shopping: { light: "#4c8dff", dark: "#0b46bd" },
};

function getLightColor(key: string, fallback: string) {
  return CARD_THEMES[key]?.light || fallback;
}

function getDarkColor(key: string, fallback: string) {
  return CARD_THEMES[key]?.dark || fallback;
}

const STAR_PATH =
  "M 0,-3.5 L 0.97,-1.02 L 3.56,-1.02 L 1.48,0.5 L 2.27,3.08 L 0,1.55 L -2.27,3.08 L -1.48,0.5 L -3.56,-1.02 L -0.97,-1.02 Z";

function getStarsForCard(key: string, width: number, height: number) {
  const relativeStars = [
    { x: 0.18, y: 0.72, scale: 0.9, opacity: 0.22 },
    { x: 0.25, y: 0.84, scale: 1.3, opacity: 0.28 },
    { x: 0.42, y: 0.78, scale: 0.8, opacity: 0.18 },
    { x: 0.58, y: 0.85, scale: 1.1, opacity: 0.25 },
    { x: 0.72, y: 0.7, scale: 1.2, opacity: 0.3 },
    { x: 0.85, y: 0.8, scale: 0.7, opacity: 0.15 },
    { x: 0.32, y: 0.88, scale: 1.0, opacity: 0.25 },
    { x: 0.65, y: 0.74, scale: 1.4, opacity: 0.27 },
  ];

  const defaultStars = [
    { x: 0.15, y: 0.78, scale: 0.8, opacity: 0.22 },
    { x: 0.35, y: 0.82, scale: 1.1, opacity: 0.28 },
    { x: 0.55, y: 0.76, scale: 0.7, opacity: 0.18 },
    { x: 0.75, y: 0.84, scale: 1.0, opacity: 0.25 },
    { x: 0.88, y: 0.72, scale: 0.9, opacity: 0.2 },
  ];

  const list = relativeStars || defaultStars;
  return list.map((s) => ({
    x: s.x * width,
    y: s.y * height,
    scale: s.scale * (width > 100 ? 1.0 : 0.7),
    opacity: s.opacity,
  }));
}

function getTicketPath(
  width: number,
  height: number,
  notchesCount = 5,
  notchRadius = 5.5,
  cornerRadius = 7,
  inset = 0,
) {
  const w = width - inset * 2;
  const h = height - inset * 2;
  const r = Math.max(0, cornerRadius - inset * 0.5);
  const nr = Math.max(0, notchRadius - inset * 0.1);

  const yMin = r + nr + 4;
  const yMax = h - r - nr - 4;
  const notchYPositions: number[] = [];
  if (notchesCount === 1) {
    notchYPositions.push(h / 2);
  } else if (notchesCount > 1) {
    const step = (yMax - yMin) / (notchesCount - 1);
    for (let i = 0; i < notchesCount; i++) {
      notchYPositions.push(yMin + i * step);
    }
  }

  let d = `M ${inset + r},${inset} L ${width - inset - r},${inset}`;
  d += ` A ${r},${r} 0 0,0 ${width - inset},${inset + r}`;

  for (let i = 0; i < notchYPositions.length; i++) {
    const yc = inset + notchYPositions[i];
    d += ` L ${width - inset},${yc - nr}`;
    d += ` A ${nr},${nr} 0 0,0 ${width - inset},${yc + nr}`;
  }
  d += ` L ${width - inset},${height - inset - r}`;
  d += ` A ${r},${r} 0 0,0 ${width - inset - r},${height - inset}`;

  d += ` L ${inset + r},${height - inset}`;
  d += ` A ${r},${r} 0 0,0 ${inset},${height - inset - r}`;

  for (let i = notchYPositions.length - 1; i >= 0; i--) {
    const yc = inset + notchYPositions[i];
    d += ` L ${inset},${yc + nr}`;
    d += ` A ${nr},${nr} 0 0,0 ${inset},${yc - nr}`;
  }
  d += ` L ${inset},${inset + r}`;
  d += ` A ${r},${r} 0 0,0 ${inset + r},${inset}`;
  d += " Z";

  return d;
}

function TicketCard({ card }: { card: DealCard }) {
  const style = {
    left: pct(card.x, ARTBOARD.width),
    top: pct(card.y, ARTBOARD.height),
    width: pct(card.width, ARTBOARD.width),
    height: pct(card.height, ARTBOARD.height),
    transform: `rotate(${card.rotate}deg)`,
    "--ticket-color": card.color,
    "--ticket-label": card.labelColor,
    "--badge-color": card.badgeColor,
  } as CSSProperties;

  const w = card.width;
  const h = card.height;
  const notches = card.compact ? 4 : 5;
  const notchR = card.compact ? 4.0 : 5.5;
  const cornerR = card.compact ? 6.5 : 8.0;

  const outerPath = getTicketPath(w, h, notches, notchR, cornerR, 0);
  const innerPath = getTicketPath(w, h, notches, notchR, cornerR, 3.5);
  const starsList = getStarsForCard(card.key, w, h);

  return (
    <article
      className={`ticket ticket--${card.kind}${card.compact ? " ticket--compact" : ""}`}
      style={style}
      aria-label={card.label}
    >
      <svg
        className="ticket-svg"
        viewBox={`0 0 ${w} ${h}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id={`grad-${card.key}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={getLightColor(card.key, card.color)} />
            <stop
              offset="100%"
              stopColor={getDarkColor(card.key, card.color)}
            />
          </linearGradient>
          <clipPath id={`clip-${card.key}`}>
            <path d={outerPath} />
          </clipPath>
        </defs>

        <g clipPath={`url(#clip-${card.key})`}>
          <path d={outerPath} fill={`url(#grad-${card.key})`} />
          <path
            d={`M 0,0 L ${w},0 L 0,${h} Z`}
            fill="white"
            opacity="0.08"
            pointerEvents="none"
          />
          {starsList.map((star, idx) => (
            <path
              key={idx}
              d={STAR_PATH}
              transform={`translate(${star.x}, ${star.y}) scale(${star.scale})`}
              fill="white"
              opacity={star.opacity}
            />
          ))}
          <path
            d={outerPath}
            fill="black"
            opacity="0.14"
            style={{ mixBlendMode: "multiply" }}
          />
        </g>
        <path
          d={innerPath}
          stroke={
            card.key === "coffee"
              ? "rgba(255, 255, 120, 0.4)"
              : "rgba(255, 255, 255, 0.42)"
          }
          strokeWidth="1.2"
          strokeDasharray="2,2"
          fill="none"
        />
        <path d={outerPath} stroke="#061442" strokeWidth="2.8" fill="none" />
      </svg>

      <div className="ticket-body">
        <div className="ticket-label">{card.label}</div>
        {/* <DealCopy kind={card.kind} /> */}
        <div className="deal-copy deal-copy--coffee">
          <span className="yellow">SUPER</span>
          <span>SAVINGS</span>
        </div>
      </div>
      <div className="ticket-badge" aria-hidden="true">
        <BadgeIcon name={card.icon} />
      </div>
    </article>
  );
}

function DealCopy({ kind }: { kind: string }) {
  const copy: Record<string, ReactNode> = {
    restaurants: (
      <div className="deal-copy deal-copy--restaurants">
        <span className="amount">$10</span>
        <span className="yellow off">OFF</span>
      </div>
    ),
    beauty: (
      <div className="deal-copy deal-copy--beauty">
        <span>STUDENTS</span>
        <span>30% OFF</span>
      </div>
    ),
    home: <div className="deal-copy deal-copy--home">Deals</div>,
    coffee: (
      <div className="deal-copy deal-copy--coffee">
        <span className="yellow">SUPER</span>
        <span>SAVINGS</span>
      </div>
    ),
    local: <div className="deal-copy deal-copy--local">SALE</div>,
    pets: <div className="deal-copy deal-copy--pets">BOGO</div>,
    entertainment: (
      <div className="deal-copy deal-copy--entertainment">
        <span>IN-STORE</span>
        <span>SAVINGS</span>
        <span>15-20% OFF</span>
      </div>
    ),
    shopping: (
      <div className="deal-copy deal-copy--shopping">
        <span className="yellow">FREE</span>
        <span>APPETIZERS</span>
      </div>
    ),
  };

  return copy[kind];
}

function MenuButton() {
  return (
    <button className="menu-button" type="button" aria-label="Open menu">
      <span className="hamburger" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span className="menu-label">Menu</span>
    </button>
  );
}

function BadgeIcon({ name }: { name: IconName }) {
  const common = {
    className: "badge-svg",
    viewBox: "0 0 32 32",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  };

  switch (name) {
    case "restaurant":
      return (
        <svg {...common}>
          <path
            d="M9 4v11M12 4v11M6 4v11M6 9h6M9 15v13"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2.6"
          />
          <path
            d="M22 4c-3 3-4.5 6.6-4.3 10.8.1 2.6 1.5 4.2 3.2 4.2h1.5V28"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2.6"
          />
        </svg>
      );
    case "lotus":
      return (
        <svg {...common}>
          <path
            d="M16 5c4 5 4 10 0 15-4-5-4-10 0-15Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M8 10c5 2 8 5.8 8 11-6-.8-9.4-4.4-8-11ZM24 10c-5 2-8 5.8-8 11 6-.8 9.4-4.4 8-11Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M4 18c5.4 0 9.4 1.7 12 5 2.6-3.3 6.6-5 12-5-2 6-6 9-12 9s-10-3-12-9Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      );
    case "home":
      return (
        <svg {...common}>
          <path
            d="M5 15.2 16 6l11 9.2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.6"
          />
          <path
            d="M8.5 14v13h15V14"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2.6"
          />
          <path
            d="M14 27v-7h4v7"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2.3"
          />
        </svg>
      );
    case "coffee":
      return (
        <svg {...common}>
          <path
            d="M9 15h12v5.5A5.5 5.5 0 0 1 15.5 26h-1A5.5 5.5 0 0 1 9 20.5Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
          <path
            d="M21 17h2.5c2 0 3 1 3 2.8 0 2-1.5 3.2-4.5 3.2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2.4"
          />
          <path
            d="M12 4c-2 2.4 2 4.1 0 6.4M17 4c-2 2.4 2 4.1 0 6.4M22 5.5c-1.5 1.8 1.5 3.1 0 4.9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path
            d="M16 29S7 20.3 7 12.8C7 7.6 11 4 16 4s9 3.6 9 8.8C25 20.3 16 29 16 29Z"
            fill="currentColor"
          />
          <circle cx="16" cy="13" r="4" fill="var(--badge-color)" />
        </svg>
      );
    case "paw":
      return (
        <svg {...common}>
          <ellipse
            cx="9"
            cy="12"
            rx="3"
            ry="4"
            fill="currentColor"
            transform="rotate(-18 9 12)"
          />
          <ellipse cx="15" cy="9" rx="3" ry="4" fill="currentColor" />
          <ellipse
            cx="21"
            cy="12"
            rx="3"
            ry="4"
            fill="currentColor"
            transform="rotate(18 21 12)"
          />
          <ellipse
            cx="24"
            cy="18"
            rx="2.7"
            ry="3.5"
            fill="currentColor"
            transform="rotate(24 24 18)"
          />
          <path
            d="M7 24c1-5 4.8-8 9-8s8 3 9 8c.8 4.5-5.3 4.8-9 2.2C12.3 28.8 6.2 28.5 7 24Z"
            fill="currentColor"
          />
        </svg>
      );
    case "theater":
      return (
        <svg {...common}>
          <path
            d="M5.5 9.5c4.5-1.7 8.2-1.5 11.5.3v7.5c0 5.8-3.6 9-7.3 9-3.4 0-5.7-3.2-5.7-8.7V11c0-.7.5-1.3 1.5-1.5Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M15.2 8.8c3.6-1.2 7-1 10.8.5 1 .2 1.5.8 1.5 1.5v6.7c0 5.6-2.4 8.8-5.7 8.8-2.5 0-5-1.4-6.4-4"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M8.5 15.5h.1M13 15.5h.1M7.8 20c2 1.2 4 1.2 6 0M19 15.8h.1M23.5 15.8h.1M19.2 21c1.6-1.1 3.2-1.1 4.8 0"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2.3"
          />
        </svg>
      );
    case "cart":
      return (
        <svg {...common}>
          <path
            d="M5 7h3l2.4 13.5h12.5l2.5-9.5H11"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.6"
          />
          <circle cx="13" cy="25" r="2.3" fill="currentColor" />
          <circle cx="23" cy="25" r="2.3" fill="currentColor" />
        </svg>
      );
  }
}
