import * as React from 'react';
import { IViewComponentProps } from '../../Foundation';
import { IStyleFunction } from '../../Utilities';
import { Text } from '../../Text';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { ICollapsibleSectionTitleProps, ICollapsibleSectionTitleStyles } from './CollapsibleSectionTitle.types';

/**
 * @deprecated
 * This is a dummy export used to avoid the "Exported variable X has or is using name Y from eternal module but cannot be named"
 * error. Importing Y is enough to eliminate the export error but generates an unused import error. This dummy export eliminates
 * the unused error. This export and its associated imports should be removed once we upgrade past TS 2.8.
 */
// tslint:disable-next-line:no-any
export type __TYPESCRIPT_2_8_WORKAROUND_ = IStyleFunction<any, any>;

export const CollapsibleSectionTitleView = (
  props: IViewComponentProps<ICollapsibleSectionTitleProps, ICollapsibleSectionTitleStyles>
) => {
  return (
    <button
      ref={props.focusElementRef}
      className={props.classNames.root}
      onClick={props.onToggleCollapse}
      onKeyDown={props.onKeyDown}
    >
      {!props.chevronDisabled && <Icon className={props.classNames.icon} iconName="ChevronDown" />}
      <Text className={props.classNames.text}>{props.text}</Text>
    </button>
  );
};
