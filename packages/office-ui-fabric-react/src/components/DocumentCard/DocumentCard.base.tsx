import * as React from 'react';
import { IProcessedStyleSet } from '../../Styling';
import { BaseComponent, classNamesFunction, KeyCodes, getNativeProps, divProperties } from '../../Utilities';
import { DocumentCardType, IDocumentCard, IDocumentCardProps, IDocumentCardStyleProps, IDocumentCardStyles } from './DocumentCard.types';

const getClassNames = classNamesFunction<IDocumentCardStyleProps, IDocumentCardStyles>();

export class DocumentCardBase extends BaseComponent<IDocumentCardProps, any> implements IDocumentCard {
  public static defaultProps: IDocumentCardProps = {
    type: DocumentCardType.normal
  };

  private _rootElement = React.createRef<HTMLDivElement>();
  private _classNames: IProcessedStyleSet<IDocumentCardStyles>;

  constructor(props: IDocumentCardProps) {
    super(props);

    this._warnDeprecations({
      accentColor: undefined
    });
  }

  public render(): JSX.Element {
    const { onClick, onClickHref, children, type, accentColor, styles, theme, className } = this.props;
    const nativeProps = getNativeProps(this.props, divProperties, ['className', 'onClick', 'type', 'role']);
    const actionable = onClick || onClickHref ? true : false;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      actionable,
      compact: type === DocumentCardType.compact ? true : false
    });

    // Override the border color if an accent color was provided (compact card only)
    let style;
    if (type === DocumentCardType.compact && accentColor) {
      style = {
        borderBottomColor: accentColor
      };
    }

    // if this element is actionable it should have an aria role
    const role = this.props.role || (actionable ? (onClick ? 'button' : 'link') : undefined);
    const tabIndex = actionable ? 0 : undefined;

    return (
      <div
        ref={this._rootElement}
        tabIndex={tabIndex}
        data-is-focusable={actionable}
        role={role}
        className={this._classNames.root}
        onKeyDown={actionable ? this._onKeyDown : undefined}
        onClick={actionable ? this._onClick : undefined}
        style={style}
        {...nativeProps}
      >
        {children}
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
    if (ev.which === KeyCodes.enter || ev.which === KeyCodes.space) {
      this._onAction(ev);
    }
  };

  private _onAction = (ev: React.SyntheticEvent<HTMLElement>): void => {
    const { onClick, onClickHref } = this.props;

    if (onClick) {
      onClick(ev);
    } else if (!onClick && onClickHref) {
      // If no onClick Function was provided and we do have an onClickHref, redirect to the onClickHref
      window.location.href = onClickHref;
      ev.preventDefault();
      ev.stopPropagation();
    }
  };
}
