import * as React from 'react';

import { BaseComponent, css } from '../../Utilities';
import { IDocumentCardTitleProps } from './DocumentCard.types';
import * as stylesImport from './DocumentCard.scss';

const styles: any = stylesImport;

export interface IDocumentCardTitleState {
  truncatedTitleFirstPiece?: string;
  truncatedTitleSecondPiece?: string;
}

const TRUNCATION_SEPARATOR = '&hellip;';
const TRUNCATION_MINIMUM_LENGTH = 40; // This is the length we know can fit into the min width of DocumentCard.
const TRUNCATION_MAXIMUM_LENGTH = 90 - TRUNCATION_SEPARATOR.length;

// This is the length we know can fit into the min width 2 lines of DocumentCard.
const TRUNCATION_MINI_LENGTH_SECONDARY = 80;
const TRUNCATION_MAX_LENGTH_SECONDARY = 130 - TRUNCATION_SEPARATOR.length;
const TRUNCATION_FIRST_PIECE_LONGER_BY = 10;
const TRUNCATION_VERTICAL_OVERFLOW_THRESHOLD = 5;

export class DocumentCardTitle extends BaseComponent<IDocumentCardTitleProps, IDocumentCardTitleState> {
  private _titleElement = React.createRef<HTMLDivElement>();
  private _scrollTimerId: number;
  private _truncatedTitleAtWidth: number;
  private _isTruncated: boolean;

  constructor(props: IDocumentCardTitleProps) {
    super(props);

    this.state = {
      truncatedTitleFirstPiece: '',
      truncatedTitleSecondPiece: ''
    };
  }

  public componentDidMount(): void {
    const { title, shouldTruncate, showAsSecondaryTitle } = this.props;
    const miniLength = showAsSecondaryTitle ? TRUNCATION_MINI_LENGTH_SECONDARY : TRUNCATION_MINIMUM_LENGTH;
    if (shouldTruncate && title && title.length > miniLength) {
      if (this._doesTitleOverflow()) {
        this._startTruncation(this.props);
      }
      this._events.on(window, 'resize', this._updateTruncation);
    }
  }

  public componentWillReceiveProps(newProps: IDocumentCardTitleProps): void {
    this._events.off(window, 'resize');
    this._isTruncated = false;

    const miniLength = newProps.showAsSecondaryTitle ? TRUNCATION_MINI_LENGTH_SECONDARY : TRUNCATION_MINIMUM_LENGTH;
    if (newProps.shouldTruncate && newProps.title && newProps.title.length > miniLength) {
      this._startTruncation(newProps);
      this._events.on(window, 'resize', this._updateTruncation);
    }
  }

  public componentDidUpdate(): void {
    // If we're truncating, make sure the title fits
    if (this.props.shouldTruncate) {
      this._shrinkTitle();
    }
  }

  public render(): JSX.Element {
    const { title, shouldTruncate, showAsSecondaryTitle } = this.props;
    const { truncatedTitleFirstPiece, truncatedTitleSecondPiece } = this.state;

    let documentCardTitle;
    if (shouldTruncate && this._isTruncated) {
      documentCardTitle = (
        <div
          className={css('ms-DocumentCardTitle', showAsSecondaryTitle ? styles.secondaryTitle : styles.title)}
          ref={this._titleElement}
          title={title}
        >
          {truncatedTitleFirstPiece}
          &hellip;
          {truncatedTitleSecondPiece}
        </div>
      );
    } else {
      documentCardTitle = (
        <div
          className={css('ms-DocumentCardTitle', showAsSecondaryTitle ? styles.secondaryTitle : styles.title)}
          ref={this._titleElement}
          title={title}
        >
          {title}
        </div>
      );
    }
    return documentCardTitle;
  }

  private _startTruncation = (props: IDocumentCardTitleProps): void => {
    const originalTitle = props.title;
    this._isTruncated = false;
    const miniLength = props.showAsSecondaryTitle ? TRUNCATION_MINI_LENGTH_SECONDARY : TRUNCATION_MINIMUM_LENGTH;
    const maxLength = props.showAsSecondaryTitle ? TRUNCATION_MAX_LENGTH_SECONDARY : TRUNCATION_MAXIMUM_LENGTH;

    // If the title is really short, there's no need to truncate it
    if (originalTitle && originalTitle.length >= miniLength) {
      // Break the text into two pieces for assembly later
      if (originalTitle.length > maxLength) {
        // The text is really long, so we can take a chunk out of the middle so the two pieces combine for the maximum length
        this._isTruncated = true;
        this.setState({
          truncatedTitleFirstPiece: originalTitle.slice(0, maxLength / 2 + TRUNCATION_FIRST_PIECE_LONGER_BY),
          truncatedTitleSecondPiece: originalTitle.slice(originalTitle.length - (maxLength / 2 - TRUNCATION_FIRST_PIECE_LONGER_BY))
        });
      } else {
        // The text is not so long, so we'll just break it into two pieces
        this.setState({
          truncatedTitleFirstPiece: originalTitle.slice(0, Math.ceil(originalTitle.length / 2) + TRUNCATION_FIRST_PIECE_LONGER_BY),
          truncatedTitleSecondPiece: originalTitle.slice(
            originalTitle.length - Math.floor(originalTitle.length / 2) + TRUNCATION_FIRST_PIECE_LONGER_BY
          )
        });
      }
    }

    // Save the width we just started truncation at, so that later we will only update truncation if necessary
    if (this._titleElement.current) {
      this._truncatedTitleAtWidth = this._titleElement.current.clientWidth;
    }
  };

  private _shrinkTitle(): void {
    if (this._doesTitleOverflow()) {
      const { truncatedTitleFirstPiece, truncatedTitleSecondPiece } = this.state;
      this._isTruncated = true;

      if (truncatedTitleFirstPiece || truncatedTitleSecondPiece) {
        this.setState({
          truncatedTitleFirstPiece: truncatedTitleFirstPiece!.slice(0, truncatedTitleFirstPiece!.length - 1),
          truncatedTitleSecondPiece: truncatedTitleSecondPiece!.slice(1)
        });
      }
    }
  }

  private _doesTitleOverflow(): boolean {
    const titleElement = this._titleElement.current;

    if (!titleElement) {
      return false;
    }

    return (
      titleElement.scrollHeight > titleElement.clientHeight + TRUNCATION_VERTICAL_OVERFLOW_THRESHOLD ||
      titleElement.scrollWidth > titleElement.clientWidth
    );
  }

  private _updateTruncation(): void {
    // Only update truncation if the title's size has changed since the last time we truncated
    if (this._titleElement.current && this._titleElement.current.clientWidth !== this._truncatedTitleAtWidth) {
      // Throttle truncation so that it doesn't happen during a window resize
      clearTimeout(this._scrollTimerId);
      this._scrollTimerId = this._async.setTimeout(this._startTruncation.bind(this, this.props), 250);
    }
  }
}
