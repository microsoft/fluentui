/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { ChoiceGroup } from '@fluentui/react/lib/ChoiceGroup';
import { CommandBar } from '@fluentui/react/lib/CommandBar';
import { DefaultButton, PrimaryButton, IconButton } from '@fluentui/react/lib/Button';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { Icon } from '@fluentui/react/lib/Icon';
import { Link } from '@fluentui/react/lib/Link';
import { mergeStyles } from '@fluentui/react';
import { Persona, PersonaPresence } from '@fluentui/react/lib/Persona';
import { Pivot, PivotItem } from '@fluentui/react/lib/Pivot';
import { Slider } from '@fluentui/react/lib/Slider';
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { TextField } from '@fluentui/react/lib/TextField';
import { Toggle } from '@fluentui/react/lib/Toggle';

export interface ISamplesProps {
  backgroundColor: string;
  textColor: string;
}

export interface ISamplesState {
  learnMoreLinkDisabled: boolean;
  selectOneDropdownDisabled: boolean;
  textFieldDisabled: boolean;
  checkboxOneDisabled: boolean;
  checkboxTwoDisabled: boolean;
  checkboxThreeDisabled: boolean;
  choicegroupDisabled: boolean;
  sliderDisabled: boolean;
  likeIconButtonDisabled: boolean;
  bookmarkIconButtonDisabled: boolean;
  sunnyIconButtonDisabled: boolean;
  primaryButtonDisabled: boolean;
  defaultButtonDisabled: boolean;
}

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
    onClick: () => console.log('Upload'),
    ['data-automation-id']: 'uploadButton',
  },
  {
    key: 'share',
    name: 'Share',
    iconProps: {
      iconName: 'Share',
    },
    onClick: () => console.log('Share'),
  },
  {
    key: 'download',
    name: 'Download',
    iconProps: {
      iconName: 'Download',
    },
    onClick: () => console.log('Download'),
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

const layoutStyles = {
  root: mergeStyles({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: 'auto',
    gridColumnGap: '32px',
    gridRowGap: '32px',
    padding: '16px',
  }),
  commandBar: mergeStyles({
    gridColumnStart: '1',
    gridColumnEnd: '4',
  }),
};

const stackXXXLGap: IStackTokens = { childrenGap: 32 };
const stackXLGap: IStackTokens = { childrenGap: 20 };
const stackLGap: IStackTokens = { childrenGap: 16 };
const stackMNudgeGap: IStackTokens = { childrenGap: 10 };

const checkboxStackTokens: IStackTokens = {
  childrenGap: 13,
};

export class ThemePreviewV8 extends React.Component<ISamplesProps, ISamplesState> {
  constructor(props: ISamplesProps) {
    super(props);
    this.state = {
      learnMoreLinkDisabled: false,
      selectOneDropdownDisabled: false,
      textFieldDisabled: false,
      checkboxOneDisabled: false,
      checkboxTwoDisabled: false,
      checkboxThreeDisabled: false,
      choicegroupDisabled: false,
      sliderDisabled: false,
      likeIconButtonDisabled: false,
      bookmarkIconButtonDisabled: false,
      sunnyIconButtonDisabled: false,
      primaryButtonDisabled: false,
      defaultButtonDisabled: false,
    };
    this._onToggleChange = this._onToggleChange.bind(this);
  }
  public render() {
    return (
      <div style={{ backgroundColor: this.props.backgroundColor, color: this.props.textColor }}>
        <div className={layoutStyles.root}>
          <div className={layoutStyles.commandBar}>
            <CommandBar farItems={commandBarFarItems} items={commandBarItems} />
          </div>
          <div>
            <Stack tokens={stackXXXLGap}>
              <Stack tokens={stackXLGap}>
                <Text variant="small" styles={{ root: { color: this.props.textColor } }}>
                  STORIES
                </Text>
                <Text variant="xxLarge" styles={{ root: { color: this.props.textColor, lineHeight: '1em' } }}>
                  Make an impression
                </Text>
                <Text variant="medium" styles={{ root: { color: this.props.textColor } }}>
                  Make a big impression with this clean, modern, and mobile-friendly site. Use it to communicate
                  information to people inside or outisde your team. Share your ideas, results, and more in this
                  visually compelling format.
                </Text>
                <Link disabled={this.state.learnMoreLinkDisabled}>
                  Learn more <Icon iconName="ChevronRight" />
                </Link>
              </Stack>
              <Persona
                text="Cameron Evans"
                secondaryText="Senior Researcher at Contoso"
                presence={PersonaPresence.online}
              />
            </Stack>
          </div>
          <div>
            <Stack tokens={stackXXXLGap}>
              <Dropdown
                selectedKey="content"
                label="Select one"
                options={[
                  { key: 'content', text: 'Content' },
                  { key: 'morecontent', text: 'More content' },
                ]}
                disabled={this.state.selectOneDropdownDisabled}
              />
              <TextField disabled={this.state.textFieldDisabled} label="Enter text here" placeholder="Placeholder" />
              <Stack horizontal tokens={stackXLGap}>
                <Stack tokens={checkboxStackTokens} grow={1}>
                  <div />
                  <Checkbox disabled={this.state.checkboxOneDisabled} label="Option 1" />
                  <Checkbox disabled={this.state.checkboxTwoDisabled} label="Option 2" defaultChecked />
                  <Checkbox disabled={this.state.checkboxThreeDisabled} label="Option 3" defaultChecked />
                </Stack>
                <Stack tokens={stackMNudgeGap} grow={1}>
                  <ChoiceGroup
                    defaultSelectedKey="A"
                    options={[
                      { key: 'A', text: 'Option 1' },
                      { key: 'B', text: 'Option 2' },
                      { key: 'C', text: 'Option 3' },
                    ]}
                    disabled={this.state.choicegroupDisabled}
                  />
                </Stack>
              </Stack>
            </Stack>
          </div>
          <div>
            <Stack tokens={stackXXXLGap}>
              <Slider disabled={this.state.sliderDisabled} max={11} />
              <Toggle
                onText="On"
                offText="Off"
                inlineLabel
                label="Toggle for disabled states"
                onChange={this._onToggleChange}
              />
              <Pivot>
                <PivotItem headerText="Home" />
                <PivotItem headerText="Pages" />
                <PivotItem headerText="Documents" />
                <PivotItem headerText="Activity" />
              </Pivot>
              <Stack horizontal tokens={stackLGap}>
                <IconButton
                  disabled={this.state.likeIconButtonDisabled}
                  iconProps={{ iconName: 'Like' }}
                  className={iconButtonStyles}
                />
                <IconButton
                  disabled={this.state.bookmarkIconButtonDisabled}
                  iconProps={{ iconName: 'SingleBookmark' }}
                  className={iconButtonStyles}
                />
                <IconButton
                  disabled={this.state.sunnyIconButtonDisabled}
                  iconProps={{ iconName: 'Sunny' }}
                  className={iconButtonStyles}
                />
              </Stack>
              <Stack horizontal tokens={stackMNudgeGap}>
                <PrimaryButton disabled={this.state.primaryButtonDisabled} text="Primary button" />
                <DefaultButton disabled={this.state.defaultButtonDisabled} text="Default button" />
              </Stack>
            </Stack>
          </div>
        </div>
      </div>
    );
  }

  private _onToggleChange() {
    this.setState({
      learnMoreLinkDisabled: !this.state.learnMoreLinkDisabled,
      selectOneDropdownDisabled: !this.state.selectOneDropdownDisabled,
      textFieldDisabled: !this.state.textFieldDisabled,
      checkboxOneDisabled: !this.state.checkboxOneDisabled,
      checkboxTwoDisabled: !this.state.checkboxTwoDisabled,
      checkboxThreeDisabled: !this.state.checkboxThreeDisabled,
      sliderDisabled: !this.state.sliderDisabled,
      likeIconButtonDisabled: !this.state.likeIconButtonDisabled,
      bookmarkIconButtonDisabled: !this.state.bookmarkIconButtonDisabled,
      sunnyIconButtonDisabled: !this.state.sunnyIconButtonDisabled,
      primaryButtonDisabled: !this.state.primaryButtonDisabled,
      defaultButtonDisabled: !this.state.defaultButtonDisabled,
    });
  }
}
