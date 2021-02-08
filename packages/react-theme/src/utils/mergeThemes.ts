import { merge } from '@fluentui/utilities';
import { PartialTheme, Theme } from '../types';

export function mergeThemes(a: Theme, b: PartialTheme | Theme): Theme {
  return merge(a, b) as Theme;
}
