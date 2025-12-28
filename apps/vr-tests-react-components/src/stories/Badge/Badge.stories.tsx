import * as React from 'react';
import { Steps, type StoryParameters } from 'storywright';
import { Badge } from '@fluentui/react-badge';
import { CircleRegular } from '@fluentui/react-icons';
import type { Meta } from '@storybook/react';
import type { JSXElement } from '@fluentui/react-utilities';

export default {
  title: 'Badge Converged',
  parameters: { storyWright: { steps: new Steps().snapshot('normal').end() } } satisfies StoryParameters,
} satisfies Meta<typeof Badge>;

/**
 * Tests that badge icons have correct margins when badge content is falsy values (null, 0, empty string, false).
 */
export const WithFalsyContent = (): JSXElement => {
  return (
    <>
      {[null, 0, '', false].map((content, index) => (
        <Badge key={index} icon={<CircleRegular />}>
          {content}
        </Badge>
      ))}
    </>
  );
};

WithFalsyContent.storyName = 'with falsy content';
