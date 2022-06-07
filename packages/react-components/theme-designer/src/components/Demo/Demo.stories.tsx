import { Demo } from './Demo';
import { getBrandTokensFromPalette } from '../../utils/getBrandTokensFromPalette';
import { createLightTheme } from '@fluentui/react-components';
export default { component: Demo };

const brand = getBrandTokensFromPalette('#006BC7');
const lightTheme = createLightTheme(brand);

export const Default = { theme: lightTheme };
