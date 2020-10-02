import * as React from 'react';
import { Toggle } from '@fluentui/react-next/lib/Toggle';
import { LayerHost } from '@fluentui/react-next/lib/Layer';
import { Panel } from '@fluentui/react-next/lib/Panel';
import { IFocusTrapZoneProps } from '@fluentui/react-next/lib/FocusTrapZone';
import { mergeStyles } from '@fluentui/react-next/lib/Styling';
import { useId, useBoolean } from '@uifabric/react-hooks';

export const LayerCustomizedExample: React.FunctionComponent = () => {
  const [isPanelOpen, { setTrue: showPanel, setFalse: dismissPanel }] = useBoolean(false);
  const [trapPanel, { toggle: toggleTrapPanel }] = useBoolean(false);

  // Use useId() to ensure that the ID is unique on the page.
  // (It's also okay to use a plain string and manually ensure uniqueness.)
  const layerHostId = useId('layerHost');

  return (
    <div>
      <p>
        A <code>Panel</code> is rendered, trapped in a specified container. Use <b>Show panel</b> to show/hide the panel
        (or select the X to dismiss it). Use <b>Trap panel</b> to release the panel from its bounds.
      </p>
      <Toggle label="Show panel" inlineLabel checked={isPanelOpen} onChange={isPanelOpen ? dismissPanel : showPanel} />
      <Toggle label="Trap panel" inlineLabel checked={trapPanel} onChange={toggleTrapPanel} />
      {isPanelOpen && (
        <Panel
          isOpen
          hasCloseButton
          headerText="Sample panel"
          focusTrapZoneProps={focusTrapZoneProps}
          onDismiss={dismissPanel}
          layerProps={trapPanel ? { hostId: layerHostId } : undefined}
        >
          This panel {trapPanel ? 'is' : 'is not'} trapped.
        </Panel>
      )}
      <LayerHost id={layerHostId} className={layerHostClass} />
    </div>
  );
};

const layerHostClass = mergeStyles({
  position: 'relative',
  height: 400,
  overflow: 'hidden',
  border: '1px solid #ccc',
});

const focusTrapZoneProps: IFocusTrapZoneProps = {
  isClickableOutsideFocusTrap: true,
  forceFocusInsideTrap: false,
};
