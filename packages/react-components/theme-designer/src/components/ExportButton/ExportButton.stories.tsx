import { ExportButton } from './ExportButton';
import { getBrandTokensFromPalette } from '../../utils/getBrandTokensFromPalette';
export default { component: ExportButton };

const brand = getBrandTokensFromPalette('#006BC7');

export const Default = { args: { brand: brand, isLightTheme: true } };
