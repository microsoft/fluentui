import * as React from 'react';
import { IDocumentCardTitleProps } from './DocumentCard.Props';
import { EventGroup } from '../../utilities/eventGroup/EventGroup';
import './DocumentCardTitle.scss';

export interface IDocumentCardTitleState {
  truncatedTitleFirstPiece?: string;
  truncatedTitleSecondPiece?: string;
}

const TRUNCATION_SEPARATOR = '&hellip;';
const TRUNCATION_MINIMUM_LENGTH = 40;
const TRUNCATION_MAXIMUM_LENGTH = 90 - TRUNCATION_SEPARATOR.length;
const TRUNCATION_FIRST_PIECE_LONGER_BY = 10;
const TRUNCATION_VERTICAL_OVERFLOW_THRESHOLD = 5;

export class DocumentCardTitle extends React.Component<IDocumentCardTitleProps, IDocumentCardTitleState> {
  public refs: {
    [key: string]: React.ReactInstance;
    titleElement: HTMLElement;
  };

  private _events: EventGroup;
  private _scrollTimerId: number;
  private _truncatedTitleAtWidth: number;

  constructor(props: IDocumentCardTitleProps) {
    super(props);

    this.state = {
      truncatedTitleFirstPiece : '',
      truncatedTitleSecondPiece: ''
    };

    this._events = new EventGroup(this);

    this._startTruncation = this._startTruncation.bind(this);
  }

  public componentDidMount() {
    if (this.props.shouldTruncate) {
      this._startTruncation();
      this._events.on(window, 'resize', this._updateTruncation);
    }
  }

  public componentWillUnmount() {
    this._events.dispose();
  }

  public componentWillReceiveProps(newProps: IDocumentCardTitleProps) {
    if ((newProps.title !== this.props.title) && this.props.shouldTruncate) {
      this._startTruncation();
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
    if (shouldTruncate && (truncatedTitleFirstPiece || truncatedTitleSecondPiece)) {
      documentCardTitle = (
        <div className='ms-DocumentCardTitle' ref='titleElement' title={ title }>{ truncatedTitleFirstPiece }&hellip;{ truncatedTitleSecondPiece }</div>
      );
    } else {
      documentCardTitle = (
        <div className='ms-DocumentCardTitle' ref='titleElement' title={ title }>{ title }</div>
      );
    }

    return (
      <div>
        { documentCardTitle }
      </div>
    );
  }

  private _startTruncation() {
    let originalTitle = this.props.title;

    // If the title is really short, there's no need to truncate it
    if (originalTitle && originalTitle.length >= TRUNCATION_MINIMUM_LENGTH) {

      // Break the text into two pieces for assembly later
      if (originalTitle.length > TRUNCATION_MAXIMUM_LENGTH) {
        // The text is really long, so we can take a chunk out of the middle so the two pieces combine for the maximum length
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
    this._truncatedTitleAtWidth = this.refs.titleElement.clientWidth;

  }

  private _shrinkTitle() {
    if (this._doesTitleOverflow()) {
      let { truncatedTitleFirstPiece, truncatedTitleSecondPiece } = this.state;
      this.setState({
        truncatedTitleFirstPiece : truncatedTitleFirstPiece.slice(0, truncatedTitleFirstPiece.length - 1),
        truncatedTitleSecondPiece : truncatedTitleSecondPiece.slice(1)
      });
    }
  }

  private _doesTitleOverflow(): boolean {
    let titleElement = this.refs.titleElement;
    return titleElement.scrollHeight > titleElement.clientHeight + TRUNCATION_VERTICAL_OVERFLOW_THRESHOLD || titleElement.scrollWidth > titleElement.clientWidth;
  }

  private _updateTruncation() {
    // Only update truncation if the title's size has changed since the last time we truncated
    if (this.refs.titleElement.clientWidth !== this._truncatedTitleAtWidth) {
      // Throttle truncation so that it doesn't happen during a window resize
      clearTimeout(this._scrollTimerId);
      this._scrollTimerId = setTimeout(this._startTruncation, 250);
    }
  }

}
