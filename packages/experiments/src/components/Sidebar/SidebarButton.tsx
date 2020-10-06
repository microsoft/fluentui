/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 */

import { DefaultButton, IButtonProps } from '@fluentui/react/lib/Button';
import * as React from 'react';
import { getSidebarButtonStyles } from './SidebarButton.styles';

export const SidebarButton: React.FunctionComponent<IButtonProps> = props => {
  const { styles, theme } = props;

  return <DefaultButton {...props} styles={getSidebarButtonStyles(theme!, styles)} />;
};
