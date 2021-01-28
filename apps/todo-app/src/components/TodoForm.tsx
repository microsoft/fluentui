import * as React from 'react';
import { PrimaryButton } from '@fluentui/react/lib/compat/Button';
import { TextField, ITextField } from '@fluentui/react';

import { formStyles } from './styles';
import strings from './../strings';

export interface TodoFormProps {
  /**
   * Callback triggered when the form is submitted by either clicking the add button
   * or pressing Enter in the input field.
   * @param title - current value in input box
   */
  onSubmit: (title: string) => void;
}

/** Form for adding a todo item. */
export const TodoForm: React.FunctionComponent<TodoFormProps> = props => {
  const { onSubmit: propsOnSubmit } = props;

  const textFieldRef = React.useRef<ITextField | null>(null);
  // Current text input value
  const [inputValue, setInputValue] = React.useState<string>('');
  // The error message will show below the input box if the title filled in is invalid
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  // Form submit handler
  const onSubmit = React.useCallback(
    (event: React.FormEvent<HTMLElement>) => {
      event.preventDefault();

      const textField = textFieldRef.current!;
      const value = textField.value || '';

      if (!_getTitleErrorMessage(value)) {
        setInputValue('');
        propsOnSubmit(value);
      } else {
        setErrorMessage(_getTitleErrorMessage(value));
        textField.focus();
      }
    },
    [propsOnSubmit],
  );

  const onTextFieldChange = React.useCallback((ev: React.FormEvent<HTMLElement>, newValue?: string) => {
    setInputValue(newValue || '');
    setErrorMessage('');
  }, []);

  return (
    <form className={formStyles.todoForm} onSubmit={onSubmit}>
      <TextField
        className={formStyles.textField}
        value={inputValue}
        componentRef={textFieldRef}
        placeholder={strings.inputBoxPlaceholder}
        aria-label={strings.inputBoxPlaceholder}
        onChange={onTextFieldChange}
        autoComplete="off"
        errorMessage={errorMessage}
      />
      <PrimaryButton className={formStyles.addButton} type="submit">
        {strings.addButton}
      </PrimaryButton>
    </form>
  );
};
TodoForm.displayName = 'TodoForm';

function _getTitleErrorMessage(title: string): string {
  if (title.trim() === '') {
    return strings.titleEmptyErrorMessage;
  } else {
    return '';
  }
}
