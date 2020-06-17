import * as React from 'react';
import { KeyCodes, getNativeProps, inputProperties, classNamesFunction } from '../../../../Utilities';
import { FloatingPeoplePicker } from '../../../../FloatingPicker';
import { IExtendedPersonaProps } from '../SelectedPeopleList';
import { IEditingSelectedPeopleItemProps } from './EditingItem.types';
import { getStyles } from './EditingItem.styles';
import { IEditingSelectedPeopleItemStyles, IEditingSelectedPeopleItemStylesProps } from './EditingItem.types';
import { useId } from '@uifabric/react-hooks';

export const EditingItem = React.forwardRef(
  (props: IEditingSelectedPeopleItemProps, forwardedRef: React.Ref<HTMLDivElement>) => {
    const editingInput = React.useRef<HTMLInputElement>(null);
    const editingFloatingPicker = React.useRef<FloatingPeoplePicker>(null);
    const itemId = useId();

    React.useEffect(() => {
      const itemText = props.getEditingItemText?.(props.item) ?? '';

      editingFloatingPicker.current?.onQueryStringChanged?.(itemText);
      editingInput.current!.value = itemText;
      editingInput.current!.focus();
    }, []);

    const onSuggestionSelected = (item: IExtendedPersonaProps): void => {
      props.onEditingComplete(props.item, item);
    };

    const renderEditingSuggestions = (): JSX.Element => {
      const FloatingPicker = props.onRenderFloatingPicker;
      const floatingPickerProps = props.floatingPickerProps;
      if (!FloatingPicker || !floatingPickerProps) {
        return <></>;
      }
      return (
        <FloatingPicker
          componentRef={editingFloatingPicker}
          onChange={onSuggestionSelected}
          inputElement={editingInput.current}
          selectedItems={[]}
          {...floatingPickerProps}
        />
      );
    };

    const onInputClick = (): void => {
      editingFloatingPicker.current?.showPicker?.(true /*updatevalue*/);
    };

    const onInputBlur = (ev: React.FocusEvent<HTMLElement>): void => {
      if (editingFloatingPicker.current && ev.relatedTarget !== null) {
        const target = ev.relatedTarget as HTMLElement;
        if (
          target.className.indexOf('ms-Suggestions-itemButton') === -1 &&
          target.className.indexOf('ms-Suggestions-sectionButton') === -1
        ) {
          editingFloatingPicker.current.forceResolveSuggestion();
        }
      }
    };

    const onInputChange = (ev: React.FormEvent<HTMLElement>): void => {
      const value: string = (ev.target as HTMLInputElement).value;

      if (value === '') {
        props.onRemoveItem?.();
      } else {
        editingFloatingPicker.current?.onQueryStringChanged?.(value);
      }
    };

    const onInputKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>): void => {
      if (ev.which === KeyCodes.backspace || ev.which === KeyCodes.del) {
        ev.stopPropagation();
      }
    };

    const nativeProps = getNativeProps<React.InputHTMLAttributes<HTMLInputElement>>(props, inputProperties);
    const getClassNames = classNamesFunction<IEditingSelectedPeopleItemStylesProps, IEditingSelectedPeopleItemStyles>();
    const classNames = getClassNames(getStyles);
    return (
      <div aria-labelledby={'editingItemPersona-' + itemId} className={classNames.root} ref={forwardedRef}>
        <input
          autoCapitalize={'off'}
          autoComplete={'off'}
          {...nativeProps}
          ref={editingInput}
          onChange={onInputChange}
          onKeyDown={onInputKeyDown}
          onBlur={onInputBlur}
          onClick={onInputClick}
          data-lpignore={true}
          className={classNames.input}
          id={itemId}
        />
        {renderEditingSuggestions()}
      </div>
    );
  },
);
EditingItem.displayName = 'EditingItem';
