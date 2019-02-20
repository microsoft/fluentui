/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 */

import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import * as React from 'react';
import { getSidebarButtonStyles } from './SidebarButton.styles';

export class SidebarButton extends BaseComponent<IButtonProps, {}> {
  public render(): JSX.Element {
    const { styles, theme } = this.props;

    return <DefaultButton {...this.props} styles={getSidebarButtonStyles(theme!, styles)} />;
  }
}
