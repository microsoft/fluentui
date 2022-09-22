export const componentLibaries = [
  { name: 'Fluent UI v0', prefix: 'FluentV0', moduleName: '@fluentui/react-northstar' },
  { name: 'Fluent UI v9', prefix: 'FluentV9', moduleName: '@fluentui/react-components' },
];

export const DEFAULT_LIBRARY = componentLibaries[0];

export const componentLibariesByModuleName = {};
export const componentLibariesByPrefix = {};

componentLibaries.forEach(cl => {
  componentLibariesByModuleName[cl.moduleName] = cl;
  componentLibariesByPrefix[cl.prefix] = cl;
  return true;
});
