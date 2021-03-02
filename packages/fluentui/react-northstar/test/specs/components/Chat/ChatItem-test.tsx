import { isConformant, implementsShorthandProp } from 'test/specs/commonTests';
import { ChatItem } from 'src/components/Chat/ChatItem';
import { Box } from 'src/components/Box/Box';

const chatItemImplementsShorthandProp = implementsShorthandProp(ChatItem);

describe('ChatItem', () => {
  isConformant(ChatItem, {
    testPath: __filename,
    constructorName: 'ChatItem',
  });

  chatItemImplementsShorthandProp('gutter', Box, { mapsValueToProp: 'children' });
  chatItemImplementsShorthandProp('message', Box, { mapsValueToProp: 'children' });
});
