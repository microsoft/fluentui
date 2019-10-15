// @ts-check
// Dependencies
const mustache = require('mustache');
const argv = require('yargs').argv;
const newPageName = argv.name;
const newPagePath = argv.path;
const fse = require('fs-extra');

// Template sequences used to define the order of files created.
const pageSequence = ['Doc', 'Styles', 'Types', 'PageBase', 'Page'];
const markdownSequence = ['Overview', 'Dos', 'Donts', 'BestPractices', 'Usage', 'Design', 'Contact', 'Custom', 'Markdown', 'Related'];

// Paths/File Names
const rootPath = './apps/fabric-website/src/';
const pagePath = rootPath + 'pages/' + newPagePath;
const pageFolderPath = pagePath + '/' + newPageName + 'Page/';
const pageNamePrefix = pageFolderPath + newPageName + 'Page';
const pageDocsPathRoot = pageFolderPath + 'docs/';
const pageDocsPath = pageDocsPathRoot + 'default/';

const templateFolderPath = './scripts/templates/create-page';

// Page file paths
const outputFiles = {
  Doc: pageNamePrefix + '.doc.ts',
  Styles: pageNamePrefix + '.styles.ts',
  Types: pageNamePrefix + '.types.ts',
  Page: pageNamePrefix + '.ts',
  PageBase: pageNamePrefix + '.base.tsx'
};

// Markdown file paths
const markdownFiles = {
  Overview: pageDocsPath + newPageName + 'Overview.md',
  Dos: pageDocsPath + newPageName + 'Dos.md',
  Donts: pageDocsPath + newPageName + 'Donts.md',
  BestPractices: pageDocsPath + newPageName + 'BestPractices.md',
  Usage: pageDocsPath + newPageName + 'Usage.md',
  Design: pageDocsPath + newPageName + 'Design.md',
  Contact: pageDocsPath + newPageName + 'Contact.md',
  Custom: pageDocsPath + newPageName + 'Custom.md',
  Markdown: pageDocsPath + newPageName + 'Markdown.md',
  Related: pageDocsPathRoot + newPageName + 'Related.md'
};

// Error strings
const errorUnableToOpenTemplate = templateFile => `Unable to open mustache template ${templateFile} for page`;
const errorUnableToWriteFile = step => `Unable to write ${step} file`;

function handleError(error, errorPrependMessage) {
  if (error) {
    console.error(errorPrependMessage, error);
    return false;
  } else {
    return true;
  }
}

function createFiles() {
  fse.mkdirsSync(pageDocsPath);

  // Create page files
  pageSequence.forEach(step => {
    const mustacheTemplateName = `Empty${step}.mustache`;

    console.log('Creating ' + outputFiles[step] + '...');

    fse
      .readFile(templateFolderPath + '/' + mustacheTemplateName, 'utf8')
      .then(results => handleWriteFile(results, outputFiles[step], step))
      .catch(error => handleError(error, errorUnableToOpenTemplate(mustacheTemplateName)));
  });

  // Create markdown files
  markdownSequence.forEach(step => {
    const mustacheTemplateName = `Empty${step}.mustache`;

    console.log('Creating ' + markdownFiles[step] + '...');

    fse
      .readFile(templateFolderPath + '/' + mustacheTemplateName, 'utf8')
      .then(results => handleWriteFile(results, markdownFiles[step], step))
      .catch(error => handleError(error, errorUnableToOpenTemplate(mustacheTemplateName)));
  });

  console.log(`'New page '${newPageName}' successfully created in ${newPagePath} directory! Please add your page to the SiteDefinition.'`);
}

function handleWriteFile(buffer, filePath, step) {
  const fileData = mustache.render(buffer, { pageName: newPageName, pagePath: newPagePath });
  return fse.writeFile(filePath, fileData).catch(error => handleError(error, errorUnableToWriteFile(step)));
}

function makePage(error) {
  if (!handleError(error, 'Error creating page directory')) {
    return;
  }

  console.log('Creating page...');
  createFiles();
}

if (newPageName && newPagePath) {
  fse.mkdirs(pageFolderPath, makePage);
}
if (!newPageName) {
  console.error('Please pass in the page name using --name');
}
if (!newPagePath) {
  console.error('Please pass in the page path using --path. ie: Overviews, Controls, Styles, etc');
}
