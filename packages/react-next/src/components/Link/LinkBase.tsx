import * as React from 'react';
import { compose } from '@fluentui/react-compose';
import { LinkProps } from './Link.types';
import { useLink } from './useLink';

export const LinkBase = compose<'a', LinkProps, LinkProps, {}, {}>(
  (props, ref, composeOptions) => {
    const { slots, slotProps } = useLink(props, composeOptions);

    return <slots.root ref={ref} {...slotProps.root}></slots.root>;
  },
  {
    slots: {},
  },
);

LinkBase.defaultProps = {
  as: 'a',
};
