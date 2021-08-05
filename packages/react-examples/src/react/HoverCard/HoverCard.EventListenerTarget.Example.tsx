import * as React from 'react';
import {
  HoverCard,
  IPlainCardProps,
  HoverCardType,
  DirectionalHint,
  ThemeProvider,
  mergeStyleSets,
} from '@fluentui/react';
import { IconButton } from '@fluentui/react/lib/Button';

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
  const targetRef = React.useRef<HTMLElement | null>(null);
  const eventListenerTargetRef = React.useRef<HTMLElement | null>(null);
  const plainCardProps: IPlainCardProps = {
    onRenderPlainCard: onRenderPlainCard,
    directionalHint: DirectionalHint.rightTopEdge,
  };
  return (
    <ThemeProvider>
      <p>
        Using the target to tag hover card on the right side of Emoji icon, and using eventListenerTarget to launch the
        card only when hovering over the text field, hovering over the icon doesn't trigger card open.
      </p>
      <span ref={targetRef}>
        <span ref={eventListenerTargetRef} className={classNames.textField}>
          Hover Zone
        </span>
        <IconButton iconProps={{ iconName: 'Emoji2' }} title={'Emoji'} />
        <HoverCard
          plainCardProps={plainCardProps}
          type={HoverCardType.plain}
          target={targetRef.current}
          eventListenerTarget={eventListenerTargetRef.current}
        />
      </span>
    </ThemeProvider>
  );
};
