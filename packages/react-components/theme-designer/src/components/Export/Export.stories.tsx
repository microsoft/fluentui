import { Export } from './Export';
import { getBrandTokensFromPalette } from '../../utils/getBrandTokensFromPalette';
export default { component: Export };

const brand = getBrandTokensFromPalette('#006BC7');

export const Default = { args: { brand: brand, isLightTheme: true } };
