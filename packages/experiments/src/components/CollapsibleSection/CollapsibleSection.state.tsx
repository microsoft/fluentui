import { createRef } from 'office-ui-fabric-react';
import { ICollapsibleSectionProps, ICollapsibleSectionViewProps } from './CollapsibleSection.types';
import { BaseStateComponent, IBaseStateComponentProps } from '../../utilities/BaseState';

export interface ICollapsibleSectionState {
  collapsed: boolean;
}

export type ICollapsibleSectionStateProps = IBaseStateComponentProps<
  ICollapsibleSectionProps,
  ICollapsibleSectionViewProps
>;

export class CollapsibleSectionState extends BaseStateComponent<
  ICollapsibleSectionProps,
  ICollapsibleSectionViewProps
> {
  public static defaultProps: Partial<ICollapsibleSectionStateProps> = {
    transforms: [
      {
        transform: 'toggle',
        prop: 'collapsed',
        defaultValue: true,
        onChange: 'onToggleCollapse'
      }
    ]
  };

  private _titleElement = createRef<HTMLElement>();

  public render(): JSX.Element {
    const viewProps = {
      ...this.getTransformProps(),
      titleElementRef: this._titleElement
    } as ICollapsibleSectionViewProps;

    return this.props.renderView(viewProps);
  }
}
