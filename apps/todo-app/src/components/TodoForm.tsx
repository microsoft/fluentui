import * as React from 'react';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { ITodoFormProps, ITodoFormState } from '../types/index';
import * as stylesImport from './Todo.module.scss';
const styles: any = stylesImport;
import strings from './../strings';

/**
 * The form component used for adding new item to the list. It uses fabric-react components
 * TextField and PrimaryButton.
 *
 * TextField: https://fabricreact.azurewebsites.net/fabric-react/master/#/examples/textfield
 * Button: https://fabricreact.azurewebsites.net/fabric-react/master/#/examples/button
 */
export default class TodoForm extends React.Component<ITodoFormProps, ITodoFormState> {
  private _textField: TextField;

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
      <form className={ styles.todoForm } onSubmit={ this._onSubmit }>
        <TextField
          className={ styles.textField }
          value={ this.state.inputValue }
          ref={ ref => this._textField = ref }
          placeholder={ strings.inputBoxPlaceholder }
          onBeforeChange={ this._onBeforeTextFieldChange }
          autoComplete='off'
          errorMessage={ this.state.errorMessage }
        />
        <PrimaryButton
          className={ styles.addButton }
          type='submit'
        >
          { strings.addButton }
        </PrimaryButton>
      </form>
    );
  }

  @autobind
  private _onSubmit(event: React.FormEvent<HTMLElement>): void {
    event.preventDefault();

    if (!this._getTitleErrorMessage(this._textField.value)) {
      this.setState({
        inputValue: ''
      } as ITodoFormState);

      this.props.onSubmit(this._textField.value);
    } else {
      this.setState({
        errorMessage: this._getTitleErrorMessage(this.state.inputValue)
      } as ITodoFormState);

      this._textField.focus();
    }
  }

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
