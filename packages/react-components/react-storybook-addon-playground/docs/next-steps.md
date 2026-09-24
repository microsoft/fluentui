# Fluent UI Playground: Proposed Next Steps

## Summary

The Fluent UI Storybook Playground turns story source into an editable, executable, and shareable browser experience. The current implementation establishes the important product foundation:

- An **Open in Playground** action in Storybook Docs
- Monaco-based TSX editing and IntelliSense
- Consumer-controlled packages and typings
- Optional setup for branding, themes, providers, and rendering
- Editable CSS module sources
- Sandboxed preview execution
- Shareable URL state
- Support for workspace and private-registry packages without a runtime CDN

The next opportunity is to make the same playground format available outside the UI. A stable programmatic interface would let developer tools and agents create, inspect, validate, and repair playgrounds.

The recommended sequence is:

1. Land and validate the manual Storybook workflow.
2. Stabilize the playground state protocol.
3. Add playground commands to `@fluentui/cli`.
4. Add focused agent instructions or a skill that uses the CLI.
5. Explore deeper automation only after the workflows are proven.

## Product Direction

The playground should become a portable executable example format for Fluent UI.

A playground URL can support several workflows:

- A documentation reader opens a story, edits it, and shares the result.
- A developer creates a minimal reproduction without creating a repository.
- A support engineer opens the exact reproduction reported by a user.
- An agent generates a runnable example from a prompt.
- An agent inspects a reported playground, explains the root cause, and returns a corrected link.
- An approved playground is converted into a Storybook story, test, or implementation task.

The browser UI should remain the primary human experience. The CLI and agent integration should reuse the same format rather than introduce a separate representation.

## Goals

- Make playground state safe and reliable to exchange between humans and tools.
- Provide deterministic commands for creating and reading playground URLs.
- Enable agents without requiring them to understand URL compression or internal implementation details.
- Validate generated examples against the packages available in a target Storybook.
- Preserve the playground's sandbox and package-allowlist security model.
- Keep the initial automation small enough to maintain and test.

## Non-goals

- Turning the playground into a general-purpose web IDE
- Supporting arbitrary npm installation at runtime
- Running playground code directly inside an agent process
- Replacing Storybook stories or repository tests
- Automatically committing generated code without developer review
- Building an MCP server before the core protocol and CLI workflows are stable

## Phase 1: Land and Harden the Manual Workflow

The first milestone is a reliable browser experience.

### Work

- Land the Storybook addon and initial headless Storybook integration.
- Confirm development and static Storybook builds serve both the playground shell and runtime.
- Verify behavior when Storybook is deployed under a URL subpath.
- Verify configured workspace and private packages work without a runtime CDN.
- Validate malformed source, CSS, URL payloads, and stale compile transactions.
- Confirm the sandbox does not gain same-origin access.
- Document package configuration, optional setup, limitations, and per-story disabling.

### Exit criteria

- A user can open a supported story in the playground, edit it, run it, and share the resulting URL.
- The shared URL reproduces the same TSX and CSS state in another browser session.
- Compilation and runtime errors are shown without breaking the playground shell.
- The playground works in both local Storybook and its deployed static output.

## Phase 2: Stabilize the Playground Protocol

The URL state is currently an implementation detail. CLI and agent integrations require a supported, environment-neutral protocol.

### Proposed API

```ts
export interface PlaygroundFile {
  name: string;
  language: 'tsx' | 'css';
  source: string;
}

export interface PlaygroundState {
  code: string;
  cssModules?: Array<{
    name: string;
    source: string;
  }>;
}

export function createPlaygroundHash(state: PlaygroundState): string;

export function decodePlaygroundStateFromHash(hash: string): PlaygroundState | null;

export function createPlaygroundUrl(state: PlaygroundState, baseUrl: string): string;
```

### Packaging

Preferred long-term structure:

```text
@fluentui/playground-protocol
  ├── URL encoding and decoding
  ├── state types
  └── no React, DOM, Monaco, or Storybook dependencies

@fluentui/react-storybook-addon-playground
  └── depends on playground-protocol

@fluentui/cli
  └── depends on playground-protocol
```

This avoids making the CLI depend on the full Storybook addon and its browser-oriented dependencies.

For an initial prototype, the addon could instead expose a Node-safe `./url` subpath. Extraction into a lightweight protocol package can follow once the command contract is validated.

### Compatibility

- Add an explicit protocol version before making the format public.
- Decode previous versions where practical.
- Reject unsupported future versions with a clear error.
- Preserve unknown fields only when doing so is safe.
- Define maximum source and URL sizes.
- Test empty, malformed, truncated, and unexpectedly large payloads.

## Phase 3: Integrate with `@fluentui/cli`

`@fluentui/cli` should be the supported automation surface. It is usable by developers, CI, Copilot skills, and future MCP integrations.

### Command group

```sh
fluentui-cli playground create
fluentui-cli playground inspect
fluentui-cli playground validate
```

The command should use the CLI's existing yargs and lazy-handler architecture. It should be scaffolded with the `@fluentui/workspace-plugin:cli-command` Nx generator.

### `playground create`

Create a URL from local files or stdin:

```sh
fluentui-cli playground create \
  --storybook https://react.fluentui.dev \
  --code ./Example.tsx \
  --css ./styles.module.css \
  --json
```

Agent-friendly stdin:

```sh
cat Example.tsx | fluentui-cli playground create \
  --storybook https://react.fluentui.dev \
  --code - \
  --json
```

Example output:

```json
{
  "protocolVersion": 1,
  "url": "https://react.fluentui.dev/playground/app/playground.html#...",
  "files": ["Example.tsx", "styles.module.css"]
}
```

### `playground inspect`

Decode a URL into structured data:

```sh
fluentui-cli playground inspect "<playground-url>" --json
```

Example output:

```json
{
  "protocolVersion": 1,
  "code": "export default function Example() { ... }",
  "cssModules": [
    {
      "name": "styles.module.css",
      "source": ".root { ... }"
    }
  ]
}
```

Optional future support:

```sh
fluentui-cli playground inspect "<playground-url>" --output ./repro
```

This would write the TSX and CSS into a local directory for investigation.

### `playground validate`

Validate a URL or local source against a target Storybook:

```sh
fluentui-cli playground validate "<playground-url>" --json
```

Initial validation should:

- Decode and validate the state schema.
- Fetch the target playground runtime manifest.
- Check imports against `allowedModules`.
- Require a renderable default export.
- Verify CSS module names and payloads.
- Report source and URL size violations.

Later validation could use a browser to compile and execute the example, but this should not block the initial CLI.

### Automation contract

Every command should:

- Support stable JSON output.
- Use stdout for results and stderr for diagnostics.
- Exit nonzero when the operation fails.
- Avoid interactive prompts when `--json` is supplied.
- Never silently discard malformed state.
- Avoid opening a browser unless `--open` is explicitly supplied.
- Avoid printing decoded source unless requested.
- Produce actionable error codes for agent callers.

## Phase 4: Add a Fluent Playground Agent Skill

The skill should contain workflow guidance, not URL implementation details. It should always call `@fluentui/cli` for encoding, decoding, and validation.

### Suggested triggers

- "Create a Fluent UI playground"
- "Make this example shareable"
- "Investigate this playground repro"
- "Fix this playground"
- "Turn this playground into a story or test"

### Create workflow

1. Identify the target Storybook.
2. Read or validate its allowed modules.
3. Generate a self-contained TSX default export.
4. Use only packages available in the runtime manifest.
5. Add CSS modules only when needed.
6. Run `fluentui-cli playground create`.
7. Run `fluentui-cli playground validate`.
8. Return the URL and a short description.

### Investigation workflow

1. Run `fluentui-cli playground inspect` on the supplied URL.
2. Review every TSX and CSS file.
3. Reproduce or inspect compilation and runtime diagnostics.
4. Identify the root cause.
5. Apply the smallest relevant correction.
6. Create and validate a corrected URL.
7. Return the root cause, correction, and new URL.

### Agent safety and quality rules

- Treat playground code as untrusted.
- Never execute it outside the sandbox.
- Never place credentials, customer data, or private source in a shareable URL.
- Use only modules allowed by the target runtime manifest.
- Preserve unrelated source when fixing a reproduction.
- Follow Fluent UI accessibility and controlled-component patterns.
- Report validation failures instead of returning a success-shaped response.
- Do not claim a reproduction is fixed until the corrected URL is validated.

## Phase 5: Workflow Extensions

These should follow only after create, inspect, and validate are reliable.

### Convert a playground into repository artifacts

```sh
fluentui-cli playground export-story "<url>" --project react-button
fluentui-cli playground export-test "<url>" --project react-button
```

These operations should generate a draft and require developer review. They should not commit automatically.

### Issue templates

Add an optional playground URL field to relevant issue templates. Triage agents could inspect the link before requesting a standalone repository.

### Documentation integration

Allow approved playgrounds to become examples linked from component documentation while keeping the Storybook story as the durable source of truth.

### MCP integration

An MCP server could eventually expose:

- `create_playground`
- `inspect_playground`
- `validate_playground`
- `run_playground`

The MCP implementation should call the same protocol and validation libraries as the CLI.

## Security and Privacy

The agent workflow expands how playground URLs are exchanged, so the security model must be explicit.

- Playground source is untrusted input.
- Runtime execution remains inside the sandboxed iframe.
- The CLI must not evaluate decoded code.
- Remote manifest requests need clear timeouts and response-size limits.
- Redirect behavior should be constrained to prevent unintended network access.
- Shareable URLs must not contain secrets or proprietary customer source.
- Error messages should not expose local filesystem contents unnecessarily.
- URL size limits should be enforced before links are emitted.
- Browser-backed validation should use an isolated context.

## Testing Strategy

### Protocol

- Round-trip TSX and CSS state
- Unicode and special characters
- Empty source
- Invalid compression
- Invalid JSON
- Duplicate CSS filenames
- Unsupported protocol versions
- Maximum-size behavior

### CLI

- File and stdin input
- JSON output schemas
- Invalid URLs
- Missing files
- Unreachable manifests
- Unsupported imports
- Nonzero exit behavior
- No source leakage in default diagnostics

### Integration

- Create a link with the CLI and open it in the browser playground.
- Edit and share a link in the browser, then inspect it with the CLI.
- Validate against local and deployed Storybook instances.
- Verify Storybook deployment under a subpath.
- Verify a corrected agent-generated URL reproduces the fix.

## Success Measures

Initial qualitative measures:

- Developers can create and inspect playground links without knowing the URL format.
- Support and triage can use a playground link as a sufficient minimal reproduction.
- Generated links reliably open against the intended Storybook.
- Agent-generated examples use only supported packages and produce actionable validation failures.

Potential quantitative measures:

- Percentage of playground issue reports reproducible from one link
- Time from issue report to confirmed reproduction
- Playground links created or shared from Storybook
- CLI validation success rate
- Number of playgrounds converted into stories or tests

## Open Questions

1. Should the protocol live in a new lightweight package or initially be exported from the addon?
2. Which deployed Storybook URL should the CLI use by default?
3. Should generated links include an explicit runtime/build identifier?
4. What source and URL size limits are acceptable?
5. Should `validate` perform static checks only or launch a browser by default?
6. How should a playground declare compatibility with different Fluent UI versions?
7. Should issue templates accept playground URLs before the CLI and agent workflow are generally available?

## Recommended Five-Minute Demo

The demo should show the manual UI flow first and describe agentic workflows as the next direction.

This ordering is recommended because:

- It demonstrates functionality that exists today.
- It gives the audience a concrete mental model before introducing automation.
- It avoids implying that CLI or agent integration is already production-ready.
- The manual shareable URL naturally leads to the idea that the same state can be consumed by tools.

### 0:00-0:40 — Problem

Open a Storybook Docs page.

Explain:

- Source can be viewed, but not edited and run in place.
- External sandboxes may not have workspace or private packages.
- Sharing a reproduction often requires creating a separate repository.

### 0:40-1:20 — Open the playground

Click **Open in Playground**.

Briefly identify:

- Story source loaded into Monaco
- IntelliSense for configured Fluent UI packages
- Live preview using the Storybook-provided runtime
- Sandboxed execution

### 1:20-2:50 — Edit and run

Make one visible TSX change:

- Change button appearance or content.
- Add another Fluent UI component using IntelliSense.
- Trigger and then correct a small type or runtime error.

If the story includes CSS modules, make one small CSS change and show that the preview updates.

### 2:50-3:40 — Theme and sharing

Switch themes if the configured setup provides them.

Copy the URL and open it in another tab or private window. Show that the source and CSS state are restored.

Key statement:

> The link is now a portable, executable Fluent UI example using the packages supplied by this Storybook.

### 3:40-4:40 — Future agent workflow

Show one simple diagram:

```text
Prompt
  -> agent generates TSX/CSS
  -> CLI creates and validates a playground URL
  -> human reviews or modifies it
  -> agent inspects the same URL as a bug reproduction
  -> corrected playground
  -> story, test, or PR
```

Explain that the next step is not to teach an agent the compression format. The proposal is to provide deterministic `create`, `inspect`, and `validate` commands through `@fluentui/cli`, then add a small skill describing the workflow.

If a CLI prototype is available, a short prerecorded or prepared example can be shown. Clearly label it as a prototype or future direction.

### 4:40-5:00 — Close

Suggested closing:

> Storybook documents what our components can do. The playground makes those examples editable and executable. A stable CLI can make the same examples available to agents, turning a shared link into both a prototype and a reproducible bug report.

## Recommendation

Prioritize the browser workflow and its protocol stability first. Present agentic workflows as the logical next layer rather than the primary feature of the initial release.

The recommended implementation order is:

1. Validate and ship the current Storybook experience.
2. Version and extract the playground state protocol.
3. Add `create`, `inspect`, and static `validate` to `@fluentui/cli`.
4. Add a small Fluent Playground skill using those commands.
5. Evaluate browser-backed validation, issue integration, and MCP support from real usage.
