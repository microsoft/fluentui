import { Palette } from './Palette';
import { getBrandTokensFromPalette } from '../../utils/getBrandTokensFromPalette';
export default { component: Palette };

const brand = getBrandTokensFromPalette('#006BC7');

export const Default = { args: { brandColors: brand } };
