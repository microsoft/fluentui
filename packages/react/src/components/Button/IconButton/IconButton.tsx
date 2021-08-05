import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { customizable, nullRender } from '../../../Utilities';
import { IButtonProps } from '../Button.types';
import { getStyles } from './IconButton.styles';

/**
 * {@docCategory Button}
 */
@customizable('IconButton', ['theme', 'styles'], true)
export class IconButton extends React.Component<IButtonProps, {}> {
  public render(): JSX.Element {
    const { styles, theme } = this.props;

    return (
      <BaseButton
        {...this.props}
        variantClassName="ms-Button--icon"
        styles={getStyles(theme!, styles)}
        onRenderText={nullRender}
        onRenderDescription={nullRender}
      />
    );
  }
}
