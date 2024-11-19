import { EnhancedStyleAnalysis, TokenReference } from './types.js';

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
  conditions?: {
    isBase?: boolean;
    conditions?: string[];
  };
}

interface FormattedAnalysis {
  styles: {
    [styleName: string]: FormattedStyle;
  };
  metadata: {
    styleConditions: {
      [styleName: string]: {
        isBase?: boolean;
        conditions?: string[];
      };
    };
  };
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

function formatAnalysis(analysis: EnhancedStyleAnalysis): FormattedAnalysis {
  const formattedAnalysis: FormattedAnalysis = {
    styles: {},
    metadata: analysis.metadata,
  };

  Object.entries(analysis.styles).forEach(([styleName, value]) => {
    if (styleName.includes('.')) {
      return; // Skip nested entries that will be handled by their parents
    }

    const formattedStyle: FormattedStyle = {
      tokens: [],
    };

    // Process direct tokens
    const directTokens = value.tokens.filter(t => !t.property.startsWith(':') && !t.path.length);

    if (directTokens.length) {
      formattedStyle.tokens = formatTokenReferences(directTokens);
    }

    // Process pseudo-selectors and nested styles
    // ... (rest of the formatting logic remains the same)

    // Add conditions from metadata if they exist
    if (analysis.metadata.styleConditions[styleName]) {
      formattedStyle.conditions = analysis.metadata.styleConditions[styleName];
    }

    formattedAnalysis.styles[styleName] = formattedStyle;
  });

  return formattedAnalysis;
}

export { formatAnalysis };
export type { FormattedAnalysis, FormattedStyle, FormattedTokenReference };
