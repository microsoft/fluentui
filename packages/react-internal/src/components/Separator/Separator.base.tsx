import * as React from 'react';
import { classNamesFunction } from '../../Utilities';
import { ISeparatorProps, ISeparatorStyles, ISeparatorStyleProps } from './Separator.types';

const getClassNames = classNamesFunction<ISeparatorStyleProps, ISeparatorStyles>();

export const SeparatorBase: React.FunctionComponent<ISeparatorProps> = (props: ISeparatorProps): JSX.Element => {
  const { styles, theme, className, vertical, alignContent } = props;

  const _classNames = getClassNames(styles!, {
    theme: theme!,
    className,
    alignContent: alignContent,
    vertical: vertical,
  });

  return (
    <div className={_classNames.root}>
      <div className={_classNames.content} role="separator" aria-orientation={vertical ? 'vertical' : 'horizontal'}>
        {props.children}
      </div>
    </div>
  );
};
