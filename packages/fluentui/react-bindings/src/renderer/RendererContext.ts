import { createFelaRenderer } from '@fluentui/react-northstar-fela-renderer';
import { CreateRenderer } from '@fluentui/react-northstar-styles-renderer';
import * as React from 'react';

export const RendererContext = React.createContext<CreateRenderer>(createFelaRenderer());
