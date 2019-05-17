// Dependencies
const mustache = require('mustache');
const argv = require('yargs').argv;
const newPageName = argv.name;
const newPagePath = argv.path;
const cssModule = argv.cssmodule;
const fs = require('fs');

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
const errorPagePathDoesNotExist = "The path you gave doesn't exist. Please pass in a path that exists in the pages directory.";

const errorUnableToOpenTemplate = templateFile => `Unable to open mustache template ${templateFile} for page`;
const errorUnableToWriteFile = step => `Unable to write ${step} file`;

// Success strings
const successPageCreated = 'New page ' + newPageName + ' successfully created. Creating markdown files...';
const successMarkdownCreated = 'Markdown files successfully created.';

function handleError(error, errorPrependMessage) {
  if (error) {
    console.error(errorPrependMessage, error);
    return false;
  } else {
    return true;
  }
}

function createPageFiles(sequence, stepIndex) {
  if (stepIndex >= sequence.length) {
    // Success! The page has been created.
    console.log(successPageCreated);
    fs.mkdirSync(pageDocsPathRoot);
    fs.mkdirSync(pageDocsPath);
    createMarkdownFiles(markdownSequence, 0);
    return;
  }
  const step = sequence[stepIndex];
  const mustacheTemplateName = `Empty${step}.mustache`;

  console.log('Creating ' + outputFiles[step] + '...');

  fs.readFile(templateFolderPath + '/' + mustacheTemplateName, 'utf8', (error, data) => {
    readFileCallback(
      error,
      data,
      outputFiles[step],
      () => createPageFiles(sequence, stepIndex + 1),
      errorUnableToOpenTemplate(mustacheTemplateName),
      errorUnableToWriteFile(step)
    );
  });
}

function createMarkdownFiles(sequence, stepIndex) {
  if (stepIndex >= sequence.length) {
    // Success! Markdown files created.
    console.log(successMarkdownCreated);
    return;
  }
  const step = sequence[stepIndex];
  const mustacheTemplateName = `Empty${step}.mustache`;

  console.log('Creating ' + markdownFiles[step] + '...');

  fs.readFile(templateFolderPath + '/' + mustacheTemplateName, 'utf8', (error, data) => {
    readFileCallback(
      error,
      data,
      markdownFiles[step],
      () => createMarkdownFiles(sequence, stepIndex + 1),
      errorUnableToOpenTemplate(mustacheTemplateName),
      errorUnableToWriteFile(step)
    );
  });
}

function readFileCallback(error, data, filePath, cb, openMustacheTemplateError, createFileError) {
  if (!handleError(error, openMustacheTemplateError)) {
    return;
  }

  const fileData = mustache.render(data, { pageName: newPageName, pagePath: newPagePath });
  fs.writeFile(filePath, fileData, error => {
    writeFileCallback(error, createFileError, cb);
  });
}

function writeFileCallback(error, createFileError, cb) {
  if (!handleError(error, createFileError)) {
    return;
  }

  if (cb) {
    cb();
  }
}

function makePage(error) {
  if (!handleError(error, errorCreatingPageDir)) {
    return;
  }

  if (cssModule) {
    console.log('Creating css module page...');
    createPageFiles(cssModuleSequence, 0);
  } else {
    console.log('Creating css-in-js page... (if you want a css module page, use --cssmodule arg)');
    createPageFiles(cssInJsSequence, 0);
  }
}

if (newPageName && newPagePath) {
  if (fs.existsSync(pagePath)) {
    // Create new folder in packages/src/office-ui-fabric-react
    fs.mkdir(pageFolderPath, makePage);
    console.log("Success! Don't forget to add your page to SiteDefinition.");
  } else {
    console.error(errorPagePathDoesNotExist);
  }
} else {
  if (!newPageName) {
    console.error(errorPageName);
  }
  if (!newPagePath) {
    console.error(errorPagePath);
  }
}
