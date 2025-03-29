/* eslint-disable no-console */
import { Project, Node, SourceFile, PropertyAssignment, SpreadAssignment } from 'ts-morph';
import {
  TokenReference,
  StyleAnalysis,
  FileAnalysis,
  StyleCondition,
  StyleContent,
  StyleMetadata,
  TOKEN_REGEX,
  StyleTokens,
} from './types.js';
import { log, measure, measureAsync } from './debugUtils.js';
import { analyzeImports, processImportedStringTokens, ImportedValue } from './importAnalyzer.js';
import { extractTokensFromCssVars } from './cssVarTokenExtractor.js';
import { extractTokensFromText, getPropertiesForShorthand, isTokenReference } from './tokenUtils.js';

const makeResetStylesToken = 'resetStyles';

interface StyleMapping {
  baseStyles: string[];
  conditionalStyles: StyleCondition[];
  slotName?: string;
}

interface VariableMapping {
  variableName: string;
  functionName: string;
}

/**
 * Process a style property to extract token references.
 * Property names are derived from the actual CSS property in the path,
 * not the object key containing them.
 *
 * @param prop The property assignment or spread element to process
 * @param importedValues Map of imported values for resolving token references
 * @param isResetStyles Whether this is a reset styles property
 */
function processStyleProperty(
  prop: PropertyAssignment | SpreadAssignment,
  importedValues: Map<string, ImportedValue> | undefined = undefined,
  isResetStyles?: Boolean,
): TokenReference[] {
  const tokens: TokenReference[] = [];
  const parentName = Node.isPropertyAssignment(prop) ? prop.getName() : '';

  function processNode(node?: Node, path: string[] = []): void {
    if (!node) {
      return;
    }

    // If we're processing a reset style, we need to add the parent name to the path
    if (isResetStyles && path.length === 0 && parentName) {
      path.push(parentName);
    }

    // Check for string literals or template expressions (string template literals)
    if (Node.isStringLiteral(node) || Node.isTemplateExpression(node)) {
      const text = node.getText().replace(/['"]/g, ''); // Remove quotes

      // Check for CSS var() syntax that might contain tokens
      if (text.includes('var(')) {
        const cssVarTokens = extractTokensFromCssVars(text, path[path.length - 1] || parentName, path, TOKEN_REGEX);
        tokens.push(...cssVarTokens);
      } else {
        // Check for direct token references
        const matches = extractTokensFromText(node);
        if (matches.length > 0) {
          matches.forEach(match => {
            tokens.push({
              property: path[path.length - 1] || parentName,
              token: match,
              path,
            });
          });
        }
      }
    } else if (Node.isIdentifier(node)) {
      const text = node.getText();

      // First check if it matches the token regex directly
      const matches = extractTokensFromText(node);
      if (matches.length > 0) {
        matches.forEach(match => {
          tokens.push({
            property: path[path.length - 1] || parentName,
            token: match,
            path,
          });
        });
      }

      // Then check if it's an imported value reference
      if (importedValues && importedValues.has(text)) {
        const importTokens = processImportedStringTokens(
          importedValues,
          path[path.length - 1] || parentName,
          text,
          path,
          TOKEN_REGEX,
        );
        tokens.push(...importTokens);
      }
    } else if (Node.isPropertyAccessExpression(node)) {
      const text = node.getText();
      const isToken = isTokenReference(text);
      if (isToken) {
        tokens.push({
          property: path[path.length - 1] || parentName,
          token: text,
          path,
        });
      }
    } else if (Node.isObjectLiteralExpression(node)) {
      node.getProperties().forEach(childProp => {
        if (Node.isPropertyAssignment(childProp)) {
          const childName = childProp.getName();
          processNode(childProp.getInitializer(), [...path, childName]);
        } else if (Node.isSpreadAssignment(childProp)) {
          // Handle spread elements in object literals
          processNode(childProp.getExpression(), path);
        }
      });
    } else if (Node.isSpreadAssignment(node)) {
      // Handle spread elements
      processNode(node.getExpression(), path);
    } else if (Node.isCallExpression(node) && node.getExpression().getText() === 'createCustomFocusIndicatorStyle') {
      const focus = `:focus`;
      const focusWithin = `:focus-within`;
      let nestedModifier = focus;

      const passedTokens = node.getArguments()[0];
      const passedOptions = node.getArguments()[1];

      if (passedOptions && Node.isObjectLiteralExpression(passedOptions)) {
        passedOptions.getProperties().forEach(property => {
          if (Node.isPropertyAssignment(property)) {
            const optionName = property.getName();
            if (optionName === 'selector') {
              const selectorType = property.getInitializer()?.getText();
              if (selectorType === 'focus') {
                nestedModifier = focus;
              } else if (selectorType === 'focus-within') {
                nestedModifier = focusWithin;
              }
            }
          }
        });
      }

      if (passedTokens && Node.isObjectLiteralExpression(passedTokens)) {
        passedTokens.getProperties().forEach(property => {
          if (Node.isPropertyAssignment(property)) {
            const childName = property.getName();
            processNode(property.getInitializer(), [...path, nestedModifier, childName]);
          }
        });
      }
    } else if (Node.isCallExpression(node)) {
      // Process calls like shorthands.borderColor(tokens.color)
      const functionName = node.getExpression().getText();
      // we should pass the number of arguments so we can properly map which overload is being called.
      const affectedProperties = getPropertiesForShorthand(functionName);

      if (affectedProperties.length > 0) {
        // Process each argument and apply it to all affected properties
        node.getArguments().forEach(argument => {
          processNodeForAffectedProperties(argument, affectedProperties, path);
        });
      } else {
        // Generic handling of functions that are not whitelisted
        node.getArguments().forEach(argument => {
          if (Node.isObjectLiteralExpression(argument)) {
            argument.getProperties().forEach(property => {
              if (Node.isPropertyAssignment(property)) {
                const childName = property.getName();
                processNode(property.getInitializer(), [...path, functionName, childName]);
              }
            });
          }
          // Check for string literals in function arguments that might contain CSS variables with tokens
          if (Node.isStringLiteral(argument)) {
            const text = argument.getText().replace(/['"]/g, '');
            if (text.includes('var(')) {
              const cssVarTokens = extractTokensFromCssVars(
                text,
                path[path.length - 1] || parentName,
                [...path, functionName],
                TOKEN_REGEX,
              );
              tokens.push(...cssVarTokens);
            }
          }
        });
      }
    }
  }

  // Helper function to process nodes for multiple affected properties
  function processNodeForAffectedProperties(node: Node, properties: string[], basePath: string[]): void {
    if (!node) {
      return;
    }

    // If this is a direct token reference
    if (Node.isPropertyAccessExpression(node) && isTokenReference(node)) {
      properties.forEach(property => {
        tokens.push({
          property,
          token: node.getText(),
          path: basePath.concat(property),
        });
      });
      return;
    }

    // If this is an identifier that might be a variable
    if (Node.isIdentifier(node) && importedValues && importedValues.has(node.getText())) {
      properties.forEach(property => {
        const importTokens = processImportedStringTokens(
          importedValues,
          property,
          node.getText(),
          basePath,
          TOKEN_REGEX,
        );
        tokens.push(...importTokens);
      });
      return;
    }

    // For other node types, process them normally but with each property
    if (Node.isStringLiteral(node) || Node.isTemplateExpression(node)) {
      const text = node.getText().replace(/['"]/g, '');

      // Check for tokens in the text
      const matches = extractTokensFromText(node);
      if (matches.length > 0) {
        properties.forEach(property => {
          matches.forEach(match => {
            tokens.push({
              property,
              token: match,
              path: basePath,
            });
          });
        });
      }

      // Check for CSS vars
      if (text.includes('var(')) {
        properties.forEach(property => {
          const cssVarTokens = extractTokensFromCssVars(text, property, basePath, TOKEN_REGEX);
          tokens.push(...cssVarTokens);
        });
      }
    }

    // For any other complex expressions, process them normally
    else {
      processNode(node, basePath);
    }
  }

  if (Node.isPropertyAssignment(prop)) {
    const initializer = prop.getInitializer();
    if (initializer) {
      processNode(initializer);
    }
  } else if (Node.isSpreadAssignment(prop)) {
    processNode(prop.getExpression());
  }

  return tokens;
}

/**
 * Analyzes mergeClasses calls to determine style relationships
 */
function analyzeMergeClasses(sourceFile: SourceFile): StyleMapping[] {
  const mappings: StyleMapping[] = [];

  sourceFile.forEachDescendant(node => {
    if (Node.isCallExpression(node) && node.getExpression().getText() === 'mergeClasses') {
      const parentNode = node.getParent();
      let slotName = '';
      if (Node.isBinaryExpression(parentNode)) {
        slotName = parentNode.getLeft().getText().split('.')[1];
      }
      const mapping: StyleMapping = {
        baseStyles: [],
        conditionalStyles: [],
        slotName,
      };

      /**
       *  TODO: We could also walk the tree to find what function is assigned to our makeStyles call, and thus, what
       * styles object we're working with. Typically this is called `useStyles` and then assigned to `styles`. We've hard
       * coded it for now but this could be improved.
       */

      node.getArguments().forEach(arg => {
        // Handle direct style references
        if (Node.isPropertyAccessExpression(arg)) {
          mapping.baseStyles.push(arg.getText());
        }
        // Handle conditional styles
        else if (Node.isBinaryExpression(arg)) {
          const right = arg.getRight();
          if (Node.isPropertyAccessExpression(right)) {
            mapping.conditionalStyles.push({
              style: right.getText(),
              condition: arg.getLeft().getText(),
            });
          }
        } else if (!arg.getText().includes('.')) {
          // We found a single variable (makeResetStyles or other assignment), add to base styles for lookup later
          mapping.baseStyles.push(arg.getText());
        }
      });

      if (mapping.baseStyles.length || mapping.conditionalStyles.length) {
        mappings.push(mapping);
      }
    }
  });

  return mappings;
}

/**
 * Creates a StyleContent object from token references.
 *
 * The path structure in token references is relative to the style property being processed.
 * For example, given a style object:
 * ```typescript
 * {
 *   root: {              // Handled by analyzeMakeStyles
 *     color: token,      // path = ['color']
 *     ':hover': {        // Start of nested structure
 *       color: token     // path = [':hover', 'color']
 *     }
 *   }
 * }
 * ```
 * Property names reflect the actual CSS property, derived from the path.
 */
function createStyleContent(tokens: TokenReference[]): StyleContent {
  const content: StyleContent = {
    tokens: tokens.filter(t => {
      return t.path.length === 1;
    }),
  };

  // Nested structures have paths longer than 1
  const nestedTokens = tokens.filter(t => t.path.length > 1);
  if (nestedTokens.length > 0) {
    content.nested = nestedTokens.reduce<StyleTokens>((acc, token) => {
      const nestedKey = token.path[0];

      if (!acc[nestedKey]) {
        acc[nestedKey] = { tokens: [] };
      }

      acc[nestedKey].tokens.push({
        ...token,
        path: [], // Reset path as we've used it for nesting
      });

      return acc;
    }, {});
  }

  return content;
}

/**
 * Creates metadata from style mappings
 */
function createMetadata(styleMappings: StyleMapping[]): StyleMetadata {
  const metadata: StyleMetadata = {
    styleConditions: {},
  };

  styleMappings.forEach(mapping => {
    mapping.baseStyles.forEach(style => {
      if (metadata.styleConditions[style]) {
        metadata.styleConditions[style].isBase = true;
      } else {
        metadata.styleConditions[style] = { isBase: true, slotName: mapping.slotName || '' };
      }
    });

    mapping.conditionalStyles.forEach(({ style, condition }) => {
      if (metadata.styleConditions[style]) {
        metadata.styleConditions[style].conditions = metadata.styleConditions[style].conditions || [];
        if (condition) {
          metadata.styleConditions[style].conditions!.push(condition);
        }
      } else {
        metadata.styleConditions[style] = {
          conditions: condition ? [condition] : [],
          slotName: mapping.slotName || '',
        };
      }
    });
  });

  return metadata;
}

/**
 * Analyzes makeStyles calls to get token usage and structure
 */
async function analyzeMakeStyles(
  sourceFile: SourceFile,
  importedValues: Map<string, ImportedValue> | undefined = undefined,
): Promise<StyleAnalysis> {
  const analysis: StyleAnalysis = {};

  sourceFile.forEachDescendant(node => {
    if (Node.isCallExpression(node) && node.getExpression().getText() === 'makeStyles') {
      const stylesArg = node.getArguments()[0];
      const parentNode = node.getParent();
      if (Node.isObjectLiteralExpression(stylesArg) && Node.isVariableDeclaration(parentNode)) {
        // Process the styles object
        stylesArg.getProperties().forEach(prop => {
          if (Node.isPropertyAssignment(prop)) {
            const styleName = prop.getName();
            const tokens = processStyleProperty(prop, importedValues);
            const functionName = parentNode.getName();
            if (!analysis[functionName]) {
              analysis[functionName] = {};
            }
            if (tokens.length) {
              analysis[functionName][styleName] = createStyleContent(tokens);
            }
          }
        });
      }
    } else if (Node.isCallExpression(node) && node.getExpression().getText() === 'makeResetStyles') {
      // Similar to above, but the styles are stored under the assigned function name instead of local variable
      const stylesArg = node.getArguments()[0];
      const parentNode = node.getParent();
      if (Node.isVariableDeclaration(parentNode)) {
        const functionName = parentNode.getName();
        if (!analysis[functionName]) {
          analysis[functionName] = {};
        }
        // We store 'isResetStyles' to differentiate from makeStyles and link mergeClasses variables
        analysis[functionName][makeResetStylesToken] = {
          tokens: [],
          nested: {},
          isResetStyles: true,
        };
        if (Node.isObjectLiteralExpression(stylesArg)) {
          // Process the styles object
          stylesArg.getProperties().forEach(prop => {
            if (Node.isPropertyAssignment(prop)) {
              const tokens = processStyleProperty(prop, importedValues, true);
              if (tokens.length) {
                const styleContent = createStyleContent(tokens);
                analysis[functionName][makeResetStylesToken].tokens = analysis[functionName][
                  makeResetStylesToken
                ].tokens.concat(styleContent.tokens);
                analysis[functionName][makeResetStylesToken].nested = {
                  ...analysis[functionName][makeResetStylesToken].nested,
                  ...styleContent.nested,
                };
              }
            }
          });
        }
      }
    }
  });

  const variables: VariableMapping[] = [];
  const styleFunctionNames: string[] = Object.keys(analysis);

  sourceFile.forEachDescendant(node => {
    // We do a second parse to link known style functions (i.e. makeResetStyles  assigned function variable names).
    // This is necessary to handle cases where we're using a variable directly in mergeClasses to link styles.

    if (Node.isCallExpression(node) && styleFunctionNames.includes(node.getExpression().getText())) {
      const parentNode = node.getParent();
      const functionName = node.getExpression().getText();
      if (Node.isVariableDeclaration(parentNode)) {
        const variableName = parentNode.getName();
        const variableMap: VariableMapping = {
          functionName,
          variableName,
        };
        variables.push(variableMap);
      }
    }
  });

  // Store our makeResetStyles assigned variables in the analysis to link later
  variables.forEach(variable => {
    Object.keys(analysis[variable.functionName]).forEach(styleName => {
      if (analysis[variable.functionName][styleName].assignedVariables === undefined) {
        analysis[variable.functionName][styleName].assignedVariables = [];
      }
      analysis[variable.functionName][styleName].assignedVariables?.push(variable.variableName);
    });
  });

  return analysis;
}

/**
 * Combines mergeClasses and makeStyles analysis, with import resolution
 */
async function analyzeFile(filePath: string, project: Project): Promise<FileAnalysis> {
  log(`Analyzing ${filePath}`);

  const sourceFile = project.addSourceFileAtPath(filePath);

  // First analyze imports to find imported string values
  log('Analyzing imports to find imported token values');
  const importedValues = await measureAsync('analyze imports', () => analyzeImports(sourceFile, project));

  // Second pass: Analyze mergeClasses
  const styleMappings = measure('analyze mergeClasses', () => analyzeMergeClasses(sourceFile));

  // Third pass: Analyze makeStyles with imported values
  const styleAnalysis = await measureAsync<StyleAnalysis>('analyze makeStyles', () =>
    analyzeMakeStyles(sourceFile, importedValues),
  );

  // Create enhanced analysis with separated styles and metadata
  return {
    styles: styleAnalysis,
    metadata: createMetadata(styleMappings),
  };
}

export { analyzeFile, processStyleProperty, analyzeMergeClasses, analyzeMakeStyles, createStyleContent };
export type { StyleMapping };
