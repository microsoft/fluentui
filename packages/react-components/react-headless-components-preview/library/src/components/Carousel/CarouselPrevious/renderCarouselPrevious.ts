import type { JSXElement } from '@fluentui/react-utilities';
import { renderCarouselDirectionButton } from '../CarouselDirectionButton/renderCarouselDirectionButton';
import type { CarouselPreviousState } from './CarouselPrevious.types';

export const renderCarouselPrevious = (state: CarouselPreviousState): JSXElement | null =>
  renderCarouselDirectionButton(state);
