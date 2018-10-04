import * as React from 'react';

import { ICollapsibleSectionComponent } from './CollapsibleSection.types';
import { CollapsibleSectionTitle } from './CollapsibleSectionTitle';

export const CollapsibleSectionView: ICollapsibleSectionComponent['view'] = props => {
  const {
    collapsed,
    titleAs: TitleType = CollapsibleSectionTitle,
    titleElementRef,
    titleProps,
    children,
    onClick,
    onKeyDown,
    indent
  } = props;

  // TODO: we're stomping on titleProps here with callbacks and ref. need to deal with both
  //        state and user values or limit the props exposed to user.
  return (
    <div className={props.classNames.root} onKeyDown={props.onRootKeyDown}>
      <TitleType
        {...titleProps}
        collapsed={props.collapsed}
        focusElementRef={titleElementRef}
        defaultCollapsed={true}
        onClick={onClick}
        onKeyDown={onKeyDown}
        indent={indent}
      />
      <div className={props.classNames.body}>{!collapsed && children}</div>
    </div>
  );
};
