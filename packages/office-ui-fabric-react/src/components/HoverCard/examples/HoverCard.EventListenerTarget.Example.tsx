import * as React from 'react';
import { HoverCard, IPlainCardProps, HoverCardType, DirectionalHint } from 'office-ui-fabric-react/lib/HoverCard';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { IconButton } from 'office-ui-fabric-react';

const classNames = mergeStyleSets({
  plainCard: {
    width: 200,
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textField: {
    paddingRight: 200,
  },
});

const onRenderPlainCard = (): JSX.Element => {
  return <div className={classNames.plainCard}>plain card</div>;
};

export const HoverCardEventListenerTargetExample: React.FunctionComponent = () => {
  const [target, setTarget] = React.useState();
  const [eventListenerTarget, setEventListenerTarget] = React.useState();
  const plainCardProps: IPlainCardProps = {
    onRenderPlainCard: onRenderPlainCard,
    directionalHint: DirectionalHint.rightTopEdge,
  };
  const onSetTarget = (element: HTMLElement | null): void => {
    setTarget(element);
  };
  const onSetEventListenerTarget = (element: HTMLElement | null): void => {
    setEventListenerTarget(element);
  };
  return (
    <Fabric>
      <p>
        Using the target to tag hover card on the right side of Emoji icon, and using eventListenerTarget to launch the
        card only when hovering over the text field, hovering over the icon doesn't trigger card open.
      </p>
      <span ref={onSetTarget}>
        <span ref={onSetEventListenerTarget} className={classNames.textField}>
          Hover Zone
        </span>
        <IconButton iconProps={{ iconName: 'Emoji2' }} title={'Emoji'} />
        <HoverCard
          plainCardProps={plainCardProps}
          type={HoverCardType.plain}
          target={target}
          eventListenerTarget={eventListenerTarget}
        />
      </span>
    </Fabric>
  );
};
