import * as React from 'react';
import { DefaultButton } from '../DefaultButton/DefaultButton';
import { BaseComponent, customizable, nullRender } from '../../../Utilities';
import { IButtonProps } from '../Button.Props';
import { getStyles } from './MessageBarButton.styles';

@customizable('MessageBarButton', ['theme'])
export class MessageBarButton extends BaseComponent<IButtonProps, {}> {

  public render() {
    let { styles, theme } = this.props;

    return (
      <DefaultButton
        { ...this.props }
        styles={ getStyles(theme!, styles) }
        onRenderDescription={ nullRender }
      />
    );
  }
}