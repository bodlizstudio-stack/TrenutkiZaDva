const fs = require('fs');
let content = fs.readFileSync('components/home/InteractiveBook.tsx', 'utf8');

content = content.replace(/"Upava, da se bova spomnila",[\s\S]*?"Da bova skupaj ustvarila.*"/, 
"Upava, da se bova spomnila",\n              "Da se bova še vedno",\n              "In da bo najina ljubezen ostala",\n              "",\n              "Obljubiva si, da si bova vedno vzela čas za:",\n              "Da ne bova nikoli pozabila na:",\n              "Da bova skupaj ustvarila še vsaj ___ novih zmenkov."
);

content = content.replace(/&ldquo;Ko bova.*listala to knjigo\.\.\.&rdquo;/, '&ldquo;Ko bova čez leta listala to knjigo...&rdquo;');

fs.writeFileSync('components/home/InteractiveBook.tsx', content, 'utf8');
