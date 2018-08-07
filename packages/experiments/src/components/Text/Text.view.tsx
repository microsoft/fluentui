import * as React from 'react';
import { IViewComponentProps } from '../../Foundation';
import { ITextProps, ITextStyles } from './Text.types';

export const TextView = (props: IViewComponentProps<ITextProps, ITextStyles>) => {
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
    ...rest
  } = props;

  return <RootType {...rest} className={classNames.root} />;
};
