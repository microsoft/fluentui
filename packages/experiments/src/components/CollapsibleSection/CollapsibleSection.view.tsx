import * as React from 'react';

import {
  ICollapsibleSectionProps,
  ICollapsibleSectionViewProps,
  ICollapsibleSectionStyles
} from './CollapsibleSection.types';
import { CollapsibleSectionTitle } from './CollapsibleSectionTitle';
import { IViewComponentProps } from '../../Foundation';
import { IStyleFunction } from '../../Utilities';

/**
 * @deprecated
 * This is a dummy export used to avoid the "Exported variable X has or is using name Y from eternal module but cannot be named"
 * error. Importing Y is enough to eliminate the export error but generates an unused import error. This dummy export eliminates
 * the unused error. This export and its associated imports should be removed once we upgrade past TS 2.8.
 */
// tslint:disable-next-line:no-any
export type __TYPESCRIPT_2_8_WORKAROUND_ = IStyleFunction<any, any> & ICollapsibleSectionProps;

export const CollapsibleSectionView = (
  props: IViewComponentProps<ICollapsibleSectionViewProps, ICollapsibleSectionStyles>
) => {
  const { collapsed, titleAs: TitleType = CollapsibleSectionTitle, titleProps, children } = props;

  // A helper to call both callbacks
  const onToggleCollapse = () => {
    if (props.titleProps && props.titleProps.onToggleCollapse) {
      props.titleProps.onToggleCollapse();
    }
    if (props.onToggleCollapse) {
      props.onToggleCollapse();
    }
  };

  // TODO: we're stomping on titleProps here with callbacks and ref. need to deal with both
  //        state and user values or limit the props exposed to user.
  return (
    <div className={props.classNames.root} onKeyDown={props.onRootKeyDown}>
      <TitleType
        {...titleProps}
        collapsed={props.collapsed}
        focusElementRef={props.titleElementRef}
        defaultCollapsed={true}
        onToggleCollapse={onToggleCollapse}
        onKeyDown={props.onKeyDown}
      />
      <div className={props.classNames.body}>{!collapsed && children}</div>
    </div>
  );
};
