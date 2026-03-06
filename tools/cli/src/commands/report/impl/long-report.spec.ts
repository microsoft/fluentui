import { collectLongReportData } from './long-report';
import type {
  AstParser,
  ImportInfo,
  JsxUsageInfo,
  CallUsageInfo,
  SymbolClassification,
  TypeRefUsageInfo,
} from './types';

jest.mock('./package-resolver', () => ({
  getGitRoot: jest.fn().mockReturnValue('/mock/root'),
  isReportablePackageForLong: jest.requireActual('./package-resolver').isReportablePackageForLong,
}));

jest.mock('./file-discovery', () => ({
  discoverSourceFiles: jest.fn().mockReturnValue(['/mock/root/src/App.tsx', '/mock/root/src/types.ts']),
  filterSourceFiles: jest.fn().mockImplementation((files: string[]) => files),
}));

jest.mock('node:fs', () => ({
  ...jest.requireActual('node:fs'),
  existsSync: jest.fn().mockReturnValue(false),
}));

function createMockParser(
  imports: Record<string, ImportInfo[]>,
  jsxUsages: Record<string, JsxUsageInfo[]>,
  callUsages: Record<string, CallUsageInfo[]>,
  classifications?: Record<string, SymbolClassification>,
  typeRefUsages?: Record<string, TypeRefUsageInfo[]>,
  valueRefUsages?: Record<string, Array<{ symbolName: string; moduleSpecifier: string }>>,
): AstParser {
  return {
    createProject: jest.fn(),
    getSourceFiles: jest.fn().mockReturnValue(Object.keys(imports)),
    getImportDeclarations: jest.fn((filePath: string) => imports[filePath] ?? []),
    getJsxElementUsages: jest.fn((filePath: string) => jsxUsages[filePath] ?? []),
    getCallExpressionUsages: jest.fn((filePath: string) => callUsages[filePath] ?? []),
    getTypeReferenceUsages: jest.fn((filePath: string) => (typeRefUsages ?? {})[filePath] ?? []),
    getValueReferenceUsages: jest.fn((filePath: string) => (valueRefUsages ?? {})[filePath] ?? []),
    classifySymbol: jest.fn((_filePath: string, symbolName: string, _moduleSpecifier: string) => {
      if (classifications && symbolName in classifications) {
        return classifications[symbolName];
      }
      // Default fallback
      if (/^use[A-Z]/.test(symbolName)) return 'hook';
      if (/^[A-Z]/.test(symbolName)) return 'component';
      return 'other';
    }),
    describeUnknownSymbol: jest.fn((symbolName: string) => {
      if (/^use[A-Z]/.test(symbolName)) return 'Likely a React hook (use* naming convention)';
      if (/Props$/.test(symbolName)) return 'Likely a type/interface (*Props naming convention)';
      if (/^[A-Z]/.test(symbolName)) return 'PascalCase symbol — could be a component, constant, or type';
      return 'Unresolved symbol — .d.ts not available';
    }),
  };
}

describe('long-report', () => {
  it('should collect metadata for component usages', () => {
    const parser = createMockParser(
      {
        '/mock/root/src/App.tsx': [
          {
            moduleSpecifier: '@fluentui/react-components',
            namedImports: ['Button', 'Input'],
            isTypeOnly: false,
          },
        ],
      },
      {
        '/mock/root/src/App.tsx': [
          {
            componentName: 'Button',
            props: { appearance: 'primary', size: 'medium' },
            moduleSpecifier: '@fluentui/react-components',
          },
          {
            componentName: 'Button',
            props: { appearance: 'secondary' },
            moduleSpecifier: '@fluentui/react-components',
          },
          {
            componentName: 'Input',
            props: { placeholder: 'Search...' },
            moduleSpecifier: '@fluentui/react-components',
          },
        ],
      },
      {},
    );

    const result = collectLongReportData('/mock/root', parser);

    expect(result.packages['@fluentui/react-components']).toBeDefined();

    const pkg = result.packages['@fluentui/react-components'];
    expect(pkg.components['Button'].count).toBe(2);
    expect(pkg.components['Button'].props['appearance'].values).toEqual(['primary', 'secondary']);
    expect(pkg.components['Button'].props['appearance'].count).toBe(2);
    expect(pkg.components['Input'].count).toBe(1);
  });

  it('should collect metadata for hook usages', () => {
    const parser = createMockParser(
      {
        '/mock/root/src/App.tsx': [
          {
            moduleSpecifier: '@fluentui/react-components',
            namedImports: ['useId', 'useToastController'],
            isTypeOnly: false,
          },
        ],
      },
      {},
      {
        '/mock/root/src/App.tsx': [
          {
            functionName: 'useId',
            args: { arg0: "'my-id'" },
            moduleSpecifier: '@fluentui/react-components',
          },
          {
            functionName: 'useToastController',
            args: {},
            moduleSpecifier: '@fluentui/react-components',
          },
        ],
      },
    );

    const result = collectLongReportData('/mock/root', parser);

    const pkg = result.packages['@fluentui/react-components'];
    expect(pkg.hooks['useId'].count).toBe(1);
    expect(pkg.hooks['useId'].props['arg0'].values).toEqual(["'my-id'"]);
    expect(pkg.hooks['useToastController'].count).toBe(1);
  });

  it('should collect metadata for type-only imports', () => {
    const parser = createMockParser(
      {
        '/mock/root/src/types.ts': [
          {
            moduleSpecifier: '@fluentui/react-components',
            namedImports: ['ButtonProps', 'InputProps'],
            isTypeOnly: true,
          },
        ],
      },
      {},
      {},
    );

    const result = collectLongReportData('/mock/root', parser);

    const pkg = result.packages['@fluentui/react-components'];
    expect(pkg.types['ButtonProps'].count).toBe(1);
    expect(pkg.types['ButtonProps'].typeofCount).toBe(0);
    expect(pkg.types['ButtonProps'].props).toEqual({});
    expect(pkg.types['InputProps'].count).toBe(1);
    expect(pkg.types['InputProps'].typeofCount).toBe(0);
  });

  it('should track "other" symbols (non-component, non-hook, non-type)', () => {
    const parser = createMockParser(
      {
        '/mock/root/src/App.tsx': [
          {
            moduleSpecifier: '@fluentui/react-components',
            namedImports: ['tokens', 'webLightTheme'],
            isTypeOnly: false,
          },
        ],
      },
      {},
      {},
    );

    const result = collectLongReportData('/mock/root', parser);

    const pkg = result.packages['@fluentui/react-components'];
    expect(pkg.others['tokens'].count).toBe(1);
    expect(pkg.others['webLightTheme'].count).toBe(1);
  });

  it('should skip non-reportable packages', () => {
    const parser = createMockParser(
      {
        '/mock/root/src/App.tsx': [
          {
            moduleSpecifier: 'lodash',
            namedImports: ['debounce'],
            isTypeOnly: false,
          },
        ],
      },
      {},
      {},
    );

    const result = collectLongReportData('/mock/root', parser);

    expect(result.packages['lodash']).toBeUndefined();
  });

  it('should return empty metadata when no files are found', () => {
    const { discoverSourceFiles } = require('./file-discovery');
    discoverSourceFiles.mockReturnValueOnce([]);

    const result = collectLongReportData('/mock/root');

    expect(result).toEqual({ fileMap: [], packages: {} });
  });

  it('should pass include/exclude to filterSourceFiles', () => {
    const { filterSourceFiles } = require('./file-discovery');
    const parser = createMockParser({ '/mock/root/src/App.tsx': [] }, {}, {});

    collectLongReportData('/mock/root', parser, ['src/**'], ['**/*.test.*']);

    expect(filterSourceFiles).toHaveBeenCalledWith(
      ['/mock/root/src/App.tsx', '/mock/root/src/types.ts'],
      '/mock/root',
      ['src/**'],
      ['**/*.test.*'],
    );
  });

  it('should pass auto-detected tsconfig to createProject', () => {
    const { existsSync } = require('node:fs');
    existsSync.mockImplementation((p: string) => p === '/mock/root/tsconfig.json');

    const parser = createMockParser({ '/mock/root/src/App.tsx': [] }, {}, {});

    collectLongReportData('/mock/root', parser);

    expect(parser.createProject).toHaveBeenCalledWith(expect.any(Array), '/mock/root/tsconfig.json', '/mock/root');

    existsSync.mockReturnValue(false);
  });

  it('should fall back to tsconfig.base.json when tsconfig.json is missing', () => {
    const { existsSync } = require('node:fs');
    existsSync.mockImplementation((p: string) => p === '/mock/root/tsconfig.base.json');

    const parser = createMockParser({ '/mock/root/src/App.tsx': [] }, {}, {});

    collectLongReportData('/mock/root', parser);

    expect(parser.createProject).toHaveBeenCalledWith(expect.any(Array), '/mock/root/tsconfig.base.json', '/mock/root');

    existsSync.mockReturnValue(false);
  });

  it('should pass undefined tsconfig when none found', () => {
    const parser = createMockParser({ '/mock/root/src/App.tsx': [] }, {}, {});

    collectLongReportData('/mock/root', parser);

    expect(parser.createProject).toHaveBeenCalledWith(expect.any(Array), undefined, '/mock/root');
  });

  it('should handle multiple packages in same file', () => {
    const parser = createMockParser(
      {
        '/mock/root/src/App.tsx': [
          {
            moduleSpecifier: '@fluentui/react-components',
            namedImports: ['Button'],
            isTypeOnly: false,
          },
          {
            moduleSpecifier: '@griffel/react',
            namedImports: ['makeStyles'],
            isTypeOnly: false,
          },
        ],
      },
      {
        '/mock/root/src/App.tsx': [
          {
            componentName: 'Button',
            props: { appearance: 'primary' },
            moduleSpecifier: '@fluentui/react-components',
          },
        ],
      },
      {},
    );

    const result = collectLongReportData('/mock/root', parser);

    expect(result.packages['@fluentui/react-components']).toBeDefined();
    expect(result.packages['@griffel/react']).toBeDefined();
    expect(result.packages['@griffel/react'].others['makeStyles'].count).toBe(1);
  });

  it('should exclude react and typescript imports from long report', () => {
    const parser = createMockParser(
      {
        '/mock/root/src/App.tsx': [
          {
            moduleSpecifier: 'react',
            namedImports: ['useState', 'useEffect'],
            isTypeOnly: false,
          },
          {
            moduleSpecifier: '@fluentui/react-components',
            namedImports: ['Button'],
            isTypeOnly: false,
          },
        ],
      },
      {},
      {},
    );

    const result = collectLongReportData('/mock/root', parser);

    expect(result.packages['react']).toBeUndefined();
    expect(result.packages['@fluentui/react-components']).toBeDefined();
  });

  it('should classify PascalCase non-component symbols as "others" via classifySymbol', () => {
    const parser = createMockParser(
      {
        '/mock/root/src/App.tsx': [
          {
            moduleSpecifier: '@fluentui/react-components',
            namedImports: ['AzureLightTheme', 'tokens'],
            isTypeOnly: false,
          },
        ],
      },
      {},
      {},
      { AzureLightTheme: 'other', tokens: 'other' },
    );

    const result = collectLongReportData('/mock/root', parser);

    const pkg = result.packages['@fluentui/react-components'];
    expect(pkg.others['AzureLightTheme'].count).toBe(1);
    expect(pkg.others['tokens'].count).toBe(1);
    expect(pkg.components['AzureLightTheme']).toBeUndefined();
  });

  it('should classify pure types (interfaces) without import type keyword', () => {
    const parser = createMockParser(
      {
        '/mock/root/src/App.tsx': [
          {
            moduleSpecifier: '@fluentui/react-components',
            namedImports: ['ButtonProps', 'Button'],
            isTypeOnly: false,
          },
        ],
      },
      {},
      {},
      { ButtonProps: 'type', Button: 'component' },
    );

    const result = collectLongReportData('/mock/root', parser);

    const pkg = result.packages['@fluentui/react-components'];
    expect(pkg.types['ButtonProps'].count).toBe(1);
    expect(pkg.types['ButtonProps'].typeofCount).toBe(0);
    expect(pkg.types['ButtonProps'].props).toEqual({});
    expect(pkg.components['Button']).toBeDefined();
    expect(pkg.others['ButtonProps']).toBeUndefined();
  });

  it('should track typeof as type usage with typeofCount', () => {
    const parser = createMockParser(
      {
        '/mock/root/src/App.tsx': [
          {
            moduleSpecifier: '@fluentui/react-components',
            namedImports: ['Button'],
            isTypeOnly: false,
          },
        ],
      },
      {},
      {},
      { Button: 'component' },
      {
        '/mock/root/src/App.tsx': [
          { symbolName: 'Button', moduleSpecifier: '@fluentui/react-components', kind: 'typeof' as const },
        ],
      },
    );

    const result = collectLongReportData('/mock/root', parser);

    const pkg = result.packages['@fluentui/react-components'];
    expect(pkg.types['Button']).toBeDefined();
    expect(pkg.types['Button'].count).toBe(1);
    expect(pkg.types['Button'].typeofCount).toBe(1);
    expect(pkg.types['Button'].props).toEqual({});
  });

  it('should track component value references', () => {
    const parser = createMockParser(
      {
        '/mock/root/src/App.tsx': [
          {
            moduleSpecifier: '@fluentui/react-components',
            namedImports: ['Button'],
            isTypeOnly: false,
          },
        ],
      },
      {},
      {},
      { Button: 'component' },
      {},
      {
        '/mock/root/src/App.tsx': [{ symbolName: 'Button', moduleSpecifier: '@fluentui/react-components' }],
      },
    );

    const result = collectLongReportData('/mock/root', parser);

    const pkg = result.packages['@fluentui/react-components'];
    expect(pkg.components['Button'].count).toBe(1);
  });

  it('should capture generic type arguments as props', () => {
    const parser = createMockParser(
      {
        '/mock/root/src/App.tsx': [
          {
            moduleSpecifier: '@fluentui/react-components',
            namedImports: ['ColumnDef'],
            isTypeOnly: true,
          },
        ],
      },
      {},
      {},
      { ColumnDef: 'type' },
      {
        '/mock/root/src/App.tsx': [
          {
            symbolName: 'ColumnDef',
            moduleSpecifier: '@fluentui/react-components',
            kind: 'generic' as const,
            typeArgs: ['{ name: string; age: number }'],
          },
          {
            symbolName: 'ColumnDef',
            moduleSpecifier: '@fluentui/react-components',
            kind: 'generic' as const,
            typeArgs: ['{ id: number; price: number }'],
          },
        ],
      },
    );

    const result = collectLongReportData('/mock/root', parser);

    const pkg = result.packages['@fluentui/react-components'];
    expect(pkg.types['ColumnDef']).toBeDefined();
    expect(pkg.types['ColumnDef'].count).toBe(3); // 1 from import type + 2 from generic usages
    expect(pkg.types['ColumnDef'].typeofCount).toBe(0);
    expect(pkg.types['ColumnDef'].props['typeArg0']).toBeDefined();
    expect(pkg.types['ColumnDef'].props['typeArg0'].count).toBe(2);
    expect(pkg.types['ColumnDef'].props['typeArg0'].values).toEqual([
      '{ name: string; age: number }',
      '{ id: number; price: number }',
    ]);
  });

  it('should deduplicate symbols in both components and others', () => {
    const parser = createMockParser(
      {
        '/mock/root/src/App.tsx': [
          {
            moduleSpecifier: '@fluentui/react-components',
            namedImports: ['Button'],
            isTypeOnly: false,
          },
        ],
        '/mock/root/src/types.ts': [
          {
            moduleSpecifier: '@fluentui/react-components',
            namedImports: ['Button'],
            isTypeOnly: false,
          },
        ],
      },
      {
        '/mock/root/src/App.tsx': [
          {
            componentName: 'Button',
            props: {},
            moduleSpecifier: '@fluentui/react-components',
          },
        ],
      },
      {},
      {},
    );

    // Manually simulate what happens when classifySymbol returns 'component' in one file and 'other' in another
    let callCount = 0;
    (parser.classifySymbol as jest.Mock).mockImplementation((_fp: string, name: string) => {
      if (name === 'Button') {
        callCount++;
        return callCount === 1 ? 'component' : 'other';
      }
      return 'other';
    });

    const result = collectLongReportData('/mock/root', parser);

    const pkg = result.packages['@fluentui/react-components'];
    // Button has JSX usage (count > 0) so should be in components, NOT in others
    expect(pkg.components['Button']).toBeDefined();
    expect(pkg.components['Button'].count).toBe(1);
    expect(pkg.others['Button']).toBeUndefined();
  });

  it('should track unknown symbols with descriptions', () => {
    const parser = createMockParser(
      {
        '/mock/root/src/App.tsx': [
          {
            moduleSpecifier: '@fluentui/react-components',
            namedImports: ['SomeConstant', 'CustomProps'],
            isTypeOnly: false,
          },
        ],
      },
      {},
      {},
      { SomeConstant: 'unknown', CustomProps: 'unknown' },
    );

    const result = collectLongReportData('/mock/root', parser);

    const pkg = result.packages['@fluentui/react-components'];
    expect(pkg.unknowns['SomeConstant']).toBeDefined();
    expect(pkg.unknowns['SomeConstant'].count).toBe(1);
    expect(pkg.unknowns['SomeConstant'].description).toBe(
      'PascalCase symbol — could be a component, constant, or type',
    );
    expect(pkg.unknowns['CustomProps']).toBeDefined();
    expect(pkg.unknowns['CustomProps'].description).toBe('Likely a type/interface (*Props naming convention)');
  });

  it('should deduplicate unknowns when symbol is also categorized elsewhere', () => {
    const parser = createMockParser(
      {
        '/mock/root/src/App.tsx': [
          {
            moduleSpecifier: '@fluentui/react-components',
            namedImports: ['Button'],
            isTypeOnly: false,
          },
        ],
      },
      {
        '/mock/root/src/App.tsx': [
          {
            componentName: 'Button',
            props: {},
            moduleSpecifier: '@fluentui/react-components',
          },
        ],
      },
      {},
      { Button: 'unknown' },
    );

    const result = collectLongReportData('/mock/root', parser);

    const pkg = result.packages['@fluentui/react-components'];
    // Button has JSX usage, so it should be in components and removed from unknowns
    expect(pkg.components['Button']).toBeDefined();
    expect(pkg.components['Button'].count).toBe(1);
    expect(pkg.unknowns['Button']).toBeUndefined();
  });

  it('should include fileMap with relative paths', () => {
    const parser = createMockParser(
      {
        '/mock/root/src/App.tsx': [
          {
            moduleSpecifier: '@fluentui/react-components',
            namedImports: ['Button'],
            isTypeOnly: false,
          },
        ],
      },
      {},
      {},
    );

    const result = collectLongReportData('/mock/root', parser);

    expect(result.fileMap).toEqual(['src/App.tsx', 'src/types.ts']);
  });
});
