import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Calendar } from '@fluentui/react-calendar-compat';
import type { CalendarProps } from '@fluentui/react-calendar-compat';

export const Default = (props: CalendarProps): JSXElement => <Calendar {...props} />;
