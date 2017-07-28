/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent, css } from '../../Utilities';
import { ITeachingDialogProps } from './TeachingDialog.Props';
import { ITeachingDialogViewProps } from './TeachingDialogView.Props';
import { KeyCodes } from '../../../../utilities/src/KeyCodes';
import { TeachingDialogContent } from './TeachingDialogContent';
import './TeachingDialog.scss';

export interface ITeachingDialogState {
  pageIndex: number;
  showDialog: boolean;
}

/**
 * Represents the TeachingDialog react component
 */
export class TeachingDialog extends BaseComponent<ITeachingDialogProps, ITeachingDialogState> {

  // Specify default props values
  public static defaultProps = {
    openDialog: true,
    pageProps: [{
      title: '',
      textContent: '',
      image: {},
      leftButtonText: '',
      rightButtonText: ''
    } as ITeachingDialogViewProps]
  };

  private _buttonsRefs: Array<string>;
  private _firstPageIndex: number;
  private _lastPageIndex: number;

  /**
   * TeachingDialog constructor: State and private variable are initialized
   */
  constructor(props: ITeachingDialogProps) {
    super(props);
    this._buttonsRefs = ['rightButton', 'xButton', 'leftButton'];
    this._firstPageIndex = 0;
    this._lastPageIndex = props.viewProps.length - 1;
    this.state = { pageIndex: this._firstPageIndex, showDialog: true } as ITeachingDialogState;
  }

  /**
   * Invoked once only on the client immediately after the initial rendering occurs
   */
  public componentDidMount(): void {
    if (this.state.showDialog) {
      let nextButtonElement = this.refs[this._buttonsRefs[0]] as HTMLElement;
      nextButtonElement.focus();
    }
  }

  /**
   * Invoked when the component is rendered
   */
  public render(): React.ReactElement<{}> {
    if (!this.state.showDialog) {
      return null;
    }

    let currentPageProps: ITeachingDialogViewProps = this.props.viewProps[this.state.pageIndex];
    let headLine: React.ReactElement<{}> = this._createHeadLine(currentPageProps.headline);
    let leftButton: React.ReactElement<{}> = this._createButton(
      currentPageProps.leftButtonText,
      false,
      !!currentPageProps.isLeftButtonLight);
    let rightButton: React.ReactElement<{}> = this._createButton(
      currentPageProps.rightButtonText,
      true,
      !!currentPageProps.isRighButtonLight);

    // Creating the dialog and returning it
    return <div className='ms-TeachingDialog-modal' >
      onKeyDown={ this._keyDown.bind(this) }>
      <div className='ms-TeachingDialog-main'>
        <div ref='xButton'
          className='XButton'
          data-is-focusable={ true }
          onClick={ this._xButtonClicked.bind(this) }
          onKeyDown={ this._closeButtonKeyDown.bind(this) }
          role='button'
          tabIndex={ 0 }>
          <i className='mdl2-Icon mdl2-Icon--clear'></i>
        </div>
        { headLine }
        <TeachingDialogContent
          image={ currentPageProps.image }
          textContent={ currentPageProps.textContent }
          title={ currentPageProps.title } />
        <div className='ms-TeachingDialogButtons'>
          { leftButton }
          { rightButton }
        </div>
        <div className='ms-TeachingDialog-pagination' ref='pagination'>
          { this._createPaginationButtons() }
        </div>
      </div>
    </div> as React.ReactElement<{}>;
  }

  /**
   *  Creating a head line of the current page
   */
  private _createHeadLine(headline: string): React.ReactElement<{}> {
    if (headline !== undefined && headline !== null && headline !== '') {
      return <div className='ms-TeachingDialogContent-headline'>
        <p>{ headline }</p>
      </div> as React.ReactElement<{}>;
    }
    return null;
  }

  /**
   *  Creating pagination buttons
   */
  private _createPaginationButtons(): React.ReactElement<{}>[] {

    let buttons: React.ReactElement<{}>[] = [];

    for (let i: number = 0; i < this.props.viewProps.length; i++) {
      buttons.push(<div className={ ['btn', i === this.state.pageIndex ? 'isFilled' : ''].join(' ') }
        key={ i }>
        <i className='ms-Icon ms-Icon--circleUnFilled'></i>
      </div>);
    }

    return buttons;
  };


  /**
   * Create the dialog button
   */
  private _createButton(buttonText: string, isRight: boolean, isLight: boolean): React.ReactElement<{}> {
    const className: string = ['Button', isRight ? '-Right' : '', isLight ? ' isLight' : ''].join('');
    return <div ref={ isRight ? this._buttonsRefs[0] : this._buttonsRefs[2] }
      className={ className }
      role='button'
      tabIndex={ 0 }
      data-is-focusable={ true }
      onKeyDown={ isRight ? this._rightButtonKeyDown.bind(this) : this._leftButtonKeyDown.bind(this) }
      onClick={ isRight ? this._rightButtonClicked.bind(this) : this._leftButtonClicked.bind(this) }>
      { buttonText }
    </div> as React.ReactElement<{}>;
  }

  /**
   * Handles Right button clicked event
   */
  private _rightButtonClicked(event: MouseEvent): void {
    event.stopPropagation();
    if (this.props.viewProps[this.state.pageIndex].onRightButton) {
      this.props.viewProps[this.state.pageIndex].onRightButton();
    }
    this._nextPage();
  }

  /**
   * Handles Left button clicked event
   */
  private _leftButtonClicked(event: MouseEvent): void {
    event.stopPropagation();
    if (this.props.viewProps[this.state.pageIndex].onLeftButton) {
      this.props.viewProps[this.state.pageIndex].onLeftButton();
    }
    this._previousPage();
  }

  /**
   * Handles X button clicked event
   */
  private _xButtonClicked(event: MouseEvent): void {
    event.stopPropagation();
    if (this.props.onXButton !== undefined && this.props.onXButton) {
      this.props.onXButton();
    }
    this._closeDialog();
  }

  /**
   * Handles Left button key down event
   */
  private _leftButtonKeyDown(event: React.KeyboardEvent<HTMLElement>): void {
    if (event.which === KeyCodes.enter) {
      if (this.props.viewProps[this.state.pageIndex].onLeftButton) {
        this.props.viewProps[this.state.pageIndex].onLeftButton();
      }
      this._previousPage();
      event.preventDefault();
      event.stopPropagation();
    }
  }

  /**
   * Handles Right button key down event
   */
  private _rightButtonKeyDown(event: React.KeyboardEvent<HTMLElement>): void {
    if (event.which === KeyCodes.enter) {
      if (this.props.viewProps[this.state.pageIndex].onRightButton) {
        this.props.viewProps[this.state.pageIndex].onRightButton();
      }
      this._nextPage();
      event.preventDefault();
      event.stopPropagation();
    }
  }

  /**
   * Handles X button key down event
   */
  private _closeButtonKeyDown(event: React.KeyboardEvent<HTMLElement>): void {
    if (event.which === KeyCodes.enter) {
      if (this.props.onXButton) {
        this.props.onXButton();
      }
      this._closeDialog();
      event.preventDefault();
      event.stopPropagation();
    }
  }

  /**
   * Handles Tab key down event
   */
  private _keyDown(event: React.KeyboardEvent<HTMLElement>): void {
    if (event.which === KeyCodes.tab) {
      // Use bias variable to go to previous or next button in this._buttonsRefs when shift is pressed
      // bias 1 means go to the next button in this._buttonsRefs
      let bias = 1;

      if (event.shiftKey) {
        bias = this._buttonsRefs.length - 1;
      }

      // find the active element and the next active element
      let activeElement = event.target as HTMLElement;
      let nextActiveIndex: number;

      for (let i: number = 0; i < this._buttonsRefs.length; i++) {
        if (activeElement === this.refs[this._buttonsRefs[i]]) {
          nextActiveIndex = (i + bias) % this._buttonsRefs.length;
          break;
        }
      }

      let nextActiveElement = this.refs[this._buttonsRefs[nextActiveIndex]] as HTMLElement;
      nextActiveElement.focus();
      event.preventDefault();
      event.stopPropagation();
    }
  }

  /**
   * Navigate to the previous page on all pages except for the first page
   * On the first page, closes the dialog
   */
  private _previousPage(): void {
    if (this.state.pageIndex === this._firstPageIndex) {
      this._closeDialog();
    } else {
      let prevPage: number = (this.state.pageIndex - 1) > this._firstPageIndex ? (this.state.pageIndex - 1) : this._firstPageIndex;
      this.setState({ pageIndex: prevPage, showDialog: true } as ITeachingDialogState);
    }
  }

  /**
   * Navigate to the next page on all pages except for the last page
   * On the last page, close the dialog
   */
  private _nextPage(): void {
    if (this.state.pageIndex === this._lastPageIndex) {
      this._closeDialog();
    } else {
      let nextPage: number = (this.state.pageIndex + 1) < this._lastPageIndex ? (this.state.pageIndex + 1) : this._lastPageIndex;
      this.setState({ pageIndex: nextPage, showDialog: true } as ITeachingDialogState);
    }
  }

  /**
   * Close the dialog
   */
  private _closeDialog(): void {
    this.setState({ pageIndex: this._firstPageIndex, showDialog: false });
  }

}