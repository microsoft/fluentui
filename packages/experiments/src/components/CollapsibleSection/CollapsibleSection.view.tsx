import * as React from 'react';

import {
  ICollapsibleSectionProps,
  ICollapsibleSectionViewProps,
  ICollapsibleSectionStyles
} from './CollapsibleSection.types';
import { CollapsibleSectionTitle } from './CollapsibleSectionTitle';
import { IViewComponentProps } from '../../Foundation';
import { IStyleFunction } from '../../Utilities';
import { getRTL, KeyCodes } from '../../Utilities';

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

  const onRootKeyDown = (ev: React.KeyboardEvent<Element>) => {
    const rootKey = getRTL() ? KeyCodes.right : KeyCodes.left;
    switch (ev.which) {
      case rootKey:
        if (props.titleElementRef && props.titleElementRef.value && ev.target !== props.titleElementRef.value) {
          props.titleElementRef.value.focus();
          ev.preventDefault();
          ev.stopPropagation();
        }
        break;

      default:
        break;
    }
  };

  const onToggleCollapse = () => {
    if (props.titleProps && props.titleProps.onToggleCollapse) {
      props.titleProps.onToggleCollapse();
    }
    if (props.onToggleCollapse) {
      props.onToggleCollapse();
    }
  };

  const onKeyDown = (ev: React.KeyboardEvent<Element>) => {
    const collapseKey = getRTL() ? KeyCodes.right : KeyCodes.left;
    const expandKey = getRTL() ? KeyCodes.left : KeyCodes.right;

    switch (ev.which) {
      case collapseKey:
        if (!collapsed) {
          if (onToggleCollapse) {
            onToggleCollapse();
          }
          break;
        }
        return;

      case expandKey:
        if (collapsed) {
          if (onToggleCollapse) {
            onToggleCollapse();
          }
          break;
        }
        return;

      default:
        return;
    }

    ev.preventDefault();
    ev.stopPropagation();
  };

  return (
    <div className={props.classNames.root} onKeyDown={onRootKeyDown}>
      <TitleType
        {...titleProps}
        collapsed={props.collapsed}
        focusElementRef={props.titleElementRef}
        defaultCollapsed={true}
        onToggleCollapse={onToggleCollapse}
        onKeyDown={onKeyDown}
      />
      <div className={props.classNames.body}>{!collapsed && children}</div>
    </div>
  );
};
