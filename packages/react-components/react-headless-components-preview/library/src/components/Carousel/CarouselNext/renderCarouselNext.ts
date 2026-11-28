import type { JSXElement } from '@fluentui/react-utilities';
import { renderCarouselDirectionButton } from '../CarouselDirectionButton/renderCarouselDirectionButton';
import type { CarouselNextState } from './CarouselNext.types';

export const renderCarouselNext = (state: CarouselNextState): JSXElement | null => renderCarouselDirectionButton(state);
