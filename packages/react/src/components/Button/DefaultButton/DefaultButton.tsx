import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { customizable, nullRender, getRTL } from '../../../Utilities';
import { IButtonProps } from '../Button.types';
import { getStyles } from './DefaultButton.styles';

/**
 * {@docCategory Button}
 */
@customizable('DefaultButton', ['theme', 'styles'], true)
export class DefaultButton extends React.Component<IButtonProps, {}> {
  public render(): JSX.Element {
    const { primary = false, styles: stylesProp, theme } = this.props;
    const rtl = getRTL();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const styles = getStyles(theme!, stylesProp, primary, rtl);

    return (
      <BaseButton
        {...this.props}
        variantClassName={primary ? 'ms-Button--primary' : 'ms-Button--default'}
        styles={styles}
        onRenderDescription={nullRender}
      />
    );
  }
}
