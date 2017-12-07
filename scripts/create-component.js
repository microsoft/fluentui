// Dependencies
const mustache = require('mustache');
const argv = require('yargs').argv;
const newComponentName = argv.name;
const fs = require('fs');

// Paths/File Names
const rootComponentFolderPath = './packages/experiments/src';
const componentFolderPath = rootComponentFolderPath + '/components/' + newComponentName;
const componentPropsFileName = newComponentName + '.types.ts';
const componentFileName = newComponentName + '.tsx';
const componentFileClassNamesName = newComponentName + '.styles.ts';
const globalIndexFileName = newComponentName + '.ts';
const templateFolderPath = './scripts/templates';
const indexFileName = 'index.ts';

// Error strings
const errorCreatingComponentDir = 'Error creating component directory';
const errorOpenMustacheTemplateForProps = 'Unable to open mustache template for props';
const errorUnableToWritePropsFile = 'Unable to write props file';
const errorUnableToOpenTemplate = 'Unable to open mustache template for component';
const errorUnableToWriteComponentFile = 'Unable to write component file';
const errorUnableToWriteComponentClassFile = 'Unable to write component class name file';
const errorUnableToOpenClassNamesTemplate = 'Unable to open component class files template';
const errorComponentName = 'Please pass in the component name using --name ExcitingNewComponentName';
const errorUnableToWriteComponentIndexFile = 'Unable to write component class index file';
const errorUnableToOpenIndexTemplate = "Unable to open the component index template"

//Success strings
const successComponentCreated = 'New component ' + newComponentName + ' succesfully created';

function handleError(error, errorPrependMessage) {
  if (error) {
    console.error(errorPrependMessage, error);
    return false;
  } else {
    return true;
  }
}

function createComponentFiles(mustacheTemplateName, fileName, createFileError, openMustacheTemplateError, cb, customPath) {
  fs.readFile(templateFolderPath + '/' + mustacheTemplateName, 'utf8', (error, data) => {
    readFileCallback(error, data, fileName, cb, openMustacheTemplateError, createFileError, customPath);
  });
}

function readFileCallback(error, data, fileName, cb, openMustacheTemplateError, createFileError, customPath) {
  if (!handleError(error, openMustacheTemplateError)) {
    return;
  }
  let path = componentFolderPath + '/' + fileName;
  if (customPath) {
    path = customPath + '/' + fileName;
  }

  const fileData = mustache.render(data, { componentName: newComponentName });
  fs.writeFile(path, fileData, (error) => { writeFileCallback(error, createFileError, cb); });
}

function writeFileCallback(error, createFileError, cb) {
  if (!handleError(error, createFileError)) {
    return;
  }

  if (cb) {
    cb();
  }
}

function makeComponentDirectory(error) {
  if (!handleError(error, errorCreatingComponentDir)) {
    return;
  }
  createPropsFile();
}

function createPropsFile() {
  // Create props file
  createComponentFiles(
    'EmptyProps.mustache',
    componentPropsFileName,
    errorUnableToWritePropsFile,
    errorOpenMustacheTemplateForProps,
    createComponentFile // Create component file
  );
}

function createComponentFile() {
  // Create component file
  createComponentFiles(
    'EmptyComponent.mustache',
    componentFileName,
    errorUnableToWriteComponentFile,
    errorUnableToOpenTemplate,
    createClassNamesFile // Create class names file
  );
}

function createClassNamesFile() {
  // Create class names file
  createComponentFiles(
    'EmptyClassNames.mustache',
    componentFileClassNamesName,
    errorUnableToWriteComponentClassFile,
    errorUnableToOpenClassNamesTemplate,
    createLocalIndexFile // Create local index file
  );
}

function createLocalIndexFile() {
  // Create local index import file
  createComponentFiles(
    'EmptyComponentIndex.mustache',
    indexFileName,
    errorUnableToWriteComponentIndexFile,
    errorUnableToOpenIndexTemplate,
    createGlobalIndexFile // Create global index file
  );
}

function createGlobalIndexFile() {
  // Create global index import file
  createComponentFiles(
    'EmptyGlobalComponentIndex.mustache',
    globalIndexFileName,
    errorUnableToWriteComponentIndexFile,
    errorUnableToOpenIndexTemplate,
    null,
    rootComponentFolderPath
  );

  // Success! The component has been created.
  console.log(successComponentCreated);
}

if (newComponentName) {
  // Create new folder in packages/src/office-ui-fabric-react
  fs.mkdir(componentFolderPath, makeComponentDirectory);
} else {
  console.error(errorComponentName);
}