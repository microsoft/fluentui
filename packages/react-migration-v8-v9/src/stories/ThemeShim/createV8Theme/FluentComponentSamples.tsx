/* eslint-disable prettier/prettier */
import { mergeStyles } from '@fluentui/merge-styles';
import { DefaultButton, IconButton, initializeIcons, PrimaryButton } from '@fluentui/react';
import { Checkbox } from '@fluentui/react';
import { ChoiceGroup } from '@fluentui/react';
import { CommandBar } from '@fluentui/react';
import { Dropdown } from '@fluentui/react';
import { Link } from '@fluentui/react';
import { Persona, PersonaPresence } from '@fluentui/react';
import { Pivot, PivotItem } from '@fluentui/react';
import { Slider } from '@fluentui/react';
import { Stack } from '@fluentui/react';
import { Text } from '@fluentui/react';
import { TextField } from '@fluentui/react';
import { Toggle } from '@fluentui/react';
import type { FunctionComponent } from 'react';
import * as React from 'react';

const mainPanelNumericalWidth = 1100;
const mainPanelWidth = `${mainPanelNumericalWidth}px`;
const mainPanelInnerContent = mergeStyles({
  marginRight: 'auto',
  marginLeft: 'auto',
  marginTop: '32px',
  marginBottom: '64px',
  width: mainPanelWidth,
});

/* eslint-disable no-console */

const columnSpace = 48;
const columns = 3;
const sampleColumn = mergeStyles({
  width: (mainPanelNumericalWidth - columnSpace * (columns - 1)) / columns,
});
const iconButtonStyles = mergeStyles({
  color: '#0078D4',
});

const commandBarItems = [
  {
    key: 'newItem',
    name: 'New',
    cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
    iconProps: {
      iconName: 'Add',
    },
    ariaLabel: 'New',
    subMenuProps: {
      items: [
        {
          key: 'emailMessage',
          name: 'Email message',
          iconProps: {
            iconName: 'Mail',
          },
          ['data-automation-id']: 'newEmailButton',
        },
        {
          key: 'calendarEvent',
          name: 'Calendar event',
          iconProps: {
            iconName: 'Calendar',
          },
        },
      ],
    },
  },
  {
    key: 'upload',
    name: 'Upload',
    iconProps: {
      iconName: 'Upload',
    },
    ['data-automation-id']: 'uploadButton',
  },
  {
    key: 'more',
    name: 'More',
    iconProps: {
      iconName: 'More',
    },
    onClick: () => console.log('More'),
  },
];

const commandBarFarItems = [
  {
    key: 'search',
    ariaLabel: 'Search',
    iconProps: {
      iconName: 'Search',
    },
    onClick: () => console.log('Search'),
  },
  {
    key: 'filter',
    name: 'Filter',
    ariaLabel: 'Filter',
    iconProps: {
      iconName: 'Filter',
    },
    iconOnly: true,
    onClick: () => console.log('Filter'),
  },
  {
    key: 'list',
    name: 'List',
    ariaLabel: 'List',
    iconProps: {
      iconName: 'List',
    },
    iconOnly: true,
    onClick: () => console.log('List'),
  },
];

export const FluentComponentSamples: FunctionComponent = () => {
  const [isContentDisabled, setIsContentDisabled] = React.useState<boolean>(false);

  initializeIcons();

  const _onToggleChange = () => {
    setIsContentDisabled(!isContentDisabled);
  };

  return (
    <div className={mainPanelInnerContent}>
      <Stack gap={32}>
        <CommandBar farItems={commandBarFarItems} items={commandBarItems} styles={{ root: { padding: 'unset' } }} />
        <Stack.Item className={sampleColumn} grow={1}>
          <Stack gap={32}>
            <Stack gap={20}>
              <Text variant="small">STORIES</Text>
              <Text variant="medium">
                Make a big impression with this clean, modern, and mobile-friendly site. Use it to communicate
                information to people inside or outisde your team. Share your ideas, results, and more in this visually
                compelling format.
              </Text>
              <Link disabled={isContentDisabled}>Learn more</Link>
            </Stack>
            <Persona
              text="Cameron Evans"
              secondaryText="Senior Researcher at Contoso"
              presence={PersonaPresence.online}
            />
          </Stack>
        </Stack.Item>
        <Stack.Item className={sampleColumn} grow={1}>
          <Stack gap={32}>
            <Dropdown
              selectedKey="content"
              label="Select one"
              options={[
                { key: 'content', text: 'Content' },
                { key: 'morecontent', text: 'More content' },
              ]}
              disabled={isContentDisabled}
            />
            <TextField disabled={isContentDisabled} label="Enter text here" placeholder="Placeholder" />
            <Stack horizontal gap={20}>
              <Stack gap={13} grow={1}>
                <Checkbox disabled={isContentDisabled} label="Option 1" />
                <Checkbox disabled={isContentDisabled} label="Option 2" defaultChecked />
                <Checkbox disabled={isContentDisabled} label="Option 3" defaultChecked />
              </Stack>
              <Stack gap={10} grow={1}>
                <ChoiceGroup
                  defaultSelectedKey="A"
                  options={[
                    { key: 'A', text: 'Option 1' },
                    { key: 'B', text: 'Option 2' },
                    { key: 'C', text: 'Option 3' },
                  ]}
                  disabled={isContentDisabled}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack.Item>
        <Stack.Item className={sampleColumn} grow={1}>
          <Stack gap={32}>
            <Slider disabled={isContentDisabled} max={11} />
            <Toggle
              onText="On"
              offText="Off"
              inlineLabel
              label="Toggle for disabled states"
              // eslint-disable-next-line @typescript-eslint/unbound-method
              onChange={_onToggleChange}
            />
            <Pivot>
              <PivotItem headerText="Home" />
              <PivotItem headerText="Pages" />
              <PivotItem headerText="Documents" />
              <PivotItem headerText="Activity" />
            </Pivot>
            <Stack horizontal gap={15}>
              <IconButton disabled={isContentDisabled} iconProps={{ iconName: 'Like' }} className={iconButtonStyles} />
              <IconButton
                disabled={isContentDisabled}
                iconProps={{ iconName: 'SingleBookmark' }}
                className={iconButtonStyles}
              />
              <IconButton disabled={isContentDisabled} iconProps={{ iconName: 'Sunny' }} className={iconButtonStyles} />
            </Stack>
            <Stack horizontal gap={10}>
              <PrimaryButton disabled={isContentDisabled} text="Primary button" />
              <DefaultButton disabled={isContentDisabled} text="Default button" />
            </Stack>
          </Stack>
        </Stack.Item>
      </Stack>
    </div>
  );
};
