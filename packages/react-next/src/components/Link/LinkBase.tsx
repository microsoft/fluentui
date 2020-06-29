import * as React from 'react';
import { compose } from '@fluentui/react-compose';
import { KeytipData } from '../../KeytipData';
import { ILinkProps } from './Link.types';
import { useLink } from './useLink';

export const LinkBase = compose<'a', ILinkProps, ILinkProps, {}, {}>(
  (props, ref, options) => {
    const { state } = options;
    const { slots, slotProps } = state;

    const { 'aria-describedby': ariaDescribedBy, disabled, keytipProps } = props;

    if (keytipProps) {
      return (
        <KeytipData ariaDescribedBy={ariaDescribedBy} disabled={disabled} keytipProps={keytipProps}>
          {// tslint:disable-next-line:no-any
          (keytipAttributes: any): JSX.Element => <slots.root {...keytipAttributes} {...slotProps.root} />}
        </KeytipData>
      );
    }

    return <slots.root {...slotProps.root} />;
  },
  {
    displayName: 'LinkBase',
    slots: {},
    state: useLink,
  },
);

LinkBase.defaultProps = {};
