import { compose, createClassResolver } from '@fluentui/react-compose';
import { CardSection, CardSectionProps } from '../CardSection';
import * as classes from './CardPreview.scss';

export const CardPreview = compose<'div', CardSectionProps, CardSectionProps, {}, {}>(CardSection, {
  classes: createClassResolver(classes),
  displayName: 'CardPreview',
});
