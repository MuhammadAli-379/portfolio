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

const themes = [
  // 5 Dark themes
  { name: '1. Burgundy & Black (burgundy)', bg: '#08070A', surface: '#18151E', text: '#FAF7F5', secondary: '#C8C0CC', muted: '#A297A6', accent: '#E2C074', btnText: '#08070A' },
  { name: '2. Navy & Light Blue (navy)', bg: '#060A12', surface: '#101B2E', text: '#F0F6FC', secondary: '#B3C5DC', muted: '#8FA7C7', accent: '#4EA8DE', btnText: '#060A12' },
  { name: '3. Charcoal & Slate (charcoal)', bg: '#090A0D', surface: '#171A22', text: '#F3F4F6', secondary: '#BAC1CC', muted: '#969EAD', accent: '#FB923C', btnText: '#090A0D' },
  { name: '4. Grey & Silver (grey)', bg: '#0B0B0C', surface: '#1B1B1E', text: '#F5F5F7', secondary: '#BCBCBF', muted: '#98989E', accent: '#D4A373', btnText: '#0B0B0C' },
  { name: '5. Silver & Gold (silver)', bg: '#090A0C', surface: '#181D24', text: '#F8FAFC', secondary: '#CBD5E1', muted: '#97A3B5', accent: '#EAB308', btnText: '#090A0C' },

  // 6 Light themes
  { name: '6. Analyst Slate (analyst-slate)', bg: '#F8FAFC', surface: '#FFFFFF', text: '#0A0F1D', secondary: '#334155', muted: '#475569', accent: '#1D4ED8', btnText: '#FFFFFF' },
  { name: '7. Warm Sand (warm-sand)', bg: '#FAF7F0', surface: '#FFFFFF', text: '#1C180E', secondary: '#4C4332', muted: '#615641', accent: '#925E07', btnText: '#FFFFFF' },
  { name: '8. Pearl & Bronze (pearl-bronze)', bg: '#FAF7F2', surface: '#FFFFFF', text: '#1B160E', secondary: '#4B3E2D', muted: '#63533D', accent: '#8C5A1E', btnText: '#FFFFFF' },
  { name: '9. Antique Ivory (antique-ivory)', bg: '#FAF6EB', surface: '#FFFFFF', text: '#1A150C', secondary: '#4A3C23', muted: '#625132', accent: '#945F0F', btnText: '#FFFFFF' },
  { name: '10. Cool Platinum (cool-platinum)', bg: '#F6F7F8', surface: '#FFFFFF', text: '#111827', secondary: '#374151', muted: '#4B5563', accent: '#334155', btnText: '#FFFFFF' },
  { name: '11. Baby Pink (baby-pink)', bg: '#FFF5F7', surface: '#FFFFFF', text: '#2A0814', secondary: '#5C2235', muted: '#733348', accent: '#BE185D', btnText: '#FFFFFF' },
];

console.log('========================================================================');
console.log('REAL CONTRAST RATIO AUDIT FOR ALL 11 THEMES (WCAG AA >= 4.5:1)');
console.log('========================================================================\n');

let allPass = true;

themes.forEach(t => {
  const accentOnBg = contrast(t.accent, t.bg);
  const btnContrast = contrast(t.btnText, t.accent);
  const pillText = contrast(t.secondary, t.surface);
  const mutedText = contrast(t.muted, t.bg);

  const p1 = accentOnBg >= 4.5;
  const p2 = btnContrast >= 4.5;
  const p3 = pillText >= 4.5;
  const p4 = mutedText >= 4.5;

  if (!p1 || !p2 || !p3 || !p4) allPass = false;

  console.log(`${t.name}:`);
  console.log(`  - Accent label on page bg (${t.accent} on ${t.bg}): ${accentOnBg.toFixed(2)}:1 [${p1 ? 'PASS' : 'FAIL'}]`);
  console.log(`  - Filled-button text (${t.btnText} on ${t.accent}): ${btnContrast.toFixed(2)}:1 [${p2 ? 'PASS' : 'FAIL'}]`);
  console.log(`  - Pill text (${t.secondary} on ${t.surface}): ${pillText.toFixed(2)}:1 [${p3 ? 'PASS' : 'FAIL'}]`);
  console.log(`  - Muted text (${t.muted} on ${t.bg}): ${mutedText.toFixed(2)}:1 [${p4 ? 'PASS' : 'FAIL'}]`);
  console.log(`  Status: ${p1 && p2 && p3 && p4 ? '✓ ALL 4 PAIRS PASS AA' : '✗ NEEDS ADJUSTMENT'}\n`);
});

console.log('Overall Status:', allPass ? 'ALL 11 THEMES PASS WCAG AA (>= 4.5:1)' : 'FAILURES DETECTED');
