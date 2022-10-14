import * as React from 'react';
import { InfoButton } from '@fluentui/react-infobutton';
import { Link } from '@fluentui/react-components';
import { bundleIcon, QuestionCircle12Regular, QuestionCircle12Filled } from '@fluentui/react-icons';

export const CustomIcon = () => {
  const Icon = bundleIcon(QuestionCircle12Filled, QuestionCircle12Regular);

  return (
    <InfoButton
      trigger={{ icon: <Icon /> }}
      content={
        <>
          Popover above-start lorem ipsum dolor sit amet consectetur.{' '}
          <Link href="https://react.fluentui.dev">Learn more</Link>
        </>
      }
    />
  );
};

CustomIcon.parameters = {
  docs: {
    description: {
      story: `An InfoButton can be customized with a custom icon.`,
    },
  },
};
