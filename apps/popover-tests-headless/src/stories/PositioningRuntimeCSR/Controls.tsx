import * as React from 'react';

import { Button, makeStyles, tokens } from '@fluentui/react-components';
import { Combobox, Option as ComboboxOption } from '@fluentui/react-headless-components-preview/combobox';
import { Dropdown, Option as DropdownOption } from '@fluentui/react-headless-components-preview/dropdown';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-headless-components-preview/menu';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-headless-components-preview/popover';
import { Tag } from '@fluentui/react-headless-components-preview/tag';
import {
  TagPicker,
  TagPickerControl as HeadlessTagPickerControl,
  TagPickerGroup,
  TagPickerInput,
  TagPickerList,
  TagPickerOption,
} from '@fluentui/react-headless-components-preview/tag-picker';
import type { TagPickerProps } from '@fluentui/react-headless-components-preview/tag-picker';
import {
  TeachingPopover,
  TeachingPopoverBody,
  TeachingPopoverFooter,
  TeachingPopoverSurface,
  TeachingPopoverTitle,
  TeachingPopoverTrigger,
} from '@fluentui/react-headless-components-preview/teaching-popover';
import { Tooltip } from '@fluentui/react-headless-components-preview/tooltip';

type RuntimeMode = 'auto' | 'native' | 'fallback';
type RuntimeWindow = Window & {
  __FUI_HEADLESS_POSITIONING_RUNTIME_MODE__?: RuntimeMode;
};

const RUNTIME_QUERY_PARAM = 'positioningRuntime';

const useStyles = makeStyles({
  page: {
    display: 'grid',
    gap: tokens.spacingVerticalXXL,
    minHeight: '100vh',
    padding: tokens.spacingHorizontalXXL,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  header: {
    display: 'grid',
    gap: tokens.spacingVerticalM,
    maxWidth: '960px',
  },
  title: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeHero800,
    lineHeight: tokens.lineHeightHero800,
  },
  subtitle: {
    margin: 0,
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
  },
  statusPanel: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    padding: tokens.spacingHorizontalM,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  statusLabel: {
    fontWeight: tokens.fontWeightSemibold,
  },
  modeControls: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: tokens.spacingHorizontalS,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: tokens.spacingHorizontalL,
    alignItems: 'start',
  },
  card: {
    display: 'grid',
    gap: tokens.spacingVerticalM,
    minWidth: 0,
    padding: tokens.spacingHorizontalL,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorNeutralBackground2,
    boxShadow: tokens.shadow4,
  },
  wideCard: {
    gridColumn: '1 / -1',
  },
  cardTitle: {
    margin: 0,
    fontSize: tokens.fontSizeBase500,
    lineHeight: tokens.lineHeightBase500,
  },
  cardCopy: {
    margin: 0,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase400,
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: tokens.spacingVerticalS,
  },
  surface: {
    minWidth: '240px',
    maxWidth: '340px',
    margin: 0,
    padding: tokens.spacingHorizontalL,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow16,
    '& [data-arrow]': {
      position: 'absolute',
      width: '12px',
      height: '12px',
      backgroundColor: tokens.colorNeutralBackground1,
      transform: 'rotate(45deg)',
    },
    '&[data-placement^="above"] [data-arrow]': {
      bottom: '-6px',
    },
    '&[data-placement^="below"] [data-arrow]': {
      top: '-6px',
    },
    '&[data-placement^="before"] [data-arrow]': {
      right: '-6px',
    },
    '&[data-placement^="after"] [data-arrow]': {
      left: '-6px',
    },
    '&[data-positioning-runtime="native"][data-placement="above"] [data-arrow], &[data-positioning-runtime="native"][data-placement="below"] [data-arrow]':
      {
        insetInline: 0,
        marginInline: 'auto',
      },
    '&[data-positioning-runtime="native"][data-placement$="-start"] [data-arrow]': {
      left: tokens.spacingHorizontalL,
    },
    '&[data-positioning-runtime="native"][data-placement$="-end"] [data-arrow]': {
      right: tokens.spacingHorizontalL,
    },
    '&[data-positioning-runtime="native"][data-placement="before"] [data-arrow], &[data-positioning-runtime="native"][data-placement="after"] [data-arrow]':
      {
        insetBlock: 0,
        marginBlock: 'auto',
      },
    '&[data-positioning-runtime="native"][data-placement$="-top"] [data-arrow]': {
      top: tokens.spacingVerticalL,
    },
    '&[data-positioning-runtime="native"][data-placement$="-bottom"] [data-arrow]': {
      bottom: tokens.spacingVerticalL,
    },
  },
  nestedSurface: {
    minWidth: '280px',
  },
  menuSurface: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '180px',
    padding: tokens.spacingVerticalXS,
  },
  menuList: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXXS,
    outlineStyle: 'none',
  },
  menuItem: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    color: tokens.colorNeutralForeground1,
    backgroundColor: 'transparent',
    borderRadius: tokens.borderRadiusMedium,
    textAlign: 'start',
    cursor: 'pointer',
    '&:hover, &:focus-visible': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorBrandStroke1}`,
    },
  },
  tooltip: {
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
    color: tokens.colorNeutralForegroundInverted,
    backgroundColor: tokens.colorNeutralBackgroundStatic,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow8,
    '& [data-arrow]': {
      position: 'absolute',
      width: '8px',
      height: '8px',
      backgroundColor: tokens.colorNeutralBackgroundStatic,
      transform: 'rotate(45deg)',
    },
    '&[data-placement^="above"] [data-arrow]': {
      bottom: '-4px',
    },
    '&[data-placement^="below"] [data-arrow]': {
      top: '-4px',
    },
    '&[data-positioning-runtime="native"] [data-arrow]': {
      insetInline: 0,
      marginInline: 'auto',
    },
  },
  dropdownRoot: {
    position: 'relative',
    display: 'flex',
    width: '280px',
  },
  dropdownButton: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  listbox: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '280px',
    maxHeight: '240px',
    overflowY: 'auto',
    padding: tokens.spacingVerticalXS,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
  },
  option: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    borderRadius: tokens.borderRadiusMedium,
    '&:hover, &[data-activedescendant-focusvisible]': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
    '&[data-selected]': {
      color: tokens.colorBrandForeground1,
      backgroundColor: tokens.colorBrandBackground2,
    },
  },
  comboboxInput: {
    width: '280px',
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  tagPickerControl: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXS,
    width: '320px',
    padding: tokens.spacingVerticalXS,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  tagPickerGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: tokens.spacingHorizontalXS,
  },
  tag: {
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalS}`,
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: tokens.borderRadiusMedium,
  },
  tagPickerInput: {
    minWidth: '160px',
    flexGrow: 1,
    border: '0',
    outlineStyle: 'none',
  },
  teachingTitle: {
    margin: 0,
    fontSize: tokens.fontSizeBase500,
    lineHeight: tokens.lineHeightBase500,
  },
  edgeCanvas: {
    position: 'relative',
    height: '280px',
    overflow: 'hidden',
    border: `${tokens.strokeWidthThin} dashed ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorNeutralBackground3,
  },
  edgeTrigger: {
    position: 'absolute',
    insetInlineEnd: tokens.spacingHorizontalM,
    insetBlockEnd: tokens.spacingVerticalM,
  },
  placement: {
    display: 'inline-flex',
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalXS}`,
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorBrandForeground1,
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: tokens.borderRadiusSmall,
  },
  probeTrigger: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    overflow: 'hidden',
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
  },
});

const getRuntimeMode = (): RuntimeMode => {
  const requested = new URLSearchParams(window.location.search).get(RUNTIME_QUERY_PARAM);
  return requested === 'native' || requested === 'fallback' ? requested : 'auto';
};

const reloadWithRuntime = (mode: RuntimeMode): void => {
  const url = new URL(window.location.href);
  if (mode === 'auto') {
    url.searchParams.delete(RUNTIME_QUERY_PARAM);
  } else {
    url.searchParams.set(RUNTIME_QUERY_PARAM, mode);
  }
  window.location.assign(url.toString());
};

const usePlacementReadout = <T extends HTMLElement>(): [React.RefCallback<T>, string] => {
  const [element, setElement] = React.useState<T | null>(null);
  const [placement, setPlacement] = React.useState('not mounted');

  React.useEffect(() => {
    if (!element) {
      setPlacement('not mounted');
      return;
    }

    const update = () => setPlacement(element.getAttribute('data-placement') ?? 'pending');
    update();

    const observer = new MutationObserver(update);
    observer.observe(element, {
      attributes: true,
      attributeFilter: ['data-placement'],
    });

    return () => observer.disconnect();
  }, [element]);

  return [setElement, placement];
};

const RuntimeSentinel = (props: { onRuntimeChange: (runtime: string) => void }): React.ReactElement => {
  const { onRuntimeChange } = props;
  const styles = useStyles();
  const [element, setElement] = React.useState<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!element) {
      return;
    }

    const update = () => onRuntimeChange(element.getAttribute('data-positioning-runtime') ?? 'pending');
    update();

    const observer = new MutationObserver(update);
    observer.observe(element, {
      attributes: true,
      attributeFilter: ['data-positioning-runtime'],
    });

    return () => observer.disconnect();
  }, [element, onRuntimeChange]);

  return (
    <Tooltip
      content={{
        children: 'Runtime probe',
        id: 'runtime-sentinel',
        ref: setElement,
      }}
      relationship="description"
    >
      <span aria-hidden="true" className={styles.probeTrigger}>
        Runtime probe
      </span>
    </Tooltip>
  );
};

const RuntimeControls = (props: { requestedMode: RuntimeMode; resolvedMode: string }): React.ReactElement => {
  const { requestedMode, resolvedMode } = props;
  const styles = useStyles();

  return (
    <div className={styles.statusPanel}>
      <span>
        <span className={styles.statusLabel}>Requested:</span>{' '}
        <output data-testid="runtime-requested">{requestedMode}</output>
      </span>
      <span>
        <span className={styles.statusLabel}>Resolved:</span>{' '}
        <output data-testid="runtime-resolved">{resolvedMode}</output>
      </span>
      <div className={styles.modeControls}>
        {(['auto', 'native', 'fallback'] as const).map(mode => (
          <Button
            appearance={requestedMode === mode ? 'primary' : 'secondary'}
            data-testid={`runtime-mode-${mode}`}
            key={mode}
            onClick={() => reloadWithRuntime(mode)}
          >
            {mode === 'auto' ? 'Auto detect' : `Force ${mode}`}
          </Button>
        ))}
      </div>
    </div>
  );
};

const BasicPopoverExample = (): React.ReactElement => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);
  const [surfaceRef, placement] = usePlacementReadout<HTMLDialogElement>();

  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Basic Popover</h2>
      <p className={styles.cardCopy}>
        Verify click, outside click, Escape, arrow placement, focus restoration, and controlled close.
      </p>
      <div className={styles.row}>
        <Popover open={open} onOpenChange={(_event, data) => setOpen(data.open)} positioning="below-start" withArrow>
          <PopoverTrigger>
            <Button data-testid="basic-popover-trigger">Open popover</Button>
          </PopoverTrigger>
          <PopoverSurface className={styles.surface} data-testid="basic-popover-surface" ref={surfaceRef}>
            <div className={styles.column}>
              <strong>Adaptive popover</strong>
              <span>
                Placement:{' '}
                <output className={styles.placement} data-testid="basic-popover-placement">
                  {placement}
                </output>
              </span>
              <Button data-testid="basic-popover-close" onClick={() => setOpen(false)} size="small">
                Close
              </Button>
            </div>
          </PopoverSurface>
        </Popover>
        <span data-testid="basic-popover-state">{open ? 'open' : 'closed'}</span>
      </div>
    </section>
  );
};

const EdgePlacementExample = (): React.ReactElement => {
  const styles = useStyles();
  const [surfaceRef, placement] = usePlacementReadout<HTMLDialogElement>();

  return (
    <section className={`${styles.card} ${styles.wideCard}`}>
      <h2 className={styles.cardTitle}>Collision and fallback placement</h2>
      <p className={styles.cardCopy}>
        The requested placement is below-end at the canvas corner. It should resolve to a fitting fallback and keep the
        surface inside the viewport.
      </p>
      <div className={styles.edgeCanvas} data-testid="edge-placement-canvas">
        <Popover
          positioning={{
            align: 'end',
            fallbackPositions: ['above-end', 'before-bottom'],
            position: 'below',
          }}
          withArrow
        >
          <PopoverTrigger>
            <Button className={styles.edgeTrigger} data-testid="edge-popover-trigger">
              Open at bottom-right
            </Button>
          </PopoverTrigger>
          <PopoverSurface className={styles.surface} data-testid="edge-popover-surface" ref={surfaceRef}>
            <div className={styles.column}>
              <strong>Collision test</strong>
              <span>
                Resolved placement:{' '}
                <output className={styles.placement} data-testid="edge-popover-placement">
                  {placement}
                </output>
              </span>
            </div>
          </PopoverSurface>
        </Popover>
      </div>
    </section>
  );
};

const NestedPopoverExample = (): React.ReactElement => {
  const styles = useStyles();

  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Nested Popovers</h2>
      <p className={styles.cardCopy}>
        Open both surfaces, then press Escape. The inner surface should close first while the outer remains open.
      </p>
      <Popover positioning="below-start">
        <PopoverTrigger>
          <Button data-testid="outer-popover-trigger">Open outer</Button>
        </PopoverTrigger>
        <PopoverSurface className={`${styles.surface} ${styles.nestedSurface}`} data-testid="outer-popover-surface">
          <div className={styles.column}>
            <strong>Outer popover</strong>
            <Popover positioning="after-top">
              <PopoverTrigger>
                <Button data-testid="inner-popover-trigger" size="small">
                  Open inner
                </Button>
              </PopoverTrigger>
              <PopoverSurface className={styles.surface} data-testid="inner-popover-surface">
                Inner popover
              </PopoverSurface>
            </Popover>
          </div>
        </PopoverSurface>
      </Popover>
    </section>
  );
};

const MenuExample = (): React.ReactElement => {
  const styles = useStyles();

  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Menu</h2>
      <p className={styles.cardCopy}>Verify first-item focus, keyboard navigation, outside dismissal, and Escape.</p>
      <Menu>
        <MenuTrigger>
          <Button data-testid="menu-trigger">Open menu</Button>
        </MenuTrigger>
        <MenuPopover className={`${styles.surface} ${styles.menuSurface}`} data-testid="menu-surface">
          <MenuList className={styles.menuList}>
            <MenuItem className={styles.menuItem}>New file</MenuItem>
            <MenuItem className={styles.menuItem}>Open file</MenuItem>
            <MenuItem className={styles.menuItem}>Save</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </section>
  );
};

const TooltipExample = (): React.ReactElement => {
  const styles = useStyles();

  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Tooltip</h2>
      <p className={styles.cardCopy}>Verify hover, keyboard focus, outside dismissal, and Escape.</p>
      <Tooltip
        content={
          <div className={styles.tooltip} data-testid="tooltip-surface">
            Adaptive tooltip
          </div>
        }
        relationship="description"
        showDelay={0}
        withArrow
      >
        <Button data-testid="tooltip-trigger">Hover or focus</Button>
      </Tooltip>
    </section>
  );
};

const DropdownExample = (): React.ReactElement => {
  const styles = useStyles();

  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Dropdown</h2>
      <p className={styles.cardCopy}>
        Verify listbox portal placement, keyboard navigation, selection, and outside dismissal.
      </p>
      <Dropdown
        button={{
          children: 'Select a deployment ring',
          className: styles.dropdownButton,
          id: 'positioning-runtime-dropdown-trigger',
        }}
        className={styles.dropdownRoot}
        data-testid="dropdown-root"
        listbox={{
          className: styles.listbox,
          id: 'positioning-runtime-dropdown-listbox',
        }}
      >
        <DropdownOption className={styles.option}>Canary</DropdownOption>
        <DropdownOption className={styles.option}>Preview</DropdownOption>
        <DropdownOption className={styles.option}>Production</DropdownOption>
      </Dropdown>
    </section>
  );
};

const ComboboxExample = (): React.ReactElement => {
  const styles = useStyles();

  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Combobox</h2>
      <p className={styles.cardCopy}>
        Verify editable filtering, listbox positioning, keyboard navigation, selection, and dismissal.
      </p>
      <Combobox
        input={{
          className: styles.comboboxInput,
          id: 'positioning-runtime-combobox-input',
        }}
        listbox={{
          className: styles.listbox,
          id: 'positioning-runtime-combobox-listbox',
        }}
        placeholder="Select a deployment ring"
      >
        <ComboboxOption className={styles.option}>Canary</ComboboxOption>
        <ComboboxOption className={styles.option}>Preview</ComboboxOption>
        <ComboboxOption className={styles.option}>Production</ComboboxOption>
      </Combobox>
    </section>
  );
};

const TeachingPopoverExample = (): React.ReactElement => {
  const styles = useStyles();

  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>TeachingPopover</h2>
      <p className={styles.cardCopy}>Verify arrow positioning and interactive content placement.</p>
      <TeachingPopover positioning={{ offset: 10 }}>
        <TeachingPopoverTrigger>
          <Button data-testid="teaching-popover-trigger">Open teaching popover</Button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface className={styles.surface} data-testid="teaching-popover-surface">
          <TeachingPopoverBody>
            <TeachingPopoverTitle className={styles.teachingTitle}>Positioning guidance</TeachingPopoverTitle>
            This teaching surface uses the same adaptive positioning hook.
          </TeachingPopoverBody>
          <TeachingPopoverFooter>
            <Button size="small">Got it</Button>
          </TeachingPopoverFooter>
        </TeachingPopoverSurface>
      </TeachingPopover>
    </section>
  );
};

const TAG_PICKER_OPTIONS = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

const TagPickerExample = (): React.ReactElement => {
  const styles = useStyles();
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const onOptionSelect: TagPickerProps['onOptionSelect'] = (_event, data) => {
    setSelectedOptions(data.selectedOptions);
  };

  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>TagPicker</h2>
      <p className={styles.cardCopy}>Verify input/listbox positioning and multiselect behavior.</p>
      <TagPicker onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <HeadlessTagPickerControl className={styles.tagPickerControl}>
          <TagPickerGroup className={styles.tagPickerGroup}>
            {selectedOptions.map(option => (
              <Tag className={styles.tag} key={option} value={option}>
                {option}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput
            aria-label="Select engineers"
            className={styles.tagPickerInput}
            data-testid="tag-picker-input"
          />
        </HeadlessTagPickerControl>
        <TagPickerList className={styles.listbox} data-testid="tag-picker-listbox">
          {TAG_PICKER_OPTIONS.filter(option => !selectedOptions.includes(option)).map(option => (
            <TagPickerOption className={styles.option} key={option} value={option}>
              {option}
            </TagPickerOption>
          ))}
        </TagPickerList>
      </TagPicker>
    </section>
  );
};

const RuntimePage = (props: {
  children: React.ReactNode;
  description: string;
  requestedMode: RuntimeMode;
  title: string;
}): React.ReactElement => {
  const { children, description, requestedMode, title } = props;
  const styles = useStyles();
  const [resolvedMode, setResolvedMode] = React.useState('pending');

  return (
    <main className={styles.page}>
      <RuntimeSentinel onRuntimeChange={setResolvedMode} />
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{description}</p>
        <RuntimeControls requestedMode={requestedMode} resolvedMode={resolvedMode} />
      </header>
      <div className={styles.grid}>{children}</div>
    </main>
  );
};

const RuntimeGate = (props: { children: React.ReactNode; description: string; title: string }): React.ReactElement => {
  const { children, description, title } = props;
  const [requestedMode, setRequestedMode] = React.useState<RuntimeMode | null>(null);

  React.useEffect(() => {
    const mode = getRuntimeMode();
    (window as RuntimeWindow).__FUI_HEADLESS_POSITIONING_RUNTIME_MODE__ = mode;
    setRequestedMode(mode);
  }, []);

  if (!requestedMode) {
    return <div data-testid="runtime-initializing">Initializing positioning runtime...</div>;
  }

  return (
    <RuntimePage description={description} requestedMode={requestedMode} title={title}>
      {children}
    </RuntimePage>
  );
};

export const PopoverControl = (): React.ReactElement => (
  <RuntimeGate
    description="Verify basic, nested, and collision-aware Popover behavior in native and fallback runtimes."
    title="CSR Popover verification"
  >
    <BasicPopoverExample />
    <NestedPopoverExample />
    <EdgePlacementExample />
  </RuntimeGate>
);

export const MenuControl = (): React.ReactElement => (
  <RuntimeGate
    description="Verify Menu positioning, focus, keyboard navigation, outside click, and Escape."
    title="CSR Menu verification"
  >
    <MenuExample />
  </RuntimeGate>
);

export const TooltipControl = (): React.ReactElement => (
  <RuntimeGate
    description="Verify Tooltip hover, focus, dismissal, and runtime-specific rendering."
    title="CSR Tooltip verification"
  >
    <TooltipExample />
  </RuntimeGate>
);

export const DropdownControl = (): React.ReactElement => (
  <RuntimeGate
    description="Verify Dropdown listbox positioning, keyboard selection, and dismissal."
    title="CSR Dropdown verification"
  >
    <DropdownExample />
  </RuntimeGate>
);

export const ComboboxControl = (): React.ReactElement => (
  <RuntimeGate
    description="Verify editable Combobox listbox positioning and interaction."
    title="CSR Combobox verification"
  >
    <ComboboxExample />
  </RuntimeGate>
);

export const TeachingPopoverControl = (): React.ReactElement => (
  <RuntimeGate
    description="Verify TeachingPopover arrow and surface positioning."
    title="CSR TeachingPopover verification"
  >
    <TeachingPopoverExample />
  </RuntimeGate>
);

export const TagPickerControl = (): React.ReactElement => (
  <RuntimeGate
    description="Verify TagPicker listbox positioning and multiselect interaction."
    title="CSR TagPicker verification"
  >
    <TagPickerExample />
  </RuntimeGate>
);
