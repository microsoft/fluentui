import { Content } from './Content';
import { getBrandTokensFromPalette } from '../../utils/getBrandTokensFromPalette';
import { createLightTheme } from '@fluentui/react-components';
export default { component: Content };

const brand = getBrandTokensFromPalette('#006BC7');
const lightTheme = createLightTheme(brand);

export const Default = { args: { brand: brand, theme: lightTheme, isDark: false } };
