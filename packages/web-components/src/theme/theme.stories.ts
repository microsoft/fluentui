import { DesignToken } from '@microsoft/fast-foundation/design-token.js';
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
    font-family: var(${tokens.fontFamilyBase});
    font-size: var(${tokens.fontSizeBase300});
    background: var(${tokens.colorBrandBackground});
    color: var(${tokens.colorNeutralForegroundOnBrand});
    border: var(${tokens.strokeWidthThicker}) solid var(${tokens.colorNeutralStroke1});
    padding: var(${tokens.spacingVerticalS}) var(${tokens.spacingHorizontalM});
    box-shadow: var(${tokens.shadow28});
  ">colorNeutralForegroundOnBrand on colorBrandBackground with shadow28</div>
</div>
`;
