import { ITheme, IStyle, IStyleFunctionOrObject } from '@fluentui/react';
import { IPageProps } from '@fluentui/react-docsite-components/lib/index2';
import { Platforms } from '../../../interfaces/Platforms';

export interface IThemeSlotsPageProps extends IPageProps<Platforms> {
  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IThemeSlotsPageStyleProps, IThemeSlotsPageStyles>;

  /**
   * Additional CSS class(es) to apply to the PieChart.
   */
  className?: string;
}

export interface IThemeSlotsPageStyleProps extends Pick<IThemeSlotsPageProps, 'theme' | 'className'> {}

export interface IThemeSlotsPageStyles {
  root: IStyle;
}
