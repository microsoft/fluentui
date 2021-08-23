import { globalStyles } from './globalStyles';
import { normalizeCSS } from './normalizeCSS';
import type { StaticStyles } from '@fluentui/styles';

export const staticStyles: StaticStyles = [normalizeCSS, globalStyles];
