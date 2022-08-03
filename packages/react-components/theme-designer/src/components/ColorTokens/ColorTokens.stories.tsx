import { createLightTheme } from '@fluentui/react-components';
import { getBrandTokensFromPalette } from '../../utils/getBrandTokensFromPalette';
import { ColorTokens } from './ColorTokens';
export default { component: ColorTokens };

const brand = getBrandTokensFromPalette('#006BC7');
const lightTheme = createLightTheme(brand);

export const Default = { args: { theme: lightTheme } };
