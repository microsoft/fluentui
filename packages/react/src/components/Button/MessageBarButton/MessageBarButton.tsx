import * as React from 'react';
import { DefaultButton } from '../DefaultButton/DefaultButton';
import { customizable, nullRender } from '../../../Utilities';
import { IButtonProps } from '../Button.types';
import { getStyles } from './MessageBarButton.styles';

/**
 * {@docCategory MessageBar}
 */
@customizable('MessageBarButton', ['theme', 'styles'], true)
export class MessageBarButton extends React.Component<IButtonProps, {}> {
  public render(): JSX.Element {
    const { styles, theme } = this.props;

    return <DefaultButton {...this.props} styles={getStyles(theme!, styles)} onRenderDescription={nullRender} />;
  }
}
