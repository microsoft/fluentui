import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Panel, IPanelProps } from '@fluentui/react/lib/Panel';
import { IRenderFunction } from '@fluentui/react/lib/Utilities';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { useBoolean } from '@fluentui/react-hooks';

const explanation =
  'This panel has custom content in the navigation region (the part at the top which normally ' +
  'contains the close button). If the custom content replaces the close button, be sure to provide ' +
  'some other obvious way for users to close the panel.';
const searchboxStyles = { root: { margin: '5px', height: 'auto', width: '100%' } };

export const PanelNavigationExample: React.FunctionComponent = () => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);

  const onRenderNavigationContent: IRenderFunction<IPanelProps> = React.useCallback(
    (props, defaultRender) => (
      <>
        <SearchBox
          placeholder="Search here..."
          styles={searchboxStyles}
          ariaLabel="Sample search box. Does not actually search anything."
        />
        {
          // This custom navigation still renders the close button (defaultRender).
          // If you don't use defaultRender, be sure to provide some other way to close the panel.
          defaultRender!(props)
        }
      </>
    ),
    [],
  );

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
