import * as ReactIcons from '@fluentui/react-icons';
import {
  Button,
  Field,
  Input,
  Link,
  makeStyles,
  MessageBar,
  Radio,
  RadioGroup,
  shorthands,
  Toast,
  Toaster,
  ToastTitle,
  tokens,
  useId,
  useIsomorphicLayoutEffect,
  useScrollbarWidth,
  useToastController,
} from '@fluentui/react-components';
import * as React from 'react';
import { FixedSizeGrid, type GridChildComponentProps } from 'react-window';

const ICON_CELL_WIDTH = 250;
const UNSIZED_ICON_SIZE = 48;

const ICONS_LIST: React.FC<ReactIcons.FluentIconsProps>[] = Object.keys(ReactIcons)
  .map(iconName => (ReactIcons as any)[iconName])
  .filter(icon => !!icon && !!icon.displayName);

const useClasses = makeStyles({
  controls: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    ...shorthands.gap(tokens.spacingVerticalL, tokens.spacingHorizontalL),
    marginBottom: tokens.spacingVerticalM,
  },

  inputControl: {
    display: 'flex',
    alignSelf: 'center',
  },

  input: {
    width: '100%',
  },

  radioControl: {
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    boxShadow: tokens.shadow2,
    ...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingHorizontalL),
    backgroundColor: tokens.colorNeutralBackground1,
  },

  radioLabel: {
    marginLeft: tokens.spacingHorizontalS,
  },

  message: {
    marginBottom: tokens.spacingVerticalM,
  },

  pane: {
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    boxShadow: tokens.shadow2,
  },

  iconCell: {
    alignItems: 'center',
    backgroundColor: tokens.colorNeutralBackground2,
    display: 'grid',
    justifyItems: 'center',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr auto',
    ...shorthands.gap(tokens.spacingVerticalMNudge, tokens.spacingHorizontalMNudge),
    fontSize: `${UNSIZED_ICON_SIZE}px`,
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalS),
    ...shorthands.overflow('hidden'),
    boxShadow: tokens.shadow2,
    ...shorthands.margin(tokens.spacingVerticalS, tokens.spacingHorizontalS),
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
  },
  iconCopyButton: {
    ...shorthands.gridArea('1', '1', '2', '2'),
    zIndex: 1,
    justifySelf: 'end',
  },
  iconGlyph: {
    ...shorthands.gridArea('1', '1', '2', '2'),
  },
  iconCode: {
    ...shorthands.gridArea('2', '1', '3', '2'),

    '> code': {
      fontSize: `${tokens.fontSizeBase200} !important`,
      display: 'block !important',
    },
  },
});

type IconCellData = {
  classes: ReturnType<typeof useClasses>;

  columnCount: number;
  icons: typeof ICONS_LIST;

  onCopy: (iconName: string) => void;
};

const renderIconCell = (itemProps: GridChildComponentProps & { data: IconCellData }) => {
  const { columnIndex, data: _data, rowIndex, style } = itemProps;
  const { classes, columnCount, icons, onCopy } = _data as IconCellData;

  const Icon = icons[rowIndex * columnCount + columnIndex];

  if (!Icon) {
    return <div style={style} />;
  }

  return (
    <div aria-label={Icon.displayName} style={style}>
      <div className={classes.iconCell}>
        <div className={classes.iconCopyButton}>
          <Button
            appearance="transparent"
            icon={<ReactIcons.CopyRegular />}
            onClick={() => onCopy(Icon.displayName as string)}
            title="Copy icon name to clipboard"
          />
        </div>
        <Icon className={classes.iconGlyph} />
        <div className={classes.iconCode}>
          <code>{Icon.displayName}</code>
        </div>
      </div>
    </div>
  );
};

const ReactIconGrid = () => {
  const classes = useClasses();
  const scrollBarWidth = useScrollbarWidth({ targetDocument: document }) ?? 0;

  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [size, setSize] = React.useState<string>('Unsized');

  const areaRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState<number>(1000);

  const filteredIcons = React.useMemo(
    () =>
      ICONS_LIST.filter(icon => {
        if (size === 'Unsized') {
          return (
            icon.displayName! &&
            !/\d/.test(icon.displayName.toLowerCase()) &&
            icon.displayName?.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
          );
        }

        return (
          icon.displayName?.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 &&
          icon.displayName?.indexOf(String(size)) !== -1
        );
      }),
    [searchQuery, size],
  );

  const columnCount = Math.floor(width / ICON_CELL_WIDTH);
  const rowHeight = Math.max(30, size === 'Unsized' ? UNSIZED_ICON_SIZE : Number(size)) + 55;
  const height = Math.min(Math.ceil(filteredIcons.length / columnCount) * rowHeight + 10, 1000);

  const iconCellData: IconCellData = {
    icons: filteredIcons,
    classes,
    columnCount,
    onCopy: (iconName: string) => {
      navigator.clipboard.writeText(`<${iconName} />`);

      dispatchToast(
        <Toast>
          <ToastTitle>Icon was copied to clipboard</ToastTitle>
        </Toast>,
        { intent: 'success' },
      );
    },
  };

  useIsomorphicLayoutEffect(() => {
    const observer = new ResizeObserver(entries => {
      setWidth(entries[0].contentRect.width);
    });

    if (areaRef.current) {
      observer.observe(areaRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return (
    <div ref={areaRef}>
      <Toaster toasterId={toasterId} />

      <div className={classes.controls}>
        <div className={classes.inputControl}>
          <Input
            aria-label="search"
            className={classes.input}
            type="search"
            onChange={(ev, data) => setSearchQuery(data.value)}
            placeholder="Icon name..."
            size="large"
            value={searchQuery}
          />
        </div>

        <div className={classes.radioControl}>
          <Field
            label={{ children: 'Choose icon set:', className: classes.radioLabel }}
            hint={{
              className: classes.radioLabel,
              children: (
                <>
                  What icon set to use? Check <Link href="/?path=/docs/icons-overview--page">docs</Link>
                </>
              ),
            }}
          >
            <RadioGroup layout="horizontal-stacked" onChange={(ev, data) => setSize(data.value)} value={size}>
              <Radio value="Unsized" label="Unsized" />
              {[16, 20, 24, 28, 32, 48].map(option => (
                <Radio key={option} value={String(option)} label={String(option)} />
              ))}
            </RadioGroup>
          </Field>
        </div>
      </div>

      {filteredIcons.length === 0 ? (
        <MessageBar intent="warning" className={classes.message}>
          No icons found for the search query. Try another one.
        </MessageBar>
      ) : (
        <div className={classes.pane}>
          <FixedSizeGrid
            itemData={iconCellData}
            columnCount={columnCount}
            columnWidth={width / columnCount - scrollBarWidth / columnCount}
            height={height}
            rowCount={Math.ceil(filteredIcons.length / columnCount)}
            rowHeight={rowHeight}
            width={width}
          >
            {renderIconCell}
          </FixedSizeGrid>
        </div>
      )}
    </div>
  );
};

export default ReactIconGrid;
