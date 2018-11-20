import * as React from 'react';
import { KeytipData } from 'office-ui-fabric-react/lib/KeytipData';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { IToggleComponent } from './Toggle.types';
import { inputProperties, getNativeProps } from '../../Utilities';

export const ToggleView: IToggleComponent['view'] = props => {
  const { as: RootType = 'div', label, text, ariaLabel, checked, disabled, onChange, keytipProps, onClick, toggleButtonRef } = props;
  const toggleNativeProps = getNativeProps(this.props, inputProperties, ['defaultChecked']);

  return (
    <RootType className={props.classNames.root}>
      {label && (
        <Label htmlFor={this._id} className={props.classNames.label}>
          {label}
        </Label>
      )}

      <div className={props.classNames.container}>
        <KeytipData keytipProps={keytipProps} ariaDescribedBy={(toggleNativeProps as any)['aria-describedby']} disabled={disabled}>
          {(keytipAttributes: any): JSX.Element => (
            <button
              {...toggleNativeProps}
              {...keytipAttributes}
              className={props.classNames.pill}
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
              <div className={props.classNames.thumb} />
            </button>
          )}
        </KeytipData>
        {text && <Label className={props.classNames.text}>{text}</Label>}
      </div>
    </RootType>
  );
};
