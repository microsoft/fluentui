import * as React from 'react';
import { BaseButton, IButtonProps } from '../../Button';
import { BaseComponent, customizable, nullRender } from '../../Utilities';
import { getStyles } from './FacepileButton.styles';

@customizable('FacepileButton', ['theme', 'styles'], true)
export class FacepileButton extends BaseComponent<IButtonProps, {}> {
  /**
   * Tell BaseComponent to bypass resolution of componentRef.
   */
  protected _skipComponentRefResolution = true;

  public render(): JSX.Element {
    const { theme, className, styles } = this.props;

    const customStyles = getStyles(theme!, className, styles);

    return (
      <BaseButton
        {...this.props}
        variantClassName="ms-Button--facepile"
        className=""
        styles={customStyles}
        onRenderDescription={nullRender}
      />
    );
  }
}
