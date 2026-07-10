import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Tooltip } from '@fluentui/react-components';

/**
 * A tooltip whose trigger is inside an `overflow: hidden` container.
 * When the trigger is scrolled out of view, the tooltip should become hidden
 * (via `data-popper-reference-hidden` set by the positioning middleware).
 *
 * Regression story for https://github.com/microsoft/fluentui/issues/32882
 */
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
      story: `When a tooltip trigger is inside an \`overflow: hidden\` container and the trigger scrolls out
of view, the tooltip must be hidden rather than appearing outside the overflow boundary.

The positioning middleware sets \`data-popper-reference-hidden\` on the tooltip element when the trigger
is clipped by its scroll container. The Tooltip styles respond to this attribute with \`visibility: hidden\`.`,
    },
  },
};
