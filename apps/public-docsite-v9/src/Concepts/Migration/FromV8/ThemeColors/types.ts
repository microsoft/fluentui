export type ColorKind = 'v8-semantic' | 'v8-palette' | 'v9-alias' | 'v9-global';

export type ColorInfo = {
  name: string;
  colorName?: string;
  colorValue?: string;
  kind: ColorKind;
};

export type ColorMap = {
  v8Semantic: Record<string, string>;
  v9Alias: Record<string, string>;
};

export type ColorCompareInfo = {
  name: string;
  match?: string;
  comment?: string;
  considered?: { name: string; comment?: string }[];
  kind: ColorKind;
};
