import * as React from 'react';
import { ITextComponent } from './Text.types';

export const TextView: ITextComponent['view'] = props => {
  const {
    inline,
    className,
    color,
    family,
    as: RootType = 'span',
    size,
    variant,
    weight,
    wrap,
    classNames,
    children,
    content,
    ...rest
  } = props;

  // TODO: strengthen check on children existence similar to stardust (number/isNan, empty array, etc.)
  return (
    <RootType {...rest} className={classNames.root}>
      {children ? children : content}
    </RootType>
  );
};
