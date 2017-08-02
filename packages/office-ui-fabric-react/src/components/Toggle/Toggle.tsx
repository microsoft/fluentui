import * as React from 'react';
import {
  BaseComponent,
  autobind,
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
  customizable
} from '../../Utilities';
import {
  mergeStyles
} from '../../Styling';

import { getStyles } from './Toggle.styles';

export interface IToggleState {
  isChecked: boolean;
}

interface IToggleClassNames {
  root: string;
  label: string;
  container: string;
  pill: string;
  thumb: string;
  text: string;
}

@customizable(['theme'])
export class Toggle extends BaseComponent<IToggleProps, IToggleState> implements IToggle {

  private _id: string;
  private _toggleButton: HTMLButtonElement;

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

    let {
      className,
      theme,
      styles: customStyles,
      disabled,
      label,
      offAriaLabel,
      offText,
      onAriaLabel,
      onText
      } = this.props;
    let { isChecked } = this.state;
    let stateText = isChecked ? onText : offText;
    const ariaLabel = isChecked ? onAriaLabel : offAriaLabel;
    const toggleNativeProps = getNativeProps(this.props, inputProperties, ['defaultChecked']);
    const classNames = this._getClassNames(
      getStyles(theme!, customStyles),
      className!,
      disabled!,
      isChecked
    );

    return (
      <div className={ classNames.root }>

        { label && (
          <Label htmlFor={ this._id } className={ classNames.label }>{ label }</Label>
        ) }

        <div className={ classNames.container } >
          <button
            { ...toggleNativeProps }
            type='button'
            className={ classNames.pill }
            ref={ (c): HTMLButtonElement => this._toggleButton = c }
            aria-disabled={ disabled }
            aria-pressed={ isChecked }
            aria-label={ ariaLabel }
            id={ this._id }
            onChange={ () => { /* no-op */ } }
            disabled={ disabled }
            data-is-focusable={ true }
            onClick={ this._onClick }
          >
            <div className={ classNames.thumb } />
          </button>
          { stateText && (
            <Label className={ classNames.text }>{ stateText }</Label>
          ) }
        </div>
      </div >
    );
  }

  public focus() {
    if (this._toggleButton) {
      this._toggleButton.focus();
    }
  }

  @autobind
  private _onClick(ev: React.MouseEvent<HTMLElement>) {
    let { checked, onChanged, onClick } = this.props;
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

    if (onClick) {
      onClick(ev);
    }
  }

  @memoize
  private _getClassNames(
    styles: IToggleStyles,
    className: string,
    disabled: boolean,
    isChecked: boolean
    ): IToggleClassNames {

    return {
      root: mergeStyles(
        'ms-Toggle',
        isChecked && 'is-checked',
        !disabled && 'is-enabled',
        disabled && 'is-disabled',
        className,
        styles.root
      ) as string,

      label: mergeStyles(
        'ms-Toggle-label',
        styles.label
      ) as string,

      container: mergeStyles(
        'ms-Toggle-innerContainer',
        styles.container
      ) as string,

      pill: mergeStyles(
        'ms-Toggle-background',
        styles.pill,
        !disabled && [
          !isChecked && {
            ':hover': styles.pillHovered,
            ':hover .ms-Toggle-thumb': styles.thumbHovered
          },
          isChecked && [
            styles.pillChecked,
            {
              ':hover': styles.pillCheckedHovered,
              ':hover .ms-Toggle-thumb': styles.thumbCheckedHovered
            }
          ]
        ],
        disabled && [
          !isChecked && styles.pillDisabled,
          isChecked && styles.pillCheckedDisabled,
        ]
      ) as string,

      thumb: mergeStyles(
        'ms-Toggle-thumb',
        styles.thumb,
        !disabled && isChecked && styles.thumbChecked,
        disabled && [
          !isChecked && styles.thumbDisabled,
          isChecked && styles.thumbCheckedDisabled
        ]
      ) as string,

      text: mergeStyles(
        'ms-Toggle-stateText',
        styles.text
      ) as string,

    };
  }

}
