import * as React from 'react';
import { CodeSnippet } from '@fluentui/docs-components';
import { Button, Box, Flex, Header, Segment, Divider } from '@fluentui/react-northstar';

import ExampleSnippet from '../components/ExampleSnippet';
import DocPage from '../components/DocPage';
import GuidesNavigationFooter from '../components/GuidesNavigationFooter';
import { code, link } from '../utils/helpers';
import { EmojiIcon } from '@fluentui/react-icons-northstar';

const links = {
  flex: link('Flex', '/components/flex'),
  flexItem: link('Flex.Item', '/components/flex'),
  grid: link('Grid', '/components/grid'),
  segment: link('Segment', '/components/segment'),
  box: link('Box', '/components/segment'),
};

export default () => (
  <DocPage title="Layout Components">
    <Header as="h2">Overview</Header>
    <p>The following components are introduced by Fluent UI to handle layout aspects:</p>
    <ul>
      <li>{links.flex} - designed for layout in one dimension, either a row or a column.</li>
      <li>{links.grid} - designed for two-dimensional layout, rows and columns at the same time.</li>
    </ul>
    <Header as="h3">Flex vs Grid</Header>
    <p>
      Sometimes it might not be evident if some particular case is a case of 1D (i.e. {code('Flex')}) or 2D (i.e.{' '}
      {code('Grid')}) layout. As a result, quite often {code('Grid')} component is used at places where it is sufficient
      to use {code('Flex')}.
    </p>
    <p>Here is the question you might ask yourself to decide on that:</p>
    <ul>
      <li>
        do I only need to control the layout by row <strong>or</strong> column? – if yes, use {code('Flex')}.
      </li>
      <li>
        do I need to control the layout by row <strong>and</strong> column? – if yes, use {code('Grid')}.
      </li>
    </ul>
    <Header as="h3">Note on Segment and Box components</Header>
    <p>
      {links.segment} and {links.box} components may be abused for layout purposes, like in the following examples:
    </p>
    <Header as="h4">Segment's misuse: handle opaque background cases</Header>
    <CodeSnippet
      label="OpaqueBackground.jsx"
      value={`
        import { Segment } from '@fluentui/react-northstar'

        const OpaqueBackground = ({ children, color }) =>
          <Segment styles={{ backgroundColor: color }} content={{ children }} />
      `}
    />
    <ExampleSnippet
      render={() => {
        const OpaqueBackground = ({ children, color }) => (
          <Segment styles={{ backgroundColor: color }} content={{ children }} />
        );
        OpaqueBackground.displayName = 'OpaqueBackground';

        return <OpaqueBackground color="lightyellow">This is a bad approach to opaque background :(</OpaqueBackground>;
      }}
    />
    <Header as="h4">Box's misuse: handle relative positioning cases</Header>
    <CodeSnippet
      label="RelativePositioned.jsx"
      value={`
        import { Box } from '@fluentui/react-northstar'

        const RelativePositioned = ({ children, top, right, bottom, left }) =>
          <Box styles={{ position: 'relative', top, right, bottom, left }} content={children} />
      `}
    />
    <ExampleSnippet
      render={() => {
        const RelativePositioned = ({ children, left }) => (
          <Box styles={{ position: 'relative', left }} content={children} />
        );
        RelativePositioned.displayName = 'RelativePositioned';

        return (
          <RelativePositioned left="30px">This is a bad way to support relative-positioning :(</RelativePositioned>
        );
      }}
    />
    <p>
      While it might seem that the intent is addressed with the approach taken, however, this is wrong for the following
      reason:
    </p>
    <blockquote>
      Fluent UI makes it very important to <strong>follow component's semantics at the first place</strong>, and only
      then consider the visual aspects.
    </blockquote>
    <p>If we'd refer to the semantics provided in the description for {links.segment} component:</p>
    <blockquote>A segment is used to create a grouping of related content.</blockquote>
    <p>
      This description suggests that purpose of {code('Segment')} is not a layout. Thus, this component shouldn't be
      used for layout purposes, as this will break component's semantics - and, as a consequence, it might break
      accessibility and theming, as those both adhere to component's semantics at the first place.
    </p>
    <p>Same conclusions applies to the {links.box} component.</p>
    <Divider />
    <Header as="h2">Flex recipies</Header>
    There are several advices that might help when using {code('Flex')} component.
    <Header as="h3">{code('Flex.Item')} should be used sparingly</Header>
    <blockquote>
      Use {code('Flex.Item')} component to wrap child elements only in case if their flex styles should be overriden.
    </blockquote>
    <p>
      There is no strict need to use {code('Flex.Item')} component as a direct child of {code('Flex')} - one may use{' '}
      {code('Flex.Item')} component only when it is necessary to tweak flex styles of individual child item.
    </p>
    <ExampleSnippet
      render={() => (
        <Flex gap="gap.small">
          <Button content="Accept" />
          <Button content="Deny" />
        </Flex>
      )}
    />
    <p>As a consequence of this:</p>
    <blockquote>
      Each {code('Flex.Item')} element being introduced without any props specified should be considered for removal.
    </blockquote>
    <ExampleSnippet
      render={() => (
        <Flex gap="gap.small">
          <Button content="Accept" />
          <Flex.Item>
            <Button content="Deny" />
          </Flex.Item>
        </Flex>
      )}
    />
    <Header as="h3">Optimize amount of DOM elements rendered</Header>
    <p>
      Flex component was designed being able to address all flexbox layout scenarios with minimal amount of DOM elements
      rendered. In addition, there are props to address most common{' '}
      {link(
        'flexbox usage scenarios',
        'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Typical_Use_Cases_of_Flexbox',
      )}{' '}
      (e.g. {code('push')} prop) - the value of these props is that they introduce the least amount of DOM elements
      necessary to accomplish corresponding use-case.
    </p>
    <p>
      Let's consider one of the most representative examples - a navigation menu. Suppose that we want a menu bar with
      logo on the left side and set of nav links on the right.
    </p>
    <p>
      Quite often this is achieved by introducing a top-level flex container with two children: first is a logo, and the
      second one is another container ({code('Flex')}, renders to {code('<div />')}) with a group of buttons:
    </p>
    <ExampleSnippet
      render={() => (
        <Flex space="between">
          <Button content="Logo" icon={<EmojiIcon />} />

          <Flex gap="gap.small">
            <Button content="Page 1" />
            <Button content="Page 2" />
            <Button content="Page 3" />
          </Flex>
        </Flex>
      )}
    />
    <p>
      It turns out that this approach introduces unnecessary nesting level - it is possible to achieve the same goal by
      using just top-level container, with no buttons container:
    </p>
    <ExampleSnippet
      render={() => (
        <Flex gap="gap.small">
          <Button content="Logo" icon={<EmojiIcon />} />
          <Flex.Item push>
            <Button content="Page 1" />
          </Flex.Item>
          <Button content="Page 2" />
          <Button content="Page 3" />
        </Flex>
      )}
    />
    <p>
      Note that <strong>{code('Flex.Item')} doesn't result in any additional DOM element rendered</strong> - its sole
      purpose is just to pass style props to its child.
    </p>
    <blockquote>
      Consider to review set of examples on the {links.flex} page - as there might be an example that suits your needs.{' '}
      <strong>Each of these examples is optimized in terms of DOM elements rendered</strong>.
    </blockquote>
    <GuidesNavigationFooter
      previous={{ name: 'Colors', url: 'colors' }}
      next={{ name: 'Integrate Custom Components', url: 'integrate-custom-components' }}
    />
  </DocPage>
);
