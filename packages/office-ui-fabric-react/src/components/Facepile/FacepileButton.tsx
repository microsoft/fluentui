import * as React from 'react';
import { BaseComponent } from '../../Utilities';
import { BaseButton, IButtonProps } from '../../Button';
import { getTheme } from '../../Styling';
import { getStyles } from '../Button/_base/Button.base.styles';

export class FacepileButton extends BaseComponent<IButtonProps, {}> {

  public render() {
    //const baseButtonStyles = getStyles(getTheme());

    return (
      <BaseButton
        { ...this.props }
      // @TODO fix getStyles
      //styles={ baseButtonStyles }
      />
    );
  }

}
