import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { customizable, nullRender } from '../../../Utilities';
import { IButtonProps } from '../Button.types';
import { getStyles } from './CommandBarButton.styles';

/**
 * {@docCategory Button}
 */
@customizable('CommandBarButton', ['theme', 'styles'], true)
export class CommandBarButton extends React.Component<IButtonProps, {}> {
  public render(): JSX.Element {
    const { styles, theme } = this.props;

    return (
      <BaseButton
        {...this.props}
        variantClassName="ms-Button--commandBar"
        styles={getStyles(theme!, styles)}
        onRenderDescription={nullRender}
      />
    );
  }
}
