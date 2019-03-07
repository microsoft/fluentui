import { styled } from 'office-ui-fabric-react';
import { SubwayNodeBase } from './SubwayNodeBase';
import { getSubwayNodeStyles } from './SubwayNode.styles';
import { ISubwayNavNodeProps, ISubwayNavNodeStyleProps, ISubwayNavNodeStyles } from './SubwayNode.types';

export const SubwayNode: React.StatelessComponent<ISubwayNavNodeProps> = styled<
  ISubwayNavNodeProps,
  ISubwayNavNodeStyleProps,
  ISubwayNavNodeStyles
>(SubwayNodeBase, getSubwayNodeStyles, undefined);
