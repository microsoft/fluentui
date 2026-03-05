import { formatShortReport, collectShortReportData } from './short-report';
import type { ShortReportData } from './types';

jest.mock('./package-resolver', () => ({
  getGitRoot: jest.fn().mockReturnValue('/mock/root'),
  getSystemInfo: jest.fn().mockReturnValue({
    node: '22.21.1',
    os: 'darwin-arm64',
    nativeTarget: 'aarch64-macos',
    packageManager: 'yarn 1.22.19',
  }),
  getMatchingPackages: jest
    .fn()
    .mockReturnValue(['@fluentui/react-components', '@fluentui/react-icons', '@types/react', 'react', 'typescript']),
  resolvePackageVersions: jest.fn().mockReturnValue([
    { name: '@fluentui/react-components', version: '9.50.0' },
    { name: '@fluentui/react-icons', version: '2.0.200' },
    { name: '@types/react', version: '18.2.45' },
    { name: 'react', version: '18.2.0' },
    { name: 'typescript', version: '5.3.3' },
  ]),
  findDuplicatePackages: jest
    .fn()
    .mockReturnValue([{ name: '@fluentui/react-icons', versions: ['2.0.200', '2.0.195'] }]),
}));

describe('short-report', () => {
  describe('collectShortReportData', () => {
    it('should collect system info, packages, and duplicates', () => {
      const data = collectShortReportData();

      expect(data.system.node).toBe('22.21.1');
      expect(data.system.os).toBe('darwin-arm64');
      expect(data.system.packageManager).toBe('yarn 1.22.19');
      expect(data.packages).toHaveLength(5);
      expect(data.duplicates).toHaveLength(1);
      expect(data.duplicates[0].name).toBe('@fluentui/react-icons');
    });
  });

  describe('formatShortReport', () => {
    it('should produce formatted output matching the SPEC', () => {
      const data: ShortReportData = {
        system: {
          node: '22.21.1',
          os: 'darwin-arm64',
          nativeTarget: 'aarch64-macos',
          packageManager: 'yarn 1.22.19',
        },
        packages: [
          { name: '@fluentui/react-components', version: '9.50.0' },
          { name: '@fluentui/react-icons', version: '2.0.200' },
          { name: 'react', version: '18.2.0' },
          { name: 'typescript', version: '5.3.3' },
        ],
        duplicates: [{ name: '@fluentui/react-icons', versions: ['2.0.195', '2.0.200'] }],
      };

      const output = formatShortReport(data);

      expect(output).toContain('FluentCLI   Report complete');
      expect(output).toContain('Node           : 22.21.1');
      expect(output).toContain('OS             : darwin-arm64');
      expect(output).toContain('Native Target  : aarch64-macos');
      expect(output).toContain('yarn           : 1.22.19');
      expect(output).toContain('@fluentui/react-components');
      expect(output).toContain('9.50.0');
      expect(output).toContain('🚨 Duplicates:');
      expect(output).toContain('@fluentui/react-icons: 2.0.195, 2.0.200');
    });

    it('should omit duplicates section when none found', () => {
      const data: ShortReportData = {
        system: {
          node: '22.0.0',
          os: 'linux-x64',
          nativeTarget: 'x86_64-linux',
          packageManager: 'npm 10.0.0',
        },
        packages: [{ name: 'react', version: '18.2.0' }],
        duplicates: [],
      };

      const output = formatShortReport(data);

      expect(output).not.toContain('Duplicates');
      expect(output).toContain('react');
    });

    it('should omit packages section when none found', () => {
      const data: ShortReportData = {
        system: {
          node: '22.0.0',
          os: 'linux-x64',
          nativeTarget: 'x86_64-linux',
          packageManager: 'npm 10.0.0',
        },
        packages: [],
        duplicates: [],
      };

      const output = formatShortReport(data);

      expect(output).not.toContain('Packages:');
    });
  });
});
