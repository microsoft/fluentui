import { compose, createClassResolver } from '@fluentui/react-compose';
import { CardSection, CardSectionProps } from '../CardSection';
import * as classes from './CardBody.scss';

export const CardBody = compose<'div', CardSectionProps, CardSectionProps, {}, {}>(CardSection, {
  classes: createClassResolver(classes),
  displayName: 'CardBody',
});
