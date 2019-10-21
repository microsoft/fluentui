import * as React from 'react';
import { ISearchBoxProps, ISearchBoxStyleProps, ISearchBoxStyles } from './SearchBox.types';
import {
  initializeComponentRef,
  warnDeprecations,
  EventGroup,
  getId,
  KeyCodes,
  classNamesFunction,
  getNativeProps,
  inputProperties
} from '../../Utilities';

import { IconButton } from '../../Button';
import { Icon } from '../../Icon';

const getClassNames = classNamesFunction<ISearchBoxStyleProps, ISearchBoxStyles>();
const COMPONENT_NAME = 'SearchBox';

export interface ISearchBoxState {
  value?: string;
  hasFocus?: boolean;
}

export class SearchBoxBase extends React.Component<ISearchBoxProps, ISearchBoxState> {
  public static defaultProps: Pick<ISearchBoxProps, 'disableAnimation' | 'clearButtonProps'> = {
    disableAnimation: false,
    clearButtonProps: { ariaLabel: 'Clear text' }
  };

  private _rootElement = React.createRef<HTMLDivElement>();
  private _inputElement = React.createRef<HTMLInputElement>();
  private _latestValue: string;
  private _fallbackId: string;
  private _events: EventGroup | undefined;

  public constructor(props: ISearchBoxProps) {
    super(props);

    initializeComponentRef(this);

    warnDeprecations(COMPONENT_NAME, props, {
      labelText: 'placeholder',
      defaultValue: 'value'
    });

    this._latestValue = props.value || '';
    this._fallbackId = getId(COMPONENT_NAME);

    this.state = {
      value: this._latestValue,
      hasFocus: false
    };
  }

  // tslint:disable-next-line function-name
  public UNSAFE_componentWillReceiveProps(newProps: ISearchBoxProps): void {
    if (newProps.value !== undefined) {
      this._latestValue = newProps.value;
      // If the user passes in null, substitute an empty string
      // (passing null is not allowed per typings, but users might do it anyway)
      this.setState({
        value: newProps.value || ''
      });
    }
  }

  // tslint:disable-next-line function-name
  public UNSAFE_componentWillMount() {
    if (this._events) {
      this._events.dispose();
    }
  }

  public render() {
    const {
      ariaLabel,
      placeholder,
      className,
      disabled,
      underlined,
      styles,
      labelText,
      theme,
      clearButtonProps,
      disableAnimation,
      iconProps,
      id = this._fallbackId
    } = this.props;
    const { value, hasFocus } = this.state;
    const placeholderValue = labelText === undefined ? placeholder : labelText;

    const classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      underlined,
      hasFocus,
      disabled,
      hasInput: value!.length > 0,
      disableAnimation
    });

    const nativeProps = getNativeProps<React.InputHTMLAttributes<HTMLInputElement>>(this.props, inputProperties, [
      'className',
      'placeholder',
      'onFocus',
      'onBlur',
      'value'
    ]);

    return (
      <div role="search" ref={this._rootElement} className={classNames.root} onFocusCapture={this._onFocusCapture}>
        <div className={classNames.iconContainer} onClick={this._onClickFocus} aria-hidden={true}>
          <Icon iconName="Search" {...iconProps} className={classNames.icon} />
        </div>
        <input
          {...nativeProps}
          id={id}
          className={classNames.field}
          placeholder={placeholderValue}
          onChange={this._onInputChange}
          onInput={this._onInputChange}
          onKeyDown={this._onKeyDown}
          value={value}
          disabled={disabled}
          role="searchbox"
          aria-label={ariaLabel ? ariaLabel : placeholder}
          ref={this._inputElement}
        />
        {value!.length > 0 && (
          <div className={classNames.clearButton}>
            <IconButton
              styles={{ root: { height: 'auto' }, icon: { fontSize: '12px' } }}
              iconProps={{ iconName: 'Clear' }}
              {...clearButtonProps}
              onClick={this._onClearClick}
            />
          </div>
        )}
      </div>
    );
  }

  /**
   * Sets focus to the search box input field
   */
  public focus() {
    if (this._inputElement.current) {
      this._inputElement.current.focus();
    }
  }

  /**
   * Returns whether or not the SearchBox has focus
   */
  public hasFocus(): boolean {
    return !!this.state.hasFocus;
  }

  private _onClear(ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement> | React.KeyboardEvent<HTMLElement>) {
    this.props.onClear && this.props.onClear(ev);
    if (!ev.defaultPrevented) {
      this._latestValue = '';
      this.setState({
        value: ''
      });
      this._callOnChange(undefined, '');
      ev.stopPropagation();
      ev.preventDefault();

      this.focus();
    }
  }

  private _onClickFocus = () => {
    const inputElement = this._inputElement.current;
    if (inputElement) {
      this.focus();
      inputElement.selectionStart = inputElement.selectionEnd = 0;
    }
  };

  private _onFocusCapture = (ev: React.FocusEvent<HTMLElement>) => {
    this.setState({
      hasFocus: true
    });

    if (!this._events) {
      this._events = new EventGroup(this);
    }
    this._events.on(ev.currentTarget, 'blur', this._onBlur, true);

    if (this.props.onFocus) {
      this.props.onFocus(ev as React.FocusEvent<HTMLInputElement>);
    }
  };

  private _onClearClick = (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const { clearButtonProps } = this.props;

    if (clearButtonProps && clearButtonProps.onClick) {
      clearButtonProps.onClick(ev);
    }

    if (!ev.defaultPrevented) {
      this._onClear(ev);
    }
  };

  private _onKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    switch (ev.which) {
      case KeyCodes.escape:
        this.props.onEscape && this.props.onEscape(ev);
        if (!ev.defaultPrevented) {
          this._onClear(ev);
        }
        break;

      case KeyCodes.enter:
        if (this.props.onSearch) {
          this.props.onSearch(this.state.value);
          break;
        }
        // if we don't handle the enter press then we shouldn't prevent default
        return;

      default:
        this.props.onKeyDown && this.props.onKeyDown(ev);
        if (!ev.defaultPrevented) {
          return;
        }
    }

    // We only get here if the keypress has been handled,
    // or preventDefault was called in case of default keyDown handler
    ev.preventDefault();
    ev.stopPropagation();
  };

  private _onBlur = (ev: React.FocusEvent<HTMLInputElement>): void => {
    if (this._events) {
      this._events.off();
    }
    this.setState({
      hasFocus: false
    });

    if (this.props.onBlur) {
      this.props.onBlur(ev);
    }
  };

  private _onInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;

    if (value === this._latestValue) {
      return;
    }
    this._latestValue = value;

    this.setState({ value });
    this._callOnChange(ev, value);
  };

  private _callOnChange(ev?: React.ChangeEvent<HTMLInputElement>, newValue?: string): void {
    const { onChange, onChanged } = this.props;

    // Call @deprecated method.
    if (onChanged) {
      onChanged(newValue);
    }

    if (onChange) {
      onChange(ev, newValue);
    }
  }
}
