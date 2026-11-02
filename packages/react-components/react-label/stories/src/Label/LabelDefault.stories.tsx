import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Label } from '@fluentui/react-components';
import type { LabelProps } from '@fluentui/react-components';

export const Default = (props: LabelProps): JSXElement => <Label {...props}>This is a label</Label>;
