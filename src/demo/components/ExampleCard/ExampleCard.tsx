import * as React from 'react';
import './ExampleCard.scss';
import { default as Button, ButtonType } from '../../../components/Button/index';
import { css } from '../../../utilities/css';

let Highlight = require('react-highlight');

export interface IExampleCardProps {
  title: string;
  isOptIn?: boolean;
  code?: string;
  children?: any;
  isRightAligned?: boolean;
}

export interface IExampleCardState {
  isCodeVisible?: boolean;
  isExampleShown?: boolean;
}

export class ExampleCard extends React.Component<IExampleCardProps, IExampleCardState> {

  constructor(props: IExampleCardProps) {
    super(props);

    this.state = {
      isCodeVisible: false,
      isExampleShown: props.isOptIn ? false : true
    };

    this._onToggleCodeClick = this._onToggleCodeClick.bind(this);
    this._onShowExampleClick = this._onShowExampleClick.bind(this);
  }

  public render() {
    const { title, code, children, isRightAligned } = this.props;
    const { isCodeVisible, isExampleShown } = this.state;
    let rootClass = 'ExampleCard' + (this.state.isCodeVisible ? ' is-codeVisible' : '');
    let codeExample;

    if (code) {
      codeExample = (
        <div className='ExampleCard-code'>
          <Highlight className='typescript'>
            { code }
          </Highlight>
        </div>
      );
    }

    return (
      <div className={ rootClass }>
        <div className='ExampleCard-header'>
          <span className='ExampleCard-title ms-font-l'>{ title }</span>
          <span className='ExampleCard-toggleButtons ms-font-l'>
            <Button buttonType={ ButtonType.primary } onClick={ this._onShowExampleClick }>{ isExampleShown ? 'Hide example' : 'Show example' }</Button>
            { code ? (
            <Button buttonType={ ButtonType.primary } onClick={ this._onToggleCodeClick }>{ isCodeVisible ? 'Hide code' : 'Show code' }</Button>
            ) : ( null ) }
          </span>
        </div>
        { (isExampleShown || isCodeVisible) ? (
        <div className={ css('ExampleCard-content', { ' ms-u-slideDownIn20': (isCodeVisible) }) }>
          { codeExample }
            { isExampleShown ? (
            <div className={ css('ExampleCard-example', { ' is-right-aligned': (isRightAligned) }) }>
              { children }
            </div>
            ) : ( null ) }
        </div>
        ) : (null) }
      </div>
    );
  }

  private _onToggleCodeClick() {
    this.setState({
      isCodeVisible: !this.state.isCodeVisible
    });
  }

  private _onShowExampleClick() {
    this.setState({
      isExampleShown: !this.state.isExampleShown
    });
  }
}
