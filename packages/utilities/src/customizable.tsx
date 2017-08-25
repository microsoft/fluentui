import * as React from 'react';
import * as PropTypes from 'prop-types';
import { GlobalSettings, IChangeDescription } from './GlobalSettings';

export function customizable(fields: string[]): any {
  // tslint:disable-next-line:no-shadowed-variable
  return function customizableFactory<P, S>(
    ComposedComponent: (new (props: P, ...args: any[]) => React.Component<P, S>)
  ): any {
    return class ComponentWithInjectedProps extends React.Component<P, {}> {
      public static contextTypes: {
        injectedProps: PropTypes.Requireable<any>;
      } = {
        injectedProps: PropTypes.object
      };

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
          (defaultProps as any)[propName] = (this.context.injectedProps) ?
            this.context.injectedProps[propName] :
            GlobalSettings.getValue(propName);
        }

        return (
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
