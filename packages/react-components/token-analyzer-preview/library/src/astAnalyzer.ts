import { Project, Node, SourceFile, PropertyAssignment, VariableDeclaration } from 'ts-morph';
import { resolveImportPath } from './fileOperations.js';
import { TokenMap, TokenReference, StyleAnalysis, TOKEN_REGEX } from './types.js';

/**
 * Extracts token reference from a variable declaration's initializer
 */
function findTokensInVariableDeclaration(initializerText: string): string | undefined {
  const matches = initializerText.match(TOKEN_REGEX);
  return matches ? matches[0] : undefined;
}

/**
 * Finds all local variables that reference tokens in a source file
 */
function findLocalTokenVariables(sourceFile: SourceFile): TokenMap {
  const tokens = new Map<string, string>();

  sourceFile.forEachDescendant(node => {
    if (Node.isVariableDeclaration(node)) {
      const initializer = node.getInitializer();
      if (initializer && Node.isExpression(initializer)) {
        const token = findTokensInVariableDeclaration(initializer.getText());
        if (token) {
          tokens.set(node.getName(), token);
        }
      }
    }
  });

  return tokens;
}

/**
 * Resolves a variable reference by checking imported files
 */
async function resolveImportedVariable(
  variableName: string,
  sourceFile: SourceFile,
  project: Project,
  processedFiles: Set<string>,
): Promise<{ token?: string; sourceFile?: string }> {
  for (const importDecl of sourceFile.getImportDeclarations()) {
    const hasVariable =
      importDecl.getNamedImports().some(named => named.getName() === variableName) ||
      importDecl.getDefaultImport()?.getText() === variableName;

    if (hasVariable) {
      const moduleSpecifier = importDecl.getModuleSpecifierValue();
      const importPath = await resolveImportPath(moduleSpecifier, sourceFile.getFilePath());

      if (importPath && !processedFiles.has(importPath)) {
        processedFiles.add(importPath);
        const importedFile = project.addSourceFileAtPath(importPath);
        const importedTokens = findLocalTokenVariables(importedFile);

        if (importedTokens.has(variableName)) {
          return {
            token: importedTokens.get(variableName),
            sourceFile: importPath,
          };
        }
      }
    }
  }

  return {};
}

/**
 * Processes a property assignment node to find token references
 */
async function processPropertyAssignment(
  node: PropertyAssignment,
  currentPath: string[],
  localTokens: TokenMap,
  project: Project,
  processedFiles: Set<string>,
): Promise<TokenReference[]> {
  const tokens: TokenReference[] = [];
  const propertyName = node.getName();
  const initializer = node.getInitializer();

  if (!initializer) return tokens;

  if (Node.isExpression(initializer)) {
    const text = initializer.getText();
    const tokenMatch = text.match(TOKEN_REGEX);

    if (tokenMatch) {
      tokens.push({
        property: propertyName,
        token: tokenMatch[0],
        path: [...currentPath],
      });
    } else {
      const varName = text.trim();
      let resolvedToken = localTokens.get(varName);
      let sourceFile: string | undefined;

      if (!resolvedToken) {
        const importResult = await resolveImportedVariable(varName, node.getSourceFile(), project, processedFiles);
        resolvedToken = importResult.token;
        sourceFile = importResult.sourceFile;
      }

      if (resolvedToken) {
        tokens.push({
          property: propertyName,
          token: resolvedToken,
          path: [...currentPath],
          isVariableReference: true,
          sourceFile,
        });
      }
    }
  }

  if (Node.isObjectLiteralExpression(initializer)) {
    const nestedPromises = initializer.getProperties().map(async prop => {
      if (Node.isPropertyAssignment(prop)) {
        const nestedTokens = await processPropertyAssignment(
          prop,
          [...currentPath, propertyName],
          localTokens,
          project,
          processedFiles,
        );
        tokens.push(...nestedTokens);
      }
    });

    await Promise.all(nestedPromises);
  }

  return tokens;
}

/**
 * Analyzes a single file for token usage
 */
async function analyzeFile(filePath: string, project: Project, processedFiles: Set<string>): Promise<StyleAnalysis> {
  const analysis: StyleAnalysis = {};
  const sourceFile = project.addSourceFileAtPath(filePath);
  const localTokens = findLocalTokenVariables(sourceFile);

  const styleNodes = sourceFile
    .getDescendants()
    .filter(
      (node): node is VariableDeclaration =>
        Node.isVariableDeclaration(node) && (node.getName() === 'styles' || node.getName() === 'style'),
    );

  for (const node of styleNodes) {
    const initializer = node.getInitializer();
    if (initializer && Node.isObjectLiteralExpression(initializer)) {
      const propertyPromises = initializer.getProperties().map(async prop => {
        if (Node.isPropertyAssignment(prop)) {
          const styleName = prop.getName();
          const tokens = await processPropertyAssignment(prop, [], localTokens, project, processedFiles);

          if (tokens.length > 0) {
            analysis[styleName] = {
              tokens: tokens.filter(t => t.path.length === 0),
              nested: tokens
                .filter(t => t.path.length > 0)
                .reduce((acc, token) => {
                  const path = token.path.join('.');
                  if (!acc[path]) {
                    acc[path] = { tokens: [] };
                  }
                  acc[path].tokens.push(token);
                  return acc;
                }, {} as StyleAnalysis),
            };

            // Clean up empty nested objects
            if (Object.keys(analysis[styleName].nested || {}).length === 0) {
              delete analysis[styleName].nested;
            }
          }
        }
      });

      await Promise.all(propertyPromises);
    }
  }

  return analysis;
}

export {
  findTokensInVariableDeclaration,
  findLocalTokenVariables,
  resolveImportedVariable,
  processPropertyAssignment,
  analyzeFile,
};
