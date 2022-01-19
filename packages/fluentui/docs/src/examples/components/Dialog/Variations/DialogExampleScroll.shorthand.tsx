import { Button, Dialog } from '@fluentui/react-northstar';
import * as React from 'react';
import * as _ from 'lodash';

const DialogExampleScroll = () => (
  <Dialog
    content={{
      content: (
        <>
          {_.times(10, i => (
            <p key={i}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ornare, neque eget egestas fermentum,
              massa risus mollis orci, et ullamcorper purus turpis at risus. Fusce pharetra mollis sapien nec commodo.
              Quisque ut congue sem, vel aliquam augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
              posuere cubilia Curae; Duis porttitor, nunc quis dapibus imperdiet, ligula sem egestas orci, sed volutpat
              ipsum felis vitae velit. Sed maximus egestas dui elementum aliquam. In hac habitasse platea dictumst.
              Proin maximus nibh velit, ut ornare dui mollis viverra.
            </p>
          ))}
        </>
      ),
      styles: {
        maxHeight: '500px',
        overflow: 'scroll',
      },
    }}
    trigger={<Button content="Open a dialog" />}
  />
);

export default DialogExampleScroll;
