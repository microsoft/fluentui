import * as React from 'react';
import { compose } from '@fluentui/react-compose';
import { KeytipData } from '../../KeytipData';
import { FocusRects } from '../../Utilities';
import { IToggleProps } from './Toggle.types';
import { useToggle } from './useToggle';

export const ToggleBase = compose<'div', IToggleProps, IToggleProps, {}, {}>(
  (props, ref, composeOptions) => {
    const { slots, slotProps } = useToggle(props, composeOptions);

    const { 'aria-describedby': ariaDescribedBy, checked, disabled, keytipProps, label, offText, onText } = props;

    return (
      <slots.root ref={ref} {...slotProps.root}>
        {label && <slots.label {...slotProps.label} />}
        <slots.container {...slotProps.container}>
          <KeytipData ariaDescribedBy={ariaDescribedBy} disabled={disabled} keytipProps={keytipProps}>
            {(keytipAttributes: any): JSX.Element => (
              <slots.pill {...keytipAttributes} {...slotProps.pill}>
                <slots.thumb {...slotProps.thumb} />
              </slots.pill>
            )}
          </KeytipData>
        </slots.container>
        <FocusRects />
        {((checked && onText) || offText) && <slots.stateText {...slotProps.stateText} />}
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

ToggleBase.defaultProps = {};
