import * as React from 'react';
import { mergeStyles } from '@fluentui/react';
import { NeutralColors } from '@fluentui/theme';
import { IBadgeProps } from './Badge.types';

export const Badge = (props: IBadgeProps) => {
  const { children, className, as: RootType = 'div' } = props;
  const rootClass = mergeStyles(
    {
      textTransform: 'uppercase',
      fontSize: '10px',
      padding: '4px 8px',
      border: '1px solid ' + NeutralColors.gray50,
      borderRadius: 20,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    className,
  );

  return <RootType className={rootClass}>{children}</RootType>;
};
