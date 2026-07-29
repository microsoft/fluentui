import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { CardPreview } from './CardPreview';
import { Card } from '../Card/Card';
import { isConformant } from '../../testing/isConformant';

describe('CardPreview', () => {
  isConformant({
    Component: CardPreview,
    displayName: 'CardPreview',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    //
    // `component-has-static-classnames-object` is retired by D16.1/D16.6: the statics it
    // asserts are no longer rendered, and `cardPreviewClassNames` is now the retained,
    // marker-valued `{ root: string }` of D16.5. `component-has-group-marker` replaces it —
    // the marker is stamped, and never at `classList[0]` (D15.1 / D16.2).
    disabledTests: ['component-has-static-classnames-object', 'make-styles-overrides-win'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  it('renders a default state', () => {
    const result = render(<CardPreview logo={'Logo slot'}>Default CardPreview</CardPreview>);
    expect(result.container).toMatchSnapshot();
  });

  /*
   * Regression cover for the DOM query in `useCardPreview`, which derives a selectable
   * Card's checkbox label from the preview image. It used to find that image through this
   * component's `fui-CardPreview` BEM static; D16.1 removes the static, so the query was
   * rewritten to scope off the hook's own ref instead (see the comment at the call site).
   *
   * The failure mode being guarded is silent: a stale selector returns `null`, no error is
   * thrown, and the only symptom is an unlabelled checkbox. Nothing else in the suite
   * exercises this path — which is precisely why the statics-removal design flags it as the
   * highest-severity single item in react-card.
   */
  describe('selectable-card a11y label', () => {
    it("labels the selection checkbox from the preview image's alt text", () => {
      const { getByRole } = render(
        <Card selected>
          <CardPreview>
            <img alt="A cat wearing a hat" src="cat.png" />
          </CardPreview>
        </Card>,
      );

      expect(getByRole('checkbox').getAttribute('aria-label')).toEqual('A cat wearing a hat');
    });

    it("points the selection checkbox at the preview image's aria-describedby target", () => {
      const { getByRole } = render(
        <Card selected>
          <CardPreview>
            <img alt="A cat wearing a hat" aria-describedby="cat-caption" src="cat.png" />
          </CardPreview>
          <span id="cat-caption">The hat is small</span>
        </Card>,
      );

      expect(getByRole('checkbox').getAttribute('aria-labelledby')).toEqual('cat-caption');
    });
  });
});
