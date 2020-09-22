import * as React from 'react';
import { createArray } from '@fluentui/react-next/lib/Utilities';
import { OverflowSet } from '@fluentui/react-next/lib/OverflowSet';
import { mergeStyles } from '@fluentui/react-next/lib/Styling';
import { IContextualMenuItem } from '@fluentui/react-next/lib/ContextualMenu';
import { ResizeGroupDirection, ResizeGroup } from '@fluentui/react-next/lib/ResizeGroup';
import { DirectionalHint } from '@fluentui/react-next';
import { CommandBarButton, IButtonStyles } from '@fluentui/react-next/lib/compat/Button';

export interface IOverflowData {
  primary: IContextualMenuItem[];
  overflow: IContextualMenuItem[];
  cacheKey?: string;
}

const generateData = (count: number, cachingEnabled: boolean, checked: boolean): IOverflowData => {
  const icons = ['Add', 'Share', 'Upload'];
  let cacheKey = '';
  const dataItems = createArray(count, index => {
    cacheKey = cacheKey + `item${index}`;
    return {
      key: `item${index}`,
      name: `Item ${index}`,
      icon: icons[index % icons.length],
      checked: checked,
    };
  });
  let result: IOverflowData = {
    primary: dataItems,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    overflow: [] as any[],
  };
  if (cachingEnabled) {
    result = { ...result, cacheKey };
  }
  return result;
};

const buttonStyles: IButtonStyles = {
  root: {
    paddingBottom: 10,
    paddingTop: 10,
    width: 100,
  },
};

const exampleHeight = '40vh';
const resizeRootClassName = mergeStyles({ height: exampleHeight });
const dataToRender = generateData(20, false, false);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onRenderItem = (item: any) => (
  <CommandBarButton
    role="menuitem"
    text={item.name}
    iconProps={{ iconName: item.icon }}
    onClick={item.onClick}
    checked={item.checked}
    styles={buttonStyles}
  />
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onRenderOverflowButton = (overflowItems: any) => (
  <CommandBarButton
    role="menuitem"
    styles={buttonStyles}
    menuIconProps={{ iconName: 'ChevronRight' }}
    menuProps={{ items: overflowItems!, directionalHint: DirectionalHint.rightCenter }}
  />
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onRenderData = (data: any) => (
  <OverflowSet
    role="menubar"
    vertical
    items={data.primary}
    overflowItems={data.overflow.length ? data.overflow : null}
    onRenderItem={onRenderItem}
    onRenderOverflowButton={onRenderOverflowButton}
  />
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onReduceData = (currentData: any): any => {
  if (currentData.primary.length === 0) {
    return undefined;
  }
  const overflow = [...currentData.primary.slice(-1), ...currentData.overflow];
  const primary = currentData.primary.slice(0, -1);
  return { primary, overflow };
};

export const ResizeGroupVerticalOverflowSetExample: React.FunctionComponent = () => (
  <ResizeGroup
    className={resizeRootClassName}
    role="tabpanel"
    aria-label="Vertical Resize Group with an Overflow Set"
    direction={ResizeGroupDirection.vertical}
    data={dataToRender}
    onReduceData={onReduceData}
    onRenderData={onRenderData}
  />
);
