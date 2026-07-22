import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Tooltip } from '@fluentui/react-components';

export const OverflowHidden = (): JSXElement => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
      <p style={{ margin: 0, fontSize: '14px' }}>
        Scroll the box below. The tooltip should disappear when the button scrolls out of view, not follow it outside
        the container boundary.
      </p>
      <div
        style={{
          height: '120px',
          width: '240px',
          overflow: 'hidden scroll',
          border: '1px solid #ccc',
          borderRadius: '4px',
          position: 'relative',
        }}
      >
        <div style={{ height: '300px', paddingTop: '8px', paddingLeft: '8px' }}>
          <Tooltip content="I should hide when scrolled out of view" relationship="label">
            <Button>Hover me, then scroll</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

OverflowHidden.parameters = {
  docs: {
    description: {
      story:
        'When a tooltip trigger scrolls out of an overflow container, the tooltip should hide instead of rendering outside the clipped boundary.',
    },
  },
};
