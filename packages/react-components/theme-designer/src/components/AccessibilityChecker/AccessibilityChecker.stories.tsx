import { AccessibilityChecker } from './AccessibilityChecker';
import { getBrandTokensFromPalette } from '../../utils/getBrandTokensFromPalette';
import { createLightTheme } from '@fluentui/react-components';
export default { component: AccessibilityChecker };

const brand = getBrandTokensFromPalette('#006bc7');
const lightTheme = createLightTheme(brand);

export const Default = { args: { theme: lightTheme } };
