/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import { IDocumentCardTitleProps } from './DocumentCard.Props';
import { BaseComponent } from '../../common/BaseComponent';
import { autobind } from '../../utilities/autobind';
import './DocumentCardTitle.scss';

export interface IDocumentCardTitleState {
  truncatedTitleFirstPiece?: string;
  truncatedTitleSecondPiece?: string;
}

const TRUNCATION_SEPARATOR = '&hellip;';
const TRUNCATION_MINIMUM_LENGTH = 40; // This is the length we know can fit into the min width of DocumentCard.
const TRUNCATION_MAXIMUM_LENGTH = 90 - TRUNCATION_SEPARATOR.length;
const TRUNCATION_FIRST_PIECE_LONGER_BY = 10;
const TRUNCATION_VERTICAL_OVERFLOW_THRESHOLD = 5;

export class DocumentCardTitle extends BaseComponent<IDocumentCardTitleProps, IDocumentCardTitleState> {
  private _titleElement: HTMLDivElement;
  private _scrollTimerId: number;
  private _truncatedTitleAtWidth: number;
  private _isTruncated: boolean;

  constructor(props: IDocumentCardTitleProps) {
    super(props);

    this.state = {
      truncatedTitleFirstPiece : '',
      truncatedTitleSecondPiece: ''
    };
  }

  public componentDidMount() {
    let { title, shouldTruncate } = this.props;
    if (shouldTruncate && title && title.length > TRUNCATION_MINIMUM_LENGTH) {
      if (this._doesTitleOverflow()) {
        this._startTruncation(this.props);
      }
      this._events.on(window, 'resize', this._updateTruncation);
    }
  }

  public componentWillReceiveProps(newProps: IDocumentCardTitleProps) {
    this._events.off(window, 'resize');
    this._isTruncated = false;

    if (newProps.shouldTruncate && newProps.title && newProps.title.length > TRUNCATION_MINIMUM_LENGTH) {
      this._startTruncation(newProps);
      this._events.on(window, 'resize', this._updateTruncation);
    }
  }

  public componentDidUpdate() {
    // If we're truncating, make sure the title fits
    if (this.props.shouldTruncate) {
      this._shrinkTitle();
    }
  }

  public render() {
    let { title, shouldTruncate } = this.props;
    let { truncatedTitleFirstPiece, truncatedTitleSecondPiece } = this.state;

    let documentCardTitle;
    if (shouldTruncate && this._isTruncated) {
      documentCardTitle = (
        <div className='ms-DocumentCardTitle' ref={ this._resolveRef('_titleElement') } title={ title }>{ truncatedTitleFirstPiece }&hellip;{ truncatedTitleSecondPiece }</div>
      );
    } else {
      documentCardTitle = (
        <div className='ms-DocumentCardTitle' ref={ this._resolveRef('_titleElement') } title={ title }>{ title }</div>
      );
    }

    return documentCardTitle;
  }

  @autobind
  private _startTruncation(props: IDocumentCardTitleProps) {
    let originalTitle = props.title;
    this._isTruncated = false;

    // If the title is really short, there's no need to truncate it
    if (originalTitle && originalTitle.length >= TRUNCATION_MINIMUM_LENGTH) {

      // Break the text into two pieces for assembly later
      if (originalTitle.length > TRUNCATION_MAXIMUM_LENGTH) {
        // The text is really long, so we can take a chunk out of the middle so the two pieces combine for the maximum length
        this._isTruncated = true;
        this.setState({
          truncatedTitleFirstPiece : originalTitle.slice(0, TRUNCATION_MAXIMUM_LENGTH / 2 + TRUNCATION_FIRST_PIECE_LONGER_BY),
          truncatedTitleSecondPiece : originalTitle.slice(originalTitle.length - (TRUNCATION_MAXIMUM_LENGTH / 2 - TRUNCATION_FIRST_PIECE_LONGER_BY))
        });
      } else {
        // The text is not so long, so we'll just break it into two pieces
        this.setState({
          truncatedTitleFirstPiece : originalTitle.slice(0, Math.ceil(originalTitle.length / 2) + TRUNCATION_FIRST_PIECE_LONGER_BY),
          truncatedTitleSecondPiece : originalTitle.slice(originalTitle.length - Math.floor(originalTitle.length / 2) + TRUNCATION_FIRST_PIECE_LONGER_BY)
        });
      }
    }

    // Save the width we just started truncation at, so that later we will only update truncation if necessary
    this._truncatedTitleAtWidth = this._titleElement.clientWidth;

  }

  private _shrinkTitle() {
    if (this._doesTitleOverflow()) {
      let { truncatedTitleFirstPiece, truncatedTitleSecondPiece } = this.state;
      this._isTruncated = true;

      if (!truncatedTitleFirstPiece && !truncatedTitleSecondPiece) {
        this._startTruncation(this.props);
      }

      this.setState({
        truncatedTitleFirstPiece : truncatedTitleFirstPiece.slice(0, truncatedTitleFirstPiece.length - 1),
        truncatedTitleSecondPiece : truncatedTitleSecondPiece.slice(1)
      });
    }
  }

  private _doesTitleOverflow(): boolean {
    let titleElement = this._titleElement;
    return titleElement.scrollHeight > titleElement.clientHeight + TRUNCATION_VERTICAL_OVERFLOW_THRESHOLD || titleElement.scrollWidth > titleElement.clientWidth;
  }

  private _updateTruncation() {
    // Only update truncation if the title's size has changed since the last time we truncated
    if (this._titleElement.clientWidth !== this._truncatedTitleAtWidth) {
      // Throttle truncation so that it doesn't happen during a window resize
      clearTimeout(this._scrollTimerId);
      this._scrollTimerId = this._async.setTimeout(this._startTruncation.bind(this, this.props), 250);
    }
  }

}
