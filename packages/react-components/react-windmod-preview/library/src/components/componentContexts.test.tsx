import * as React from 'react';
import { render } from '@testing-library/react';
import { AvatarContextProvider } from '@fluentui/react-headless-components-preview/avatar';
import { ButtonContextProvider } from '@fluentui/react-headless-components-preview/button';
import { LinkContextProvider } from '@fluentui/react-headless-components-preview/link';

import { Avatar } from './Avatar';
import { Button } from './Button';
import { CompoundButton } from './CompoundButton';
import { Field } from './Field';
import { Input } from './Input';
import { InteractionTag } from './InteractionTag';
import { InteractionTagPrimary } from './InteractionTagPrimary';
import { InteractionTagSecondary } from './InteractionTagSecondary';
import { Link } from './Link';
import { MenuButton } from './MenuButton';
import { ProgressBar } from './ProgressBar';
import { SearchBox } from './SearchBox';
import { Select } from './Select';
import { SpinButton } from './SpinButton';
import { SplitButton } from './SplitButton';
import { Tag } from './Tag';
import { TagGroup } from './TagGroup';
import { Textarea } from './Textarea';
import { ToggleButton } from './ToggleButton';
import { Toolbar } from './Toolbar';
import { ToolbarButton } from './ToolbarButton';

/**
 * Component-context parity. Each block covers one wiring site: the component reads the context its
 * Griffel counterpart reads, with the merge semantics `mergeContextProps` owns — the container is a
 * default, a local prop still wins, and a component Griffel does NOT wire stays unmoved.
 *
 * These live in one file rather than nine because they exercise one cross-cutting feature through
 * one helper; splitting them would duplicate every provider harness nine times.
 */
// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts. Button is the one
// wiring site with no component test file of its own, so this is its only frozen coverage; the
// other sites carry the guard in their own specs where they materialise slot state (MenuButton,
// Avatar, Select, Tag, Field). `...actual` keeps ButtonContextProvider, imported above from this
// same subpath, pointing at the real provider.
jest.mock('@fluentui/react-headless-components-preview/button', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/button');
  const { deepFreezeState } = require('../testing/freezeState');

  return {
    ...actual,
    useButton: (...args: Parameters<typeof actual.useButton>) => deepFreezeState(actual.useButton(...args)),
  };
});

/**
 * Scoped Avatar lookup. A paired context-vs-control assertion renders twice, and both renders share
 * `document.body` — which is what the render result's own `getByRole` queries — so the scoped
 * `container` is the only way to tell the two Avatars apart.
 */
const avatarIn = (container: HTMLElement): HTMLElement => {
  const avatar = container.querySelector<HTMLElement>('[role="img"]');

  if (!avatar) {
    throw new Error('no Avatar rendered in this container');
  }

  return avatar;
};

describe('component contexts', () => {
  describe('ButtonContext — component-owned, read by the button family', () => {
    // MessageBarActions is the shipped container that publishes this value (it publishes
    // `{ size: 'small' }`), reached through Griffel's own provider inside renderMessageBarActions.
    const inContext = (children: React.ReactNode) => (
      <ButtonContextProvider value={{ size: 'small' }}>{children}</ButtonContextProvider>
    );

    it('lets the container set Button’s size', () => {
      const { getByText } = render(inContext(<Button>Go</Button>));

      expect(getByText('Go').getAttribute('data-size')).toBe('small');
    });

    it('lets a local size prop win over the container', () => {
      const { getByText } = render(inContext(<Button size="large">Go</Button>));

      expect(getByText('Go').getAttribute('data-size')).toBe('large');
    });

    it('falls back to medium with no provider present', () => {
      const { getByText } = render(<Button>Go</Button>);

      expect(getByText('Go').getAttribute('data-size')).toBe('medium');
    });

    it('lets the container set CompoundButton’s size', () => {
      const { getByText } = render(inContext(<CompoundButton>Go</CompoundButton>));

      expect(getByText('Go').closest('button')?.getAttribute('data-size')).toBe('small');
    });

    it('lets a local size prop win over the container for CompoundButton', () => {
      const { getByText } = render(inContext(<CompoundButton size="large">Go</CompoundButton>));

      expect(getByText('Go').closest('button')?.getAttribute('data-size')).toBe('large');
    });

    it('lets the container set MenuButton’s size', () => {
      const { getByText } = render(inContext(<MenuButton>Go</MenuButton>));

      expect(getByText('Go').closest('button')?.getAttribute('data-size')).toBe('small');
    });

    it('lets the container set ToggleButton’s size', () => {
      // Griffel's useToggleButton inherits the read by composing useButton_unstable; the headless
      // toggle hook carries no look props, so windmod makes the read explicitly.
      const { getByText } = render(inContext(<ToggleButton>Go</ToggleButton>));

      expect(getByText('Go').getAttribute('data-size')).toBe('small');
    });

    it('leaves SplitButton on medium — Griffel’s useSplitButton reads no ButtonContext', () => {
      // Parity, not an oversight: react-button's useSplitButton.ts:20 hard-defaults `size` and then
      // pushes it into both child slots as an explicit prop, which bypasses their own context reads.
      const { getByText } = render(inContext(<SplitButton>Go</SplitButton>));

      expect(getByText('Go').getAttribute('data-size')).toBe('medium');
    });

    it('leaves ToolbarButton on medium — Griffel’s useToolbarButton pins size', () => {
      // react-toolbar's useToolbarButton.ts:27 pins `size: 'medium'`; only the toolbar's own
      // toggle/radio buttons read a size, and they read ToolbarContext rather than ButtonContext.
      const { getByText } = render(
        inContext(
          <Toolbar>
            <ToolbarButton>Go</ToolbarButton>
          </Toolbar>,
        ),
      );

      expect(getByText('Go').getAttribute('data-size')).toBe('medium');
    });
  });

  describe('LinkContext — component-owned, read by Link', () => {
    // MessageBarBody is the shipped container that publishes this value (`{ inline: true }`).
    it('lets the container make a Link inline', () => {
      const { getByText } = render(
        <LinkContextProvider value={{ inline: true }}>
          <Link>Read more</Link>
        </LinkContextProvider>,
      );

      expect(getByText('Read more').hasAttribute('data-inline')).toBe(true);
    });

    it('lets an explicit `inline={false}` win over the container', () => {
      const { getByText } = render(
        <LinkContextProvider value={{ inline: true }}>
          <Link inline={false}>Read more</Link>
        </LinkContextProvider>,
      );

      expect(getByText('Read more').hasAttribute('data-inline')).toBe(false);
    });

    it('is not inline with no provider present', () => {
      const { getByText } = render(<Link>Read more</Link>);

      expect(getByText('Read more').hasAttribute('data-inline')).toBe(false);
    });
  });

  describe('AvatarContext — component-owned, read by Avatar', () => {
    it('lets the container set both size and shape', () => {
      const { container } = render(
        <AvatarContextProvider value={{ size: 20, shape: 'square' }}>
          <Avatar name="Ada Lovelace" />
        </AvatarContextProvider>,
      );
      const { container: control } = render(<Avatar name="Ada Lovelace" size={20} shape="square" />);

      // The context-driven Avatar has to be indistinguishable from the explicitly-propped one:
      // `data-size` covers the size axis and the class list covers the shape axis.
      expect(avatarIn(container).getAttribute('data-size')).toBe('20');
      expect(avatarIn(container).className).toBe(avatarIn(control).className);
    });

    it('lets local props win over the container', () => {
      const { getByRole } = render(
        <AvatarContextProvider value={{ size: 20, shape: 'square' }}>
          <Avatar name="Ada Lovelace" size={48} />
        </AvatarContextProvider>,
      );

      expect(getByRole('img').getAttribute('data-size')).toBe('48');
    });

    it('falls back to 32 with no provider present', () => {
      const { getByRole } = render(<Avatar name="Ada Lovelace" />);

      expect(getByRole('img').getAttribute('data-size')).toBe('32');
    });
  });

  describe('FieldContext — container-owned, read for the look half only', () => {
    it('lets a Field set its Input’s size', () => {
      const { getByRole } = render(
        <Field label="Name" size="large">
          <Input />
        </Field>,
      );

      expect(getByRole('textbox').closest('span')?.getAttribute('data-size')).toBe('large');
    });

    it('lets a local size prop win over the Field', () => {
      const { getByRole } = render(
        <Field label="Name" size="large">
          <Input size="small" />
        </Field>,
      );

      expect(getByRole('textbox').closest('span')?.getAttribute('data-size')).toBe('small');
    });

    it('lets a Field set its Textarea’s size', () => {
      const { getByRole } = render(
        <Field label="Bio" size="large">
          <Textarea />
        </Field>,
      );

      // Textarea stamps `data-size` on its wrapping root, not on the control itself.
      expect(getByRole('textbox').closest('span')?.getAttribute('data-size')).toBe('large');
    });

    it('lets a Field set its Select’s size', () => {
      const { getByRole } = render(
        <Field label="Colour" size="large">
          <Select>
            <option>Red</option>
          </Select>
        </Field>,
      );

      expect(getByRole('combobox').closest('span')?.getAttribute('data-size')).toBe('large');
    });

    it('falls back to medium with no Field present', () => {
      const { getByRole } = render(<Input />);

      expect(getByRole('textbox').closest('span')?.getAttribute('data-size')).toBe('medium');
    });

    it('leaves SearchBox on medium — Griffel’s useSearchBox reads no FieldContext size', () => {
      // Parity, not an oversight: react-search's useSearchBox.tsx:33 hard-defaults `size` and then
      // overwrites the base state's value with it (`:44-47`), so the styled input hook it composes
      // cannot leak a Field size through.
      const { getByRole } = render(
        <Field label="Search" size="large">
          <SearchBox />
        </Field>,
      );

      expect(getByRole('searchbox').closest('span')?.getAttribute('data-size')).toBe('medium');
    });

    it('leaves SpinButton on medium — Griffel’s useSpinButton reads no FieldContext size', () => {
      // react-spinbutton calls useFieldControlProps_unstable (aria only, useSpinButton.tsx:56) and
      // never useFieldContext_unstable; its `size` hard-defaults to medium (`:395`). Wiring one here
      // would make windmod diverge from Griffel rather than close a gap.
      const { getByRole } = render(
        <Field label="Count" size="large">
          <SpinButton value={1} />
        </Field>,
      );

      expect(getByRole('spinbutton').closest('span')?.getAttribute('data-size')).toBe('medium');
    });

    it('derives ProgressBar’s colour from the Field’s validation state', () => {
      const { container } = render(
        <Field label="Upload" validationState="error">
          <ProgressBar value={0.5} />
        </Field>,
      );
      const { container: control } = render(<ProgressBar value={0.5} color="error" />);

      expect(container.querySelector('.fui-progress-bar > *')?.className).toBe(
        control.querySelector('.fui-progress-bar > *')?.className,
      );
    });

    it('lets a local colour win over the Field’s validation state', () => {
      const { container } = render(
        <Field label="Upload" validationState="error">
          <ProgressBar value={0.5} color="success" />
        </Field>,
      );
      const { container: control } = render(<ProgressBar value={0.5} color="success" />);

      expect(container.querySelector('.fui-progress-bar > *')?.className).toBe(
        control.querySelector('.fui-progress-bar > *')?.className,
      );
    });

    it('leaves ProgressBar on brand for a validation state Griffel does not map', () => {
      const { container } = render(
        <Field label="Upload" validationState="none">
          <ProgressBar value={0.5} />
        </Field>,
      );
      const { container: control } = render(<ProgressBar value={0.5} />);

      expect(container.querySelector('.fui-progress-bar > *')?.className).toBe(
        control.querySelector('.fui-progress-bar > *')?.className,
      );
    });
  });

  describe('Tag — fills the avatar context the headless state publishes empty', () => {
    it('imposes the Tag’s avatar look on a nested Avatar', () => {
      const { container } = render(<Tag media={<Avatar name="Ada Lovelace" />}>Author</Tag>);
      const { container: control } = render(<Avatar name="Ada Lovelace" size={28} shape="square" />);

      // Griffel's tagAvatarSizeMap/tagAvatarShapeMap: medium → 28, rounded → square.
      expect(avatarIn(container).getAttribute('data-size')).toBe('28');
      expect(avatarIn(container).className).toBe(avatarIn(control).className);
    });

    it.each([
      ['small', '20'],
      ['extra-small', '16'],
    ] as const)('follows the Tag’s own size down the map (%s → %s)', (size, avatarSize) => {
      const { getByRole } = render(
        <Tag size={size} media={<Avatar name="Ada Lovelace" />}>
          Author
        </Tag>,
      );

      expect(getByRole('img').getAttribute('data-size')).toBe(avatarSize);
    });

    it('follows the Tag’s own shape down the map', () => {
      const { container } = render(
        <Tag shape="circular" media={<Avatar name="Ada Lovelace" />}>
          Author
        </Tag>,
      );
      const { container: control } = render(<Avatar name="Ada Lovelace" size={28} shape="circular" />);

      expect(avatarIn(container).className).toBe(avatarIn(control).className);
    });

    it('still lets a local prop on the nested Avatar win', () => {
      const { getByRole } = render(<Tag media={<Avatar name="Ada Lovelace" size={48} />}>Author</Tag>);

      expect(getByRole('img').getAttribute('data-size')).toBe('48');
    });
  });

  describe('Tag — reads the group context its Griffel counterpart reads', () => {
    const tagIn = (container: HTMLElement): HTMLElement => container.querySelector<HTMLElement>('.fui-tag')!;

    it('lets the container set the Tag’s size and appearance', () => {
      const { container } = render(
        <TagGroup size="small" appearance="outline">
          <Tag>Author</Tag>
        </TagGroup>,
      );
      const { container: control } = render(
        <Tag size="small" appearance="outline">
          Author
        </Tag>,
      );

      expect(tagIn(container).getAttribute('data-size')).toBe('small');
      expect(tagIn(container).className).toBe(tagIn(control).className);
    });

    it('lets a local prop win over the container', () => {
      const { container } = render(
        <TagGroup size="extra-small" appearance="brand">
          <Tag size="medium" appearance="outline">
            Author
          </Tag>
        </TagGroup>,
      );
      const { container: control } = render(
        <Tag size="medium" appearance="outline">
          Author
        </Tag>,
      );

      expect(tagIn(container).getAttribute('data-size')).toBe('medium');
      expect(tagIn(container).className).toBe(tagIn(control).className);
    });

    it('leaves a Tag outside any TagGroup unmoved', () => {
      const { container } = render(<Tag>Author</Tag>);

      expect(tagIn(container).getAttribute('data-size')).toBe('medium');
    });
  });

  describe('InteractionTag family — reads the contexts its Griffel counterpart reads', () => {
    const interactionTagIn = (container: HTMLElement): HTMLElement =>
      container.querySelector<HTMLElement>('.fui-interaction-tag')!;
    const primaryIn = (container: HTMLElement): HTMLElement =>
      container.querySelector<HTMLElement>('.fui-interaction-tag-primary')!;
    const secondaryIn = (container: HTMLElement): HTMLElement =>
      container.querySelector<HTMLElement>('.fui-interaction-tag-secondary')!;

    const composite = (props: React.ComponentProps<typeof InteractionTag> = {}) => (
      <InteractionTag {...props}>
        <InteractionTagPrimary hasSecondaryAction>Author</InteractionTagPrimary>
        <InteractionTagSecondary aria-label="dismiss" />
      </InteractionTag>
    );

    it('lets a TagGroup set the tag’s size and appearance', () => {
      const { container } = render(
        <TagGroup size="small" appearance="outline">
          {composite()}
        </TagGroup>,
      );
      const { container: control } = render(composite({ size: 'small', appearance: 'outline' }));

      expect(interactionTagIn(container).getAttribute('data-size')).toBe('small');
      expect(primaryIn(container).className).toBe(primaryIn(control).className);
      expect(secondaryIn(container).className).toBe(secondaryIn(control).className);
    });

    it('lets a local prop on the tag win over the group', () => {
      const { container } = render(
        <TagGroup size="extra-small" appearance="brand">
          {composite({ size: 'medium', appearance: 'outline' })}
        </TagGroup>,
      );
      const { container: control } = render(composite({ size: 'medium', appearance: 'outline' }));

      expect(interactionTagIn(container).getAttribute('data-size')).toBe('medium');
      expect(primaryIn(container).className).toBe(primaryIn(control).className);
    });

    it('leaves a tag outside any TagGroup unmoved', () => {
      const { container } = render(composite());

      expect(interactionTagIn(container).getAttribute('data-size')).toBe('medium');
    });

    it('carries the tag’s look down to both children', () => {
      const { container } = render(composite({ size: 'small', shape: 'circular', appearance: 'brand' }));
      const { container: base } = render(composite());

      expect(primaryIn(container).getAttribute('data-size')).toBe('small');
      expect(secondaryIn(container).getAttribute('data-size')).toBe('small');
      // Compared against the DEFAULT look, not against an identical render: the classes have to
      // actually move, or the look never reached the children.
      expect(primaryIn(container).className).not.toBe(primaryIn(base).className);
      expect(secondaryIn(container).className).not.toBe(secondaryIn(base).className);
    });

    it('leaves children outside any InteractionTag on the base look', () => {
      const { container } = render(<InteractionTagPrimary>Author</InteractionTagPrimary>);
      const { container: control } = render(composite());

      expect(primaryIn(container).getAttribute('data-size')).toBe('medium');
      // The base look is what an unwrapped primary falls back to — filled, rounded, medium.
      expect(primaryIn(container).getAttribute('data-size')).toBe(primaryIn(control).getAttribute('data-size'));
    });

    it('cascades the tag’s size into a nested Avatar', () => {
      const avatarSizes = { medium: '28', small: '20', 'extra-small': '16' } as const;

      (Object.keys(avatarSizes) as Array<keyof typeof avatarSizes>).forEach(size => {
        const { container } = render(
          <InteractionTag size={size}>
            <InteractionTagPrimary media={<Avatar name="Ada Lovelace" />}>Author</InteractionTagPrimary>
          </InteractionTag>,
        );

        expect(avatarIn(container).getAttribute('data-size')).toBe(avatarSizes[size]);
      });
    });
  });
});
