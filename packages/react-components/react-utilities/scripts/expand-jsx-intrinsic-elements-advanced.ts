#!/usr/bin/env node

import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Advanced TypeScript transform script that dynamically extracts the actual keys
 * from JSX.IntrinsicElements by analyzing the React type definitions
 */

const TARGET_FILE = path.join(__dirname, '../src/utils/generated-types.ts');

function findReactTypesPath(): string {
  // Look for React types in node_modules
  const possiblePaths = [
    path.resolve(process.cwd(), 'node_modules/@types/react'),
    path.resolve(__dirname, '../node_modules/@types/react'),
    path.resolve(__dirname, '../../../../node_modules/@types/react'),
    path.resolve(__dirname, '../../../../../node_modules/@types/react'),
  ];

  for (const reactPath of possiblePaths) {
    if (fs.existsSync(path.join(reactPath, 'index.d.ts'))) {
      return reactPath;
    }
  }

  throw new Error('Could not find @types/react. Please ensure it is installed.');
}

function extractJSXKeysFromReactTypes(): string[] {
  try {
    const reactTypesPath = findReactTypesPath();
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

    // Create a TypeScript program with React types
    const program = ts.createProgram({
      rootNames: [reactIndexPath],
      options: {
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.CommonJS,
        lib: ['dom', 'es2020'],
        jsx: ts.JsxEmit.React,
        moduleResolution: ts.ModuleResolutionKind.NodeJs,
        skipLibCheck: false,
        declaration: false,
        typeRoots: [path.dirname(reactTypesPath)],
      },
    });

    const typeChecker = program.getTypeChecker();
    const sourceFile = program.getSourceFile(reactIndexPath);

    if (!sourceFile) {
      throw new Error('Could not load React types source file');
    }

    let jsxKeys: string[] = [];

    // Function to visit AST nodes and find JSX namespace
    function visit(node: ts.Node) {
      // Look for global JSX namespace (React 17 style)
      if (ts.isModuleDeclaration(node) && node.name && ts.isIdentifier(node.name) && node.name.text === 'JSX') {
        console.log('🔍 Found global JSX namespace (React 17 style)');
        extractFromJSXNamespace(node);
      }

      // Look for React namespace containing JSX (React 18+ style)
      if (ts.isModuleDeclaration(node) && node.name && ts.isIdentifier(node.name) && node.name.text === 'React') {
        console.log('🔍 Found React namespace, looking for JSX inside (React 18+ style)');

        if (node.body && ts.isModuleBlock(node.body)) {
          // Look for JSX namespace within React namespace
          for (const statement of node.body.statements) {
            if (ts.isModuleDeclaration(statement) &&
                statement.name &&
                ts.isIdentifier(statement.name) &&
                statement.name.text === 'JSX') {
              console.log('🔍 Found JSX namespace inside React namespace');
              extractFromJSXNamespace(statement);
              break;
            }
          }
        }
      }

      ts.forEachChild(node, visit);
    }

    // Helper function to extract keys from a JSX namespace node
    function extractFromJSXNamespace(jsxNode: ts.ModuleDeclaration) {
      if (jsxNode.body && ts.isModuleBlock(jsxNode.body)) {
        // Look for IntrinsicElements interface within JSX namespace
        for (const statement of jsxNode.body.statements) {
          if (ts.isInterfaceDeclaration(statement) && statement.name.text === 'IntrinsicElements') {
            console.log('✅ Found IntrinsicElements interface');

            // Extract all property names from the interface
            for (const member of statement.members) {
              if (ts.isPropertySignature(member) && member.name) {
                if (ts.isIdentifier(member.name)) {
                  jsxKeys.push(member.name.text);
                } else if (ts.isStringLiteral(member.name)) {
                  jsxKeys.push(member.name.text);
                }
              }
            }
            break;
          }
        }
      }
    }

    visit(sourceFile);

    if (jsxKeys.length === 0) {
      console.log('⚠️  Could not extract keys from React types using AST, trying TypeChecker method...');

      // Alternative: Try to get the JSX symbol using TypeChecker
      // This handles both React 17 (global JSX) and React 18+ (React.JSX)

      // Method 1: Try global JSX symbol (React 17)
      const globalSymbols = typeChecker.getSymbolsInScope(sourceFile, ts.SymbolFlags.Namespace);
      let jsxSymbol = globalSymbols.find(symbol => symbol.name === 'JSX');

      if (jsxSymbol) {
        console.log('🔍 Found global JSX symbol (React 17 style)');
        jsxKeys = extractKeysFromJSXSymbol(jsxSymbol);
      }

      // Method 2: Try React.JSX symbol (React 18+)
      if (jsxKeys.length === 0) {
        const reactSymbol = globalSymbols.find(symbol => symbol.name === 'React');
        if (reactSymbol && reactSymbol.declarations) {
          console.log('🔍 Found React symbol, looking for JSX property (React 18+ style)');
          const reactType = typeChecker.getTypeOfSymbolAtLocation(reactSymbol, reactSymbol.declarations[0]);
          const jsxProperty = typeChecker.getPropertyOfType(reactType, 'JSX');

          if (jsxProperty) {
            console.log('🔍 Found React.JSX property');
            jsxKeys = extractKeysFromJSXSymbol(jsxProperty);
          }
        }
      }
    }

    // Helper function to extract keys from a JSX symbol
    function extractKeysFromJSXSymbol(jsxSymbol: ts.Symbol): string[] {
      const keys: string[] = [];

      if (jsxSymbol.declarations && jsxSymbol.declarations.length > 0) {
        const jsxType = typeChecker.getTypeOfSymbolAtLocation(jsxSymbol, jsxSymbol.declarations[0]);
        const intrinsicElementsProp = typeChecker.getPropertyOfType(jsxType, 'IntrinsicElements');

        if (intrinsicElementsProp) {
          const intrinsicElementsType = typeChecker.getTypeOfSymbolAtLocation(
            intrinsicElementsProp,
            intrinsicElementsProp.declarations![0],
          );

          const properties = typeChecker.getPropertiesOfType(intrinsicElementsType);
          return properties.map(prop => prop.getName()).filter(name => typeof name === 'string');
        }
      }

      return keys;
    }

    if (jsxKeys.length > 0) {
      console.log(`🎯 Successfully extracted ${jsxKeys.length} keys from React types`);
      return jsxKeys.sort();
    } else {
      throw new Error('Could not extract JSX keys from React types');
    }
  } catch (error) {
    console.log(`❌ Error extracting from React types: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}


async function transformFile(): Promise<void> {
  try {
    console.log('🔄 Extracting JSX intrinsic element keys from React types...');

    // Extract from actual React types - fail if not possible
    const elementKeys = extractJSXKeysFromReactTypes();

    console.log(`📋 Found ${elementKeys.length} JSX intrinsic elements`);

    // Read the current file
    if (!fs.existsSync(TARGET_FILE)) {
      throw new Error(`Target file not found: ${TARGET_FILE}`);
    }

    const sourceContent = fs.readFileSync(TARGET_FILE, 'utf8');
    console.log('📄 Current file content:');
    console.log(sourceContent);

    // Create the union string with proper formatting for readability
    const unionString = elementKeys.map(key => `'${key}'`).join(' | ');

    // Transform the content
    let transformedContent = sourceContent;

    // Handle different possible formats
    const patterns = [
      /export type JSXIntrinsicElementKeys\s*=\s*keyof JSX\.IntrinsicElements\s*;/g,
      /export type JSXIntrinsicElementKeys\s*=\s*keyof JSX\.IntrinsicElements;/g,
      /export type JSXIntrinsicElementKeys[^;]+;/g,
    ];

    let transformed = false;
    for (const pattern of patterns) {
      if (pattern.test(sourceContent)) {
        transformedContent = transformedContent.replace(
          pattern,
          `export type JSXIntrinsicElementKeys = ${unionString};`,
        );
        transformed = true;
        break;
      }
    }

    if (!transformed) {
      console.log('⚠️  No matching pattern found. File content:');
      console.log(JSON.stringify(sourceContent));
      return;
    }

    // Write the transformed content back
    fs.writeFileSync(TARGET_FILE, transformedContent, 'utf8');

    console.log('✅ Successfully transformed JSXIntrinsicElementsKeys type');
    console.log(`📁 Updated file: ${TARGET_FILE}`);
    console.log(`🎯 Expanded to ${elementKeys.length} literal types`);

    // Show a preview of the first few elements
    const preview = elementKeys
      .slice(0, 10)
      .map(k => `'${k}'`)
      .join(' | ');
    console.log(`📝 Preview: ${preview}${elementKeys.length > 10 ? ' | ...' : ''}`);
  } catch (error) {
    console.error('❌ Error transforming file:', error);
    process.exit(1);
  }
}

// Run the transformation
if (require.main === module) {
  transformFile().catch(console.error);
}

export { transformFile };
