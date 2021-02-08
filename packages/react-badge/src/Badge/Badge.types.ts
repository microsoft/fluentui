import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utils';

export interface BadgeProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {}

export interface BadgeState extends BadgeProps {}
