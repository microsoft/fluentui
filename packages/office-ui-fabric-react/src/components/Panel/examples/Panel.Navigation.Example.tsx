import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, IPanelProps } from 'office-ui-fabric-react/lib/Panel';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { useConstCallback } from '@uifabric/react-hooks';

const explanation =
  'This panel has custom content in the navigation region (the part at the top which normally ' +
  'contains the close button). If the custom content replaces the close button, be sure to provide ' +
  'some other obvious way for users to close the panel.';
const searchboxStyles = { root: { margin: '5px', height: 'auto', width: '100%' } };

export const PanelNavigationExample: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openPanel = useConstCallback(() => setIsOpen(true));
  const dismissPanel = useConstCallback(() => setIsOpen(false));

  const onRenderNavigationContent: IRenderFunction<IPanelProps> = useConstCallback((props, defaultRender) => (
    <>
      <SearchBox
        placeholder="Search here..."
        styles={searchboxStyles}
        ariaLabel="Sample search box. Does not actually search anything."
      />
      {// This custom navigation still renders the close button (defaultRender).
      // If you don't use defaultRender, be sure to provide some other way to close the panel.
      defaultRender!(props)}
    </>
  ));

  return (
    <div>
      {explanation}
      <br />
      <br />
      <DefaultButton text="Open panel" onClick={openPanel} />
      <Panel
        headerText="Panel with custom navigation content"
        onRenderNavigationContent={onRenderNavigationContent}
        isOpen={isOpen}
        onDismiss={dismissPanel}
        closeButtonAriaLabel="Close"
      >
        <div>
          <p>{explanation}</p>
        </div>
      </Panel>
    </div>
  );
};
