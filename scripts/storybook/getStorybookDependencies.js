const path = require('path');
const fs = require('fs');

/**
 * Currently storybook addon in the repo cannot be used without build.
 * This function returns the implicity dependnecies that need to be built before
 * storybook can be run.
 * @returns Storybook dependencies that need to be built manually
 */
module.exports = () => {
  const implicitDependencies = [
    {
      name: '@fluentui/react-storybook-addon',
      description: 'fluentui storybook addon that adds functionality to storybook',
    },
  ];

  /**
   * Any extra dependencies
   * @type {typeof implicitDependencies}
   */
  const dependencies = [];

  /**
   * @type {{name:string;devDependencies: Record<string,string>,[key:string]:unknown}}
   */
  const projectPackageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));

  const dependenciesToBuild = [
    ...dependencies.filter(dep => {
      return projectPackageJson.devDependencies[dep.name];
    }),
    ...implicitDependencies,
  ];

  return dependenciesToBuild;
};
