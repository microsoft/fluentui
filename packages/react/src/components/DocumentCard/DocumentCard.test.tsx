/* eslint-disable no-script-url */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { WindowProvider } from '@fluentui/react-window-provider';

import { setWarningCallback } from '../../Utilities';
import { DocumentCard } from './DocumentCard';
import { DocumentCardTitle } from './DocumentCardTitle';
import { DocumentCardPreview } from './DocumentCardPreview';
import { DocumentCardActivity } from './DocumentCardActivity';
import type { IDocumentCardProps } from './DocumentCard.types';

describe('DocumentCard', () => {
  it('renders DocumentCard correctly', () => {
    const { container } = render(
      <DocumentCard>
        <DocumentCardPreview previewImages={[]} />
        <DocumentCardTitle title="" />
        <DocumentCardActivity activity="" people={[{ name: '', profileImageSrc: '' }]} />
      </DocumentCard>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('onClickHref', () => {
    let warnings: string[];
    let mockWindow: { open: jest.Mock; location: { href: string } };

    const clickCard = (props: IDocumentCardProps) => {
      const { getByRole } = render(
        <WindowProvider window={mockWindow as unknown as Window}>
          <DocumentCard {...props}>
            <DocumentCardTitle title="Quarterly report.docx" />
          </DocumentCard>
        </WindowProvider>,
      );

      fireEvent.click(getByRole('group'));
    };

    beforeEach(() => {
      warnings = [];
      setWarningCallback(message => warnings.push(message));
      mockWindow = { open: jest.fn(), location: { href: 'https://contoso.example/home' } };
    });

    afterEach(() => {
      setWarningCallback(undefined);
    });

    it.each([
      'https://contoso.example/doc.docx',
      '/relative/doc.docx',
      '#section',
      '?page=2',
      'mailto:someone@contoso.example',
      'tel:+1234567890',
      'ms-word:ofe|u|https://contoso.example/doc.docx',
      'msteams:/l/chat',
    ])('navigates to %s without warning', href => {
      clickCard({ onClickHref: href });

      expect(mockWindow.location.href).toBe(href);
      expect(warnings).toHaveLength(0);
    });

    it.each([
      'javascript:alert(1)',
      ' javascript:alert(1)',
      'java\nscript:alert(1)',
      '\0javascript:alert(1)',
      'JaVaScRiPt:alert(1)',
      'vbscript:msgbox(1)',
    ])('warns about the script URL %j but still navigates', href => {
      clickCard({ onClickHref: href });

      expect(mockWindow.location.href).toBe(href);
      expect(warnings).toHaveLength(1);
      expect(warnings[0]).toMatch(/script URL/);
    });

    it('warns about script URLs opened in another browser context', () => {
      clickCard({ onClickHref: 'javascript:alert(1)', onClickTarget: '_blank' });

      expect(mockWindow.open).toHaveBeenCalledWith('javascript:alert(1)', '_blank', 'noreferrer noopener nofollow');
      expect(warnings).toHaveLength(1);
    });

    it('does not navigate or warn when onClick takes precedence', () => {
      const onClick = jest.fn();
      clickCard({ onClick, onClickHref: 'javascript:alert(1)' });

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(mockWindow.open).not.toHaveBeenCalled();
      expect(mockWindow.location.href).toBe('https://contoso.example/home');
      expect(warnings).toHaveLength(0);
    });
  });
});
