import * as React from 'react';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import { IContextualMenuItem, IContextualMenuListProps } from 'office-ui-fabric-react/lib/ContextualMenu';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';

import { IActionButtonProps, ICompositeListRowItem, IListRowActionProps, IOverflowMenuItemProps } from './CompositeList.types';

import { getfocusStyle, getListRowActionButtonContainerStyle, getListRowActionButtonStyle } from './CompositeListRow.styles';

export class CompositeListRowActions<T extends ICompositeListRowItem> extends React.PureComponent<IListRowActionProps<T>> {
  public render(): JSX.Element {
    const { ActionItems } = this.props;

    const actionButtons =
      ActionItems &&
      ActionItems.map((actionItem: IActionButtonProps<T>) => {
        actionItem.buttonProps.onClick = (event: React.MouseEvent<HTMLDivElement>): void => {
          actionItem.onClick && actionItem.onClick(actionItem.item, event);
        };

        actionItem.buttonProps.onMenuClick = (event: React.MouseEvent<HTMLDivElement>): void => {
          actionItem.onMenuClick && actionItem.onMenuClick(actionItem.item, event);
        };

        actionItem.buttonProps &&
          actionItem.buttonProps.menuProps &&
          (actionItem.buttonProps.menuProps.onRenderMenuList = (
            menuListProps: IContextualMenuListProps,
            defaultRender: IRenderFunction<IContextualMenuListProps>
          ): JSX.Element => {
            menuListProps.items.map((menuItem: IOverflowMenuItemProps<T>) => {
              menuItem.onRender = (item: IContextualMenuItem, dismissMenu: () => void): JSX.Element => {
                item.onItemClick = (event: React.MouseEvent<HTMLElement>): void => {
                  dismissMenu();
                  menuItem.onItemClick && menuItem.onItemClick(actionItem.item, event);
                };

                return (
                  <ActionButton
                    split={false}
                    iconProps={item.iconProps}
                    title={item.title}
                    ariaDescription={item.text}
                    aria-label={item.text}
                    onClick={item.onItemClick}
                    data-is-focusable={true}
                  >
                    {item.text}
                  </ActionButton>
                );
              };
            });

            return <div>{defaultRender(menuListProps)}</div>;
          });

        return actionItem.buttonProps.menuProps ? (
          <ActionButton
            className={mergeStyles(getfocusStyle())}
            data-is-focusable={true}
            split={false}
            onMenuClick={actionItem.buttonProps.onMenuClick}
            {...actionItem.buttonProps}
            menuProps={{
              onRenderMenuList: actionItem.buttonProps.menuProps.onRenderMenuList,
              items: actionItem.buttonProps.menuProps && actionItem.buttonProps.menuProps.items
            }}
          />
        ) : (
          <div className={mergeStyles(getfocusStyle(), getListRowActionButtonStyle())}>
            <ActionButton
              className={mergeStyles(getListRowActionButtonStyle())}
              onClick={actionItem.buttonProps.onClick}
              split={false}
              {...actionItem.buttonProps}
            />
          </div>
        );
      });

    return (
      <div data-is-focusable={true} className={mergeStyles(getListRowActionButtonContainerStyle())}>
        {actionButtons}
      </div>
    );
  }
}
