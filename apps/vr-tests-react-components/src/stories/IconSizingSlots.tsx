import * as React from 'react';
import { makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { Input } from '@fluentui/react-input';
import { SearchBox } from '@fluentui/react-search';
import { Combobox, Dropdown, Listbox, Option } from '@fluentui/react-combobox';
import { Select } from '@fluentui/react-select';
import { TagPicker, TagPickerControl, TagPickerInput, TagPickerList } from '@fluentui/react-tag-picker';
import { PresenceBadge, type PresenceBadgeStatus } from '@fluentui/react-badge';
import { Rating, RatingDisplay, RatingItem } from '@fluentui/react-rating';
import { FluentProvider } from '@fluentui/react-provider';
import { SearchRegular } from '@fluentui/react-icons';

export type IconSlotContent = 'default' | 'icon' | 'italic' | 'mixed' | 'svg';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalM,
    fontSize: tokens.fontSizeBase200,
  },
  row: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalXS,
  },
  references: {
    display: 'flex',
  },
  reference: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexBasis: 0,
    flexGrow: 1,
    minWidth: 0,
  },
});

const PlainText = () => (
  <>
    <i data-plain-text="">hello</i>
    <span data-text-reference="">hello</span>
  </>
);

const CustomSvg = () => (
  <svg data-custom-svg="" width="1em" height="1em" viewBox="0 0 20 20" aria-hidden="true">
    <path fill="currentColor" d="M2 2h16v16H2z" />
  </svg>
);

const MixedContent = () => (
  <span data-mixed-wrapper="">
    <PlainText />
    <SearchRegular />
  </span>
);

const slotContentComponents = {
  icon: SearchRegular,
  italic: PlainText,
  mixed: MixedContent,
  svg: CustomSvg,
};

const SlotCase = ({
  name,
  selector,
  slots = 1,
  count = 1,
  pixels,
  block = false,
  children,
}: {
  name: string;
  selector: string;
  slots?: number;
  count?: number;
  pixels?: number;
  block?: boolean;
  children: React.ReactNode;
}) => {
  const styles = useStyles();
  return (
    <div
      className={styles.row}
      data-slot-case={name}
      data-slot-selector={selector}
      data-slot-count={slots}
      data-slot-icon-count={count}
      data-slot-icon-size={pixels}
      data-slot-icon-block={block}
    >
      <span>{name}</span>
      {children}
    </div>
  );
};

export const IconSlotExamples = ({ kind }: { kind: IconSlotContent }) => {
  const styles = useStyles();
  const Icon = kind === 'default' ? undefined : slotContentComponents[kind];
  const content = Icon ? <Icon /> : undefined;
  const count = kind === 'italic' ? 0 : 1;
  const direct = kind !== 'mixed' && kind !== 'italic';

  return (
    <div className={styles.root} data-slot-content={kind}>
      {(['small', 'medium', 'large'] as const).map((size, index) => {
        const pixels = [16, 20, 24][index];
        return (
          <React.Fragment key={size}>
            {kind !== 'default' && (
              <SlotCase
                name={`Input.${size}.contentBefore/contentAfter`}
                selector=".fui-Input__contentBefore, .fui-Input__contentAfter"
                slots={2}
                count={count}
                pixels={direct ? pixels : undefined}
              >
                <Input size={size} contentBefore={content} contentAfter={content} aria-label={`Input ${size}`} />
              </SlotCase>
            )}
            <SlotCase
              name={`SearchBox.${size}.contentBefore/dismiss`}
              selector=".fui-SearchBox__contentBefore, .fui-SearchBox__dismiss"
              slots={2}
              count={count}
              pixels={direct ? pixels : undefined}
            >
              <SearchBox
                size={size}
                defaultValue="Search"
                contentBefore={content}
                dismiss={content}
                aria-label={`Search ${size}`}
              />
            </SlotCase>
            {kind !== 'default' && (
              <SlotCase
                name={`SearchBox.${size}.contentAfter`}
                selector=".fui-SearchBox__contentAfter"
                count={count}
                pixels={direct ? pixels : undefined}
              >
                <SearchBox size={size} contentAfter={content} dismiss={null} aria-label={`Search adornment ${size}`} />
              </SlotCase>
            )}
            <SlotCase
              name={`Combobox.${size}.expandIcon`}
              selector=".fui-Combobox__expandIcon"
              count={count}
              pixels={pixels}
              block
            >
              <Combobox size={size} expandIcon={content} aria-label={`Combobox ${size}`} />
            </SlotCase>
            <SlotCase
              name={`Combobox.${size}.clearIcon`}
              selector=".fui-Combobox__clearIcon"
              count={count}
              pixels={pixels}
              block
            >
              <Combobox
                size={size}
                clearable
                defaultSelectedOptions={['option']}
                defaultValue="Option"
                clearIcon={content}
                aria-label={`Clearable combobox ${size}`}
              />
            </SlotCase>
            <SlotCase
              name={`Dropdown.${size}.expandIcon`}
              selector=".fui-Dropdown__expandIcon"
              count={count}
              pixels={pixels}
              block
            >
              <Dropdown size={size} expandIcon={content} aria-label={`Dropdown ${size}`} />
            </SlotCase>
            <SlotCase
              name={`Dropdown.${size}.clearButton`}
              selector=".fui-Dropdown__clearButton"
              count={count}
              pixels={pixels}
              block
            >
              <Dropdown
                size={size}
                clearable
                defaultSelectedOptions={['option']}
                defaultValue="Option"
                clearButton={content}
                aria-label={`Clearable dropdown ${size}`}
              />
            </SlotCase>
            <SlotCase name={`Select.${size}.icon`} selector=".fui-Select__icon" count={count} pixels={pixels} block>
              <Select size={size} icon={content} aria-label={`Select ${size}`}>
                <option>Option</option>
              </Select>
            </SlotCase>
          </React.Fragment>
        );
      })}
      <SlotCase name="Option.checkIcon" selector=".fui-Option__checkIcon" count={count} block>
        <Listbox defaultSelectedOptions={['option']} aria-label="Selected option">
          <Option value="option" checkIcon={content}>
            Option
          </Option>
        </Listbox>
      </SlotCase>
      {(['medium', 'large', 'extra-large'] as const).map((size, index) => (
        <SlotCase
          key={size}
          name={`TagPickerControl.${size}.expandIcon`}
          selector=".fui-TagPickerControl__expandIcon"
          count={count}
          pixels={[16, 20, 24][index]}
          block
        >
          <TagPicker size={size}>
            <TagPickerControl expandIcon={content}>
              <TagPickerInput aria-label={`Tag picker ${size}`} />
            </TagPickerControl>
            <TagPickerList />
          </TagPicker>
        </SlotCase>
      ))}
      {(['tiny', 'extra-small', 'small', 'medium', 'large', 'extra-large'] as const).map((size, index) => (
        <React.Fragment key={size}>
          <SlotCase
            name={`PresenceBadge.${size}.icon`}
            selector=".fui-PresenceBadge__icon"
            count={count}
            pixels={
              kind === 'default' || size === 'tiny' || size === 'large' || size === 'extra-large'
                ? [6, 10, 12, 16, 20, 28][index]
                : undefined
            }
          >
            <PresenceBadge size={size} icon={content} />
          </SlotCase>
          {(kind === 'italic' || kind === 'mixed') && (
            <SlotCase name={`PresenceBadge.${size}.root`} selector=".fui-PresenceBadge" count={count + 1}>
              <PresenceBadge size={size}>{content}</PresenceBadge>
            </SlotCase>
          )}
        </React.Fragment>
      ))}
      {(['small', 'medium', 'large', 'extra-large'] as const).map((size, index) => (
        <React.Fragment key={size}>
          <SlotCase
            name={`Rating.${size}.selectedIcon/unselectedIcon`}
            selector=".fui-Rating"
            count={kind === 'default' ? 6 : count * 6}
            pixels={[12, 16, 20, 28][index]}
          >
            <Rating
              size={size}
              defaultValue={2.5}
              step={0.5}
              iconFilled={Icon}
              iconOutline={Icon}
              aria-label={`Rating ${size}`}
            />
          </SlotCase>
          <SlotCase
            name={`RatingDisplay.${size}.selectedIcon/unselectedIcon`}
            selector=".fui-RatingDisplay"
            count={kind === 'default' ? 6 : count * 6}
            pixels={[12, 16, 20, 28][index]}
          >
            <RatingDisplay size={size} value={2.5} icon={Icon} />
          </SlotCase>
          {kind !== 'default' && (
            <SlotCase
              name={`RatingItem.${size}.selectedIcon/unselectedIcon`}
              selector=".fui-RatingDisplay"
              count={count * 2}
              pixels={[12, 16, 20, 28][index]}
            >
              <RatingDisplay size={size} value={0.5}>
                <RatingItem value={1} selectedIcon={content} unselectedIcon={content} />
              </RatingDisplay>
            </SlotCase>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export const DefaultPresenceIcons = () => {
  const styles = useStyles();
  const statuses: PresenceBadgeStatus[] = [
    'available',
    'away',
    'blocked',
    'busy',
    'do-not-disturb',
    'offline',
    'out-of-office',
    'unknown',
  ];
  return (
    <div className={styles.root} data-slot-content="default">
      {statuses.flatMap(status =>
        [false, true].map(outOfOffice => (
          <SlotCase
            key={`${status}-${outOfOffice}`}
            name={`PresenceBadge.${status}${outOfOffice ? '.outOfOffice' : ''}`}
            selector=".fui-PresenceBadge__icon"
            slots={6}
          >
            {(['tiny', 'extra-small', 'small', 'medium', 'large', 'extra-large'] as const).map((size, index) => (
              <span key={size} data-presence-size={[6, 10, 12, 16, 20, 28][index]}>
                <PresenceBadge size={size} status={status} outOfOffice={outOfOffice} />
              </span>
            ))}
          </SlotCase>
        )),
      )}
    </div>
  );
};

export const HalfStarExamples = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      {(['ltr', 'rtl'] as const).flatMap(direction =>
        (['small', 'medium', 'large', 'extra-large'] as const).flatMap((size, index) =>
          (['Rating', 'RatingDisplay'] as const).map(component => (
            <section
              key={`${direction}-${size}-${component}`}
              className={styles.row}
              data-half-star-case={`${component}.${size}.${direction}`}
              data-half-star-direction={direction}
              data-half-star-size={[12, 16, 20, 28][index]}
            >
              <span>{`${component} ${size} ${direction}`}</span>
              <FluentProvider dir={direction} className={styles.references}>
                {(['empty', 'half', 'full'] as const).map((reference, value) => (
                  <div key={reference} className={styles.reference} data-half-star-reference={reference}>
                    <span>{reference}</span>
                    {component === 'Rating' ? (
                      <Rating size={size} value={value / 2} step={0.5} max={2} aria-label={reference} />
                    ) : (
                      <RatingDisplay size={size} value={value / 2} max={2} valueText={null} />
                    )}
                  </div>
                ))}
              </FluentProvider>
            </section>
          )),
        ),
      )}
    </div>
  );
};
