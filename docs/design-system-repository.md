# Design system repository structure

Fluent UI supports multiple delivery models in one repository. The repository
is the source of truth for shared design tokens, accessibility requirements,
component behavior, and documentation. Each framework integration owns its
runtime and packaging details.

## Integration boundaries

| Integration | Location | Consumer |
| --- | --- | --- |
| Shared tokens | `packages/tokens/` | All integrations |
| React components | `packages/react-components/` | React applications |
| Flask/Jinja integration | `packages/flask-ui/` | Flask applications |

The existing React packages remain unchanged. The Flask package is currently a
private scaffold so its API can be designed without prematurely publishing an
incomplete package.

## Branch and repository policy

Use one repository and short-lived feature branches. Do not maintain permanent
framework branches: they drift, make shared token changes harder to review, and
prevent one pull request from showing the complete cross-framework impact.

Use a separate repository only if an integration requires different access
controls, release ownership, or a substantially different contribution
workflow. A separate repository should still consume the shared token contract
and publish compatibility documentation.
