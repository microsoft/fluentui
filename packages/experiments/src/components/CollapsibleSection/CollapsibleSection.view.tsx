import * as React from 'react';

import { ICollapsibleSectionComponent } from './CollapsibleSection.types';
import { CollapsibleSectionTitle } from './CollapsibleSectionTitle';

export const CollapsibleSectionView: ICollapsibleSectionComponent['view'] = props => {
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
