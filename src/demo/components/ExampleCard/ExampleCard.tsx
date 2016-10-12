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
}

export class ExampleCard extends React.Component<IExampleCardProps, IExampleCardState> {

  constructor(props: IExampleCardProps) {
    super(props);

    this.state = {
      isCodeVisible: false
    };

    this._onToggleCodeClick = this._onToggleCodeClick.bind(this);
  }

  public render() {
    const { title, code, children, isRightAligned } = this.props;
    const { isCodeVisible } = this.state;
    let rootClass = 'ExampleCard' + (this.state.isCodeVisible ? ' is-codeVisible' : '');

    return (
      <div className={ rootClass }>
        <div className='ExampleCard-header'>
          <span className='ExampleCard-title ms-font-l'>{ title }</span>
          <div className='ExampleCard-toggleButtons ms-font-l'>
            { code ? (
            <Button buttonType={ ButtonType.icon } icon='Embed'
              onClick={ this._onToggleCodeClick } className={ css('ExampleCard-codeButton', { 'is-active': isCodeVisible }) }>
              { this.state.isCodeVisible ? 'Hide code' : 'Show code' }
            </Button>
            ) : ( null ) }
          </div>
        </div>

        <div className='ExampleCard-code'>
          <Highlight className='javascript'>
            { code }
          </Highlight>
        </div>

        <div className={ css('ExampleCard-example', { ' is-right-aligned': (isRightAligned) }) } data-is-scrollable='true'>
          { children }
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
}
