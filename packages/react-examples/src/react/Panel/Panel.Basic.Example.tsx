import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Panel } from '@fluentui/react/lib/Panel';
import { useBoolean } from '@fluentui/react-hooks';

export const PanelBasicExample: React.FunctionComponent = () => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);

  return (
    <div>
      <DefaultButton text="Open panel" onClick={openPanel} />
      <Panel
        headerText="Sample panel"
        isOpen={isOpen}
        onDismiss={dismissPanel}
        // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
        closeButtonAriaLabel="Close"
        styles={{
          scrollableContent: {
            display: 'flex',
            flexDirection: 'column-reverse',
            gap: '20px',
          },
        }}
      >
        {Array(100)
          .fill(0)
          .map((_, index) => (
            <DefaultButton key={index}>{index}</DefaultButton>
          ))}
      </Panel>
    </div>
  );
};
