
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  const normalized =
    value.length === 3
      ? value
          .split("")
          .map((char) => char + char)
          .join("")
      : value;

  const int = Number.parseInt(normalized, 16);

  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
}

export function alpha(hex, opacity) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export function mix(hexA, hexB, weight = 0.5) {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const ratio = clamp(weight, 0, 1);

  const channel = (from, to) =>
    Math.round(from + (to - from) * ratio)
      .toString(16)
      .padStart(2, "0");

  return `#${channel(a.r, b.r)}${channel(a.g, b.g)}${channel(a.b, b.b)}`;
}

const palette = {
  wine: "#520606",
  coral: "#F87575",
  cream: "#FCE8CC",
  sage: "#7BAE7F",
  plum: "#8D5A97",
  white: "#FFFFFF",
};
const paper = mix(palette.white, palette.cream, 0.16);
const shell = mix(palette.white, palette.cream, 0.28);
const blush = mix(palette.white, palette.coral, 0.16);
const mossMist = mix(palette.white, palette.sage, 0.18);
const mist = mix(palette.white, palette.cream, 0.08);
const fog = mix(palette.white, palette.plum, 0.04);
const ink = mix(palette.wine, palette.white, 0.2);
const body = mix(palette.wine, palette.white, 0.38);

export const THEME = {
  palette,
  primary: palette.wine,
  primaryHover: mix(palette.wine, "#000000", 0.12),
  secondary: palette.coral,
  secondaryHover: mix(palette.coral, palette.wine, 0.12),
  accent: palette.plum,
  accentHover: mix(palette.plum, palette.wine, 0.12),
  accentSoft: alpha(palette.plum, 0.14),
  success: palette.sage,
  successSoft: alpha(palette.sage, 0.16),
  danger: mix(palette.wine, palette.coral, 0.45),
  dangerHover: mix(mix(palette.wine, palette.coral, 0.45), palette.wine, 0.18),
  background: mist,
  backgroundAlt: fog,
  surface: alpha(palette.white, 0.82),
  surfaceStrong: alpha(palette.white, 0.94),
  surfaceSoft: shell,
  surfaceTint: mix(palette.cream, palette.white, 0.42),
  border: alpha(mix(palette.cream, palette.wine, 0.22), 0.28),
  borderStrong: alpha(mix(palette.cream, palette.wine, 0.32), 0.48),
  textStrong: ink,
  text: body,
  textSoft: alpha(ink, 0.7),
  textInverse: palette.white,
  heroGradientStart: mix(palette.white, palette.cream, 0.14),
  heroGradientEnd: mix(palette.white, palette.coral, 0.05),
  appGradientStart: mix(palette.white, palette.cream, 0.08),
  appGradientEnd: mix(palette.white, palette.plum, 0.04),
  overlay: alpha(palette.wine, 0.62),
  shadow: alpha(palette.wine, 0.1),
  shadowStrong: alpha(palette.wine, 0.16),
  focus: alpha(palette.plum, 0.18),
  tintCoral: blush,
  tintSage: mossMist,
};

export function applyTheme(root = document.documentElement) {
  const cssVars = {
    "--color-primary": THEME.primary,
    "--color-primary-hover": THEME.primaryHover,
    "--color-secondary": THEME.secondary,
    "--color-secondary-hover": THEME.secondaryHover,
    "--color-accent": THEME.accent,
    "--color-accent-hover": THEME.accentHover,
    "--color-accent-soft": THEME.accentSoft,
    "--color-success": THEME.success,
    "--color-success-soft": THEME.successSoft,
    "--color-danger": THEME.danger,
    "--color-danger-hover": THEME.dangerHover,
    "--color-bg": THEME.background,
    "--color-bg-alt": THEME.backgroundAlt,
    "--color-surface": THEME.surface,
    "--color-surface-strong": THEME.surfaceStrong,
    "--color-surface-soft": THEME.surfaceSoft,
    "--color-surface-tint": THEME.surfaceTint,
    "--color-border": THEME.border,
    "--color-border-strong": THEME.borderStrong,
    "--color-text-strong": THEME.textStrong,
    "--color-text": THEME.text,
    "--color-text-soft": THEME.textSoft,
    "--color-text-inverse": THEME.textInverse,
    "--color-hero-start": THEME.heroGradientStart,
    "--color-hero-end": THEME.heroGradientEnd,
    "--color-app-start": THEME.appGradientStart,
    "--color-app-end": THEME.appGradientEnd,
    "--color-overlay": THEME.overlay,
    "--color-shadow": THEME.shadow,
    "--color-shadow-strong": THEME.shadowStrong,
    "--color-focus": THEME.focus,
    "--color-tint-coral": THEME.tintCoral,
    "--color-tint-sage": THEME.tintSage,
  };

  Object.entries(cssVars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}
