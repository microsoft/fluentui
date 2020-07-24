import { compose, createClassResolver } from '@fluentui/react-compose';
import { CardSection, CardSectionProps } from '../CardSection';
import * as classes from './CardHeader.scss';

export const CardHeader = compose<'div', CardSectionProps, CardSectionProps, {}, {}>(CardSection, {
  classes: createClassResolver(classes),
  displayName: 'CardHeader',
});
