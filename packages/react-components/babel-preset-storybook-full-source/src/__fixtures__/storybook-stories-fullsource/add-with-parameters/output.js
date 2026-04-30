import * as React from 'react';
export const Default = () => /*#__PURE__*/ React.createElement(Button, null, 'Click me');
Default.parameters = {};
Default.parameters.fullSource =
  'import * as React from "react";\n\nexport const Default = () => <Button>Click me</Button>;\n';
Default.parameters.docs = Object.assign({}, Default.parameters.docs, {
  source: Object.assign({}, Default.parameters.docs && Default.parameters.docs.source, {
    code: "import * as React from 'react';\n\nexport const Default = () => <Button>Click me</Button>;\n",
    originalSource: "import * as React from 'react';\n\nexport const Default = () => <Button>Click me</Button>;\n",
  }),
});
