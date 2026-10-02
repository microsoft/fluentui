import * as React from 'react';
import type { PositioningProps } from '@fluentui/react-headless-components-preview/positioning';

/**
 * Helper component used by Storybook to auto-generate the positioning props args table.
 *
 * Every option of the canonical contract is accepted; options that CSS anchor positioning cannot
 * express take effect only when a positioning `engine` is supplied (see the Engine example).
 */
export const Positioning: React.FC<PositioningProps> = () => <div />;
