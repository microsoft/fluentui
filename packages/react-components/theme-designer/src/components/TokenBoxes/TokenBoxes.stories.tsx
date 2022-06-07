import { TokenBoxes } from './TokenBoxes';
import { getBrandTokensFromPalette } from '../../utils/getBrandTokensFromPalette';
import { createLightTheme } from '@fluentui/react-components';
export default { component: TokenBoxes };

const brand = getBrandTokensFromPalette('#006BC7');
const lightTheme = createLightTheme(brand);

export const Default = { theme: lightTheme, isDark: false };
