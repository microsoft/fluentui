import { IStateComponentProps } from '../Foundation';
import { BaseComponent } from '../Utilities';

// TODO: add transforms and flesh out typing
export type ITransform<TViewProps> = {
  /**
   * Available transforms.
   */
  transform: 'toggle';
  /**
   * Name of prop that transform should change. Must exist in TViewProps.
   */
  prop: keyof TViewProps;
  /**
   * Default value for prop.
   */
  defaultValue?: boolean;
  /**
   * Callback as input into transform indicating change. Must exist in TViewProps.
   */
  onChange: keyof TViewProps;
};

export type IStateTransforms<TViewProps> = (ITransform<TViewProps>)[];

export type IBaseStateComponentProps<TComponentProps, TViewProps> = IStateComponentProps<
  TComponentProps,
  TViewProps
> & {
  transforms: IStateTransforms<TViewProps>;
};

// TODO: One or the other of these solutions should work in TS. TypeScript is preventing use of
//        keyof against generic types throughout this file.
//        https://github.com/Microsoft/TypeScript/issues/13948
// export type IBaseStateComponentState<TViewProps> = Partial<TViewProps>;
export type IBaseStateComponentState<TViewProps> = {
  // [key in keyof TViewProps]?: TViewProps[key];
  // tslint:disable:no-any
  [key in keyof TViewProps]?: any
};

export class BaseStateComponent<TComponentProps, TViewProps> extends BaseComponent<
  IBaseStateComponentProps<TComponentProps, TViewProps>,
  IBaseStateComponentState<TViewProps>
> {
  constructor(props: IBaseStateComponentProps<TComponentProps, TViewProps>) {
    super(props);

    const stateObject: IBaseStateComponentState<TViewProps> = {};

    props.transforms.forEach((transform: ITransform<TViewProps>) => {
      stateObject[transform.prop] = transform.defaultValue;
      stateObject[transform.onChange] = this._onToggle(transform.prop);
    });

    this.state = stateObject;
  }

  public render(): JSX.Element {
    // createComponent will automatically give priority to any values passed by parent, overriding these state values
    //    and automatically turning this component into a controlled component.
    return this.props.renderView(this.getTransformProps());
  }

  protected getTransformProps(): TViewProps {
    return this.state;
  }

  private _onToggle = (prop: keyof TViewProps) => {
    return () => {
      // TODO: TypeScript issue where using keyof on generic type widens to string errors on simpler version of setState
      //  https://github.com/Microsoft/TypeScript/issues/13948
      // this.setState((state: IBaseStateComponentState<TViewProps>) => ({ [prop]: !state[prop] }));
      // tslint:disable:no-any
      this.setState((state: IBaseStateComponentState<TViewProps>): any => ({ [prop]: !state[prop] }));
    };
  };
}
