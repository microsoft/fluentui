import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Spinner } from '@fluentui/react-components';
import type { SpinnerProps } from '@fluentui/react-components';

export const Default = (props: Partial<SpinnerProps>): JSXElement => <Spinner {...props} />;
