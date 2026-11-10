import { TokenBoxes } from './TokenBoxes';
import { getBrandTokensFromPalette } from '../../utils/getBrandTokensFromPalette';
import type { BrandVariants, Theme } from '@fluentui/react-components';
import { createLightTheme } from '@fluentui/react-components';
export default { component: TokenBoxes };

const brand: BrandVariants = getBrandTokensFromPalette('#006bc7');
const lightTheme: Theme = createLightTheme(brand);

export const Default = { args: { theme: lightTheme, isDark: false } };
