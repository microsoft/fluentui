import * as React from 'react';
import {
  BaseComponent,
  KeyCodes,
  autobind,
  css,
  getId,
  inputProperties,
  getNativeProps,
  memoize
} from '../../Utilities';
import {
  IToggleProps,
  IToggle,
  IToggleStyles
} from './Toggle.Props';
import { Label } from '../../Label';
import {
  mergeStyles,
  mergeStyleSets,
  IStyle
} from '../../Styling';

import { getStyles } from './Toggle.styles';

export interface IToggleState {
  isChecked: boolean;
}

interface IToggleClassNames {
  root: string;
  label: string;
  control: string;
  invisibleToggle: string;
  stateText: string;

  toggle: string;
  thumb: string;
}

export class Toggle extends BaseComponent<IToggleProps, IToggleState> implements IToggle {

  private _id: string;
  private _toggleInput: HTMLInputElement;

  @memoize
  private _getClassNames(
    styles: IToggleStyles,
    enabled: boolean,
    checked: boolean
    ): IToggleClassNames {
    return {
      root: mergeStyles(styles.root) as string,
      label: mergeStyles(styles.label) as string,
      control: mergeStyles(styles.control,
        enabled && !checked && {
          ':hover': {
            ' .ms-Toggle-background': styles.toggleHovered,
            ' .ms-Toggle-thumb': styles.thumbHovered
          }
        },
        enabled && checked && {
          ':hover': {
            ' .ms-Toggle-background': styles.toggleOnHovered,
            ' .ms-Toggle-thumb': styles.thumbOnHovered
          }
        }) as string,
      invisibleToggle: mergeStyles(styles.invisibleToggle,
        { ':focus + .ms-Toggle-background': styles.focus }
      ) as string,
      stateText: mergeStyles(styles.stateText) as string,
      toggle: mergeStyles(styles.toggle,
        enabled && !checked && styles.toggleDefault,
        enabled && checked && styles.toggleOn,
        !enabled && !checked && styles.toggleDisabled,
        !enabled && checked && styles.toggleOnDisabled
      ) as string,
      thumb: mergeStyles(styles.thumb,
        enabled && !checked && styles.thumbDefault,
        enabled && checked && styles.thumbOn,
        !enabled && !checked && styles.thumbDisabled,
        !enabled && checked && styles.thumbOnDisabled
      ) as string
    }
  };

  constructor(props: IToggleProps) {
    super();

    this._warnMutuallyExclusive({
      checked: 'defaultChecked'
    });

    this.state = {
      isChecked: !!(props.checked || props.defaultChecked)
    };
    this._id = props.id || getId('Toggle');
  }

  /**
   * Gets the current checked state of the toggle.
   */
  public get checked(): boolean {
    return this.state.isChecked;
  }

  public componentWillReceiveProps(newProps: IToggleProps) {
    if (newProps.checked !== undefined) {
      this.setState({
        isChecked: !!newProps.checked // convert null to false
      });
    }
  }

  public render() {
    // This control is using an input element for more universal accessibility support.
    // Previously a button and the aria-pressed attribute were used. This technique works well with Narrator + Edge and NVDA + FireFox.
    // However, JAWS and VoiceOver did not announce anything when the toggle was checked or unchecked.
    // In the future when more screenreaders support aria-pressed it would be a good idea to change this control back to using it as it is
    // more semantically correct.

    let { label, onAriaLabel, offAriaLabel, onText, offText, className, disabled, customStyles } = this.props;
    let { isChecked } = this.state;
    let stateText = isChecked ? onText : offText;
    const ariaLabel = isChecked ? onAriaLabel : offAriaLabel;
    const toggleNativeProps = getNativeProps(this.props, inputProperties, ['defaultChecked']);
    let styles = this._getClassNames(
      mergeStyleSets(getStyles(undefined), customStyles),
      !disabled,
      isChecked);

    return (
      <div className={
        css(
          'ms-Toggle',
          className,
          {
            'is-checked': isChecked,
            'is-enabled': !disabled,
            'is-disabled': disabled
          },
          styles.root
        ) }>

        { label && (
          <Label htmlFor={ this._id } className={ css('ms-Toggle-label', styles.label) }>{ label }</Label>
        ) }

        <div className={ css('ms-Toggle-control', styles.control) }>
          <input
            key='invisibleToggle'
            ref={ (c): HTMLInputElement => this._toggleInput = c }
            type='checkbox'
            id={ this._id }
            onChange={ () => { /* no-op */ } }
            { ...toggleNativeProps }
            className={ css(styles.invisibleToggle) }
            name={ this._id }
            disabled={ disabled }
            checked={ isChecked }
            aria-label={ ariaLabel }
            onClick={ this._onClick }
            onKeyDown={ this._onInputKeyDown }
          />
          <div className={ css('ms-Toggle-background', styles.toggle) }>
            <div className={ css('ms-Toggle-thumb', styles.thumb) } />
          </div>
          { stateText && (
            <Label className={ css('ms-Toggle-stateText', styles.stateText) }>{ stateText }</Label>
          ) }
        </div>
      </div>
    );
  }

  public focus() {
    if (this._toggleInput) {
      this._toggleInput.focus();
    }
  }

  @autobind
  private _onClick() {
    let { checked, onChanged } = this.props;
    let { isChecked } = this.state;

    // Only update the state if the user hasn't provided it.
    if (checked === undefined) {
      this.setState({
        isChecked: !isChecked
      });
    }

    if (onChanged) {
      onChanged(!isChecked);
    }
  }

  @autobind
  private _onInputKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
    switch (ev.which) {
      case KeyCodes.enter:
        // Also support toggling via the enter key.
        this._onClick();

        break;
    }
  }
}
