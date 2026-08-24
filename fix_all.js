const fs = require('fs');
const path = require('path');

const replacements = {
  'č': 'č',
  'š': 'š',
  'ž': 'ž',
  'Č': 'Č',
  'Š': 'Š',
  'Ž': 'Ž',
  '–': '–',
  '—': '—',
  '€': '€',
  '”': '”',
  '“': '“',
  '📅': '📅',
  '📍': '📍'
};

const map = new Map();
for (const [realChar, _] of Object.entries(replacements)) {
  const mojibake = Buffer.from(realChar, 'utf8').toString('latin1');
  map.set(mojibake, realChar);
}
// Add explicit ones that might be double mangled or different
map.set('â€“', '–');
map.set('â‚¬', '€');
map.set('â€"', '”');
map.set('â€œ', '“');
map.set('Ä\x8D', 'č');
map.set('ÄŒ', 'Č');
map.set('Å¡', 'š');
map.set('Å ', 'Š');
map.set('Å¾', 'ž');
map.set('Å½', 'Ž');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const [bad, good] of map.entries()) {
        if (content.includes(bad)) {
          content = content.split(bad).join(good);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Fixed:', fullPath);
      }
    }
  }
}

processDir('./components');
processDir('./app');
