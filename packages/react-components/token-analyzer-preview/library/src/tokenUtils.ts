// tokenUtils.ts
import { Node, Symbol } from 'ts-morph';
import { TOKEN_REGEX } from './types.js';

/**
 * Centralizes token detection logic to make future changes easier
 * @param textOrNode The text or Node to check for token references
 * @returns true if the text/node contains a token reference
 */
export function isTokenReference(textOrNode: string | Node | Symbol): boolean {
  // If we have a Node or Symbol, extract the text to check
  let text: string;

  if (typeof textOrNode === 'string') {
    text = textOrNode;
  } else if (Node.isNode(textOrNode)) {
    text = textOrNode.getText();
  } else if (textOrNode instanceof Symbol) {
    // For symbols, we need to check the declarations
    const declarations = textOrNode.getDeclarations();
    if (!declarations || declarations.length === 0) {
      return false;
    }

    // Get text from the first declaration
    text = declarations[0].getText();
  } else {
    return false;
  }
  // IMPORTANT: Reset lastIndex to prevent issues with the global flag
  TOKEN_REGEX.lastIndex = 0;
  const test = TOKEN_REGEX.test(text);
  return test;
}

/**
 * Extracts all token references from a text string or Node
 * @param textOrNode The text or Node to extract tokens from
 * @returns Array of token reference strings
 */
export function extractTokensFromText(textOrNode: string | Node | Symbol): string[] {
  // If we have a Node or Symbol, extract the text to check
  let text: string;

  if (typeof textOrNode === 'string') {
    text = textOrNode;
  } else if (Node.isNode(textOrNode)) {
    text = textOrNode.getText();
  } else if (textOrNode instanceof Symbol) {
    // For symbols, we need to check the declarations
    const declarations = textOrNode.getDeclarations();
    if (!declarations || declarations.length === 0) {
      return [];
    }

    // Get text from the first declaration
    text = declarations[0].getText();
  } else {
    return [];
  }

  const matches = text.match(TOKEN_REGEX);
  return matches || [];
}

/**
 * Maps shorthand function names to the CSS properties they affect
 * @param functionName The name of the shorthand function (e.g., "borderColor" or "shorthands.borderColor")
 * @returns Array of CSS property names affected by this shorthand
 */
export function getPropertiesForShorthand(functionName: string): string[] {
  const shorthandMap: Record<string, string[]> = {
    // Border shorthands
    borderColor: ['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'],
    border: ['borderWidth', 'borderStyle', 'borderColor'],
    borderRadius: ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius'],

    // Padding/margin shorthands
    padding: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
    margin: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'],

    // Other common shorthands
    flex: ['flexGrow', 'flexShrink', 'flexBasis'],
    gap: ['rowGap', 'columnGap'],
    overflow: ['overflowX', 'overflowY'],
    gridArea: ['gridRowStart', 'gridColumnStart', 'gridRowEnd', 'gridColumnEnd'],
    inset: ['top', 'right', 'bottom', 'left'],
  };

  // Extract base function name if it's a qualified name (e.g., shorthands.borderColor -> borderColor)
  const baseName = functionName.includes('.') ? functionName.split('.').pop() : functionName;

  return baseName && shorthandMap[baseName!] ? shorthandMap[baseName!] : [];
}
