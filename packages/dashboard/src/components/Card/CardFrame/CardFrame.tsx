import * as React from 'react';
import { ICardFrameProps, ICardFrameStyles, ICardDropDownOption } from './CardFrame.types';
import { IconButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { getStyles } from './CardFrame.styles';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IOverflowSetItemProps, OverflowSet } from 'office-ui-fabric-react/lib/OverflowSet';
import { customOverflowStyle } from './CardFrame.styles';

export class CardFrame extends React.Component<ICardFrameProps, {}> {
  constructor(props: ICardFrameProps) {
    super(props);
  }

  public render(): JSX.Element {
    const getClassNames = classNamesFunction<ICardFrameProps, ICardFrameStyles>();
    const { fontFamily, fontSize, cardTitle, seperatorColor, titleTextColor, href, disableDrag } = this.props;
    const classNames = getClassNames(getStyles, {
      cardTitle,
      fontFamily,
      fontSize,
      seperatorColor,
      titleTextColor,
      href,
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
    return (
      <div className={classNames.root}>
        <div className={classNames.cardTitleBox}>
          <div className={classNames.cardTitleEllipsisButton}>
            <OverflowSet
              overflowItems={cardDropDownOptions}
              onRenderOverflowButton={this._onRenderOverflowButton}
              onRenderItem={this._onRenderItem}
            />
          </div>
          <div className={classNames.cardTitle}>
            <a href={this.props.href}>{cardTitle}</a>
          </div>
        </div>
        <div className={classNames.layout}>{this.props.children}</div>
      </div>
    );
  }

  private _onRenderItem(item: IOverflowSetItemProps): JSX.Element {
    return (
      <IconButton
        menuIconProps={{ iconName: item.icon }}
        onClick={item.onClick}
        title={item.title}
        ariaLabel={item.ariaLabel}
      />
    );
  }

  private _onRenderOverflowButton(overflowItems: IOverflowSetItemProps[] | undefined): JSX.Element {
    return (
      <DefaultButton
        menuIconProps={{ iconName: 'More' }}
        menuProps={{ items: overflowItems! }}
        ariaLabel="Card options"
        title="Card options"
        styles={customOverflowStyle}
      />
    );
  }
}
