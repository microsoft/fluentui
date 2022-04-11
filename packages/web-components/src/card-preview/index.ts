import { customElement } from '@microsoft/fast-element';
import { CardPreview } from './card-preview';
import { cardPreviewTemplate as template } from './card-preview.template';
import { cardPreviewStyles as styles } from './card-preview.styles';

/**
 * The Card Preview component.
 *
 *
 * @public
 * @remarks
 * Generates HTML Element: `<fluent-card-preview>`
 */
@customElement({
  name: 'fluent-card-preview',
  template,
  styles,
})
export class FluentCardPreview extends CardPreview {}
