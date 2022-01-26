import * as React from 'react';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { LayerHost, ILayerProps } from '@fluentui/react/lib/Layer';
import { Panel } from '@fluentui/react/lib/Panel';
import { IFocusTrapZoneProps } from '@fluentui/react/lib/FocusTrapZone';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { Customizer } from '@fluentui/react/lib/Utilities';
import { useId, useBoolean } from '@fluentui/react-hooks';

export const LayerCustomizedExample: React.FunctionComponent = () => {
  const [isPanelOpen, { setTrue: showPanel, setFalse: dismissPanel }] = useBoolean(false);
  const [trapPanel, { toggle: toggleTrapPanel }] = useBoolean(false);

  // Use useId() to ensure that the ID is unique on the page.
  // (It's also okay to use a plain string and manually ensure uniqueness.)
  const layerHostId = useId('layerHost');

  const scopedSettings = useLayerSettings(trapPanel, layerHostId);

  return (
    <div>
      <p>
        A <code>Panel</code> is rendered, trapped in a specified container. Use <b>Show panel</b> to show/hide the panel
        (or select the X to dismiss it). Use <b>Trap panel</b> to release the panel from its bounds.
      </p>
      <Toggle label="Show panel" inlineLabel checked={isPanelOpen} onChange={isPanelOpen ? dismissPanel : showPanel} />
      <Toggle label="Trap panel" inlineLabel checked={trapPanel} onChange={toggleTrapPanel} />
      {/* eslint-disable-next-line deprecation/deprecation */}
      <Customizer scopedSettings={scopedSettings}>
        {isPanelOpen && (
          <Panel
            isOpen
            hasCloseButton
            headerText="Sample panel"
            focusTrapZoneProps={focusTrapZoneProps}
            onDismiss={dismissPanel}
          >
            This panel {trapPanel ? 'is' : 'is not'} trapped.
          </Panel>
        )}
      </Customizer>
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

function useLayerSettings(trapPanel: boolean, layerHostId: string): { Layer?: ILayerProps } {
  return React.useMemo(() => {
    if (trapPanel) {
      const layerProps: ILayerProps = { hostId: layerHostId };
      return { Layer: layerProps };
    }
    return {};
  }, [trapPanel, layerHostId]);
}
