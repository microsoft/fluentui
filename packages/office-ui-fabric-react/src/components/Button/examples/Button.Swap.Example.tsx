import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { css, classNamesFunction } from '../../../Utilities';
import {
  getStyles,
  IButtonBasicExampleStyleProps,
  IButtonBasicExampleStyles
} from './Button.Basic.Example.styles';
import { DefaultButton, PrimaryButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export interface IButtonSwapExampleState {
  isPrimary: boolean;
}

export class ButtonSwapExample extends React.Component<IButtonProps, IButtonSwapExampleState> {
  private buttonRef: HTMLElement | null;
  private hasFocus: boolean;

  public constructor(props: IButtonProps) {
    super(props);

    this.hasFocus = false;
    this.buttonRef = null;
    this.state = {
      isPrimary: true
    };
  }

  public componentWillUpdate(nextProps: IButtonProps, nextState: IButtonSwapExampleState): void {
    // check to see if our button element has focus
    this.hasFocus = document.activeElement === this.buttonRef;
  }

  public componentDidUpdate(prevProps: IButtonProps, prevState: IButtonSwapExampleState): void {
    // if our button previously had focus but we lost it
    // because we switched the control type, we need to set focus again
    if (this.hasFocus && document.activeElement !== this.buttonRef) {
      this.buttonRef!.focus();
    }
  }

  public render() {
    const { isPrimary } = this.state;
    const { disabled, checked } = this.props;
    const text = 'Swap';

    // determine which button to render
    const button = isPrimary
      ? (
        <PrimaryButton
          ref={ this._setButtonRef }
          disabled={ disabled }
          checked={ checked }
          onClick={ this._onClick }
        >
          { text }
        </PrimaryButton>
      ) : (
        <DefaultButton
          ref={ this._setButtonRef }
          disabled={ disabled }
          checked={ checked }
          onClick={ this._onClick }
        >
          { text }
        </DefaultButton>
      );

    const getClassNames = classNamesFunction<IButtonBasicExampleStyleProps, IButtonBasicExampleStyles>();
    const classNames = getClassNames(getStyles);

    return (
      <div className={ css(classNames.example) }>
        { button }
      </div>
    );
  }

  private _setButtonRef = (ref: any): void => {
    this.buttonRef = ReactDOM.findDOMNode(ref) as HTMLElement;
  }

  private _onClick = (): void => {
    // change the button type on click
    this.setState({ isPrimary: !this.state.isPrimary });
  }
}