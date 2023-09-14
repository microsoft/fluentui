import { getMajorVersion } from './utils';
describe('getMajorVersion', () => {
  it.each([
    ['9.0.0', 9],
    ['9.0.0-rc.1', 9],
    ['9.0.0-rc.1+buildNumber', 9],
  ])('should get major version number from %s', (version, majorVersion) => {
    expect(getMajorVersion(version)).toBe(majorVersion);
  });
});
