import * as React from 'react';
import { getStyles } from './UnifiedPicker.styles';
import { classNamesFunction, css, SelectionMode, Selection } from '../../Utilities';
import { IUnifiedPickerStyleProps, IUnifiedPickerStyles } from './UnifiedPicker.styles';
import { FocusZoneDirection, FocusZone, SelectionZone, Autofill, IInputProps } from 'office-ui-fabric-react';
import { IUnifiedPickerProps } from './UnifiedPicker.types';

export const UnifiedPicker = <T extends {}>(props: IUnifiedPickerProps<T>): JSX.Element => {
  const getClassNames = classNamesFunction<IUnifiedPickerStyleProps, IUnifiedPickerStyles>();
  const classNames = getClassNames(getStyles);

  const rootRef = React.createRef<HTMLDivElement>();
  const input = React.createRef<Autofill>();
  const [selection] = React.useState(new Selection());

  const { className, focusZoneProps, inputProps } = props;

  const activeDescendant = '';
  const isExpanded = true;

  const _onBackspace = () => {
    console.log('Backspace keyDown handler');
  };
  const _onCopy = () => {
    console.log('copy handler');
  };
  const _onInputFocus = () => {
    console.log('on iput focus');
  };
  const _onInputClick = () => {
    console.log('on input click');
  };
  const _onInputChange = () => {
    console.log('on input change');
  };
  const _onPaste = () => {
    console.log('on paste');
  };

  const _renderSelectedItemsList = () => <div>Selected items list</div>;
  const _canAddItems = () => true;
  const _renderFloatingPicker = () => <div>floating picker</div>;

  return (
    <div
      ref={rootRef}
      className={css('ms-BasePicker ms-BaseExtendedPicker', className ? className : '')}
      onKeyDown={_onBackspace}
      onCopy={_onCopy}
    >
      <FocusZone direction={FocusZoneDirection.bidirectional} {...focusZoneProps}>
        <SelectionZone selection={selection} selectionMode={SelectionMode.multiple}>
          <div className={css('ms-BasePicker-text', classNames.pickerText)} role={'list'}>
            {/** render header here */}
            {_renderSelectedItemsList()}
            {_canAddItems() && (
              <Autofill
                {...(inputProps as IInputProps)}
                className={css('ms-BasePicker-input', classNames.pickerInput)}
                ref={input}
                onFocus={_onInputFocus}
                onClick={_onInputClick}
                onInputValueChange={_onInputChange}
                aria-activedescendant={activeDescendant}
                aria-owns={isExpanded ? 'suggestion-list' : undefined}
                aria-expanded={isExpanded}
                aria-haspopup="true"
                role="combobox"
                disabled={false}
                onPaste={_onPaste}
              />
            )}
          </div>
        </SelectionZone>
      </FocusZone>
      {_renderFloatingPicker()}
    </div>
  );
};
