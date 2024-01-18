import * as React from 'react';
import {
  classNamesFunction,
  KeyCodes,
  getNativeProps,
  divProperties,
  warnDeprecations,
  initializeComponentRef,
} from '../../Utilities';
import { DocumentCardType } from './DocumentCard.types';
import type { IProcessedStyleSet } from '../../Styling';
import type {
  IDocumentCard,
  IDocumentCardContext,
  IDocumentCardProps,
  IDocumentCardStyleProps,
  IDocumentCardStyles,
} from './DocumentCard.types';
import { WindowContext } from '@fluentui/react-window-provider';
import { getWindowEx } from '../../utilities/dom';

const getClassNames = classNamesFunction<IDocumentCardStyleProps, IDocumentCardStyles>();

const COMPONENT_NAME = 'DocumentCard';

export const DocumentCardContext = React.createContext<IDocumentCardContext>({});

/**
 * {@docCategory DocumentCard}
 */
export class DocumentCardBase extends React.Component<IDocumentCardProps, any> implements IDocumentCard {
  public static defaultProps: IDocumentCardProps = {
    type: DocumentCardType.normal,
  };

  public static contextType = WindowContext;

  private _rootElement = React.createRef<HTMLDivElement>();
  private _classNames: IProcessedStyleSet<IDocumentCardStyles>;

  constructor(props: IDocumentCardProps) {
    super(props);

    initializeComponentRef(this);
    warnDeprecations(COMPONENT_NAME, props, {
      accentColor: undefined,
    });
  }

  public render(): JSX.Element {
    // eslint-disable-next-line deprecation/deprecation
    const { onClick, onClickHref, children, type, accentColor, styles, theme, className } = this.props;
    const nativeProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, divProperties, [
      'className',
      'onClick',
      'type',
      'role',
    ]);
    const actionable = onClick || onClickHref ? true : false;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      actionable,
      compact: type === DocumentCardType.compact ? true : false,
    });

    // Override the border color if an accent color was provided (compact card only)
    let style;
    if (type === DocumentCardType.compact && accentColor) {
      style = {
        borderBottomColor: accentColor,
      };
    }

    // if this element is actionable it should have an aria role
    const role = this.props.role || (actionable ? (onClick ? 'button' : 'link') : undefined);
    const tabIndex = actionable ? 0 : undefined;
    const documentCardContextValue = { role, tabIndex };

    return (
      <div
        ref={this._rootElement}
        role={'group'}
        className={this._classNames.root}
        onKeyDown={actionable ? this._onKeyDown : undefined}
        onClick={actionable ? this._onClick : undefined}
        style={style}
        {...nativeProps}
      >
        <DocumentCardContext.Provider value={documentCardContextValue}>{children}</DocumentCardContext.Provider>
      </div>
    );
  }

  public focus(): void {
    if (this._rootElement.current) {
      this._rootElement.current.focus();
    }
  }

  private _onClick = (ev: React.MouseEvent<HTMLElement>): void => {
    this._onAction(ev);
  };

  private _onKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    // eslint-disable-next-line deprecation/deprecation
    if (ev.which === KeyCodes.enter || ev.which === KeyCodes.space) {
      this._onAction(ev);
    }
  };

  private _onAction = (ev: React.SyntheticEvent<HTMLElement>): void => {
    const { onClick, onClickHref, onClickTarget } = this.props;

    const win = getWindowEx(this.context)!; // can only be called on the client

    if (onClick) {
      onClick(ev);
    } else if (!onClick && onClickHref) {
      // If no onClick Function was provided and we do have an onClickHref, redirect to the onClickHref
      if (onClickTarget) {
        win.open(onClickHref, onClickTarget, 'noreferrer noopener nofollow');
      } else {
        win.location.href = onClickHref;
      }

      ev.preventDefault();
      ev.stopPropagation();
    }
  };
}
