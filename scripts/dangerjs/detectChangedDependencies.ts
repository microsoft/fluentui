import * as _ from 'lodash';
import { DangerJS } from './types';

const checkDependencyChanges = async dangerJS => {
  const { danger } = dangerJS;
  const modifiedFiles = danger.git.modified_files;

  return modifiedFiles
    .filter(filepath => filepath.match(/\bpackage\.json$/))
    .reduce(async (hasWarning, filepath) => {
      const changedDependencies = await getChangedDependencies(dangerJS, filepath);
      const changedPeerDependencies = await getChangedDependencies(dangerJS, filepath, 'peerDependencies');

      let shouldLogWarning = hasWarning;
      if (!_.isEmpty(changedDependencies)) {
        markdownChangedDependencies(dangerJS, filepath, changedDependencies);
        shouldLogWarning = true;
      }
      if (!_.isEmpty(changedPeerDependencies)) {
        markdownChangedDependencies(dangerJS, filepath, changedPeerDependencies, 'peerDependencies');
        shouldLogWarning = true;
      }
      return shouldLogWarning;
    }, false);
};

const getChangedDependencies = async (dangerJS: DangerJS, filepath, dependenciesKey = 'dependencies') => {
  const { danger } = dangerJS;
  let diff = {};
  try {
    diff = await danger.git.JSONDiffForFile(filepath);
  } catch (err) {
    // JSONDiffForFile() throws if file diff is empty (moved file with no changes)
    dangerJS.warn(`Cannot get diff for ${filepath} when checking ${dependenciesKey}: ${err}`);
  }
  if (!diff[dependenciesKey]) {
    return {};
  }

  const before = { ...diff[dependenciesKey].before, ..._.zipObject(diff[dependenciesKey].added) };
  const after = diff[dependenciesKey].after || {};
  return _.reduce(
    before,
    (result, value, key) => {
      return value === after[key] || !after[key] ? result : { ...result, [key]: { before: value, after: after[key] } };
    },
    {}
  );
};

const markdownChangedDependencies = (dangerJS: DangerJS, filepath, changedDependencies, dependenciesKey = 'dependencies') => {
  const { markdown } = dangerJS;

  markdown(
    [
      '## Changed dependencies are detected.',
      `Changed ${dependenciesKey} in \`${filepath}\``,
      '',
      'package | before | after',
      '--- | --- | ---',
      ..._.map(changedDependencies, (value, key) => `${key} | ${value['before'] || '-'} | ${value['after']}`)
    ].join('\n')
  );
};

export default async (dangerJS: DangerJS) => {
  const { danger, warn } = dangerJS;

  danger.git.created_files
    .filter(filepath => filepath.match(/\bpackage\.json$/))
    .forEach(filepath => {
      warn(`New package.json added: ${filepath}. Make sure you have approval before merging!`);
    });

  const dependenciesChanged = await checkDependencyChanges(dangerJS);
  if (dependenciesChanged) {
    warn('Package (or peer) dependencies changed. Make sure you have approval before merging!');
  }
};
