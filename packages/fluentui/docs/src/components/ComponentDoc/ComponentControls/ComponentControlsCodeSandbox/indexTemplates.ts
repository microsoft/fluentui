export const appTemplate = `import { SandboxApp } from "@fluentui/code-sandbox"
import * as React from "react";
import * as ReactDOM from "react-dom";

import Example from "./example";

//
// You can edit this example in "example.js" or "example.tsx".
//

ReactDOM.render(
  <SandboxApp>
    <Example />
  </SandboxApp>,
  document.getElementById("root")
);
`;
