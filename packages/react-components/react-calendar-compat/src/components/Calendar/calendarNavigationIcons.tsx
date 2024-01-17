import * as React from 'react';
import { ArrowDownRegular, ArrowUpRegular, DismissRegular } from '@fluentui/react-icons';

export type CalendarNavigationIcons = {
  /**
   * Icon to use for up arrow navigation. Default comes from \@fluentui\/react-icons
   * @default ArrowUpRegular
   */
  upNavigation?: JSX.Element;

  /**
   * Icon to use for down arrow navigation. Default comes from \@fluentui\/react-icons
   * @default ArrowDownRegular
   */
  downNavigation?: JSX.Element;

  /**
   * Icon to use for the dismiss button. Default comes from \@fluentui\/react-icons
   * @default DismissRegular
   */
  dismiss?: JSX.Element;
};

export const defaultNavigationIcons: CalendarNavigationIcons = {
  dismiss: <DismissRegular />,
  downNavigation: <ArrowDownRegular />,
  upNavigation: <ArrowUpRegular />,
};
