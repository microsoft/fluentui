import * as React from 'react';
import {
  Input,
  makeStyles,
  tokens,
  shorthands,
  useFluent,
  mergeClasses,
  Avatar,
  Field,
  TagGroup,
  Tag,
} from '@fluentui/react-components';
import { usePositioning } from '@fluentui/react-positioning';
import { useId, useMergedRefs, useOnClickOutside } from '@fluentui/react-utilities';
import {
  ChevronDownRegular,
  CallRegular,
  SearchRegular,
  SendRegular,
  OpenRegular,
  ShareRegular,
} from '@fluentui/react-icons';
import {
  ActiveDescendantGridFocusableImperativeRef,
  ACTIVEDESCENDANT_ATTRIBUTE,
  useActiveDescendantGridFocusable,
} from './utils';
import { people } from './data';

const HAS_ACTIONS_HINT = 'Has additional actions, use right arrow';

const options = people.map(person => ({
  id: person.split(' ')[0],
  text: person,
}));

const files = people
  .map(person => {
    const fileNames = ['backlog', 'presentation'];
    const firstName = person.split(' ')[0];
    return fileNames.map(fileName => {
      const text = `${firstName} ${fileName}`;
      return {
        text,
        id: text.replace(' ', ''),
      };
    });
  })
  .flat();

// eslint-disable-next-line
const useStyles = makeStyles({
  grid: {
    boxShadow: `${tokens.shadow16}`,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    maxHeight: '300px',
    overflowY: 'auto',
    ...shorthands.padding(tokens.spacingHorizontalXS),
  },

  hidden: {
    clip: 'rect(0px, 0px, 0px, 0px)',
    height: '1px',
    ...shorthands.margin('-1px'),
    ...shorthands.overflow('hidden'),
    ...shorthands.padding('0px'),
    width: '1px',
    position: 'absolute',
  },

  option: {
    ...shorthands.gap('4px'),
    alignItems: 'center',
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    color: tokens.colorNeutralForeground1,
    columnGap: tokens.spacingHorizontalXS,
    cursor: 'pointer',
    display: 'flex',
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    ...shorthands.padding(tokens.spacingVerticalSNudge, tokens.spacingHorizontalS),
    position: 'relative',

    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },

    '&:active': {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
    },

    [`&[${ACTIVEDESCENDANT_ATTRIBUTE}]`]: {
      ...shorthands.outline('2px', 'solid', tokens.colorStrokeFocus2),
    },
  },

  secondaryAction: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    fontSize: '16px',
    [`&[${ACTIVEDESCENDANT_ATTRIBUTE}]`]: {
      ...shorthands.outline('2px', 'solid', tokens.colorStrokeFocus2),
    },
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },

  tag: {
    [`&[${ACTIVEDESCENDANT_ATTRIBUTE}]`]: {
      ...shorthands.outline('2px', 'solid', tokens.colorStrokeFocus2),
    },
  },

  root: {
    maxWidth: '300px',
    minWidth: '200px',
  },

  input: {
    '&::-webkit-search-decoration': {
      display: 'none',
    },
    '&::-webkit-search-cancel-button': {
      display: 'none',
    },
    '&::-webkit-search-results-button': {
      display: 'none',
    },
    '&::-webkit-search-results-decoration': {
      display: 'none',
    },
  },

  groupHeader: {
    marginBottom: '4px',
    color: tokens.colorNeutralForeground3,
  },
});

const filterRowId = 'filter-row';
const peopleGroupid = 'people-group';
const filesGroupid = 'files-group';
const peopleFilterId = 'people-filter';
const filesFilterId = 'files-filter';
const noResultsRowId = 'noResults-row';

export const GridActiveDescendantComboboxCellNavigationRenderer = () => {
  const { targetDocument } = useFluent();
  const [filter, setFilter] = React.useState<'none' | 'files' | 'people'>('none');
  const styles = useStyles();
  const gridHtmlRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  const { containerRef, targetRef } = usePositioning({
    align: 'start',
    position: 'below',
    matchTargetSize: 'width',
  });
  const [value, setValue] = React.useState('');
  const [selected, setSelected] = React.useState<string | null>(null);
  const gridId = useId('grid');
  const activeDescendantGridImperativeRef = React.useRef<ActiveDescendantGridFocusableImperativeRef>(null);
  const { activeParentRef, listboxRef: gridActiveDescendantRef } = useActiveDescendantGridFocusable(
    activeDescendantGridImperativeRef,
  );

  const gridRef = useMergedRefs(gridHtmlRef, containerRef, gridActiveDescendantRef);
  const inputRef = useMergedRefs(activeParentRef);

  useOnClickOutside({
    callback: () => {
      setOpen(false);
    },
    refs: [targetRef, gridHtmlRef],
    element: targetDocument,
  });

  const displayOptions = React.useMemo(
    () =>
      filter !== 'files' ? options.filter(option => option.text.toLowerCase().startsWith(value.toLowerCase())) : [],
    [value, filter],
  );

  const displayFiles = React.useMemo(
    () => (filter !== 'people' ? files.filter(file => file.text.toLowerCase().startsWith(value.toLowerCase())) : []),
    [value, filter],
  );

  const shouldDisplayEmpty = displayOptions.length === 0 && displayFiles.length === 0;

  React.useEffect(() => {
    if (!activeDescendantGridImperativeRef.current?.active()) {
      activeDescendantGridImperativeRef.current?.first();
    }
  }, [value]);

  const selectActive = React.useCallback(() => {
    const activeId = activeDescendantGridImperativeRef.current?.active();
    if (activeId) {
      const next = options.find(x => x.id === activeId) ?? files.find(x => x.id === activeId);
      if (next) {
        setValue(next.text);
        setSelected(next.id);
      } else {
        const selectedText = options.find(x => x.id === selected)?.text;
        setValue(selectedText ?? '');
      }
    }
  }, [selected]);

  const isAction = React.useCallback(() => {
    const activeId = activeDescendantGridImperativeRef.current?.active();

    if (!activeId || !targetDocument) {
      return [false, null] as const;
    }

    const el = targetDocument?.getElementById(activeId);
    return [el?.getAttribute('data-action'), el?.getAttribute('data-option-id') ?? null] as const;
  }, [targetDocument]);

  const performAction = (action: string, optionId: string) => {
    const text = options.find(x => x.id === optionId)?.text ?? files.find(x => x.id === optionId)?.text;
    switch (action) {
      case 'call':
        // eslint-disable-next-line
        alert(`Calling ${text}`);
        break;
      case 'send':
        // eslint-disable-next-line
        prompt(`Send message to ${text}`);
        break;
      case 'share':
        // eslint-disable-next-line
        alert(`Copied link to clipboard`);
        break;
      case 'open':
        // eslint-disable-next-line
        alert(`Opened file ${text}`);
        break;
      case 'filter-files':
        setFilter('files');
        break;
      case 'filter-people':
        setFilter('people');
        break;
    }
  };

  const onInputKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      let preventDefault: boolean | undefined | void = false;
      switch (e.key) {
        case 'Enter':
          const [action, optionId] = isAction();
          if (action && optionId) {
            performAction(action, optionId);
          } else {
            selectActive();
            setOpen(false);
          }
          preventDefault = true;
          break;
        case 'Escape':
          setOpen(false);
          preventDefault = true;
          break;
        case 'ArrowDown':
          setOpen(true);
          if (activeDescendantGridImperativeRef.current?.active()) {
            activeDescendantGridImperativeRef.current?.focusableBelow();
          } else {
            activeDescendantGridImperativeRef.current?.first();
          }
          preventDefault = true;
          break;
        case 'ArrowUp':
          setOpen(true);
          activeDescendantGridImperativeRef.current?.focusableAbove();
          preventDefault = true;
          break;
        case 'ArrowRight':
          preventDefault = activeDescendantGridImperativeRef?.current?.nextFocusable();
          break;
        case 'ArrowLeft':
          preventDefault = activeDescendantGridImperativeRef?.current?.prevFocusable();
          break;
        case 'Tab':
          selectActive();
          setOpen(false);
          break;
        default:
          setOpen(true);
      }

      if (preventDefault) {
        e.preventDefault();
      }
    },
    [isAction, selectActive],
  );

  // eslint-disable-next-line
  React.useLayoutEffect(() => {
    if (open) {
      activeDescendantGridImperativeRef.current?.first();
    } else {
      setFilter('none');
      activeDescendantGridImperativeRef.current?.blur();
    }
  }, [open]);

  React.useEffect(() => {
    if (value === '') {
      setSelected(null);
      activeDescendantGridImperativeRef.current?.blur();
    }
  }, [value]);

  React.useEffect(() => {}, [selected]);

  const handleInputChange = React.useCallback(
    e => {
      setValue(e.target.value);
    },
    [setValue],
  );

  return (
    <form role="search">
      <Field label="Search" className={styles.root}>
        <Input
          data-selected={selected}
          value={value}
          onChange={handleInputChange}
          aria-controls={open ? gridId : undefined}
          aria-expanded={open}
          role="combobox"
          aria-haspopup="grid"
          autoComplete="off"
          type="search"
          onKeyDown={onInputKeyDown}
          input={{ className: styles.input }}
          root={{
            ref: targetRef,
            onClick: () => {
              setOpen(true);
              inputRef.current?.focus();
            },
          }}
          ref={inputRef as React.Ref<HTMLInputElement>}
          contentBefore={<SearchRegular />}
          contentAfter={<ChevronDownRegular />}
        />
      </Field>
      {open && (
        <div role="grid" id={gridId} ref={gridRef} className={styles.grid}>
          {!shouldDisplayEmpty && (
            <div role="row" id={filterRowId}>
              <div role="gridcell" aria-colspan={3}>
                <TagGroup size="small" role="presentation">
                  <Tag
                    appearance={filter === 'people' ? 'brand' : 'outline'}
                    shape="circular"
                    className={styles.tag}
                    tabIndex={0}
                    data-action="filter-people"
                    data-option-id={peopleFilterId}
                    id={peopleFilterId}
                    aria-label="Display only people"
                    aria-selected={filter === 'people' ? true : undefined}
                  >
                    People
                  </Tag>
                  <Tag
                    appearance={filter === 'files' ? 'brand' : 'outline'}
                    shape="circular"
                    className={styles.tag}
                    tabIndex={0}
                    data-action="filter-files"
                    data-option-id={filesFilterId}
                    id={filesFilterId}
                    aria-label="Display only files"
                    aria-selected={filter === 'files' ? true : undefined}
                  >
                    Files
                  </Tag>
                </TagGroup>
              </div>
            </div>
          )}
          <div role="rowgroup" aria-labelledby={peopleGroupid}>
            {displayOptions.length ? (
              <span id={peopleGroupid} role="presentation" className={styles.groupHeader}>
                People
              </span>
            ) : null}
            {displayOptions.map(option => {
              const rowId = `${option.id}-row`;
              const cellId = `${option.id}-firstCell`;
              const callActionId = `${option.id}-call`;
              const sendActionId = `${option.id}-send`;
              const contentId = `${option.id}-content`;
              return (
                <div
                  key={option.id}
                  role="row"
                  id={rowId}
                  // tabIndex={0}
                  aria-selected={selected === option.id ? true : undefined}
                  className={styles.option}
                  // aria-labelledby={contentId}
                >
                  <div role="gridcell" id={cellId} tabIndex={0} aria-description={HAS_ACTIONS_HINT}>
                    <Avatar color="colorful" name={option.text} />
                    <span id={contentId}>{option.text}</span>
                  </div>

                  <div role="gridcell">
                    <div
                      data-option-id={option.id}
                      data-action="send"
                      role="button"
                      id={sendActionId}
                      tabIndex={0}
                      className={mergeClasses('secondary-action', styles.secondaryAction)}
                      aria-label="Send message"
                    >
                      <SendRegular />
                    </div>
                  </div>

                  <div role="gridcell">
                    <div
                      data-option-id={option.id}
                      data-action="call"
                      role="button"
                      id={callActionId}
                      tabIndex={0}
                      className={mergeClasses('secondary-action', styles.secondaryAction)}
                      style={{ marginLeft: 4 }}
                      aria-label="Call on Teams"
                    >
                      <CallRegular />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div role="rowgroup" aria-labelledby={filesGroupid}>
            {displayFiles.length ? (
              <span id={filesGroupid} role="presentation" className={styles.groupHeader}>
                Files
              </span>
            ) : null}
            {displayFiles.map(option => {
              const rowId = `${option.id}-row`;
              const cellId = `${option.id}-firstCell`;
              const shareActionId = `${option.id}-share`;
              const openActionId = `${option.id}-open`;
              const contentId = `${option.id}-content`;
              return (
                <div
                  key={option.id}
                  role="row"
                  id={rowId}
                  // tabIndex={0}
                  aria-selected={selected === option.id ? true : undefined}
                  className={styles.option}
                  // aria-labelledby={contentId}
                >
                  <div role="gridcell" id={cellId} tabIndex={0} aria-description={HAS_ACTIONS_HINT}>
                    <Avatar color="colorful" name={option.text} />
                    <span id={contentId}>{option.text}</span>
                  </div>

                  <div role="gridcell">
                    <div
                      data-option-id={option.id}
                      data-action="share"
                      role="button"
                      id={shareActionId}
                      tabIndex={0}
                      className={mergeClasses('secondary-action', styles.secondaryAction)}
                      aria-label="Share file"
                    >
                      <ShareRegular />
                    </div>
                  </div>

                  <div role="gridcell">
                    <div
                      data-option-id={option.id}
                      data-action="open"
                      role="button"
                      id={openActionId}
                      tabIndex={0}
                      className={mergeClasses('secondary-action', styles.secondaryAction)}
                      style={{ marginLeft: 4 }}
                      aria-label="Open file"
                    >
                      <OpenRegular />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {shouldDisplayEmpty && (
            <div role="row" id={noResultsRowId} tabIndex={0} className={styles.option}>
              <div role="gridcell">No results for "{value}"</div>
            </div>
          )}
        </div>
      )}
    </form>
  );
};
