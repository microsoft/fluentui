import * as React from 'react';
import { BaseComponent, divProperties, getNativeProps, customizable } from '../../Utilities';
import { classNamesFunction } from '../../Styling';
import { ILabelProps, ILabelStyleProps, ILabelStyles } from './Label.types';

const getClassNames = classNamesFunction<ILabelStyleProps, ILabelStyles>();
@customizable('Label', ['theme'])
export class LabelBase extends BaseComponent<ILabelProps, {}> {
  public render() {
    const {
      as: RootType = 'label',
      children,
      className,
      disabled,
      getStyles,
      required,
      theme
      } = this.props;
    const classNames = getClassNames(
      getStyles,
      {
        className,
        disabled,
        required,
        theme: theme!
      });
    return (
      <RootType
        { ...getNativeProps(this.props, divProperties) }
        className={ classNames.root }
      >
        { children }
      </RootType>
    );
  }
}
