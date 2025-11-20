import { tokens } from '@fluentui/react-components';

const EXPECTED_SEMANTIC_TOKENS = [] as const;
type ExpectedSemanticToken = (typeof EXPECTED_SEMANTIC_TOKENS)[number];

const TOKEN_TYPES = ['color', 'dimension'] as const;

type TokenType = (typeof TOKEN_TYPES)[number];

export interface TokenSchema {
  type: TokenType;
  /**
   * What's the name of the semantic token that we expect to exist? When semantic tokens v2
   * is released, our token should be replaced by this one.
   */
  semanticToken: ExpectedSemanticToken | null;
}

const BadgeTokens = {
  colorBrandForegroundCompound: { type: 'color', semanticToken: null },
} as const satisfies Record<string, TokenSchema>;

const ButtonTokens = {
  buttonPrimaryBackgroundColor: { type: 'color', semanticToken: null },
  buttonPrimaryBackgroundColorHover: { type: 'color', semanticToken: null },
  buttonSecondaryBackgroundColor: { type: 'color', semanticToken: null },
  buttonSecondaryBackgroundColorHover: { type: 'color', semanticToken: null },
  buttonSubtleBackgroundColor: { type: 'color', semanticToken: null },
  buttonSubtleBackgroundColorHover: { type: 'color', semanticToken: null },
  buttonOutlineBackgroundColor: { type: 'color', semanticToken: null },
  buttonOutlineBackgroundColorHover: { type: 'color', semanticToken: null },
  buttonTintBackgroundColor: { type: 'color', semanticToken: null },
  buttonTintBackgroundColorHover: { type: 'color', semanticToken: null },
} as const satisfies Record<string, TokenSchema>;

const CardTokens = {} as const satisfies Record<string, TokenSchema>;

const DialogTokens = {} as const satisfies Record<string, TokenSchema>;

const InputTokens = {} as const satisfies Record<string, TokenSchema>;

const MenuTokens = {} as const satisfies Record<string, TokenSchema>;

const TooltipTokens = {} as const satisfies Record<string, TokenSchema>;

export const CAPTokensSchema = {
  ...BadgeTokens,
  ...ButtonTokens,
  ...CardTokens,
  ...DialogTokens,
  ...InputTokens,
  ...MenuTokens,
  ...TooltipTokens,
} as const satisfies { [key: string]: TokenSchema };

export const CAPTokens = {
  ...(Object.keys(CAPTokensSchema).reduce((acc: any, key) => {
    return { ...acc, [key]: `var(--${key})` };
  }) as any),
} as Record<keyof typeof CAPTokensSchema, string>;

export type CAPTheme = {
  [k in keyof typeof CAPTokens]: string | null;
};

export const CAP_THEME = {
  buttonPrimaryBackgroundColor: tokens.colorBrandBackground,
  buttonPrimaryBackgroundColorHover: tokens.colorBrandBackgroundHover,
  buttonSecondaryBackgroundColor: null,
  buttonSecondaryBackgroundColorHover: null,
  buttonSubtleBackgroundColor: tokens.colorBrandBackground,
  buttonSubtleBackgroundColorHover: tokens.colorBrandBackground,
  buttonOutlineBackgroundColor: tokens.colorTransparentBackground,
  buttonOutlineBackgroundColorHover: tokens.colorTransparentBackground,
  buttonTintBackgroundColor: 'red',
  buttonTintBackgroundColorHover: null,
  // TODO: switch to BrandForegroundCompound when available
  colorBrandForegroundCompound: tokens.colorBrandForeground1,
} as const satisfies CAPTheme;

export const CAP_THEME_TEAMS = {
  ...CAP_THEME,
} as const satisfies CAPTheme;

export const CAP_THEME_ONE_DRIVE = {
  ...CAP_THEME,
} as const satisfies CAPTheme;

export const CAP_THEME_SHAREPOINT = {
  ...CAP_THEME,
} as const satisfies CAPTheme;
