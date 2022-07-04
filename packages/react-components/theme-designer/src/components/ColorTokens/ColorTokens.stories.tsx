import { ColorTokens } from './ColorTokens';
import { getBrandTokensFromPalette } from '../../utils/getBrandTokensFromPalette';
export default { component: ColorTokens };

const brand = getBrandTokensFromPalette('#006bc7');

export const Default = { args: { brand: brand, isDark: false } };
