import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { useConstCallback } from '@uifabric/react-hooks';

// The panel type and description are passed in by the PanelSizesExample component (later in this file)
const PanelExample: React.FunctionComponent<{ panelType: PanelType; description: string }> = props => {
  const { description, panelType } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  const openPanel = useConstCallback(() => setIsOpen(true));
  const dismissPanel = useConstCallback(() => setIsOpen(false));

  const a = 'aeiou'.indexOf(description[0]) === -1 ? 'a' : 'an'; // grammar...

  return (
    <div>
      <DefaultButton text="Open panel" onClick={openPanel} />
      <Panel
        isOpen={isOpen}
        onDismiss={dismissPanel}
        type={panelType}
        customWidth={panelType === PanelType.custom || panelType === PanelType.customNear ? '888px' : undefined}
        closeButtonAriaLabel="Close"
        headerText="Sample panel"
      >
        <p>
          This is {a} <strong>{description}</strong> panel{panelType === PanelType.smallFixedFar ? ' (the default size)' : ''}.
        </p>
        <p>
          Select this size using <code>{`type={PanelType.${PanelType[panelType]}}`}</code>.
        </p>
      </Panel>
    </div>
  );
};

const options: IDropdownOption[] = [
  { text: 'Small (default)', key: String(PanelType.smallFixedFar) },
  { text: 'Small, near side', key: String(PanelType.smallFixedNear) },
  { text: 'Medium', key: String(PanelType.medium) },
  { text: 'Large', key: String(PanelType.large) },
  { text: 'Large fixed-width', key: String(PanelType.largeFixed) },
  { text: 'Extra large', key: String(PanelType.extraLarge) },
  { text: 'Full-width (fluid)', key: String(PanelType.smallFluid) },
  { text: 'Custom (example: 888px)', key: String(PanelType.custom) },
  { text: 'Custom (example: 888px), near side', key: String(PanelType.customNear) }
];
const dropdownStyles = { root: { maxWidth: 250, marginBottom: 16 } };
const firstPStyle = { marginTop: 0 };

export const PanelSizesExample: React.FunctionComponent = () => {
  const [option, setOption] = React.useState<IDropdownOption>(options[0]);
  const updateOption = useConstCallback((ev: any, opt: IDropdownOption) => setOption(opt));

  const description = option.text.toLowerCase().replace(' (default)', '');
  return (
    <div>
      <p style={firstPStyle}>
        See the <Link href="https://developer.microsoft.com/en-us/fabric#/controls/web/panel#PanelType">PanelType documentation</Link> for
        details on how each option affects panel sizing at different screen widths.
      </p>
      <p>All panels are anchored to the far side of the screen (right in LTR, left in RTL) unless otherwise specified.</p>
      <Dropdown label="Choose a panel size:" options={options} selectedKey={option.key} onChange={updateOption} styles={dropdownStyles} />
      <PanelExample panelType={Number(option.key)} description={description} />
    </div>
  );
};
