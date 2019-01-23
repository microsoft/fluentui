import * as React from 'react';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { ICommandBarProps } from 'office-ui-fabric-react/lib/CommandBar';
import { IDetailsListProps, IDetailsRowProps } from 'office-ui-fabric-react/lib/DetailsList';
import { IOverflowSetItemProps } from 'office-ui-fabric-react/lib/OverflowSet';
import { DefaultPalette, IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';

import { CompositeList, ICompositeListColumn } from '../CompositeList';
import { IActionButtonProps } from '../CompositeList.types';
import { CompositeListRow } from '../CompositeListRow';

export class DummyUserModel {
  public id!: string;
  public key!: string;
  public displayName!: string;
  public userName!: string;
  public note!: string;
  public isGuest!: boolean;
}

function generateDummyUserData(count: number): DummyUserModel[] {
  const dummyData = [];
  for (let index = 0; index < count; index++) {
    dummyData.push({
      id: `TestUserID_${index}`,
      key: `Test User Key ${index}`,
      displayName: `Test User DisplayName ${index}`,
      userName: `testUser${index}@mymicrosofttenant.com`,
      note: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint aperiam repellat illum recusandae aliquid dicta sed,
      veniam iure tempore nisi nam consectetur eligendi voluptatum perspiciatis aspernatur odio et mollitia eos!`,
      isGuest: false
    });
  }
  return dummyData;
}

function getRowActionOverFlowItems<T>(): IOverflowSetItemProps[] {
  const overFlowItems = [];
  overFlowItems.push({
    key: 'delete',
    text: 'Delete',
    title: 'Delete',
    iconProps: { iconName: 'Delete' },
    onItemClick: (item: T): void => {
      console.log('action - delete item', item);
    }
  });
  overFlowItems.push({
    key: 'license',
    text: 'Manage license',
    title: 'Manage license',
    iconProps: { iconName: 'Assign' },
    onItemClick: (item: T): void => {
      console.log('action - manage license', item);
    }
  });
  overFlowItems.push({
    key: 'editRoles',
    text: 'Edit roles',
    title: 'Edit roles',
    iconProps: { iconName: 'AccountManagement' },
    onItemClick: (item: T): void => {
      console.log('action - edit roles', item);
    }
  });
  return overFlowItems;
}

const actionResetPassword: IButtonProps = {
  name: 'reset',
  iconProps: { iconName: 'Permissions' },
  title: 'Reset Password'
};

function getActionOverflowMenu(): IButtonProps {
  return {
    name: 'overflow',
    iconProps: { iconName: 'MoreVertical' },
    title: 'More Actions',
    menuProps: { items: getRowActionOverFlowItems() }
  };
}

function getActionItems<T>(rowItem: T): IActionButtonProps<T>[] {
  const actionItems = [];
  actionItems.push({
    key: 'reset',
    buttonProps: actionResetPassword,
    item: rowItem,
    onClick: (item: T): void => {
      console.log('reset password for item', item);
    }
  });
  actionItems.push({
    key: 'overflow',
    buttonProps: getActionOverflowMenu(),
    item: rowItem,
    onMenuClick: (item: T): void => {
      console.log('click on Overflow Menu for item', item);
    }
  });

  return actionItems;
}

const columns: ICompositeListColumn[] = [
  {
    key: 'displayName',
    name: 'Display Name',
    minWidth: 200,
    maxWidth: 500,
    fieldName: 'displayName',
    isResizable: true
  },
  {
    key: 'userName',
    name: 'User Name',
    minWidth: 200,
    maxWidth: 500,
    fieldName: 'userName',
    isResizable: true
  },
  {
    key: 'note',
    name: 'Notes',
    minWidth: 200,
    maxWidth: 500,
    fieldName: 'note',
    isResizable: true
  }
];

const commandBarItems = [
  {
    key: 'add',
    name: 'Add',
    iconProps: { iconName: 'AddFriend' }
  }
];

export const commandBarWrapperExampleClassStyle = (): IStyle => {
  return {
    displayName: 'CommandBarWrapper',
    position: 'unset',
    top: 0,
    left: 0,
    zIndex: 1,
    selectors: {
      '&::before': {
        backgroundColor: DefaultPalette.white,
        position: 'absolute',
        left: '-48px',
        top: '0px',
        content: '""',
        height: '40px',
        width: '48px'
      },
      '&::after': {
        backgroundColor: DefaultPalette.white,
        position: 'absolute',
        right: '-48px',
        top: '0px',
        content: '""',
        height: '40px',
        width: '48px'
      },
      '@supports (-ms-ime-align: auto)': {
        left: '48px'
      }
    }
  };
};

export class CompositeListExample extends React.PureComponent<{}, { items: DummyUserModel[] }> {
  constructor(props: never) {
    super(props);
    this.state = {
      items: []
    };

    this._onItemInvoked = this._onItemInvoked.bind(this);
    this._onActiveItemChanged = this._onActiveItemChanged.bind(this);
    this._onRenderRow = this._onRenderRow.bind(this);
  }
  public render(): React.ReactNode {
    const detailsListProps: IDetailsListProps = {
      items: this.state.items,
      columns: columns,
      onItemInvoked: this._onItemInvoked,
      onActiveItemChanged: this._onActiveItemChanged,
      onRenderRow: this._onRenderRow
    };
    const commandBarProps: ICommandBarProps = {
      items: commandBarItems
    };
    return <CompositeList detailsListProps={detailsListProps} commandBarProps={commandBarProps} />;
  }

  public componentDidMount(): void {
    setTimeout(() => {
      this.setState({
        items: generateDummyUserData(2000)
      });
    }, 2000);
  }

  private _onItemInvoked = () => {
    console.log('item invoked');
  };

  private _onActiveItemChanged = () => {
    console.log('active item changed');
  };

  private _onRenderRow = (rowProps: IDetailsRowProps, defaultRender: IRenderFunction<IDetailsRowProps>): JSX.Element => {
    return (
      <CompositeListRow
        actionKey="displayName"
        renderFunction={defaultRender}
        rowProps={rowProps}
        actionItems={getActionItems(rowProps.item)}
      />
    );
  };
}
