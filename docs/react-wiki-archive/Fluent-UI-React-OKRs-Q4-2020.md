- **Vette Fluent UI in Product​**
  - Ship hooks component model and design tokens in Ribbon (dogfood)
  - Ship open source subset of MDL2 icons
  - OWA integrates new ThemeProvider​
  - Use of converged utilities in newly build react-northstar components​
- **Prove out our new styling and component model​**
  - Deliver ThemeProvider to consume the same converged primitives in both Office and Teams
  - Deliver refreshed primitives for Card Scenario to Office.com and Teams
  - Deliver refreshed primitives and update existing Me control for Teams
  - Release a guide covering how to build components​ with new hooks based model
  - Identify next set of converged primitives and roll out plan​
  - Prototype and close on converged Accessibility approach​
- **Upgrades of @fluentui/react-northstar and @fluentui/react@8 are easy and less time consuming**
  - Reduce the engineering cost it takes Teams to consume an update of @fluentui/react-northstar to 1eng/month
  - Move Tier 1 partners on to @fluentui/react@8 by end of the quarter​
- **Customers and Partners find the answers they need when reaching out to our team through broad channels**
  - Responses on React Teams channel increase by 50%​
  - Increase Github Issues that are either fixed or closed by 35%​
- **The microsoft/fluentui repo fosters community and contribution with fast builds, good testing, and great documentation​**
  - Improve PR/CI pipeline duration (30 day) 24m to 17m (30% improvement)
  - Improve PR/CI build reliability by 30% (measurement TBD)

# OKR Work Breakdown

Below is a repetition of the OKRs above, but with proposed work mapped to the OKRs. This is the master list of potential work that will help move our OKRs forward. Not all of this work will be completed this quarter, but should be considered our backlog. Look to [Monthly Project Cycles](Fluent-UI-Project-Cycles) for committed work.

## **Reflect Fluent UI in Product**

- [ ] [Open question Aneesha/Mak] Cards in Office.com
- [x] OWA integrating Theme Provider - Xu
  - Gather feedback
- [ ] Ship hooks model and design tokens in Ribbon (dogfood) - David - [#15757](https://github.com/microsoft/fluentui/issues/15757)
- [ ] Ship Open source MDL2 icons - Tomi
  - 1 pager for engineering plan
  - Build tooling to construct from icon truth
  - [x] Produce open source subset of MDL2 svg icons
  - [ ] Produce set of new Fluent UI icons (svg) - [#15758](https://github.com/microsoft/fluentui/issues/15758)
- [ ] Use of converged utilities in newly built react northstar components
  - [TODO - what is in plan for Q2/Q4 what is on backlog]
  - validate v8 hooks in northstar
  - children as slot VS. as replacement of all slots (investigate size of breaking change in TMP)
  - Finish converging FocusZone/FocusTrapZone [Mak]
  - Unify click outside and ESC to close scenarios between v7/v8/northstar so that components can be integrated (v7/v8 Files experience in Teams) [Task]
  - style overrides hook - document, migrate TMP style overrides to it

## **Prove out our new styling and component model**

- [ ] Prototype and close on converged Accessibility approach
  - Marat's ability helpers - pair Marat with somebody from convergence to propose integration for javascript based focus zone, trap zone, delooser and others\*
  - focus, aria, and key handlers should be implemented in hooks going forward
  - new approach to testing and documenting accessibility is available, use it v8 and in more northstar components
  - Improve accessibility support and validations in UI builder
  - Consider https://react-spectrum.adobe.com/react-aria/index.html
- [ ] Deliver Theme provider to consume the same converged primitives in both Office and Teams - Xu [#15749](https://github.com/microsoft/fluentui/issues/15749)
- [ ] [Epic] Deliver primitives for Card Scenario to Office.com and enable buidling Me control for Teams – Mak [TODO wording]
  - Full details here: [Component Refresh + Convergence Schedule](/coming soon)
  - Build:
    - [ ] Card - Mak/Josche
    - [ ] Link - Mak/Josche
    - [ ] Icon - Mak/Josche
    - [ ] Menu - Ben/Tomi
    - [ ] Separator - Josche/Mak
  - Finish:
    - [ ] Text
    - [ ] Image
    - [ ] Avatar - Ben/Tomi
    - [ ] Badge/Status - Ben/Tomi
  - Start:
    - [ ] Tooltip/Callout - Josche/Mak
  - [ ] Release a guide covering how to build converged components – David
    - Start this quarter, gather decisions, and our approachs
    - Write the guide, publish review, get feedback
  - [ ] Identify next set of converged primitives and roll out plan
    - Build scorecard, publish roadmap, publish this
  - [ ] [Need Assignment] Investigate Configurator API that allows us to modify default props

## **Make upgrades to @fluentui/react-northstar and @fluentui/react@8 easier and less time consuming**

- [ ] Reduce the time it takes Teams to consume an update of @fluentui/react-northstar
  - Investigate applying codemods to react-northstar
  - Goal: 1 engineer cost to continually consume Fluent UI Updates within release cycle
  - Goal: regular smaller releases of v0 quickly consumable by TMP without breaking changes
- [ ] Move Tier 1 partners on to @fluentui/react@8 by end of the quarter - Jon
  - Engage through Tier 1 partner relationships
    - (Azure: David, OWA: Xu, SharePoint: Jon, Office.com: David (Mak?), WAC: David, Teams?: Levi)

## **Audit/improve external channels (Teams channels, GitHub, Discord/GitHub Discussions?, etc.)**

- [ ] Responses on React Teams channel increase by 50%
  - Measure current response time
  - Dedicate Shield attention to replying or connecting right contact
- [ ] Increase Github Issues that are either fixed or closed by 35%
  - Measure current fix rate and median response time
  - Improve investigation flow of issues enabling better fix opportunity
  - Dedicate engineer resources to fix issues
- [ ] Proper domain for v0 docs

## **The microsoft/fluentui repo fosters community and contribution with fast builds, good testing, and great documentation**

- For ideas, not committed yet: [Build wish list](https://hackmd.io/mjciSB_aTqGUU_ox3o7eCQ) (feel free to add things)
- Improve test coverage through screener, leak detection, testing-library work
  - [ ] integrate Teams' leak detection in CI
  - [ ] use testing-library (Enzyme renders differently than ReactDOM.render() & it continues to loose community, adapter for React 17RC was not released yet.)
- Improve build performance by X
  - [ ] react-icons build perf concerns
  - [ ] Split size auditor bundling into parallel jobs (1-2 days, decreases build time by at least 1/3)
  - [ ] Upgrade to TS 4.0+ (helps unblock project references)
    - Must ensure that .d.ts files remain backwards-compatible with TS 3.7 (at least for anything used by `@fluentui/react` v8). [downlevel-dts](https://www.npmjs.com/package/downlevel-dts) could help.
  - [ ] Continued work on build perf
- Improve build reliability by X
  - [ ] ability to run screener and CI for branches/patch releases
  - [ ] switch v7 screener to webhooks
    - Should we move the webhooks solution for running screener to some kind of azure infra?
  - [ ] Continued work on build reliability
- Contributors find contributing easy due to consistent package scaffolding, conformance tests, and documentation
  - [ ] consistent package structure (v0, v8)
  - [ ] Conformance tests
  - [ ] [versioned docs site (v0)](https://hackmd.io/roW27OhISDmCcQnOm2hviA)
  - [ ] [Docs site arch changes](https://hackmd.io/aPUhJqFnS2O9WisQ-g7pmg)

## **Unmapped work**

- [ ] Replace dotted (Menu.Item) components with one word (MenuItem) in v0

## Menu [Project]\*

- depends on focusing, see Architecture / base utilities part above
- in northstar, refactor or restructuring is needed - split Menu to Nav (?), Tabs and ContextualMenu because contextual menu does not have concept of `active` which makes tracking hover and focus state difficult - Charles has a prototype, can this be used as base for converged ContextualMenu?
- decide if we need rendering of the menu popup inline

## Cards Scenario [Project]

- compare API between v8 and northstar, resolve differences
- accessibility - define variants and scenarios
- tokens - compare v8 and northstar, resolve differences
- make progress on required components (Button, Text, Image, Avatar...)

## Me control [Project]

- Accessibility spec needed to understand which components they will use

## UI Builder [Project]

- create separate package / docs
