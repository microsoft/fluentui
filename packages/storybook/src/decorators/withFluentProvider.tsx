import { makeDecorator, addons } from '@storybook/addons';
import { FluentProvider, Telemetry } from '@fluentui/react-provider';
import * as React from 'react';

import { useFluentTheme } from '../knobs/useFluentTheme';

const ProviderWrapper: React.FunctionComponent<{ name: string }> = props => {
  const { theme } = useFluentTheme();
  const telemetryRef = React.useRef(new Telemetry());
  const channel = addons.getChannel();

  React.useEffect(() => {
    channel.emit('fui', telemetryRef.current);
  });

  return (
    <FluentProvider telemetry={telemetryRef.current} theme={theme}>
      {props.children}
    </FluentProvider>
  );
};

export const withFluentProvider = makeDecorator({
  name: 'withFluentProvider',
  parameterName: 'theme',
  skipIfNoParametersOrOptions: false,
  wrapper: (storyFn, context) => {
    return <ProviderWrapper name={context.name}>{storyFn(context)}</ProviderWrapper>;
  },
});
