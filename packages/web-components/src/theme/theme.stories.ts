import { DesignToken } from '@microsoft/fast-foundation';
import * as tokens from '../theme/design-tokens.js';

DesignToken.registerDefaultStyleTarget();

export default {
  title: 'Theme/Tokens',
};

export const Tokens = () => `
<div>
  <h3>Theme Tokens</h3>
  <p>Debug story which uses theme tokens to style the element below.</p>
  <div style="
    font-family: ${tokens.fontFamilyBase.createCSS()};
    font-size: ${tokens.fontSizeBase300.createCSS()};
    background: var(${tokens.colorBrandBackground.cssCustomProperty});
    color: ${tokens.colorNeutralForegroundOnBrand.createCSS()};
    border: ${tokens.strokeWidthThicker.createCSS()} solid ${tokens.colorNeutralStroke1.createCSS()};
    padding: ${tokens.spacingVerticalS.createCSS()} ${tokens.spacingHorizontalM.createCSS()};
    box-shadow: ${tokens.shadow28.createCSS()};
  ">colorNeutralForegroundOnBrand on colorBrandBackground with shadow28</div>
</div>
`;
