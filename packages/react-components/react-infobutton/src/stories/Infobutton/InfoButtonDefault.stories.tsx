import * as React from 'react';
import { InfoButton, InfoButtonProps } from '@fluentui/react-infobutton';
import { Link, Tooltip } from '@fluentui/react-components';

export const Default = (props: Partial<InfoButtonProps>) => (
  <Tooltip content={'hello'} relationship="description">
    <InfoButton
      {...props}
      popoverSurface={
        <>
          Popover above-start lorem ipsum dolor sit amet consectetur.{' '}
          <Link href="https://react.fluentui.dev">Learn more</Link>
        </>
      }
    />
  </Tooltip>
);
