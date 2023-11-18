import { mergeClasses } from '@fluentui/react-components';
import * as React from 'react';

import { useSegmentStyles } from './Segment.styles';

export const segmentClassName = 'fui-Segment';

export const Segment = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>((props, ref) => {
  const { children, className, ...rest } = props;
  const classes = useSegmentStyles();

  const segmentClasses = mergeClasses(segmentClassName, classes.segment, className);

  return (
    <div ref={ref} className={segmentClasses} {...rest}>
      {children}
    </div>
  );
});

Segment.displayName = 'Segment';
