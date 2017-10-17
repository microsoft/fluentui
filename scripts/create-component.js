const mustache = require('mustache');
const argv = require('yargs').argv;
const newComponentName = argv.name;
const fs = require('fs');
const folderCreationError = "Folder creation error";
const componentFolderPath = 'packages/src/office-ui-fabric-react/' + newComponentName;
const componentPropsFileName = newComponentName + '.Props.ts';
const componentFileName = newComponentName + '.tsx';
const templateFolderPath = 'templates';

function handleError(error, errorPrependMessage) {
  if (error) {
    console.error(errorPrepend, errorPrependMessage);
    return false;
  } else {
    return true;
  }
}

function folderExists(error, stats) {
  if (!handleError(error, folderCreationError)) {
    return;
  }

  if (stats.isDirectory()) {
    console.error('Component directory for ' + newComponentName + ' already exsits');
  } else {
    fs.mkdir(componentFolderPath, makeComponentDirectory);
  }
}

function makeComponentDirectory(error) {
  if (!handleError(error, folderCreationError)) {
    return;
  }

  fs.readFile(templateFolderPath + '/EmptyProps.mustache', 'utf8', openMustachePropsTemplate);
}

function openMustachePropsTemplate(error, data) {
  if (!handleError(error, 'Unable to open mustache template for props')) {
    return;
  }

  const propsFileData = Mustache.render(data, { componentName: newComponentName });

  // After the we render the template let's try to write the result to the new component file
  fs.writeFile(componentFolderPath + '/' + componentPropsFileName, propsFileData, writePropsFile);
}

function writePropsFile(error) {
  if (!handleError(error, 'Unable to write props file')) {
    return;
  }

  fs.readFile(templateFolderPath + '/EmptyComponent.mustache', 'utf8', openMustacheComponentTemplate);
}

function openMustacheComponentTemplate(error, data) {
  if (!handleError(error, 'Unable to open mustache template for component')) {
    return;
  }

  const componentFileData = Mustache.render(data, { componentName });
  fs.writeFile(componentFolderPath + '/' + componentFileName, componentFileData, writeComponentFile);
}

function writeComponentFile(error) {
  if (!handleError(error, 'Unable to write component file')) {
    return;
  }

  // Success! The component has been created.
  console.log('New component ' + newComponentName + ' succesfully created');
}

if (newComponentName) {
  // Create new folder in packages/src/office-ui-fabric-react
  fs.stat(componentFolderPath, folderExists);
} else {
  console.error('Please pass in the component name using --name ExcitingNewComponentName');
}