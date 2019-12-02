import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, IPanelProps } from 'office-ui-fabric-react/lib/Panel';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { useConstCallback } from '@uifabric/react-hooks';

const explanation = 'This panel has the new header component that you can opt in by passing useLegacyHeader={false} props.';
const searchboxStyles = { root: { height: '32px' } };

export const PanelNewHeaderExample: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openPanel = useConstCallback(() => setIsOpen(true));
  const dismissPanel = useConstCallback(() => setIsOpen(false));

  const onRenderNavigationContent: IRenderFunction<IPanelProps> = useConstCallback((props, defaultRender) => (
    <>
      <SearchBox placeholder="Search here..." styles={searchboxStyles} ariaLabel="Sample search box. Does not actually search anything." />
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
        headerText="Panel with new header"
        onRenderNavigationContent={onRenderNavigationContent}
        isOpen={isOpen}
        onDismiss={dismissPanel}
        closeButtonAriaLabel="Close"
        useLegacyHeader={false}
      >
        <span>{explanation}</span>
      </Panel>
    </div>
  );
};
