import * as React from 'react';

import {
  COMPONENT_HAS_GROUP_MARKER_TEST_NAME,
  assertGroupMarkerIsStamped,
  assertMarkerIsNotLeadingToken,
  componentHasGroupMarker,
  getExpectedGroupMarkers,
  toKebabCase,
} from './componentHasGroupMarker';
import type { IsConformantOptions } from './types';

const displayName = 'TestComponent';
const expectedMarker = 'group/fui-test-component';

describe('toKebabCase', () => {
  // Every case below is a real converted-component displayName paired with the marker literal
  // that component stamps today, so the derivation is pinned against the shipped strings.
  it.each([
    ['Switch', 'switch'],
    ['MessageBar', 'message-bar'],
    ['AccordionHeader', 'accordion-header'],
    ['SearchBox', 'search-box'],
    ['SpinButton', 'spin-button'],
    ['CounterBadge', 'counter-badge'],
    ['FluentProvider', 'fluent-provider'],
    ['TreeItemPersonaLayout', 'tree-item-persona-layout'],
    ['InteractionTagSecondary', 'interaction-tag-secondary'],
    ['Textarea', 'textarea'],
  ])('kebabs %s to %s', (input, expected) => {
    expect(toKebabCase(input)).toBe(expected);
  });

  it('splits a trailing acronym off the word before it', () => {
    expect(toKebabCase('HTMLButton')).toBe('html-button');
  });
});

describe('getExpectedGroupMarkers', () => {
  it('derives the marker from displayName', () => {
    expect(getExpectedGroupMarkers({ displayName: 'MessageBarGroup' } as IsConformantOptions)).toEqual([
      'group/fui-message-bar-group',
    ]);
  });

  it('prefers an explicit testOptions override', () => {
    // react-tooltip declares no `root` slot at all — it portals, and its `content` element is
    // its outermost node — so its marker rides `content` while staying named for the component.
    expect(
      getExpectedGroupMarkers({
        displayName: 'Tooltip',
        testOptions: { 'has-group-marker': { marker: 'group/fui-tooltip' } },
      } as IsConformantOptions),
    ).toEqual(['group/fui-tooltip']);
  });

  it('returns the whole declared set for a delegating component', () => {
    // ToolbarToggleButton renders react-button's ToggleButton, which renders Button, and each
    // hook stamps its own marker on the one element (DECISIONS.md D16.3).
    expect(
      getExpectedGroupMarkers({
        displayName: 'ToolbarToggleButton',
        testOptions: {
          'has-group-marker': {
            markers: ['group/fui-button', 'group/fui-toggle-button', 'group/fui-toolbar-toggle-button'],
          },
        },
      } as IsConformantOptions),
    ).toEqual(['group/fui-button', 'group/fui-toggle-button', 'group/fui-toolbar-toggle-button']);
  });
});

describe('assertGroupMarkerIsStamped', () => {
  it('passes when the expected marker is present', () => {
    expect(() =>
      assertGroupMarkerIsStamped({
        displayName,
        expectedMarkers: [expectedMarker],
        classNames: ['fuicm-test-component-root-a3f2c1', expectedMarker, 'consumer-classname'],
      }),
    ).not.toThrow();
  });

  it('throws when no marker is stamped at all', () => {
    expect(() =>
      assertGroupMarkerIsStamped({
        displayName,
        expectedMarkers: [expectedMarker],
        classNames: ['fui-TestComponent', 'fuicm-test-component-root-a3f2c1'],
      }),
    ).toThrow(/does not stamp its named group marker/);
  });

  it('names the marker it found when the wrong one is stamped', () => {
    expect(() =>
      assertGroupMarkerIsStamped({
        displayName,
        expectedMarkers: [expectedMarker],
        classNames: ['fuicm-test-component-root-a3f2c1', 'group/fui-testcomponent'],
      }),
    ).toThrow(/group\/fui-testcomponent/);
  });

  it('throws when more than one marker is stamped on the same slot', () => {
    expect(() =>
      assertGroupMarkerIsStamped({
        displayName,
        expectedMarkers: [expectedMarker],
        classNames: ['fuicm-test-component-root-a3f2c1', expectedMarker, 'group/fui-something-else'],
      }),
    ).toThrow(/stamps a named group marker it did not declare/);
  });

  it('passes when a delegating component stamps exactly the set it declared', () => {
    expect(() =>
      assertGroupMarkerIsStamped({
        displayName,
        expectedMarkers: ['group/fui-button', expectedMarker],
        classNames: ['fuicm-root-a3f2c1', 'group/fui-button', expectedMarker, 'consumer-classname'],
      }),
    ).not.toThrow();
  });

  it('still throws for a delegating component when one of the declared markers is missing', () => {
    expect(() =>
      assertGroupMarkerIsStamped({
        displayName,
        expectedMarkers: ['group/fui-button', expectedMarker],
        classNames: ['fuicm-root-a3f2c1', 'group/fui-button'],
      }),
    ).toThrow(/does not stamp its named group markers/);
  });
});

describe('assertMarkerIsNotLeadingToken', () => {
  it('passes when a selector-safe token leads', () => {
    expect(() =>
      assertMarkerIsNotLeadingToken({
        displayName,
        classNames: ['fuicm-test-component-root-a3f2c1', expectedMarker],
      }),
    ).not.toThrow();
  });

  it('passes for the pre-removal shape, where the static class leads', () => {
    expect(() =>
      assertMarkerIsNotLeadingToken({ displayName, classNames: ['fui-TestComponent', expectedMarker] }),
    ).not.toThrow();
  });

  it('throws when the group marker is classList[0]', () => {
    expect(() =>
      assertMarkerIsNotLeadingToken({
        displayName,
        classNames: [expectedMarker, 'fuicm-test-component-root-a3f2c1'],
      }),
    ).toThrow(/renders its group marker as the FIRST class token/);
  });

  it('throws for a peer marker at classList[0] too', () => {
    expect(() => assertMarkerIsNotLeadingToken({ displayName, classNames: ['peer/fui-test-component'] })).toThrow(
      /renders its group marker as the FIRST class token/,
    );
  });

  it('does not confuse a class that merely starts with "group" for a marker', () => {
    // `group` and `grouped-thing` carry no "/", so nwsapi escapes them without incident.
    expect(() => assertMarkerIsNotLeadingToken({ displayName, classNames: ['grouped-thing'] })).not.toThrow();
    expect(() => assertMarkerIsNotLeadingToken({ displayName, classNames: ['group'] })).not.toThrow();
  });

  it('passes vacuously on an empty class list', () => {
    // "the component rendered no marker" is assertGroupMarkerIsStamped's failure to report.
    expect(() => assertMarkerIsNotLeadingToken({ displayName, classNames: [] })).not.toThrow();
  });
});

describe(COMPONENT_HAS_GROUP_MARKER_TEST_NAME, () => {
  // Registers the real conformance test against a component composed the way a converted
  // component is post-removal: hashed module class first, marker second, consumer class last.
  const MarkedComponent = (props: { className?: string }) => (
    <div
      className={['fuicm-marked-component-root-a3f2c1', 'group/fui-marked-component', props.className]
        .filter(Boolean)
        .join(' ')}
    />
  );

  componentHasGroupMarker({
    Component: MarkedComponent,
    displayName: 'MarkedComponent',
    componentPath: __filename,
  } as IsConformantOptions);
});
