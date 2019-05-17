// Dependencies
const mustache = require('mustache');
const argv = require('yargs').argv;
const newPageName = argv.name;
const newPagePath = argv.path;
const cssModule = argv.cssmodule;
const fse = require('fs-extra');

// Template Sequences
const cssInJsSequence = ['Doc', 'Styles', 'Types', 'PageBase', 'Page'];
const cssModuleSequence = ['Doc', 'Module', 'PageModule'];
const markdownSequence = ['Overview', 'Dos', 'Donts', 'BestPractices', 'Usage', 'Design', 'Contact', 'Custom', 'Markdown', 'Related'];

// Paths/File Names
const rootPath = './apps/fabric-website/src/';
const pagePath = rootPath + 'pages/' + newPagePath;
const pageFolderPath = pagePath + '/' + newPageName + 'Page/';
const pageNamePrefix = pageFolderPath + newPageName + 'Page';
const pageDocsPathRoot = pageFolderPath + 'docs/';
const pageDocsPath = pageDocsPathRoot + 'default/';

let templateFolderPath = './scripts/templates/create-page';

const outputFiles = {
  Page: pageNamePrefix + '.ts',
  PageBase: pageNamePrefix + '.base.tsx',
  PageModule: pageNamePrefix + '.tsx',
  Styles: pageNamePrefix + '.styles.ts',
  Module: pageNamePrefix + '.module.scss',
  Doc: pageNamePrefix + '.doc.ts',
  Types: pageNamePrefix + '.types.ts'
};

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
const errorCreatingPageDir = 'Error creating page directory';
const errorPageName = 'Please pass in the page name using --name';
const errorPagePath = 'Please pass in the page path using --path. ie: Overviews, Controls, Styles, etc';

const errorUnableToOpenTemplate = templateFile => `Unable to open mustache template ${templateFile} for page`;
const errorUnableToWriteFile = step => `Unable to write ${step} file`;

// Success strings
const successPageCreated = 'New page ' + newPageName + ' successfully created! Please add your page to the SiteDefinition.';

function handleError(error, errorPrependMessage) {
  if (error) {
    console.error(errorPrependMessage, error);
    return false;
  } else {
    return true;
  }
}

function createFiles(sequence) {
  fse.mkdirsSync(pageDocsPath);

  // Create page files
  sequence.forEach(step => {
    const mustacheTemplateName = `Empty${step}.mustache`;

    console.log('Creating ' + outputFiles[step] + '...');

    fse
      .readFile(templateFolderPath + '/' + mustacheTemplateName, 'utf8')
      .then(results => {
        handleWriteFile(results, outputFiles[step], step);
      })
      .catch(error => handleError(error, errorUnableToOpenTemplate(mustacheTemplateName)));
  });

  // Create markdown files
  markdownSequence.forEach(step => {
    const mustacheTemplateName = `Empty${step}.mustache`;

    console.log('Creating ' + markdownFiles[step] + '...');

    fse
      .readFile(templateFolderPath + '/' + mustacheTemplateName, 'utf8')
      .then(results => {
        handleWriteFile(results, markdownFiles[step], step);
      })
      .catch(error => handleError(error, errorUnableToOpenTemplate(mustacheTemplateName)));
  });

  console.log(successPageCreated);
}

function handleWriteFile(buffer, filePath, step) {
  const fileData = mustache.render(buffer, { pageName: newPageName, pagePath: newPagePath });
  fse.writeFile(filePath, fileData).catch(error => handleError(error, errorUnableToWriteFile(step)));
}

function makePage(error) {
  if (!handleError(error, errorCreatingPageDir)) {
    return;
  }

  if (cssModule) {
    console.log('Creating css module page...');
    createFiles(cssModuleSequence);
  } else {
    console.log('Creating css-in-js page... (if you want a css module page, use --cssmodule arg)');
    createFiles(cssInJsSequence);
  }
}

if (newPageName && newPagePath) {
  fse.mkdirs(pageFolderPath, makePage);
} else {
  if (!newPageName) {
    console.error(errorPageName);
  }
  if (!newPagePath) {
    console.error(errorPagePath);
  }
}
