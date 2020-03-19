import * as React from 'react';
import { getStyles } from './UnifiedPicker.styles';
import { classNamesFunction, css, SelectionMode, Selection } from '../../Utilities';
import { IUnifiedPickerStyleProps, IUnifiedPickerStyles } from './UnifiedPicker.styles';
import { FocusZoneDirection, FocusZone, SelectionZone, Autofill, IInputProps } from 'office-ui-fabric-react';
import { IUnifiedPickerProps } from './UnifiedPicker.types';
import { useQueryString } from './hooks/useQueryString';
import { useFloatingSuggestionItems } from './hooks/useFloatingSuggestionItems';

export const UnifiedPicker = <T extends {}>(props: IUnifiedPickerProps<T>): JSX.Element => {
  const getClassNames = classNamesFunction<IUnifiedPickerStyleProps, IUnifiedPickerStyles>();
  const classNames = getClassNames(getStyles);

  const rootRef = React.createRef<HTMLDivElement>();
  const input = React.createRef<Autofill>();
  const { queryString, setQueryString } = useQueryString('');
  const [selection, setSelection] = React.useState(new Selection({ onSelectionChanged: () => _onSelectionChanged() }));
  const { suggestions, selectedSuggestionIndex, isSuggestionsVisible } = props.floatingSuggestionProps;
  const { focusItemIndex, suggestionItems, isSuggestionsShown, showPicker } = useFloatingSuggestionItems(
    suggestions,
    selectedSuggestionIndex,
    isSuggestionsVisible
  );

  const _onSelectionChanged = () => {
    setSelection(selection);
  };

  const {
    className,
    focusZoneProps,
    inputProps,
    onRenderSelectedItems,
    selectedItemsListProps,
    onRederFloatingSuggestions,
    floatingSuggestionProps,
    headerComponent
  } = props;

  const activeDescendant = '';
  const isExpanded = true;

  const _onBackspace = () => {
    console.log('Backspace keyDown handler');
  };
  const _onCopy = () => {
    console.log('copy handler');
  };
  const _onInputFocus = (ev: React.FocusEvent<HTMLInputElement | Autofill>): void => {
    // unselect all selected items
    if (props.inputProps && props.inputProps.onFocus) {
      props.inputProps.onFocus(ev as React.FocusEvent<HTMLInputElement>);
    }
    console.log('on iput focus');
  };
  const _onInputClick = () => {
    // unselect all selected items
    showPicker(true);
    console.log('on input click');
  };
  const _onInputChange = (value: string, composing?: boolean) => {
    if (!composing) {
      // update query string
      setQueryString(value);
      // update floatingpicker suggestions
    }
    console.log(`${value} :on input change`);
  };
  const _onPaste = (ev: React.ClipboardEvent<Autofill | HTMLInputElement>) => {
    if (props.onPaste) {
      const inputText = ev.clipboardData.getData('Text');
      ev.preventDefault();
      // Pass current selected items
      props.onPaste(inputText, []);
    }
    console.log('on paste');
  };

  const _renderSelectedItemsList = (): JSX.Element => {
    return onRenderSelectedItems(selectedItemsListProps);
  };
  const _canAddItems = () => true;
  const _renderFloatingPicker = () =>
    onRederFloatingSuggestions({
      ...floatingSuggestionProps,
      targetElement: input.current?.inputElement,
      isSuggestionsVisible: isSuggestionsShown,
      suggestions: suggestionItems,
      selectedSuggestionIndex: focusItemIndex
    });

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
            {headerComponent}
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
