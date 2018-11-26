import * as React from 'react';
import { ITextComponent } from './Text.types';

export const TextView: ITextComponent['view'] = props => {
  const { inline, className, color, family, as: RootType = 'span', size, variant, weight, wrap, classNames, ...rest } = props;

  return <RootType {...rest} className={classNames.root} />;
};
