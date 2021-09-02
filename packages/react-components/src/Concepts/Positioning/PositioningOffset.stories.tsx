import * as React from 'react';
import { PositionedComponent } from './utils.stories';

export { Default } from './PositioningDefault.stories';
export { ShorthandPositions } from './PositioningShorthandPositions.stories';
export { CoverTarget } from './PositioningCoverTarget.stories';

export const Offset = () => {
  const [offsetY, setOffsetY] = React.useState(10);
  const [offsetX, setOffsetX] = React.useState(10);

  const onChangeY = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOffsetY(parseInt(e.target.value, 10));
  };

  const onChangeX = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOffsetX(parseInt(e.target.value, 10));
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <label style={{ display: 'flex', gap: 10 }}>
        Offset Y
        <input onChange={onChangeY} value={offsetY} type="number" />
      </label>
      <label style={{ display: 'flex', gap: 10 }}>
        Offset X
        <input onChange={onChangeX} value={offsetX} type="number" />
      </label>
      <PositionedComponent
        positioning={{ position: 'after', offset: [offsetY, offsetX] }}
        targetContent="Simple offset"
      />
      <PositionedComponent
        positioning={{ position: 'after', offset: () => [offsetY, offsetX] }}
        targetContent="Offset function"
      />
    </div>
  );
};

Offset.parameters = {
  layout: 'padded',
  docs: {
    description: {
      story: [
        'The positionined element can be offset from the target element. The offset value can be set either by:',
        '',
        '- Simple array with X and Y axis values',
        '- A function that returns the array offset value',
      ].join('\n'),
    },
  },
};
