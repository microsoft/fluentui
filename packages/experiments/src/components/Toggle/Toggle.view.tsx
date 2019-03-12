/** @jsx withSlots */
import { KeytipData } from 'office-ui-fabric-react/lib/KeytipData';
import { Label } from '../../utilities/factoryComponents';

import { withSlots, getSlots } from '../../Foundation';
import { inputProperties, getNativeProps } from '../../Utilities';
import { IToggleComponent, IToggleProps, IToggleSlots } from './Toggle.types';

export const ToggleView: IToggleComponent['view'] = props => {
  const { as: RootType = 'div', label, ariaLabel, checked, disabled, onChange, keytipProps, onClick, toggleButtonRef } = props;
  const toggleNativeProps = getNativeProps(this.props, inputProperties, ['defaultChecked']);

  const Slots = getSlots<IToggleProps, IToggleSlots>(props, {
    root: RootType,
    label: Label,
    container: 'div',
    pill: 'button',
    thumb: 'div',
    text: Label
  });

  return (
    <Slots.root>
      <Slots.label htmlFor={this._id}>{label}</Slots.label>
      <Slots.container>
        <KeytipData keytipProps={keytipProps} ariaDescribedBy={(toggleNativeProps as any)['aria-describedby']} disabled={disabled}>
          {(keytipAttributes: any): JSX.Element => (
            <Slots.pill
              {...toggleNativeProps}
              {...keytipAttributes}
              disabled={disabled}
              id={this._id}
              type="button"
              role="switch" // ARIA 1.1 definition; "checkbox" in ARIA 1.0
              ref={toggleButtonRef}
              aria-disabled={disabled}
              aria-checked={checked}
              aria-label={ariaLabel}
              data-is-focusable={true}
              onChange={onChange}
              onClick={onClick}
            >
              <Slots.thumb />
            </Slots.pill>
          )}
        </KeytipData>
        <Slots.text />
      </Slots.container>
    </Slots.root>
  );
};
