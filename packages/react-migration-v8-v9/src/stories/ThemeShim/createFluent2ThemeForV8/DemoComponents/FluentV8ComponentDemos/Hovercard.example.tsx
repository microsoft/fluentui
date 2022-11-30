import type { IExpandingCardProps, IHoverCard, IPlainCardProps } from '@fluentui/react';
import { DefaultButton, HoverCard, HoverCardType, mergeStyleSets } from '@fluentui/react';
import * as React from 'react';

const classNames = mergeStyleSets({
  plainCard: {
    width: 200,
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  target: {
    fontWeight: '600',
    display: 'inline-block',
    border: '1px dashed #605e5c',
    padding: 4,
    borderRadius: 2,
  },
  target2: {
    marginTop: 16,
    fontWeight: '600',
    display: 'inline-block',
    border: '1px dashed #605e5c',
    padding: 4,
    borderRadius: 2,
  },
  compactCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  expandedCard: {
    padding: '16px 24px',
  },
});

const onCardHide = (): void => {
  console.log('I am now hidden');
};

export const HoverCardInstantDismissExample: React.FunctionComponent = () => {
  const plainCardRef = React.useRef<IHoverCard>(null);
  const expandingCardRef = React.useRef<IHoverCard>(null);
  const instantDismissCard = (): void => {
    plainCardRef.current?.dismiss();
    expandingCardRef.current?.dismiss();
  };
  const onRenderCard = (): JSX.Element => {
    return (
      <div className={classNames.plainCard}>
        <DefaultButton
          // eslint-disable-next-line react/jsx-no-bind
          onClick={instantDismissCard}
          text="Instant Dismiss"
        />
      </div>
    );
  };

  const onRenderCompactCard = (): JSX.Element => {
    return <div className={classNames.compactCard}>Placeholder</div>;
  };

  const onRenderExpandedCard = (): JSX.Element => {
    return (
      <div className={classNames.expandedCard}>
        Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to
        corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the
        holistic world view of disruptive innovation via workplace diversity and empowerment. Bring to the table win-win
        survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has
        evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content
        in real-time will have multiple touchpoints for offshoring. Capitalize on low hanging fruit to identify a
        ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from
        DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the
        bottom line.
      </div>
    );
  };

  const plainCardProps: IPlainCardProps = {
    onRenderPlainCard: onRenderCard,
  };

  const expandingCardProps: IExpandingCardProps = {
    onRenderCompactCard: onRenderCompactCard,
    onRenderExpandedCard: onRenderExpandedCard,
  };

  return (
    <>
      <HoverCard
        cardDismissDelay={2000}
        type={HoverCardType.plain}
        plainCardProps={plainCardProps}
        componentRef={plainCardRef}
        onCardHide={onCardHide}
      >
        <span className={classNames.target}>Hover Over Me for plain hover card</span>
      </HoverCard>
      <HoverCard expandingCardProps={expandingCardProps} instantOpenOnClick={true}>
        <span className={classNames.target2}>Hover Over Me for expanding hover card</span>
      </HoverCard>
    </>
  );
};
