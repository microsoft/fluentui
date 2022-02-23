const getAffectedPackages = require('./getAffectedPackages');

const FLUENTUI_REACT = '@fluentui/react';
const FLUENTUI_REACT_COMPONENTS = '@fluentui/react-components';
const FLUENTUI_REACT_NORTHSTAR = '@fluentui/react-northstar';
const packages = [FLUENTUI_REACT, FLUENTUI_REACT_COMPONENTS, FLUENTUI_REACT_NORTHSTAR];

const isPackageAffected = packagesToCheck => {
  for (const pkg of packagesToCheck) {
    if (getAffectedPackages().has(pkg)) {
      if (pkg === FLUENTUI_REACT || pkg === FLUENTUI_REACT_COMPONENTS) {
        console.log(`##vso[task.setvariable variable=V8PackageAffected;isOutput=true]true`);
      } else if (pkg === FLUENTUI_REACT_NORTHSTAR) {
        console.log(`##vso[task.setvariable variable=NorthstarPackageAffected;isOutput=true]true`);
      }
    }
  }
};

isPackageAffected(packages);
