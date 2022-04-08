import { stripIndents } from '@nrwl/devkit';
import { getOwnerships } from '.';
import * as fs from 'fs';

const mockedFs = jest.spyOn(fs, 'readFileSync');

describe('getPackageTeamOwners', () => {
  it('returns a map with the owners and packages owned', () => {
    mockedFs.mockReturnValueOnce(stripIndents`
    packages/react @microsoft/cxe-red

    packages/react-card @microsoft/cxe-prg
    `);

    const result = getOwnerships();

    expect(result).toStrictEqual([
      {
        packageName: 'packages/react',
        owners: ['@microsoft/cxe-red'],
      },
      {
        packageName: 'packages/react-card',
        owners: ['@microsoft/cxe-prg'],
      },
    ]);
  });

  // it('should not list individual owners', () => {
  //   fs.readFileSync.mockReturnValueOnce(stripIndents`
  //   packages/react-card salvador-sobral
  //   `);

  //   const result = getPackageOwners();
  //   console.log(result);

  //   expect(result.size).toBe(0);
  // });

  // it('should not return non converged packages', () => {
  //   fs.readFileSync.mockReturnValueOnce(stripIndents`
  //   packages/react @microsoft/cxe-red
  //   `);

  //   const result = getPackageOwners();

  //   expect(result.size).toBe(0);
  // });
});
