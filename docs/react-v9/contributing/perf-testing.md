Performance testing with flamegraphs is a feature that runs on all PRs opened against Fluent UI React and was introduced with [PR #9550](https://github.com/microsoft/fluentui/pull/9550). This page provides an overview of this feature. This process is highly recommended, but no longer a hard requirement to check work in.

## Sample Performance Test Results Table

Linked from [#9516](https://github.com/microsoft/fluentui/pull/9516#issuecomment-503795745), which made perf improvements to "New" Button components in `packages/experiments`, is a sample perf test comment:

Component Perf Analysis:

  <table>
  <tr>
    <th>Scenario</th>
    <th>Master Ticks *</th>
    <th>PR Ticks *</th>
  </tr><tr>
            <td>BaseButton</td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/BaseButton_master.html">883</a></td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/BaseButton_pr.html">895</a></td>
           </tr>
<tr>
            <td>BaseButtonNew</td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/BaseButtonNew_master.html">3734</a></td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/BaseButtonNew_pr.html">2536</a></td>
           </tr>
<tr>
            <td>DefaultButton</td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/DefaultButton_master.html">1175</a></td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/DefaultButton_pr.html">1175</a></td>
           </tr>
<tr>
            <td>DefaultButtonNew</td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/DefaultButtonNew_master.html">3241</a></td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/DefaultButtonNew_pr.html">2039</a></td>
           </tr>
<tr>
            <td>DetailsRow</td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/DetailsRow_master.html">8409</a></td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/DetailsRow_pr.html">8535</a></td>
           </tr>
<tr>
            <td>DetailsRowNoStyles</td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/DetailsRowNoStyles_master.html">6357</a></td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/DetailsRowNoStyles_pr.html">6298</a></td>
           </tr>
<tr>
            <td>DocumentCardTitle</td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/DocumentCardTitle_master.html">44342</a></td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/DocumentCardTitle_pr.html">44246</a></td>
           </tr>
<tr>
            <td>MenuButton</td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/MenuButton_master.html">2068</a></td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/MenuButton_pr.html">2078</a></td>
           </tr>
<tr>
            <td>MenuButtonNew</td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/MenuButtonNew_master.html">6473</a></td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/MenuButtonNew_pr.html">4910</a></td>
           </tr>
<tr>
            <td>PrimaryButton</td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/PrimaryButton_master.html">1391</a></td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/PrimaryButton_pr.html">1361</a></td>
           </tr>
<tr>
            <td>PrimaryButtonNew</td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/PrimaryButtonNew_master.html">3658</a></td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/PrimaryButtonNew_pr.html">2427</a></td>
           </tr>
<tr>
            <td>SplitButton</td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/SplitButton_master.html">3845</a></td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/SplitButton_pr.html">3847</a></td>
           </tr>
<tr>
            <td>SplitButtonNew</td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/SplitButtonNew_master.html">14086</a></td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/SplitButtonNew_pr.html">9225</a></td>
           </tr>
<tr>
            <td>Toggle</td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/Toggle_master.html">2037</a></td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/Toggle_pr.html">2018</a></td>
           </tr>
<tr>
            <td>ToggleNew</td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/ToggleNew_master.html">2553</a></td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/ToggleNew_pr.html">2485</a></td>
           </tr>
<tr>
            <td>button</td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/button_master.html">81</a></td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/button_pr.html">70</a></td>
           </tr></table>* Sample counts can vary by up to 30% and shouldn't be used solely for determining regression.  Flamegraph links are provided to give a hint on deltas introduced by PRs and potential bottlenecks.<div id="perfComment9423"/>

## Flamegraph Anatomy

Each sample number entry links to a flamegraph, which looks like the following:

<a target="_blank" href="https://user-images.githubusercontent.com/26070760/60136445-07304c00-9759-11e9-882a-33d73575dc15.png"><img src="https://user-images.githubusercontent.com/26070760/60136445-07304c00-9759-11e9-882a-33d73575dc15.png" width="1385"/></a>

## Perf Test Results Intepretation

Since this PR improves perf for new Button components, we expect to see improvements in corresponding components:

Component Perf Analysis:

  <table>
  <tr>
    <th>Scenario</th>
    <th>Master Ticks *</th>
    <th>PR Ticks *</th>
  </tr><tr>
            <td>BaseButtonNew</td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/BaseButtonNew_master.html">3734</a></td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/BaseButtonNew_pr.html">2536</a></td>
           </tr>
            <tr>
            <td>DefaultButtonNew</td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/DefaultButtonNew_master.html">3241</a></td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/DefaultButtonNew_pr.html">2039</a></td>
           </tr>
            <tr>
            <td>MenuButtonNew</td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/MenuButtonNew_master.html">6473</a></td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/MenuButtonNew_pr.html">4910</a></td>
           </tr>
            <tr>
            <td>PrimaryButtonNew</td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/PrimaryButtonNew_master.html">3658</a></td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/PrimaryButtonNew_pr.html">2427</a></td>
           </tr>
            <tr>
            <td>SplitButtonNew</td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/SplitButtonNew_master.html">14086</a></td>
            <td><a href="http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/SplitButtonNew_pr.html">9225</a></td>
           </tr>
            </table><div id="perfComment9423"/>

We can see a lower number of counts implying improvement for each listed component in the PR. This feature currently does not assess regression due to variance that can occur, particularly in server CI environments (per the table's footnote.)

If we look at [`Master Ticks` for `SplitButtonNew`](http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/SplitButtonNew_master.html), we find the following:

<a target="_blank" href="https://user-images.githubusercontent.com/26070760/60136592-727a1e00-9759-11e9-907c-5f0a26e5f489.png"><img src="https://user-images.githubusercontent.com/26070760/60136592-727a1e00-9759-11e9-907c-5f0a26e5f489.png" width="1466"/></a>

`StackView` is consuming nearly 25% of render time. The PR actually removes usage of `Stack` from the Button components, so we expect to see the resulting perf numbers go down. If we review the [`PR Ticks` for `SplitButtonNew`](http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9516/merge/perf-test/SplitButtonNew_pr.html):

<a target="_blank" href="https://user-images.githubusercontent.com/26070760/60136684-b40ac900-9759-11e9-9c77-703207d05fec.png"><img src="https://user-images.githubusercontent.com/26070760/60136684-b40ac900-9759-11e9-9c77-703207d05fec.png" width="1385"/></a>

## Running Tests Locally

The perf test app and some of its dependencies may not get built with default build commands. Make sure you do a [build to perf-test](https://github.com/microsoft/fluentui/wiki/Build-Commands) before running any perf tests.

After building to perf-test and its dependencies you can run perf-test from the `apps/perf-test` directory:

- `yarn just perf-test`: Builds perf-test package and runs perf-test scenarios.
- `yarn just run-perf-test`: Only runs perf-test scenarios. Assumes perf-test has been built previously.

> ⚠️
> If you modify Fluent UI React source, you must do another build to perf-test to pick up those changes.

> ⚠️
> If you are adding or modifying scenarios you must use `yarn just perf-test` to build and pick up scenario changes.

### Arguments

The perf test script also supports the following optional arguments:

| Argument       | Description                                     |
| -------------- | ----------------------------------------------- |
| `--scenarios`  | Comma separated list of scenario names to test. |
| `--iterations` | Number of iterations to run for each scenario.  |

Here is an example of their use:

`yarn just perf-test -- --scenarios SplitButton,SplitButtonNew --iterations 1000`

# Questions

### What are flamegraphs?

Flamegraphs are representations of call hierarchies that show time consumed by nested function calls. Perf-test has been set up to repeatedly render a given scenario, generating a flamegraph just for that scenario, making bottlenecks and perf issues easier to see.

### What should I do if it looks like my PR has a perf regression?

If you don't expect any perf changes, it's possible that the regression is due to sample variance. Even if overall sample counts change, the call hierarchy and percentages they consume in the flamegraph should be consistent. Viewing the generated flamegraphs for consistency can help reveal any significant changes in behavior.

Variance will also tend to be higher in a server environment. You may get more consistent results locally and can run perf test as described above to confirm results.

### What is variance and what causes it?

Variance is fundamentally caused by the sample-based approach that V8 uses (the JavaScript engine that Chrome and Puppeteer use) for generating profiles. Since ticks are at a fixed interval in time, they are subject to aliasing, CPU load and other factors that can generate variable results given the same code under test. Some of this variance has been mitigated by disabling optimizations in V8.

### Why are results listed in ticks instead of time units?

Perf Test renders many iterations of a scenario to get more depth in the graphs. Additionally, Puppeteer has been configured to disable optimizations to reduce variance, impacting overall execution time. As a result, showing results in time units would lead to confusion. Instead, results are display in ticks in order to get a qualitative feel for perf deltas on PRs.

### Why so many iterations per scenario? How do flamegraphs show more levels than Chrome profiler?

Perf testing generates flamegraphs using a rollup strategy, rolling together the call hierarchy of all iterations of a given scenario. This gives visibility into low level calls that wouldn't be visible when using profiler in Chrome. Function calls that typically run in less than a sample period end up getting hit across many iterations. With 5,000 iterations, lower level function calls will get less than 50 ticks, which means only 1 in 100 function calls are getting sampled. These ticks would have been missed with one iteration and would not have shown up in the flamegraph.

### How do I add a scenario test?

You can add a scenario to [perf-test](https://github.com/microsoft/fluentui/tree/master/apps/perf-test/src/scenarios) similar to the others listed and it will automatically be picked up. Optionally, you can also add your scenario to [scenarioNames.ts](https://github.com/microsoft/fluentui/blob/master/apps/perf-test/src/scenarioNames.js) to give it a more readable name.

Please note that each scenario will add 5-60 seconds to build time (assuming the current 5,000 iteration default holds.) In the future, scenarios may be more selectively filtered for CI integration in order to keep build time manageable.

> ⚠️
> When you add or modify a scenario, you must rebuild perf-test or run `yarn run perf-test` in order to absorb the new scenario for testing locally.

# Future improvements

- Improve flamegraph readability.
- Expand scenario testing to measure dynamic performance, such as scrolling and resizing the browser window.
- Find methods or alternatives for mitigating or filtering out variance for automated regression analysis.
- Modularize performance test for use in projects outside of Fabric.
