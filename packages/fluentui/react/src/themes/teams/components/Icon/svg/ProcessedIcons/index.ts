import { TeamsProcessedSvgIconSpec } from '../types';

// IMPORTS
import processedIcons_zoomout from './icons-zoom-out';
import processedIcons_zoomin from './icons-zoom-in';
import processedIcons_zip from './icons-zip';
import processedIcons_youtube from './icons-youtube';
import processedIcons_yammer from './icons-yammer';
import processedIcons_whiteboard from './icons-whiteboard';
import processedIcons_website from './icons-website';
import processedIcons_waffle from './icons-waffle';
import processedIcons_voicemail from './icons-voicemail';
import processedIcons_videooff from './icons-video-off';
import processedIcons_video from './icons-video';
import processedIcons_urgent from './icons-urgent';
import processedIcons_unfollowchannel from './icons-unfollow-channel';
import processedIcons_undo from './icons-undo';
import processedIcons_underline from './icons-underline';
import processedIcons_txt from './icons-txt';
import processedIcons_triangleupsmall from './icons-triangle-up-small';
import processedIcons_trianglerightsmall from './icons-triangle-right-small';
import processedIcons_triangledownsmall from './icons-triangle-down-small';
import processedIcons_trianglediagonalrightsmall from './icons-triangle-diagonal-right-small';
import processedIcons_trending from './icons-trending';
import processedIcons_trashcan from './icons-trash-can';
import processedIcons_translation from './icons-translation';
import processedIcons_timezonenight from './icons-time-zone-night';
import processedIcons_timezoneday from './icons-time-zone-day';
import processedIcons_tentative from './icons-tentative';
import processedIcons_teams from './icons-teams';
import processedIcons_teamdiscover from './icons-team-discover';
import processedIcons_teamcreate from './icons-team-create';
import processedIcons_tabledelete from './icons-table-delete';
import processedIcons_tableadd from './icons-table-add';
import processedIcons_table from './icons-table';
import processedIcons_tabbadge from './icons-tab-badge';
import processedIcons_strike from './icons-strike';
import processedIcons_sticker from './icons-sticker';
import processedIcons_statusyo from './icons-status-yo';
import processedIcons_starred from './icons-starred';
import processedIcons_star from './icons-star';
import processedIcons_speakerslashed from './icons-speaker-slashed';
import processedIcons_speakeroff from './icons-speaker-off';
import processedIcons_snooze from './icons-snooze';
import processedIcons_sketch from './icons-sketch';
import processedIcons_shareobject from './icons-share-object';
import processedIcons_share from './icons-share';
import processedIcons_sfbviewbox32 from './icons-sfb-viewbox-32';
import processedIcons_settings from './icons-settings';
import processedIcons_send from './icons-send';
import processedIcons_search from './icons-search';
import processedIcons_screenzoomout from './icons-screen-zoom-out';
import processedIcons_screenzoomin from './icons-screen-zoom-in';
import processedIcons_roster from './icons-roster';
import processedIcons_retry from './icons-retry';
import processedIcons_resetzoom from './icons-reset-zoom';
import processedIcons_reply from './icons-reply';
import processedIcons_removeFormat from './icons-remove-format';
import processedIcons_refresh from './icons-refresh';
import processedIcons_redo from './icons-redo';
import processedIcons_redbang from './icons-redbang';
import processedIcons_recurrence from './icons-recurrence';
import processedIcons_recents from './icons-recents';
import processedIcons_recent from './icons-recent';
import processedIcons_readaloud from './icons-read-aloud';
import processedIcons_quote from './icons-quote';
import processedIcons_quickresponse from './icons-quick-response';
import processedIcons_qna from './icons-qna';
import processedIcons_presenceAvailable from './icons-presence-available';
import processedIcons_presenceStroke from './icons-presence-stroke';
import processedIcons_promoted from './icons-promoted';
import processedIcons_pluscircled from './icons-plus-circled';
import processedIcons_playpause from './icons-play-pause';
import processedIcons_playforward from './icons-play-forward';
import processedIcons_play from './icons-play';
import processedIcons_pin from './icons-pin';
import processedIcons_person from './icons-person';
import processedIcons_pdf from './icons-pdf';
import processedIcons_pcaudiostop from './icons-pc-audio-stop';
import processedIcons_pcaudio from './icons-pc-audio';
import processedIcons_patharrow from './icons-patharrow';
import processedIcons_paste from './icons-paste';
import processedIcons_participantremove from './icons-participant-remove';
import processedIcons_outline from './icons-outline';
import processedIcons_outdent from './icons-outdent';
import processedIcons_orgwide from './icons-org-wide';
import processedIcons_org from './icons-org';
import processedIcons_openoutside from './icons-open-outside';
import processedIcons_opennewwindowfilled from './icons-open-new-window-filled';
import processedIcons_opennewwindow from './icons-open-new-window';
import processedIcons_openinsidesmall from './icons-open-inside-small';
import processedIcons_openinside from './icons-open-inside';
import processedIcons_openexternallinkoff from './icons-open-external-link-off';
import processedIcons_oof from './icons-oof';
import processedIcons_onenotesection from './icons-onenote-section';
import processedIcons_numberlist from './icons-number-list';
import processedIcons_notificationoff from './icons-notification-off';
import processedIcons_notes from './icons-notes';
import processedIcons_nochat from './icons-no-chat';
import processedIcons_speakermute from './icons-speaker-mute';
import processedIcons_newtab from './icons-newtab';
import processedIcons_newcontactgroup from './icons-new-contactgroup';
import processedIcons_myactivity from './icons-my-activity';
import processedIcons_mutechat from './icons-mutechat';
import processedIcons_msftxlonline from './icons-msft-xl-online';
import processedIcons_msftxl from './icons-msft-xl';
import processedIcons_msftwordonline from './icons-msft-word-online';
import processedIcons_msftword from './icons-msft-word';
import processedIcons_msftvisio from './icons-msft-visio';
import processedIcons_msftteams from './icons-msft-teams';
import processedIcons_msftstream from './icons-msft-stream';
import processedIcons_msftspdoclibrary from './icons-msft-sp-doc-library';
import processedIcons_msftsharepoint from './icons-msft-sharepoint';
import processedIcons_msftpptonline from './icons-msft-ppt-online';
import processedIcons_msftppt from './icons-msft-ppt';
import processedIcons_msftpowerbi from './icons-msft-powerbi';
import processedIcons_msftplanner from './icons-msft-planner';
import processedIcons_msftoutlookcolored from './icons-msft-outlook-colored';
import processedIcons_msftoutlook from './icons-msft-outlook';
import processedIcons_msftonenoteonline from './icons-msft-onenote-online';
import processedIcons_msftonenote from './icons-msft-onenote';
import processedIcons_msftonedrive from './icons-msft-onedrive';
import processedIcons_msftoffice from './icons-msft-office';
import processedIcons_msftexchange from './icons-msft-exchange';
import processedIcons_msftdelve from './icons-msft-delve';
import processedIcons_msftcanvas from './icons-msft-canvas';
import processedIcons_move from './icons-move';
import processedIcons_mov from './icons-mov';
import processedIcons_more from './icons-more';
import processedIcons_micoff from './icons-mic-off';
import processedIcons_mic from './icons-mic';
import processedIcons_menulight from './icons-menu-light';
import processedIcons_menu from './icons-menu';
import processedIcons_mention from './icons-mention';
import processedIcons_megaphone from './icons-megaphone';
import processedIcons_meetingnotes from './icons-meeting-notes';
import processedIcons_meetingnew from './icons-meeting-new';
import processedIcons_mediaoff from './icons-media-off';
import processedIcons_messageSeen from './icons-message-seen';
import processedIcons_markasunread from './icons-mark-as-unread';
import processedIcons_markasread from './icons-mark-as-read';
import processedIcons_manageteams from './icons-manage-teams';
import processedIcons_lock18 from './icons-lock-18';
import processedIcons_lock14 from './icons-lock-14';
import processedIcons_lock from './icons-lock';
import processedIcons_locationoff from './icons-location-off';
import processedIcons_location from './icons-location';
import processedIcons_link from './icons-link';
import processedIcons_liked from './icons-liked';
import processedIcons_like from './icons-like';
import processedIcons_leave from './icons-leave';
import processedIcons_kollective from './icons-kollective';
import processedIcons_keyboard from './icons-keyboard';
import processedIcons_italic from './icons-italic';
import processedIcons_invitetentative from './icons-invite-tentative';
import processedIcons_inviteperson from './icons-invite-person';
import processedIcons_invitenotresponded from './icons-invite-not-responded';
import processedIcons_invitedeclined from './icons-invite-declined';
import processedIcons_invitecancelled from './icons-invite-cancelled';
import processedIcons_inviteaccepted from './icons-invite-accepted';
import processedIcons_inputvalid from './icons-input-valid';
import processedIcons_inputinvalid from './icons-input-invalid';
import processedIcons_info from './icons-info';
import processedIcons_inferred from './icons-inferred';
import processedIcons_indicator from './icons-indicator';
import processedIcons_indent from './icons-indent';
import processedIcons_image from './icons-image';
import processedIcons_horizontalrule from './icons-horizontal-rule';
import processedIcons_home from './icons-home';
import processedIcons_hive from './icons-hive';
import processedIcons_highlight from './icons-highlight';
import processedIcons_helparticle from './icons-helparticle';
import processedIcons_headset from './icons-headset';
import processedIcons_hand from './icons-hand';
import processedIcons_groups from './icons-groups';
import processedIcons_giphy from './icons-giphy';
import processedIcons_gif from './icons-gif';
import processedIcons_gettingstarted from './icons-gettingstarted';
import processedIcons_gallery from './icons-gallery';
import processedIcons_fullscreen from './icons-fullscreen';
import processedIcons_format from './icons-format';
import processedIcons_fontsize from './icons-font-size';
import processedIcons_fontcolor from './icons-font-color';
import processedIcons_followchannel from './icons-follow-channel';
import processedIcons_folderupload from './icons-folder-upload';
import processedIcons_foldernew from './icons-folder-new';
import processedIcons_folderdownload from './icons-folder-download';
import processedIcons_folder from './icons-folder';
import processedIcons_filter from './icons-filter';
import processedIcons_filesuploadsmall from './icons-files-upload-small';
import processedIcons_filesupload from './icons-files-upload';
import processedIcons_filessound from './icons-files-sound';
import processedIcons_filesphotoshop from './icons-files-photoshop';
import processedIcons_filesmissing from './icons-files-missing';
import processedIcons_fileslink from './icons-files-link';
import processedIcons_filesindesign from './icons-files-indesign';
import processedIcons_filesillustrator from './icons-files-illustrator';
import processedIcons_filesflash from './icons-files-flash';
import processedIcons_fileserrorfull from './icons-files-error-full';
import processedIcons_filesdocument from './icons-files-document';
import processedIcons_filesaftereffects from './icons-files-aftereffects';
import processedIcons_files from './icons-files';
import processedIcons_feedback from './icons-feedback';
import processedIcons_faq from './icons-faq';
import processedIcons_eyeslash from './icons-eye-slash';
import processedIcons_eyefriendlier from './icons-eye-friendlier';
import processedIcons_eye from './icons-eye';
import processedIcons_expand from './icons-expand';
import processedIcons_error from './icons-error';
import processedIcons_emoji from './icons-emoji';
import processedIcons_email from './icons-email';
import processedIcons_edit from './icons-edit';
import processedIcons_dropdown from './icons-dropdown';
import processedIcons_downloaded from './icons-downloaded';
import processedIcons_download from './icons-download';
import processedIcons_document from './icons-document';
import processedIcons_desktop from './icons-desktop';
import processedIcons_cortana from './icons-cortana';
import processedIcons_copy from './icons-copy';
import processedIcons_contactlist from './icons-contact-list';
import processedIcons_connectorbadge from './icons-connector-badge';
import processedIcons_composeextmenuitem from './icons-compose-ext-menu-item';
import processedIcons_composeextensionunpin from './icons-compose-extension-unpin';
import processedIcons_composeextensionpin from './icons-compose-extension-pin';
import processedIcons_compose from './icons-compose';
import processedIcons_collapse from './icons-collapse';
import processedIcons_codesnippet from './icons-codesnippet';
import processedIcons_code from './icons-code';
import processedIcons_closedcaption from './icons-closed-caption';
import processedIcons_close from './icons-close';
import processedIcons_chromeunmaximize from './icons-chrome-unmaximize';
import processedIcons_chromeminimize from './icons-chrome-minimize';
import processedIcons_chromemaximize from './icons-chrome-maximize';
import processedIcons_chevronright from './icons-chevron-right';
import processedIcons_chevronmedright from './icons-chevronmed-right';
import processedIcons_chevronmedleft from './icons-chevronmed-left';
import processedIcons_chevronleft from './icons-chevron-left';
import processedIcons_chevrondown from './icons-chevron-down';
import processedIcons_checkboxunselected from './icons-checkbox-unselected';
import processedIcons_checkboxselected from './icons-checkbox-selected';
import processedIcons_chat from './icons-chat';
import processedIcons_channelicon from './icons-channel-icon';
import processedIcons_changename from './icons-changename';
import processedIcons_canvasaddpage from './icons-canvas-addpage';
import processedIcons_callvideolineoff from './icons-call-video-line-off';
import processedIcons_callvideoline from './icons-call-video-line';
import processedIcons_callvideofilled from './icons-call-video-filled';
import processedIcons_callvideo from './icons-call-video';
import processedIcons_calltransfernotification from './icons-call-transfer-notification';
import processedIcons_calltransfer from './icons-call-transfer';
import processedIcons_callswitchcamera from './icons-call-switch-camera';
import processedIcons_callrecording from './icons-call-recording';
import processedIcons_callpstnfull from './icons-call-pstn-full';
import processedIcons_callpstn from './icons-call-pstn';
import processedIcons_callparticipantonhold from './icons-call-participant-onhold';
import processedIcons_callparticipantincomingline from './icons-call-participant-incoming-line';
import processedIcons_callparticipantincoming from './icons-call-participant-incoming';
import processedIcons_callparticipantfailed from './icons-call-participant-failed';
import processedIcons_callparticipantending from './icons-call-participant-ending';
import processedIcons_callparticipantconnectingline from './icons-call-participant-connecting-line';
import processedIcons_callparticipantconnecting from './icons-call-participant-connecting';
import processedIcons_callparticipantconnected from './icons-call-participant-connected';
import processedIcons_callmissedline from './icons-call-missed-line';
import processedIcons_callmissed from './icons-call-missed';
import processedIcons_callmicrophoneunmuting from './icons-call-microphone-unmuting';
import processedIcons_callmicrophoneofffilled from './icons-call-microphone-off-filled';
import processedIcons_callmeetupline from './icons-call-meetup-line';
import processedIcons_callincomingvideo from './icons-call-incoming-video';
import processedIcons_callhold from './icons-call-hold';
import processedIcons_callend from './icons-call-end';
import processedIcons_calldialpad from './icons-call-dialpad';
import processedIcons_callcontrolrelease from './icons-call-control-release';
import processedIcons_callcontrolrequest from './icons-call-control-request';
import processedIcons_callcontrolstoppresentingnew from './icons-call-control-stop-presenting-new';
import processedIcons_callcontrolpresentnew from './icons-call-control-present-new';
import processedIcons_callblocked from './icons-call-blocked';
import processedIcons_callaudio from './icons-call-audio';
import processedIcons_callalert from './icons-call-alert';
import processedIcons_calladmitall from './icons-call-admit-all';
import processedIcons_call from './icons-call';
import processedIcons_calendar from './icons-calendar';
import processedIcons_bullets from './icons-bullets';
import processedIcons_broadcast from './icons-broadcast';
import processedIcons_broadcastviewright from './icons-broadcast-view-right';
import processedIcons_broadcastviewleft from './icons-broadcast-view-left';
import processedIcons_broadcastviewfullscreen from './icons-broadcast-view-fullscreen';
import processedIcons_bot from './icons-bot';
import processedIcons_bookmark from './icons-bookmark';
import processedIcons_bold from './icons-bold';
import processedIcons_blurbackground from './icons-blur-background';
import processedIcons_block from './icons-block';
import processedIcons_bellmute from './icons-bell-mute';
import processedIcons_bell from './icons-bell';
import processedIcons_badgeadd from './icons-badge-add';
import processedIcons_badge from './icons-badge';
import processedIcons_backspace from './icons-backspace';
import processedIcons_audio from './icons-audio';
import processedIcons_attachment from './icons-attachment';
import processedIcons_assignments from './icons-assignments';
import processedIcons_arrowupsmall from './icons-arrow-up-small';
import processedIcons_arrowup from './icons-arrow-up';
import processedIcons_arrowright from './icons-arrow-right';
import processedIcons_arrowleft from './icons-arrow-left';
import processedIcons_arrowdown from './icons-arrow-down';
import processedIcons_archive from './icons-archive';
import processedIcons_apps from './icons-apps';
import processedIcons_analytics from './icons-analytics';
import processedIcons_addparticipant from './icons-add-participant';
import processedIcons_add from './icons-add';
import processedIcons_accept from './icons-accept';

export default {
  // EXPORTS
  processedIcons_zoomout,
  processedIcons_zoomin,
  processedIcons_zip,
  processedIcons_youtube,
  processedIcons_yammer,
  processedIcons_whiteboard,
  processedIcons_website,
  processedIcons_waffle,
  processedIcons_voicemail,
  processedIcons_videooff,
  processedIcons_video,
  processedIcons_urgent,
  processedIcons_unfollowchannel,
  processedIcons_undo,
  processedIcons_underline,
  processedIcons_txt,
  processedIcons_triangleupsmall,
  processedIcons_trianglerightsmall,
  processedIcons_triangledownsmall,
  processedIcons_trianglediagonalrightsmall,
  processedIcons_trending,
  processedIcons_trashcan,
  processedIcons_translation,
  processedIcons_timezonenight,
  processedIcons_timezoneday,
  processedIcons_tentative,
  processedIcons_teams,
  processedIcons_teamdiscover,
  processedIcons_teamcreate,
  processedIcons_tabledelete,
  processedIcons_tableadd,
  processedIcons_table,
  processedIcons_tabbadge,
  processedIcons_strike,
  processedIcons_sticker,
  processedIcons_statusyo,
  processedIcons_starred,
  processedIcons_star,
  processedIcons_speakerslashed,
  processedIcons_speakeroff,
  processedIcons_speakermute,
  processedIcons_snooze,
  processedIcons_sketch,
  processedIcons_shareobject,
  processedIcons_share,
  processedIcons_sfbviewbox32,
  processedIcons_settings,
  processedIcons_send,
  processedIcons_search,
  processedIcons_screenzoomout,
  processedIcons_screenzoomin,
  processedIcons_roster,
  processedIcons_retry,
  processedIcons_resetzoom,
  processedIcons_reply,
  processedIcons_removeFormat,
  processedIcons_refresh,
  processedIcons_redo,
  processedIcons_redbang,
  processedIcons_recurrence,
  processedIcons_recents,
  processedIcons_recent,
  processedIcons_readaloud,
  processedIcons_quote,
  processedIcons_quickresponse,
  processedIcons_qna,
  processedIcons_presenceAvailable,
  processedIcons_presenceStroke,
  processedIcons_promoted,
  processedIcons_pluscircled,
  processedIcons_playpause,
  processedIcons_playforward,
  processedIcons_play,
  processedIcons_pin,
  processedIcons_person,
  processedIcons_pdf,
  processedIcons_pcaudiostop,
  processedIcons_pcaudio,
  processedIcons_patharrow,
  processedIcons_paste,
  processedIcons_participantremove,
  processedIcons_outline,
  processedIcons_outdent,
  processedIcons_orgwide,
  processedIcons_org,
  processedIcons_openoutside,
  processedIcons_opennewwindowfilled,
  processedIcons_opennewwindow,
  processedIcons_openinsidesmall,
  processedIcons_openinside,
  processedIcons_openexternallinkoff,
  processedIcons_oof,
  processedIcons_onenotesection,
  processedIcons_numberlist,
  processedIcons_notificationoff,
  processedIcons_notes,
  processedIcons_nochat,
  processedIcons_newtab,
  processedIcons_newcontactgroup,
  processedIcons_myactivity,
  processedIcons_mutechat,
  processedIcons_msftxlonline,
  processedIcons_msftxl,
  processedIcons_msftwordonline,
  processedIcons_msftword,
  processedIcons_msftvisio,
  processedIcons_msftteams,
  processedIcons_msftstream,
  processedIcons_msftspdoclibrary,
  processedIcons_msftsharepoint,
  processedIcons_msftpptonline,
  processedIcons_msftppt,
  processedIcons_msftpowerbi,
  processedIcons_msftplanner,
  processedIcons_msftoutlookcolored,
  processedIcons_msftoutlook,
  processedIcons_msftonenoteonline,
  processedIcons_msftonenote,
  processedIcons_msftonedrive,
  processedIcons_msftoffice,
  processedIcons_msftexchange,
  processedIcons_msftdelve,
  processedIcons_msftcanvas,
  processedIcons_move,
  processedIcons_mov,
  processedIcons_more,
  processedIcons_micoff,
  processedIcons_mic,
  processedIcons_menulight,
  processedIcons_menu,
  processedIcons_mention,
  processedIcons_megaphone,
  processedIcons_meetingnotes,
  processedIcons_meetingnew,
  processedIcons_mediaoff,
  processedIcons_messageSeen,
  processedIcons_markasunread,
  processedIcons_markasread,
  processedIcons_manageteams,
  processedIcons_lock18,
  processedIcons_lock14,
  processedIcons_lock,
  processedIcons_locationoff,
  processedIcons_location,
  processedIcons_link,
  processedIcons_liked,
  processedIcons_like,
  processedIcons_leave,
  processedIcons_kollective,
  processedIcons_keyboard,
  processedIcons_italic,
  processedIcons_invitetentative,
  processedIcons_inviteperson,
  processedIcons_invitenotresponded,
  processedIcons_invitedeclined,
  processedIcons_invitecancelled,
  processedIcons_inviteaccepted,
  processedIcons_inputvalid,
  processedIcons_inputinvalid,
  processedIcons_info,
  processedIcons_inferred,
  processedIcons_indicator,
  processedIcons_indent,
  processedIcons_image,
  processedIcons_horizontalrule,
  processedIcons_home,
  processedIcons_hive,
  processedIcons_highlight,
  processedIcons_helparticle,
  processedIcons_headset,
  processedIcons_hand,
  processedIcons_groups,
  processedIcons_giphy,
  processedIcons_gif,
  processedIcons_gettingstarted,
  processedIcons_gallery,
  processedIcons_fullscreen,
  processedIcons_format,
  processedIcons_fontsize,
  processedIcons_fontcolor,
  processedIcons_followchannel,
  processedIcons_folderupload,
  processedIcons_foldernew,
  processedIcons_folderdownload,
  processedIcons_folder,
  processedIcons_filter,
  processedIcons_filesuploadsmall,
  processedIcons_filesupload,
  processedIcons_filessound,
  processedIcons_filesphotoshop,
  processedIcons_filesmissing,
  processedIcons_fileslink,
  processedIcons_filesindesign,
  processedIcons_filesillustrator,
  processedIcons_filesflash,
  processedIcons_fileserrorfull,
  processedIcons_filesdocument,
  processedIcons_filesaftereffects,
  processedIcons_files,
  processedIcons_feedback,
  processedIcons_faq,
  processedIcons_eyeslash,
  processedIcons_eyefriendlier,
  processedIcons_eye,
  processedIcons_expand,
  processedIcons_error,
  processedIcons_emoji,
  processedIcons_email,
  processedIcons_edit,
  processedIcons_dropdown,
  processedIcons_downloaded,
  processedIcons_download,
  processedIcons_document,
  processedIcons_desktop,
  processedIcons_cortana,
  processedIcons_copy,
  processedIcons_contactlist,
  processedIcons_connectorbadge,
  processedIcons_composeextmenuitem,
  processedIcons_composeextensionunpin,
  processedIcons_composeextensionpin,
  processedIcons_compose,
  processedIcons_collapse,
  processedIcons_codesnippet,
  processedIcons_code,
  processedIcons_closedcaption,
  processedIcons_close,
  processedIcons_chromeunmaximize,
  processedIcons_chromeminimize,
  processedIcons_chromemaximize,
  processedIcons_chevronright,
  processedIcons_chevronmedright,
  processedIcons_chevronmedleft,
  processedIcons_chevronleft,
  processedIcons_chevrondown,
  processedIcons_checkboxunselected,
  processedIcons_checkboxselected,
  processedIcons_chat,
  processedIcons_channelicon,
  processedIcons_changename,
  processedIcons_canvasaddpage,
  processedIcons_callvideolineoff,
  processedIcons_callvideoline,
  processedIcons_callvideofilled,
  processedIcons_callvideo,
  processedIcons_calltransfernotification,
  processedIcons_calltransfer,
  processedIcons_callswitchcamera,
  processedIcons_callrecording,
  processedIcons_callpstnfull,
  processedIcons_callpstn,
  processedIcons_callparticipantonhold,
  processedIcons_callparticipantincomingline,
  processedIcons_callparticipantincoming,
  processedIcons_callparticipantfailed,
  processedIcons_callparticipantending,
  processedIcons_callparticipantconnectingline,
  processedIcons_callparticipantconnecting,
  processedIcons_callparticipantconnected,
  processedIcons_callmissedline,
  processedIcons_callmissed,
  processedIcons_callmicrophoneunmuting,
  processedIcons_callmicrophoneofffilled,
  processedIcons_callmeetupline,
  processedIcons_callincomingvideo,
  processedIcons_callhold,
  processedIcons_callend,
  processedIcons_calldialpad,
  processedIcons_callcontrolrelease,
  processedIcons_callcontrolrequest,
  processedIcons_callcontrolstoppresentingnew,
  processedIcons_callcontrolpresentnew,
  processedIcons_callblocked,
  processedIcons_callaudio,
  processedIcons_callalert,
  processedIcons_calladmitall,
  processedIcons_call,
  processedIcons_calendar,
  processedIcons_bullets,
  processedIcons_broadcast,
  processedIcons_broadcastviewright,
  processedIcons_broadcastviewleft,
  processedIcons_broadcastviewfullscreen,
  processedIcons_bot,
  processedIcons_bookmark,
  processedIcons_bold,
  processedIcons_blurbackground,
  processedIcons_block,
  processedIcons_bellmute,
  processedIcons_bell,
  processedIcons_badgeadd,
  processedIcons_badge,
  processedIcons_backspace,
  processedIcons_audio,
  processedIcons_attachment,
  processedIcons_assignments,
  processedIcons_arrowupsmall,
  processedIcons_arrowup,
  processedIcons_arrowright,
  processedIcons_arrowleft,
  processedIcons_arrowdown,
  processedIcons_archive,
  processedIcons_apps,
  processedIcons_analytics,
  processedIcons_addparticipant,
  processedIcons_add,
  processedIcons_accept,
} as { [iconName: string]: TeamsProcessedSvgIconSpec };
