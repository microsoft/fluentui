import * as React from 'react';
import {
  BaseComponent,
  css,
  getId,
  autobind
} from 'office-ui-fabric-react/lib/Utilities';
import { ICommandBar, ICommandBarProps, ICommandBarItemProps } from './CommandBar.Props';
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import { OverflowSet, IOverflowSet } from 'office-ui-fabric-react/lib/OverflowSet';
import { ResizeGroup } from 'office-ui-fabric-react/lib/ResizeGroup';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import * as stylesImport from './CommandBar.scss';

// tslint:disable-next-line:no-any
const styles: any = stylesImport;

export interface ICommandBarData {
  /**
   * Items being rendered in the primary region
   */
  primaryItems: ICommandBarItemProps[];
  /**
   * Items being rendered in the overflow
   */
  overflowItems: ICommandBarItemProps[];
  /**
   * Items being rendered on the far side
   */
  farItems: ICommandBarItemProps[] | undefined;
  /**
   * Length of original overflowItems to ensure that they are not moved into primary region on resize
   */
  minimumOverflowItems: number;
  /**
   * Unique string used to cache the width of the command bar
   */
  cacheKey: string;
}

const COMMANDBAR_HEIGHT = '40px';

export class CommandBar extends BaseComponent<ICommandBarProps, {}> implements ICommandBar {
  public static defaultProps: ICommandBarProps = {
    items: [],
    overflowItems: [],
    farItems: [],
    elipisisIconProps: { iconName: 'More' }
  };

  private _overflowSet: IOverflowSet;

  private _id: string;

  constructor(props: ICommandBarProps) {
    super(props);
    this._id = getId('CommandBar');
  }

  public render(): JSX.Element {
    const {
      className,
      items,
      overflowItems,
      farItems,
      elipisisAriaLabel,
      elipisisIconProps,
      buttonStyles,
      onRenderButton = this._onRenderButton,
      onReduceData = this._onReduceData,
      onGrowData = this._onGrowData,
    } = this.props;

    let commandBardata: ICommandBarData = {
      primaryItems: [...items],
      overflowItems: [...overflowItems!],
      minimumOverflowItems: [...overflowItems!].length, // for tracking
      farItems,
      cacheKey: '',
    };

    return (
      <ResizeGroup
        className={ className }
        data={ commandBardata }
        onReduceData={ onReduceData }
        onGrowData={ onGrowData }
        // tslint:disable-next-line:jsx-no-lambda
        onRenderData={ (data: ICommandBarData) => {
          return (
            <div data-foo='1' className={ css('ms-CommandBar', styles.root) }>

              {/*Primary Items*/ }
              <OverflowSet
                componentRef={ this._resolveRef('_overflowSet') }
                className={ css(styles.primarySet) }
                items={ data.primaryItems }
                overflowItems={ data.overflowItems.length ? data.overflowItems : undefined }
                onRenderItem={ this._onRenderItems }
                onRenderOverflowButton={ (renderedOverflowItems: ICommandBarItemProps[]) => {
                  return (
                    onRenderButton({
                      key: 'oveflowButton',
                      styles: { ...buttonStyles, menuIcon: { fontSize: '17px' } },
                      ariaLabel: elipisisAriaLabel,
                      className: css(styles.overflowButton),
                      menuProps: { items: renderedOverflowItems },
                      menuIconProps: elipisisIconProps,
                    })
                  );
                } }
              />

              {/*Secondary Items*/ }
              <OverflowSet
                className={ css(styles.secondarySet) }
                items={ data.farItems }
                onRenderItem={ this._onRenderItems }
                onRenderOverflowButton={ () => null }
              />
            </div>
          );
        } }
      />
    );
  }

  public focus(): void {
    this._overflowSet.focus();
  }

  private _computeCacheKey(primaryItems: ICommandBarItemProps[], farItems: ICommandBarItemProps[], overflow: boolean): string {
    const returnKey = (acc: string, current: ICommandBarItemProps): string => {
      const { cacheKey = current.key } = current;
      return acc + cacheKey;
    };

    const primaryKey = primaryItems.reduce(returnKey, '');
    const farKey = farItems.reduce(returnKey, '');
    const overflowKey = overflow ? 'overflow' : '';

    return [primaryKey, farKey, overflowKey].join(' ');
  }

  @autobind
  private _onReduceData(data: ICommandBarData): ICommandBarData | undefined {
    let { primaryItems, overflowItems, cacheKey, farItems } = data;
    let movedItem = primaryItems[primaryItems.length - 1];

    if (movedItem !== undefined) {
      movedItem.renderedInOverflow = true;

      overflowItems = [...overflowItems, movedItem];
      primaryItems = primaryItems.slice(0, -1);
      cacheKey = this._computeCacheKey(primaryItems, farItems!, !!overflowItems.length);

      return { ...data, primaryItems, overflowItems, cacheKey };
    }

    return undefined;
  }

  @autobind
  private _onGrowData(data: ICommandBarData): ICommandBarData | undefined {
    let { primaryItems, overflowItems, cacheKey, minimumOverflowItems, farItems } = data;
    let movedItem = overflowItems[overflowItems.length - 1];

    // Make sure that moved item exists and is not one of the original overflow items
    if (movedItem !== undefined && overflowItems.length > minimumOverflowItems) {
      movedItem.renderedInOverflow = false;

      overflowItems = overflowItems.slice(0, -1);
      primaryItems = [...primaryItems, movedItem];
      cacheKey = this._computeCacheKey(primaryItems, farItems!, !!overflowItems.length);

      return { ...data, primaryItems, overflowItems, cacheKey };
    }

    return undefined;
  }

  @autobind
  private _onRenderItems(item: ICommandBarItemProps): JSX.Element | React.ReactNode {
    let { buttonStyles } = this.props;

    if (item.onRender) { return item.onRender(item); }
    const commandButtonProps: ICommandBarItemProps = {
      ...item,
      styles: { root: { height: COMMANDBAR_HEIGHT }, ...item.styles, ...buttonStyles },
      className: css(styles.commandButton, item.className),
      text: !item.iconOnly ? item.name : '',
      menuProps: item.subMenuProps,
    };

    if (item.iconOnly && item.name !== undefined) {
      return (
        <TooltipHost content={ item.name } >
          { this._onRenderButton(commandButtonProps) }
        </TooltipHost>
      );
    }

    return this._onRenderButton(commandButtonProps);
  }

  @autobind
  private _onRenderButton(props: ICommandBarItemProps): JSX.Element {
    // tslint:disable-next-line:no-any
    return <CommandBarButton {...props as any} />;
  }
}
