name: '⚛️ React (v8) - 🐞 Bug Report'
description: File a bug report.
title: '[Bug]: '
labels: ['Type: Bug :bug:', 'Needs: Triage :mag:', 'Fluent UI react (v8)']
projects: ['microsoft/395']
assignees: ['@microsoft/cxe-red']
body:
  - type: markdown
    attributes:
      value: |
        Thanks for taking the time to fill out this bug report!

  - type: dropdown
    id: package-id
    attributes:
      label: Package
      description: Which package is affected
      options:
        - azure-themes
        - common-styles
        - date-time-utilities
        - dom-utilities
        - fluent2-theme
        - font-icons-mdl2
        - font-icons-mdl2-branded
        - foundation-legacy
        - keyboard-key
        - merge-styles
        - monaco-editor
        - react
        - react-date-time
        - react-experiments
        - react-file-type-icons
        - react-focus
        - react-hook
        - react-icon-provider
        - react-monaco-editor
        - react-window-provider
        - style-utilities
        - theme
        - utilities
        - Other...
    validations:
      required: true

  - type: input
    id: pkg-version
    attributes:
      label: Package version
      description: |
        Which version of selected package are you using?
      placeholder: e.g. 8.42.0
    validations:
      required: true

  - type: input
    id: react-version
    attributes:
      label: React version
      description: |
        Which version of React are you using?
      placeholder: e.g. 17.0.2
    validations:
      required: true

  - type: textarea
    id: env-info
    attributes:
      label: Environment
      description: |
        Output of `npx envinfo@latest --system --browsers --npmPackages '{@fluentui/*,react,react-dom,@types/react{,-dom}}'`
        NOTE 💡: This will be automatically formatted as a code block, so no need for backticks.
      render: shell
    validations:
      required: true

  - type: textarea
    id: current-behavior
    attributes:
      label: Current Behavior
      description: |
        What is the current behavior that you are experiencing?
    validations:
      required: true

  - type: textarea
    id: expected-behavior
    attributes:
      label: Expected Behavior
      description: |
        What is the behavior that you expect to happen?
    validations:
      required: true

  - type: input
    id: reproduction-link
    attributes:
      label: Reproduction
      description: |
        A link to reproduction which demonstrates the bug (use one of the following):
        - Stackblitz - https://stackblitz.com/
        - Codepen - https://aka.ms/fluentpen

        **NOTE:**

        A [minimal reproduction](https://stackoverflow.com/help/minimal-reproducible-example) is required.
        If a report is vague (e.g. just a generic error message) and has no reproduction, it will receive a "need reproduction" label.

        ‼️ If no reproduction is provided after 3 days, it will be auto-closed. ‼️
    validations:
      required: true

  - type: textarea
    id: reproduction-steps
    attributes:
      label: Steps to reproduce
      description: Explain how to cause the issue in the provided reproduction.
      placeholder: |
        1. Go to '...'
        2. Click on '...'
        3. Scroll down to '...'
        4. See error
    validations:
      required: true

  - type: dropdown
    id: a11y-bug
    attributes:
      label: Are you reporting an Accessibility issue?
      description: |
        **PLEASE NOTE:**

        1. Do not link to, screenshot, or reference a Microsoft product in this description.
        2. Please check ARIA component examples to ensure it is not a screen reader or browser issue. If the issue concerns screen reader behavior that reproduces on HTML elements or ARIA Practices examples (https://w3c.github.io/aria-practices/), it should be filed with the respective browser or screen reading software and not the Fluent UI repo.
        3. There is documentation or best practice info to support your expected behavior (review https://w3c.github.io/aria/ for accessibility guidance.)

        **Additional note for Microsoft employees:**
        Please file accessibility issues in our internal tracker (http://aka.ms/fluentui-a11y). This helps with tracking accessibility progress within the company.
      options:
        - 'yes'
        - 'no'

  - type: dropdown
    id: request-priority
    attributes:
      label: Suggested severity
      options:
        - Urgent - No workaround and Products/sites are affected
        - High - No workaround
        - Medium - Has workaround
        - Low - Has or doesn't need a workaround
    validations:
      required: true

  - type: input
    id: products-affected
    attributes:
      label: Products/sites affected
      placeholder: (provide if applicable)

  - type: dropdown
    id: open-to-contribute
    attributes:
      label: Are you willing to submit a PR to fix?
      options:
        - 'yes'
        - 'no'
    validations:
      required: true

  - type: checkboxes
    id: checkboxes
    attributes:
      label: Validations
      description: Before submitting the issue, please make sure you do the following
      options:
        - label: Check that there isn't already an issue that reports the same bug to avoid creating a duplicate.
          required: true
        - label: The provided reproduction is a minimal reproducible example of the bug.
          required: true
