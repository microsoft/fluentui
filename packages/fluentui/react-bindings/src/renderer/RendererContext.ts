import { createFelaRenderer, type CreateRenderer } from '@fluentui/react-northstar-fela-renderer';
import * as React from 'react';

export const RendererContext = React.createContext<CreateRenderer>(createFelaRenderer());
