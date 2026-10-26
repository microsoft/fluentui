import * as React from 'react';
import { Canvas, useOf } from '@storybook/addon-docs/blocks';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import type { JSXElement } from '@fluentui/react-utilities';

import { getOpenInPlaygroundAction } from '../decorators/withOpenInPlaygroundButton';

/** Composes the public Canvas block instead of replacing Storybook's source controls. */
export const PlaygroundCanvas = (props: React.ComponentProps<typeof Canvas>): JSXElement => {
  const { story } = useOf(props.of ?? 'story', ['story']);
  const { targetDocument } = useFluent_unstable();
  const action = getOpenInPlaygroundAction(story, targetDocument, false);
  const existingActions = props.additionalActions ?? story.parameters.docs?.canvas?.additionalActions ?? [];

  return <Canvas {...props} additionalActions={action ? [...existingActions, action] : existingActions} />;
};
