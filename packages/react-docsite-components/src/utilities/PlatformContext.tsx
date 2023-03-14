import * as React from 'react';

export const PlatformContext = React.createContext('default');

export interface IWithPlatformProps<TPlatforms extends string = string> {
  platform?: TPlatforms;
}

export function withPlatform<
  TPlatforms extends string = string,
  TProps extends IWithPlatformProps<TPlatforms> = IWithPlatformProps<TPlatforms>,
>(Component: React.ComponentType<TProps>): React.FunctionComponent<TProps> {
  const ComponentWithPlatform: React.FunctionComponent<TProps> = (props: TProps) => (
    <PlatformContext.Consumer>
      {(platform: string) => <Component {...props} platform={platform} />}
    </PlatformContext.Consumer>
  );
  /* eslint-disable @typescript-eslint/no-explicit-any */
  ComponentWithPlatform.displayName = (Component.displayName || (Component as any).name) + 'WithPlatform';
  return ComponentWithPlatform;
}
