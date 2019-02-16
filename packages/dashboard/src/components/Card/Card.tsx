import * as React from 'react';
import { ICardProps, ICardState, ICardStyles } from './Card.types';
import { CardFrame } from './CardFrame/CardFrame';
import { Layout } from './Layout/Layout';
import { getStyles } from './Card.styles';
import { classNamesFunction, getRTL } from 'office-ui-fabric-react/lib/Utilities';

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
    const {
      cardFrameContent,
      header,
      cardContentList,
      actions,
      disableDrag,
      loading,
      actionBarOverflowButtonTitle,
      actionBarOverflowButtonAriaLabel,
      actionBarOverflowButtonAriaDescription,
      role,
      cardAriaLabelledby
    } = this.props;
    const getClassNames = classNamesFunction<ICardProps, ICardStyles>();
    const classNames = getClassNames(getStyles);
    // getRTL() utility function returns true when RTL is experienced. Setting the direction this way as a wrapper was introduced
    // in DGL where it explicitly had direction set to LTR, which was overriding card's RTL behavior
    const direction = getRTL() ? 'rtl' : 'ltr';
    return (
      <div dir={direction} className={classNames.root} role={role ? role : 'region'} aria-labelledby={cardAriaLabelledby}>
        <CardFrame
          cardTitle={cardFrameContent.cardTitle}
          cardDropDownOptions={cardFrameContent.cardDropDownOptions}
          href={cardFrameContent.href}
          target={cardFrameContent.target}
          disableDrag={disableDrag === undefined ? false : disableDrag}
          cardTitleCallback={cardFrameContent.cardTitleCallback}
          cardFrameMenuTitle={cardFrameContent.cardFrameMenuTitle}
          cardFrameMenuAriaLabel={cardFrameContent.cardFrameMenuAriaLabel}
        >
          <Layout
            header={header}
            contentArea={cardContentList}
            cardSize={this.state.cardSize}
            actions={actions}
            loading={loading}
            actionBarOverflowButtonTitle={actionBarOverflowButtonTitle}
            actionBarOverflowButtonAriaDescription={actionBarOverflowButtonAriaDescription}
            actionBarOverflowButtonAriaLabel={actionBarOverflowButtonAriaLabel}
          />
        </CardFrame>
      </div>
    );
  }
}
