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
  IStyleFunctionOrObject,
  warnControlledUsage,
  warnControlledUncontrolledSwitch
} from '../../Utilities';
import { ITextField, ITextFieldProps, ITextFieldStyleProps, ITextFieldStyles } from './TextField.types';

const getClassNames = classNamesFunction<ITextFieldStyleProps, ITextFieldStyles>();

export interface ITextFieldState {
  /**
   * The currently displayed value. Do NOT update via `setState` (outside the TextField class).
   * This is unsupported and may lead to unexpected behavior. Instead, update the value by passing
   * an updated `value` prop.
   */
  value?: string;

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

const DEFAULT_STATE_VALUE = '';

export class TextFieldBase extends BaseComponent<ITextFieldProps, ITextFieldState> implements ITextField {
  public static defaultProps: ITextFieldProps = {
    multiline: false,
    resizable: true,
    autoAdjustHeight: false,
    underlined: false,
    borderless: false,
    deferredValidationTime: 200,
    errorMessage: '',
    validateOnFocusIn: false,
    validateOnFocusOut: false,
    validateOnLoad: true
  };

  private _id: string;
  private _descriptionId: string;
  private _delayedValidate: (value: string | undefined) => void;
  /**
   * (only used in strict mode)
   * Whether the component is controlled. Undefined means inconclusive (neither value nor
   * defaultValue has been specified in props so far). Following the behavior of React's `<input>`,
   * the component may be changed from uncontrolled to controlled (with a warning), but not
   * vice versa--if it's ever been controlled, it's stuck that way.
   */
  private _isControlled: boolean | undefined;
  private _lastValidation: number;
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
      onChanged: 'onChange',
      onBeforeChange: 'onChange'
    });

    if (!props.strictMode) {
      // this warning is handled elsewhere in strict mode
      this._warnMutuallyExclusive({
        value: 'defaultValue'
      });
    }

    this._id = props.id || getId('TextField');
    this._descriptionId = getId('TextFieldDescription');

    let value: string;
    if (props.strictMode) {
      value = this._getValueAndUpdateIsControlled(props, true /*isConstructor*/);
    } else {
      // Use != null to check if value is provided, since that's the same check used by React's <input>
      // tslint:disable:triple-equals
      if (props.value != null) {
        value = String(props.value);
      } else if (props.defaultValue != null) {
        value = String(props.defaultValue);
      } else {
        value = DEFAULT_STATE_VALUE;
      }
      // tslint:enable:triple-equals
    }

    this.state = {
      value: value,
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
    this._adjustInputHeight();

    if (this.props.validateOnLoad) {
      this._validate(this.state.value);
    }
  }

  public componentWillReceiveProps(newProps: ITextFieldProps): void {
    this._id = newProps.id || this._id;

    // If text field is changing between single- and multi-line, save some info so we can reset
    // focus and selection/cursor after the change is complete.
    if (!!newProps.multiline !== !!this.props.multiline && this.state.isFocused) {
      this._shouldResetFocusAfterRender = true;
      this._selectionBeforeInputTypeChange = [this.selectionStart, this.selectionEnd];
    }

    let newValue: string | undefined = this.state.value;

    if (this.props.strictMode) {
      newValue = this._getValueAndUpdateIsControlled(newProps);
    } else {
      // Deprecated behavior
      // (allows switching freely between controlled/uncontrolled and allows updates to defaultValue)

      // If old value prop was provided, then component is controlled and we should
      //    respect new undefined value and update state accordingly.
      if (newProps.value !== this.state.value && (newProps.value !== undefined || this.props.value !== undefined)) {
        newValue = newProps.value;
      }
      if (newProps.defaultValue !== this.props.defaultValue && newProps.value === undefined) {
        // If component is not currently controlled and defaultValue changes, set value to new defaultValue.
        // tslint:disable-next-line:triple-equals
        newValue = newProps.defaultValue != null ? String(newProps.defaultValue) : DEFAULT_STATE_VALUE;
      }
    }

    if (newValue !== this.state.value) {
      // tslint:disable-next-line:triple-equals
      newValue = newValue != null ? String(newValue) : DEFAULT_STATE_VALUE;

      if (newProps.onBeforeChange) {
        newProps.onBeforeChange(newValue);
      }

      // Update the displayed value
      this._setValue(newValue);

      const { validateOnFocusIn, validateOnFocusOut } = newProps;
      if (!(validateOnFocusIn || validateOnFocusOut)) {
        this._delayedValidate(newValue);
      }
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

  /**
   * (only used in strict mode)
   * Get the current value from newProps or state, update whether the component is controlled,
   * and log any appropriate warnings in the console.
   */
  private _getValueAndUpdateIsControlled(newProps: ITextFieldProps, isConstructor?: boolean): string {
    warnControlledUsage(this._id, this.className, newProps, 'value', 'defaultValue', 'onChange', 'onChanged', 'readOnly');

    // Check if the component should be controlled or uncontrolled according to the new props.
    // We use != null since it's the check used by React's <input>, and it properly accounts for ''.
    // The warning logic also closely follows what React does.
    // See: https://github.com/facebook/react/blob/master/packages/react-dom/src/client/ReactDOMInput.js
    // tslint:disable:triple-equals
    let newIsControlledFromProps: boolean | undefined;
    if (newProps.value != null) {
      newIsControlledFromProps = true;
    } else if (newProps.defaultValue != null) {
      newIsControlledFromProps = false;
    }
    // else, indeterminate (handled as uncontrolled)

    // Warn if switching between uncontrolled and controlled.
    // (One difference between this implementation and React's <input> is that oldIsControlled is
    // indeterminate and newIsControlled is true, we don't warn.)
    const oldIsControlled = this._isControlled;
    if (oldIsControlled !== undefined && !!newIsControlledFromProps !== !!oldIsControlled) {
      warnControlledUncontrolledSwitch(this._id, this.className, !!oldIsControlled);
    }

    // If the component has ever been controlled, it's always considered controlled from that point on.
    const newIsControlled = (this._isControlled = oldIsControlled || newIsControlledFromProps);

    // Use the old value from state unless it's been updated in a valid way.
    let value = this.state && this.state.value;
    if (newIsControlled && newProps.value != null) {
      // If the component is controlled and a valid value is given, use it.
      value = newProps.value;
    } else if (!newIsControlled && isConstructor) {
      // If the component is uncontrolled and this is the constructor, use the default value.
      // (defaultValue is ignored after the component is first constructed)
      value = newProps.defaultValue;
    }

    // If null/undefined is given, use '' instead. (The != null check and string conversion
    // handle the case where the number 0 is for some reason passed as the value.)
    return value != null ? String(value) : DEFAULT_STATE_VALUE;

    // tslint:enable:triple-equals
  }

  private _setValue(value?: string) {
    this.setState(
      {
        value: value || DEFAULT_STATE_VALUE,
        errorMessage: ''
      },
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
        <Label required={required} htmlFor={this._id} styles={labelStyles}>
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
    const props = this.props;
    const { validateOnFocusIn, validateOnFocusOut, onChange, onChanged, onBeforeChange } = props;

    // Avoid doing unnecessary work when the value has not changed.
    if (value === this.state.value) {
      return;
    }

    if (props.strictMode) {
      if (onBeforeChange) {
        onBeforeChange(value);
      }

      if (onChange) {
        onChange(event, value);
      } else if (onChanged) {
        onChanged(value);
      }

      // ONLY is this is an uncontrolled component, update the displayed value.
      // (Controlled components must update the `value` prop from `onChange`.)
      if (!this._isControlled) {
        this._setValue(value);

        if (!(validateOnFocusIn || validateOnFocusOut)) {
          this._delayedValidate(value);
        }
      }
    } else {
      // Deprecated behavior
      this.setState({ value: value } as ITextFieldState, () => {
        if (onChange) {
          onChange(event, value);
        } else if (onChanged) {
          onChanged(value);
        }
      });

      if (!(validateOnFocusIn || validateOnFocusOut)) {
        this._delayedValidate(value);
      }

      if (onBeforeChange) {
        onBeforeChange(value);
      }
    }
  };

  private _validate(value: string | undefined): void {
    const { validateOnFocusIn, validateOnFocusOut } = this.props;

    // In case _validate is called again while validation promise is executing
    if (this._latestValidateValue === value && !(validateOnFocusIn || validateOnFocusOut)) {
      return;
    }

    this._latestValidateValue = value;
    const result = this.props.onGetErrorMessage && this.props.onGetErrorMessage(value || '');

    if (result !== undefined) {
      if (typeof result === 'string') {
        this.setState({ errorMessage: result });
        this._notifyAfterValidate(value, result);
      } else {
        const currentValidation: number = ++this._lastValidation;

        result.then((errorMessage: string) => {
          if (currentValidation === this._lastValidation) {
            this.setState({ errorMessage });
          }
          this._notifyAfterValidate(value, errorMessage);
        });
      }
    } else {
      this._notifyAfterValidate(value, '');
    }
  }

  private _notifyAfterValidate(value: string | undefined, errorMessage: string): void {
    if (value === this.state.value && this.props.onNotifyValidationResult) {
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
