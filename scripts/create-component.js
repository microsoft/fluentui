// Dependencies
const mustache = require('mustache');
const argv = require('yargs').argv;
const newComponentName = argv.name;
const fs = require('fs');

// Paths/File Names
const componentFolderPath = './packages/office-ui-fabric-react/src/components/' + newComponentName;
const componentPropsFileName = newComponentName + '.Props.ts';
const componentFileName = newComponentName + '.tsx';
const componentFileClassNamesName = newComponentName + '.classNames.ts';
const templateFolderPath = './scripts/templates';

// Error strings
const errorCreatingComponentDir = 'Error creating component directory';
const errorOpenMustacheTemplateForProps = 'Unable to open mustache template for props';
const errorUnableToWritePropsFile = 'Unable to write props file';
const errorUnableToOpenTemplate = 'Unable to open mustache template for component';
const errorUnableToWriteComponentFile = 'Unable to write component file';
const errorUnableToWriteComponentClassFile = 'Unable to write component class name file';
const errorUnableToOpenClassNamesTemplate = 'Unable to open component class files template';
const errorComponentName = 'Please pass in the component name using --name ExcitingNewComponentName';

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

function renderMustache(data) {
  return mustache.render(data, { componentName: newComponentName });
}

function makeComponentDirectory(error) {
  if (!handleError(error, errorCreatingComponentDir)) {
    return;
  }

  fs.readFile(templateFolderPath + '/EmptyProps.mustache', 'utf8', openMustachePropsTemplate);
}

function openMustachePropsTemplate(error, data) {
  if (!handleError(error, errorOpenMustacheTemplateForProps)) {
    return;
  }

  const propsFileData = renderMustache(data);

  // After the we render the template let's try to write the result to the new component file
  fs.writeFile(componentFolderPath + '/' + componentPropsFileName, propsFileData, writePropsFile);
}

function writePropsFile(error) {
  if (!handleError(error, errorUnableToWritePropsFile)) {
    return;
  }

  fs.readFile(templateFolderPath + '/EmptyComponent.mustache', 'utf8', openMustacheComponentTemplate);
}

function openMustacheComponentTemplate(error, data) {
  if (!handleError(error, errorUnableToOpenTemplate)) {
    return;
  }

  const componentFileData = renderMustache(data);
  fs.writeFile(componentFolderPath + '/' + componentFileName, componentFileData, writeComponentFile);
}

function writeComponentFile(error) {
  if (!handleError(error, errorUnableToWriteComponentFile)) {
    return;
  }

  fs.readFile(templateFolderPath + '/EmptyClassNames.mustache', 'utf8', openMustacheClassNamesTemplate);
}

function openMustacheClassNamesTemplate(error, data) {
  if (!handleError(error, errorUnableToWriteComponentClassFile)) {
    return;
  }

  const componentFileData = renderMustache(data);
  fs.writeFile(componentFolderPath + '/' + componentFileClassNamesName, componentFileData, writeClassNamesFile);
}

function writeClassNamesFile(error) {
  if (!handleError(error, errorUnableToWriteComponentClassFile)) {
    return;
  }

  // Success! The component has been created.
  console.log(successComponentCreated);
}

if (newComponentName) {
  // Create new folder in packages/src/office-ui-fabric-react
  fs.mkdir(componentFolderPath, makeComponentDirectory);
} else {
  console.error(errorComponentName);
}