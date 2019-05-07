import * as React from 'react';

export const PlatformContext = React.createContext('default');

export interface IWithPlatformProps<TPlatforms extends string = string> {
  platform?: TPlatforms;
}

export function withPlatform<TPlatforms extends string = string>(
  Component: React.ComponentType
): React.StatelessComponent<IWithPlatformProps<TPlatforms>> {
  // tslint:disable-next-line no-any
  const ComponentWithPlatform = (props: any) => (
    <PlatformContext.Consumer>{(platform: string) => <Component {...props} platform={platform} />}</PlatformContext.Consumer>
  );
  return ComponentWithPlatform;
}
