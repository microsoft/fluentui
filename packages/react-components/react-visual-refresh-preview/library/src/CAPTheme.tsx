import { tokens } from '@fluentui/react-components';

const TOKEN_TYPES = ['color', 'length'] as const;

type TokenType = (typeof TOKEN_TYPES)[number];

export interface TokenSchema {
  type: TokenType;
}

const ColorTokenSchema = { type: 'color' } as const satisfies TokenSchema;

const BadgeTokens = {} as const satisfies Record<string, TokenSchema>;

const ButtonTokens = {
  buttonPrimaryBackgroundColor: ColorTokenSchema,
  buttonPrimaryBackgroundColorHover: ColorTokenSchema,
  buttonSecondaryBackgroundColor: ColorTokenSchema,
  buttonSecondaryBackgroundColorHover: ColorTokenSchema,
  buttonSubtleBackgroundColor: ColorTokenSchema,
  buttonSubtleBackgroundColorHover: ColorTokenSchema,
  buttonOutlineBackgroundColor: ColorTokenSchema,
  buttonOutlineBackgroundColorHover: ColorTokenSchema,
  buttonTintBackgroundColor: ColorTokenSchema,
  buttonTintBackgroundColorHover: ColorTokenSchema,
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
  buttonTintBackgroundColor: 'red',
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
