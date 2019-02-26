import * as React from 'react';
import { DialogBasicExample } from './examples/Dialog.Basic.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { DialogLargeHeaderExample } from './examples/Dialog.LargeHeader.Example';
import { DialogBlockingExample } from './examples/Dialog.Blocking.Example';
import { DialogTopOffsetFixedExample } from './examples/Dialog.TopOffsetFixed.Example';
import { DialogStatus } from './Dialog.checklist';
import { DialogModelessExample } from './examples/Dialog.Modeless.Example';

const DialogBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dialog/examples/Dialog.Basic.Example.tsx') as string;
const DialogLargeHeaderExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dialog/examples/Dialog.LargeHeader.Example.tsx') as string;
const DialogBlockingExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dialog/examples/Dialog.Blocking.Example.tsx') as string;
const DialogTopOffsetFixedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dialog/examples/Dialog.TopOffsetFixed.Example.tsx') as string;
const DialogBlockingExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Dialog/Dialog.Blocking.Example.Codepen.txt') as string;
const DialogModelessExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dialog/examples/Dialog.Modeless.Example.tsx') as string;

export const DialogPageProps: IDocPageProps = {
  title: 'Dialog',
  componentName: 'Dialog',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Dialog',
  componentStatus: DialogStatus,
  examples: [
    {
      title: 'Default Dialog',
      code: DialogBasicExampleCode,
      view: <DialogBasicExample />
    },
    {
      title: 'Dialog with large header and ChoiceGroup',
      code: DialogLargeHeaderExampleCode,
      view: (
        <>
          <p>
            Use this Dialog sparingly, when calling extra attention to the content. It can be used in situations where you want to teach the
            user something or notify them of an important change.
          </p>
          <DialogLargeHeaderExample />
        </>
      )
    },
    {
      title: 'Blocking Dialog',
      code: DialogBlockingExampleCode,
      view: (
        <>
          <p>
            A blocking Dialog disables all other actions and commands on the page behind it. They should be used very sparingly, only when
            it is critical that the user makes a choice or provides information before they can proceed. Blocking Dialogs are generally used
            for irreversible or potentially destructive tasks.
          </p>
          <DialogBlockingExample />
        </>
      ),
      codepenJS: DialogBlockingExampleCodepen
    },
    {
      title: 'Dialog with Top Offset Fixed',
      code: DialogTopOffsetFixedExampleCode,
      view: (
        <>
          <p>
            This Dialog maintains its top position and expands only the bottom, offering a more stable appearance when a Dialog's content
            changes dynamically.
          </p>
          <DialogTopOffsetFixedExample />
        </>
      )
    },
    {
      title: 'Modeless Dialog',
      code: DialogModelessExampleCode,
      view: <DialogModelessExample />
    }
  ],
  propertiesTablesSources: [require<string>('!raw-loader!office-ui-fabric-react/src/components/Dialog/Dialog.types.ts')],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Dialog/docs/DialogOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Dialog/docs/DialogDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Dialog/docs/DialogDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
