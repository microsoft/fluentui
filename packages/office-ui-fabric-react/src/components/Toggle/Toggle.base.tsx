import * as React from 'react';
import {
  initializeComponentRef,
  classNamesFunction,
  getId,
  inputProperties,
  getNativeProps,
  warnDeprecations,
  warnMutuallyExclusive,
  FocusRects,
} from '../../Utilities';
import { IToggleProps, IToggle, IToggleStyleProps, IToggleStyles } from './Toggle.types';
import { Label } from '../../Label';
import { KeytipData } from '../../KeytipData';

export interface IToggleState {
  checked: boolean;
}

const getClassNames = classNamesFunction<IToggleStyleProps, IToggleStyles>();
const COMPONENT_NAME = 'Toggle';

export class ToggleBase extends React.Component<IToggleProps, IToggleState> implements IToggle {
  private _id: string;
  private _toggleButton = React.createRef<HTMLButtonElement>();

  public static getDerivedStateFromProps(
    nextProps: Readonly<IToggleProps>,
    prevState: Readonly<IToggleState>,
  ): Partial<IToggleState> | null {
    if (nextProps.checked === undefined) {
      return null;
    }

    return {
      checked: !!nextProps.checked,
    };
  }

  constructor(props: IToggleProps) {
    super(props);

    initializeComponentRef(this);
    warnMutuallyExclusive(COMPONENT_NAME, props, {
      checked: 'defaultChecked',
    });

    warnDeprecations(COMPONENT_NAME, props, {
      onAriaLabel: 'ariaLabel',
      offAriaLabel: undefined,
      onChanged: 'onChange',
    });

    this.state = {
      checked: !!(props.checked || props.defaultChecked),
    };
    this._id = props.id || getId('Toggle');
  }

  /**
   * Gets the current checked state of the toggle.
   */
  public get checked(): boolean {
    return this.state.checked;
  }

  public render(): JSX.Element {
    const {
      as: RootType = 'div',
      className,
      theme,
      disabled,
      keytipProps,
      label,
      ariaLabel,
      /* eslint-disable deprecation/deprecation */
      onAriaLabel,
      offAriaLabel,
      /* eslint-enable deprecation/deprecation */
      offText,
      onText,
      styles,
      inlineLabel,
    } = this.props;
    const { checked } = this.state;
    const stateText = checked ? onText : offText;
    const badAriaLabel = checked ? onAriaLabel : offAriaLabel;
    const toggleNativeProps = getNativeProps(this.props, inputProperties, ['defaultChecked']);
    const classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      disabled,
      checked,
      inlineLabel,
      onOffMissing: !onText && !offText,
    });

    const labelId = `${this._id}-label`;
    const stateTextId = `${this._id}-stateText`;

    // The following properties take priority for what Narrator should read:
    // 1. ariaLabel
    // 2. onAriaLabel (if checked) or offAriaLabel (if not checked)
    // 3. label AND stateText, if existent

    let labelledById: string | undefined = undefined;
    if (!ariaLabel && !badAriaLabel) {
      if (label) {
        labelledById = labelId;
      }
      if (stateText) {
        labelledById = labelledById ? `${labelledById} ${stateTextId}` : stateTextId;
      }
    }

    const ariaRole = this.props.role ? this.props.role : 'switch';

    const renderPill = (keytipAttributes: any = {}) => (
      <button
        {...toggleNativeProps}
        {...keytipAttributes}
        className={classNames.pill}
        disabled={disabled}
        id={this._id}
        type="button"
        role={ariaRole}
        ref={this._toggleButton}
        aria-disabled={disabled}
        aria-checked={checked}
        aria-label={ariaLabel ? ariaLabel : badAriaLabel}
        data-is-focusable={true}
        onChange={this._noop}
        onClick={this._onClick}
        aria-labelledby={labelledById}
      >
        <span className={classNames.thumb} />
      </button>
    );

    const pillContent = keytipProps ? (
      <KeytipData
        keytipProps={keytipProps}
        ariaDescribedBy={(toggleNativeProps as any)['aria-describedby']}
        disabled={disabled}
      >
        {(keytipAttributes: any): JSX.Element => renderPill(keytipAttributes)}
      </KeytipData>
    ) : (
      renderPill()
    );

    return (
      <RootType className={classNames.root} hidden={(toggleNativeProps as any).hidden}>
        {label && (
          <Label htmlFor={this._id} className={classNames.label} id={labelId}>
            {label}
          </Label>
        )}

        <div className={classNames.container}>
          {pillContent}
          {stateText && (
            // This second "htmlFor" property is needed to allow the
            // toggle's stateText to also trigger a state change when clicked.
            <Label htmlFor={this._id} className={classNames.text} id={stateTextId}>
              {stateText}
            </Label>
          )}
        </div>
        <FocusRects />
      </RootType>
    );
  }

  public focus() {
    if (this._toggleButton.current) {
      this._toggleButton.current.focus();
    }
  }

  private _onClick = (ev: React.MouseEvent<HTMLElement>) => {
    // eslint-disable-next-line deprecation/deprecation
    const { disabled, checked: checkedProp, onChange, onChanged, onClick } = this.props;
    const { checked } = this.state;

    if (!disabled) {
      // Only update the state if the user hasn't provided it.
      if (checkedProp === undefined) {
        this.setState({
          checked: !checked,
        });
      }

      if (onChange) {
        onChange(ev, !checked);
      }

      if (onChanged) {
        onChanged(!checked);
      }

      if (onClick) {
        onClick(ev);
      }
    }
  };

  private _noop(): void {
    /* no-op */
  }
}
