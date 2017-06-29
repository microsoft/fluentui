import * as React from 'react';
import {
  BaseComponent,
  KeyCodes,
  customizable,
  css,
  getNativeProps,
  divProperties
} from '../../Utilities';
import {
  ITheme
} from '../../Styling';
import { getStyles } from './Fabric.styles';

const DIRECTIONAL_KEY_CODES = [
  KeyCodes.up,
  KeyCodes.down,
  KeyCodes.left,
  KeyCodes.right,
  KeyCodes.home,
  KeyCodes.end,
  KeyCodes.tab,
  KeyCodes.pageUp,
  KeyCodes.pageDown
];

export interface IFabricProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: ITheme;
}
export interface IFabricState {
  isFocusVisible?: boolean;
}

// We will track the last focus visibility state so that if we tear down and recreate
// the Fabric component, we will use the last known value as the default.
let _lastIsFocusVisible: boolean = false;

// Ensure that the HTML element has a dir specified. This helps to ensure RTL/LTR macros in css for all components will work.
if (typeof (document) === 'object' && document.documentElement && !document.documentElement.getAttribute('dir')) {
  document.documentElement.setAttribute('dir', 'ltr');
}

@customizable(['theme'])
export class Fabric extends BaseComponent<IFabricProps, IFabricState> {
  private _root: HTMLElement;

  constructor() {
    super();

    this.state = {
      isFocusVisible: _lastIsFocusVisible
    };
  }

  public componentDidMount() {
    this._events.on(document.body, 'mousedown', this._onMouseDown, true);
    this._events.on(document.body, 'keydown', this._onKeyDown, true);
  }

  public render() {
    const { isFocusVisible } = this.state;
    const styles = getStyles(this.props.theme);

    const rootClass = css(
      'ms-Fabric',
      styles.root,
      this.props.className,
      isFocusVisible && 'is-focusVisible'
    ) as string;

    let divProps = getNativeProps(this.props, divProperties);
    return (
      <div
        { ...divProps }
        className={ rootClass }
        ref={ this._resolveRef('_root') }
      />
    );
  }

  private _onMouseDown() {
    if (this.state.isFocusVisible) {
      this.setState({
        isFocusVisible: false
      });

      _lastIsFocusVisible = false;
    }
  }

  private _onKeyDown(ev: KeyboardEvent) {
    if (!this.state.isFocusVisible && DIRECTIONAL_KEY_CODES.indexOf(ev.which) > -1) {
      this.setState({
        isFocusVisible: true
      });

      _lastIsFocusVisible = true;
    }
  }
}
