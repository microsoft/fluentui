import * as React from 'react';
import { PositioningProps, PositioningShorthand } from './types';
import { resolvePositioningShorthand } from './utils/resolvePositioningShorthand';
import { makeStyles } from '@fluentui/react-make-styles';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-popover';
import { Button } from '@fluentui/react-button';

export const PositionedComponent = (props: {
  positioning: PositioningShorthand;
  gridArea?: string;
  targetContent?: React.ReactNode;
  targetClassName?: string;
  containerClassName?: string;
  containerContent?: React.ReactNode;
}) => {
  const { positioning, targetContent = 'Hover me', containerContent = 'Container', targetClassName } = props;
  const options = resolvePositioningShorthand(positioning);

  return (
    <Popover positioning={options} openOnHover noArrow>
      <PopoverTrigger>
        <Button primary className={targetClassName}>
          {targetContent}
        </Button>
      </PopoverTrigger>

      <PopoverSurface style={{ minWidth: 100 }}>{containerContent}</PopoverSurface>
    </Popover>
  );
};

/**
 * A helper component for storybook to auto generate an args table for positioning props
 */
export const Positioning: React.FC<PositioningProps> = props => {
  return <div />;
};

export const useGridExampleStyles = makeStyles({
  targetContainer: {
    display: 'inline-grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'repeat(5, 64px)',
    gap: '20px',
    margin: '16px 128px',
  },

  instructions: {
    gridArea: '3/2/span 1/span 3',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  aboveStart: {
    gridArea: '1/2',
  },
  above: {
    gridArea: '1/3',
  },
  aboveEnd: {
    gridArea: '1/4',
  },
  beforeTop: {
    gridArea: '2/1',
  },
  before: {
    gridArea: '3/1',
  },
  beforeBottom: {
    gridArea: '4/1',
  },
  afterTop: {
    gridArea: '2/5',
  },
  after: {
    gridArea: '3/5',
  },
  afterBottom: {
    gridArea: '4/5',
  },
  belowStart: {
    gridArea: '5/2',
  },
  below: {
    gridArea: '5/3',
  },
  belowEnd: {
    gridArea: '5/4',
  },
});
