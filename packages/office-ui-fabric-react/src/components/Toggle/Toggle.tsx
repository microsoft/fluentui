import * as React from 'react';
import {
  BaseComponent,
  KeyCodes,
  autobind,
  css,
  getId,
  inputProperties,
  getNativeProps
} from '../../Utilities';
import { IToggleProps, IToggle } from './Toggle.Props';
import { Label } from '../../Label';
import * as stylesImport from './Toggle.scss';
const styles: any = stylesImport;

export interface IToggleState {
  isChecked: boolean;
}

export class Toggle extends BaseComponent<IToggleProps, IToggleState> implements IToggle {

  private _id: string;
  private _toggleInput: HTMLInputElement;

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

    let { label, onAriaLabel, offAriaLabel, onText, offText, className, disabled } = this.props;
    let { isChecked } = this.state;
    let stateText = isChecked ? onText : offText;
    const ariaLabel = isChecked ? onAriaLabel : offAriaLabel;
    const toggleNativeProps = getNativeProps(this.props, inputProperties, ['defaultChecked']);
    return (
      <div className={
        css(
          styles.root,
          'ms-Toggle',
          className,
          {
            'is-checked': isChecked,
            'is-enabled': !disabled,
            'is-disabled': disabled,
            [styles.isChecked]: isChecked,
            [styles.isEnabled]: !disabled,
            [styles.isDisabled]: disabled,
          }
        ) }>
        <div className={ css(styles.innerContainer, 'ms-Toggle-innerContainer') }>
          { label && (
            <Label className='ms-Toggle-label' htmlFor={ this._id }>{ label }</Label>
          ) }
          <div className={ css(styles.slider, 'ms-Toggle-slider') }>
            <input
              key='invisibleToggle'
              ref={ (c): HTMLInputElement => this._toggleInput = c }
              type='checkbox'
              id={ this._id }
              onChange={ () => { /* no-op */ } }
              { ...toggleNativeProps }
              className={ styles.invisibleToggle }
              name={ this._id }
              disabled={ disabled }
              checked={ isChecked }
              aria-label={ ariaLabel }
              onClick={ this._onClick }
              onKeyDown={ this._onInputKeyDown }
            />
            <div className={ css(styles.background, 'ms-Toggle-background') }>
              <div className={ css(styles.focus, 'ms-Toggle-focus') } />
              <div className={ css(styles.thumb, 'ms-Toggle-thumb') } />
            </div>
            { stateText && (
              <Label className={ css(styles.stateText, 'ms-Toggle-stateText') }>{ stateText }</Label>
            ) }
          </div>
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
        // While toggling via the space bar is technically correct for a checkbox, this control looks more like a button to sighted users.
        this._onClick();

        break;
    }
  }
}
