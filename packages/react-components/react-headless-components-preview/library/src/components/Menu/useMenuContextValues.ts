'use client';

import { useMenuContextValues_unstable } from '@fluentui/react-menu';
import type { MenuContextValues, MenuState } from './Menu.types';

export const useMenuContextValues = useMenuContextValues_unstable as (state: MenuState) => MenuContextValues;
