import { StaticStyles } from '@fluentui/styles';

import { globalStyles } from './globalStyles';
import { normalizeCSS } from './normalizeCSS';

export const staticStyles: StaticStyles = [normalizeCSS, globalStyles];
