import * as React from 'react';
import { ICardProps, ICardState } from './Card.types';
import { CardFrame } from './CardFrame/CardFrame';
import { Layout } from './Layout/Layout';

export class Card extends React.Component<ICardProps, ICardState> {
  constructor(props: ICardProps) {
    super(props);
    this.state = {
      cardSize: this.props.cardSize
    };
  }

  public render(): JSX.Element {
    const { cardFrameContent, header, cardContentList, actions } = this.props;
    return (
      <CardFrame cardTitle={cardFrameContent.cardTitle} cardDropDownOptions={cardFrameContent.cardDropDownOptions}>
        <Layout header={header} contentArea={cardContentList} cardSize={this.state.cardSize} actions={actions} />
      </CardFrame>
    );
  }
}
