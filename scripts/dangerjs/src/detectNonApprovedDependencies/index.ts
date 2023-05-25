import * as path from 'path';
import {
  getFailedPackageVersionConstraints,
  getVersionConstraints,
  getRuntimeDependencies,
  getPackageName,
  FailedConstraintsExplanation,
} from './utils';
import { DangerJS } from '../types';
import { workspaceRoot } from '../utils';

/**
 * This check uses the following logic:
 * - request runtime dependencies of @fluentui/react-northstar package (by crawling the code, starting from index file),
 * - for each of the runtime dependencies:
 *    - get corresponding set of version restrictions (by analyzing related package.json files),
 *    - get list of approved dependency's versions,
 *    - check if list of approved versions covers the set of version restrictions.
 */
const detectNonApprovedDependencies = async (dangerJS: DangerJS) => {
  const { fail, markdown } = dangerJS;
  const allFailedVersionConstraints: FailedConstraintsExplanation[] = [];

  const dependencyPackageIds = getRuntimeDependencies('react-northstar');
  const versionConstraints = await getVersionConstraints(
    path.resolve(workspaceRoot, 'packages/fluentui/react-northstar/package.json'),
  );

  dependencyPackageIds.forEach(packageId => {
    const failedPackageVersionConstraints = getFailedPackageVersionConstraints(
      packageId,
      versionConstraints[getPackageName(packageId)] || [],
    );

    if (failedPackageVersionConstraints) {
      allFailedVersionConstraints.push(failedPackageVersionConstraints);
    }
  });

  if (allFailedVersionConstraints.length) {
    markdown(
      [
        '## Non-approved dependencies are detected.',
        'The following package version constraints are missing an approved candidate:',
        '',
        'failed constraints | approved candidates',
        '--- | --- ',

        allFailedVersionConstraints
          .map(
            explanation =>
              `${explanation.failedConstraints.join(', ')} | ${
                explanation.approvedPackages.length
                  ? explanation.approvedPackages.join(', ')
                  : '_there are not any approved packages_'
              }`,
          )
          .join('\n'),
      ].join('\n'),
    );

    fail(
      'Non-approved dependencies were detected. It is necessary to obtain approvals and register them in the ' +
        '`approvedPackages` file before merge.',
    );
  }
};

export default detectNonApprovedDependencies;
