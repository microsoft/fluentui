import * as React from 'react';
import { styled } from '@fluentui/react';
import { IHomePageProps, IHomePageStyles, IHomePageStyleProps } from './HomePage.types';
import { getStyles } from './HomePage.styles';
import { HomePageBase } from './HomePage.base';

export const HomePage: React.FunctionComponent<IHomePageProps> = styled<
  IHomePageProps,
  IHomePageStyleProps,
  IHomePageStyles
>(HomePageBase, getStyles, undefined, { scope: 'HomePage' });
