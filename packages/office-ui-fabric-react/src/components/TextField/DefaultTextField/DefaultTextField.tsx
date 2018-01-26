import * as React from 'react';
import { BaseTextField } from '../BaseTextField';
import { ITextFieldProps } from '../TextField.types';
import {
  BaseComponent,
} from '../../../Utilities';

export class DefaultTextField extends BaseComponent<ITextFieldProps, {}> {
  /**
   * Tell BaseComponent to bypass resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;

  public render() {
    return (
      <BaseTextField
        { ...this.props }
      />
    );
  }
}
