import * as React from 'react';
import { ILayoutProps, ILayoutStyles, ICardContentDetails } from './Layout.types';
import { getStyles } from './Layout.styles';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { BodyText } from '../BodyText/BodyText';
import { CardHeader } from '../CardHeader/CardHeader';
import { ThumbnailList } from '../ThumbnailList/ThumbnailList';
import { CardSize, CardContentType, Priority } from '../Card.types';
import { CompoundButtonStack } from '../CompoundButtonStack/CompoundButtonStack';
import { ActionBar } from '../ActionBar/ActionBar';

export class Layout extends React.Component<ILayoutProps> {
  constructor(props: ILayoutProps) {
    super(props);
    this.GenerateContentArea = this.GenerateContentArea.bind(this);
  }

  private GenerateContentElement(cardContentList: ICardContentDetails[]): any {
    var contentArea: any = [];
    // This works because we have priority is defined in enum as numbers if it is string this will not work
    for (let priority in Priority) {
      if (!isNaN(Number(priority))) {
        cardContentList.map((cardContent: any, i: number) => {
          if (cardContent.priority == priority) {
            switch (cardContent.cardContentType) {
              case CardContentType.BodyText: {
                const { subHeaderText, bodyText } = cardContent.content!;
                contentArea.push(<BodyText key={i} subHeaderText={subHeaderText} bodyText={bodyText} />);
                break;
              }
              case CardContentType.ThumbnailList: {
                const { thumbnailList } = cardContent.content!;
                contentArea.push(<ThumbnailList key={i} thumbnailItems={thumbnailList} />);
                break;
              }
              case CardContentType.CompoundButtonStack: {
                const { actions } = cardContent.content!;
                contentArea.push(<CompoundButtonStack actions={actions} />);
                break;
              }
            }
          }
        });
      }
    }

    return contentArea;
  }

  private GenerateHeader(header: any): any {
    if (header === null || header === undefined) {
      return null;
    }
    return (
      <CardHeader headerText={header.headerText} annotationText={header.annotationText} fontSize={header.fontSize} />
    );
  }

  private GenerateFooter(actions: any, className: any) {
    if (actions === null || actions === undefined) {
      return null;
    }
    return (
      <div id="actionBar" className={className}>
        <ActionBar actions={actions} />
      </div>
    );
  }

  private GenerateContentArea(cardContentList: any, classNames: any, cardSize: CardSize): any {
    if (cardContentList === null || cardContentList === undefined) {
      return;
    }

    let contentAreaContents: any[] = this.GenerateContentElement(cardContentList);
    if (contentAreaContents.length === 0) {
      return;
    }

    if (contentAreaContents.length > 1 && cardSize !== CardSize.small) {
      return (
        <div className={classNames.contentLayout}>
          <div id="c1" className={classNames.contentArea1}>
            {contentAreaContents[0]}
          </div>
          <div id="c2" className={classNames.contentArea2}>
            {contentAreaContents[1]}
          </div>
        </div>
      );
    } else {
      return (
        <div id="c1" className={classNames.contentArea1}>
          {contentAreaContents[0]}
        </div>
      );
    }
  }

  public render(): JSX.Element {
    const getClassNames = classNamesFunction<ILayoutProps, ILayoutStyles>();
    const { header, contentArea, actions, cardSize } = this.props;
    const classNames = getClassNames(getStyles, { cardSize });
    const content: any[] = this.GenerateContentArea(contentArea!, classNames, cardSize);
    const headerElement: any = this.GenerateHeader(header);
    const footerElement: any = this.GenerateFooter(actions, classNames.footer);
    return (
      <div className={classNames.root}>
        {headerElement}
        <div className={classNames.contentAreaLayout}>{content}</div>
        {footerElement}
      </div>
    );
  }
}
