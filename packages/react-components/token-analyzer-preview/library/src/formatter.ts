import { StyleAnalysis, TokenReference } from './types.js';

interface FormattedTokenReference {
  property: string;
  token: string;
  fromVariable?: boolean;
  sourceFile?: string;
}

interface FormattedStyle {
  tokens: FormattedTokenReference[];
  pseudoSelectors?: {
    [selector: string]: FormattedTokenReference[];
  };
  nested?: {
    [selector: string]: FormattedStyle;
  };
}

interface FormattedAnalysis {
  [styleName: string]: FormattedStyle;
}

function formatTokenReferences(tokens: TokenReference[]): FormattedTokenReference[] {
  return tokens.map(t => ({
    property: t.property,
    token: t.token,
    ...(t.isVariableReference && {
      fromVariable: true,
      sourceFile: t.sourceFile,
    }),
  }));
}

function formatAnalysis(analysis: StyleAnalysis): FormattedAnalysis {
  const result: FormattedAnalysis = {};

  Object.entries(analysis).forEach(([styleName, value]) => {
    // Skip duplicate entries that will be handled in nested structures
    if (styleName.includes('.')) {
      return;
    }

    const formattedStyle: FormattedStyle = {
      tokens: [],
    };

    // Process direct tokens
    const directTokens = value.tokens.filter(
      t =>
        !t.property.startsWith(':') && // Not a pseudo-selector
        !t.path.length, // Not a nested property
    );

    if (directTokens.length) {
      formattedStyle.tokens = formatTokenReferences(directTokens);
    }

    // Process pseudo-selectors
    const pseudoTokens = value.tokens.filter(t => t.property.startsWith(':'));
    if (pseudoTokens.length) {
      formattedStyle.pseudoSelectors = {};
      pseudoTokens.forEach(token => {
        if (!formattedStyle.pseudoSelectors![token.property]) {
          formattedStyle.pseudoSelectors![token.property] = [];
        }
        formattedStyle.pseudoSelectors![token.property].push({
          property: token.property,
          token: token.token,
          ...(token.isVariableReference && {
            fromVariable: true,
            sourceFile: token.sourceFile,
          }),
        });
      });
    }

    // Process nested styles
    if (value.nested) {
      formattedStyle.nested = {};
      Object.entries(value.nested).forEach(([nestedName, nestedValue]) => {
        // Skip pseudo-selectors as they're handled separately
        if (!nestedName.startsWith(':')) {
          formattedStyle.nested![nestedName] = {
            tokens: formatTokenReferences(nestedValue.tokens.filter(t => !t.property.startsWith(':'))),
          };

          // Handle pseudo-selectors in nested styles
          const nestedPseudoTokens = nestedValue.tokens.filter(t => t.property.startsWith(':'));
          if (nestedPseudoTokens.length) {
            formattedStyle.nested![nestedName].pseudoSelectors = {};
            nestedPseudoTokens.forEach(token => {
              if (!formattedStyle.nested![nestedName].pseudoSelectors![token.property]) {
                formattedStyle.nested![nestedName].pseudoSelectors![token.property] = [];
              }
              formattedStyle.nested![nestedName].pseudoSelectors![token.property].push({
                property: token.property,
                token: token.token,
                ...(token.isVariableReference && {
                  fromVariable: true,
                  sourceFile: token.sourceFile,
                }),
              });
            });
          }
        }
      });
    }

    result[styleName] = formattedStyle;
  });

  return result;
}

export { formatAnalysis };
export type { FormattedAnalysis, FormattedStyle, FormattedTokenReference };
