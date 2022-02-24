const getAffectedPackages = require('./getAffectedPackages');

const FLUENTUI_REACT = '@fluentui/react';
const FLUENTUI_REACT_COMPONENTS = '@fluentui/react-components';
const FLUENTUI_REACT_NORTHSTAR = '@fluentui/react-northstar';
const packages = [FLUENTUI_REACT, FLUENTUI_REACT_COMPONENTS, FLUENTUI_REACT_NORTHSTAR];

const isPackageAffected = packagesToCheck => {
  const affectedPackages = getAffectedPackages();

  for (const pkg of packagesToCheck) {
    if (!affectedPackages.has(pkg)) {
      continue;
    }

    if (pkg === FLUENTUI_REACT || pkg === FLUENTUI_REACT_COMPONENTS) {
      // this creates ADO variables which are used within condition checks
      // @see https://docs.microsoft.com/en-us/azure/devops/pipelines/scripts/logging-commands?view=azure-devops&tabs=bash
      console.log(`##vso[task.setvariable variable=V8PackageAffected;isOutput=true]true`);
      continue;
    }

    if (pkg === FLUENTUI_REACT_NORTHSTAR) {
      console.log(`##vso[task.setvariable variable=NorthstarPackageAffected;isOutput=true]true`);
      continue;
    }
  }
};

isPackageAffected(packages);
