import * as React from 'react';
import {
  TagPicker,
  TagPickerList,
  TagPickerInput,
  TagPickerControl,
  TagPickerProps,
  TagPickerOption,
  TagPickerGroup,
  makeStyles,
  tagPickerGroupClassNames,
  useOverflowCount,
  TagPickerInputProps,
  useTagPickerContext_unstable,
  useEventCallback,
  InteractionTagPrimary,
} from '@fluentui/react-components';
import { Tag, Avatar, Overflow, OverflowItem } from '@fluentui/react-components';
import { ChevronDownRegular, ChevronUpRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  focusedExpandIcon: { alignSelf: 'flex-end' },
  countButton: { minWidth: 0 },
  control: {
    flexWrap: 'nowrap',
    display: 'flex',
    flexGrow: 1,
    minWidth: 0,
    overflow: 'hidden',
    [`& > .${tagPickerGroupClassNames.root}`]: {
      flexWrap: 'nowrap',
    },
    ':focus-within': {
      flexWrap: 'wrap',
      [`& > .${tagPickerGroupClassNames.root}`]: {
        flexWrap: 'wrap',
      },
    },
  },
});

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

type ExpandIconProps = { open: boolean; focus: boolean };

const ExpandIcon = (props: ExpandIconProps) => {
  const overflowCount = useOverflowCount();

  const styles = useStyles();
  if (props.open) {
    return <ChevronUpRegular />;
  }
  if (overflowCount === 0 || props.focus) {
    return <ChevronDownRegular />;
  }
  return (
    <InteractionTagPrimary tabIndex={-1} className={styles.countButton}>
      +{overflowCount}
    </InteractionTagPrimary>
  );
};

type CustomTagPickerInputProps = TagPickerInputProps & { focus: boolean };

const CustomTagPickerInput = ({ focus, onMouseDown, placeholder, ...rest }: CustomTagPickerInputProps) => {
  const overflowCount = useOverflowCount();
  const selectedOptionsAmount = useTagPickerContext_unstable(ctx => ctx.selectedOptions.length);
  const handleMouseDown = useEventCallback((event: React.MouseEvent<HTMLInputElement>) => {
    onMouseDown?.(event);
    if (event.isDefaultPrevented()) {
      return;
    }
    if (overflowCount > 0 && focus) {
      return;
    }
    /**
     * usually a click event would be enough to open the tag picker,
     * but in this case we're changing the position of the input on focus,
     * and due to that position shift a click event will not be emitted
     * (to a click event to occur you need the mouse to be positioned on the element on mouse down and mouse up, which is not the case here as the element shifts on focus).
     * We have to emit a click event on our own.
     */
    event.currentTarget.click();
  });
  return (
    <TagPickerInput
      {...rest}
      onMouseDown={overflowCount > 0 ? handleMouseDown : undefined}
      placeholder={selectedOptionsAmount === 0 || (overflowCount > 0 && focus) ? placeholder : undefined}
    />
  );
};

export const SingleLine = () => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (e, data) => {
    setSelectedOptions(data.selectedOptions);
  };
  const tagPickerOptions = options.filter(option => !selectedOptions.includes(option));

  const [hasFocus, setFocus] = React.useState(false);

  const handleOpenChange: TagPickerProps['onOpenChange'] = (_, data) => setOpen(data.open);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = (event: React.FocusEvent) => {
    if (event.currentTarget.contains(event.relatedTarget as Node)) {
      return;
    }
    setFocus(false);
  };

  return (
    <TagPicker
      open={open}
      onOpenChange={handleOpenChange}
      onOptionSelect={onOptionSelect}
      selectedOptions={selectedOptions}
    >
      {/* 24 = min input size */}
      {/* 30 = padding right */}
      {/* 2 = gap between input and tags */}
      {/* 4 = gap between tags */}
      <Overflow minimumVisible={1} padding={24 + 30 + 2 + selectedOptions.length * 4}>
        <TagPickerControl
          style={{ maxWidth: 400 }}
          expandIcon={{
            className: hasFocus ? styles.focusedExpandIcon : undefined,
            children: <ExpandIcon focus={hasFocus} open={open} />,
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={styles.control}
        >
          <TagPickerGroup>
            {selectedOptions.map(option => (
              <OverflowItem id={option} key={option}>
                <Tag
                  // force style to display the tag even if it's overflowing when focused
                  style={hasFocus ? { display: 'inline-grid' } : undefined}
                  key={option}
                  shape="rounded"
                  media={<Avatar aria-hidden name={option} color="colorful" />}
                  value={option}
                >
                  {option}
                </Tag>
              </OverflowItem>
            ))}
          </TagPickerGroup>
          <CustomTagPickerInput focus={hasFocus} placeholder="Select Employees" aria-label="Select Employees" />
        </TagPickerControl>
      </Overflow>
      <TagPickerList>
        {tagPickerOptions.length > 0
          ? tagPickerOptions.map(option => (
              <TagPickerOption
                secondaryContent="Microsoft FTE"
                media={<Avatar shape="square" aria-hidden name={option} color="colorful" />}
                value={option}
                key={option}
              >
                {option}
              </TagPickerOption>
            ))
          : 'No options available'}
      </TagPickerList>
    </TagPicker>
  );
};
