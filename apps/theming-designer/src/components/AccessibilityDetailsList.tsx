import * as React from 'react';
import {
  DetailsList,
  DetailsRow,
  IDetailsRowStyles,
  IDetailsRowProps,
  IColumn,
  IGroup,
  SelectionMode,
} from '@fluentui/react/lib/DetailsList';
import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar';
import { ITheme } from '@fluentui/react/lib/Styling';
import { IContrastRatioPair } from './AccessibilityChecker';

export interface IAccessibilityDetailsListProps {
  accessiblePairs: IContrastRatioPair[];
  nonAccessiblePairs: IContrastRatioPair[];
  theme: ITheme | undefined;
}

interface IAccessibilityDetailsList {
  key: string;
  contrastRatio: String;
  slotPair: String;
  colorPair: String;
}

export const AccessibilityDetailsList: React.FunctionComponent<IAccessibilityDetailsListProps> = (
  props: IAccessibilityDetailsListProps,
) => {
  let allContrastRatioPairs = props.nonAccessiblePairs.concat(props.accessiblePairs);
  let nonAccessibleStartIndex = props.nonAccessiblePairs.length;

  let items: IAccessibilityDetailsList[] = [];
  let groups: IGroup[] = [];
  let columns: IColumn[] = [];
  const newTheme = props.theme;

  const onRenderRow = (detailsRowProps: IDetailsRowProps | undefined): JSX.Element => {
    // Set each row's background and text color to what's specified by its respective slot rule
    if (detailsRowProps && newTheme) {
      const rowStyles: Partial<IDetailsRowStyles> = {
        root: {
          selectors: {
            ':hover': {
              background: 'transparent',
            },
          },
        },
      };
      return <DetailsRow {...detailsRowProps!} styles={rowStyles} />;
    } else {
      return <div />;
    }
  };

  const accessiblePairsListCount = allContrastRatioPairs.length - nonAccessibleStartIndex;
  let messageBar;
  if (allContrastRatioPairs.length > 0 && nonAccessibleStartIndex > 0) {
    const errorsMessageBarString =
      'Your color palette has ' +
      nonAccessibleStartIndex.toString() +
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

  for (let i = 0; i < allContrastRatioPairs.length; i++) {
    items.push({
      key: i.toString(),
      contrastRatio: allContrastRatioPairs[i].contrastRatioValue,
      slotPair: allContrastRatioPairs[i].contrastRatioPair,
      colorPair: allContrastRatioPairs[i].colorPair,
    });
  }

  groups = [
    { key: 'nonaccessiblepairs', name: 'Non accessible pairs', startIndex: 0, count: nonAccessibleStartIndex },
    {
      key: 'accessiblepairs',
      name: 'Accessible pairs',
      startIndex: nonAccessibleStartIndex,
      count: accessiblePairsListCount,
    },
  ];

  columns = [
    {
      key: 'contrastRatio',
      name: 'Contrast ratio: AA',
      fieldName: 'contrastRatio',
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    { key: 'colorPair', name: 'Color pair', fieldName: 'colorPair', minWidth: 100, maxWidth: 300 },
    { key: 'slotPair', name: 'Slot pair', fieldName: 'slotPair', minWidth: 100, maxWidth: 200 },
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
        disableSelectionZone={true}
        // eslint-disable-next-line react/jsx-no-bind
        onRenderRow={onRenderRow}
        groupProps={{
          showEmptyGroups: true,
        }}
      />
    </div>
  );
};
