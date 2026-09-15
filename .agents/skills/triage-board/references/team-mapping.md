# CODEOWNERS handle → board Team mapping

The "Fluent UI - Unified" board (org project `microsoft/projects/395`) has a fixed set of options for its `Team` single-select field. CODEOWNERS uses a wider set of team handles than the board tracks, so not every CODEOWNERS entry maps cleanly — the skill should flag uncertain ones for human review rather than guess.

To refresh the option IDs against the live project (they're stable but not immortal):

```bash
gh api graphql -f query='{
  organization(login:"microsoft") {
    projectV2(number:395) {
      id
      fields(first:30) {
        nodes {
          ... on ProjectV2SingleSelectField { id name options { id name } }
        }
      }
    }
  }
}' | jq '.data.organization.projectV2 | {id, teamField: (.fields.nodes[] | select(.name=="Team"))}'
```

## Project + field IDs (as of this skill's authoring)

- `projectId` = `PVT_kwDOAF3p4s4AD4d_`
- `teamFieldId` = `PVTSSF_lADOAF3p4s4AD4d_zgCPFLY`

## Board Team options

| Board option      | Option ID  |
| ----------------- | ---------- |
| `cxe-prg`         | `5aacad01` |
| `cxe-red`         | `d78a8f20` |
| `cxe-coastal`     | `40933abb` |
| `teams-prg`       | `64f7bd9e` |
| `v-a11y`          | `4eda3bd1` |
| `v-build`         | `82c4d92c` |
| `v-migration`     | `3a22f81f` |
| `v-perf`          | `15907658` |
| `v-pm`            | `96a8ae0f` |
| `contributor`     | `fe8e8988` |
| `xc-uxe`          | `e7e0e0e0` |
| `fluentui-motion` | `207075c9` |

## Confident mappings

Use these for automatic routing. Evidence is either docs/team-routing.md, a well-known team purpose, or repeated usage in CODEOWNERS that corresponds to a single product area.

| CODEOWNERS handle                    | Board Team        | Notes                                                          |
| ------------------------------------ | ----------------- | -------------------------------------------------------------- |
| `@microsoft/cxe-prg`                 | `cxe-prg`         | v9 component ownership (most of `packages/react-components/*`) |
| `@microsoft/cxe-red`                 | `cxe-red`         | v8 component ownership (most of `packages/react/*`)            |
| `@microsoft/teams-prg`               | `teams-prg`       | Teams-owned packages in fluentui + contrib                     |
| `@microsoft/fluentui-react-build`    | `v-build`         | build tooling, `tools/*`, `.github/*`, root configs            |
| `@microsoft/fui-wc`                  | `cxe-coastal`     | web components team (owns `packages/web-components/*`)         |
| `@microsoft/fluent-motion-framework` | `fluentui-motion` | motion / animation primitives                                  |
| `@microsoft/xc-uxe`                  | `xc-uxe`          | appears in contrib for UXE-owned packages                      |
| `@microsoft/fluentui-react`          | `cxe-red`         | older v8 alias (docs/team-routing.md maps v8 to cxe-red)       |

## Ambiguous / flag-for-human

Don't auto-route these. Set `team_confidence: low` and put a specific ask in `needs_human_followup` so the maintainer can pick.

| CODEOWNERS handle                     | Why ambiguous                                                                       |
| ------------------------------------- | ----------------------------------------------------------------------------------- |
| `@microsoft/charting-team`            | No board Team option — charting doesn't have its own column in this project         |
| `@microsoft/fluentui-northstar`       | Northstar is EOL (v0); routing depends on whether the item should be closed instead |
| `@microsoft/fluentui-v`               | Too generic — could be v8 or v9                                                     |
| `@microsoft/fluentui-admins`          | Meta / admin team, not a product team                                               |
| `@microsoft/azure-design-engineering` | Azure partner team in contrib; unclear if they self-triage or roll up to xc-uxe     |
| `@microsoft/cap-theme`                | Contrib-only team; unclear board mapping                                            |
| `@microsoft/ms-fabric`                | Contrib-only team; unclear board mapping                                            |
| `@microsoft/fluentui-variant-theme`   | Contrib-only team; unclear board mapping                                            |

When you encounter an unmapped handle not in either table, treat it as ambiguous by default and surface it. The list above is expected to grow — add new confident mappings only when the user confirms them explicitly.
