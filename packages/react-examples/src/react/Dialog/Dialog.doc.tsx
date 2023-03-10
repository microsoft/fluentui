import * as React from 'react';
import { DialogBasicExample } from './Dialog.Basic.Example';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';
import { DialogLargeHeaderExample } from './Dialog.LargeHeader.Example';
import { DialogBlockingExample } from './Dialog.Blocking.Example';
import { DialogTopOffsetFixedExample } from './Dialog.TopOffsetFixed.Example';
import { DialogModelessExample } from './Dialog.Modeless.Example';

const DialogBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Dialog/Dialog.Basic.Example.tsx') as string;
const DialogLargeHeaderExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Dialog/Dialog.LargeHeader.Example.tsx') as string;
const DialogBlockingExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Dialog/Dialog.Blocking.Example.tsx') as string;
const DialogTopOffsetFixedExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Dialog/Dialog.TopOffsetFixed.Example.tsx') as string;
const DialogModelessExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Dialog/Dialog.Modeless.Example.tsx') as string;

export const DialogPageProps: IDocPageProps = {
  title: 'Dialog',
  componentName: 'Dialog',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/Dialog',
  examples: [
    {
      title: 'Default Dialog',
      code: DialogBasicExampleCode,
      view: <DialogBasicExample />,
    },
    {
      title: 'Dialog with large header and ChoiceGroup',
      code: DialogLargeHeaderExampleCode,
      view: (
        <>
          <p>
            Use this Dialog sparingly, when calling extra attention to the content. It can be used in situations where
            you want to teach the user something or notify them of an important change.
          </p>
          <DialogLargeHeaderExample />
        </>
      ),
    },
    {
      title: 'Blocking Dialog',
      code: DialogBlockingExampleCode,
      view: (
        <>
          <p>
            A blocking Dialog disables all other actions and commands on the page behind it. They should be used very
            sparingly, only when it is critical that the user makes a choice or provides information before they can
            proceed. Blocking Dialogs are generally used for irreversible or potentially destructive tasks.
          </p>
          <DialogBlockingExample />
        </>
      ),
    },
    {
      title: 'Dialog with Top Offset Fixed',
      code: DialogTopOffsetFixedExampleCode,
      view: (
        <>
          <p>
            This Dialog maintains its top position and expands only the bottom, offering a more stable appearance when a
            Dialog's content changes dynamically.
          </p>
          <DialogTopOffsetFixedExample />
        </>
      ),
    },
    {
      title: 'Modeless Dialog',
      code: DialogModelessExampleCode,
      view: <DialogModelessExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Dialog/docs/DialogOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Dialog/docs/DialogBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
