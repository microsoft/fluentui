import * as fs from 'node:fs';
import * as path from 'node:path';
import { execSync } from 'node:child_process';

import {
  isReportablePackage,
  isReportablePackageForLong,
  getSystemInfo,
  getMatchingPackages,
  resolvePackageVersions,
  findDuplicatePackages,
  getGitRoot,
} from './package-resolver';

jest.mock('node:child_process', () => ({
  execSync: jest.fn(),
}));

jest.mock('node:fs', () => ({
  existsSync: jest.fn(),
  readFileSync: jest.fn(),
  readdirSync: jest.fn(),
}));

const mockExecSync = execSync as jest.MockedFunction<typeof execSync>;
const mockExistsSync = fs.existsSync as jest.MockedFunction<typeof fs.existsSync>;
const mockReadFileSync = fs.readFileSync as jest.MockedFunction<typeof fs.readFileSync>;
const mockReaddirSync = fs.readdirSync as jest.MockedFunction<typeof fs.readdirSync>;

describe('package-resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('isReportablePackage', () => {
    it('should match @fluentui scoped packages', () => {
      expect(isReportablePackage('@fluentui/react-components')).toBe(true);
      expect(isReportablePackage('@fluentui/react-icons')).toBe(true);
    });

    it('should match @fluentui-contrib scoped packages', () => {
      expect(isReportablePackage('@fluentui-contrib/shadow-dom')).toBe(true);
    });

    it('should match @griffel scoped packages', () => {
      expect(isReportablePackage('@griffel/react')).toBe(true);
    });

    it('should match @floating-ui scoped packages', () => {
      expect(isReportablePackage('@floating-ui/dom')).toBe(true);
    });

    it('should match exact fluent-related packages', () => {
      expect(isReportablePackage('tabster')).toBe(true);
      expect(isReportablePackage('keyborg')).toBe(true);
    });

    it('should match third-party exact packages', () => {
      expect(isReportablePackage('react')).toBe(true);
      expect(isReportablePackage('@types/react')).toBe(true);
      expect(isReportablePackage('typescript')).toBe(true);
    });

    it('should not match unrelated packages', () => {
      expect(isReportablePackage('lodash')).toBe(false);
      expect(isReportablePackage('@babel/core')).toBe(false);
      expect(isReportablePackage('react-dom')).toBe(false);
    });
  });

  describe('isReportablePackageForLong', () => {
    it('should match @fluentui and @griffel scoped packages', () => {
      expect(isReportablePackageForLong('@fluentui/react-components')).toBe(true);
      expect(isReportablePackageForLong('@fluentui-contrib/shadow-dom')).toBe(true);
      expect(isReportablePackageForLong('@griffel/react')).toBe(true);
    });

    it('should match fluent-related exact packages', () => {
      expect(isReportablePackageForLong('tabster')).toBe(true);
      expect(isReportablePackageForLong('keyborg')).toBe(true);
    });

    it('should NOT match react, @types/react, typescript', () => {
      expect(isReportablePackageForLong('react')).toBe(false);
      expect(isReportablePackageForLong('@types/react')).toBe(false);
      expect(isReportablePackageForLong('typescript')).toBe(false);
    });

    it('should NOT match @floating-ui packages', () => {
      expect(isReportablePackageForLong('@floating-ui/dom')).toBe(false);
    });

    it('should NOT match unrelated packages', () => {
      expect(isReportablePackageForLong('lodash')).toBe(false);
    });
  });

  describe('getSystemInfo', () => {
    it('should return system info with detected package manager', () => {
      mockExistsSync.mockImplementation((p: fs.PathLike) => {
        return String(p).endsWith('yarn.lock');
      });
      mockExecSync.mockReturnValue('1.22.19\n' as any);

      const info = getSystemInfo('/mock/root');

      expect(info.node).toBe(process.version.replace(/^v/, ''));
      expect(info.os).toBe(`${process.platform}-${process.arch}`);
      expect(info.packageManager).toBe('yarn 1.22.19');
    });

    it('should detect npm when package-lock.json exists', () => {
      mockExistsSync.mockImplementation((p: fs.PathLike) => {
        return String(p).endsWith('package-lock.json');
      });
      mockExecSync.mockReturnValue('10.0.0\n' as any);

      const info = getSystemInfo('/mock/root');

      expect(info.packageManager).toBe('npm 10.0.0');
    });

    it('should return "unknown" when no lock file found', () => {
      mockExistsSync.mockReturnValue(false);

      const info = getSystemInfo('/mock/root');

      expect(info.packageManager).toBe('unknown');
    });
  });

  describe('getMatchingPackages', () => {
    it('should return matching packages from package.json', () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(
        JSON.stringify({
          dependencies: {
            '@fluentui/react-components': '^9.50.0',
            react: '^18.2.0',
            lodash: '^4.0.0',
          },
          devDependencies: {
            typescript: '^5.3.0',
            '@babel/core': '^7.0.0',
          },
        }),
      );

      const packages = getMatchingPackages('/mock/root');

      expect(packages).toContain('@fluentui/react-components');
      expect(packages).toContain('react');
      expect(packages).toContain('typescript');
      expect(packages).not.toContain('lodash');
      expect(packages).not.toContain('@babel/core');
    });

    it('should return empty array when package.json not found', () => {
      mockExistsSync.mockReturnValue(false);

      const packages = getMatchingPackages('/mock/root');

      expect(packages).toEqual([]);
    });
  });

  describe('resolvePackageVersions', () => {
    it('should resolve installed versions from node_modules', () => {
      mockReadFileSync.mockImplementation((p: any) => {
        const filePath = String(p);
        if (filePath.includes('@fluentui/react-components')) {
          return JSON.stringify({ version: '9.50.0' });
        }
        if (filePath.includes('react') && !filePath.includes('@')) {
          return JSON.stringify({ version: '18.2.0' });
        }
        throw new Error('not found');
      });

      const packages = resolvePackageVersions(['@fluentui/react-components', 'react', 'nonexistent'], '/mock/root');

      expect(packages).toEqual([
        { name: '@fluentui/react-components', version: '9.50.0' },
        { name: 'react', version: '18.2.0' },
      ]);
    });
  });

  describe('findDuplicatePackages', () => {
    it('should detect duplicate packages with different versions', () => {
      // Top-level version
      mockReadFileSync.mockImplementation((p: any) => {
        const filePath = String(p);
        if (filePath === path.join('/mock/root', 'node_modules', '@fluentui/react-icons', 'package.json')) {
          return JSON.stringify({ version: '2.0.200' });
        }
        // Nested version under some-package
        if (filePath.includes('some-package') && filePath.includes('@fluentui/react-icons')) {
          return JSON.stringify({ version: '2.0.195' });
        }
        throw new Error('not found');
      });

      mockExistsSync.mockImplementation((p: fs.PathLike) => {
        const filePath = String(p);
        return filePath.includes('node_modules');
      });

      mockReaddirSync.mockImplementation((p: any) => {
        const dirPath = String(p);
        if (dirPath === path.join('/mock/root', 'node_modules')) {
          return ['some-package', '@fluentui'] as any;
        }
        if (dirPath.endsWith('@fluentui')) {
          return ['react-icons'] as any;
        }
        return [] as any;
      });

      const duplicates = findDuplicatePackages(['@fluentui/react-icons'], '/mock/root');

      expect(duplicates).toHaveLength(1);
      expect(duplicates[0].name).toBe('@fluentui/react-icons');
      expect(duplicates[0].versions).toHaveLength(2);
    });

    it('should return empty array when no duplicates', () => {
      mockReadFileSync.mockImplementation((p: any) => {
        const filePath = String(p);
        if (filePath === path.join('/mock/root', 'node_modules', 'react', 'package.json')) {
          return JSON.stringify({ version: '18.2.0' });
        }
        throw new Error('not found');
      });

      mockExistsSync.mockImplementation((p: fs.PathLike) => {
        const filePath = String(p);
        if (filePath === path.join('/mock/root', 'node_modules')) {
          return true;
        }
        return false;
      });

      mockReaddirSync.mockReturnValue([] as any);

      const duplicates = findDuplicatePackages(['react'], '/mock/root');

      expect(duplicates).toEqual([]);
    });
  });

  describe('getGitRoot', () => {
    it('should return trimmed git root path', () => {
      mockExecSync.mockReturnValue('/Users/test/project\n' as any);

      const root = getGitRoot();

      expect(root).toBe('/Users/test/project');
    });
  });
});
