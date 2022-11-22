// eslint-disable-next-line import/no-extraneous-dependencies
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

const mainPanelInnerContent = mergeStyles({
  padding: 16,
});

/* eslint-disable no-console */
const columnMinWidth = 270;

const wrapperDiv = mergeStyles({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const columnDiv = mergeStyles({
  maxWidth: columnMinWidth,
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
      <CommandBar farItems={commandBarFarItems} items={commandBarItems} styles={{ root: { padding: 'unset' } }} />
      <div className={wrapperDiv}>
        <div className={columnDiv}>
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
        </div>
        <div className={columnDiv}>
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
        </div>
        <div className={columnDiv}>
          <Stack gap={32}>
            <Slider disabled={isContentDisabled} max={11} />
            <Toggle
              onText="On"
              offText="Off"
              inlineLabel
              label="Toggle for disabled states"
              // eslint-disable-next-line @typescript-eslint/unbound-method, react/jsx-no-bind
              onChange={_onToggleChange}
            />
            <Pivot>
              <PivotItem headerText="Home" />
              <PivotItem headerText="Pages" />
              <PivotItem headerText="Documents" />
            </Pivot>
            <Stack horizontal gap={15}>
              <IconButton disabled={isContentDisabled} iconProps={{ iconName: 'Like' }} />
              <IconButton disabled={isContentDisabled} iconProps={{ iconName: 'SingleBookmark' }} />
              <IconButton disabled={isContentDisabled} iconProps={{ iconName: 'Sunny' }} />
            </Stack>
            <Stack horizontal gap={10}>
              <PrimaryButton disabled={isContentDisabled} text="Primary button" />
              <DefaultButton disabled={isContentDisabled} text="Default button" />
            </Stack>
          </Stack>
        </div>
      </div>
    </div>
  );
};
