import { createContext } from 'react';
import { ImgIconContextValue } from './types';

export const ImgIconContext = createContext<ImgIconContextValue | undefined>(undefined);
