import * as semver from 'semver';

import approvedPackages, { isIgnored } from '../approvedPackages';
import { getPackageName, getPackageVersion } from './packageNameUtils';

export type FailedConstraintsExplanation = {
  approvedPackages: string[];
  failedConstraints: string[];
};

const getFailedPackageVersionConstraints = (
  packageId: string,
  versionConstraintsToSatisfy: string[],
): FailedConstraintsExplanation | null => {
  const packageName = getPackageName(packageId);

  if (isIgnored(packageId)) {
    return null;
  }

  const satisfiedVersionConstraints: { [VersionConstraint: string]: true } = {};
  const approvedPackageIds = approvedPackages.filter(item => item.startsWith(`${packageName}@`));

  approvedPackageIds.map(getPackageVersion).forEach(approvedPackageVersion => {
    versionConstraintsToSatisfy.forEach(versionConstraint => {
      if (semver.satisfies(approvedPackageVersion, versionConstraint)) {
        satisfiedVersionConstraints[versionConstraint] = true;
      }
    });
  });

  const failedVersionConstraints = versionConstraintsToSatisfy.filter(
    constraint => !satisfiedVersionConstraints[constraint],
  );

  const isApproved = failedVersionConstraints.length === 0;

  return isApproved
    ? null
    : {
        failedConstraints: failedVersionConstraints.map(versionConstraint => `${packageName}@${versionConstraint}`),
        approvedPackages: approvedPackageIds,
      };
};

export default getFailedPackageVersionConstraints;
