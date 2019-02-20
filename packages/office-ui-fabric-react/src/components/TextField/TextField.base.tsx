import * as React from 'react';
import { IProcessedStyleSet } from '../../Styling';
import { Label, ILabelStyleProps, ILabelStyles } from '../../Label';
import { Icon } from '../../Icon';
import {
  DelayedRender,
  BaseComponent,
  getId,
  getNativeProps,
  inputProperties,
  textAreaProperties,
  createRef,
  classNamesFunction,
  IStyleFunctionOrObject
} from '../../Utilities';
import { ITextField, ITextFieldProps, ITextFieldStyleProps, ITextFieldStyles } from './TextField.types';

const getClassNames = classNamesFunction<ITextFieldStyleProps, ITextFieldStyles>();

export interface ITextFieldState {
  value: string;

  /** Is true when the control has focus. */
  isFocused: boolean;

  /**
   * The validation error message.
   *
   * - If there is no validation error or we have not validated the input value, errorMessage is an empty string.
   * - If we have done the validation and there is validation error, errorMessage is the validation error message.
   */
  errorMessage: string;
}

const DEFAULT_STATE_VALUE = '';

export class TextFieldBase extends BaseComponent<ITextFieldProps, ITextFieldState> implements ITextField {
  public static defaultProps: ITextFieldProps = {
    multiline: false,
    resizable: true,
    autoAdjustHeight: false,
    underlined: false,
    borderless: false,
    onChange: () => {
      /* noop */
    },
    onBeforeChange: () => {
      /* noop */
    },
    onNotifyValidationResult: () => {
      /* noop */
    },
    onGetErrorMessage: () => undefined,
    deferredValidationTime: 200,
    errorMessage: '',
    validateOnFocusIn: false,
    validateOnFocusOut: false,
    validateOnLoad: true
  };

  private _id: string;
  private _descriptionId: string;
  private _delayedValidate: (value: string | undefined) => void;
  private _isMounted: boolean;
  private _lastValidation: number;
  private _latestValue: string | undefined;
  private _latestValidateValue: string | undefined;
  private _textElement = createRef<HTMLTextAreaElement | HTMLInputElement | null>();
  private _classNames: IProcessedStyleSet<ITextFieldStyles>;
  /**
   * If true, the text field is changing between single- and multi-line, so we'll need to reset
   * focus after the change completes.
   */
  private _shouldResetFocusAfterRender: boolean | undefined;
  /**
   * If set, the text field is changing between single- and multi-line, so we'll need to reset
   * selection/cursor after the change completes.
   */
  private _selectionBeforeInputTypeChange: [number | null, number | null] | undefined;

  public constructor(props: ITextFieldProps) {
    super(props);

    this._warnDeprecations({
      iconClass: 'iconProps',
      addonString: 'prefix',
      onRenderAddon: 'onRenderPrefix',
      onChanged: 'onChange'
    });

    this._warnMutuallyExclusive({
      value: 'defaultValue'
    });

    this._id = props.id || getId('TextField');
    this._descriptionId = getId('TextFieldDescription');

    if (props.value !== undefined) {
      this._latestValue = props.value;
    } else if (props.defaultValue !== undefined) {
      this._latestValue = props.defaultValue;
    } else {
      this._latestValue = DEFAULT_STATE_VALUE;
    }

    this.state = {
      value: this._latestValue,
      isFocused: false,
      errorMessage: ''
    };

    this._delayedValidate = this._async.debounce(this._validate, this.props.deferredValidationTime);
    this._lastValidation = 0;
  }

  /**
   * Gets the current value of the text field.
   */
  public get value(): string | undefined {
    return this.state.value;
  }

  public componentDidMount(): void {
    this._isMounted = true;
    this._adjustInputHeight();

    if (this.props.validateOnLoad) {
      this._validate(this.state.value);
    }
  }

  public componentWillReceiveProps(newProps: ITextFieldProps): void {
    const { onBeforeChange } = this.props;

    // If old value prop was undefined, then component is controlled and we should
    //    respect new undefined value and update state accordingly.
    if (newProps.value !== this.state.value && (newProps.value !== undefined || this.props.value !== undefined)) {
      if (onBeforeChange) {
        onBeforeChange(newProps.value);
      }

      this._id = newProps.id || this._id;
      this._setValue(newProps.value);

      const { validateOnFocusIn, validateOnFocusOut } = newProps;
      if (!(validateOnFocusIn || validateOnFocusOut)) {
        this._delayedValidate(newProps.value);
      }
    }

    // If component is not currently controlled and defaultValue changes, set value to new defaultValue.
    if (newProps.defaultValue !== this.props.defaultValue && newProps.value === undefined) {
      this._setValue(newProps.defaultValue);
    }

    // Text field is changing between single- and multi-line. After the change is complete,
    // we'll need to reset focus and selection/cursor.
    if (!!newProps.multiline !== !!this.props.multiline && this.state.isFocused) {
      this._shouldResetFocusAfterRender = true;
      this._selectionBeforeInputTypeChange = [this.selectionStart, this.selectionEnd];
    }
  }

  public componentDidUpdate(): void {
    if (this._shouldResetFocusAfterRender) {
      // The text field has just changed between single- and multi-line, so we need to reset focus
      // and selection/cursor.
      this._shouldResetFocusAfterRender = false;
      this.focus();
      if (this._selectionBeforeInputTypeChange) {
        const [start, end] = this._selectionBeforeInputTypeChange;
        if (start !== null && end !== null) {
          this.setSelectionRange(start, end);
        }
      }
    }
  }

  public componentWillUnmount(): void {
    this._isMounted = false;
  }

  public render(): JSX.Element {
    const {
      borderless,
      className,
      disabled,
      iconClass,
      iconProps,
      inputClassName,
      label,
      multiline,
      required,
      underlined,
      addonString, // @deprecated
      prefix,
      resizable,
      suffix,
      theme,
      styles,
      autoAdjustHeight,
      onRenderAddon = this._onRenderAddon, // @deprecated
      onRenderPrefix = this._onRenderPrefix,
      onRenderSuffix = this._onRenderSuffix,
      onRenderLabel = this._onRenderLabel,
      onRenderDescription = this._onRenderDescription
    } = this.props;
    const { isFocused } = this.state;
    const errorMessage = this._errorMessage;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      disabled,
      focused: isFocused,
      required,
      multiline,
      hasLabel: !!label,
      hasErrorMessage: !!errorMessage,
      borderless,
      resizable,
      hasIcon: !!iconProps,
      underlined,
      iconClass,
      inputClassName,
      autoAdjustHeight
    });

    return (
      <div className={this._classNames.root}>
        <div className={this._classNames.wrapper}>
          {onRenderLabel(this.props, this._onRenderLabel)}
          <div className={this._classNames.fieldGroup}>
            {(addonString !== undefined || this.props.onRenderAddon) && (
              <div className={this._classNames.prefix}>{onRenderAddon(this.props, this._onRenderAddon)}</div>
            )}
            {(prefix !== undefined || this.props.onRenderPrefix) && (
              <div className={this._classNames.prefix}>{onRenderPrefix(this.props, this._onRenderPrefix)}</div>
            )}
            {multiline ? this._renderTextArea() : this._renderInput()}
            {(iconClass || iconProps) && <Icon className={this._classNames.icon} {...iconProps} />}
            {(suffix !== undefined || this.props.onRenderSuffix) && (
              <div className={this._classNames.suffix}>{onRenderSuffix(this.props, this._onRenderSuffix)}</div>
            )}
          </div>
        </div>
        {this._isDescriptionAvailable && (
          <span id={this._descriptionId}>
            {onRenderDescription(this.props, this._onRenderDescription)}
            {errorMessage && (
              <div role="alert">
                <DelayedRender>
                  <p className={this._classNames.errorMessage}>
                    <span data-automation-id="error-message">{errorMessage}</span>
                  </p>
                </DelayedRender>
              </div>
            )}
          </span>
        )}
      </div>
    );
  }

  /**
   * Sets focus on the text field
   */
  public focus() {
    if (this._textElement.current) {
      this._textElement.current.focus();
    }
  }

  /**
   * Blurs the text field.
   */
  public blur() {
    if (this._textElement.current) {
      this._textElement.current.blur();
    }
  }

  /**
   * Selects the text field
   */
  public select() {
    if (this._textElement.current) {
      this._textElement.current.select();
    }
  }

  /**
   * Sets the selection start of the text field to a specified value
   */
  public setSelectionStart(value: number): void {
    if (this._textElement.current) {
      this._textElement.current.selectionStart = value;
    }
  }

  /**
   * Sets the selection end of the text field to a specified value
   */
  public setSelectionEnd(value: number): void {
    if (this._textElement.current) {
      this._textElement.current.selectionEnd = value;
    }
  }

  /**
   * Gets the selection start of the text field
   */
  public get selectionStart(): number | null {
    return this._textElement.current ? this._textElement.current.selectionStart : -1;
  }

  /**
   * Gets the selection end of the text field
   */
  public get selectionEnd(): number | null {
    return this._textElement.current ? this._textElement.current.selectionEnd : -1;
  }

  /**
   * Sets the start and end positions of a selection in a text field.
   * @param start - Index of the start of the selection.
   * @param end - Index of the end of the selection.
   */
  public setSelectionRange(start: number, end: number): void {
    if (this._textElement.current) {
      (this._textElement.current as HTMLInputElement).setSelectionRange(start, end);
    }
  }

  private _setValue(value?: string) {
    this._latestValue = value;
    this.setState(
      {
        value: value || DEFAULT_STATE_VALUE,
        errorMessage: ''
      } as ITextFieldState,
      () => {
        this._adjustInputHeight();
      }
    );
  }

  private _onFocus = (ev: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (this.props.onFocus) {
      this.props.onFocus(ev);
    }

    this.setState({ isFocused: true });
    if (this.props.validateOnFocusIn) {
      this._validate(this.state.value);
    }
  };

  private _onBlur = (ev: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (this.props.onBlur) {
      this.props.onBlur(ev);
    }

    this.setState({ isFocused: false });
    if (this.props.validateOnFocusOut) {
      this._validate(this.state.value);
    }
  };

  private _onRenderLabel = (props: ITextFieldProps): JSX.Element | null => {
    const { label, required } = props;
    // IProcessedStyleSet definition requires casting for what Label expects as its styles prop
    const labelStyles = this._classNames.subComponentStyles
      ? (this._classNames.subComponentStyles.label as IStyleFunctionOrObject<ILabelStyleProps, ILabelStyles>)
      : undefined;

    if (label) {
      return (
        <Label required={required} htmlFor={this._id} styles={labelStyles} disabled={props.disabled}>
          {props.label}
        </Label>
      );
    }
    return null;
  };

  private _onRenderDescription = (props: ITextFieldProps): JSX.Element | null => {
    if (props.description) {
      return <span className={this._classNames.description}>{props.description}</span>;
    }
    return null;
  };

  // @deprecated
  private _onRenderAddon(props: ITextFieldProps): JSX.Element {
    const { addonString } = props;
    return <span style={{ paddingBottom: '1px' }}>{addonString}</span>;
  }

  private _onRenderPrefix(props: ITextFieldProps): JSX.Element {
    const { prefix } = props;
    return <span style={{ paddingBottom: '1px' }}>{prefix}</span>;
  }

  private _onRenderSuffix(props: ITextFieldProps): JSX.Element {
    const { suffix } = props;
    return <span style={{ paddingBottom: '1px' }}>{suffix}</span>;
  }

  private get _errorMessage(): string | undefined {
    let { errorMessage } = this.state;
    if (!errorMessage && this.props.errorMessage) {
      errorMessage = this.props.errorMessage;
    }

    return errorMessage;
  }

  /**
   * If a custom description render function is supplied then treat description as always available.
   * Otherwise defer to the presence of description or error message text.
   */
  private get _isDescriptionAvailable(): boolean {
    const props = this.props;
    return !!(props.onRenderDescription || props.description || this._errorMessage);
  }

  private _renderTextArea(): React.ReactElement<React.HTMLAttributes<HTMLAreaElement>> {
    const textAreaProps = getNativeProps(this.props, textAreaProperties, ['defaultValue']);

    return (
      <textarea
        id={this._id}
        {...textAreaProps}
        ref={this._textElement}
        value={this.state.value}
        onInput={this._onInputChange}
        onChange={this._onInputChange}
        className={this._classNames.field}
        aria-describedby={this._isDescriptionAvailable ? this._descriptionId : this.props['aria-describedby']}
        aria-invalid={!!this.state.errorMessage}
        aria-label={this.props.ariaLabel}
        readOnly={this.props.readOnly}
        onFocus={this._onFocus}
        onBlur={this._onBlur}
      />
    );
  }

  private _renderInput(): React.ReactElement<React.HTMLAttributes<HTMLInputElement>> {
    const inputProps = getNativeProps<React.HTMLAttributes<HTMLInputElement>>(this.props, inputProperties, ['defaultValue']);

    return (
      <input
        type={'text'}
        id={this._id}
        {...inputProps}
        ref={this._textElement}
        value={this.state.value}
        onInput={this._onInputChange}
        onChange={this._onInputChange}
        className={this._classNames.field}
        aria-label={this.props.ariaLabel}
        aria-describedby={this._isDescriptionAvailable ? this._descriptionId : this.props['aria-describedby']}
        aria-invalid={!!this.state.errorMessage}
        readOnly={this.props.readOnly}
        onFocus={this._onFocus}
        onBlur={this._onBlur}
      />
    );
  }

  private _onInputChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    event.persist();
    const element: HTMLInputElement = event.target as HTMLInputElement;
    const value: string = element.value;

    // Avoid doing unnecessary work when the value has not changed.
    if (value === this._latestValue) {
      return;
    }
    this._latestValue = value;

    this.setState({ value: value } as ITextFieldState, () => {
      this._adjustInputHeight();

      if (this.props.onChange) {
        this.props.onChange(event, value);
      }

      if (this.props.onChanged) {
        this.props.onChanged(value);
      }
    });

    const { validateOnFocusIn, validateOnFocusOut } = this.props;
    if (!(validateOnFocusIn || validateOnFocusOut)) {
      this._delayedValidate(value);
    }

    if (this.props.onBeforeChange) {
      this.props.onBeforeChange(value);
    }
  };

  private _validate(value: string | undefined): void {
    const { validateOnFocusIn, validateOnFocusOut } = this.props;

    // In case of _validate called multi-times during executing validate logic with promise return.
    if (this._latestValidateValue === value && !(validateOnFocusIn || validateOnFocusOut)) {
      return;
    }

    this._latestValidateValue = value;
    const onGetErrorMessage = this.props.onGetErrorMessage as (value: string) => string | PromiseLike<string> | undefined;
    const result = onGetErrorMessage(value || '');

    if (result !== undefined) {
      if (typeof result === 'string') {
        this.setState({ errorMessage: result } as ITextFieldState);
        this._notifyAfterValidate(value, result);
      } else {
        const currentValidation: number = ++this._lastValidation;

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
    if (this._isMounted && value === this.state.value && this.props.onNotifyValidationResult) {
      this.props.onNotifyValidationResult(errorMessage, value);
    }
  }

  private _adjustInputHeight(): void {
    if (this._textElement.current && this.props.autoAdjustHeight && this.props.multiline) {
      const textField = this._textElement.current;
      textField.style.height = '';
      textField.style.height = textField.scrollHeight + 'px';
    }
  }
}
