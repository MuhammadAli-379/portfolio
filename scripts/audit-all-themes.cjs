const fs = require('fs');

function luminance(r, g, b) {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function hexToRgb(hex) {
  hex = hex.replace('#', '').trim();
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16)
  };
}

function contrast(h1, h2) {
  const rgb1 = hexToRgb(h1);
  const rgb2 = hexToRgb(h2);
  const l1 = luminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = luminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// 11 Themes exact values from index.css
const themes = [
  // Dark (5)
  { name: 'Dark - obsidian-gold (Default)', bg: '#0A0D14', surface: '#111726', text: '#F8FAFC', secondary: '#94A3B8', muted: '#71717A', accent: '#D4AF37', btnText: '#0A0D14' },
  { name: 'Dark - midnight-bloom', bg: '#0C0B14', surface: '#141224', text: '#FAF5FF', secondary: '#C084FC', muted: '#8A7A9E', accent: '#C084FC', btnText: '#0C0B14' },
  { name: 'Dark - emerald-matrix', bg: '#07120D', surface: '#0D1F17', text: '#ECFDF5', secondary: '#6EE7B7', muted: '#567D6E', accent: '#34D399', btnText: '#07120D' },
  { name: 'Dark - velvet-burgundy', bg: '#12080C', surface: '#1E0E15', text: '#FFF1F2', secondary: '#FDA4AF', muted: '#8E6773', accent: '#FB7185', btnText: '#12080C' },
  { name: 'Dark - oceanic-depths', bg: '#061018', surface: '#0B1B28', text: '#F0F9FF', secondary: '#7DD3FC', muted: '#52758E', accent: '#38BDF8', btnText: '#061018' },
  // Silver (1)
  { name: 'Silver - silver-slate', bg: '#E2E8F0', surface: '#F1F5F9', text: '#0F172A', secondary: '#334155', muted: '#475569', accent: '#0284C7', btnText: '#FFFFFF' },
  // Light (5)
  { name: 'Light - warm-sand', bg: '#FAF7F0', surface: '#FFFFFF', text: '#1C180E', secondary: '#4C4332', muted: '#615641', accent: '#925E07', btnText: '#FFFFFF' },
  { name: 'Light - analyst-slate', bg: '#F8FAFC', surface: '#FFFFFF', text: '#0A0F1D', secondary: '#334155', muted: '#475569', accent: '#1D4ED8', btnText: '#FFFFFF' },
  { name: 'Light - pearl-bronze', bg: '#FAF7F2', surface: '#FFFFFF', text: '#1B160E', secondary: '#4B3E2D', muted: '#63533D', accent: '#8C5A1E', btnText: '#FFFFFF' },
  { name: 'Light - antique-ivory', bg: '#FAF6EB', surface: '#FFFFFF', text: '#1A150C', secondary: '#4A3C23', muted: '#625132', accent: '#945F0F', btnText: '#FFFFFF' },
  { name: 'Light - baby-pink', bg: '#FFF5F7', surface: '#FFFFFF', text: '#2A0814', secondary: '#5C2235', muted: '#733348', accent: '#BE185D', btnText: '#FFFFFF' },
];

console.log('=== THEME CONTRAST AUDIT (WCAG AA >= 4.5:1) ===');
themes.forEach(t => {
  const accentOnBg = contrast(t.accent, t.bg);
  const btnContrast = contrast(t.btnText, t.accent);
  const pillTextContrast = contrast(t.secondary, t.surface);
  const mutedContrast = contrast(t.muted, t.bg);
  const passesAll = accentOnBg >= 4.5 && btnContrast >= 4.5 && pillTextContrast >= 4.5 && mutedContrast >= 4.5;
  console.log(`\nTheme: ${t.name}`);
  console.log(`  1. Accent label on page bg (${t.accent} on ${t.bg}): ${accentOnBg.toFixed(2)}:1 ${accentOnBg >= 4.5 ? 'PASS' : 'FAIL'}`);
  console.log(`  2. Filled-button text (${t.btnText} on ${t.accent}): ${btnContrast.toFixed(2)}:1 ${btnContrast >= 4.5 ? 'PASS' : 'FAIL'}`);
  console.log(`  3. Pill text (${t.secondary} on ${t.surface}): ${pillTextContrast.toFixed(2)}:1 ${pillTextContrast >= 4.5 ? 'PASS' : 'FAIL'}`);
  console.log(`  4. Muted text (${t.muted} on ${t.bg}): ${mutedContrast.toFixed(2)}:1 ${mutedContrast >= 4.5 ? 'PASS' : 'FAIL'}`);
  console.log(`  Overall: ${passesAll ? 'ALL PASS AA' : 'NEEDS FIX'}`);
});
