import * as React from 'react';
import { compose } from '@fluentui/react-compose';
import { ILinkProps } from './Link.types';
import { useLink } from './useLink';

export const LinkBase = compose<'a', ILinkProps, ILinkProps, {}, {}>(
  (props, ref, composeOptions) => {
    const { slots, slotProps } = useLink({ ...props, ref }, composeOptions);
    return <slots.root {...slotProps.root} />;
  },
  {
    slots: {},
    displayName: 'LinkBase',
  },
);

LinkBase.defaultProps = {};
