import * as React from 'react';
import { IStateComponentProps } from '../Foundation';

export interface IBaseStateOptions<TState> {
  controlledProps: (keyof TState)[];
}

export class BaseState<TComponentProps, TViewProps, TState> extends React.Component<
  IStateComponentProps<TComponentProps, TViewProps>,
  TState
> {
  private _controlledProps: (keyof TState)[];

  constructor(props: IStateComponentProps<TComponentProps, TViewProps>, options: Partial<IBaseStateOptions<TState>> = {}) {
    super(props);
    this._controlledProps = options.controlledProps || [];
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
    const newProps = {
      ...(this.state as {}),
      ...(this._getControlledProps() as {})
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
