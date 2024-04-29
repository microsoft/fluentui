import { ReactWrapper } from 'enzyme';
import * as React from 'react';
import { isConformant, implementsShorthandProp, handlesAccessibility } from 'test/specs/commonTests';
import { mountWithProvider, findIntrinsicElement } from 'test/utils';
import { keyboardKey } from '@fluentui/accessibility';

import { Attachment, attachmentClassName } from 'src/components/Attachment/Attachment';
import { AttachmentAction, attachmentActionClassName } from 'src/components/Attachment/AttachmentAction';
import { AttachmentDescription } from 'src/components/Attachment/AttachmentDescription';
import { AttachmentHeader } from 'src/components/Attachment/AttachmentHeader';
import { AttachmentIcon } from 'src/components/Attachment/AttachmentIcon';

const attachmentImplementsShorthandProp = implementsShorthandProp(Attachment);

const getAttachment = (onClickAttachment: jest.Mock, onClickButton: jest.Mock): ReactWrapper => {
  return mountWithProvider(
    <Attachment
      actionable
      action={{
        icon: 'more',
        onClick: onClickButton,
      }}
      onClick={onClickAttachment}
    />,
  );
};

describe('Attachment', () => {
  isConformant(Attachment, { testPath: __filename, constructorName: 'Attachment' });

  attachmentImplementsShorthandProp('action', AttachmentAction);
  attachmentImplementsShorthandProp('description', AttachmentDescription);
  attachmentImplementsShorthandProp('icon', AttachmentIcon);
  attachmentImplementsShorthandProp('header', AttachmentHeader);

  describe('accessibility', () => {
    handlesAccessibility(Attachment, {
      defaultRootRole: undefined,
    });

    test('handleClick is executed when Enter is pressed on attachment element', () => {
      const onClickAttachment = jest.fn();
      const onClickButton = jest.fn();
      const attachment = getAttachment(onClickAttachment, onClickButton);
      attachment.find(`.${attachmentClassName}`).simulate('keydown', { keyCode: keyboardKey.Enter });
      expect(onClickAttachment).toHaveBeenCalledTimes(1);
    });

    test('handleClick is Not executed on attachment element, when Enter is pressed on more option button', () => {
      const onClickAttachment = jest.fn();
      const onClickButton = jest.fn();
      const attachment = getAttachment(onClickAttachment, onClickButton);
      findIntrinsicElement(attachment, `.${attachmentActionClassName}`).simulate('keydown', {
        keyCode: keyboardKey.Enter,
      });
      expect(onClickAttachment).not.toBeCalled();
    });
  });
});
