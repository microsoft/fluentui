import * as React from 'react';
import { Badge, BadgeProps } from '@fluentui/react-badge';
import * as classes from '../react-badge.stories.scss';

const BadgeExamples = (props: BadgeProps) => <Badge {...props}>Hello World!</Badge>;

export const BadgeExample = () => <BadgeExamples />;
