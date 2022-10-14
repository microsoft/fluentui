import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { customizable, nullRender } from '../../../Utilities';
import { getStyles } from './DefaultButton.styles';
import type { IButtonProps } from '../Button.types';
import { getTokenStyles } from './DefaultButton.tokenStyles';
import { DesignTokensContext } from '../../../Theme';

/**
 * {@docCategory Button}
 */
@customizable('DefaultButton', ['theme', 'styles'], true)
export class DefaultButton extends React.Component<IButtonProps, {}> {
  public render(): JSX.Element {
    const { primary = false, styles, theme } = this.props;

    return (
      <DesignTokensContext.Consumer>
        {context => (
          <BaseButton
            {...this.props}
            variantClassName={primary ? 'ms-Button--primary' : 'ms-Button--default'}
            styles={context?.styleWithDesignTokens ? getTokenStyles(theme!, styles) : getStyles(theme!, styles)}
            onRenderDescription={nullRender}
          />
        )}
      </DesignTokensContext.Consumer>
    );
  }
}
