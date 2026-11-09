import * as React from 'react';
import { FluentProvider, type JSXElement } from '@fluentui/react-components';
import type { StoryObj } from '@storybook/react-webpack5';
import { Attachment, AttachmentIcon, AttachmentHeader, AttachmentBody } from '@fluentui/react-migration-v0-v9';
import {
  BriefcaseRegular as Briefcase,
  BookRegular as Book,
  PresenterRegular as Presenter,
  Book20Regular,
} from '@fluentui/react-icons';

export const Icon = (): JSXElement => {
  return (
    <div>
      <Attachment>
        <AttachmentIcon>
          <Book />
        </AttachmentIcon>
        <AttachmentBody>
          <AttachmentHeader>MeetingNotes.docx</AttachmentHeader>
        </AttachmentBody>
      </Attachment>
      <Attachment>
        <AttachmentIcon>
          <Briefcase />
        </AttachmentIcon>
        <AttachmentBody>
          <AttachmentHeader>Budget.xlsx</AttachmentHeader>
        </AttachmentBody>
      </Attachment>
      <Attachment>
        <AttachmentIcon>
          <Presenter />
        </AttachmentIcon>
        <AttachmentBody>
          <AttachmentHeader>Presentation.pptx</AttachmentHeader>
        </AttachmentBody>
      </Attachment>
    </div>
  );
};

Icon.storyName = 'Icon';

export const FixedSizeIcon = (): JSXElement => (
  <Attachment>
    <AttachmentIcon>
      <Book20Regular />
    </AttachmentIcon>
    <AttachmentBody>
      <AttachmentHeader>MeetingNotes.docx</AttachmentHeader>
    </AttachmentBody>
  </Attachment>
);

export const TypographyOverrides: StoryObj = {
  render: () => (
    <FluentProvider theme={{ fontSizeHero800: '80px' }}>
      <Icon />
      <FixedSizeIcon />
    </FluentProvider>
  ),
  // TODO: Include this manual play check in the CI browser-testing design.
  play: async ({ canvasElement }) => {
    const targetDocument = canvasElement.ownerDocument;
    const targetWindow = targetDocument.defaultView;
    if (!targetWindow) {
      throw new Error('Attachment icon sizing assertions require a browser');
    }
    await targetDocument.fonts.ready;
    const icons = canvasElement.querySelectorAll('.fui-AttachmentIcon svg, .fui-AttachmentIcon i');
    if (icons.length !== 4) {
      throw new Error(`Expected four Attachment icons, found ${icons.length}`);
    }
    for (const icon of Array.from(icons)) {
      const style = targetWindow.getComputedStyle(icon);
      const rect = icon.getBoundingClientRect();
      if (
        icon.localName === 'i' &&
        (!icon.textContent || !targetDocument.fonts.check(`${style.fontSize} ${style.fontFamily}`, icon.textContent))
      ) {
        throw new Error('Attachment font glyph has not loaded');
      }
      if (rect.width !== 32 || rect.height !== 32) {
        throw new Error(`Expected a fixed 32px Attachment icon, received ${rect.width}x${rect.height}px`);
      }
    }
  },
};
