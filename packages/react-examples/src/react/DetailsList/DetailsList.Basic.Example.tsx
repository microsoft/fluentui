import * as React from 'react';

import {
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
  hiddenContentStyle,
  mergeStyles,
  Toggle,
  ContextualMenu,
  getRTL,
  FocusZone,
  FocusZoneDirection,
  Image,
  ImageFit,
  Icon,
  List,
  ITheme,
  mergeStyleSets,
  getTheme,
  getFocusStyle,
} from '@fluentui/react';

import { useId, useBoolean, useConst } from '@fluentui/react-hooks';
import { createListItems, IExampleItem } from '@fluentui/example-data';

export class DetailsListBasicExample extends React.Component<{}, IDetailsListBasicExampleState> {
  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    return <DialogBasicExample />;
  }
}

const dialogStyles = { main: { maxWidth: 450 } };
const dragOptions = {
  moveMenuItemText: 'Move',
  closeMenuItemText: 'Close',
  menu: ContextualMenu,
  keepInBounds: true,
};
const screenReaderOnly = mergeStyles(hiddenContentStyle);
const dialogContentProps = {
  type: DialogType.normal,
  title: 'Missing Subject',
  closeButtonAriaLabel: 'Close',
  subText: 'Do you want to send this message without a subject?',
};

const DialogBasicExample: React.FunctionComponent = () => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
  const labelId: string = useId('dialogLabel');
  const subTextId: string = useId('subTextLabel');

  const modalProps = React.useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      styles: dialogStyles,
      dragOptions: isDraggable ? dragOptions : undefined,
    }),
    [isDraggable, labelId, subTextId],
  );

  return (
    <>
      <Toggle label="Is draggable" onChange={toggleIsDraggable} checked={isDraggable} />
      <DefaultButton secondaryText="Opens the Sample Dialog" onClick={toggleHideDialog} text="Open Dialog" />
      <label id={labelId} className={screenReaderOnly}>
        My sample label
      </label>
      <label id={subTextId} className={screenReaderOnly}>
        My sample description
      </label>

      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
        maxWidth={600}
      >
        <ListBasicExample />
        <DialogFooter>
          <PrimaryButton onClick={toggleHideDialog} text="Send" onFocus={() => console.log('primary focus')} />
          <DefaultButton onClick={toggleHideDialog} text="Don't send" onFocus={() => console.log('default focus')} />
        </DialogFooter>
      </Dialog>
    </>
  );
};

const theme: ITheme = getTheme();
const { palette, semanticColors, fonts } = theme;

const classNames = mergeStyleSets({
  itemCell: [
    getFocusStyle(theme, { inset: -1 }),
    {
      minHeight: 54,
      padding: 10,
      boxSizing: 'border-box',
      borderBottom: `1px solid ${semanticColors.bodyDivider}`,
      display: 'flex',
      selectors: {
        '&:hover': { background: palette.neutralLight },
      },
    },
  ],
  itemImage: {
    flexShrink: 0,
  },
  itemContent: {
    marginLeft: 10,
    overflow: 'hidden',
    flexGrow: 1,
  },
  itemName: [
    fonts.xLarge,
    {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  ],
  itemIndex: {
    fontSize: fonts.small.fontSize,
    color: palette.neutralTertiary,
    marginBottom: 10,
  },
  chevron: {
    alignSelf: 'center',
    marginLeft: 10,
    color: palette.neutralTertiary,
    fontSize: fonts.large.fontSize,
    flexShrink: 0,
  },
});

const onRenderCell = (item: IExampleItem, index: number | undefined): JSX.Element => {
  return (
    <div className={classNames.itemCell} data-is-focusable={true}>
      <Image className={classNames.itemImage} src={item.thumbnail} width={50} height={50} imageFit={ImageFit.cover} />
      <div className={classNames.itemContent}>
        <div className={classNames.itemName}>{item.name}</div>
        <div className={classNames.itemIndex}>{`Item ${index}`}</div>
        <div>{item.description}</div>
      </div>
      <Icon className={classNames.chevron} iconName={getRTL() ? 'ChevronLeft' : 'ChevronRight'} />
    </div>
  );
};

const ListBasicExample: React.FunctionComponent = () => {
  const items = useConst(() => createListItems(2));

  return (
    <FocusZone defaultTabbableElement=".ms-List" direction={FocusZoneDirection.vertical}>
      <List items={items} onRenderCell={onRenderCell} renderEarly={true} />
    </FocusZone>
  );
};
