import * as React from 'react';
import { IViewComponentProps } from '../../Foundation';
import { ITextProps, ITextStyles } from './Text.types';
import { IStyleFunction } from 'office-ui-fabric-react/lib/Utilities';

/**
 * @deprecated This is a non-api-surface workaround with TS <=2.8. This can be removed once
 * TypeScript >=2.9.2 becomes the min-bar.
 */
export type __TS_2_8_WORKAROUND__ = IStyleFunction<{}, {}>;

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
