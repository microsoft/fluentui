import * as React from 'react';
import { PresenceComponentProps } from './createPresenceComponent';
import { PresenceOverride } from '../types';

// TODO: handle typing of custom props within PresenceComponentProps
export const createPresenceVariant = <PresenceComponent extends React.FC<PresenceComponentProps>>({
  component,
  override,
}: {
  component: PresenceComponent;
  override: PresenceOverride;
}) => {
  return (props: React.ComponentProps<PresenceComponent>) => component({ ...props, override });
};
