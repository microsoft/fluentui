import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
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
  TagProps,
  Tag,
  Avatar,
  Overflow,
  OverflowItem,
} from '@fluentui/react-components';
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

  if (props.open) {
    return <ChevronUpRegular />;
  }
  if (overflowCount === 0 || props.focus) {
    return <ChevronDownRegular />;
  }
  return null;
};

const OverFlowCountTag = (props: TagProps) => {
  const overflowCount = useOverflowCount();
  const styles = useStyles();
  if (overflowCount === 0) {
    return null;
  }
  return (
    <Tag
      as="span"
      role={undefined}
      dismissible={false}
      aria-hidden
      tabIndex={-1}
      {...props}
      className={styles.countButton}
    >
      +{overflowCount}
    </Tag>
  );
};

type CustomTagPickerInputProps = TagPickerInputProps & { focus: boolean };

const CustomTagPickerInput = React.forwardRef<HTMLInputElement, CustomTagPickerInputProps>(
  ({ focus, onMouseDown, placeholder, ...rest }, ref) => {
    const overflowCount = useOverflowCount();
    const selectedOptionsAmount = useTagPickerContext_unstable(ctx => ctx.selectedOptions.length);
    return (
      <TagPickerInput
        ref={ref}
        {...rest}
        placeholder={selectedOptionsAmount === 0 || (overflowCount > 0 && focus) ? placeholder : undefined}
      />
    );
  },
);

export const SingleLine = (): JSXElement => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
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

  const handleOverflowCountTagMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    inputRef.current?.focus();
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
            {!open && !hasFocus ? <OverFlowCountTag onMouseDown={handleOverflowCountTagMouseDown} /> : null}
          </TagPickerGroup>
          <CustomTagPickerInput
            ref={inputRef}
            focus={hasFocus}
            placeholder="Select Employees"
            aria-label="Select Employees"
          />
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
