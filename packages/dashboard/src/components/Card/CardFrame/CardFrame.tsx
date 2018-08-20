import * as React from 'react';
import { ICardFrameProps, ICardFrameStyles, ICardDropDownOption } from './CardFrame.types';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { getStyles } from './CardFrame.styles';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IOverflowSetItemProps } from 'office-ui-fabric-react/lib/OverflowSet';

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
            <IconButton
              menuIconProps={{ iconName: 'More' }}
              split={false}
              aria-label={'More'}
              menuProps={{
                items: cardDropDownOptions
              }}
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
}
