import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Avatar } from '../Avatar/Avatar';
import { Tag } from '../Tag/Tag';
import type { TagGroupSize } from './TagGroup.types';
import { TagGroup } from './TagGroup';
import { tagGroupClassNames, useTagGroupStyles } from './useTagGroupStyles';

import styles from './TagGroup.module.css';
import tagStyles from '../Tag/Tag.module.css';

// Frozen-state guard — see testing/freezeState.ts.
// The same mock records what each render hands to the Griffel context builder, and what it publishes: the
// headless state omits both look values, so only the styled state can carry them.
jest.mock('@fluentui/react-headless-components-preview/tag-group', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/tag-group');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useTagGroup: (...args: Parameters<typeof actual.useTagGroup>) => deepFreezeState(actual.useTagGroup(...args)),
    useTagGroupContextValues: (...args: Parameters<typeof actual.useTagGroupContextValues>) => {
      const published = actual.useTagGroupContextValues(...args);

      contextValues.push(published as PublishedContextValues);

      return published;
    },
  };
});

// The Griffel context value each render publishes to its children.
type PublishedContextValues = { tagGroup: Record<string, unknown> };
const contextValues: PublishedContextValues[] = [];

beforeEach(() => {
  contextValues.length = 0;
});

const sizes: TagGroupSize[] = ['medium', 'small', 'extra-small'];

// The root's child list is not a contract worth pinning: Griffel's styled TagGroup adds out-of-flow
// tabster dummies that the headless base hook does not, so a count or an index is a comparison
// waiting to break. Child Tags are addressed by test id instead.
const groupRoot = (container: HTMLElement) => container.firstElementChild as HTMLElement;
const tagIn = (container: HTMLElement, testId: string) =>
  container.querySelector<HTMLElement>(`[data-testid="${testId}"]`)!;

const renderGroup = (props: React.ComponentProps<typeof TagGroup> = {}, children?: React.ReactNode) => {
  const { container, ...rest } = render(
    <TagGroup {...props}>{children ?? <Tag data-testid="a">Primary</Tag>}</TagGroup>,
  );

  return { ...rest, container, root: groupRoot(container), tag: (testId = 'a') => tagIn(container, testId) };
};

describe('TagGroup', () => {
  isConformant({
    Component: TagGroup,
    displayName: 'TagGroup',
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderGroup();

    expect(root).toHaveClass('fui-tag-group');
    expect(root).toHaveClass('group/fui-tag-group');
    expect(root.classList[0]).toBe('fui-tag-group');
    expect(tagGroupClassNames.root).toBe('fui-tag-group group/fui-tag-group');
  });

  it('carries the root module class', () => {
    // Tag's own `root` local hashes to the same jest ident, so this is only ever asserted
    // structurally on the group root — never as an absence on a child.
    expect(renderGroup().root).toHaveClass(styles.root);
    expect(renderGroup().root.className).not.toContain('undefined');
  });

  it('stamps data-size on the root for every size, and never on a child', () => {
    sizes.forEach(size => {
      const { root, tag } = renderGroup({ size });

      expect(root.getAttribute('data-size')).toBe(size);
      expect(tag().getAttribute('data-size')).toBe(size);
      // The child's stamp is its own, from its own styles hook.
      expect(tag()).not.toBe(root);
    });
  });

  it('defaults both look props', () => {
    const { root, tag } = renderGroup();

    expect(root.getAttribute('data-size')).toBe('medium');
    expect(tag().getAttribute('data-size')).toBe('medium');
    expect(tag()).not.toHaveClass(tagStyles.outline);
    expect(tag()).not.toHaveClass(tagStyles.brand);
  });

  it('carries exactly the attributes the two layers own', () => {
    expect(
      groupRoot(render(<TagGroup />).container)
        .getAttributeNames()
        .sort(),
    ).toEqual(['aria-disabled', 'class', 'data-size', 'focusgroup', 'role']);

    expect(
      groupRoot(render(<TagGroup disabled dismissible />).container)
        .getAttributeNames()
        .sort(),
    ).toEqual(['aria-disabled', 'class', 'data-disabled', 'data-dismissible', 'data-size', 'focusgroup', 'role']);
  });

  it('leaves data-disabled and data-dismissible to the headless hook', () => {
    const { root } = renderGroup({ disabled: true, dismissible: true });

    // The headless library's own presence spelling, stamped once each.
    expect(root.getAttribute('data-disabled')).toBe('');
    expect(root.getAttribute('data-dismissible')).toBe('');
    expect(
      root
        .getAttribute('class')!
        .split(/\s+/)
        .filter(c => c === styles.root),
    ).toHaveLength(1);
  });

  it('carries its size down to the Tags', () => {
    sizes.forEach(size => {
      expect(renderGroup({ size }).tag().getAttribute('data-size')).toBe(size);
    });
  });

  it('carries its appearance down to the Tags', () => {
    expect(renderGroup({ appearance: 'outline' }).tag()).toHaveClass(tagStyles.outline);
    expect(renderGroup({ appearance: 'brand' }).tag()).toHaveClass(tagStyles.brand);

    const filled = renderGroup({ appearance: 'filled' }).tag();

    expect(filled).not.toHaveClass(tagStyles.outline);
    expect(filled).not.toHaveClass(tagStyles.brand);
  });

  it('lets a local Tag prop beat the group', () => {
    const bySize = renderGroup({ size: 'extra-small' }, <Tag data-testid="a" size="medium" />);

    expect(bySize.tag().getAttribute('data-size')).toBe('medium');

    const byAppearance = renderGroup({ appearance: 'brand' }, <Tag data-testid="a" appearance="outline" />);

    expect(byAppearance.tag()).toHaveClass(tagStyles.outline);
    expect(byAppearance.tag()).not.toHaveClass(tagStyles.brand);
  });

  it('publishes no shape, so the Tags keep their own', () => {
    expect(renderGroup().tag()).not.toHaveClass(tagStyles.circular);
    expect(renderGroup({}, <Tag data-testid="a" shape="circular" />).tag()).toHaveClass(tagStyles.circular);
  });

  it('carries dismissible down to the Tags, glyph included', () => {
    const { tag } = renderGroup({ dismissible: true });

    expect(tag().tagName).toBe('BUTTON');
    expect(tag().getAttribute('data-dismissible')).toBe('');
    expect(tag().querySelector('svg')).not.toBeNull();
  });

  it('carries disabled down to the Tags', () => {
    const { root, tag } = renderGroup({ disabled: true });

    expect(root.getAttribute('aria-disabled')).toBe('true');
    expect(root.getAttribute('data-disabled')).toBe('');
    expect(tag().getAttribute('data-disabled')).toBe('');
  });

  it('reports the dismissed tag’s own value', () => {
    const onDismiss = jest.fn();
    const { container } = render(
      <TagGroup dismissible onDismiss={onDismiss}>
        <Tag data-testid="a" value="1">
          One
        </Tag>
        <Tag data-testid="b" value="2">
          Two
        </Tag>
      </TagGroup>,
    );

    fireEvent.click(tagIn(container, 'a'));
    expect(onDismiss).toHaveBeenLastCalledWith(expect.anything(), { value: '1' });

    fireEvent.click(tagIn(container, 'b'));
    expect(onDismiss).toHaveBeenLastCalledWith(expect.anything(), { value: '2' });
    expect(onDismiss).toHaveBeenCalledTimes(2);
  });

  it('keeps the selection channel intact', () => {
    const onTagSelect = jest.fn();
    const { container } = render(
      <TagGroup role="listbox" selectedValues={['1']} onTagSelect={onTagSelect}>
        <Tag data-testid="a" value="1" selected>
          One
        </Tag>
        <Tag data-testid="b" value="2" selected={false}>
          Two
        </Tag>
      </TagGroup>,
    );

    expect(groupRoot(container).getAttribute('role')).toBe('listbox');
    expect(tagIn(container, 'a').getAttribute('role')).toBe('option');
    expect(tagIn(container, 'a').getAttribute('aria-selected')).toBe('true');
    expect(tagIn(container, 'b').getAttribute('aria-selected')).toBe('false');

    // Selection reaches the children through the same published context as the look values. Only
    // InteractionTagPrimary invokes `handleTagSelect`, so a plain Tag cannot fire `onTagSelect`;
    // the handler's presence is what proves the prop survived `...rest`.
    expect(contextValues[0].tagGroup).toMatchObject({
      selectedValues: ['1'],
      role: 'listbox',
      handleTagSelect: expect.any(Function),
    });
    expect(onTagSelect).not.toHaveBeenCalled();

    contextValues.length = 0;
    render(<TagGroup role="listbox" />);

    expect(contextValues[0].tagGroup.handleTagSelect).toBeUndefined();
  });

  it('fills the Griffel context values the headless state publishes empty', () => {
    render(
      <TagGroup size="small" appearance="outline">
        <Tag data-testid="a">Primary</Tag>
      </TagGroup>,
    );

    expect(contextValues[0].tagGroup).toMatchObject({ size: 'small', appearance: 'outline' });

    contextValues.length = 0;
    render(<TagGroup />);

    expect(contextValues[0].tagGroup).toMatchObject({ size: 'medium', appearance: 'filled' });
  });

  it('cascades its size into a nested Avatar', () => {
    const avatarSizes: Record<TagGroupSize, string> = { medium: '28', small: '20', 'extra-small': '16' };

    sizes.forEach(size => {
      const { container } = render(
        <TagGroup size={size}>
          <Tag data-testid="a" media={<Avatar name="Ada Lovelace" />}>
            Primary
          </Tag>
        </TagGroup>,
      );
      const { container: control } = render(
        <Tag size={size} media={<Avatar name="Ada Lovelace" />}>
          Primary
        </Tag>,
      );

      expect(container.querySelector('[role="img"]')!.getAttribute('data-size')).toBe(avatarSizes[size]);
      expect(container.querySelector('[role="img"]')!.className).toBe(control.querySelector('[role="img"]')!.className);
    });
  });

  it('keeps a consumer className exactly once, on the group and on a child', () => {
    const { container } = render(
      <TagGroup className="group-consumer">
        <Tag data-testid="a" className="tag-consumer">
          Primary
        </Tag>
      </TagGroup>,
    );
    const classesOf = (element: HTMLElement) => element.getAttribute('class')!.split(/\s+/);

    expect(classesOf(groupRoot(container)).filter(c => c === 'group-consumer')).toHaveLength(1);
    expect(classesOf(tagIn(container, 'a')).filter(c => c === 'tag-consumer')).toHaveLength(1);
  });

  it('passes native props and the ref through', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(<TagGroup ref={ref} id="group-id" style={{ opacity: 0.5 }} />);
    const root = groupRoot(container);

    expect(ref.current).toBe(root);
    expect(root.id).toBe('group-id');
    expect(root.style.opacity).toBe('0.5');
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given' }) as never;
    const state = Object.freeze({ root, components: {}, appearance: 'filled', size: 'small' }) as never;

    const next = useTagGroupStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect((root as { className: string }).className).toBe('given');
    expect((root as Record<string, unknown>)['data-size']).toBeUndefined();
  });
});
