import * as React from 'react';
import { styled } from '@fluentui/react';
import { IThemeSlotsPageProps, IThemeSlotsPageStyles, IThemeSlotsPageStyleProps } from './ThemeSlotsPage.types';
import { getStyles } from './ThemeSlotsPage.styles';
import { ThemeSlotsPageBase } from './ThemeSlotsPage.base';

export const ThemeSlotsPage: React.FunctionComponent<IThemeSlotsPageProps> = styled<
  IThemeSlotsPageProps,
  IThemeSlotsPageStyleProps,
  IThemeSlotsPageStyles
>(ThemeSlotsPageBase, getStyles, undefined, { scope: 'ThemeSlotsPage' });
