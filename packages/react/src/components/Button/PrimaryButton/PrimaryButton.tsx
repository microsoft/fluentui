import * as React from 'react';
import { customizable, nullRender } from '../../../Utilities';
import { DefaultButton } from '../DefaultButton/DefaultButton';
import type { IButtonProps } from '../Button.types';

import type { JSXElement } from '@fluentui/utilities';

/**
 * {@docCategory Button}
 */
@customizable('PrimaryButton', ['theme', 'styles'], true)
export class PrimaryButton extends React.Component<IButtonProps, {}> {
  public render(): JSXElement {
    return <DefaultButton {...this.props} primary={true} onRenderDescription={nullRender} />;
  }
}
