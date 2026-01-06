import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { customizable, nullRender } from '../../../Utilities';
import { getStyles } from './DefaultButton.styles';
import type { IButtonProps } from '../Button.types';

import type { JSXElement } from '@fluentui/utilities';

/**
 * {@docCategory Button}
 */
@customizable('DefaultButton', ['theme', 'styles'], true)
export class DefaultButton extends React.Component<IButtonProps, {}> {
  public render(): JSXElement {
    const { primary = false, styles, theme } = this.props;

    return (
      <BaseButton
        {...this.props}
        variantClassName={primary ? 'ms-Button--primary' : 'ms-Button--default'}
        styles={getStyles(theme!, styles, primary)}
        onRenderDescription={nullRender}
      />
    );
  }
}
