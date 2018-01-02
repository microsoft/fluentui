import * as React from 'react';
import { ITextField, ITextFieldProps } from './TextField.types';
import { Label, ILabelStyles, ILabelProps } from '../../Label';
import { Icon } from '../../Icon';
import {
  DelayedRender,
  BaseComponent,
  getId,
  getNativeProps,
  inputProperties,
  textAreaProperties,
  customizable,
  classNamesFunction
} from '../../Utilities';
import { ITextFieldStyleProps, ITextFieldStyles } from './TextField.types';

const getClassNames = classNamesFunction<ITextFieldStyleProps, ITextFieldStyles>();

export interface ITextFieldState {
  value?: string | undefined;

  /** Is true when the control has focus. */
  isFocused?: boolean;

  /**
   * The validation error message.
   *
   * - If there is no validation error or we have not validated the input value, errorMessage is an empty string.
   * - If we have done the validation and there is validation error, errorMessage is the validation error message.
   */
  errorMessage?: string;
}

@customizable('TextField', ['theme', 'getStyles', 'getLabelStyles'])
export class TextFieldBase extends BaseComponent<ITextFieldProps, ITextFieldState> implements ITextField {
  public static defaultProps: ITextFieldProps = {
    multiline: false,
    resizable: true,
    autoAdjustHeight: false,
    underlined: false,
    borderless: false,
    onChanged: () => { /* noop */ },
    onBeforeChange: () => { /* noop */ },
    onNotifyValidationResult: () => { /* noop */ },
    onGetErrorMessage: () => undefined,
    deferredValidationTime: 200,
    errorMessage: '',
    validateOnFocusIn: false,
    validateOnFocusOut: false,
    validateOnLoad: true,
  };

  private _id: string;
  private _descriptionId: string;
  private _delayedValidate: (value: string | undefined) => void;
  private _isMounted: boolean;
  private _lastValidation: number;
  private _latestValue: string | undefined;
  private _latestValidateValue: string | undefined;
  private _isDescriptionAvailable: boolean;
  private _textElement: HTMLTextAreaElement;
  private _classNames: {[key in keyof ITextFieldStyles]: string };

  public constructor(props: ITextFieldProps) {
    super(props);

    this._warnDeprecations({
      'addonString': 'prefix',
      'onRenderAddon': 'onRenderPrefix'
    });

    this._warnMutuallyExclusive({
      'value': 'defaultValue'
    });

    this._id = getId('TextField');
    this._descriptionId = getId('TextFieldDescription');

    this.state = {
      value: props.value || props.defaultValue || '',
      isFocused: false,
      errorMessage: ''
    };

    this._onInputChange = this._onInputChange.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);

    this._delayedValidate = this._async.debounce(this._validate, this.props.deferredValidationTime);
    this._lastValidation = 0;
    this._isDescriptionAvailable = false;
  }

  /**
   * Gets the current value of the text field.
   */
  public get value(): string | undefined {
    return this.state.value;
  }

  public componentDidMount() {
    this._isMounted = true;
    this._adjustInputHeight();

    if (this.props.validateOnLoad) {
      this._validate(this.state.value);
    }
  }

  public componentWillReceiveProps(newProps: ITextFieldProps) {
    const { onBeforeChange } = this.props;

    if (newProps.value !== undefined && newProps.value !== this.state.value) {
      if (onBeforeChange) {
        onBeforeChange(newProps.value);
      }

      this._latestValue = newProps.value;
      this.setState({
        value: newProps.value,
        errorMessage: ''
      } as ITextFieldState);

      this._delayedValidate(newProps.value);
    }
  }

  public componentWillUnmount() {
    this._isMounted = false;
  }

  public render() {
    let {
      className,
      description,
      disabled,
      iconProps,
      multiline,
      required,
      underlined,
      borderless,
      prefix,
      suffix,
      getStyles,
      theme,
      resizable,
      onRenderPrefix = this._onRenderPrefix,
      onRenderSuffix = this._onRenderSuffix,
      onRenderLabel = this._onRenderLabel
    } = this.props;
    let { isFocused } = this.state;
    const errorMessage = this._errorMessage;
    this._isDescriptionAvailable = Boolean(description || errorMessage);
    const renderProps: ITextFieldProps = { ...this.props, componentId: this._id };

    this._classNames = getClassNames(getStyles!, {
      theme: theme!,
      className,
      disabled,
      focused: isFocused,
      required,
      multiline,
      hasLabel: !!this.props.label,
      hasErrorMessage: !!errorMessage,
      borderless,
      resizable,
      hasIcon: !!iconProps,
      underlined
    });

    return (
      <div className={ this._classNames.root }>
        <div className={ this._classNames.wrapper }>
          { onRenderLabel(renderProps, this._onRenderLabel) }
          <div className={ this._classNames.fieldGroup }>
            { (prefix !== undefined || this.props.onRenderPrefix) && (
              <div className={ this._classNames.prefix }>
                { onRenderPrefix(this.props, this._onRenderPrefix) }
              </div>
            ) }
            { multiline ? this._renderTextArea() : this._renderInput() }
            { iconProps && <Icon className={ this._classNames.icon } { ...iconProps } /> }
            { (suffix !== undefined || this.props.onRenderSuffix) && (
              <div className={ this._classNames.suffix }>
                { onRenderSuffix(this.props, this._onRenderSuffix) }
              </div>
            ) }
          </div>
        </div>
        { this._isDescriptionAvailable &&
          <span id={ this._descriptionId }>
            { description && <span className={ this._classNames.description }>{ description }</span> }
            { errorMessage &&
              <div>
                <DelayedRender>
                  <p className={ this._classNames.errorMessage }>
                    <span aria-live='assertive' data-automation-id='error-message'>{ errorMessage }</span>
                  </p>
                </DelayedRender>
              </div>
            }
          </span>
        }
      </div>
    );
  }

  /**
   * Sets focus on the text field
   */
  public focus() {
    if (this._textElement) {
      this._textElement.focus();
    }
  }

  /**
   * Selects the text field
   */
  public select() {
    if (this._textElement) {
      this._textElement.select();
    }
  }

  /**
   * Sets the selection start of the text field to a specified value
   */
  public setSelectionStart(value: number) {
    if (this._textElement) {
      this._textElement.selectionStart = value;
    }
  }

  /**
   * Sets the selection end of the text field to a specified value
   */
  public setSelectionEnd(value: number) {
    if (this._textElement) {
      this._textElement.selectionEnd = value;
    }
  }

  /**
   * Gets the selection start of the text field
   */
  public get selectionStart(): number {
    return this._textElement ? this._textElement.selectionStart : -1;
  }

  /**
   * Gets the selection end of the text field
   */
  public get selectionEnd(): number {
    return this._textElement ? this._textElement.selectionEnd : -1;
  }

  /**
   * Sets the start and end positions of a selection in a text field.
   * @param start Index of the start of the selection.
   * @param end Index of the end of the selection.
   */
  public setSelectionRange(start: number, end: number) {
    if (this._textElement) {
      this._textElement.setSelectionRange(start, end);
    }
  }

  private _onFocus(ev: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (this.props.onFocus) {
      this.props.onFocus(ev);
    }

    this.setState({ isFocused: true });
    if (this.props.validateOnFocusIn) {
      this._validate(this.state.value);
    }
  }

  private _onBlur(ev: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (this.props.onBlur) {
      this.props.onBlur(ev);
    }

    this.setState({ isFocused: false });
    if (this.props.validateOnFocusOut) {
      this._validate(this.state.value);
    }
  }

  private _onRenderLabel(props: ITextFieldProps): JSX.Element | null {
    const {
      theme,
      underlined,
      getLabelStyles,
      label,
      componentId,
      required,
      disabled
     } = props;

    const labelProps: ILabelProps = {
      required,
      htmlFor: componentId,
      getStyles: getLabelStyles ? () => getLabelStyles({ theme: theme!, underlined, disabled }) : undefined
    };

    if (label) {
      return (
        <Label {...labelProps} >
          { label }
        </Label>);
    }
    return null;
  }

  private _onRenderPrefix(props: ITextFieldProps): JSX.Element {
    let { prefix } = props;
    return (
      <span style={ { paddingBottom: '1px' } }>{ prefix }</span>
    );
  }

  private _onRenderSuffix(props: ITextFieldProps): JSX.Element {
    let { suffix } = props;
    return (
      <span style={ { paddingBottom: '1px' } }>{ suffix }</span>
    );
  }

  private get _errorMessage(): string | undefined {
    let { errorMessage } = this.state;
    if (!errorMessage) {
      errorMessage = this.props.errorMessage;
    }

    return errorMessage;
  }

  private _renderTextArea(): React.ReactElement<React.HTMLAttributes<HTMLAreaElement>> {
    let textAreaProps = getNativeProps(this.props, textAreaProperties, ['defaultValue']);

    return (
      <textarea
        id={ this._id }
        { ...textAreaProps }
        ref={ this._resolveRef('_textElement') }
        value={ this.state.value }
        onInput={ this._onInputChange }
        onChange={ this._onInputChange }
        className={ this._classNames.field }
        aria-describedby={ this._isDescriptionAvailable ? this._descriptionId : null }
        aria-invalid={ !!this.state.errorMessage }
        aria-label={ this.props.ariaLabel }
        onFocus={ this._onFocus }
        onBlur={ this._onBlur }
      />
    );
  }

  private _renderInput(): React.ReactElement<React.HTMLAttributes<HTMLInputElement>> {
    let inputProps = getNativeProps<React.HTMLAttributes<HTMLInputElement>>(this.props, inputProperties, ['defaultValue']);

    return (
      <input
        type={ 'text' }
        id={ this._id }
        { ...inputProps }
        ref={ this._resolveRef('_textElement') }
        value={ this.state.value }
        onInput={ this._onInputChange }
        onChange={ this._onInputChange }
        className={ this._classNames.field }
        aria-label={ this.props.ariaLabel }
        aria-describedby={ this._isDescriptionAvailable ? this._descriptionId : null }
        aria-invalid={ !!this.state.errorMessage }
        onFocus={ this._onFocus }
        onBlur={ this._onBlur }
      />
    );
  }

  private _onInputChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    const value: string = element.value;

    // Avoid doing unnecessary work when the value has not changed.
    if (value === this._latestValue) {
      return;
    }
    this._latestValue = value;

    this.setState({
      value: value,
      errorMessage: ''
    } as ITextFieldState,
      () => {
        this._adjustInputHeight();

        if (this.props.onChanged) {
          this.props.onChanged(value);
        }
      });

    const { validateOnFocusIn, validateOnFocusOut } = this.props;
    if (!(validateOnFocusIn || validateOnFocusOut)) {
      this._delayedValidate(value);
    }

    const onBeforeChange = this.props.onBeforeChange as (newValue: any) => void;
    onBeforeChange(value);
  }

  private _validate(value: string | undefined): void {
    // In case of _validate called multi-times during executing validate logic with promise return.
    if (this._latestValidateValue === value) {
      return;
    }

    this._latestValidateValue = value;
    let onGetErrorMessage = this.props.onGetErrorMessage as (value: string) => string | PromiseLike<string> | undefined;
    let result = onGetErrorMessage(value || '');

    if (result !== undefined) {
      if (typeof result === 'string') {
        this.setState({
          errorMessage: result
        } as ITextFieldState);
        this._notifyAfterValidate(value, result);
      } else {
        let currentValidation: number = ++this._lastValidation;

        result.then((errorMessage: string) => {
          if (this._isMounted && currentValidation === this._lastValidation) {
            this.setState({ errorMessage } as ITextFieldState);
          }
          this._notifyAfterValidate(value, errorMessage);
        });
      }
    } else {
      this._notifyAfterValidate(value, '');
    }
  }

  private _notifyAfterValidate(value: string | undefined, errorMessage: string): void {
    if (this._isMounted &&
      value === this.state.value &&
      this.props.onNotifyValidationResult) {
      this.props.onNotifyValidationResult(errorMessage, value);
    }
  }

  private _adjustInputHeight(): void {
    if (this._textElement && this.props.autoAdjustHeight && this.props.multiline) {
      const textField = this._textElement as HTMLElement;
      textField.style.height = '';
      let scrollHeight = textField.scrollHeight + 2; // +2 to avoid vertical scroll bars
      textField.style.height = scrollHeight + 'px';
    }
  }
}
