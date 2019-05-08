import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { DefaultButton, PrimaryButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { MainPanelInnerContent, MainPanelNumericalWidth } from '../../shared/MainPanelStyles';
import { mergeStyles } from '@uifabric/merge-styles/lib/mergeStyles';
import { Persona, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

export interface ISamplesProps {
  backgroundColor: string;
}

const columnSpace = 48;
const columns = 3;
const sampleColumn = mergeStyles({
  width: (MainPanelNumericalWidth - columnSpace * (columns - 1)) / columns
});

const commandBarItems = [
  {
    key: 'newItem',
    name: 'New',
    cacheKey: 'myCacheKey', // changing this key will invalidate this items cache
    iconProps: {
      iconName: 'Add'
    },
    ariaLabel: 'New',
    subMenuProps: {
      items: [
        {
          key: 'emailMessage',
          name: 'Email message',
          iconProps: {
            iconName: 'Mail'
          },
          ['data-automation-id']: 'newEmailButton'
        },
        {
          key: 'calendarEvent',
          name: 'Calendar event',
          iconProps: {
            iconName: 'Calendar'
          }
        }
      ]
    }
  },
  {
    key: 'upload',
    name: 'Upload',
    iconProps: {
      iconName: 'Upload'
    },
    href: 'https://dev.office.com/fabric',
    ['data-automation-id']: 'uploadButton'
  },
  {
    key: 'share',
    name: 'Share',
    iconProps: {
      iconName: 'Share'
    },
    onClick: () => console.log('Share')
  },
  {
    key: 'download',
    name: 'Download',
    iconProps: {
      iconName: 'Download'
    },
    onClick: () => console.log('Download')
  }
];

const commandBarFarItems = [
  {
    key: 'sort',
    name: 'Sort',
    ariaLabel: 'Sort',
    iconProps: {
      iconName: 'SortLines'
    },
    onClick: () => console.log('Sort')
  },
  {
    key: 'tile',
    name: 'Grid view',
    ariaLabel: 'Grid view',
    iconProps: {
      iconName: 'Tiles'
    },
    iconOnly: true,
    onClick: () => console.log('Tiles')
  },
  {
    key: 'info',
    name: 'Info',
    ariaLabel: 'Info',
    iconProps: {
      iconName: 'Info'
    },
    iconOnly: true,
    onClick: () => console.log('Info')
  }
];

export class Samples extends React.Component<ISamplesProps, {}> {
  public render() {
    return (
      <div style={{ backgroundColor: this.props.backgroundColor }}>
        <div className={MainPanelInnerContent}>
          <Stack gap={32}>
            <CommandBar farItems={commandBarFarItems} items={commandBarItems} />
            <Stack horizontal gap={columnSpace}>
              <Stack.Item className={sampleColumn} grow={1}>
                <Stack gap={32}>
                  <Stack gap={20}>
                    <Text variant="small">STORIES</Text>
                    <Text variant="xxLarge">Make an impression</Text>
                    <Text variant="medium">
                      Make a big impression with this clean, modern, and mobile-friendly site. Use it to communicate information to people
                      inside or outisde your team. Share your ideas, results, and more in this visually compelling format.
                    </Text>
                    <Link>
                      Learn more <Icon iconName="ChevronRight" />
                    </Link>
                  </Stack>
                  <Stack horizontal gap={20}>
                    <IconButton iconProps={{ iconName: 'SingleBookmark' }} />
                    <IconButton iconProps={{ iconName: 'Sunny' }} />
                  </Stack>
                  <Persona text="Cameron Evans" secondaryText="Senior Researcher at Contoso" presence={PersonaPresence.online} />
                </Stack>
              </Stack.Item>
              <Stack.Item className={sampleColumn} grow={1}>
                <Stack gap={32}>
                  <Dropdown
                    selectedKey="content"
                    label="Select one"
                    options={[{ key: 'content', text: 'Content' }, { key: 'morecontent', text: 'More content' }]}
                  />
                  <TextField label="Enter text here" placeholder="Placeholder" />
                  <Stack horizontal gap={20}>
                    <Stack gap={13} grow={1}>
                      <div />
                      <Checkbox label="Option 1" />
                      <Checkbox label="Option 2" defaultChecked />
                      <Checkbox label="Option 3" defaultChecked />
                    </Stack>
                    <Stack gap={10} grow={1}>
                      <ChoiceGroup
                        defaultSelectedKey="A"
                        options={[
                          {
                            key: 'A',
                            text: 'Option 1'
                          } as IChoiceGroupOption,
                          {
                            key: 'B',
                            text: 'Option 2'
                          },
                          {
                            key: 'C',
                            text: 'Option 3'
                          }
                        ]}
                      />
                    </Stack>
                  </Stack>
                  <Stack horizontal gap={10}>
                    <PrimaryButton text="Primary button" />
                    <DefaultButton text="Default button" />
                  </Stack>
                </Stack>
              </Stack.Item>
              <Stack.Item className={sampleColumn} grow={1}>
                <Stack gap={32}>
                  <Slider max={11} />
                  <Toggle onText="On" offText="Off" inlineLabel label="Toggle for disabled statest" onChange={this._onChange} />
                  <Pivot>
                    <PivotItem headerText="Home" />
                    <PivotItem headerText="Pages" />
                    <PivotItem headerText="Documents" />
                    <PivotItem headerText="Activity" />
                  </Pivot>
                </Stack>
              </Stack.Item>
            </Stack>
          </Stack>
        </div>
      </div>
    );
  }

  private _onChange(ev: React.MouseEvent<HTMLElement>, checked?: boolean) {
    console.log('hello world');
    // commandBarItems.push(disabled: {false});
  }
}
