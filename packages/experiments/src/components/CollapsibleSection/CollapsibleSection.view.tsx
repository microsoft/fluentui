import * as React from 'react';
import { ICollapsibleSectionProps, ICollapsibleSectionStyles } from './CollapsibleSection.types';
import { RefObject } from 'office-ui-fabric-react';
import { TViewProps } from '../../utilities/createComponent';

export interface ICollapsibleSectionViewOnlyProps {
  collapsed: boolean;
  titleElementRef?: RefObject<HTMLElement>;
  onKeyDown?: (ev: React.KeyboardEvent<Element>) => void;
  onToggleCollapse?: () => void;
  onRootKeyDown?: (ev: React.KeyboardEvent<Element>) => void;
}

// TODO: consolidate in createComponent to automatically take in parent / HOC props?
export type ICollapsibleSectionViewProps = TViewProps<
  ICollapsibleSectionProps & ICollapsibleSectionViewOnlyProps,
  ICollapsibleSectionStyles
>;

export const CollapsibleSectionView = (props: ICollapsibleSectionViewProps) => {
  const { collapsed, titleAs: TitleType, titleProps, children } = props;

  return (
    <div onKeyDown={props.onRootKeyDown}>
      <TitleType
        {...titleProps}
        collapsed={props.collapsed}
        focusElementRef={props.titleElementRef}
        defaultCollapsed={true}
        onToggleCollapse={props.onToggleCollapse}
        onKeyDown={props.onKeyDown}
      />
      <div className={props.styles.body}>{!collapsed && children}</div>
    </div>
  );
};
