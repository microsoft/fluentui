import * as React from 'react';
import { BaseComponent, divProperties, getNativeProps } from '../../Utilities';
import { classNamesFunction } from '../../Utilities';
import { ILabelProps, ILabelStyleProps, ILabelStyles } from './Label.types';

const getClassNames = classNamesFunction<ILabelStyleProps, ILabelStyles>();
export class LabelBase extends BaseComponent<ILabelProps, {}> {
  public render(): JSX.Element {
    const { as: RootType = 'label', children, className, disabled, styles, required, theme } = this.props;
    const classNames = getClassNames(styles, {
      className,
      disabled,
      required,
      theme: theme!
    });
    return (
      <RootType {...getNativeProps(this.props, divProperties)} className={classNames.root}>
        {children}
      </RootType>
    );
  }
}
