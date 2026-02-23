# Icons Migration

## createSvgIcon

V0 exports a `createSvgIcon` function that allows creating a custom icon such as:

And its usage would be like:

To achieve the same using V9 we have to make usage of a combination with `wrapIcon` and `bundleIcon`.

And its usage would be like:

An Icon created with `createSvgIcon` is filled by default while an Icon created with `wrapIcon` is outline by default, so when replacing the usage of `createSvgIcon` remember to add filled prop to the Icon usage.

### Sizing

`createSvgIcon` from V0 will allow you to set a range of pre-defined size values (`small`,`smaller`,`smallest`,`medium`,`large`,`largest`,`larger`). e.g.:

The V9 wrapIcon has a different approach allowing to set the fontSize which would change directly the icon size.

In the V9 Icon it is also possible to style it by using css `font-size` propertie.

## v0 - v9 Icon Catalog

This catalog can help you find the equivalent v9 icon if you are using v0 icons. Not all icons have a direct equivalent, and you will see clearly when this is case in the catalog.

## Hover styles

V0 can handle switching between outline and filled versions of an icon automatically. However extra work is needed to achieve the same effect in v9. You can read about these steps in [the official v9 Icon docs](?path=/docs/icons-overview--docs).

Searching Northstar icons

308 icon entries

AcceptIcon

CheckmarkRegular

AccessibilityIcon

AccessibilityRegular

AddIcon

AddRegular

ApprovalsAppbarIcon

ApprovalsAppRegular

ArchiveIcon

ArchiveRegular

ArrowDownIcon

ArrowDownRegular

ArrowLeftIcon

ArrowLeftRegular

ArrowRightIcon

ArrowRightRegular

ArrowSyncIcon

ArrowSyncRegular

ArrowUpIcon

ArrowUpRegular

AttendeeIcon

PeopleAudienceRegular

AudienceIcon

PeopleAudienceRegular

AudioLoadingIcon

MicSyncRegular

AudioOffIcon

SpeakerOffRegular

BanIcon

ProhibitedRegular

BellIcon

AlertRegular

BellSlashIcon

AlertOffRegular

BellSnoozeIcon

AlertSnoozeRegular

BluetoothIcon

BluetoothRegular

BoldIcon

TextBoldRegular

BookmarkIcon

BookmarkRegular

BreakoutRoomIcon

BreakoutRoomRegular

BriefcaseIcon

BriefcaseRegular

BroadcastIcon

LiveRegular
