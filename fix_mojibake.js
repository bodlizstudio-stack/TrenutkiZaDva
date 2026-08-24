const fs = require('fs');
let text = fs.readFileSync('components/home/InteractiveBook.tsx', 'utf8');

text = text.replace(/1â€“9/g, '1–9');
text = text.replace(/10â€“17/g, '10–17');
text = text.replace(/18â€“28/g, '18–28');
text = text.replace(/29â€“34/g, '29–34');
text = text.replace(/35â€“54/g, '35–54');
text = text.replace(/55â€“65/g, '55–65');
text = text.replace(/66â€“72/g, '66–72');
text = text.replace(/73â€“81/g, '73–81');
text = text.replace(/82â€“90/g, '82–90');
text = text.replace(/91â€“100/g, '91–100');

text = text.replace(/<span className="flex items-center">.*? DATUM:/g, '<span className="flex items-center">📅 DATUM:');
text = text.replace(/<span className="flex items-center">.*? LOKACIJA:/g, '<span className="flex items-center">📍 LOKACIJA:');

fs.writeFileSync('components/home/InteractiveBook.tsx', text, 'utf8');
