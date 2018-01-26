import * as React from 'react';

import {
  BaseComponent,
  warn
} from '../../Utilities';
import { ITextField, ITextFieldProps } from './TextField.types';
import { DefaultTextField } from './DefaultTextField/DefaultTextField';

export class TextField extends BaseComponent<ITextFieldProps, {}> {
  /**
   * Set this BaseComponent._resolveComponentRef to false, bypassing resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;

  constructor(props: ITextFieldProps) {
    super(props);

    warn(
      `The TextField component has been deprecated. Use specific variants instead. ` +
      `(DefaultTextField, MaskedTextField, etc.)`
    );
  }

  public render() {
    const props = this.props;

    return <DefaultTextField { ...props } />;
  }
}
