import * as React from 'react';
import { Progress } from '../../components/Progress/Progress';
import { ProgressProps } from '../../components/Progress/Progress.types';

export const Default = (props: Partial<ProgressProps>) => <Progress {...props} />;
