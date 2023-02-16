import * as React from 'react';
import { InfoButton, InfoButtonProps } from '@fluentui/react-infobutton';
import { Link } from '@fluentui/react-components';

export const Default = (props: Partial<InfoButtonProps>) => (
  <InfoButton
    {...props}
    content={
      <>
        This is example content for an InfoButton. <Link href="https://react.fluentui.dev">Learn more</Link>
      </>
    }
  />
);
