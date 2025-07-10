import * as ts from 'typescript';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { execSync } from 'node:child_process';
import { parseArgs } from 'node:util';

// Run the transformation
if (require.main === module) {
  const { omitElements, reactTypesPath, targetFile } = processArgs();
  main({
    omitElements,
    reactTypesPath,
    targetFile,
  }).catch(console.error);
}

export { main };

/**
 * Advanced TypeScript transform script that dynamically extracts the actual keys
 * from JSX.IntrinsicElements by analyzing the React type definitions
 */
async function main(options: { targetFile: string; reactTypesPath: string; omitElements: string[] }) {
  const { reactTypesPath, targetFile, omitElements } = options;

  console.log('🔄 Extracting JSX intrinsic element keys from React types...');
  const elementKeys = extractJSXKeysFromReactTypes({ reactTypesPath });
  console.log(`📋 Found ${elementKeys.length} JSX intrinsic elements`);

  // Filter out omitted elements
  const filteredElementKeys = elementKeys.filter(key => !omitElements.includes(key));

  if (omitElements.length > 0) {
    const omittedCount = elementKeys.length - filteredElementKeys.length;
    console.log(`🚫 Omitted ${omittedCount} elements: ${omitElements.join(', ')}`);
    console.log(`✅ Remaining ${filteredElementKeys.length} elements after filtering`);
  }

  const compat = generateUnionString(filteredElementKeys);
  const omitted = omitElements.length ? generateUnionString(omitElements) : null;

  const JSXIntrinsicElementKeysTypeStatement = `
  /**
  * Unwrapped type for 'keyof JSX.IntrinsicElement'. (Backwards compatible with older versions of '\\@types/react')
  */
  export type JSXIntrinsicElementKeysCompat = ${compat};
  /**
  * Unwrapped type for 'keyof JSX.IntrinsicElement'
  */
  export type JSXIntrinsicElementKeysLatest =
  ${[omitted, 'JSXIntrinsicElementKeysCompat'].filter(Boolean).join(' | ')};

  \n`;

  return generateFile({
    targetFile,
    types: [JSXIntrinsicElementKeysTypeStatement],
  });

  function generateUnionString(keys: string[]): string {
    return keys.map(key => `'${key}'`).join(' | ');
  }
}

function processArgs() {
  const root = process.cwd();
  const { values } = parseArgs({
    args: process.argv.slice(2),
    options: {
      'react-types-path': {
        type: 'string',
        short: 'r',
        description: 'Path to the React types directory',
      },
      'target-file': {
        type: 'string',
        short: 't',
        description: 'Output file path',
      },
      'omit-elements': {
        type: 'string',
        short: 'o',
        description: 'Comma-separated list of elements to exclude from the generated union',
      },
      help: {
        type: 'boolean',
        short: 'h',
        description: 'Show help message',
      },
    },
    allowPositionals: false,
  });

  // Show help if requested
  if (values.help) {
    console.log(`
Usage: node scripts/expand-jsx-intrinsic-elements.ts --target-file <path> [options]

Options:
  -t, --target-file <path>         Output file path (required)
  -r, --react-types-path <path>    Path to the React types directory
  -o, --omit-elements <elements>   Comma-separated list of elements to exclude to make JSXIntrinsicElements union backwards compatible
  -h, --help                       Show this help message

Examples:
  node scripts/expand-jsx-intrinsic-elements.ts --target-file ./generated-types.ts
  node scripts/expand-jsx-intrinsic-elements.ts --target-file ./custom-types.ts --omit-elements div,span,p
  node scripts/expand-jsx-intrinsic-elements.ts --target-file ./generated-types.ts --react-types-path /path/to/react/types
`);
    process.exit(0);
  }

  // Validate required arguments
  if (!values['target-file']) {
    console.error('❌ Error: --target-file is required');
    console.error('Use --help for usage information');
    process.exit(1);
  }

  // Parse omit elements
  const omitElements =
    typeof values['omit-elements'] === 'string'
      ? values['omit-elements']
          .split(',')
          .map(el => el.trim())
          .filter(el => el.length > 0)
      : [];
  const targetFile = path.resolve(root, values['target-file']);
  const reactTypesPath = values['react-types-path'] || findReactTypesPath();

  console.log('🔧 Parsed CLI arguments:');
  console.log(`  - React types path: ${reactTypesPath}`);
  console.log(`  - Target file: ${targetFile}`);
  console.log(`  - Omit elements: ${omitElements}`);

  return {
    reactTypesPath,
    targetFile,
    omitElements,
  };
}

function findReactTypesPath(): string {
  // Look for React types in node_modules
  const possiblePaths = [
    path.resolve(process.cwd(), 'node_modules/@types/react'),
    path.resolve(findGitRoot(process.cwd()), './node_modules/@types/react'),
  ];

  console.log('🔍 Searching for @types/react in the following paths:', possiblePaths);

  for (const reactPath of possiblePaths) {
    if (fs.existsSync(path.join(reactPath, 'index.d.ts'))) {
      return reactPath;
    }
  }

  throw new Error('Could not find @types/react. Please ensure it is installed.');
}

function findGitRoot(cwd: string) {
  const output = execSync('git rev-parse --show-toplevel', { cwd });

  return output.toString().trim();
}

function extractJSXKeysFromReactTypes(options: { reactTypesPath: string }): string[] {
  try {
    const reactTypesPath = options.reactTypesPath;
    const reactIndexPath = path.join(reactTypesPath, 'index.d.ts');

    console.log(`📍 Found React types at: ${reactTypesPath}`);

    // Try to detect React version from package.json
    try {
      const reactPackageJsonPath = path.join(reactTypesPath, 'package.json');
      if (fs.existsSync(reactPackageJsonPath)) {
        const reactPackageJson = JSON.parse(fs.readFileSync(reactPackageJsonPath, 'utf8'));
        console.log(`📦 React types version: ${reactPackageJson.version || 'unknown'}`);
      }
    } catch (e) {
      // Ignore package.json reading errors
    }

    let jsxKeys: string[] = [];

    // Create a temporary source file to query the JSX.IntrinsicElements type
    console.log('🔍 Creating temporary source file to query JSX.IntrinsicElements...');

    const tempSourceCode = `
      type TestIntrinsicElements = JSX.IntrinsicElements;
      type TestReactIntrinsicElements = React.JSX.IntrinsicElements;
    `;

    const tempSourceFile = ts.createSourceFile(
      'temp.tsx',
      tempSourceCode,
      ts.ScriptTarget.ES2020,
      true,
      ts.ScriptKind.TSX,
    );

    // Create a new program that includes both React types and our temp file
    const extendedProgram = ts.createProgram({
      rootNames: [reactIndexPath],
      options: {
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.CommonJS,
        lib: ['dom', 'es2020'],
        jsx: ts.JsxEmit.React,
        moduleResolution: ts.ModuleResolutionKind.NodeJs,
        skipLibCheck: true,
        declaration: false,
        typeRoots: [path.dirname(reactTypesPath)],
      },
      host: {
        ...ts.createCompilerHost({
          target: ts.ScriptTarget.ES2020,
          module: ts.ModuleKind.CommonJS,
          lib: ['dom', 'es2020'],
          jsx: ts.JsxEmit.React,
          moduleResolution: ts.ModuleResolutionKind.NodeJs,
          skipLibCheck: true,
          declaration: false,
          typeRoots: [path.dirname(reactTypesPath)],
        }),
        getSourceFile: (fileName: string, languageVersion: ts.ScriptTarget) => {
          if (fileName === 'temp.tsx') {
            return tempSourceFile;
          }
          return ts.createCompilerHost({
            target: ts.ScriptTarget.ES2020,
            module: ts.ModuleKind.CommonJS,
            lib: ['dom', 'es2020'],
            jsx: ts.JsxEmit.React,
            moduleResolution: ts.ModuleResolutionKind.NodeJs,
            skipLibCheck: true,
            declaration: false,
            typeRoots: [path.dirname(reactTypesPath)],
          }).getSourceFile!(fileName, languageVersion);
        },
      },
    });

    const extendedTypeChecker = extendedProgram.getTypeChecker();

    // Helper function to extract keys from IntrinsicElements type
    function extractKeysFromIntrinsicElementsType(intrinsicElementsType: ts.Type): string[] {
      const properties = extendedTypeChecker.getPropertiesOfType(intrinsicElementsType);
      return properties.map(prop => prop.getName()).filter(name => typeof name === 'string');
    }

    // Try to find the types in our temporary file
    tempSourceFile.forEachChild(node => {
      if (ts.isTypeAliasDeclaration(node)) {
        if (node.name.text === 'TestIntrinsicElements') {
          console.log('✅ Found JSX.IntrinsicElements type alias');
          const aliasType = extendedTypeChecker.getTypeAtLocation(node.type);
          if (aliasType) {
            jsxKeys = extractKeysFromIntrinsicElementsType(aliasType);
            if (jsxKeys.length > 0) {
              console.log('✅ Successfully extracted keys from JSX.IntrinsicElements');
            }
          }
        } else if (node.name.text === 'TestReactIntrinsicElements' && jsxKeys.length === 0) {
          console.log('✅ Found React.JSX.IntrinsicElements type alias, trying fallback...');
          const aliasType = extendedTypeChecker.getTypeAtLocation(node.type);
          if (aliasType) {
            jsxKeys = extractKeysFromIntrinsicElementsType(aliasType);
            if (jsxKeys.length > 0) {
              console.log('✅ Successfully extracted keys from React.JSX.IntrinsicElements');
            }
          }
        }
      }
    });

    if (jsxKeys.length > 0) {
      console.log(`🎯 Successfully extracted ${jsxKeys.length} keys from React types`);
      return jsxKeys.sort();
    } else {
      throw new Error(
        'Could not extract JSX keys from React types - neither JSX.IntrinsicElements nor React.JSX.IntrinsicElements found',
      );
    }
  } catch (error) {
    console.log(`❌ Error extracting from React types: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}

async function generateFile(options: { types: string[]; targetFile: string }): Promise<void> {
  const header = `
/**
 * ============================================
 * 💡 DO NOT EDIT THIS FILE.
 *   - This file is automatically generated and should not be edited manually.
 *   - To regenerate run \`yarn nx run react-utilities:build\`.
 * ============================================
 */
  `;
  const { types, targetFile } = options;
  try {
    // Read the current file
    if (!fs.existsSync(targetFile)) {
      throw new Error(`Target file not found: ${targetFile}`);
    }

    const content = [header, ...types].join('\n');

    fs.writeFileSync(targetFile, content, 'utf8');

    console.log('✅ Successfully transformed JSXIntrinsicElementsKeys type');
    console.log(`📁 Updated file: ${targetFile}`);
    console.log(`📝 Updated content: ${content}`);
  } catch (error) {
    console.error('❌ Error transforming file:', error);
    process.exit(1);
  }
}
