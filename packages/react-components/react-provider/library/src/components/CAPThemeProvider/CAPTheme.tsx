import { tokens } from '@fluentui/react-components';

const TOKEN_TYPES = ['color', 'length'] as const;

type TokenType = (typeof TOKEN_TYPES)[number];

export interface TokenSchema {
  type: TokenType;
}

const ColorTokenSchema = { type: 'color' } as const satisfies TokenSchema;

const BadgeTokens = {
  colorBrandForegroundCompound: ColorTokenSchema,
} as const satisfies Record<string, TokenSchema>;

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
    return { ...acc, [key]: `var(--${key})` };
  }) as any),
} as Record<keyof typeof CAPTokensSchema, string>;

export type CAPTheme = {
  [k in keyof typeof CAPTokens]: string;
};

function token(t: {
  semanticToken: string | null;
  fluentV9Token: keyof typeof tokens | null;
  fallbackValue?: string;
}): string {
  const parts = [
    t.semanticToken ? `var(--${t.semanticToken})` : undefined,
    t.fluentV9Token ? tokens[t.fluentV9Token] : undefined,
    t.fallbackValue,
  ];
  let cssVar = '';
  for (const part of parts) {
    if (!part) continue;
    if (cssVar.startsWith('var(')) {
      cssVar = cssVar.replace(/\)$/, `, ${part})`);
    } else {
      cssVar += part;
    }
  }
  return cssVar;
}

export const CAP_THEME = {
  buttonPrimaryBackgroundColor: token({
    semanticToken: 'foobar',
    fluentV9Token: 'colorBrandBackground',
  }),
  buttonPrimaryBackgroundColorHover: token({
    semanticToken: null,
    fluentV9Token: 'colorBrandBackgroundHover',
  }),
  buttonSecondaryBackgroundColor: token({
    semanticToken: null,
    fluentV9Token: null,
    fallbackValue: '#FAFAFA',
  }),
  buttonSecondaryBackgroundColorHover: token({
    semanticToken: null,
    fluentV9Token: null,
    fallbackValue: '#F0F0F0', // NeutralBackground3
  }),
  buttonSubtleBackgroundColor: token({
    semanticToken: null,
    fluentV9Token: 'colorBrandBackground',
  }),
  buttonSubtleBackgroundColorHover: token({
    semanticToken: null,
    fluentV9Token: 'colorBrandBackground',
  }),
  buttonOutlineBackgroundColor: token({
    semanticToken: null,
    fluentV9Token: 'colorTransparentBackground',
  }),
  buttonOutlineBackgroundColorHover: token({
    semanticToken: null,
    fluentV9Token: 'colorTransparentBackground',
  }),
  buttonTintBackgroundColor: token({
    semanticToken: null,
    fluentV9Token: null,
    fallbackValue: 'red',
  }),
  buttonTintBackgroundColorHover: token({
    semanticToken: null,
    fluentV9Token: null,
    fallbackValue: '',
  }),
  // TODO: switch to BrandForegroundCompound when available
  colorBrandForegroundCompound: token({
    semanticToken: null,
    fluentV9Token: 'colorBrandForeground1',
  }),
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
