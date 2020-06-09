import * as React from 'react';
import { compose } from '@fluentui/react-compose';
import { KeytipData } from '../../KeytipData';
import { IToggleProps } from './Toggle.types';
import { useToggle } from './useToggle';

export const ToggleBase = compose<'div', IToggleProps, IToggleProps, {}, {}>(
  (props, ref, composeOptions) => {
    const { state, slots, slotProps } = useToggle(props, composeOptions);

    const { checked } = state;
    const { 'aria-describedby': ariaDescribedBy, disabled, keytipProps, label, offText, onText } = props;

    return (
      <slots.root ref={ref} {...slotProps.root}>
        {label && <slots.label {...slotProps.label} />}
        <slots.container {...slotProps.container}>
          <KeytipData ariaDescribedBy={ariaDescribedBy} disabled={disabled} keytipProps={keytipProps}>
            {// tslint:disable-next-line:no-any
            (keytipAttributes: any): JSX.Element => (
              <slots.pill {...keytipAttributes} {...slotProps.pill}>
                <slots.thumb {...slotProps.thumb} />
              </slots.pill>
            )}
          </KeytipData>
          {((checked && onText) || offText) && <slots.stateText {...slotProps.stateText} />}
        </slots.container>
      </slots.root>
    );
  },
  {
    slots: {
      label: 'span',
      container: 'div',
      pill: 'button',
      thumb: 'span',
      stateText: 'span',
    },
    displayName: 'ToggleBase',
  },
);

ToggleBase.defaultProps = {
  as: 'div',
};
