import * as path from 'node:path';

import { TsMorphAstParser } from './ast-parser';

const FIXTURES_DIR = path.join(__dirname, '..', '__fixtures__', 'sample-app', 'src');
const FIXTURES_ROOT = path.join(__dirname, '..', '__fixtures__', 'sample-app');
const TSCONFIG_PATH = path.join(FIXTURES_ROOT, 'tsconfig.json');

describe('TsMorphAstParser', () => {
  let parser: TsMorphAstParser;

  beforeAll(() => {
    parser = new TsMorphAstParser();
    parser.createProject(
      [
        path.join(FIXTURES_DIR, 'basic-usage.tsx'),
        path.join(FIXTURES_DIR, 'type-imports.ts'),
        path.join(FIXTURES_DIR, 'mixed-imports.tsx'),
        path.join(FIXTURES_DIR, 'type-refs.tsx'),
      ],
      TSCONFIG_PATH,
    );
  });

  describe('getSourceFiles', () => {
    it('should return all added source files', () => {
      const files = parser.getSourceFiles();
      expect(files).toHaveLength(4);
      expect(files.some(f => f.endsWith('basic-usage.tsx'))).toBe(true);
      expect(files.some(f => f.endsWith('type-imports.ts'))).toBe(true);
      expect(files.some(f => f.endsWith('mixed-imports.tsx'))).toBe(true);
      expect(files.some(f => f.endsWith('type-refs.tsx'))).toBe(true);
    });

    it('should not include resolved dependency files (e.g., .d.ts from node_modules)', () => {
      const files = parser.getSourceFiles();
      const dtsFiles = files.filter(f => f.endsWith('.d.ts'));
      const nodeModulesFiles = files.filter(f => f.includes('node_modules'));
      expect(dtsFiles).toHaveLength(0);
      expect(nodeModulesFiles).toHaveLength(0);
    });
  });

  describe('getImportDeclarations', () => {
    it('should extract named imports from basic-usage.tsx', () => {
      const filePath = path.join(FIXTURES_DIR, 'basic-usage.tsx');
      const imports = parser.getImportDeclarations(filePath);

      const fluentImport = imports.find(i => i.moduleSpecifier === '@fluentui/react-components' && !i.isTypeOnly);
      expect(fluentImport).toBeDefined();
      expect(fluentImport!.namedImports).toEqual(expect.arrayContaining(['Button', 'Input', 'makeStyles', 'tokens']));
    });

    it('should detect type-only imports from type-imports.ts', () => {
      const filePath = path.join(FIXTURES_DIR, 'type-imports.ts');
      const imports = parser.getImportDeclarations(filePath);

      const typeImport = imports.find(i => i.moduleSpecifier === '@fluentui/react-components');
      expect(typeImport).toBeDefined();
      expect(typeImport!.isTypeOnly).toBe(true);
      expect(typeImport!.namedImports).toEqual(expect.arrayContaining(['ButtonProps', 'InputProps']));
    });

    it('should extract imports from @fluentui/react-icons', () => {
      const filePath = path.join(FIXTURES_DIR, 'basic-usage.tsx');
      const imports = parser.getImportDeclarations(filePath);

      const iconsImport = imports.find(i => i.moduleSpecifier === '@fluentui/react-icons');
      expect(iconsImport).toBeDefined();
      expect(iconsImport!.namedImports).toContain('SearchRegular');
    });

    it('should return empty array for unknown file', () => {
      const imports = parser.getImportDeclarations('/nonexistent/file.ts');
      expect(imports).toEqual([]);
    });
  });

  describe('getJsxElementUsages', () => {
    it('should detect JSX component usages with props', () => {
      const filePath = path.join(FIXTURES_DIR, 'basic-usage.tsx');
      const usages = parser.getJsxElementUsages(filePath);

      const buttonUsages = usages.filter(u => u.componentName === 'Button');
      expect(buttonUsages.length).toBeGreaterThanOrEqual(2);

      const primaryButton = buttonUsages.find(u => u.props['appearance'] === 'primary');
      expect(primaryButton).toBeDefined();
      expect(primaryButton!.moduleSpecifier).toBe('@fluentui/react-components');
      expect(primaryButton!.props['size']).toBe('medium');
    });

    it('should detect Input component with props', () => {
      const filePath = path.join(FIXTURES_DIR, 'basic-usage.tsx');
      const usages = parser.getJsxElementUsages(filePath);

      const inputUsages = usages.filter(u => u.componentName === 'Input');
      expect(inputUsages).toHaveLength(1);
      expect(inputUsages[0].props['placeholder']).toBe('Search...');
      expect(inputUsages[0].props['appearance']).toBe('outline');
    });

    it('should detect components from mixed-imports.tsx', () => {
      const filePath = path.join(FIXTURES_DIR, 'mixed-imports.tsx');
      const usages = parser.getJsxElementUsages(filePath);

      const fluentProvider = usages.find(u => u.componentName === 'FluentProvider');
      expect(fluentProvider).toBeDefined();
      expect(fluentProvider!.moduleSpecifier).toBe('@fluentui/react-components');

      const tooltip = usages.find(u => u.componentName === 'Tooltip');
      expect(tooltip).toBeDefined();
      expect(tooltip!.props['content']).toBe('App wrapper');
      expect(tooltip!.props['relationship']).toBe('description');
    });

    it('should return empty array for file without JSX', () => {
      const filePath = path.join(FIXTURES_DIR, 'type-imports.ts');
      const usages = parser.getJsxElementUsages(filePath);
      expect(usages).toEqual([]);
    });
  });

  describe('getCallExpressionUsages', () => {
    it('should detect hook calls in basic-usage.tsx', () => {
      const filePath = path.join(FIXTURES_DIR, 'basic-usage.tsx');
      const calls = parser.getCallExpressionUsages(filePath);

      const useIdCall = calls.find(c => c.functionName === 'useId');
      expect(useIdCall).toBeDefined();
      expect(useIdCall!.moduleSpecifier).toBe('@fluentui/react-components');
    });

    it('should detect function calls in mixed-imports.tsx', () => {
      const filePath = path.join(FIXTURES_DIR, 'mixed-imports.tsx');
      const calls = parser.getCallExpressionUsages(filePath);

      const makeStylesCall = calls.find(c => c.functionName === 'makeStyles');
      expect(makeStylesCall).toBeDefined();
      expect(makeStylesCall!.moduleSpecifier).toBe('@griffel/react');
    });
  });

  describe('getTypeReferenceUsages', () => {
    it('should detect typeof references', () => {
      const filePath = path.join(FIXTURES_DIR, 'type-refs.tsx');
      const usages = parser.getTypeReferenceUsages(filePath);

      const typeofButton = usages.find(u => u.symbolName === 'Button' && u.kind === 'typeof');
      expect(typeofButton).toBeDefined();
      expect(typeofButton!.moduleSpecifier).toBe('@fluentui/react-components');
    });

    it('should return empty for file without type references', () => {
      const filePath = path.join(FIXTURES_DIR, 'type-imports.ts');
      const usages = parser.getTypeReferenceUsages(filePath);

      // type-imports.ts only has `import type` but no typeof or generic usage
      const typeofUsages = usages.filter(u => u.kind === 'typeof');
      expect(typeofUsages).toHaveLength(0);
    });
  });

  describe('getValueReferenceUsages', () => {
    it('should detect value references to imported symbols', () => {
      const filePath = path.join(FIXTURES_DIR, 'type-refs.tsx');
      const usages = parser.getValueReferenceUsages(filePath);

      // Button is used as a value in `component: Button`
      const buttonRef = usages.find(u => u.symbolName === 'Button');
      expect(buttonRef).toBeDefined();
      expect(buttonRef!.moduleSpecifier).toBe('@fluentui/react-components');
    });

    it('should not include JSX tag names in value references', () => {
      const filePath = path.join(FIXTURES_DIR, 'basic-usage.tsx');
      const usages = parser.getValueReferenceUsages(filePath);

      // Button and Input are used as JSX, not value references (except contentBefore={<SearchRegular />} style)
      // JSX tag names should be excluded
      const buttonJsxRef = usages.filter(u => u.symbolName === 'Button');
      // Button only appears in JSX tags, should not be in value refs
      expect(buttonJsxRef).toHaveLength(0);
    });
  });

  describe('classifySymbol', () => {
    it('should classify function components returning JSX as "component"', () => {
      const filePath = path.join(FIXTURES_DIR, 'basic-usage.tsx');

      expect(parser.classifySymbol(filePath, 'Button', '@fluentui/react-components')).toBe('component');
      expect(parser.classifySymbol(filePath, 'Input', '@fluentui/react-components')).toBe('component');
    });

    it('should classify hooks as "hook"', () => {
      const filePath = path.join(FIXTURES_DIR, 'basic-usage.tsx');

      expect(parser.classifySymbol(filePath, 'useId', '@fluentui/react-components')).toBe('hook');
    });

    it('should classify interfaces/types as "type"', () => {
      const filePath = path.join(FIXTURES_DIR, 'type-imports.ts');

      expect(parser.classifySymbol(filePath, 'ButtonProps', '@fluentui/react-components')).toBe('type');
      expect(parser.classifySymbol(filePath, 'InputProps', '@fluentui/react-components')).toBe('type');
    });

    it('should classify constants as "other" even if PascalCase', () => {
      const filePath = path.join(FIXTURES_DIR, 'mixed-imports.tsx');

      expect(parser.classifySymbol(filePath, 'webLightTheme', '@fluentui/react-components')).toBe('other');
    });

    it('should classify hooks from mixed imports correctly', () => {
      const filePath = path.join(FIXTURES_DIR, 'mixed-imports.tsx');

      expect(parser.classifySymbol(filePath, 'useToastController', '@fluentui/react-components')).toBe('hook');
    });

    it('should fall back to "unknown" for unresolvable symbols', () => {
      const filePath = path.join(FIXTURES_DIR, 'basic-usage.tsx');

      // Symbol not imported in this file
      expect(parser.classifySymbol(filePath, 'NonExistent', 'non-existent-module')).toBe('unknown');
    });

    it('should classify unresolvable symbols as "unknown" instead of guessing', () => {
      const filePath = path.join(FIXTURES_DIR, 'basic-usage.tsx');

      // These use fallback since they may not resolve from the import
      // The fallback now returns 'unknown' for all unresolvable symbols
      const freshParser = new TsMorphAstParser();
      freshParser.createProject([path.join(FIXTURES_DIR, 'basic-usage.tsx')]);

      expect(freshParser.classifySymbol(filePath, 'CustomButtonProps', 'nonexistent-module')).toBe('unknown');
      expect(freshParser.classifySymbol(filePath, 'IColor', 'nonexistent-module')).toBe('unknown');
      expect(freshParser.classifySymbol(filePath, 'RowRenderer', 'nonexistent-module')).toBe('unknown');
      expect(freshParser.classifySymbol(filePath, 'AzureLightTheme', 'nonexistent-module')).toBe('unknown');
    });
  });

  describe('error handling', () => {
    it('should throw if createProject was not called', () => {
      const freshParser = new TsMorphAstParser();
      expect(() => freshParser.getSourceFiles()).toThrow('call createProject()');
    });
  });

  describe('describeUnknownSymbol', () => {
    it('should describe hook-like names', () => {
      expect(parser.describeUnknownSymbol('useCustomHook')).toBe('Likely a React hook (use* naming convention)');
    });

    it('should describe type-like names with known suffixes', () => {
      expect(parser.describeUnknownSymbol('ButtonProps')).toBe('Likely a type/interface (*Props naming convention)');
      expect(parser.describeUnknownSymbol('RowRenderer')).toBe('Likely a type/interface (*Renderer naming convention)');
    });

    it('should describe I-prefixed names as interfaces', () => {
      expect(parser.describeUnknownSymbol('IColor')).toBe('Likely an interface (I* naming convention)');
    });

    it('should describe PascalCase names generically', () => {
      expect(parser.describeUnknownSymbol('AzureLightTheme')).toBe(
        'PascalCase symbol — could be a component, constant, or type',
      );
    });

    it('should return default description for other names', () => {
      expect(parser.describeUnknownSymbol('someThing')).toBe('Unresolved symbol — .d.ts not available');
    });
  });

  describe('hook argument value extraction', () => {
    let hookParser: TsMorphAstParser;

    beforeAll(() => {
      hookParser = new TsMorphAstParser();
      hookParser.createProject([path.join(FIXTURES_DIR, 'hook-args.tsx')], TSCONFIG_PATH);
    });

    it('should extract literal property values from hook calls, not property names', () => {
      const filePath = path.join(FIXTURES_DIR, 'hook-args.tsx');
      const calls = hookParser.getCallExpressionUsages(filePath);

      const navCalls = calls.filter(c => c.functionName === 'useArrowNavigationGroup');
      expect(navCalls.length).toBe(2);

      // First call: useArrowNavigationGroup({ axis: 'vertical', memorizeCurrent: true, unstable_hasDefault: true })
      const firstCall = navCalls[0];
      expect(firstCall.args['axis']).toBe("'vertical'");
      expect(firstCall.args['memorizeCurrent']).toBe('true');
      expect(firstCall.args['unstable_hasDefault']).toBe('true');

      // Second call: useArrowNavigationGroup({ axis: 'horizontal', circular })
      const secondCall = navCalls[1];
      expect(secondCall.args['axis']).toBe("'horizontal'");
      // Shorthand property: value is the variable name (can't statically resolve)
      expect(secondCall.args['circular']).toBe('circular');
    });

    it('should not return resolved .d.ts files from getSourceFiles', () => {
      const files = hookParser.getSourceFiles();
      expect(files).toHaveLength(1);
      expect(files[0]).toContain('hook-args.tsx');
    });
  });

  describe('path alias resolution', () => {
    let aliasParser: TsMorphAstParser;

    beforeAll(() => {
      aliasParser = new TsMorphAstParser();
      aliasParser.createProject([path.join(FIXTURES_DIR, 'path-alias-imports.tsx')], TSCONFIG_PATH);
    });

    it('should classify path-aliased symbols resolving to .ts source as "unknown"', () => {
      const filePath = path.join(FIXTURES_DIR, 'path-alias-imports.tsx');

      // Path aliases resolve to .ts source files, not .d.ts — classified as unknown
      const result = aliasParser.classifySymbol(filePath, 'AzureLightTheme', '@sample/azure-theme');
      expect(result).toBe('unknown');
    });

    it('should still resolve .d.ts-based symbols correctly', () => {
      const filePath = path.join(FIXTURES_DIR, 'path-alias-imports.tsx');

      // FluentProvider comes from node_modules .d.ts — should resolve as component
      const result = aliasParser.classifySymbol(filePath, 'FluentProvider', '@fluentui/react-components');
      expect(result).toBe('component');
    });
  });
});
