import * as React from 'react';
import * as PropTypes from 'prop-types';

export function provideContext<TContext, TProps>(
  contextTypes: PropTypes.ValidationMap<TContext>,
  mapPropsToContext: (props: TProps) => TContext
): React.ComponentType<TProps> {
  class Provider extends React.Component<TProps> {
    public static readonly childContextTypes: PropTypes.ValidationMap<TContext> = contextTypes;

    public getChildContext(): TContext {
      return mapPropsToContext(this.props);
    }

    public render(): JSX.Element | null {
      return React.Children.only(this.props.children);
    }
  }

  return Provider;
}
