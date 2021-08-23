import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { customizable, nullRender } from '../../../Utilities';
import { getStyles } from './ActionButton.styles';
import type { IButtonProps } from '../Button.types';

/**
 * {@docCategory Button}
 */
@customizable('ActionButton', ['theme', 'styles'], true)
export class ActionButton extends React.Component<IButtonProps, {}> {
  public render(): JSX.Element {
    const { styles, theme } = this.props;

    return (
      <BaseButton
        {...this.props}
        variantClassName="ms-Button--action ms-Button--command"
        styles={getStyles(theme!, styles)}
        onRenderDescription={nullRender}
      />
    );
  }
}
