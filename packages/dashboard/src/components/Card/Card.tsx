import * as React from 'react';
import { ICardProps, ICardState, ICardStyles } from './Card.types';
import { CardFrame } from './CardFrame/CardFrame';
import { Layout } from './Layout/Layout';
import { getStyles } from './Card.styles';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

export class Card extends React.Component<ICardProps, ICardState> {
  constructor(props: ICardProps) {
    super(props);
    this.state = {
      cardSize: this.props.cardSize
    };
  }

  public updateState(): void {
    this.setState({});
  }

  public componentDidMount(): void {
    if (this.props.callOnDidMount !== undefined) {
      this.props.callOnDidMount();
    }
  }

  public render(): JSX.Element {
    const { cardFrameContent, header, cardContentList, actions, disableDrag, loading } = this.props;
    const getClassNames = classNamesFunction<ICardProps, ICardStyles>();
    const classNames = getClassNames(getStyles);
    return (
      <div className={classNames.root}>
        <CardFrame
          cardTitle={cardFrameContent.cardTitle}
          cardDropDownOptions={cardFrameContent.cardDropDownOptions}
          href={cardFrameContent.href}
          target={cardFrameContent.target}
          disableDrag={disableDrag === undefined ? false : disableDrag}
          cardTitleCallback={cardFrameContent.cardTitleCallback}
        >
          <Layout header={header} contentArea={cardContentList} cardSize={this.state.cardSize} actions={actions} loading={loading} />
        </CardFrame>
      </div>
    );
  }
}
