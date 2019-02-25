import * as React from 'react';
import { ICardFrameProps, ICardFrameStyles, ICardDropDownOption } from './CardFrame.types';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { getStyles } from './CardFrame.styles';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IOverflowSetItemProps } from 'office-ui-fabric-react/lib/OverflowSet';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { DefaultFontStyles } from 'office-ui-fabric-react/lib/Styling';

export class CardFrame extends React.Component<ICardFrameProps, {}> {
  constructor(props: ICardFrameProps) {
    super(props);
  }

  public render(): JSX.Element {
    const getClassNames = classNamesFunction<ICardFrameProps, ICardFrameStyles>();
    const {
      fontFamily,
      fontSize,
      cardTitle,
      seperatorColor,
      titleTextColor,
      disableDrag,
      cardFrameMenuAriaLabel,
      cardFrameMenuTitle
    } = this.props;
    const classNames = getClassNames(getStyles, {
      cardTitle,
      fontFamily,
      fontSize,
      seperatorColor,
      titleTextColor,
      disableDrag
    });
    const overflowItems: ICardDropDownOption[] | undefined = this.props.cardDropDownOptions;
    const cardDropDownOptions: IOverflowSetItemProps[] = [];
    if (overflowItems !== undefined) {
      overflowItems.map((data: ICardDropDownOption, index: number) => {
        const cardDropDownOption: IOverflowSetItemProps = {
          key: index.toString(),
          name: data.name,
          icon: data.icon,
          ariaLabel: data.ariaLabel ? data.ariaLabel : data.name,
          title: data.title ? data.title : data.name,
          onClick: data.onClick
        };
        cardDropDownOptions.push(cardDropDownOption);
      });
    }
    const href = this.props.href === undefined ? '#' : this.props.href;
    const target = this.props.target === undefined ? '_self' : this.props.target;
    return (
      <div className={classNames.root}>
        <div className={classNames.cardTitleBox}>
          <div className={classNames.cardTitle}>
            <Link
              onMouseDown={this._onLinkMouseDown}
              styles={{
                root: {
                  fontFamily: DefaultFontStyles.medium.fontFamily,
                  fontWeight: DefaultFontStyles.tiny.fontWeight,
                  fontSize: DefaultFontStyles.medium.fontSize,
                  lineHeight: '19px',
                  selectors: {
                    ':hover': {
                      color: '#0078D4'
                    },
                    ':active': {
                      color: '#004578 !important'
                    }
                  }
                }
              }}
              href={href}
              target={target}
              disabled={href === '#'}
              onClick={this._handleTitleClick}
              title={cardTitle}
              aria-label={cardTitle}
            >
              {cardTitle}
            </Link>
          </div>
          <div className={classNames.cardTitleEllipsisButton} onMouseDown={this._onIconMouseDown}>
            <IconButton
              className={classNames.ellipsisButtonStyle}
              menuIconProps={{ iconName: 'More' }}
              split={false}
              ariaLabel={cardFrameMenuAriaLabel}
              title={cardFrameMenuTitle}
              menuProps={{
                calloutProps: {
                  styles: {
                    root: {
                      boxShadow: '0px 1.2px 3.6px rgba(0,0,0,0.18), 0px 6.4px 14.4px rgba(0,0,0,0.22)',
                      border: 'none'
                    }
                  }
                },
                items: cardDropDownOptions
              }}
              styles={{
                root: { width: '100%', height: '100%' },
                rootHovered: { background: '#979797', color: '#000000' },
                rootPressed: { background: '#979797', color: '#000000' },
                rootExpanded: { color: '#000000' }
              }}
            />
          </div>
        </div>
        <div className={classNames.layout}>{this.props.children}</div>
      </div>
    );
  }

  private _handleTitleClick = () => {
    this.props.cardTitleCallback ? this.props.cardTitleCallback() : '';
  };

  private _onLinkMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  private _onIconMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
}
