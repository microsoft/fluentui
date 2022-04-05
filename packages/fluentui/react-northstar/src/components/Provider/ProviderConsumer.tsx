import { useFluentContext } from '@fluentui/react-bindings';
import { ThemePrepared } from '@fluentui/styles';
import * as PropTypes from 'prop-types';
import * as React from 'react';

export interface ProviderConsumerProps {
  /**
   * Uses the function children pattern to access theme.
   * `theme.siteVariables` contains the siteVariables passed from the nearest Provider.
   */
  render: (theme: ThemePrepared) => React.ReactNode;
}

/**
 * A ProviderConsumer is used to consume Fluent UI context from Provider.
 */
export const ProviderConsumer: React.FunctionComponent<ProviderConsumerProps> = props => {
  const { render } = props;
  const context = useFluentContext();

  return <>{render(context.theme)}</>;
};

ProviderConsumer.displayName = 'ProviderConsumer';
ProviderConsumer.propTypes = {
  render: PropTypes.func.isRequired,
};
