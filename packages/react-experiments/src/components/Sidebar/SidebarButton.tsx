/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 */

import { DefaultButton } from '@fluentui/react/lib/Button';
import * as React from 'react';
import { getSidebarButtonStyles } from './SidebarButton.styles';
import type { IButtonProps } from '@fluentui/react/lib/Button';

export const SidebarButton: React.FunctionComponent<IButtonProps> = props => {
  const { styles, theme } = props;

  return <DefaultButton {...props} styles={getSidebarButtonStyles(theme!, styles)} />;
};
