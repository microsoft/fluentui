export const V0 = { name: 'Fluent UI v0', prefix: 'FluentV0', moduleName: '@fluentui/react-northstar' };
export const V9 = { name: 'Fluent UI v9', prefix: 'FluentV9', moduleName: '@fluentui/react-components' };

export const DEFAULT_LIBRARY = V0;
export const componentLibaries = [V0, V9];

export const componentLibariesByModuleName = {};
export const componentLibariesByPrefix = {};

componentLibaries.forEach(cl => {
  componentLibariesByModuleName[cl.moduleName] = cl;
  componentLibariesByPrefix[cl.prefix] = cl;
  return true;
});
