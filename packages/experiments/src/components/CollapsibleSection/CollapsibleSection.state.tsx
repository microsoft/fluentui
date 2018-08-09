import { createRef } from 'office-ui-fabric-react';
import { ICollapsibleSectionProps, ICollapsibleSectionViewProps } from './CollapsibleSection.types';
import { BaseStateComponent, IBaseStateComponentProps, IStateTransforms } from '../../utilities/BaseState';
import { getRTL, KeyCodes } from '../../Utilities';

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
    onInput: 'onToggleCollapse'
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
      titleElementRef: this._titleElement,
      onKeyDown: this._onKeyDown,
      onRootKeyDown: this._onRootKeyDown
    } as ICollapsibleSectionViewProps;

    return this.props.renderView(viewProps);
  }

  private _onRootKeyDown = (ev: React.KeyboardEvent<Element>) => {
    const rootKey = getRTL() ? KeyCodes.right : KeyCodes.left;
    switch (ev.which) {
      case rootKey:
        if (this._titleElement && this._titleElement.current && ev.target !== this._titleElement.current) {
          this._titleElement.current.focus();
          ev.preventDefault();
          ev.stopPropagation();
        }
        break;

      default:
        break;
    }
  };

  private _onKeyDown = (ev: React.KeyboardEvent<Element>) => {
    const { collapsed } = this.state;
    const collapseKey = getRTL() ? KeyCodes.right : KeyCodes.left;
    const expandKey = getRTL() ? KeyCodes.left : KeyCodes.right;

    switch (ev.which) {
      case collapseKey:
        if (!collapsed) {
          const onToggleCollapse = this.getTransformProps().onToggleCollapse;
          onToggleCollapse && onToggleCollapse();
          break;
        }
        return;

      case expandKey:
        if (collapsed) {
          const onToggleCollapse = this.getTransformProps().onToggleCollapse;
          onToggleCollapse && onToggleCollapse();
          break;
        }
        return;

      default:
        return;
    }

    ev.preventDefault();
    ev.stopPropagation();
  };
}
