import * as React from 'react';
import { isConformant, implementsShorthandProp, handlesAccessibility } from 'test/specs/commonTests';
import { mountWithProvider, findIntrinsicElement } from 'test/utils';
import * as keyboardKey from 'keyboard-key';

import Attachment from 'src/components/Attachment/Attachment';
import Box from 'src/components/Box/Box';
import Button from 'src/components/Button/Button';
import Text from 'src/components/Text/Text';
import { ReactWrapper } from 'enzyme';

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
  isConformant(Attachment, { constructorName: 'Attachment' });

  attachmentImplementsShorthandProp('action', Button);
  attachmentImplementsShorthandProp('description', Text);
  attachmentImplementsShorthandProp('icon', Box, { mapsValueToProp: 'children' });
  attachmentImplementsShorthandProp('header', Text);

  describe('accessibility', () => {
    handlesAccessibility(Attachment, {
      defaultRootRole: undefined,
    });

    test('handleClick is executed when Enter is pressed on attachment element', () => {
      const onClickAttachment = jest.fn();
      const onClickButton = jest.fn();
      const attachment = getAttachment(onClickAttachment, onClickButton);
      attachment.find(`.${Attachment.className}`).simulate('keydown', { keyCode: keyboardKey.Enter });
      expect(onClickAttachment).toHaveBeenCalledTimes(1);
    });

    test('handleClick is Not executed on attachment element, when Enter is pressed on more option button', () => {
      const onClickAttachment = jest.fn();
      const onClickButton = jest.fn();
      const attachment = getAttachment(onClickAttachment, onClickButton);
      findIntrinsicElement(attachment, `.${Attachment.slotClassNames.action}`).simulate('keydown', {
        keyCode: keyboardKey.Enter,
      });
      expect(onClickAttachment).not.toBeCalled();
    });
  });
});
