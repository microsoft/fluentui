import * as React from 'react';
import * as PropTypes from 'prop-types';
import { GlobalSettings, IChangeDescription } from './GlobalSettings';

// tslint:disable-next-line:no-any
export function customizable(fields: string[]): <P, S>(ComposedComponent: new (props: P, ...args: any[]) => React.Component<P, S>) => any {
  // tslint:disable-next-line:no-shadowed-variable
  return function customizableFactory<P, S>(
    // tslint:disable-next-line:no-any
    ComposedComponent: (new (props: P, ...args: any[]) => React.Component<P, S>)
    // tslint:disable-next-line:no-any
  ): any {
    return class ComponentWithInjectedProps extends React.Component<P, {}> {
      // tslint:disable-next-line:no-inferrable-types
      public static displayName: string = 'Customized' + ComposedComponent.prototype.constructor.name;
      public static contextTypes: {
        injectedProps: PropTypes.Requireable<{}>;
      } = {
        injectedProps: PropTypes.object
      };

      // tslint:disable-next-line:no-any
      constructor(props: P, context: any) {
        super(props, context);

        this._onSettingChanged = this._onSettingChanged.bind(this);
      }

      public componentDidMount(): void {
        GlobalSettings.addChangeListener(this._onSettingChanged);
      }

      public componentWillUnmount(): void {
        GlobalSettings.removeChangeListener(this._onSettingChanged);
      }

      public render(): JSX.Element {
        let defaultProps = {};

        for (let propName of fields) {
          // tslint:disable-next-line:no-any
          (defaultProps as any)[propName] = (this.context.injectedProps) ?
            this.context.injectedProps[propName] :
            GlobalSettings.getValue(propName);
        }

        return (
          // tslint:disable-next-line:no-any
          <ComposedComponent { ...defaultProps } { ...this.props as any } />
        );
      }

      private _onSettingChanged(change: IChangeDescription): void {
        if (fields.indexOf(change.key) >= 0) {
          this.forceUpdate();
        }
      }

    };
  };
}
