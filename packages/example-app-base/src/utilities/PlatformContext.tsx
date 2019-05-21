import * as React from 'react';

export const PlatformContext = React.createContext('default');

export interface IWithPlatformProps<TPlatforms extends string = string> {
  platform?: TPlatforms;
}

export function withPlatform<
  TPlatforms extends string = string,
  TProps extends IWithPlatformProps<TPlatforms> = IWithPlatformProps<TPlatforms>
>(Component: React.ComponentType<TProps>): React.StatelessComponent<IWithPlatformProps<TPlatforms>> {
  const ComponentWithPlatform: React.StatelessComponent = (props: TProps & { children?: React.ReactNode }) => (
    <PlatformContext.Consumer>{(platform: string) => <Component {...props} platform={platform} />}</PlatformContext.Consumer>
  );
  // tslint:disable no-any
  ComponentWithPlatform.displayName = (Component.displayName || (Component as any).name) + 'WithPlatform';
  return ComponentWithPlatform;
}
