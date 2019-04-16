import * as React from 'react';
import {
  DetailsList,
  DetailsRow,
  IDetailsRowStyles,
  IDetailsRowProps,
  IColumn,
  IGroup,
  MessageBar,
  MessageBarType,
  SelectionMode,
  ITheme
} from '../../../../packages/office-ui-fabric-react/lib/index';
import { IContrastRatioPair } from './AccessibilityChecker';

export interface IAccessibilityDetailsListProps {
  allContrastRatioPairs: IContrastRatioPair[];
  nonAccessibleStartIndex: number;
  theme: ITheme | undefined;
}

interface IAccessibilityDetailsList {
  key: string;
  contrastRatio: String;
  slotPair: String;
}

export const AccessibilityDetailsList: React.StatelessComponent<IAccessibilityDetailsListProps> = (
  props: IAccessibilityDetailsListProps
) => {
  let items: IAccessibilityDetailsList[] = [];
  let groups: IGroup[] = [];
  let columns: IColumn[] = [];
  const newTheme = props.theme;

  const onRenderRow = (detailsRowProps: IDetailsRowProps | undefined): JSX.Element => {
    // Set each row's background and text color to what's specified by its respective slot rule
    const currentSlotPair = detailsRowProps!.item.slotPair;
    const pairSplt = currentSlotPair.split(' on ');
    const currForegroundColor = pairSplt[0];
    const currBackgroundColor = pairSplt[1];

    const rowStyles: Partial<IDetailsRowStyles> = {
      root: {
        backgroundColor: (newTheme!.palette as any)[currBackgroundColor],
        color: (newTheme!.palette as any)[currForegroundColor],
        selectors: {
          ':hover': {
            background: 'transparent'
          }
        }
      }
    };
    return <DetailsRow {...detailsRowProps!} styles={rowStyles} />;
  };

  const accessiblePairsListCount = props.allContrastRatioPairs.length - props.nonAccessibleStartIndex;
  let messageBar;
  if (props.allContrastRatioPairs.length > 0 && props.nonAccessibleStartIndex > 0) {
    const errorsMessageBarString =
      'You color palette has ' +
      props.nonAccessibleStartIndex.toString() +
      ' accessibility errors. Each pair of colors below should produce legible text and have a minimum contrast of 4.5';
    messageBar = (
      <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
        {errorsMessageBarString}
      </MessageBar>
    );
  } else {
    messageBar = (
      <MessageBar messageBarType={MessageBarType.success} isMultiline={false}>
        Looking good! Your color palette doesn't have any accessibility issues.
      </MessageBar>
    );
  }

  for (let i = 0; i < props.allContrastRatioPairs.length; i++) {
    items.push({
      key: i.toString(),
      contrastRatio: props.allContrastRatioPairs[i].contrastRatioValue,
      slotPair: props.allContrastRatioPairs[i].contrastRatioPair
    });
  }

  groups = [
    { key: 'nonaccessiblepairs', name: 'Non accessible pairs', startIndex: 0, count: props.nonAccessibleStartIndex },
    {
      key: 'accessiblepairs',
      name: 'Accessible pairs',
      startIndex: props.nonAccessibleStartIndex,
      count: accessiblePairsListCount
    }
  ];

  columns = [
    { key: 'contrastRatio', name: 'Contrast ratio: AA', fieldName: 'contrastRatio', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'slotPair', name: 'Slot pair', fieldName: 'slotPair', minWidth: 100, maxWidth: 200 }
  ];

  return (
    <div>
      {messageBar}
      <DetailsList
        items={items}
        groups={groups}
        columns={columns}
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        ariaLabelForSelectionColumn="Toggle selection"
        selectionMode={SelectionMode.none}
        onRenderRow={onRenderRow}
        groupProps={{
          showEmptyGroups: true
        }}
      />
    </div>
  );
};
