/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import { Icon } from '@fluentui/react';
import { Caption1, ComponentProps, Slot } from '@fluentui/react-components';
import type { FluentProviderProps } from '@fluentui/react-provider';

{
  type Slots = {
    root: NonNullable<Slot<'i'>>;
  };
  type Props = ComponentProps<Partial<Slots>> & { greeting: string; condition: boolean };

  function CustomIcon(props: Props) {
    return <div />;
  }

  function Problem(props: Props) {
    return props.condition ? <CustomIcon {...props} /> : <Icon {...props} />;
  }
}

{
  function Component(props: { textType: React.ComponentType<React.PropsWithChildren<{ className?: string }>> }) {
    return <div />;
  }

  function Problem(props: {}) {
    return <Component textType={Caption1} />;
  }
}

{
  type Props = Pick<FluentProviderProps, 'children'>;
  function Problem(props: Props) {
    return <div>{props.children}</div>;
  }
}
