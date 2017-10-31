import * as React from 'react';
import { BaseComponent } from '../../Utilities';
import { BaseButton, IButtonProps } from '../../Button';
import { getTheme } from '../../Styling';
import { getStyles } from '../Button/BaseButton.styles';

export class FacepileButton extends BaseComponent<IButtonProps, {}> {

  public render() {
    const baseButtonStyles = getStyles(getTheme());

    return (
      <BaseButton
        { ...this.props }
        styles={ baseButtonStyles }
      />
    );
  }

}
