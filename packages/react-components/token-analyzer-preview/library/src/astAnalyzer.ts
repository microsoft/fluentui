import { Project, Node, SourceFile, PropertyAssignment } from 'ts-morph';
import {
  TokenReference,
  StyleAnalysis,
  EnhancedStyleAnalysis,
  StyleCondition,
  StyleContent,
  StyleMetadata,
  TOKEN_REGEX,
} from './types.js';
import { log, measure, measureAsync } from './debugUtils.js';

interface StyleMapping {
  baseStyles: string[];
  conditionalStyles: StyleCondition[];
}

/**
 * Process a style property to extract token references
 */
function processStyleProperty(prop: PropertyAssignment): TokenReference[] {
  const tokens: TokenReference[] = [];
  const propertyName = prop.getName();

  function processNode(node?: Node, path: string[] = []): void {
    if (!node) {
      return;
    }

    if (Node.isStringLiteral(node) || Node.isIdentifier(node)) {
      const text = node.getText();
      const matches = text.match(TOKEN_REGEX);
      if (matches) {
        matches.forEach(match => {
          tokens.push({
            property: propertyName,
            token: match,
            path,
          });
        });
      }
    } else if (Node.isPropertyAccessExpression(node)) {
      const text = node.getText();
      if (text.startsWith('tokens.')) {
        tokens.push({
          property: propertyName,
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
 * Creates a StyleContent object from token references
 */
function createStyleContent(tokens: TokenReference[]): StyleContent {
  const content: StyleContent = {
    tokens: tokens.filter(t => !t.path.length),
  };

  const nestedTokens = tokens.filter(t => t.path.length > 0);
  if (nestedTokens.length > 0) {
    content.nested = nestedTokens.reduce<StyleAnalysis>((acc, token) => {
      const path = token.path.join('.');
      if (!acc[path]) {
        acc[path] = { tokens: [] };
      }
      acc[path].tokens.push({
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
      if (Node.isObjectLiteralExpression(stylesArg)) {
        // Process the styles object
        stylesArg.getProperties().forEach(prop => {
          if (Node.isPropertyAssignment(prop)) {
            const styleName = prop.getName();
            const tokens = processStyleProperty(prop);
            if (tokens.length) {
              analysis[styleName] = createStyleContent(tokens);
            }
          }
        });
      }
    }
  });

  return analysis;
}

/**
 * Combines mergeClasses and makeStyles analysis
 */
async function analyzeFile(filePath: string, project: Project): Promise<EnhancedStyleAnalysis> {
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
