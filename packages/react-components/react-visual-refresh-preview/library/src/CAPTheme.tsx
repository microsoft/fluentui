import { tokens } from '@fluentui/react-components';

const TOKEN_TYPES = ['color', 'length'] as const;

type TokenType = (typeof TOKEN_TYPES)[number];

export interface Token {
  type: TokenType;
}

export interface ControlSchema {
  name: string;
  tokens: Record<string, Token>;
}

const ButtonTokens = {
  buttonPrimaryBackgroundColor: { type: 'color' },
  buttonPrimaryBackgroundColorHover: { type: 'color' },
  buttonSecondaryBackgroundColor: { type: 'color' },
  buttonSecondaryBackgroundColorHover: { type: 'color' },
  buttonSubtleBackgroundColor: { type: 'color' },
  buttonSubtleBackgroundColorHover: { type: 'color' },
  buttonOutlineBackgroundColor: { type: 'color' },
  buttonOutlineBackgroundColorHover: { type: 'color' },
  buttonTintBackgroundColor: { type: 'color' },
  buttonTintBackgroundColorHover: { type: 'color' },
} as const satisfies Record<string, Token>;

export const CAPTokensSchema = {
  ...ButtonTokens,
} as const satisfies { [key: string]: Token };

export const CAPTokens = {
  ...(Object.keys(CAPTokensSchema).reduce((acc: any, key) => {
    return { ...acc, [key]: `var(--cap-${key})` };
  }) as any),
} as Record<keyof typeof CAPTokensSchema, string>;

export type CAPTheme = {
  [k in keyof typeof CAPTokens]: string;
};

export const CAP_THEME = {
  buttonPrimaryBackgroundColor: tokens.colorBrandBackground,
  buttonPrimaryBackgroundColorHover: tokens.colorBrandBackgroundHover,
  buttonSecondaryBackgroundColor: '#FAFAFA',
  buttonSecondaryBackgroundColorHover: '#F0F0F0', // NeutralBackground3.Hover
  buttonSubtleBackgroundColor: tokens.colorBrandBackground,
  buttonSubtleBackgroundColorHover: tokens.colorBrandBackground,
  buttonOutlineBackgroundColor: tokens.colorTransparentBackground,
  buttonOutlineBackgroundColorHover: tokens.colorTransparentBackground,
  buttonTintBackgroundColor: '',
  buttonTintBackgroundColorHover: '',
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
