import { BaseComponentMin, IBaseProps } from './BaseComponentMin';
import { IStateComponentProps } from '../Foundation';

export interface IBaseStateOptions<TViewProps, TState> {
  controlledProps: (keyof TState)[];
  transformViewProps: (newProps: TViewProps) => TViewProps;
}

export class BaseState<TComponentProps extends IBaseProps, TViewProps, TState> extends BaseComponentMin<
  IStateComponentProps<TComponentProps, TViewProps>,
  TState
> {
  private _controlledProps: (keyof TState)[];
  private _transformViewProps: (newProps: TViewProps) => TViewProps;

  constructor(props: IStateComponentProps<TComponentProps, TViewProps>, options: Partial<IBaseStateOptions<TViewProps, TState>> = {}) {
    super(props);
    this._controlledProps = options.controlledProps || [];
    this._transformViewProps =
      options.transformViewProps ||
      ((newProps: TViewProps) => {
        return newProps;
      });
  }

  public componentWillReceiveProps(newProps: IStateComponentProps<TComponentProps, TViewProps>): void {
    for (const propName of this._controlledProps) {
      // tslint:disable-next-line:no-any
      const controlledPropValue = (newProps as any)[propName];

      if (controlledPropValue !== undefined && controlledPropValue !== this.state[propName]) {
        // TODO: should we consolidate this into one setState call?
        this.setState({
          [propName]: controlledPropValue
          // tslint:disable-next-line:no-any
        } as any);
      }
    }
  }

  public render(): JSX.Element | null {
    const controlledProps = this._getControlledProps();

    let newProps = {
      ...(this.state as {}),
      ...(controlledProps as {})
    } as TViewProps;

    // Need to spread controlledProps again to make sure transformViewProps does not overwrite any controlled props.
    // TODO: better way to do this than two spreads? filtered write? pass "setState" helper to transformViewProps?
    newProps = {
      ...(this._transformViewProps(newProps) as {}),
      ...(controlledProps as {})
    } as TViewProps;

    return this.props.renderView(newProps);
  }

  private _getControlledProps(): Partial<TViewProps> {
    const result: Partial<TViewProps> = {};

    for (const propName of this._controlledProps) {
      // tslint:disable-next-line:no-any
      const value = (this.props as any)[propName];

      if (value !== undefined) {
        // tslint:disable-next-line:no-any
        (result as any)[propName] = value;
      }
    }

    return result;
  }
}
