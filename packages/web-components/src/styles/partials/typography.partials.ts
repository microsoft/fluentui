import { css, CSSDirective } from '@microsoft/fast-element';
import {
  fontFamilyBase,
  fontSizeBase100,
  fontSizeBase200,
  fontSizeBase300,
  fontSizeBase400,
  fontSizeBase500,
  fontSizeBase600,
  fontSizeHero1000,
  fontSizeHero700,
  fontSizeHero800,
  fontSizeHero900,
  fontWeightBold,
  fontWeightRegular,
  fontWeightSemibold,
  lineHeightBase100,
  lineHeightBase200,
  lineHeightBase300,
  lineHeightBase400,
  lineHeightBase500,
  lineHeightBase600,
  lineHeightHero1000,
  lineHeightHero700,
  lineHeightHero800,
  lineHeightHero900,
} from '../../theme/design-tokens.js';

export const typographyBody1Styles: CSSDirective = css.partial`
  font-family: ${fontFamilyBase};
  font-size: ${fontSizeBase300};
  line-height: ${lineHeightBase300};
  font-weight: ${fontWeightRegular};
`;
export const typographyBody1StrongStyles: CSSDirective = css.partial`
  font-family: ${fontFamilyBase};
  font-size: ${fontSizeBase300};
  line-height: ${lineHeightBase300};
  font-weight: ${fontWeightSemibold};
`;

export const typographyBody1StrongerStyles: CSSDirective = css.partial`
  font-family: ${fontFamilyBase};
  font-size: ${fontSizeBase300};
  line-height: ${lineHeightBase300};
  font-weight: ${fontWeightBold};
`;

export const typographyBody2Styles: CSSDirective = css.partial`
  font-family: ${fontFamilyBase};
  font-size: ${fontSizeBase400};
  line-height: ${lineHeightBase400};
  font-weight: ${fontWeightRegular};
`;

export const typographyCaption1Styles: CSSDirective = css.partial`
  font-family: ${fontFamilyBase};
  font-size: ${fontSizeBase200};
  line-height: ${lineHeightBase200};
  font-weight: ${fontWeightRegular};
`;

export const typographyCaption1StrongStyles: CSSDirective = css.partial`
  font-family: ${fontFamilyBase};
  font-size: ${fontSizeBase200};
  line-height: ${lineHeightBase200};
  font-weight: ${fontWeightSemibold};
`;

export const typographyCaption1StrongerStyles: CSSDirective = css.partial`
  font-family: ${fontFamilyBase};
  font-size: ${fontSizeBase200};
  line-height: ${lineHeightBase200};
  font-weight: ${fontWeightBold};
`;
export const typographyCaption2Styles: CSSDirective = css.partial`
  font-family: ${fontFamilyBase};
  font-size: ${fontSizeBase100};
  line-height: ${lineHeightBase100};
  font-weight: ${fontWeightRegular};
`;

export const typographyCaption2StrongStyles: CSSDirective = css.partial`
  font-family: ${fontFamilyBase};
  font-size: ${fontSizeBase100};
  line-height: ${lineHeightBase100};
  font-weight: ${fontWeightSemibold};
`;

export const typographySubtitle1Styles: CSSDirective = css.partial`
  font-family: ${fontFamilyBase};
  font-size: ${fontSizeBase500};
  line-height: ${lineHeightBase500};
  font-weight: ${fontWeightSemibold};
`;

export const typographySubtitle2Styles: CSSDirective = css.partial`
  font-family: ${fontFamilyBase};
  font-size: ${fontSizeBase400};
  line-height: ${lineHeightBase400};
  font-weight: ${fontWeightSemibold};
`;

export const typographySubtitle2StrongerStyles: CSSDirective = css.partial`
  font-family: ${fontFamilyBase};
  font-size: ${fontSizeBase400};
  line-height: ${lineHeightBase400};
  font-weight: ${fontWeightBold};
`;

export const typographyTitle1Styles: CSSDirective = css.partial`
  font-family: ${fontFamilyBase};
  font-size: ${fontSizeHero800};
  line-height: ${lineHeightHero800};
  font-weight: ${fontWeightSemibold};
`;

export const typographyTitle2Styles: CSSDirective = css.partial`
  font-family: ${fontFamilyBase};
  font-size: ${fontSizeHero700};
  line-height: ${lineHeightHero700};
  font-weight: ${fontWeightSemibold};
`;

export const typographyTitle3Styles: CSSDirective = css.partial`
  font-family: ${fontFamilyBase};
  font-size: ${fontSizeBase600};
  line-height: ${lineHeightBase600};
  font-weight: ${fontWeightSemibold};
`;

export const typographyLargeTitleStyles: CSSDirective = css.partial`
  font-family: ${fontFamilyBase};
  font-size: ${fontSizeHero900};
  line-height: ${lineHeightHero900};
  font-weight: ${fontWeightSemibold};
`;

export const typographyDisplayStyles: CSSDirective = css.partial`
  font-family: ${fontFamilyBase};
  font-size: ${fontSizeHero1000};
  line-height: ${lineHeightHero1000};
  font-weight: ${fontWeightSemibold};
`;
