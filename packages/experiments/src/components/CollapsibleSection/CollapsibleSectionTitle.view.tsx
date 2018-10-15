import * as React from 'react';
import { Text } from '../../Text';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { ICollapsibleSectionTitleComponent } from './CollapsibleSectionTitle.types';

export const CollapsibleSectionTitleView: ICollapsibleSectionTitleComponent['view'] = props => {
  return (
    <button ref={props.focusElementRef} className={props.classNames.root} onClick={props.onClick} onKeyDown={props.onKeyDown}>
      {!props.chevronDisabled && <Icon className={props.classNames.icon} iconName="ChevronDown" />}
      <Text className={props.classNames.text}>{props.text}</Text>
    </button>
  );
};
