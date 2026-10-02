function luminance(r, g, b) {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function hexToRgb(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
  const num = parseInt(hex, 16);
  return [num >> 16, (num >> 8) & 255, num & 255];
}

function contrast(hex1, hex2) {
  const l1 = luminance(...hexToRgb(hex1));
  const l2 = luminance(...hexToRgb(hex2));
  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);
  return (brightest + 0.05) / (darkest + 0.05);
}

const themes = {
  'Dark Burgundy': {
    bg: '#08070A',
    surface: '#18151E',
    accent: '#E2C074',
    btnText: '#08070A',
    btnBg: '#E2C074',
    pillText: '#C8C0CC',
    muted: '#A297A6',
  },
  'Dark Navy': {
    bg: '#060A12',
    surface: '#101B2E',
    accent: '#4EA8DE',
    btnText: '#060A12',
    btnBg: '#4EA8DE',
    pillText: '#B3C5DC',
    muted: '#8FA7C7',
  },
  'Dark Charcoal': {
    bg: '#090A0D',
    surface: '#171A22',
    accent: '#FB923C',
    btnText: '#090A0D',
    btnBg: '#FB923C',
    pillText: '#BAC1CC',
    muted: '#969EAD',
  },
  'Dark Grey': {
    bg: '#0B0B0C',
    surface: '#1B1B1E',
    accent: '#D4A373',
    btnText: '#0B0B0C',
    btnBg: '#D4A373',
    pillText: '#BCBCBF',
    muted: '#98989E',
  },
  'Dark Silver': {
    bg: '#090A0C',
    surface: '#181D24',
    accent: '#EAB308',
    btnText: '#090A0C',
    btnBg: '#EAB308',
    pillText: '#CBD5E1',
    muted: '#97A3B5',
  },
  'Light Warm Sand': {
    bg: '#FAF7F0',
    surface: '#FFFFFF',
    accent: '#9E670B',
    btnText: '#FFFFFF',
    btnBg: '#9E670B',
    pillText: '#4C4332',
    muted: '#615641',
  },
  'Light Analyst Slate': {
    bg: '#F8FAFC',
    surface: '#FFFFFF',
    accent: '#1D4ED8',
    btnText: '#FFFFFF',
    btnBg: '#1D4ED8',
    pillText: '#334155',
    muted: '#475569',
  },
  'Light Pearl Bronze': {
    bg: '#FAF7F2',
    surface: '#FFFFFF',
    accent: '#8C5A1E',
    btnText: '#FFFFFF',
    btnBg: '#8C5A1E',
    pillText: '#4B3E2D',
    muted: '#63533D',
  },
  'Light Antique Ivory': {
    bg: '#FAF6EB',
    surface: '#FFFFFF',
    accent: '#945F0F',
    btnText: '#FFFFFF',
    btnBg: '#945F0F',
    pillText: '#4A3C23',
    muted: '#625132',
  },
  'Light Cool Platinum': {
    bg: '#F6F7F8',
    surface: '#FFFFFF',
    accent: '#334155',
    btnText: '#FFFFFF',
    btnBg: '#334155',
    pillText: '#374151',
    muted: '#4B5563',
  },
  'Light Baby Pink': {
    bg: '#FCF4F6',
    surface: '#FFFFFF',
    accent: '#B83260',
    btnText: '#FFFFFF',
    btnBg: '#B83260',
    pillText: '#57253B',
    muted: '#6E344E',
  },
};

console.log('RESULTS:');
for (const [theme, c] of Object.entries(themes)) {
  const accentOnBg = contrast(c.accent, c.bg);
  const btnContrast = contrast(c.btnText, c.btnBg);
  const pillOnBg = contrast(c.pillText, c.bg);
  const pillOnSurface = contrast(c.pillText, c.surface);
  const mutedOnBg = contrast(c.muted, c.bg);
  const mutedOnSurface = contrast(c.muted, c.surface);
  console.log(`- ${theme}:`);
  console.log(`  Accent on BG (${c.accent} on ${c.bg}): ${accentOnBg.toFixed(2)}:1 ${accentOnBg >= 4.5 ? 'PASS' : 'FAIL'}`);
  console.log(`  Filled Btn (${c.btnText} on ${c.btnBg}): ${btnContrast.toFixed(2)}:1 ${btnContrast >= 4.5 ? 'PASS' : 'FAIL'}`);
  console.log(`  Pill Text on BG (${c.pillText} on ${c.bg}): ${pillOnBg.toFixed(2)}:1 ${pillOnBg >= 4.5 ? 'PASS' : 'FAIL'}`);
  console.log(`  Pill Text on Surface (${c.pillText} on ${c.surface}): ${pillOnSurface.toFixed(2)}:1 ${pillOnSurface >= 4.5 ? 'PASS' : 'FAIL'}`);
  console.log(`  Muted Text on BG (${c.muted} on ${c.bg}): ${mutedOnBg.toFixed(2)}:1 ${mutedOnBg >= 4.5 ? 'PASS' : 'FAIL'}`);
  console.log(`  Muted Text on Surface (${c.muted} on ${c.surface}): ${mutedOnSurface.toFixed(2)}:1 ${mutedOnSurface >= 4.5 ? 'PASS' : 'FAIL'}`);
}
