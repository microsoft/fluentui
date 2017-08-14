import * as React from 'react';
import { BaseButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { BaseComponent, customizable, nullRender } from 'office-ui-fabric-react/lib/Utilities';
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
        variantClassName='ms-Button--action'
        styles={ getStyles(theme!, styles) }
        onRenderDescription={ nullRender }
      />
    );
  }
}
