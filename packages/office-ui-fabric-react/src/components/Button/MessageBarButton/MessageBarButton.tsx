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
  private _globalTheme: ITheme;

  constructor(props: IButtonProps) {
    super(props);

    this._globalTheme = getTheme();
  }

  public render(): JSX.Element {
    const { styles } = this.props;

    return (
      <DefaultButton
        {...this.props}
        styles={getStyles(this._globalTheme, styles)}
        theme={this._globalTheme}
        onRenderDescription={nullRender}
      />
    );
  }
}
