import { compose, createClassResolver } from '@fluentui/react-compose';
import { CardSection } from '../CardSection/CardSection';
import { CardSectionProps } from '../CardSection/CardSection.types';
import * as classes from './CardBody.scss';

export const CardBody = compose<'div', CardSectionProps, CardSectionProps, {}, {}>(CardSection, {
  classes: createClassResolver(classes),
  displayName: 'CardBody',
});
