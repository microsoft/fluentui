import * as React from 'react';

import { Spinner } from '@fluentui/react-modern-components-preview/spinner';
import type { SpinnerProps } from '@fluentui/react-modern-components-preview/spinner';

export const Default = (props: Partial<SpinnerProps>): React.ReactNode => <Spinner {...props} />;
