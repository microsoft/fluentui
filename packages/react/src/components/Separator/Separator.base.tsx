import * as React from 'react';
import { classNamesFunction } from '../../Utilities';
import type { ISeparatorProps, ISeparatorStyles, ISeparatorStyleProps } from './Separator.types';

const getClassNames = classNamesFunction<ISeparatorStyleProps, ISeparatorStyles>();

export const SeparatorBase: React.FunctionComponent<ISeparatorProps> = React.forwardRef<
  HTMLDivElement,
  ISeparatorProps
>((props, ref) => {
  const { styles, theme, className, vertical, alignContent, children } = props;

  const classNames = getClassNames(styles!, {
    theme: theme!,
    className,
    alignContent,
    vertical,
  });

  return (
    <div className={classNames.root} ref={ref}>
      <div className={classNames.content} role="separator" aria-orientation={vertical ? 'vertical' : 'horizontal'}>
        {children}
      </div>
    </div>
  );
});
