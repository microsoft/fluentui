import { ITheme, IStyle, IStyleFunctionOrObject } from 'office-ui-fabric-react';
import { IPageProps } from '@uifabric/example-app-base/lib/index2';

export interface IHomePageProps extends IPageProps {
  theme?: ITheme;
  styles?: IStyleFunctionOrObject<IHomePageStyleProps, IHomePageStyles>;
}

export interface IHomePageStyleProps {
  theme: ITheme;
  className?: string;
  isMountedOffset: boolean;
  isInverted?: boolean;
  beforeColor?: string;
  afterColor?: string;
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
  oneFourth: IStyle;
  inner: IStyle;
  card: IStyle;
  cardTitle: IStyle;
  cardList: IStyle;
  cardListItem: IStyle;
  cardIcon: IStyle;
  link: IStyle;
  linkIcon: IStyle;
  linkText: IStyle;
  placeholder: IStyle;
}
