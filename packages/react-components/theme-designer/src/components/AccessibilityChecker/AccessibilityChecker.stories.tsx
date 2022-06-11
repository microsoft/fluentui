import { AccessibilityChecker } from './AccessibilityChecker';
import { getBrandTokensFromPalette } from '../../utils/getBrandTokensFromPalette';
import { createDarkTheme } from '@fluentui/react-components';
export default { component: AccessibilityChecker };

const brand = getBrandTokensFromPalette('#006bc7');
const lightTheme = createDarkTheme(brand);

export const Default = { args: { theme: lightTheme } };
