import * as React from 'react';
import {
  ICollapsibleSectionTitleProps,
  ICollapsibleSectionTitleStyles
} from './CollapsibleSectionTitle.types';
import { Icon } from 'office-ui-fabric-react';

export const CollapsibleSectionTitleView = (
  props: ICollapsibleSectionTitleProps & { styles: { [key in keyof ICollapsibleSectionTitleStyles]: string } }
) => {
  return (
    <button
      ref={ props.focusElementRef }
      className={ props.styles.root }
      onClick={ props.onToggleCollapse }
      onKeyDown={ props.onKeyDown }
    >
      { !props.noChevron && (
        <Icon className={ props.styles.icon } iconName='ChevronDown' />
      ) }
      <span className={ props.styles.text }>{ props.text }</span>
    </button>
  );
};
