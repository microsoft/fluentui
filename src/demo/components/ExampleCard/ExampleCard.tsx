import * as React from 'react';
import './ExampleCard.scss';
import { Button, ButtonType } from '../../../Button';
import { css } from '../../../utilities/css';

const Highlight = require('react-highlight');

export interface IExampleCardProps {
  title: string;
  isOptIn?: boolean;
  code?: string;
  children?: any;
  isRightAligned?: boolean;
  dos?: JSX.Element;
  donts?: JSX.Element;
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

    return (
      <div className={ rootClass }>
        <div className='ExampleCard-header'>
          <span className='ExampleCard-title ms-font-l'>{ title }</span>
          <span className='ExampleCard-toggleButtons ms-font-l'>
            <Button buttonType={ ButtonType.primary }
              onClick={ this._onShowExampleClick }>
              { isExampleShown ? 'Hide example' : 'Show example' }
            </Button>
            { code ? (
            <Button buttonType={ ButtonType.primary }
              onClick={ this._onToggleCodeClick } className={ isCodeVisible ? 'is-open' : ''}>
              { '</>' }
            </Button>
            ) : ( null ) }
          </span>
        </div>
        <div className={ css('ExampleCard-content', { ' ms-u-slideDownIn20': (isCodeVisible) }) }>

          { isCodeVisible && (
          <div className='ExampleCard-code ms-u-slideDownIn20'>
            <Highlight className='javascript'>
              { code }
            </Highlight>
          </div>
          ) }

          { isExampleShown && (
          <div className={ css('ExampleCard-example', { ' is-right-aligned': (isRightAligned) }) }>
            { children }
          </div>
          ) }

        </div>
        { this._getDosAndDonts() }
      </div>
    );
  }

  private _getDosAndDonts() {
    if (this.props.dos && this.props.donts) {
      return (
        <div className='ExampleCard-dosAndDonts'>
          <div className='ExampleCard-dos'>
            <h4>Do</h4>
            { this.props.dos }
          </div>
          <div className='ExampleCard-donts'>
            <h4>Do not</h4>
            { this.props.donts }
          </div>
        </div>
      );
    }
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
