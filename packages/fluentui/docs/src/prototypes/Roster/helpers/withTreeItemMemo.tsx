import * as React from 'react';
import { TreeItem, TreeItemProps } from '@fluentui/react-northstar';
import { pick } from 'lodash';
import { omit } from './utils';
import { rosterTreeItemStyles } from '../styles/styles';

export const withTreeItemMemo: <T extends React.JSXElementConstructor<React.ComponentProps<T>>>(
  Constructor: T,
  customItemPropsArray: (keyof React.ComponentProps<T>)[],
) => React.FunctionComponent<React.ComponentProps<typeof TreeItem> & React.ComponentProps<T>> = (
  Constructor,
  customItemPropsArray,
) =>
  React.memo<React.ComponentProps<typeof Constructor>>(props => {
    const customItemProps = pick(props, customItemPropsArray) as React.ComponentProps<typeof Constructor>;
    const treeItemProps = omit(props, customItemPropsArray) as TreeItemProps;

    return <TreeItem styles={rosterTreeItemStyles} {...treeItemProps} title={<Constructor {...customItemProps} />} />;
  });
