import * as React from 'react';
import { Label } from '../../Label';
import { Icon } from '../../Icon';
import {
  Async,
  classNamesFunction,
  DelayedRender,
  getId,
  getNativeProps,
  getWindow,
  initializeComponentRef,
  inputProperties,
  isControlled,
  isIE11,
  textAreaProperties,
  warn,
  warnControlledUsage,
  warnMutuallyExclusive,
} from '../../Utilities';
import type { IProcessedStyleSet } from '../../Styling';
import type { ILabelStyleProps, ILabelStyles } from '../../Label';
import type { IStyleFunctionOrObject } from '../../Utilities';
import type { ITextField, ITextFieldProps, ITextFieldStyleProps, ITextFieldStyles } from './TextField.types';

const getClassNames = classNamesFunction<ITextFieldStyleProps, ITextFieldStyles>();

/** @internal */
export interface ITextFieldState {
  /** The currently displayed value if uncontrolled. */
  uncontrolledValue: string | undefined;

  /** Is true when the control has focus. */
  isFocused?: boolean;

  /**
   * Dynamic error message returned by `onGetErrorMessage`.
   * Use `this._errorMessage` to get the actual current error message.
   */
  errorMessage: string | JSX.Element;

  /**
   * Whether this field has `type='password'` and `canRevealPassword=true`, and the password is
   * currently being revealed.
   */
  isRevealingPassword?: boolean;
}

/** @internal */
export interface ITextFieldSnapshot {
  /**
   * If set, the text field is changing between single- and multi-line, so we'll need to reset
   * selection/cursor after the change completes.
   */
  selection?: [number | null, number | null];
}

const DEFAULT_STATE_VALUE = '';
const COMPONENT_NAME = 'TextField';

const REVEAL_ICON_NAME = 'RedEye';
const HIDE_ICON_NAME = 'Hide';

export class TextFieldBase
  extends React.Component<ITextFieldProps, ITextFieldState, ITextFieldSnapshot>
  implements ITextField
{
  public static defaultProps: ITextFieldProps = {
    resizable: true,
    deferredValidationTime: 200,
    validateOnLoad: true,
  };

  /** Fallback ID if none is provided in props. Access proper value via `this._id`. */
  private _fallbackId: string;
  private _descriptionId: string;
  private _labelId: string;
  private _prefixId: string;
  private _suffixId: string;
  private _delayedValidate: (value: string | undefined) => void;
  private _lastValidation: number;
  private _latestValidateValue: string | undefined;
  private _hasWarnedNullValue: boolean | undefined;
  private _textElement = React.createRef<HTMLTextAreaElement | HTMLInputElement>();
  private _classNames: IProcessedStyleSet<ITextFieldStyles>;
  private _async: Async;
  /** Most recent value from a change or input event, to help avoid processing events twice */
  private _lastChangeValue: string | undefined;

  public constructor(props: ITextFieldProps) {
    super(props);

    initializeComponentRef(this);
    this._async = new Async(this);

    if (process.env.NODE_ENV !== 'production') {
      warnMutuallyExclusive(COMPONENT_NAME, props, {
        errorMessage: 'onGetErrorMessage',
      });
    }

    this._fallbackId = getId(COMPONENT_NAME);
    this._descriptionId = getId(COMPONENT_NAME + 'Description');
    this._labelId = getId(COMPONENT_NAME + 'Label');
    this._prefixId = getId(COMPONENT_NAME + 'Prefix');
    this._suffixId = getId(COMPONENT_NAME + 'Suffix');

    this._warnControlledUsage();

    let { defaultValue = DEFAULT_STATE_VALUE } = props;
    if (typeof defaultValue === 'number') {
      // This isn't allowed per the props, but happens anyway.
      defaultValue = String(defaultValue);
    }
    this.state = {
      uncontrolledValue: this._isControlled ? undefined : defaultValue,
      isFocused: false,
      errorMessage: '',
    };

    this._delayedValidate = this._async.debounce(this._validate, this.props.deferredValidationTime);
    this._lastValidation = 0;
  }

  /**
   * Gets the current value of the text field.
   */
  public get value(): string | undefined {
    return _getValue(this.props, this.state);
  }

  public componentDidMount(): void {
    this._adjustInputHeight();

    if (this.props.validateOnLoad) {
      this._validate(this.value);
    }
  }

  public componentWillUnmount() {
    this._async.dispose();
  }

  public getSnapshotBeforeUpdate(prevProps: ITextFieldProps, prevState: ITextFieldState): ITextFieldSnapshot | null {
    return {
      selection: [this.selectionStart, this.selectionEnd],
    };
  }

  public componentDidUpdate(
    prevProps: ITextFieldProps,
    prevState: ITextFieldState,
    snapshot: ITextFieldSnapshot,
  ): void {
    const props = this.props;
    const { selection = [null, null] } = snapshot || {};
    const [start, end] = selection;

    if (!!prevProps.multiline !== !!props.multiline && prevState.isFocused) {
      // The text field has just changed between single- and multi-line, so we need to reset focus
      // and selection/cursor.
      this.focus();
      if (start !== null && end !== null && start >= 0 && end >= 0) {
        this.setSelectionRange(start, end);
      }
    }

    if (prevProps.value !== props.value) {
      // Only if the value in props changed, reset the record of the last value seen by a
      // change/input event (don't do this if the value in state changed, since at least in tests
      // the state update may happen before the second event in a series)
      this._lastChangeValue = undefined;
    }

    const prevValue = _getValue(prevProps, prevState);
    const value = this.value;
    if (prevValue !== value) {
      // Handle controlled/uncontrolled warnings and status
      this._warnControlledUsage(prevProps);

      // Clear error message if needed
      // TODO: is there any way to do this without an extra render?
      if (this.state.errorMessage && !props.errorMessage) {
        this.setState({ errorMessage: '' });
      }

      // Adjust height if needed based on new value
      this._adjustInputHeight();

      // TODO: #5875 added logic to trigger validation in componentWillReceiveProps and other places.
      // This seems a bit odd and hard to integrate with the new approach.
      // (Starting to think we should just put the validation logic in a separate wrapper component...?)
      if (_shouldValidateAllChanges(props)) {
        this._delayedValidate(value);
      }
    }
  }

  public render(): JSX.Element {
    const {
      borderless,
      className,
      disabled,
      invalid,
      iconProps,
      inputClassName,
      label,
      multiline,
      required,
      underlined,
      prefix,
      resizable,
      suffix,
      theme,
      styles,
      autoAdjustHeight,
      canRevealPassword,
      revealPasswordAriaLabel,
      type,
      onRenderPrefix = this._onRenderPrefix,
      onRenderSuffix = this._onRenderSuffix,
      onRenderLabel = this._onRenderLabel,
      onRenderDescription = this._onRenderDescription,
    } = this.props;
    const { isFocused, isRevealingPassword } = this.state;
    const errorMessage = this._errorMessage;
    const isInvalid = typeof invalid === 'boolean' ? invalid : !!errorMessage;

    const hasRevealButton = !!canRevealPassword && type === 'password' && _browserNeedsRevealButton();

    const classNames = (this._classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      disabled,
      focused: isFocused,
      required,
      multiline,
      hasLabel: !!label,
      hasErrorMessage: isInvalid,
      borderless,
      resizable,
      hasIcon: !!iconProps,
      underlined,
      inputClassName,
      autoAdjustHeight,
      hasRevealButton,
    }));

    return (
      // eslint-disable-next-line deprecation/deprecation
      <div ref={this.props.elementRef} className={classNames.root}>
        <div className={classNames.wrapper}>
          {onRenderLabel(this.props, this._onRenderLabel)}
          <div className={classNames.fieldGroup}>
            {(prefix !== undefined || this.props.onRenderPrefix) && (
              <div className={classNames.prefix} id={this._prefixId}>
                {onRenderPrefix(this.props, this._onRenderPrefix)}
              </div>
            )}
            {multiline ? this._renderTextArea() : this._renderInput()}
            {iconProps && <Icon className={classNames.icon} {...iconProps} />}
            {hasRevealButton && (
              // Explicitly set type="button" since the default button type within a form is "submit"
              <button
                aria-label={revealPasswordAriaLabel}
                className={classNames.revealButton}
                onClick={this._onRevealButtonClick}
                aria-pressed={!!isRevealingPassword}
                type="button"
              >
                <span className={classNames.revealSpan}>
                  <Icon
                    className={classNames.revealIcon}
                    iconName={isRevealingPassword ? HIDE_ICON_NAME : REVEAL_ICON_NAME}
                  />
                </span>
              </button>
            )}
            {(suffix !== undefined || this.props.onRenderSuffix) && (
              <div className={classNames.suffix} id={this._suffixId}>
                {onRenderSuffix(this.props, this._onRenderSuffix)}
              </div>
            )}
          </div>
        </div>
        {this._isDescriptionAvailable && (
          <span id={this._descriptionId}>
            {onRenderDescription(this.props, this._onRenderDescription)}
            {errorMessage && (
              <div role="alert">
                <DelayedRender>{this._renderErrorMessage()}</DelayedRender>
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

  private _warnControlledUsage(prevProps?: ITextFieldProps): void {
    // Show warnings if props are being used in an invalid way
    warnControlledUsage({
      componentId: this._id,
      componentName: COMPONENT_NAME,
      props: this.props,
      oldProps: prevProps,
      valueProp: 'value',
      defaultValueProp: 'defaultValue',
      onChangeProp: 'onChange',
      readOnlyProp: 'readOnly',
    });

    if (this.props.value === null && !this._hasWarnedNullValue) {
      this._hasWarnedNullValue = true;
      warn(
        `Warning: 'value' prop on '${COMPONENT_NAME}' should not be null. Consider using an ` +
          'empty string to clear the component or undefined to indicate an uncontrolled component.',
      );
    }
  }

  /** Returns `props.id` if available, or a fallback if not. */
  private get _id(): string {
    return this.props.id || this._fallbackId;
  }

  private get _isControlled(): boolean {
    return isControlled(this.props, 'value');
  }

  private _onFocus = (ev: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (this.props.onFocus) {
      this.props.onFocus(ev);
    }

    this.setState({ isFocused: true }, () => {
      if (this.props.validateOnFocusIn) {
        this._validate(this.value);
      }
    });
  };

  private _onBlur = (ev: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (this.props.onBlur) {
      this.props.onBlur(ev);
    }

    this.setState({ isFocused: false }, () => {
      if (this.props.validateOnFocusOut) {
        this._validate(this.value);
      }
    });
  };

  private _onRenderLabel = (props: ITextFieldProps): JSX.Element | null => {
    const { label, required } = props;
    // IProcessedStyleSet definition requires casting for what Label expects as its styles prop
    const labelStyles = this._classNames.subComponentStyles
      ? (this._classNames.subComponentStyles.label as IStyleFunctionOrObject<ILabelStyleProps, ILabelStyles>)
      : undefined;

    if (label) {
      return (
        <Label required={required} htmlFor={this._id} styles={labelStyles} disabled={props.disabled} id={this._labelId}>
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

  private _onRenderPrefix(props: ITextFieldProps): JSX.Element {
    const { prefix } = props;
    return <span style={{ paddingBottom: '1px' }}>{prefix}</span>;
  }

  private _onRenderSuffix(props: ITextFieldProps): JSX.Element {
    const { suffix } = props;
    return <span style={{ paddingBottom: '1px' }}>{suffix}</span>;
  }

  /**
   * Current error message from either `props.errorMessage` or the result of `props.onGetErrorMessage`.
   *
   * - If there is no validation error or we have not validated the input value, errorMessage is an empty string.
   * - If we have done the validation and there is validation error, errorMessage is the validation error message.
   */
  private get _errorMessage(): string | JSX.Element {
    const { errorMessage = this.state.errorMessage } = this.props;
    return errorMessage || '';
  }

  /**
   * Renders error message based on the type of the message.
   *
   * - If error message is string, it will render using the built in styles.
   * - If error message is an element, user has full control over how it's rendered.
   */
  private _renderErrorMessage(): JSX.Element | null {
    const errorMessage = this._errorMessage;

    return errorMessage ? (
      typeof errorMessage === 'string' ? (
        <p className={this._classNames.errorMessage}>
          <span data-automation-id="error-message">{errorMessage}</span>
        </p>
      ) : (
        <div className={this._classNames.errorMessage} data-automation-id="error-message">
          {errorMessage}
        </div>
      )
    ) : null;
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
    const { invalid = !!this._errorMessage } = this.props;
    const textAreaProps = getNativeProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
      this.props,
      textAreaProperties,
      ['defaultValue'],
    );
    const ariaLabelledBy = this.props['aria-labelledby'] || (this.props.label ? this._labelId : undefined);
    return (
      <textarea
        id={this._id}
        {...textAreaProps}
        ref={this._textElement as React.RefObject<HTMLTextAreaElement>}
        value={this.value || ''}
        onInput={this._onInputChange}
        onChange={this._onInputChange}
        className={this._classNames.field}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={this._isDescriptionAvailable ? this._descriptionId : this.props['aria-describedby']}
        aria-invalid={invalid}
        aria-label={this.props.ariaLabel}
        readOnly={this.props.readOnly}
        onFocus={this._onFocus}
        onBlur={this._onBlur}
      />
    );
  }

  private _renderInput(): JSX.Element | null {
    const {
      ariaLabel,
      invalid = !!this._errorMessage,
      onRenderPrefix,
      onRenderSuffix,
      prefix,
      suffix,
      type = 'text',
      label,
    } = this.props;

    // build aria-labelledby list from label, prefix, and suffix
    const labelIds = [];
    label && labelIds.push(this._labelId);
    (prefix !== undefined || onRenderPrefix) && labelIds.push(this._prefixId);
    (suffix !== undefined || onRenderSuffix) && labelIds.push(this._suffixId);

    const inputProps: React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement> = {
      type: this.state.isRevealingPassword ? 'text' : type,
      id: this._id,
      ...getNativeProps(this.props, inputProperties, ['defaultValue', 'type']),
      'aria-labelledby': this.props['aria-labelledby'] || (labelIds.length > 0 ? labelIds.join(' ') : undefined),
      ref: this._textElement as React.RefObject<HTMLInputElement>,
      value: this.value || '',
      onInput: this._onInputChange,
      onChange: this._onInputChange,
      className: this._classNames.field,
      'aria-label': ariaLabel,
      'aria-describedby': this._isDescriptionAvailable ? this._descriptionId : this.props['aria-describedby'],
      'aria-invalid': invalid,
      onFocus: this._onFocus,
      onBlur: this._onBlur,
    };

    const defaultRender = (updatedInputProps: React.InputHTMLAttributes<HTMLInputElement>) => {
      return <input {...updatedInputProps} />;
    };
    const onRenderInput = this.props.onRenderInput || defaultRender;
    return onRenderInput(inputProps, defaultRender);
  }

  private _onRevealButtonClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    this.setState(prevState => ({ isRevealingPassword: !prevState.isRevealingPassword }));
  };

  private _onInputChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    // Previously, we needed to call both onInput and onChange due to some weird IE/React issues,
    // which have *probably* been fixed now:
    // - https://github.com/microsoft/fluentui/issues/744 (likely fixed)
    // - https://github.com/microsoft/fluentui/issues/824 (confirmed fixed)

    // TODO (Fabric 8?) - Switch to calling only onChange. This switch is pretty disruptive for
    // tests (ours and maybe consumers' too), so it seemed best to do the switch in a major bump.

    const element = event.target as HTMLInputElement;
    const value = element.value;
    // Ignore this event if any of the following are true:
    // - the value is undefined (in case one of the IE bugs comes back)
    // - it's a duplicate event (important since onInputChange is called twice per actual user event)
    // - it's the same as the previous value
    const previousValue = _getValue(this.props, this.state) || '';
    if (value === undefined || value === this._lastChangeValue || value === previousValue) {
      this._lastChangeValue = undefined;
      return;
    }
    this._lastChangeValue = value;

    this.props.onChange?.(event, value);

    if (!this._isControlled) {
      // ONLY if this is an uncontrolled component, update the displayed value.
      // (Controlled components must update the `value` prop from `onChange`.)
      this.setState({ uncontrolledValue: value });
    }
  };

  private _validate(value: string | undefined): void {
    // In case _validate is called again while validation promise is executing
    if (this._latestValidateValue === value && _shouldValidateAllChanges(this.props)) {
      return;
    }

    this._latestValidateValue = value;
    const onGetErrorMessage = this.props.onGetErrorMessage;
    const result = onGetErrorMessage && onGetErrorMessage(value || '');

    if (result !== undefined) {
      if (typeof result === 'string' || !('then' in result)) {
        this.setState({ errorMessage: result });
        this._notifyAfterValidate(value, result);
      } else {
        const currentValidation: number = ++this._lastValidation;

        result.then((errorMessage: string | JSX.Element) => {
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

  private _notifyAfterValidate(value: string | undefined, errorMessage: string | JSX.Element): void {
    if (value === this.value && this.props.onNotifyValidationResult) {
      this.props.onNotifyValidationResult(errorMessage, value);
    }
  }

  private _adjustInputHeight(): void {
    if (this._textElement.current && this.props.autoAdjustHeight && this.props.multiline) {
      const scrollTop = this.props.scrollContainerRef?.current?.scrollTop;
      const textField = this._textElement.current;
      textField.style.height = '';
      textField.style.height = textField.scrollHeight + 'px';

      if (scrollTop) {
        // Safe to assert not null, otherwise we wouldn't have a scrollTop;
        this.props.scrollContainerRef!.current!.scrollTop = scrollTop;
      }
    }
  }
}

/** Get the value from the given state and props (converting from number to string if needed) */
function _getValue(props: ITextFieldProps, state: ITextFieldState): string | undefined {
  const { value = state.uncontrolledValue } = props;
  if (typeof value === 'number') {
    // not allowed per typings, but happens anyway
    return String(value);
  }
  return value;
}

/**
 * If `validateOnFocusIn` or `validateOnFocusOut` is true, validation should run **only** on that event.
 * Otherwise, validation should run on every change.
 */
function _shouldValidateAllChanges(props: ITextFieldProps): boolean {
  return !(props.validateOnFocusIn || props.validateOnFocusOut);
}

// Only calculate this once across all TextFields, since will stay the same
let __browserNeedsRevealButton: boolean | undefined;

function _browserNeedsRevealButton() {
  if (typeof __browserNeedsRevealButton !== 'boolean') {
    const win = getWindow();

    if (win?.navigator) {
      // Edge, Chromium Edge
      const isEdge = /Edg/.test(win.navigator.userAgent || '');

      __browserNeedsRevealButton = !(isIE11() || isEdge);
    } else {
      __browserNeedsRevealButton = true;
    }
  }
  return __browserNeedsRevealButton;
}
