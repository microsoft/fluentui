import * as tokens from '../theme/design-tokens.js';

export default {
  title: 'Theme/Tokens',
};

export const Tokens = () => `
<div>
  <h3>Theme Tokens</h3>
  <p>Debug story which uses theme tokens to style the element below.</p>
  <div style="
    font-family: ${tokens.fontFamilyBase};
    font-size: ${tokens.fontSizeBase300};
    background: ${tokens.colorBrandBackground};
    color: ${tokens.colorNeutralForegroundOnBrand};
    border: ${tokens.strokeWidthThicker} solid ${tokens.colorNeutralStroke1};
    padding: ${tokens.spacingVerticalS} ${tokens.spacingHorizontalM};
    box-shadow: ${tokens.shadow28};
  ">colorNeutralForegroundOnBrand on colorBrandBackground with shadow28</div>
</div>
`;
