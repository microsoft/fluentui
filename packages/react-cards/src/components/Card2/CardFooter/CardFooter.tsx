import { compose, createClassResolver } from '@fluentui/react-compose';
import { CardSection, CardSectionProps } from '../CardSection';
import * as classes from './CardFooter.scss';

export const CardFooter = compose<'div', CardSectionProps, CardSectionProps, {}, {}>(CardSection, {
  classes: createClassResolver(classes),
  displayName: 'CardFooter',
});
