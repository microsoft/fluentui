// @ts-check

const { spawnSync } = require('child_process');
const prompts = require('prompts');
const getAllPackageInfo = require('./monorepo/getAllPackageInfo');
const allPackages = getAllPackageInfo();
const extraArgs = process.argv.slice(2);

const defaults = ['@fluentui/react', '@fluentui/docs', '@fluentui/react-components'];

const projectsWithStartCommand = Object.entries(allPackages)
  .reduce((acc, [pkg, info]) => {
    if (info.packageJson.scripts && info.packageJson.scripts.start) {
      acc.push({ title: pkg, value: { pkg, command: 'start' } });
    }

    if (info.packageJson.scripts && info.packageJson.scripts['start:profile']) {
      acc.push({ title: `${pkg} (profile)`, value: { pkg, command: 'start:profile' } });
    }

    return acc;
  }, [])
  .filter(n => n && !defaults.includes(n.title))
  .sort((a, b) => (a.title === b.title ? 0 : a.title > b.title ? 1 : -1));

const suggest = (input, choices) => Promise.resolve(choices.filter(i => i.title.includes(input)));

const getArgs = (args = [], hasPackage = false) => {
  let finalArgs = args;

  if (hasPackage) {
    finalArgs = args.slice(1);
  }

  return finalArgs.length > 0 ? finalArgs : [];
};
const getProject = async (choices = []) => {
  const firstArg = extraArgs[0];
  const firstArgChoice = choices.find(({ value: { pkg } }) => pkg === firstArg);
  const finalArgs = getArgs(extraArgs, !!firstArgChoice);

  if (firstArgChoice) {
    return [firstArgChoice.value, finalArgs];
  }

  const answer = await prompts({
    type: 'autocomplete',
    name: 'project',

    message: 'Which project to start (select or type partial name)?',
    suggest,
    choices,
  });

  return [answer.project, finalArgs];
};

(async () => {
  const choices = [
    ...defaults.map(p => ({ title: p, value: { pkg: p, command: 'start' } })),
    ...projectsWithStartCommand,
  ];
  const [{ pkg, command }, args] = await getProject(choices);

  spawnSync('yarn', ['workspace', pkg, command, ...args], {
    shell: true,
    stdio: 'inherit',
  });
})();
