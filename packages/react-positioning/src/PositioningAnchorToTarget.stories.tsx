import * as React from 'react';
import { PositionedComponent } from './utils.stories';
// Need to disable compilation for aliases: https://github.com/microsoft/fluentui/pull/16976/files#r575447074
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button } from '@fluentui/react-button';

export { Default } from './PositioningDefault.stories';
export { ShorthandPositions } from './PositioningShorthandPositions.stories';
export { CoverTarget } from './PositioningCoverTarget.stories';
export { Offset } from './PositioningOffset.stories';

export const AnchorToTarget = () => {
  const [target, setTarget] = React.useState<HTMLElement | null>(null);
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <PositionedComponent positioning={{ position: 'above', align: 'start', target }} />
      <Button ref={setTarget}>Target</Button>
    </div>
  );
};

AnchorToTarget.parameters = {
  layout: 'padded',
  docs: {
    description: {
      story: [
        'Components with positioned slots will generally also contain the target which the positioned element will',
        'anchor on. It is also possible to select another DOM element for the anchor of the positioned slot. This',
        'can be useful in scenarios where the same instance of a positioned components needs to be reused',
      ].join('\n'),
    },
  },
};
