import * as React from 'react';
import Label from '../Label/index';
import './TextField.scss';
import { css } from '../../utilities/css';
import { ITextFieldProps } from './TextField.Props';

export interface ITextFieldState {
  id?: string;
  value: string;
}

let _instance: number = 0;

export default class TextField extends React.Component<ITextFieldProps, ITextFieldState> {
  public static initialProps: ITextFieldProps = {
    disabled: false,
    required: false,
    multiline: false,
    underlined: false
  };

  public refs: {
    [key: string]: React.ReactInstance;
    multilineText: HTMLInputElement;
    singlelineText: HTMLInputElement;
  };

  public constructor(props: ITextFieldProps) {
    super(props);

    this.state = {
      id: `TextField-${ _instance++ }`,
      value: props.value
    };
    this._onMultilineTextChanged = this._onMultilineTextChanged.bind(this);
    this._onSinglelineTextChanged = this._onSinglelineTextChanged.bind(this);
  }

  public componentWillReceiveProps(newProps: ITextFieldProps) {
    if (newProps.value !== undefined) {
      this.setState({
        value: newProps.value
      });
    }
  }

  public render() {
    let { disabled, required, multiline, placeholder, underlined, label, description, iconClass, className } = this.props;
    let { value } = this.state;
    let { id } = this.state;

    return (
      <div
        className={
        css('ms-TextField', className, {
          'is-required': required,
          'is-disabled': disabled,
          'ms-TextField--multiline': multiline,
          'ms-TextField--underlined': underlined
        }) }
        >
        { label ? <Label htmlFor={ id }>{ label }</Label> : null }
        { iconClass ? <i className={ iconClass }></i> : null }
        { multiline ?
          <textarea id={ id } className='ms-TextField-field' ref='multilineText' onChange={ this._onMultilineTextChanged }>{ value }</textarea>
        :
          <input id={ id } placeholder={ placeholder } ref='singlelineText' className='ms-TextField-field' value={ value } onChange={ this._onSinglelineTextChanged } /> }
        { description ? <span className='ms-TextField-description'>{ description }</span> : null}
        { this.props.children }
      </div>
    );
  }

  private _onMultilineTextChanged(ev: React.KeyboardEvent): void {
    this.setState({
      value: this.refs.multilineText.value
    });

    this._onChanged(this.refs.multilineText.value);
  }

  private _onSinglelineTextChanged(ev: React.KeyboardEvent): void {
    this.setState({
      value: this.refs.singlelineText.value
    });

    this._onChanged(this.refs.singlelineText.value);
  }

  private _onChanged(newValue: string): void {
    let { onChanged } = this.props;

    if (onChanged) {
      onChanged(newValue);
    }
  }
}
