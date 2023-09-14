/**
 * @param version - semver version string
 * @returns The major version number
 */
export function getMajorVersion(version: string) {
  return Number(version.split('.')[0]);
}
