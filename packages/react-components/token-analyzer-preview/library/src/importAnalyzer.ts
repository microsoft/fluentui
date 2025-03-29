// importAnalyzer.ts
import { Project, Node, SourceFile, ImportDeclaration, Symbol, TypeChecker, SyntaxKind } from 'ts-morph';
import { log } from './debugUtils.js';
import { TokenReference, TOKEN_REGEX } from './types.js';
import { getModuleSourceFile } from './moduleResolver.js';
import { extractTokensFromCssVars } from './cssVarTokenExtractor.js';
import { isTokenReference, extractTokensFromText } from './tokenUtils.js';

/**
 * Represents a portion of a template expression
 */
interface TemplateSpan {
  text: string; // The actual text content
  isToken: boolean; // Whether this span is a token reference
  isReference: boolean; // Whether this span is a reference to another variable
  referenceName?: string; // The name of the referenced variable if isReference is true
}

/**
 * Represents a value imported from another module
 */
export interface ImportedValue {
  value: string;
  sourceFile: string;
  isLiteral: boolean;

  // Enhanced fields for template processing
  templateSpans?: TemplateSpan[]; // For template expressions with spans
  resolvedTokens?: TokenReference[]; // Pre-extracted tokens from this value
}

/**
 * Analyzes imports in a source file to extract string values
 */
export async function analyzeImports(sourceFile: SourceFile, project: Project): Promise<Map<string, ImportedValue>> {
  const importedValues = new Map<string, ImportedValue>();
  const filePath = sourceFile.getFilePath();

  log(`Analyzing imports in ${filePath}`);

  // Get TypeScript's type checker
  const typeChecker = project.getTypeChecker();

  // Process all import declarations
  for (const importDecl of sourceFile.getImportDeclarations()) {
    try {
      // Process the import declaration
      await processImportDeclaration(importDecl, sourceFile, project, importedValues, typeChecker);
    } catch (err) {
      log(`Error processing import: ${importDecl.getModuleSpecifierValue()}`, err);
    }
  }

  return importedValues;
}

/**
 * Process a single import declaration
 */
async function processImportDeclaration(
  importDecl: ImportDeclaration,
  sourceFile: SourceFile,
  project: Project,
  importedValues: Map<string, ImportedValue>,
  typeChecker: TypeChecker,
): Promise<void> {
  const moduleSpecifier = importDecl.getModuleSpecifierValue();
  const containingFilePath = sourceFile.getFilePath();

  // Use our module resolver to get the imported file
  const importedFile = getModuleSourceFile(project, moduleSpecifier, containingFilePath);

  if (!importedFile) {
    log(`Could not resolve module: ${moduleSpecifier}`);
    return;
  }

  // Process named imports (import { x } from 'module')
  processNamedImports(importDecl, importedFile, project, importedValues, typeChecker);

  // Process default import (import x from 'module')
  processDefaultImport(importDecl, importedFile, project, importedValues, typeChecker);
}

/**
 * Process named imports using TypeScript's type checker to follow re-exports
 */
function processNamedImports(
  importDecl: ImportDeclaration,
  importedFile: SourceFile,
  project: Project,
  importedValues: Map<string, ImportedValue>,
  typeChecker: TypeChecker,
): void {
  for (const namedImport of importDecl.getNamedImports()) {
    const importName = namedImport.getName();
    const alias = namedImport.getAliasNode()?.getText() || importName;

    // Find the export's true source using TypeScript's type checker
    const exportInfo = findExportDeclaration(importedFile, importName, typeChecker);

    if (exportInfo) {
      const { declaration, sourceFile: declarationFile } = exportInfo;

      // Extract the value from the declaration
      const valueInfo = extractValueFromDeclaration(declaration, typeChecker);

      if (valueInfo) {
        importedValues.set(alias, {
          value: valueInfo.value,
          sourceFile: declarationFile.getFilePath(),
          isLiteral: valueInfo.isLiteral,
          templateSpans: valueInfo.templateSpans,
        });

        log(`Added imported value: ${alias} = ${valueInfo.value} from ${declarationFile.getFilePath()}`);
      }
    }
  }
}

/**
 * Process default import using TypeScript's type checker
 */
function processDefaultImport(
  importDecl: ImportDeclaration,
  importedFile: SourceFile,
  project: Project,
  importedValues: Map<string, ImportedValue>,
  typeChecker: TypeChecker,
): void {
  const defaultImport = importDecl.getDefaultImport();
  if (!defaultImport) {
    return;
  }

  const importName = defaultImport.getText();

  // Find the default export's true source
  const exportInfo = findExportDeclaration(importedFile, 'default', typeChecker);

  if (exportInfo) {
    const { declaration, sourceFile: declarationFile } = exportInfo;

    // Extract the value from the declaration
    const valueInfo = extractValueFromDeclaration(declaration, typeChecker);

    if (valueInfo) {
      importedValues.set(importName, {
        value: valueInfo.value,
        sourceFile: declarationFile.getFilePath(),
        isLiteral: valueInfo.isLiteral,
        templateSpans: valueInfo.templateSpans,
      });

      log(`Added default import: ${importName} = ${valueInfo.value} from ${declarationFile.getFilePath()}`);
    }
  }
}

/**
 * Find an export's original declaration using TypeScript's type checker
 */
function findExportDeclaration(
  sourceFile: SourceFile,
  exportName: string,
  typeChecker: TypeChecker,
): { declaration: Node; sourceFile: SourceFile } | undefined {
  try {
    // Get the source file's symbol (represents the module)
    const sourceFileSymbol = typeChecker.getSymbolAtLocation(sourceFile);
    if (!sourceFileSymbol) {
      log(`No symbol found for source file ${sourceFile.getFilePath()}`);
      return undefined;
    }

    // Get all exports from this module
    const exports = typeChecker.getExportsOfModule(sourceFileSymbol);
    if (!exports || exports.length === 0) {
      log(`No exports found in module ${sourceFile.getFilePath()}`);
      return undefined;
    }

    // Find the specific export we're looking for
    const exportSymbol = exports.find((symbol: Symbol) => symbol.getName() === exportName);
    if (!exportSymbol) {
      log(`Export symbol '${exportName}' not found in ${sourceFile.getFilePath()}`);
      return undefined;
    }

    // If this is an alias (re-export), get the original symbol
    let resolvedSymbol: Symbol = exportSymbol;
    if (exportSymbol.isAlias()) {
      // we're ok type casting here because we know the symbol is an alias from the previous check but TS won't pick up on it
      resolvedSymbol = typeChecker.getAliasedSymbol(exportSymbol) as Symbol;
      log(`Resolved alias to: ${resolvedSymbol.getName()}`);
    }

    // Get the value declaration from the resolved symbol
    const valueDeclaration = resolvedSymbol.getValueDeclaration();
    if (!valueDeclaration) {
      log(`No value declaration found for ${exportName}`);

      // Fallback to any declaration if value declaration is not available
      const declarations = resolvedSymbol.getDeclarations();
      if (!declarations || declarations.length === 0) {
        log(`No declarations found for ${exportName}`);
        return undefined;
      }

      const declaration = declarations[0];
      const declarationSourceFile = declaration.getSourceFile();

      return {
        declaration,
        sourceFile: declarationSourceFile,
      };
    }

    const declarationSourceFile = valueDeclaration.getSourceFile();

    log(
      `Found declaration for '${exportName}': ${valueDeclaration.getKindName()} in ${declarationSourceFile.getFilePath()}`,
    );
    return {
      declaration: valueDeclaration,
      sourceFile: declarationSourceFile,
    };
  } catch (err) {
    log(`Error finding export declaration for ${exportName}:`, err);
    return undefined;
  }
}

/**
 * Extract string value from a declaration node
 */
function extractValueFromDeclaration(
  declaration: Node,
  typeChecker: TypeChecker,
): { value: string; isLiteral: boolean; templateSpans?: TemplateSpan[] } | undefined {
  // Handle variable declarations
  if (Node.isVariableDeclaration(declaration)) {
    const initializer = declaration.getInitializer();
    return extractValueFromExpression(initializer, typeChecker);
  }
  // Handle export assignments (export default "value")
  if (Node.isExportAssignment(declaration)) {
    const expression = declaration.getExpression();
    return extractValueFromExpression(expression, typeChecker);
  }

  // Handle named exports (export { x })
  if (Node.isExportSpecifier(declaration)) {
    // Find the local symbol this specifier refers to
    const name = declaration.getNameNode().getText();
    const sourceFile = declaration.getSourceFile();

    // Find the local declaration with this name
    for (const varDecl of sourceFile.getDescendantsOfKind(SyntaxKind.VariableDeclaration)) {
      if (varDecl.getName() === name) {
        const initializer = varDecl.getInitializer();
        return extractValueFromExpression(initializer, typeChecker);
      }
    }
  }

  return undefined;
}

/**
 * Extract value from an expression node with enhanced template literal handling
 */
function extractValueFromExpression(
  expression: Node | undefined,
  typeChecker: TypeChecker,
):
  | {
      value: string;
      isLiteral: boolean;
      templateSpans?: TemplateSpan[];
    }
  | undefined {
  if (!expression) {
    return undefined;
  }

  if (Node.isStringLiteral(expression)) {
    return {
      value: expression.getLiteralValue(),
      isLiteral: true,
    };
  } else if (Node.isTemplateExpression(expression)) {
    // Process the template head and spans fully
    const head = expression.getHead().getLiteralText();
    const spans = expression.getTemplateSpans();

    let fullValue = head;
    const templateSpans: TemplateSpan[] = [];

    // Add head as a non-token span if it's not empty
    if (head) {
      templateSpans.push({
        text: head,
        isToken: false,
        isReference: false,
      });
    }

    // Process each span in the template expression
    for (const span of spans) {
      const spanExpr = span.getExpression();
      const spanText = spanExpr.getText();
      const literal = span.getLiteral().getLiteralText();

      // Handle different types of expressions in template spans
      if (Node.isPropertyAccessExpression(spanExpr) && isTokenReference(spanExpr)) {
        // Direct token reference in template span
        templateSpans.push({
          text: spanText,
          isToken: true,
          isReference: false,
        });
        fullValue += spanText;
      } else if (Node.isIdentifier(spanExpr)) {
        // Potential reference to another variable
        templateSpans.push({
          text: spanText,
          isToken: false,
          isReference: true,
          referenceName: spanText,
        });
        fullValue += spanText;
      } else {
        // Other expression types - try to resolve recursively
        const resolvedExpr = extractValueFromExpression(spanExpr, typeChecker);
        if (resolvedExpr) {
          if (resolvedExpr.templateSpans) {
            // If it has its own spans, include them
            templateSpans.push(...resolvedExpr.templateSpans);
          } else {
            // Otherwise add the value
            templateSpans.push({
              text: resolvedExpr.value,
              isToken: false,
              isReference: false,
            });
          }
          fullValue += resolvedExpr.value;
        } else {
          // Fallback to the raw text if we can't resolve
          templateSpans.push({
            text: spanText,
            isToken: false,
            isReference: false,
          });
          fullValue += spanText;
        }
      }

      // Add the literal part that follows the expression
      if (literal) {
        templateSpans.push({
          text: literal,
          isToken: false,
          isReference: false,
        });
        fullValue += literal;
      }
    }

    return {
      value: fullValue,
      isLiteral: true,
      templateSpans,
    };
  } else if (Node.isIdentifier(expression)) {
    // Try to resolve the identifier to its value
    const symbol = expression.getSymbol();
    if (!symbol) {
      return {
        value: expression.getText(),
        isLiteral: false,
      };
    }

    // Get the declaration of this identifier
    const decl = symbol.getValueDeclaration() || symbol.getDeclarations()?.[0];
    if (!decl) {
      return {
        value: expression.getText(),
        isLiteral: false,
      };
    }

    // If it's a variable declaration, get its initializer
    if (Node.isVariableDeclaration(decl)) {
      const initializer = decl.getInitializer();
      if (initializer) {
        // Recursively resolve the initializer
        return extractValueFromExpression(initializer, typeChecker);
      }
    }

    return {
      value: expression.getText(),
      isLiteral: false,
    };
  } else if (Node.isPropertyAccessExpression(expression)) {
    // Handle tokens.xyz or other property access
    return {
      value: expression.getText(),
      isLiteral: false,
    };
  } else if (Node.isNoSubstitutionTemplateLiteral(expression)) {
    return {
      value: expression.getLiteralValue(),
      isLiteral: true,
    };
  }

  // Default case for unhandled expression types
  return undefined;
}

/**
 * Process string tokens in imported values
 */
export function processImportedStringTokens(
  importedValues: Map<string, ImportedValue>,
  propertyName: string,
  value: string,
  path: string[] = [],
  tokenRegex: RegExp = TOKEN_REGEX,
): TokenReference[] {
  const tokens: TokenReference[] = [];

  // Check if the value is an imported value reference
  if (importedValues.has(value)) {
    const importedValue = importedValues.get(value)!;

    // If we've already pre-resolved tokens for this value, use them
    if (importedValue.resolvedTokens) {
      return importedValue.resolvedTokens.map(token => ({
        ...token,
        property: propertyName, // Update property name for current context
        path: path, // Update path for current context
      }));
    }

    if (importedValue.isLiteral) {
      if (importedValue.templateSpans) {
        // Process template spans specially
        for (const span of importedValue.templateSpans) {
          if (span.isToken) {
            // Direct token reference in span
            tokens.push({
              property: propertyName,
              token: span.text,
              path,
              isVariableReference: true,
              sourceFile: importedValue.sourceFile,
            });
          } else if (span.isReference && span.referenceName && importedValues.has(span.referenceName)) {
            // Reference to another imported value - process recursively
            const spanTokens = processImportedStringTokens(
              importedValues,
              propertyName,
              span.referenceName,
              path,
              tokenRegex,
            );
            tokens.push(...spanTokens);
          } else if (span.text.includes('var(')) {
            // Check for CSS variables in the span text
            const cssVarTokens = extractTokensFromCssVars(span.text, propertyName, path, tokenRegex);
            cssVarTokens.forEach(token => {
              tokens.push({
                ...token,
                isVariableReference: true,
                sourceFile: importedValue.sourceFile,
              });
            });
          } else {
            // Check for direct token matches in non-reference spans
            const matches = extractTokensFromText(span.text);
            if (matches.length > 0) {
              matches.forEach(match => {
                tokens.push({
                  property: propertyName,
                  token: match,
                  path,
                  isVariableReference: true,
                  sourceFile: importedValue.sourceFile,
                });
              });
            }
          }
        }
      } else {
        // Standard processing for literals without spans
        // First, check for direct token references
        const matches = extractTokensFromText(importedValue.value);
        if (matches.length > 0) {
          matches.forEach(match => {
            tokens.push({
              property: propertyName,
              token: match,
              path,
              isVariableReference: true,
              sourceFile: importedValue.sourceFile,
            });
          });
        } else if (importedValue.value.includes('var(')) {
          // Then check for CSS variable patterns
          const cssVarTokens = extractTokensFromCssVars(importedValue.value, propertyName, path, tokenRegex);
          cssVarTokens.forEach(token => {
            tokens.push({
              ...token,
              isVariableReference: true,
              sourceFile: importedValue.sourceFile,
            });
          });
        }
      }
    } else {
      // Non-literal values (like property access expressions)
      if (isTokenReference(importedValue.value)) {
        tokens.push({
          property: propertyName,
          token: importedValue.value,
          path,
          isVariableReference: true,
          sourceFile: importedValue.sourceFile,
        });
      } else {
        // Check for any token references in the value
        const matches = extractTokensFromText(importedValue.value);
        if (matches.length > 0) {
          matches.forEach(match => {
            tokens.push({
              property: propertyName,
              token: match,
              path,
              isVariableReference: true,
              sourceFile: importedValue.sourceFile,
            });
          });
        }
      }
    }

    // Cache the resolved tokens for future use
    importedValue.resolvedTokens = tokens.map(token => ({ ...token }));
  }

  return tokens;
}
