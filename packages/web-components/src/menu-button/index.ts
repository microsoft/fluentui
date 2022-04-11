import { css, customElement } from '@microsoft/fast-element';
import { Button } from '../button/button';
import { buttonStyles } from '../button/button.styles';
import { buttonTemplate as template } from './menu-button.template';

/**
 * @internal
 */
class MenuButton extends Button {
  public defaultSlottedContentChanged(): void {
    super.defaultSlottedContentChanged();

    return !this.hasChildNodes() ? this.classList.add('childless') : this.classList.remove('childless');
  }
}

/**
 * A function that returns a Button registration for configuring the component with a DesignSystem.
 * Implements {@link @microsoft/fast-foundation#buttonTemplate}
 *
 *
 * @public
 * @remarks
 * Generates HTML Element: `<fluent-button>`
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
@customElement({
  name: 'fluent-menu-button',
  template,
  styles: css`
    ${buttonStyles}

    :host(.childless) .base {
      padding: 0 !important;
    }

    :host([size='small'].childless) .base {
      min-width: 24px !important;
    }

    :host([size='medium'].childless) .base {
      min-width: 32px !important;
    }

    :host([size='large'].childless) .base {
      min-width: 40px !important;
    }

    .icon-only slot[name='end'] > svg {
      display: none;
    }
  `,
  shadowOptions: {
    delegatesFocus: true,
  },
})
export class FluentMenuButton extends MenuButton {}
