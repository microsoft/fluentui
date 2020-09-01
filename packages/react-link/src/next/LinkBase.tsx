import * as React from 'react';
import { compose } from '@fluentui/react-compose';
import { ILinkProps } from '../components/Link/Link.types';
import { useLink } from '../components/Link/useLink';

export const LinkBase = compose<'a', ILinkProps, ILinkProps, {}, {}>(
  (props, ref, options) => {
    const { state } = options;
    const { slots, slotProps } = state;

    return <slots.root {...slotProps.root} />;
  },
  {
    displayName: 'LinkBase',
    slots: {},
    state: useLink,
  },
);

LinkBase.defaultProps = {};
