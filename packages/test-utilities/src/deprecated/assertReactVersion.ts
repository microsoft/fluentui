import * as React from 'react';

/**
 * @throws {Error}
 */
export function assertReactVersion(nonSupportedMajorStart: number) {
  const major = React.version.split('.')[0];

  if (Number(major) >= nonSupportedMajorStart) {
    throw new Error(
      [
        `Detected React version ${React.version}.`,
        `This api is not compatible with React ${nonSupportedMajorStart} or newer. Please migrate to '@testing-library/react'`,
      ].join('\n'),
    );
  }
}
