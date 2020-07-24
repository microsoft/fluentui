import { compose, createClassResolver } from '@fluentui/react-compose';
import { CardBase } from './CardBase';
import { CardProps } from './Card.types';
import * as classes from './Card.scss';

export const Card = compose<'div', CardProps, CardProps, {}, {}>(CardBase, {
  classes: createClassResolver(classes),
  displayName: 'Card',
});
