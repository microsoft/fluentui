# Purpose

There are many ways to keep up with your PR review requests but this guide aims to give you a list of some common approaches and how to use them effectively.

# Tools

- github.com
  - Pull request review requests
  - Notifications
- Email notifications
- Extending functionality

# github.com

## Notifications

With [GitHub notifications](https://github.com/notifications), you can see activity for PRs on which you or a team you are in were requested to review. This can be a little more convoluted given that you'll see all notifications for any repositories you are part of.

![list of notifications in the GitHub Inbox](https://user-images.githubusercontent.com/39736248/154150991-22be6e40-5eb3-46a8-ae47-5943ce6d6879.png)

## PR requests

The GitHub website gives you a rudimentary list of open PRs where your, or your team’s, review is required. You can access it here https://github.com/pulls/review-requested.

![list of PR review requests](https://user-images.githubusercontent.com/39736248/154149615-05ab4176-5774-440b-bcd1-109f71a01fdc.png)

New PRs that you have yet to be view will have an indicator to the left.
PRs stay in the list until they are merged, which means this method is most effective for new PR requests and not so much follow up on viewed PRs.
However, following the normal PR flow and asking for a re-review after addressing people’s concerns adds the indicator back to the PR, notifying you that there’s an update to it.

## Installation

Open the app in Teams through [this link](https://teams.microsoft.com/l/app/ca9e26b7-dce5-44a0-b2b7-a70a3d65ce25). There should be a screen shown with the app and a button saying “Add”. Click that and the bot should be ready to go for you.

After this, a direct message should be opened with the bot. You can then type “subscribe microsoft/fluentui reviews” to subscribe to updates on our repo.
You’ll be prompted to connect your GitHub account and after that, notifications will be successfully set up.

# Email notifications

Another option for people who prefer managing their work through emails, is to create some rules to organize their GitHub email notifications.

## Configuration

For this, you'll have to head over to https://github.com/settings/emails and set up an email address, to receive your notification, and configure which notifications you want to receive via email, over at https://github.com/settings/notifications.

# Extending functionality

## github.com

### Filter queries

To refine the information shown on the pull request review page, we can use the filtering functionality that GitHub provides. Below are some samples that might help you getting the information you need:

#### Team review requests

**team-review-requested:\<TEAM NAME\>**

e.g [team-review-requested:microsoft/cxe-prg](https://github.com/pulls?q=is%3Aopen+is%3Apr+team-review-requested%3Amicrosoft%2Fcxe-prg)

Filters for current teams

- [microsoft/cxe-prg](https://github.com/pulls?q=is%3Aopen+is%3Apr+team-review-requested%3Amicrosoft%2Fcxe-prg)
- [microsoft/teams-prg](https://github.com/pulls?q=is%3Aopen+is%3Apr+team-review-requested%3Amicrosoft%2Fteams-prg)
- [microsoft/cxe-red](https://github.com/pulls?q=is%3Aopen+is%3Apr+team-review-requested%3Amicrosoft%2Fcxe-red)
- [microsoft/cxe-coastal](https://github.com/pulls?q=is%3Aopen+is%3Apr+team-review-requested%3Amicrosoft%2Fcxe-coastal)
- [microsoft/fluentui-react-build](https://github.com/pulls?q=is%3Aopen+is%3Apr+team-review-requested%3Amicrosoft%2Ffluentui-react-build)

#### Specific user review requests

**user-review-requested:\<USERNAME\>**

e.g. [user-review-requested:@me](https://github.com/pulls?q=is%3Aopen+is%3Apr+user-review-requested%3A%40me)

Read more about filtering queries here: https://docs.github.com/en/search-github/searching-on-github/searching-issues-and-pull-requests

### Custom queries

GitHub notifications allows you to create custom queries to filter your notifications. Simply access your notification inbox and click on the gear icon on the Filters section in the sidebar and paste in your custom query.

![list of filters in the GitHub notifications](https://user-images.githubusercontent.com/39736248/154156528-2b4981b8-b263-48cd-b61a-df50cce90599.png)

## Teams bot

### Eliminating noise

By default, the bot will also subscribe you to a bunch of other stuff, so if you want focused notifications, type “unsubscribe microsoft/fluentui issues pulls commits comments releases deployments” to unsubscribe from all notifications but review requests.

### Scheduling

You can also schedule the bot to notify you about what PRs still need your attention. To do so, you can write “schedule \<Organization\> \<Days\> \<Time\>“.

Day format can be:

- \<From\>-\<To\> – e.g., Mon-Fri
- Days separated by commas – e.g., Mon,Wed,Fri

Time format is 24 hour with 30min intervals only.

### Other functionality

GitHub's team is continuously adding new functionality to this integration, but, as of writing this document, there are some cons.

- The scheduler will not show PRs with review requests for your teams, only you directly.
- It's currently not possible to have repository focused scheduling, only organization wide notifications, meaning you will get a list with any open PR your review was requested in all repositories in the organization. This shouldn’t be an issue if you only work in this repo but might be annoying if you work in many.
- You can’t get user focused notifications, which means you’ll get notified for repository wide stuff, which might be irrelevant to you.
- It’s also possible to set this up on a channel but, unfortunately, an admin is required to set it up. That would imply contacting an admin and adding them to the team to set it up, as well as depending on them to config it further should anything arise, which makes it impractical in a big organization.

Have a look at the integration's repository to keep up to date with current functionality: https://github.com/integrations/microsoft-teams

## Email notifications

Below you can find some rule logic to better organize your email notifications:

### Filtering review requests

```
From fluentui@noreply.github.com
with "requested your review" in the body
move it to the "GitHub Reviews" folder
```

### Filtering @mentions

```
From fluentui@noreply.github.com
  and with [your username] in the body
move it to the "GitHub Mentions" folder
```
