import * as React from 'react';
import { compose } from '@fluentui/react-compose';
import { KeytipData } from '../../KeytipData';
import { IToggleProps } from './Toggle.types';
import { useToggle } from './useToggle';

export const ToggleBase = compose<'div', IToggleProps, {}, IToggleProps, {}>(
  (props, ref, options) => {
    const { state: toggleState } = options;
    const { state, slots, slotProps } = toggleState;

    const { checked } = state;
    const { 'aria-describedby': ariaDescribedBy, disabled, keytipProps, label, offText, onText } = props;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderPill = (keytipAttributes: any = {}) => {
      return (
        <slots.pill {...keytipAttributes} {...slotProps.pill}>
          <slots.thumb {...slotProps.thumb} />
        </slots.pill>
      );
    };

    const pillContent = keytipProps ? (
      <KeytipData ariaDescribedBy={ariaDescribedBy} disabled={disabled} keytipProps={keytipProps}>
        {// eslint-disable-next-line @typescript-eslint/no-explicit-any
        (keytipAttributes: any): JSX.Element => renderPill(keytipAttributes)}
      </KeytipData>
    ) : (
      renderPill()
    );

    return (
      <slots.root ref={ref} {...slotProps.root}>
        {label && <slots.label {...slotProps.label} />}
        <slots.container {...slotProps.container}>
          {pillContent}
          {((checked && onText) || offText) && <slots.stateText {...slotProps.stateText} />}
        </slots.container>
      </slots.root>
    );
  },
  {
    displayName: 'ToggleBase',
    slots: {
      label: 'span',
      container: 'div',
      pill: 'button',
      thumb: 'span',
      stateText: 'span',
    },
    state: useToggle,
  },
);

ToggleBase.defaultProps = {
  as: 'div',
};
