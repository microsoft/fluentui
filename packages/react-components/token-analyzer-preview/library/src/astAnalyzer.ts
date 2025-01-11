/* eslint-disable no-console */
import { Project, Node, SourceFile, PropertyAssignment } from 'ts-morph';
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

const makeResetStylesToken = 'resetStyles';

interface StyleMapping {
  baseStyles: string[];
  conditionalStyles: StyleCondition[];
}

interface VariableMapping {
  variableName: string;
  functionName: string;
}

/**
 * Process a style property to extract token references.
 * Property names are derived from the actual CSS property in the path,
 * not the object key containing them.
 */
function processStyleProperty(prop: PropertyAssignment, isResetStyles?: Boolean): TokenReference[] {
  const tokens: TokenReference[] = [];
  const parentName = prop.getName();

  function processNode(node?: Node, path: string[] = []): void {
    if (!node) {
      return;
    }

    // If we're processing a reset style, we need to add the parent name to the path
    if (isResetStyles && path.length === 0) {
      path.push(parentName);
    }

    if (Node.isStringLiteral(node) || Node.isIdentifier(node)) {
      const text = node.getText();
      const matches = text.match(TOKEN_REGEX);
      if (matches) {
        matches.forEach(match => {
          tokens.push({
            property: path[path.length - 1] || parentName,
            token: match,
            path,
          });
        });
      }
    } else if (Node.isPropertyAccessExpression(node)) {
      const text = node.getText();
      if (text.startsWith('tokens.')) {
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
        }
      });
    }
  }

  const initializer = prop.getInitializer();
  if (initializer) {
    processNode(initializer);
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
      const mapping: StyleMapping = {
        baseStyles: [],
        conditionalStyles: [],
      };

      /**
       *  TODO: We could also walk the tree to find what function is assigned to our makeStyles call, and thus, what
       * styles object we're working with. Typically this is called `useStyles` and then assigned to `styles`. We've hard
       * coded it for now but this could be improved.
       */

      node.getArguments().forEach(arg => {
        // Handle direct style references
        if (Node.isPropertyAccessExpression(arg) && arg.getText().startsWith('styles.')) {
          mapping.baseStyles.push(arg.getName());
        }
        // Handle conditional styles
        else if (Node.isBinaryExpression(arg)) {
          const right = arg.getRight();
          if (Node.isPropertyAccessExpression(right) && right.getText().startsWith('styles.')) {
            mapping.conditionalStyles.push({
              style: right.getName(),
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
    tokens: tokens.filter(t => t.path.length === 1),
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
        metadata.styleConditions[style] = { isBase: true };
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
        };
      }
    });
  });

  return metadata;
}

/**
 * Analyzes makeStyles calls to get token usage and structure
 */
async function analyzeMakeStyles(sourceFile: SourceFile): Promise<StyleAnalysis> {
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
            const tokens = processStyleProperty(prop);
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
          assignedSlots: [],
          isResetStyles: true,
        };
        if (Node.isObjectLiteralExpression(stylesArg)) {
          // Process the styles object
          stylesArg.getProperties().forEach(prop => {
            if (Node.isPropertyAssignment(prop)) {
              const tokens = processStyleProperty(prop, true);
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
 * Combines mergeClasses and makeStyles analysis
 */
async function analyzeFile(filePath: string, project: Project): Promise<FileAnalysis> {
  log(`Analyzing ${filePath}`);

  const sourceFile = project.addSourceFileAtPath(filePath);

  // First pass: Analyze mergeClasses
  const styleMappings = measure('analyze mergeClasses', () => analyzeMergeClasses(sourceFile));

  // Second pass: Analyze makeStyles
  const styleAnalysis = await measureAsync<StyleAnalysis>('analyze makeStyles', () => analyzeMakeStyles(sourceFile));

  // Create enhanced analysis with separated styles and metadata
  return {
    styles: styleAnalysis,
    metadata: createMetadata(styleMappings),
  };
}

export { analyzeFile, processStyleProperty, analyzeMergeClasses, analyzeMakeStyles, createStyleContent };
export type { StyleMapping };
