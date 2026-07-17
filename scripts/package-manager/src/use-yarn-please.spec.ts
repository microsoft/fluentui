import { isSupportedYarnVersion } from './use-yarn-please';

describe('isSupportedYarnVersion', () => {
  it('rejects Yarn Classic', () => {
    expect(isSupportedYarnVersion('1.22.22')).toBe(false);
  });

  it('accepts Yarn Modern', () => {
    expect(isSupportedYarnVersion('4.12.0')).toBe(true);
  });
});
