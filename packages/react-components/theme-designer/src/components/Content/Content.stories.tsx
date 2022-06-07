import { Content } from './Content';
import { getBrandTokensFromPalette } from '../../utils/getBrandTokensFromPalette';
import { createLightTheme, createDarkTheme } from '@fluentui/react-components';
export default { component: Content };

const brand = getBrandTokensFromPalette('#006BC7');
const lightTheme = createLightTheme(brand);
const darkTheme = createDarkTheme(brand);

export const Default = { args: { brand: brand, darkTheme: darkTheme, lightTheme: lightTheme } };
