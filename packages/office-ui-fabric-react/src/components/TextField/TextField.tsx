import * as React from 'react';
import { ITextField, ITextFieldProps } from './TextField.Props';
import { Label } from '../../Label';
import { Icon } from '../../Icon';
import {
  DelayedRender,
  BaseComponent,
  getId,
  css,
  getNativeProps,
  inputProperties,
  textAreaProperties
} from '../../Utilities';
import * as stylesImport from './TextField.scss';
const styles: any = stylesImport;
import { AnimationClassNames } from '../../Styling';
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

export class TextField extends BaseComponent<ITextFieldProps, ITextFieldState> implements ITextField {
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

  public constructor(props: ITextFieldProps) {
    super(props);

    this._warnDeprecations({
      'iconClass': 'iconProps'
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
      iconClass,
      iconProps,
      label,
      multiline,
      required,
      underlined,
      borderless,
      addonString,
      onRenderAddon = this._onRenderAddon
    } = this.props;
    let { isFocused } = this.state;
    const errorMessage = this._errorMessage;
    this._isDescriptionAvailable = Boolean(description || errorMessage);

    const textFieldClassName = css('ms-TextField', styles.root, className, {
      ['is-required ' + styles.rootIsRequired]: required,
      ['is-disabled ' + styles.rootIsDisabled]: disabled,
      ['is-active ' + styles.rootIsActive]: isFocused,
      ['ms-TextField--multiline ' + styles.rootIsMultiline]: multiline,
      ['ms-TextField--underlined ' + styles.rootIsUnderlined]: underlined,
      ['ms-TextField--borderless ' + styles.rootIsBorderless]: borderless
    });

    return (
      <div className={ textFieldClassName }>
        <div className={ css('ms-TextField-wrapper', styles.wrapper) }>
          { label && <Label htmlFor={ this._id }>{ label }</Label> }
          <div className={ css('ms-TextField-fieldGroup', styles.fieldGroup, isFocused && styles.fieldGroupIsFocused, errorMessage && styles.invalid) }>
            { (addonString !== undefined || this.props.onRenderAddon) && (
              <div className={ css(styles.fieldAddon) }>
                { onRenderAddon(this.props, this._onRenderAddon) }
              </div>
            ) }
            { multiline ? this._renderTextArea() : this._renderInput() }
            { (iconClass || iconProps) && <Icon className={ css(iconClass, styles.icon) } { ...iconProps } /> }
          </div>
        </div>
        { this._isDescriptionAvailable &&
          <span id={ this._descriptionId }>
            { description && <span className={ css('ms-TextField-description', styles.description) }>{ description }</span> }
            { errorMessage &&
              <div aria-live='assertive'>
                <DelayedRender>
                  <p
                    className={ css('ms-TextField-errorMessage', AnimationClassNames.slideDownIn20, styles.errorMessage) }
                  >
                    { Icon({ iconName: 'Error', className: styles.errorIcon }) }
                    <span className={ styles.errorText } data-automation-id='error-message'>{ errorMessage }</span>
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
    if (this._textElement) {
      return this._textElement.selectionStart;
    } else {
      return -1;
    }
  }

  /**
   * Gets the selection end of the text field
   */
  public get selectionEnd(): number {
    if (this._textElement) {
      return this._textElement.selectionEnd;
    } else {
      return -1;
    }
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

  private _onRenderAddon(props: ITextFieldProps): JSX.Element {
    let { addonString } = props;
    return (
      <span style={ { paddingBottom: '1px' } }>{ addonString }</span>
    );
  }

  private _getTextElementClassName(): string {
    const errorMessage = this._errorMessage;
    let textFieldClassName: string;

    if (this.props.multiline && !this.props.resizable) {
      textFieldClassName = css('ms-TextField-field ms-TextField-field--unresizable', styles.field, styles.fieldIsUnresizable);
    } else {
      textFieldClassName = css('ms-TextField-field', styles.field);
    }

    return css(textFieldClassName, this.props.inputClassName, {
      [styles.hasIcon]: !!this.props.iconClass,
    });
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
        className={ this._getTextElementClassName() }
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
        className={ this._getTextElementClassName() }
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
