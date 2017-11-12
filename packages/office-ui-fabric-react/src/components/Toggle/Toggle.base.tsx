import * as React from 'react';
import {
  BaseComponent,
  autobind,
  customizable,
  getId,
  inputProperties,
  getNativeProps
} from '../../Utilities';
import {
  IToggleProps,
  IToggle,
  IToggleStyleProps,
  IToggleStyles
} from './Toggle.types';
import { Label } from '../../Label';
import { classNamesFunction } from '../../Styling';

export interface IToggleState {
  checked: boolean;
}

const getClassNames = classNamesFunction<IToggleStyleProps, IToggleStyles>();

@customizable('Toggle', ['theme'])
export class ToggleBase extends BaseComponent<IToggleProps, IToggleState> implements IToggle {
  private _id: string;
  private _toggleButton: HTMLButtonElement;

  constructor(props: IToggleProps) {
    super();

    this._warnMutuallyExclusive({
      checked: 'defaultChecked'
    });

    this.state = {
      checked: !!(props.checked || props.defaultChecked)
    };
    this._id = props.id || getId('Toggle');
  }

  /**
   * Gets the current checked state of the toggle.
   */
  public get checked(): boolean {
    return this.state.checked;
  }

  public componentWillReceiveProps(newProps: IToggleProps) {
    if (newProps.checked !== undefined) {
      this.setState({
        checked: !!newProps.checked // convert null to false
      });
    }
  }

  public render() {
    const {
      as: RootType = 'div',
      className,
      theme,
      disabled,
      label,
      offAriaLabel,
      offText,
      onAriaLabel,
      onText,
      getStyles
      } = this.props;
    const { checked } = this.state;
    const stateText = checked ? onText : offText;
    const ariaLabel = checked ? onAriaLabel : offAriaLabel;
    const toggleNativeProps = getNativeProps(this.props, inputProperties, ['defaultChecked']);
    const classNames = getClassNames(
      getStyles!,
      {
        theme: theme!,
        className,
        disabled,
        checked
      }
    );

    return (
      <RootType className={ classNames.root }>

        { label && (
          <Label htmlFor={ this._id } className={ classNames.label }>{ label }</Label>
        ) }

        <div className={ classNames.container } >
          <button
            { ...toggleNativeProps }
            className={ classNames.pill }
            disabled={ disabled }
            id={ this._id }
            type='button'
            ref={ this._resolveRef('_toggleButton') }
            aria-disabled={ disabled }
            aria-pressed={ checked }
            aria-label={ ariaLabel }
            data-is-focusable={ true }
            onChange={ this._noop }
            onClick={ this._onClick }
          >
            <div className={ classNames.thumb } />
          </button>
          { stateText && (
            <Label htmlFor={ this._id } className={ classNames.text }>{ stateText }</Label>
          ) }
        </div>
      </RootType>
    );
  }

  public focus() {
    if (this._toggleButton) {
      this._toggleButton.focus();
    }
  }

  @autobind
  private _onClick(ev: React.MouseEvent<HTMLElement>) {
    let { disabled, checked: checkedProp, onChanged, onClick } = this.props;
    let { checked } = this.state;

    if (!disabled) {
      // Only update the state if the user hasn't provided it.
      if (checkedProp === undefined) {
        this.setState({
          checked: !checked
        });
      }

      if (onChanged) {
        onChanged(!checked);
      }

      if (onClick) {
        onClick(ev);
      }
    }
  }

  private _noop(): void {
    /* no-op */
  }

}
