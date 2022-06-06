import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecoratorTall } from '../utilities/index';
import { Breadcrumb } from '@fluentui/react';

const noOp = () => undefined;

storiesOf('Breadcrumb', module)
  .addDecorator(TestWrapperDecoratorTall)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.add('ms-Fabric--isFocusVisible')",
        )
        .executeScript("document.getElementsByClassName('ms-Breadcrumb-overflowButton')[0].focus()")
        .snapshot('overflowButtonFocus', { cropTo: '.testWrapper' })
        .executeScript("document.getElementsByClassName('ms-Breadcrumb-itemLink')[0].focus()")
        .snapshot('itemLinkFocus', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.remove('ms-Fabric--isFocusVisible')",
        )
        .hover('.ms-Breadcrumb-overflowButton')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.ms-Breadcrumb-overflowButton') // opening the dropdown
        .hover('.ms-Breadcrumb-overflowButton') // moving the mouse a bit to let dropdown open.
        .snapshot('click', { cropTo: '.testWrapper' })
        .click('.ms-Breadcrumb-overflowButton') // closing the dropdown
        .hover('.ms-Breadcrumb-list li:nth-child(2)')
        .snapshot('longTitleHover', { cropTo: '.testWrapper' })
        .hover('.ms-Breadcrumb-list li:nth-child(3)')
        .snapshot('shortTitleHover', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory(
    'Root',
    () => (
      <Breadcrumb
        items={[
          { text: 'Files', key: 'Files', href: '#/examples/breadcrumb' },
          { text: 'This is link 1', key: 'l1', href: '#/examples/breadcrumb' },
          { text: 'This is link 2', key: 'l2', href: '#/examples/breadcrumb' },
          { text: 'This is link 3 with a long name', key: 'l3', href: '#/examples/breadcrumb' },
          { text: 'This is link 4', key: 'l4', href: '#/examples/breadcrumb' },
          { text: 'This is link 5', key: 'l5', href: '#/examples/breadcrumb', isCurrentItem: true },
        ]}
        maxDisplayedItems={3}
      />
    ),
    { includeRtl: true },
  )
  .addStory(
    'Button',
    () => (
      <Breadcrumb
        items={[
          { text: 'Files', key: 'Files', onClick: noOp },
          { text: 'This is folder 1', key: 'l1', onClick: noOp },
          { text: 'This is folder 2', key: 'l2', onClick: noOp },
          { text: 'This is folder 3', key: 'l3', onClick: noOp },
          { text: 'This is folder 4', key: 'l4', onClick: noOp },
          { text: 'This is folder 5', key: 'l5', onClick: noOp, isCurrentItem: true },
        ]}
        maxDisplayedItems={3}
      />
    ),
    { includeRtl: true },
  );

// Stories for hovering over actionable and non-actionable items
storiesOf('Breadcrumb', module)
  .addDecorator(TestWrapperDecoratorTall)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .hover('.ms-Breadcrumb-list li:nth-child(2)')
        .snapshot('actionable hover', { cropTo: '.testWrapper' })
        .hover('.ms-Breadcrumb-list li:nth-child(3)')
        .snapshot('non-actionable hover', { cropTo: '.testWrapper' })
        .hover('.ms-Breadcrumb-overflowButton')
        .click('.ms-Breadcrumb-overflowButton') // opening the dropdown
        .hover('.ms-Breadcrumb-overflowButton') // moving the mouse a bit to let dropdown open.
        .hover('.ms-ContextualMenu-list li:nth-child(2)')
        .snapshot('actionable overflow hover', { cropTo: '.testWrapper' })
        .hover('.ms-ContextualMenu-list li:nth-child(3)')
        .snapshot('non-actionable overflow hover', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Hovering items', () => (
    <Breadcrumb
      items={[
        // overflow
        { text: 'Files', key: 'Files' },
        { text: 'Folder 1', key: 'l1', onClick: noOp },
        { text: 'Folder 2 no action', key: 'l2' },
        // displayed
        { text: 'Folder 3', key: 'l3', onClick: noOp },
        { text: 'Folder 4 no action', key: 'l4' },
        { text: 'Folder 5', key: 'l5', onClick: noOp, isCurrentItem: true },
      ]}
      maxDisplayedItems={3}
    />
  ));
