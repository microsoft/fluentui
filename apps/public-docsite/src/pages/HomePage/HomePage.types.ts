import { ITheme, IStyle, IStyleFunctionOrObject } from '@fluentui/react';
import { IPageProps } from '@fluentui/react-docsite-components/lib/index2';

export interface IHomePageProps extends IPageProps {
  theme?: ITheme;
  styles?: IStyleFunctionOrObject<IHomePageStyleProps, IHomePageStyles>;
}

export interface IHomePageStyleProps {
  theme: ITheme;
  className?: string;
  isMountedOffset: boolean;
  /** On this page, a *light* background is inverted and a dark background is normal. */
  isInverted?: boolean;
}

export interface IHomePageStyles {
  root: IStyle;
  heroSection: IStyle;
  heroTitle: IStyle;
  platformCardsSection: IStyle;
  platformsSection: IStyle;
  platformsTitle: IStyle;
  resourcesSection: IStyle;
  resourcesTitle: IStyle;
  usageSection: IStyle;
  usageTitle: IStyle;
  usageIconList: IStyle;
  usageIconListItem: IStyle;
  usageIcon: IStyle;
  sectionContent: IStyle;
  oneHalf: IStyle;
  oneThird: IStyle;
  oneFourth: IStyle;
  inner: IStyle;
  card: IStyle;
  cardTitle: IStyle;
  versionSwitcher: IStyle;
  cardList: IStyle;
  cardListItem: IStyle;
  cardIcon: IStyle;
  link: IStyle;
  linkDark: IStyle;
  linkIcon: IStyle;
  linkText: IStyle;
  illustration: IStyle;
}
