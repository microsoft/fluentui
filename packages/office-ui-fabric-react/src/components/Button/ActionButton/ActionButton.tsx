import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { BaseComponent, customizable, nullRender } from '../../../Utilities';
import { IButtonProps } from '../Button.Props';
import { getStyles } from './ActionButton.styles';

@customizable(['theme'])
export class ActionButton extends BaseComponent<IButtonProps, {}> {

  /**
   * Tell BaseComponent to bypass resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;

  public render() {
    let { styles, theme } = this.props;

    return (
      <BaseButton
        { ...this.props }
<<<<<<< HEAD
        variantClassName='ms-Button--action'
=======
        variantClassName='ms-Button--action ms-Button--command'
>>>>>>> 7141e63018997876d0c4f9d8dc6e420eb5f52db9
        styles={ getStyles(theme!, styles) }
        onRenderDescription={ nullRender }
      />
    );
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 7141e63018997876d0c4f9d8dc6e420eb5f52db9
