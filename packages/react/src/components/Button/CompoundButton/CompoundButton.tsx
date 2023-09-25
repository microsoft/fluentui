import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { customizable } from '../../../Utilities';
import { getStyles } from './CompoundButton.styles';
import type { IButtonProps } from '../Button.types';

/**
 * {@docCategory Button}
 */
@customizable('CompoundButton', ['theme', 'styles'], true)
export class CompoundButton extends React.Component<IButtonProps, {}> {
  public render(): JSX.Element {
    const { primary = false, styles, theme } = this.props;
    return (
      <BaseButton
        {...this.props}
        variantClassName={primary ? 'ms-Button--compoundPrimary' : 'ms-Button--compound'}
        styles={getStyles(theme!, styles, primary)}
      />
    );
  }
}
