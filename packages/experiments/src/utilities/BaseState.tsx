import * as React from 'react';

export interface IBaseStateOptions<TState> {
  controlledProps: (keyof TState)[];
}

export class BaseState<TProps, TState> extends React.Component<TProps, TState> {
  private _controlledProps: (keyof TState)[];

  constructor(props: TProps, options: Partial<IBaseStateOptions<TState>> = {}) {
    super(props);
    this._controlledProps = options.controlledProps || [];
  }

  public componentWillReceiveProps(newProps: TProps): void {
    for (const propName of this._controlledProps) {
      // tslint:disable-next-line:no-any
      const controlledPropValue = (newProps as any)[propName];

      if (controlledPropValue !== undefined && controlledPropValue !== this.state[propName]) {
        this.setState({
          [propName]: controlledPropValue
          // tslint:disable-next-line:no-any
        } as any);
      }
    }
  }

  public render(): JSX.Element | null {
    // tslint:disable-next-line:no-any
    const { renderView, ...rest } = this.props as any;

    const newProps: TProps = {
      ...rest,
      ...(this.state as {}),
      ...this._getControlledProps()
    };

    return renderView(newProps);
  }

  private _getControlledProps(): {} {
    const result = {};

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
