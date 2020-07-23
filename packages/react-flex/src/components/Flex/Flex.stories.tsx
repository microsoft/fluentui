import * as React from 'react';
import { Flex } from './Flex';
import { FlexItem } from '../FlexItem';
import * as classes from './Flex.stories.scss';

export const inlineFlex = () => (
  <Flex inline={true}>
    <FlexItem>
      <p>
        Hello eeeee
        <Flex inline={true}>
          <FlexItem>
            <h2 className={classes.text}>Hello World</h2>
          </FlexItem>
          <FlexItem>
            <h2 className={classes.text}>Goodbye World</h2>
          </FlexItem>
          <FlexItem>
            <h2 className={classes.text}>I'm back World</h2>
          </FlexItem>
        </Flex>
        eeeeeeeeeee
      </p>
    </FlexItem>
    <FlexItem>
      <p>
        Hello eeeee
        <Flex inline={false}>
          <FlexItem>
            <h2 className={classes.text}>Hello World</h2>
          </FlexItem>
          <FlexItem>
            <h2 className={classes.text}>Goodbye World</h2>
          </FlexItem>
          <FlexItem>
            <h2 className={classes.text}>I'm back World</h2>
          </FlexItem>
        </Flex>
        eeeeeeeeeee
      </p>
    </FlexItem>
  </Flex>
);
