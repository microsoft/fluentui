import { styled } from 'office-ui-fabric-react';
import { SubwayNavBase } from './SubwayNavBase';
import { getSubwayNavStyles } from './SubwayNav.styles';
import { ISubwayNavProps, ISubwayNavStyles } from './SubwayNav.types';

export const SubwayNav: React.FunctionComponent<ISubwayNavProps> = styled<ISubwayNavProps, {}, ISubwayNavStyles>(
  SubwayNavBase,
  getSubwayNavStyles,
  undefined
);
