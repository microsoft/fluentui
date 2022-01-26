import * as React from 'react';
import { divProperties, getNativeProps } from '../../Utilities';
import { classNamesFunction } from '../../Utilities';
import type { ILabelProps, ILabelStyleProps, ILabelStyles } from './Label.types';

const getClassNames = classNamesFunction<ILabelStyleProps, ILabelStyles>({
  // Label is used a lot by other components.
  // It's likely to see expected cases which pass different className to the Label.
  // Therefore setting a larger cache size.
  cacheSize: 100,
});

export class LabelBase extends React.Component<ILabelProps, {}> {
  public render(): JSX.Element {
    const { as: RootType = 'label', children, className, disabled, styles, required, theme } = this.props;
    const classNames = getClassNames(styles, {
      className,
      disabled,
      required,
      theme: theme!,
    });
    return (
      <RootType {...getNativeProps(this.props, divProperties)} className={classNames.root}>
        {children}
      </RootType>
    );
  }
}
