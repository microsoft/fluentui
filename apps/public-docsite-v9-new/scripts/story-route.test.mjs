import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { storySlug, storyTitle, toKebab } from './story-route.mjs';

describe('toKebab', () => {
  it('splits camel case, which is what makes an anchor match its Storybook id', () => {
    assert.equal(toKebab('MotionCustom'), 'motion-custom');
    assert.equal(toKebab('TeachingPopover'), 'teaching-popover');
    assert.equal(toKebab('ContentBeforeAfter'), 'content-before-after');
  });

  it('splits an acronym from the word that follows it', () => {
    assert.equal(toKebab('ARIALive'), 'aria-live');
  });

  it('keeps a trailing plural attached to its acronym', () => {
    assert.equal(toKebab('APIs'), 'apis');
  });

  it('collapses separators rather than emitting empty segments', () => {
    assert.equal(toKebab('Compat Components'), 'compat-components');
    assert.equal(toKebab('  Motion / Custom  '), 'motion-custom');
  });
});

describe('storyTitle', () => {
  it('reads the title from either quote style', () => {
    assert.equal(storyTitle(`const meta = { title: 'Components/Accordion' }`), 'Components/Accordion');
    assert.equal(storyTitle(`const meta = { title: "Components/Accordion" }`), 'Components/Accordion');
  });

  it('is undefined when the story declares no title', () => {
    assert.equal(storyTitle('export const Default = () => null;'), undefined);
  });
});

describe('storySlug', () => {
  it('takes the path from the title, not the directory, so the sidebar shape is preserved', () => {
    assert.equal(storySlug(`title: 'Components/Accordion'`, 'Accordion'), 'components/accordion');
    assert.equal(
      storySlug(`title: 'Motion/Choreography Preview/Stagger'`, 'Stagger'),
      'motion/choreography-preview/stagger',
    );
  });

  it('does not repeat a segment that matches its parent', () => {
    assert.equal(storySlug(`title: 'Components/Button/Button'`, 'Button'), 'components/button');
  });

  it('keeps a repeated segment that is not the last one', () => {
    assert.equal(storySlug(`title: 'Components/Badge/CounterBadge'`, 'CounterBadge'), 'components/badge/counter-badge');
  });

  it('falls back to the entry point name when there is no title', () => {
    assert.equal(storySlug('export const Default = () => null;', 'CounterBadge'), 'counter-badge');
  });
});
