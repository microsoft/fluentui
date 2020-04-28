import config from '../config';

const { paths } = config;

export const componentInfoFolder = paths.docsSrc('componentInfo');
export const behaviorInfoFile = paths.docsSrc('behaviorInfo.json');
export const componentMenuFile = paths.docsSrc('componentMenu.json');

export const behaviorSrc = `${paths.posix.packageSrc('accessibility')}/behaviors/*/[a-z]*Behavior.ts`;
export const componentsSrcByPackage = {
  'react-northstar': 'components/*/[A-Z]*.tsx',
  'react-bindings': 'FocusZone/[A-Z]!(*.types).tsx',
  'react-component-ref': '[A-Z]*.tsx',
};
