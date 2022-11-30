import { IEffects, ITheme } from '@fluentui/react';

// this exists so that both theme name and theme specifications can be accessed using fixed keys for easy iteration
export interface INamedTheme {
  humanFriendlyName: string;
  themeValues: ITheme;
}

export interface IExtendedEffects extends IEffects {
  roundedCorner8?: string;
  roundedCornerCircle?: string;
}
