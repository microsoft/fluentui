import { createRef } from 'office-ui-fabric-react';
import { ICollapsibleSectionProps, ICollapsibleSectionViewProps } from './CollapsibleSection.types';
import { BaseStateComponent, IBaseStateComponentProps, IStateTransforms } from '../../utilities/BaseState';

export interface ICollapsibleSectionState {
  collapsed: boolean;
}

export type ICollapsibleSectionStateProps = IBaseStateComponentProps<
  ICollapsibleSectionProps,
  ICollapsibleSectionViewProps
>;

const CollapsibleSectionStateTransforms: IStateTransforms<ICollapsibleSectionProps, ICollapsibleSectionViewProps> = [
  {
    transform: 'toggle',
    prop: 'collapsed',
    defaultValueProp: 'defaultCollapsed',
    defaultValue: true,
    onChange: 'onToggleCollapse'
  }
];

export class CollapsibleSectionState extends BaseStateComponent<
  ICollapsibleSectionProps,
  ICollapsibleSectionViewProps
> {
  private _titleElement = createRef<HTMLElement>();

  constructor(props: IBaseStateComponentProps<ICollapsibleSectionProps, ICollapsibleSectionViewProps>) {
    super(props, CollapsibleSectionStateTransforms);
  }

  public render(): JSX.Element {
    const viewProps = {
      ...this.getTransformProps(),
      titleElementRef: this._titleElement
    } as ICollapsibleSectionViewProps;

    return this.props.renderView(viewProps);
  }
}
