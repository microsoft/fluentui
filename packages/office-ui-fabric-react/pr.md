
The purpose of this PR is to refactor FocusTrapZone (FTZ) focus trapping behavior to resolve outstanding and recurring issues as described in #8055 and fixes multiple open issues.

While refactoring trapping behavior, I also encountered the following issues / areas of improvement, which this PR also addresses:
- Focus utilities returning non-tabbable elements as tabbable.
- FTZ and focus utility unit test coverage.
- Broken FTZ examples.
- Broken FTZ behavior with 0 tabbable elements.
- No FTZ examples for 0 tabbable elements and embedded FocusZones.

This PR fixes multiple open FTZ navigation issues. I've also made sure recently fixed issues have not regressed. I've set up some CodePens running against an ngrok host (forgive me if these aren't working, I'll try to keep the server running. This has also made me realize it'd be nice to have PR bundles hosted for CodePens in general.)

| Issue # | CodePen Running Against this PR | State |
|---------|---------------------------------|-------|
| #4191 | https://codepen.io/jasongore/pen/rPEamG | Still works. |
| #7679 | https://codepen.io/jasongore/pen/gqNEpG | Still works. |
| #4649 | https://codepen.io/jasongore/pen/qgzdbG | Fixed! |
| #5160 | https://codepen.io/jasongore/pen/pGXvEE | Fixed! (again) |
| #6526 | https://codepen.io/jasongore/pen/omrVbL | Fixed! |
| #7891 | https://codepen.io/jasongore/pen/bzPZyJ | Still works. |
| #7992, #8011 | https://codepen.io/jasongore/pen/PVrgEr | Still work. |

#7839 still seems to be an issue but I think this is PR is a really good step and should be rereviewed in the context of #8055 later. (i.e. I need an FTZ break.)



  // TODO: call out bumper styling and issues with display: none and absolute/-9999
  // TODO: what do focus trapping changes mean for onKeyDown prop? this prop will no longer prevent focus changes.
  // TODO: reviewers: David Guerrero Del Rio, David Goff, Anton Labunets
  // TODO: call this out in PR
  // TODO: see who wrote the key handler code that allows focus behavior to be short circuited
  // TODO: Is focus stack still needed? PR #1111 says this is to avoid an infinite loop. But how would an infinite loop occur?



    // TODO:
    //  Make sure not regressed:
    //    https://github.com/OfficeDev/office-ui-fabric-react/issues/4191 : https://codepen.io/jasongore/pen/rPEamG
    //    https://github.com/OfficeDev/office-ui-fabric-react/issues/7679 : https://codepen.io/jasongore/pen/gqNEpG

    //  Open issues that appear to be fixed:
    //    https://github.com/OfficeDev/office-ui-fabric-react/issues/4649 : https://codepen.io/jasongore/pen/qgzdbG
    //    https://github.com/OfficeDev/office-ui-fabric-react/issues/5160 : https://codepen.io/jasongore/pen/pGXvEE
    //    https://github.com/OfficeDev/office-ui-fabric-react/issues/6526 : https://codepen.io/jasongore/pen/omrVbL

    //  Not fixed:
    //    https://github.com/OfficeDev/office-ui-fabric-react/pull/7839 : https://codepen.io/jasongore/pen/zeVbaq

    //  No regression but still kinda broken:
    //    https://github.com/OfficeDev/office-ui-fabric-react/issues/7891 : https://codepen.io/jasongore/pen/bzPZyJ
    //    https://github.com/OfficeDev/office-ui-fabric-react/issues/7992 : https://codepen.io/jasongore/pen/PVrgEr
    //    https://github.com/OfficeDev/office-ui-fabric-react/issues/8011 : https://codepen.io/jasongore/pen/PVrgEr

