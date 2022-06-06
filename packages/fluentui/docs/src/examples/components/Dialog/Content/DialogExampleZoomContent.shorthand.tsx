import * as React from 'react';
import * as _ from 'lodash';
import { Button, Dialog } from '@fluentui/react-northstar';
import { CloseIcon } from '@fluentui/react-icons-northstar';

const DialogExampleZoomContent: React.FC = () => (
  <Dialog
    cancelButton="Cancel"
    confirmButton="Confirm"
    content={{
      content: (
        <>
          {_.times(5, i => (
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
        // keep only 1 scrollbar while zooming
        height: '100%',
        maxHeight: '250px',
        overflow: 'auto',
      },
    }}
    header="Action confirmation"
    headerAction={{ icon: <CloseIcon />, title: 'Close' }}
    trigger={<Button content="Open a dialog" />}
  />
);

export default DialogExampleZoomContent;
