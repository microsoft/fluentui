import * as React from 'react';
import { BaseComponent, IBaseProps, createRef } from 'office-ui-fabric-react/lib/Utilities';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { TextField, ITextField } from 'office-ui-fabric-react/lib/TextField';
import * as stylesImport from './Todo.scss';
const styles: any = stylesImport;
import strings from './../strings';

/**
 * Props for TodoForm component.
 */
export interface ITodoFormProps extends IBaseProps {
  /**
   * onSubmit callback triggered when the is submitted.
   * Either triggered by clicking on add button or pressed Enter key in input field.
   *
   * @params {string} title represents the value in input box when submitting.
   */
  onSubmit: (title: string) => void;
}

/**
 * States for TodoForm component.
 */
export interface ITodoFormState {
  /**
   * inputValue is the react state of input box value.
   */
  inputValue: string;

  /**
   * The error message will show below the input box if the title filled in is invalid.
   */
  errorMessage: string;
}

/**
 * The form component used for adding new item to the list. It uses fabric-react components
 * TextField and PrimaryButton.
 *
 * TextField: https://fabricreact.azurewebsites.net/fabric-react/master/#/examples/textfield
 * Button: https://fabricreact.azurewebsites.net/fabric-react/master/#/examples/button
 */
export default class TodoForm extends BaseComponent<ITodoFormProps, ITodoFormState> {
  private _textField = createRef<ITextField>();

  constructor(props: ITodoFormProps) {
    super(props);

    this._onSubmit = this._onSubmit.bind(this);
    this._onBeforeTextFieldChange = this._onBeforeTextFieldChange.bind(this);

    this.state = {
      inputValue: '',
      errorMessage: ''
    };
  }

  public render(): JSX.Element {
    return (
      <form className={styles.todoForm} onSubmit={this._onSubmit}>
        <TextField
          className={styles.textField}
          value={this.state.inputValue}
          componentRef={this._textField}
          placeholder={strings.inputBoxPlaceholder}
          onBeforeChange={this._onBeforeTextFieldChange}
          autoComplete="off"
          errorMessage={this.state.errorMessage}
        />
        <PrimaryButton className={styles.addButton} type="submit">
          {strings.addButton}
        </PrimaryButton>
      </form>
    );
  }

  private _onSubmit = (event: React.FormEvent<HTMLElement>): void => {
    event.preventDefault();

    const { current: textField } = this._textField;
    if (!textField) {
      return;
    }

    if (!this._getTitleErrorMessage(textField.value || '')) {
      this.setState({
        inputValue: ''
      } as ITodoFormState);

      this.props.onSubmit(textField.value || '');
    } else {
      this.setState({
        errorMessage: this._getTitleErrorMessage(this.state.inputValue)
      } as ITodoFormState);

      textField.focus();
    }
  };

  private _onBeforeTextFieldChange(newValue: string): void {
    this.setState({
      inputValue: newValue,
      errorMessage: ''
    });
  }

  private _getTitleErrorMessage(title: string): string {
    if (title.trim() === '') {
      return strings.titleEmptyErrorMessage;
    } else {
      return '';
    }
  }
}
