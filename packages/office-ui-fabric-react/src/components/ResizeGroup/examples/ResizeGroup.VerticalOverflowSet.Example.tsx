import * as React from 'react';
import {
  BaseComponent,
  mergeStyles,
  IContextualMenuItem,
  ResizeGroupDirection,
  CommandBarButton,
  ResizeGroup,
  OverflowSet,
  IButtonStyles,
  DirectionalHint
} from 'office-ui-fabric-react';

export interface IOverflowData {
  primary: IContextualMenuItem[];
  overflow: IContextualMenuItem[];
  cacheKey?: string;
}

function generateData(count: number, cachingEnabled: boolean, checked: boolean): IOverflowData {
  const icons = ['Add', 'Share', 'Upload'];
  const dataItems = [];
  let cacheKey = '';
  for (let index = 0; index < count; index++) {
    const item = {
      key: `item${index}`,
      name: `Item ${index}`,
      icon: icons[index % icons.length],
      checked: checked
    };

    cacheKey = cacheKey + item.key;
    dataItems.push(item);
  }

  let result: IOverflowData = {
    primary: dataItems,
    overflow: [] as any[]
  };

  if (cachingEnabled) {
    result = { ...result, cacheKey };
  }

  return result;
}

// Styles for the vertical buttons
const buttonStyles: IButtonStyles = {
  root: {
    paddingBottom: 10,
    paddingTop: 10,
    width: 100
  }
};

// Styles for the container of the ResizeGroup
// This is only for the example to be constrained to a certain height to demonstrate the resizing
const exampleHeight = '40vh';
const resizeRootClassName = mergeStyles({ height: exampleHeight });

export class ResizeGroupVerticalOverflowSetExample extends BaseComponent {
  public render(): JSX.Element {
    const dataToRender = generateData(20, false, false);
    return (
      <ResizeGroup
        className={resizeRootClassName}
        role="tabpanel"
        aria-label="Vertical Resize Group with an Overflow Set"
        direction={ResizeGroupDirection.vertical}
        data={dataToRender}
        onReduceData={this._onReduceData}
        // tslint:disable-next-line:jsx-no-lambda
        onRenderData={data => {
          return (
            <OverflowSet
              vertical={true}
              items={data.primary}
              overflowItems={data.overflow.length ? data.overflow : null}
              onRenderItem={item => {
                return (
                  <CommandBarButton
                    text={item.name}
                    iconProps={{ iconName: item.icon }}
                    onClick={item.onClick}
                    checked={item.checked}
                    styles={buttonStyles}
                  />
                );
              }}
              onRenderOverflowButton={overflowItems => {
                return (
                  <CommandBarButton
                    styles={buttonStyles}
                    menuIconProps={{ iconName: 'ChevronRight' }}
                    menuProps={{ items: overflowItems!, directionalHint: DirectionalHint.rightCenter }}
                  />
                );
              }}
            />
          );
        }}
      />
    );
  }

  private _onReduceData = (currentData: any): any => {
    if (currentData.primary.length === 0) {
      return undefined;
    }

    const overflow = [...currentData.primary.slice(-1), ...currentData.overflow];
    const primary = currentData.primary.slice(0, -1);

    return { primary, overflow, undefined };
  };
}
