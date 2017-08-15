import * as React from 'react';
import { BaseButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { BaseComponent, customizable, nullRender } from 'office-ui-fabric-react/lib/Utilities';
import { ThemeSettingName } from 'office-ui-fabric-react/lib/Styling';
import { getStyles } from './CommandButton.styles';

@customizable([ThemeSettingName])
export class CommandButton extends BaseComponent<IButtonProps, {}> {
  /**
   * Tell BaseComponent to bypass resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;

  public render() {
    let { styles, theme } = this.props;

    return (
      <BaseButton
        { ...this.props }
        variantClassName='ms-Button--command'
        styles={ getStyles(theme!, styles) }
        onRenderDescription={ nullRender }
      />
    );
  }
}
