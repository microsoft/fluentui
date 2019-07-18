import * as React from 'react';

import { BaseComponent, classNamesFunction } from '../../Utilities';
import { IDocumentCardTitleProps, IDocumentCardTitleStyleProps, IDocumentCardTitleStyles } from './DocumentCardTitle.types';
import { IProcessedStyleSet } from '../../Styling';

const getClassNames = classNamesFunction<IDocumentCardTitleStyleProps, IDocumentCardTitleStyles>();

export interface IDocumentCardTitleState {
  truncatedTitleFirstPiece?: string;
  truncatedTitleSecondPiece?: string;
  clientWidth?: number;
  previousTitle: string;

  /**
   * In measuring, it will render a same style text with whiteSpace: 'nowrap', to get overflow rate.
   * So that the logic can predict truncated text well.
   */
  needMeasurement: boolean;
}

const TRUNCATION_VERTICAL_OVERFLOW_THRESHOLD = 5;

/**
 * {@docCategory DocumentCard}
 */
export class DocumentCardTitleBase extends BaseComponent<IDocumentCardTitleProps, IDocumentCardTitleState> {
  private _titleElement = React.createRef<HTMLDivElement>();
  private _measureTitleElement = React.createRef<HTMLDivElement>();

  private _titleTruncationTimer: number;
  private _classNames: IProcessedStyleSet<IDocumentCardTitleStyles>;

  constructor(props: IDocumentCardTitleProps) {
    super(props);

    this.state = {
      truncatedTitleFirstPiece: '',
      truncatedTitleSecondPiece: '',
      previousTitle: props.title,
      needMeasurement: !!props.shouldTruncate
    };
  }

  public componentDidUpdate(): void {
    if (this.props.title !== this.state.previousTitle) {
      this.setState({
        truncatedTitleFirstPiece: undefined,
        truncatedTitleSecondPiece: undefined,
        clientWidth: undefined,
        previousTitle: this.props.title,
        needMeasurement: !!this.props.shouldTruncate
      });
    }

    this._events.off(window, 'resize', this._updateTruncation);

    if (this.props.shouldTruncate) {
      this._truncateTitle();
      requestAnimationFrame(this._shrinkTitle);
      this._events.on(window, 'resize', this._updateTruncation);
    }
  }

  public componentDidMount(): void {
    if (this.props.shouldTruncate) {
      this._truncateTitle();
      this._events.on(window, 'resize', this._updateTruncation);
    }
  }

  public componentWillUnmount(): void {
    this._events.off(window, 'resize', this._updateTruncation);
  }

  public render(): JSX.Element {
    const { title, shouldTruncate, showAsSecondaryTitle, styles, theme, className } = this.props;
    const { truncatedTitleFirstPiece, truncatedTitleSecondPiece, needMeasurement } = this.state;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      showAsSecondaryTitle
    });

    let documentCardTitle;
    if (needMeasurement) {
      documentCardTitle = (
        <div className={this._classNames.root} ref={this._measureTitleElement} title={title} style={{ whiteSpace: 'nowrap' }}>
          {title}
        </div>
      );
    } else if (shouldTruncate && truncatedTitleFirstPiece && truncatedTitleSecondPiece) {
      documentCardTitle = (
        <div className={this._classNames.root} ref={this._titleElement} title={title}>
          {truncatedTitleFirstPiece}
          &hellip;
          {truncatedTitleSecondPiece}
        </div>
      );
    } else {
      documentCardTitle = (
        <div className={this._classNames.root} ref={this._titleElement} title={title}>
          {title}
        </div>
      );
    }
    return documentCardTitle;
  }

  // Truncate logic here way can't handle the case that chars with different widths are mixed very well, let _shrinkTitle take care of that.
  private _truncateTitle = (): void => {
    if (!this.state.needMeasurement) {
      return;
    }

    this._async.requestAnimationFrame(this._truncateWhenInAnimation);
  };

  private _truncateWhenInAnimation: () => void = () => {
    const originalTitle = this.props.title;
    const element: HTMLDivElement | null = this._measureTitleElement.current;

    if (element) {
      const style: CSSStyleDeclaration = getComputedStyle(element);
      if (style.width && style.lineHeight && style.height) {
        const { clientWidth, scrollWidth } = element;
        const lines: number = Math.floor(
          (parseInt(style.height, 10) + TRUNCATION_VERTICAL_OVERFLOW_THRESHOLD) / parseInt(style.lineHeight, 10)
        );

        // Use overflow to predict truncated length.
        // Take an example.The text is: A text with A very long text that need to be truncated.ppt
        // if container is like
        // |A text with A very| long text that need to be truncated.ppt
        // The scroll width is 58, (take two | out of length)
        // The client width is 18
        // the overflow rate is scrollWidth/clientWidth which should be close to length(overflowText)/length(visualText)
        // And the length of remaining text should be truncated is (original Length)/(58/18) -3 = 15.
        // So that the logic can predict truncated text well.
        // first piece will be `A text `, * second piece will be `ated.ppt`
        // |A text ...ated.ppt|
        const overFlowRate: number = scrollWidth / (parseInt(style.width, 10) * lines);

        if (overFlowRate > 1) {
          const truncatedLength: number = originalTitle.length / overFlowRate - 3 /** Saved for separator */;
          return this.setState({
            truncatedTitleFirstPiece: originalTitle.slice(0, truncatedLength / 2),
            truncatedTitleSecondPiece: originalTitle.slice(originalTitle.length - truncatedLength / 2),
            clientWidth,
            needMeasurement: false
          });
        }
      }
    }

    return this.setState({ needMeasurement: false });
  };

  private _shrinkTitle: () => void = () => {
    const { truncatedTitleFirstPiece, truncatedTitleSecondPiece } = this.state;
    if (truncatedTitleFirstPiece && truncatedTitleSecondPiece) {
      const titleElement = this._titleElement.current;

      if (!titleElement) {
        return;
      }

      if (
        titleElement.scrollHeight > titleElement.clientHeight + TRUNCATION_VERTICAL_OVERFLOW_THRESHOLD ||
        titleElement.scrollWidth > titleElement.clientWidth
      ) {
        this.setState({
          truncatedTitleFirstPiece: truncatedTitleFirstPiece.slice(0, truncatedTitleFirstPiece.length - 1),
          truncatedTitleSecondPiece: truncatedTitleSecondPiece.slice(1)
        });
      }
    }
  };

  private _updateTruncation(): void {
    this._async.requestAnimationFrame(() => {
      // Only update truncation if the title's size has changed since the last time we truncated
      if (this._titleElement.current) {
        const clientWidth: number = this._titleElement.current.clientWidth;
        // Throttle truncation so that it doesn't happen during a window resize
        clearTimeout(this._titleTruncationTimer);
        if (this.state.clientWidth !== clientWidth) {
          this._titleTruncationTimer = this._async.setTimeout(
            () =>
              this.setState({
                truncatedTitleFirstPiece: undefined,
                truncatedTitleSecondPiece: undefined,
                needMeasurement: true
              }),
            250
          );
        }
      }
    });
  }
}
