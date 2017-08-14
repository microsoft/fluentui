/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent, css } from '../../Utilities';
import { IconButton } from '../../Button';
import { ITeachingDialogProps } from './TeachingDialog.Props';
import { ITeachingDialogViewProps } from './TeachingDialogView.Props';
import { KeyCodes } from '../../../../utilities/src/KeyCodes';
import { TeachingDialogContent } from './TeachingDialogContent';
import * as stylesImport from './TeachingDialog.scss';
const styles: any = stylesImport;

export interface ITeachingDialogState {
  pageIndex: number;
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
    this.state = { pageIndex: this._firstPageIndex } as ITeachingDialogState;
  }

  /**
   * Invoked once only on the client immediately after the initial rendering occurs
   */
  public componentDidMount(): void {
    let nextButtonElement = this.refs[this._buttonsRefs[0]] as HTMLElement;
    nextButtonElement.focus();
  }

  /**
   * Invoked when the component is rendered
   */
  public render(): React.ReactElement<{}> {

    let currentPageProps: ITeachingDialogViewProps = this.props.viewProps[this.state.pageIndex];
    let headLine: React.ReactElement<{}> | null = this._createHeadline(currentPageProps.headline);
    let leftButton: React.ReactElement<{}> = this._createButton(
      currentPageProps.leftButtonText,
      false,
      !!currentPageProps.isLeftButtonLight);
    let rightButton: React.ReactElement<{}> = this._createButton(
      currentPageProps.rightButtonText,
      true,
      !!currentPageProps.isRighButtonLight);

    // Creating the dialog and returning it
    return <div
      className={ css('ms-TeachingDialog-modal', styles.modal) }
      onKeyDown={ this._keyDown.bind(this) }>
      <div className={ css('ms-TeachingDialog-root', styles.root) }>
        <IconButton ref='xButton'
          className={ css('ms-TeachingDialog-closeButton', styles.closeButton) }
          data-is-focusable={ true }
          onClick={ this._closeButtonClicked.bind(this) }
          onKeyDown={ this._closeButtonKeyDown.bind(this) }
          role='button'
          tabIndex={ 0 }
          iconProps={ { iconName: 'Cancel' } }
        />
        { headLine }
        <TeachingDialogContent
          image={ currentPageProps.image }
          textContent={ currentPageProps.textContent }
          title={ currentPageProps.title } />
        <div className={ css('ms-TeachingDialog-footer', styles.footer) }>
          { leftButton }
          { rightButton }
        </div>
        <div className={ css('ms-TeachingDialog-pagination', styles.pagination) } ref='pagination'>
          { this._createPaginationButtons() }
        </div>
      </div>
    </div> as React.ReactElement<{}>;
  }

  /**
   * Handles close button clicked event
   */
  private _closeButtonClicked(event: MouseEvent): void {
    event.stopPropagation();
    if (this.props.onXButton !== undefined && this.props.onXButton) {
      this.props.onXButton();
    }
  }

  /**
   * Handles close button key down event
   */
  private _closeButtonKeyDown(event: React.KeyboardEvent<HTMLElement>): void {
    if (event.which === KeyCodes.enter) {
      if (this.props.onXButton !== undefined && this.props.onXButton) {
        this.props.onXButton();
      }
      event.preventDefault();
      event.stopPropagation();
    }
  }

  /**
   * Create the dialog button
   */
  private _createButton(buttonText: string, isRight: boolean, isLight: boolean): React.ReactElement<{}> {
    return <div ref={ isRight ? this._buttonsRefs[0] : this._buttonsRefs[2] }
      className={ css(styles.button, isRight ? styles.isRight : '', isLight ? styles.isLight : '') }
      role='button'
      tabIndex={ 0 }
      data-is-focusable={ true }
      onKeyDown={ isRight ? this._rightButtonKeyDown.bind(this) : this._leftButtonKeyDown.bind(this) }
      onClick={ isRight ? this._rightButtonClicked.bind(this) : this._leftButtonClicked.bind(this) }>
      { buttonText }
    </div> as React.ReactElement<{}>;
  }

  /**
   *  Creating a head line of the current page
   */
  private _createHeadline(headline: string | null | undefined): React.ReactElement<{}> | null {
    if (headline !== undefined && headline !== null && headline !== '') {
      return <div className={ css('ms-TeachingDialog-headline', styles.headline) }>
        { headline }
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
      buttons.push(
        <IconButton
          className={ css(styles.btn) }
          iconProps={ { iconName: i === this.state.pageIndex ? 'circleFill' : 'CircleRing' } }
          key={ i } />);
    }

    return buttons;
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
      let nextActiveIndex: number = 0;

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
 * Handles Left button clicked event
 */
  private _leftButtonClicked(event: MouseEvent): void {
    event.stopPropagation();
    if (this.props.viewProps[this.state.pageIndex].onLeftButton !== undefined &&
      this.props.viewProps[this.state.pageIndex].onLeftButton) {
      this.props.viewProps[this.state.pageIndex].onLeftButton!();
    }
    this._previousPage();
  }

  /**
   * Handles Left button key down event
   */
  private _leftButtonKeyDown(event: React.KeyboardEvent<HTMLElement>): void {
    if (event.which === KeyCodes.enter) {
      if (this.props.viewProps[this.state.pageIndex].onLeftButton !== undefined &&
        this.props.viewProps[this.state.pageIndex].onLeftButton) {
        this.props.viewProps[this.state.pageIndex].onLeftButton!();
      }
      this._previousPage();
      event.preventDefault();
      event.stopPropagation();
    }
  }

  /**
   * Navigate to the next page on all pages except for the last page
   */
  private _nextPage(): void {
    let nextPage: number = (this.state.pageIndex + 1) < this._lastPageIndex ? (this.state.pageIndex + 1) : this._lastPageIndex;
    this.setState({ pageIndex: nextPage } as ITeachingDialogState);
  }

  /**
   * Navigate to the previous page on all pages except for the first page
   */
  private _previousPage(): void {
    let prevPage: number = (this.state.pageIndex - 1) > this._firstPageIndex ? (this.state.pageIndex - 1) : this._firstPageIndex;
    this.setState({ pageIndex: prevPage } as ITeachingDialogState);
  }

  /**
   * Handles Right button clicked event
   */
  private _rightButtonClicked(event: MouseEvent): void {
    event.stopPropagation();
    if (this.props.viewProps[this.state.pageIndex].onRightButton !== undefined &&
      this.props.viewProps[this.state.pageIndex].onRightButton) {
      this.props.viewProps[this.state.pageIndex].onRightButton!();
    }
    this._nextPage();
  }

  /**
   * Handles Right button key down event
   */
  private _rightButtonKeyDown(event: React.KeyboardEvent<HTMLElement>): void {
    if (event.which === KeyCodes.enter) {
      if (this.props.viewProps[this.state.pageIndex].onRightButton !== undefined &&
        this.props.viewProps[this.state.pageIndex].onRightButton) {
        this.props.viewProps[this.state.pageIndex].onRightButton!();
      }
      this._nextPage();
      event.preventDefault();
      event.stopPropagation();
    }
  }
}