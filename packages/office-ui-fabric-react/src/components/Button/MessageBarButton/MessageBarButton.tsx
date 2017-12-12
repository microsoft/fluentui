import * as React from 'react';
import { DefaultButton } from '../DefaultButton/DefaultButton';
import { BaseComponent, customizable, nullRender } from '../../../Utilities';
import { IButtonBaseProps } from '../_base/Button.base.types';
import { getStyles } from './MessageBarButton.styles';

@customizable('MessageBarButton', ['theme'])
export class MessageBarButton extends BaseComponent<IButtonBaseProps, {}> {

  public render() {
    let { theme } = this.props;

    return (
      <DefaultButton
        // { ...this.props }
        // styles={ getStyles(theme!, styles) }
        onRenderDescription={ nullRender }
      />
    );
  }
}