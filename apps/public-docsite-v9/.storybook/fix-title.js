const fs = require('fs');
const path = require('path');

/**
 *
 * @param {string} filePath
 * @param {string} title
 */
function fixTitle(filePath, title) {
  const htmlDocumentPath = path.resolve(__dirname, filePath);
  const htmlDocument = fs.readFileSync(htmlDocumentPath, 'utf-8');
  const updatedHtmlDocument = htmlDocument.replace(/<title>.*<\/title>/, `<title>${title}</title>`);

  fs.writeFileSync(htmlDocumentPath, updatedHtmlDocument);
}

try {
  const args = process.argv.slice(2);
  const [title, distPath] = args;

  const storybookDistPath = `${distPath}/storybook`;
  const indexPath = `${storybookDistPath}/index.html`;
  const iframePath = `${storybookDistPath}/iframe.html`;

  console.log(`Rewriting index.html document title to ${title}.`);
  fixTitle(indexPath, title);

  console.log(`Rewriting iframe.html document title to ${title}.`);
  fixTitle(iframePath, title);

  console.log('Title rewrite complete.');
} catch (error) {
  console.log('Title rewrite failed.');
  console.error(error);
  process.exit(1);
}
