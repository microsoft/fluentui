import * as React from 'react';
import { DefaultButton } from '../DefaultButton/DefaultButton';
import { BaseComponent, customizable, nullRender } from '../../../Utilities';
import { IButtonProps } from '../Button.types';
import { getStyles } from './MessageBarButton.styles';
import { ITheme, getTheme } from '../../../Styling';

/**
 * {@docCategory MessageBar}
 */
@customizable('MessageBarButton', ['theme', 'styles'], true)
export class MessageBarButton extends BaseComponent<IButtonProps, {}> {
  public render(): JSX.Element {
    const { styles } = this.props;
    const theme: ITheme = getTheme();

    return <DefaultButton {...this.props} styles={getStyles(theme, styles)} theme={theme} onRenderDescription={nullRender} />;
  }
}
