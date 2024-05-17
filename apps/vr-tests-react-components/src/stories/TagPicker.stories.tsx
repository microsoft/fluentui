import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import {
  TagPicker,
  TagPickerControl,
  TagPickerGroup,
  TagPickerInput,
  TagPickerList,
  TagPickerOption,
  TagPickerOptionGroup,
  TagPickerProps,
} from '@fluentui/react-tag-picker';
import { Tag } from '@fluentui/react-tags';
import { Avatar } from '@fluentui/react-avatar';
import { DARK_MODE, HIGH_CONTRAST, RTL, getStoryVariant } from '../utilities/getStoryVariant';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { Steps, StoryWright } from 'storywright';
import { ArrowDownFilled } from '@fluentui/react-icons';
import { Button } from '@fluentui/react-button';

export default {
  title: 'TagPicker',
} as ComponentMeta<typeof TagPicker>;

const options = [
  'John Doe',
  'Jane Doe',
  'Max Mustermann',
  'Erika Mustermann',
  'Pierre Dupont',
  'Amelie Dupont',
  'Mario Rossi',
  'Maria Rossi',
];

export const Default = (props: Pick<TagPickerProps, 'appearance' | 'size'>) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (e, data) => {
    setSelectedOptions(data.selectedOptions);
  };

  return (
    <div style={{ maxWidth: 400, padding: 20 }}>
      <TagPicker {...props} onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <TagPickerControl>
          <TagPickerGroup>
            {selectedOptions.map(option => (
              <Tag
                key={option}
                shape="rounded"
                media={<Avatar aria-hidden name={option} color="colorful" />}
                value={option}
              >
                {option}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput aria-label="Select Employees" />
        </TagPickerControl>
        <TagPickerList>
          {options
            .filter(option => !selectedOptions.includes(option))
            .map(option => (
              <TagPickerOption
                secondaryContent="Microsoft FTE"
                media={<Avatar aria-hidden name={option} color="colorful" />}
                value={option}
                key={option}
              >
                {option}
              </TagPickerOption>
            ))}
        </TagPickerList>
      </TagPicker>
    </div>
  );
};

Default.storyName = 'default';
export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);
export const DefaultHighContrast = getStoryVariant(Default, HIGH_CONTRAST);
export const DefaultRTL = getStoryVariant(Default, RTL);

export const DefaultOpen = () => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (e, data) => {
    setSelectedOptions(data.selectedOptions);
  };

  return (
    <StoryWright
      steps={new Steps()
        .hover('#tag-picker-option-1')
        .snapshot('default open option hover')
        .mouseDown('#tag-picker-option-1')
        .snapshot('default open option mouse down')}
    >
      <div style={{ maxWidth: 400 }}>
        <TagPicker defaultOpen onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
          <TagPickerControl>
            <TagPickerGroup>
              {selectedOptions.map(option => (
                <Tag
                  key={option}
                  shape="rounded"
                  media={<Avatar aria-hidden name={option} color="colorful" />}
                  value={option}
                >
                  {option}
                </Tag>
              ))}
            </TagPickerGroup>
            <TagPickerInput aria-label="Select Employees" />
          </TagPickerControl>
          <TagPickerList>
            {options
              .filter(option => !selectedOptions.includes(option))
              .map((option, index) => (
                <TagPickerOption
                  id={`tag-picker-option-${index}`}
                  secondaryContent="Microsoft FTE"
                  media={<Avatar aria-hidden name={option} color="colorful" />}
                  value={option}
                  key={option}
                >
                  {option}
                </TagPickerOption>
              ))}
          </TagPickerList>
        </TagPicker>
      </div>
    </StoryWright>
  );
};

DefaultOpen.storyName = 'default open';
export const DefaultOpenDarkMode = getStoryVariant(DefaultOpen, DARK_MODE);
export const DefaultOpenHighContrast = getStoryVariant(DefaultOpen, HIGH_CONTRAST);
export const DefaultOpenRTL = getStoryVariant(DefaultOpen, RTL);

const useStyles = makeStyles({
  padding: {
    ...shorthands.padding('20px'),
  },
  darkBG: {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    color: tokens.colorNeutralForegroundInverted2,
    ...shorthands.marginBlock('10px'),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
});

export const Appearance = () => {
  const styles = useStyles();
  return (
    <>
      <div className={styles.padding}>
        <h1>Outline</h1>
        <Default appearance="outline" />
      </div>
      <div className={styles.padding}>
        <h1>Underline</h1>
        <Default appearance="underline" />
      </div>
      <div className={mergeClasses(styles.darkBG, styles.padding)}>
        <h1>Filled Darker</h1>
        <Default appearance="filled-darker" />
      </div>
      <div className={mergeClasses(styles.darkBG, styles.padding)}>
        <h1>Filled Lighter</h1>
        <Default appearance="filled-lighter" />
      </div>
    </>
  );
};

Appearance.storyName = 'appearance';
export const AppearanceDarkMode = getStoryVariant(Appearance, DARK_MODE);
export const AppearanceHighContrast = getStoryVariant(Appearance, HIGH_CONTRAST);
export const AppearanceRTL = getStoryVariant(Appearance, RTL);

export const Size = () => (
  <>
    <div>
      <h4>Extra Large</h4>
      <Default size="extra-large" />
    </div>
    <div>
      <h4>Large</h4>
      <Default size="large" />
    </div>
    <div>
      <h4>Medium</h4>
      <Default size="medium" />
    </div>
  </>
);
Size.storyName = 'size';
export const SizeDarkMode = getStoryVariant(Size, DARK_MODE);
export const SizeHighContrast = getStoryVariant(Size, HIGH_CONTRAST);
export const SizeRTL = getStoryVariant(Size, RTL);

export const Disabled = () => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([
    options[0],
    options[1],
    options[2],
    options[3],
  ]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (e, data) => {
    setSelectedOptions(data.selectedOptions);
  };

  return (
    <StoryWright steps={new Steps().hover('#tag-picker-input').snapshot('disabled input hover')}>
      <div style={{ maxWidth: 400 }}>
        <TagPicker disabled onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
          <TagPickerControl>
            <TagPickerGroup>
              {selectedOptions.map(option => (
                <Tag
                  key={option}
                  shape="rounded"
                  media={<Avatar aria-hidden name={option} color="colorful" />}
                  value={option}
                >
                  {option}
                </Tag>
              ))}
            </TagPickerGroup>
            <TagPickerInput id="tag-picker-input" aria-label="Select Employees" />
          </TagPickerControl>
          <TagPickerList>
            {options
              .filter(option => !selectedOptions.includes(option))
              .map(option => (
                <TagPickerOption
                  secondaryContent="Microsoft FTE"
                  media={<Avatar aria-hidden name={option} color="colorful" />}
                  value={option}
                  key={option}
                >
                  {option}
                </TagPickerOption>
              ))}
          </TagPickerList>
        </TagPicker>
      </div>
    </StoryWright>
  );
};
Disabled.storyName = 'disabled';
export const DisabledDarkMode = getStoryVariant(Disabled, DARK_MODE);
export const DisabledHighContrast = getStoryVariant(Disabled, HIGH_CONTRAST);
export const DisabledRTL = getStoryVariant(Disabled, RTL);

export const ExpandIcon = () => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([options[0]]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (event, data) => {
    setSelectedOptions(data.selectedOptions);
  };

  return (
    <div style={{ maxWidth: 400 }}>
      <TagPicker onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <TagPickerControl expandIcon={<ArrowDownFilled />}>
          <TagPickerGroup>
            {selectedOptions.map(option => (
              <Tag
                key={option}
                shape="rounded"
                media={<Avatar aria-hidden name={option} color="colorful" />}
                value={option}
              >
                {option}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput aria-label="Select Employees" />
        </TagPickerControl>
        <TagPickerList>
          {options
            .filter(option => !selectedOptions.includes(option))
            .map(option => (
              <TagPickerOption
                secondaryContent="Microsoft FTE"
                media={<Avatar aria-hidden name={option} color="colorful" />}
                value={option}
                key={option}
              >
                {option}
              </TagPickerOption>
            ))}
        </TagPickerList>
      </TagPicker>
    </div>
  );
};
ExpandIcon.storyName = 'expand icon';
export const ExpandIconDarkMode = getStoryVariant(ExpandIcon, DARK_MODE);
export const ExpandIconHighContrast = getStoryVariant(ExpandIcon, HIGH_CONTRAST);
export const ExpandIconRTL = getStoryVariant(ExpandIcon, RTL);

const managers = ['John Doe', 'Jane Doe', 'Max Mustermann', 'Erika Mustermann'];
const devs = ['Pierre Dupont', 'Amelie Dupont', 'Mario Rossi', 'Maria Rossi'];

export const Grouped = () => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (e, data) => {
    setSelectedOptions(data.selectedOptions);
  };
  const unSelectedManagers = managers.filter(option => !selectedOptions.includes(option));
  const unSelectedDevs = devs.filter(option => !selectedOptions.includes(option));

  return (
    <div style={{ maxWidth: 400 }}>
      <TagPicker defaultOpen onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <TagPickerControl>
          <TagPickerGroup>
            {selectedOptions.map(option => (
              <Tag
                key={option}
                shape="rounded"
                media={<Avatar aria-hidden name={option} color="colorful" />}
                value={option}
              >
                {option}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput />
        </TagPickerControl>
        <TagPickerList>
          {unSelectedManagers.length > 0 && (
            <TagPickerOptionGroup label="Managers">
              {unSelectedManagers.map(option => (
                <TagPickerOption
                  secondaryContent="Microsoft FTE"
                  media={<Avatar aria-hidden name={option} color="colorful" />}
                  value={option}
                  key={option}
                >
                  {option}
                </TagPickerOption>
              ))}
            </TagPickerOptionGroup>
          )}
          {unSelectedDevs.length > 0 && (
            <TagPickerOptionGroup label="Devs">
              {unSelectedDevs.map(option => (
                <TagPickerOption
                  secondaryContent="Microsoft FTE"
                  media={<Avatar aria-hidden name={option} color="colorful" />}
                  value={option}
                  key={option}
                >
                  {option}
                </TagPickerOption>
              ))}
            </TagPickerOptionGroup>
          )}
        </TagPickerList>
      </TagPicker>
    </div>
  );
};
Grouped.storyName = 'grouped';
export const GroupedDarkMode = getStoryVariant(Grouped, DARK_MODE);
export const GroupedHighContrast = getStoryVariant(Grouped, HIGH_CONTRAST);
export const GroupedRTL = getStoryVariant(Grouped, RTL);

export const SecondaryAction = () => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([options[0]]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (event, data) => {
    setSelectedOptions(data.selectedOptions);
  };
  const handleAllClear: React.MouseEventHandler = event => {
    setSelectedOptions([]);
  };

  return (
    <div style={{ maxWidth: 400 }}>
      <TagPicker onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <TagPickerControl
          secondaryAction={
            <Button appearance="transparent" size="small" shape="rounded" onClick={handleAllClear}>
              All Clear
            </Button>
          }
        >
          <TagPickerGroup>
            {selectedOptions.map(option => (
              <Tag
                key={option}
                shape="rounded"
                media={<Avatar aria-hidden name={option} color="colorful" />}
                value={option}
              >
                {option}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput />
        </TagPickerControl>
        <TagPickerList>
          {options
            .filter(option => !selectedOptions.includes(option))
            .map(option => (
              <TagPickerOption
                secondaryContent="Microsoft FTE"
                media={<Avatar aria-hidden name={option} color="colorful" />}
                value={option}
                key={option}
              >
                {option}
              </TagPickerOption>
            ))}
        </TagPickerList>
      </TagPicker>
    </div>
  );
};
SecondaryAction.storyName = 'secondary action';
export const SecondaryActionDarkMode = getStoryVariant(SecondaryAction, DARK_MODE);
export const SecondaryActionHighContrast = getStoryVariant(SecondaryAction, HIGH_CONTRAST);
export const SecondaryActionRTL = getStoryVariant(SecondaryAction, RTL);
