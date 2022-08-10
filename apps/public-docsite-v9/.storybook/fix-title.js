const fs = require('fs');
const path = require('path');

try {
  const args = process.argv.slice(2);
  const [title, distPath] = args;

  console.log(`Rewriting index.html document title to ${title}.`);

  const filePath = `${distPath}/storybook/index.html`;
  const document = fs.readFileSync(path.resolve(__dirname, filePath), 'utf8');
  const output = document.replace(/<title>.*<\/title>/, `<title>${title}</title>`);

  fs.writeFileSync(path.resolve(__dirname, filePath), output);
  console.log('Title rewrite complete.');
} catch (error) {
  console.log('Title rewrite failed.');
  console.error(error);
  process.exit(1);
}
