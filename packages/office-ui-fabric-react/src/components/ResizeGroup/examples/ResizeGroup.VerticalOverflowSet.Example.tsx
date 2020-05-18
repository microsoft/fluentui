import * as React from 'react';
import {
  mergeStyles,
  IContextualMenuItem,
  ResizeGroupDirection,
  CommandBarButton,
  ResizeGroup,
  OverflowSet,
  IButtonStyles,
  DirectionalHint,
  createArray,
} from 'office-ui-fabric-react';
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

const onRenderOverflowButton = (overflowItems: any) => (
  <CommandBarButton
    role="menuitem"
    styles={buttonStyles}
    menuIconProps={{ iconName: 'ChevronRight' }}
    menuProps={{ items: overflowItems!, directionalHint: DirectionalHint.rightCenter }}
  />
);

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

const onReduceData = (currentData: any): any => {
  if (currentData.primary.length === 0) {
    return undefined;
  }
  const overflow = [...currentData.primary.slice(-1), ...currentData.overflow];
  const primary = currentData.primary.slice(0, -1);
  return { primary, overflow, undefined };
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
