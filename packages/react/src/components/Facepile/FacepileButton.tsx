import * as React from 'react';
import { BaseButton } from '../../Button';
import { customizable, nullRender } from '../../Utilities';
import { getStyles } from './FacepileButton.styles';
import type { IButtonProps } from '../../Button';

@customizable('FacepileButton', ['theme', 'styles'], true)
export class FacepileButton extends React.Component<IButtonProps, {}> {
  public render(): JSX.Element {
    const { className, styles, ...rest } = this.props;

    const customStyles = getStyles(this.props.theme!, className, styles);

    return (
      <BaseButton
        {...rest}
        variantClassName="ms-Button--facepile"
        styles={customStyles}
        onRenderDescription={nullRender}
      />
    );
  }
}
