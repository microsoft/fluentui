import * as React from 'react';
import { Button, Dialog } from '@fluentui/react-northstar';

const DialogExampleRtl: React.FC = () => (
  <Dialog
    cancelButton="إلغاء"
    confirmButton="تؤكد"
    content="هذا عن مئات لكون أفاق. تم حتى شواطيء الصفحات, من ألمانيا الأرواح تلك. ان يطول بالعمل وانتهاءً ذات, والتي الفرنسية كل حول. بـ أخذ لغزو الشرقي اوروبا. كان بـ لعملة لهيمنة وبالرغم. عن الا الحكومة البشريةً."
    header="تأكيد العمل"
    trigger={<Button content="حوار مفتوح" />}
  />
);

export default DialogExampleRtl;
