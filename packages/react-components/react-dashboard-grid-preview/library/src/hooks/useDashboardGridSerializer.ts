'use client';

import * as React from 'react';
import { useRequiredDashboardGridProviderContext_unstable } from '../contexts';
import type { DashboardGridSerializer } from '../serialization/serializerRegistry';

export const useDashboardGridSerializer = <TValue, TSerialized>(
  key: string,
  serializer: DashboardGridSerializer<TValue, TSerialized>,
): void => {
  const registry = useRequiredDashboardGridProviderContext_unstable(context => context.registry.serializers);

  React.useEffect(() => registry.register(key, serializer), [key, registry, serializer]);
};
