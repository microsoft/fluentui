import * as React from 'react';

import { Async, EventGroup, classNamesFunction } from '../../Utilities';
import { initializeComponentRef } from '@fluentui/utilities';
import type {
  IDocumentCardTitleProps,
  IDocumentCardTitleStyleProps,
  IDocumentCardTitleStyles,
} from './DocumentCardTitle.types';
import type { IProcessedStyleSet } from '../../Styling';
import { DocumentCardContext } from './DocumentCard.base';
import { WindowContext } from '@fluentui/react-window-provider';
import { getWindowEx } from '../../utilities/dom';

const getClassNames = classNamesFunction<IDocumentCardTitleStyleProps, IDocumentCardTitleStyles>();

export interface IDocumentCardTitleState {
  truncatedTitleFirstPiece?: string;
  truncatedTitleSecondPiece?: string;
}

const TRUNCATION_VERTICAL_OVERFLOW_THRESHOLD = 5;

/**
 * {@docCategory DocumentCard}
 */
export class DocumentCardTitleBase extends React.Component<IDocumentCardTitleProps, IDocumentCardTitleState> {
  public static contextType = WindowContext;

  private _titleElement = React.createRef<HTMLDivElement>();
  private _classNames: IProcessedStyleSet<IDocumentCardTitleStyles>;
  private _async: Async;
  private _events: EventGroup;
  private _clientWidth: number | undefined;
  private _timerId: number | undefined;

  constructor(props: IDocumentCardTitleProps) {
    super(props);

    initializeComponentRef(this);
    this._async = new Async(this);
    this._events = new EventGroup(this);
    this._clientWidth = undefined;

    this.state = {
      truncatedTitleFirstPiece: undefined,
      truncatedTitleSecondPiece: undefined,
    };
  }

  public componentDidUpdate(prevProps: IDocumentCardTitleProps): void {
    if (this.props.title !== prevProps.title) {
      this.setState({
        truncatedTitleFirstPiece: undefined,
        truncatedTitleSecondPiece: undefined,
      });
    }

    if (prevProps.shouldTruncate !== this.props.shouldTruncate) {
      const win = getWindowEx(this.context);
      if (this.props.shouldTruncate) {
        this._truncateTitle();
        this._async.requestAnimationFrame(this._shrinkTitle);
        this._events.on(win, 'resize', this._updateTruncation);
      } else {
        this._events.off(win, 'resize', this._updateTruncation);
      }
    } else if (this._needMeasurement) {
      this._async.requestAnimationFrame(() => {
        this._truncateWhenInAnimation();
        this._shrinkTitle();
      });
    }
  }

  public componentDidMount(): void {
    if (this.props.shouldTruncate) {
      this._truncateTitle();
      const win = getWindowEx(this.context);
      this._events.on(win, 'resize', this._updateTruncation);
    }
  }

  public componentWillUnmount(): void {
    this._events.dispose();
    this._async.dispose();
  }

  public render(): JSX.Element {
    const { title, shouldTruncate, showAsSecondaryTitle, styles, theme, className } = this.props;
    const { truncatedTitleFirstPiece, truncatedTitleSecondPiece } = this.state;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      showAsSecondaryTitle,
    });

    if (shouldTruncate && truncatedTitleFirstPiece && truncatedTitleSecondPiece) {
      return (
        <DocumentCardContext.Consumer>
          {({ role, tabIndex }) => {
            return (
              <div
                className={this._classNames.root}
                ref={this._titleElement}
                title={title}
                tabIndex={tabIndex}
                role={role}
              >
                {truncatedTitleFirstPiece}
                &hellip;
                {truncatedTitleSecondPiece}
              </div>
            );
          }}
        </DocumentCardContext.Consumer>
      );
    } else {
      return (
        <DocumentCardContext.Consumer>
          {({ role, tabIndex }) => {
            return (
              <div
                className={this._classNames.root}
                ref={this._titleElement}
                title={title}
                tabIndex={tabIndex}
                role={role}
                style={this._needMeasurement ? { whiteSpace: 'nowrap' } : undefined}
              >
                {title}
              </div>
            );
          }}
        </DocumentCardContext.Consumer>
      );
    }
  }

  /**
   * In measuring, it will render a same style text with whiteSpace: 'nowrap', to get overflow rate.
   * So that the logic can predict truncated text well.
   */
  private get _needMeasurement(): boolean {
    return !!this.props.shouldTruncate && this._clientWidth === undefined;
  }

  // Truncate logic here way can't handle the case that chars with different widths are mixed very well.
  // Let _shrinkTitle take care of that.
  private _truncateTitle = (): void => {
    if (!this._needMeasurement) {
      return;
    }

    this._async.requestAnimationFrame(this._truncateWhenInAnimation);
  };

  private _truncateWhenInAnimation: () => void = () => {
    const originalTitle = this.props.title;
    const element: HTMLDivElement | null = this._titleElement.current;

    if (element) {
      const style: CSSStyleDeclaration = getComputedStyle(element);
      if (style.width && style.lineHeight && style.height) {
        const { clientWidth, scrollWidth } = element;

        this._clientWidth = clientWidth;

        const lines: number = Math.floor(
          (parseInt(style.height, 10) + TRUNCATION_VERTICAL_OVERFLOW_THRESHOLD) / parseInt(style.lineHeight, 10),
        );

        element.style.whiteSpace = '';

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
          const truncatedLength: number = originalTitle.length / overFlowRate - 3; /** Saved for separator */
          return this.setState({
            truncatedTitleFirstPiece: originalTitle.slice(0, truncatedLength / 2),
            truncatedTitleSecondPiece: originalTitle.slice(originalTitle.length - truncatedLength / 2),
          });
        }
      }
    }
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
          truncatedTitleSecondPiece: truncatedTitleSecondPiece.slice(1),
        });
      }
    }
  };

  private _updateTruncation(): void {
    if (this._timerId) {
      return;
    }

    this._timerId = this._async.setTimeout(() => {
      delete this._timerId;
      this._clientWidth = undefined;
      this.setState({
        truncatedTitleFirstPiece: undefined,
        truncatedTitleSecondPiece: undefined,
      });
    }, 250);
  }
}
