// ==UserScript==
// @name         ReGaMa Blur
// @namespace    @simonvhs
// @version      0x
// @description  idk
// @author       @simonvhs
// @match        *://playregama.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
  "use strict";

  const STYLE_ID = "templateCSS-RGM";

  const CSS = `
:root {
  --bg-image:          url("https://i.imgur.com/fVbyYyL.png");

  --glass-bg:          rgba(0, 0, 0, 0.45);
  --glass-blur:        blur(12px);
  --glass-border:      rgba(255, 255, 255, 0.08);
  --glass-shadow-up:   0 -4px 24px rgba(0, 0, 0, 0.4), 0 -1px 8px rgba(255, 255, 255, 0.04);

  --text-active:       #fff;
  --text-mid:          rgba(255, 255, 255, 0.75);
  --text-dim:          rgba(255, 255, 255, 0.3);
  --glow-soft:         0 0 8px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.25);
  --glow-hover:        0 0 10px rgba(255, 255, 255, 0.4);

  --transition-fast:   150ms ease;
  --transition-base:   200ms ease;

  --radius-sm:         4px;
  --radius-md:         8px;

  --footer-offset:     -7px;
  --beta-bg:           rgba(20, 20, 28, 0.85);
  --beta-text:         rgba(255, 255, 255, 0.85);
}

body {
  background-image:      var(--bg-image) !important;
  background-size:       cover !important;
  background-position:   center !important;
  background-repeat:     no-repeat !important;
  background-attachment: fixed !important;
}

#page-block-top,
#navigation {
  background:       transparent !important;
  background-image: none !important;
  box-shadow:       none !important;
  border:           none !important;
}

#page-block-footer {
  background:      var(--glass-bg) !important;
  backdrop-filter: var(--glass-blur) !important;
  border-top:      1px solid var(--glass-border) !important;
  box-shadow:      var(--glass-shadow-up) !important;
  position:        relative !important;
  bottom:          var(--footer-offset) !important;
  left:            0 !important;
  width:           100% !important;
  z-index:         1 !important;
  transition:      bottom var(--transition-base) !important;
}

#page-block-footer:hover {
  bottom: 0 !important;
}

#navigation .navigation-main,
#navigation .navigation-sub {
  background:  transparent !important;
  box-shadow:  none !important;
  border:      none !important;
}

#navigation .navigation-main > ul li a,
#navigation .navigation-sub > ul li a {
  color:            var(--text-dim) !important;
  text-shadow:      none !important;
  background:       transparent !important;
  background-image: none !important;
  box-shadow:       none !important;
  border:           none !important;
  transition:       color var(--transition-fast), text-shadow var(--transition-fast) !important;
}

#navigation .navigation-main > ul li a:hover,
#navigation .navigation-sub > ul li a:hover {
  color:            var(--text-mid) !important;
  text-shadow:      var(--glow-hover) !important;
  background:       none !important;
  background-image: none !important;
}

#navigation .navigation-main > ul li.active {
  background:  transparent !important;
  border:      none !important;
  box-shadow:  none !important;
  height:      34px !important;
  z-index:     2 !important;
}

#navigation .navigation-main > ul li.active a {
  color:            var(--text-active) !important;
  text-shadow:      var(--glow-soft) !important;
  background:       none !important;
  background-image: none !important;
  border:           none !important;
  box-shadow:       none !important;
}

#navigation .navigation-sub > ul li.active {
  background:      none !important;
  backdrop-filter: none !important;
  border:          none !important;
  box-shadow:      none !important;
  margin-bottom:   -4px !important;
  height:          50px !important;
}

#navigation .navigation-sub > ul li.active a {
  color:            var(--text-active) !important;
  text-shadow:      var(--glow-soft) !important;
  background:       none !important;
  background-image: none !important;
  backdrop-filter:  none !important;
  border:           none !important;
  border-bottom:    none !important;
  box-shadow:       none !important;
  border-radius:    0 !important;
  height:           auto !important;
  margin-bottom:    0 !important;
  filter:           none !important;
}

.beta-notification {
  position:        fixed !important;
  bottom:          0 !important;
  left:            0 !important;
  width:           100% !important;
  padding:         10px 0 !important;
  font-weight:     600 !important;
  border-radius:   0 !important;
  border-top:      1px solid var(--glass-border) !important;
  backdrop-filter: var(--glass-blur) !important;
  background:      var(--beta-bg) !important;
  box-shadow:      var(--glass-shadow-up) !important;
  color:           var(--beta-text) !important;
  z-index:         9999 !important;
  margin:          0 !important;
}

.beta-notification .text {
  margin:     0 !important;
  width:      95% !important;
  text-align: center !important;
}

.beta-notification .close {
  position:  absolute !important;
  top:       50% !important;
  right:     20px !important;
  transform: translateY(-50%) !important;
}


#user-info-bar .dropdown-menu-config li > a {
  pointer-events: auto !important;
  cursor:         pointer !important;
  color:          var(--text-mid) !important;
  text-shadow:    none !important;
  transition:     color var(--transition-fast),
                  background var(--transition-fast) !important;
}

#user-info-bar .dropdown-menu-config li > a:hover,
#user-info-bar .dropdown-menu-config li > a:focus {
  color:      var(--text-active) !important;
  background: rgba(255, 255, 255, 0.08) !important;
  text-shadow: var(--glow-hover) !important;
}

#user-info-bar .user-progress {
  margin-left: 10px !important;
  font-weight: 700 !important;
  text-shadow: none !important;
}

#user-info-bar .user-progress ul.user-credits > li {
  vertical-align: middle !important;
  display:        inline-block !important;
}

#user-info-bar .user-progress ul.user-credits li.gold,
#user-info-bar .user-progress ul.user-credits li.silver {
  background:    rgba(255, 255, 255, 0.05) !important;
  border:        1px solid var(--glass-border) !important;
  border-radius: var(--radius-sm) !important;
  min-width:     80px !important;
  text-align:    center !important;
  transition:    background var(--transition-fast),
                 border-color var(--transition-fast) !important;
}

#user-info-bar .user-progress ul.user-credits li.gold:hover,
#user-info-bar .user-progress ul.user-credits li.silver:hover {
  background:   rgba(255, 255, 255, 0.1) !important;
  border-color: rgba(255, 255, 255, 0.18) !important;
}

#user-info-bar .user-progress ul.user-credits li.gold {
  margin-left: 24px !important;
}

#user-info-bar .user-progress ul.user-credits li.silver {
  margin-left: 26px !important;
}

#user-info-bar .user-progress ul.user-credits li.gold .data {
  color:      #ffd966 !important;
  transition: color var(--transition-fast), text-shadow var(--transition-fast) !important;
}

#user-info-bar .user-progress ul.user-credits li.gold .data:hover {
  color:       #ffe599 !important;
  text-shadow: 0 0 8px rgba(255, 220, 80, 0.6) !important;
}

#user-info-bar .user-progress ul.user-credits li.silver .data,
#user-info-bar .user-progress ul.user-credits li.xp .data {
  color:      var(--text-mid) !important;
  transition: color var(--transition-fast), text-shadow var(--transition-fast) !important;
}

#user-info-bar .user-progress ul.user-credits li.silver .data:hover,
#user-info-bar .user-progress ul.user-credits li.xp .data:hover {
  color:       var(--text-active) !important;
  text-shadow: var(--glow-hover) !important;
}

#user-info-bar .user-progress ul.user-credits li.xp .small-data {
  color:      var(--text-dim) !important;
  font-size:  12px !important;
  transition: color var(--transition-fast) !important;
}

#user-info-bar .user-progress ul.user-credits li.xp .small-data:hover {
  color: var(--text-mid) !important;
}

#user-info-bar .user-progress ul.user-credits .level-progress {
  background:    rgba(255, 255, 255, 0.08) !important;
  width:         180px !important;
  height:        4px !important;
  margin-top:    18px !important;
  float:         left !important;
  border-radius: 99px !important;
}

#user-info-bar .user-progress ul.user-credits .level-progress-fullfil {
  height:           4px !important;
  margin-top:       0 !important;
  margin-left:      0 !important;
  float:            left !important;
  background:       rgba(255, 255, 255, 0.7) !important;
  background-image: none !important;
  border-radius:    99px !important;
  box-shadow:       0 0 6px rgba(255, 255, 255, 0.4) !important;
  transition:       width 600ms ease !important;
}

#user-info-bar .user-progress ul.user-credits .level-image {
  float:         left !important;
  width:         28px !important;
  height:        28px !important;
  margin-top:    6px !important;
  border:        1px solid var(--glass-border) !important;
  border-radius: var(--radius-sm) !important;
  box-shadow:    none !important;
  transition:    box-shadow var(--transition-fast),
                 border-color var(--transition-fast) !important;
}

#user-info-bar .user-progress ul.user-credits .level-image:hover {
  border-color: rgba(255, 255, 255, 0.3) !important;
  box-shadow:   0 0 10px rgba(255, 255, 255, 0.15) !important;
}

#user-info-bar .user-profile-setting {
  margin-right: 10px !important;
  display:      block !important;
  height:       100% !important;
}

#user-info-bar .user-profile-setting .profile-block a {
  color:       var(--text-mid) !important;
  font-weight: 700 !important;
  text-shadow: none !important;
  transition:  color var(--transition-fast), text-shadow var(--transition-fast) !important;
}

#user-info-bar .user-profile-setting .profile-block a:hover {
  color:       var(--text-active) !important;
  text-shadow: var(--glow-hover) !important;
}

#user-info-bar .user-profile-setting .profile-block .img img {
  width:         27px !important;
  height:        27px !important;
  border-radius: 50% !important;
  border:        2px solid rgba(255, 255, 255, 0.2) !important;
  box-shadow:    0 0 0 1px rgba(255, 255, 255, 0.06) !important;
  transition:    border-color var(--transition-fast),
                 box-shadow var(--transition-fast) !important;
}

#user-info-bar .user-profile-setting .profile-block a:hover .img img {
  border-color: rgba(255, 255, 255, 0.5) !important;
  box-shadow:   0 0 10px rgba(255, 255, 255, 0.2) !important;
}

#user-info-bar .user-profile-setting .setting-block > a {
  color:       var(--text-dim) !important;
  text-shadow: none !important;
  transition:  color var(--transition-fast), text-shadow var(--transition-fast) !important;
}

#user-info-bar .user-profile-setting .setting-block > a:hover {
  color:       var(--text-active) !important;
  text-shadow: var(--glow-hover) !important;
}

#user-info-bar .user-profile-setting .setting-block .dropdown-menu,
#user-info-bar .user-progress .xp .dropdown-menu {
  background:       var(--glass-bg) !important;
  background-image: none !important;
  backdrop-filter:  var(--glass-blur) !important;
  border:           1px solid var(--glass-border) !important;
  border-radius:    var(--radius-md) !important;
  box-shadow:       0 8px 32px rgba(0, 0, 0, 0.5) !important;
  filter:           none !important;
}

#user-info-bar .user-profile-setting .setting-block .dropdown-menu li > a,
#user-info-bar .user-progress .xp .dropdown-menu li > a {
  color:       var(--text-mid) !important;
  text-shadow: none !important;
  font-weight: 600 !important;
  transition:  color var(--transition-fast),
               background var(--transition-fast) !important;
}

#user-info-bar .user-profile-setting .setting-block .dropdown-menu li > a:hover,
#user-info-bar .user-profile-setting .setting-block .dropdown-menu li > a:focus,
#user-info-bar .user-progress .xp .dropdown-menu li > a:hover,
#user-info-bar .user-progress .xp .dropdown-menu li > a:focus {
  color:       var(--text-active) !important;
  background:  rgba(255, 255, 255, 0.08) !important;
  text-shadow: var(--glow-hover) !important;
}

#user-info-bar .user-profile-setting .setting-block .dropdown-menu li.divider,
#user-info-bar .user-progress .xp .dropdown-menu li.divider {
  background-color: var(--glass-border) !important;
  border-bottom:    none !important;
}

#user-info-bar .user-profile-setting .setting-block .arrow-top-border,
#user-info-bar .user-profile-setting .setting-block .arrow-top,
#user-info-bar .user-progress .xp .arrow-top-border,
#user-info-bar .user-progress .xp .arrow-top {
  display: none !important;
}

#user-info-bar .user-progress .xp .xp-to-next-level {
  color:      var(--text-mid) !important;
  text-shadow: none !important;
}

.comments li {
  position:      relative !important;
  display:       block !important;
  margin-bottom: 20px !important;
  font-size:     90% !important;
}

.comments li .avatar a {
  display:          block !important;
  width:            46px !important;
  height:           46px !important;
  background-size:  cover !important;
  border:           2px solid rgba(255, 255, 255, 0.15) !important;
  border-radius:    50% !important;
  box-shadow:       0 0 0 1px rgba(255, 255, 255, 0.06),
                    0 2px 8px rgba(0, 0, 0, 0.4) !important;
  transition:       border-color var(--transition-fast),
                    box-shadow var(--transition-fast) !important;
}

.comments li .avatar a:hover {
  border-color: rgba(255, 255, 255, 0.4) !important;
  box-shadow:   0 0 12px rgba(255, 255, 255, 0.15) !important;
}

.comments li .avatar-wrapper {
  float: left !important;
  width: 76px !important;
}

.comments li .body-wrapper {
  margin-left: 76px !important;
}

.comments li .body {
  position:        relative !important;
  display:         block !important;
  padding:         10px 14px !important;
  color:           var(--text-mid) !important;
  background:      var(--glass-bg) !important;
  backdrop-filter: var(--glass-blur) !important;
  border:          1px solid var(--glass-border) !important;
  border-radius:   var(--radius-md) !important;
  box-shadow:      0 2px 12px rgba(0, 0, 0, 0.3) !important;
  transition:      background var(--transition-base),
                   border-color var(--transition-base),
                   box-shadow var(--transition-base) !important;
}

.comments li .body:hover {
  background:   rgba(255, 255, 255, 0.08) !important;
  border-color: rgba(255, 255, 255, 0.16) !important;
  box-shadow:   0 4px 20px rgba(0, 0, 0, 0.4),
                0 0 0 1px rgba(255, 255, 255, 0.06) !important;
}

.comments li .body .arrow-left-border,
.comments li .body .arrow-left {
  display: none !important;
}

.comments li .header {
  display:        block !important;
  padding-bottom: 6px !important;
}

.comments li .header .username a {
  color:       var(--text-active) !important;
  font-weight: 700 !important;
  text-shadow: none !important;
  transition:  color var(--transition-fast),
               text-shadow var(--transition-fast) !important;
}

.comments li .body:hover .header .username a {
  text-shadow: var(--glow-hover) !important;
}

.comments li .header .time {
  color:      var(--text-dim) !important;
  font-size:  90% !important;
  transition: color var(--transition-fast) !important;
}

.comments li .body:hover .header .time {
  color: var(--text-mid) !important;
}

.comments li .text {
  word-wrap: break-word !important;
  color:     var(--text-mid) !important;
}

.comments li .text a {
  color:      var(--text-mid) !important;
  transition: color var(--transition-fast),
              text-shadow var(--transition-fast) !important;
}

.comments li:hover .text a {
  color:       var(--text-active) !important;
  text-shadow: var(--glow-hover) !important;
}

.comments a.destroy {
  border:     none !important;
  position:   absolute !important;
  display:    block !important;
  cursor:     pointer !important;
  right:      10px !important;
  top:        10px !important;
  width:      20px !important;
  height:     20px !important;
  opacity:    0 !important;
  transition: opacity var(--transition-fast) !important;
}

#comment-btn {
  background:      var(--glass-bg) !important;
  backdrop-filter: var(--glass-blur) !important;
  color:           var(--text-mid) !important;
  border:          1px solid var(--glass-border) !important;
  border-radius:   var(--radius-sm) !important;
  font-weight:     700 !important;
  box-shadow:      none !important;
  transition:      color var(--transition-fast),
                   border-color var(--transition-fast),
                   box-shadow var(--transition-fast) !important;
}

#comment-btn:hover {
  color:        var(--text-active) !important;
  border-color: rgba(255, 255, 255, 0.3) !important;
  box-shadow:   none !important;
  background:   rgba(255, 255, 255, 0.08) !important;
}

.comments:hover a.destroy {
  opacity: 0.35 !important;
}

.comments a.destroy:hover {
  opacity: 0.8 !important;
}

#placeholder-comment {
  display: none !important;
}

.pure-form input[type=text],
.pure-form input[type=password],
.pure-form input[type=email],
.pure-form input[type=url],
.pure-form input[type=date],
.pure-form input[type=month],
.pure-form input[type=time],
.pure-form input[type=datetime],
.pure-form input[type=datetime-local],
.pure-form input[type=week],
.pure-form input[type=number],
.pure-form input[type=search],
.pure-form input[type=tel],
.pure-form input[type=color],
.pure-form select,
.pure-form textarea {
  background:      var(--glass-bg) !important;
  backdrop-filter: var(--glass-blur) !important;
  color:           var(--text-mid) !important;
  border:          1px solid var(--glass-border) !important;
  border-radius:   var(--radius-sm) !important;
  box-shadow:      none !important;
  padding:         .45em .5em !important;
  box-sizing:      border-box !important;
  transition:      border-color var(--transition-fast),
                   box-shadow var(--transition-fast),
                   color var(--transition-fast) !important;
}

.pure-form input[type=text]:focus,
.pure-form input[type=password]:focus,
.pure-form input[type=email]:focus,
.pure-form input[type=url]:focus,
.pure-form input[type=date]:focus,
.pure-form input[type=month]:focus,
.pure-form input[type=time]:focus,
.pure-form input[type=datetime]:focus,
.pure-form input[type=datetime-local]:focus,
.pure-form input[type=week]:focus,
.pure-form input[type=number]:focus,
.pure-form input[type=search]:focus,
.pure-form input[type=tel]:focus,
.pure-form input[type=color]:focus,
.pure-form select:focus,
.pure-form textarea:focus {
  outline:      none !important;
  border-color: rgba(255, 255, 255, 0.35) !important;
  box-shadow:   0 0 0 2px rgba(255, 255, 255, 0.06),
                0 0 12px rgba(255, 255, 255, 0.08) !important;
  color:        var(--text-active) !important;
}

.pure-form input[disabled],
.pure-form select[disabled],
.pure-form textarea[disabled] {
  cursor:     not-allowed !important;
  background: rgba(255, 255, 255, 0.03) !important;
  color:      var(--text-dim) !important;
  opacity:    0.5 !important;
}

.pure-form input[readonly],
.pure-form select[readonly],
.pure-form textarea[readonly] {
  background:   rgba(255, 255, 255, 0.03) !important;
  color:        var(--text-dim) !important;
  border-color: var(--glass-border) !important;
}

.pure-form input:focus:invalid,
.pure-form textarea:focus:invalid,
.pure-form select:focus:invalid {
  border-color: rgba(220, 80, 80, 0.7) !important;
  box-shadow:   0 0 8px rgba(220, 80, 80, 0.2) !important;
  color:        rgba(255, 160, 160, 0.9) !important;
}

.pure-form select {
  background-color: var(--glass-bg) !important;
  border:           1px solid var(--glass-border) !important;
}

.pure-form label {
  color:     var(--text-mid) !important;
  font-size: 90% !important;
  margin:    .5em 0 .2em !important;
}

.pure-form legend {
  color:       var(--text-active) !important;
  font-weight: 700 !important;
  text-shadow: var(--glow-soft) !important;
}

.pure-form fieldset.pure-group {
  background:       var(--glass-bg) !important;
  background-image: none !important;
  backdrop-filter:  var(--glass-blur) !important;
  border-top:       2px solid var(--glass-border) !important;
  border-radius:    var(--radius-md) !important;
  color:            var(--text-mid) !important;
  filter:           none !important;
}

.pure-form .pure-group h4 {
  color:       var(--text-active) !important;
  text-shadow: none !important;
}

.pure-form-message {
  color:     var(--text-dim) !important;
  font-size: 90% !important;
}

.control-group.error textarea,
.control-group.error input,
input.error,
textarea.error {
  border:     1px solid rgba(220, 80, 80, 0.6) !important;
  background: rgba(220, 80, 80, 0.08) !important;
  color:      rgba(255, 160, 160, 0.9) !important;
}

.control-group.error ul.help-inline {
  color: rgba(255, 120, 120, 0.9) !important;
}

#marketplace-detail .product-description {
  margin-top:      20px !important;
  padding:         20px !important;
  background:      var(--glass-bg) !important;
  backdrop-filter: var(--glass-blur) !important;
  border:          1px solid var(--glass-border) !important;
  border-radius:   var(--radius-sm) !important;
  box-shadow:      0 2px 12px rgba(0, 0, 0, 0.3) !important;
  color:           var(--text-mid) !important;
  font-family:     'Open Sans', sans-serif !important;
  font-size:       17px !important;
  font-weight:     700 !important;
  line-height:     24px !important;
  text-shadow:     none !important;
  transition:      background var(--transition-base),
                   border-color var(--transition-base),
                   box-shadow var(--transition-base) !important;
}

#marketplace-detail .product-description:hover {
  background:   rgba(255, 255, 255, 0.08) !important;
  border-color: rgba(255, 255, 255, 0.16) !important;
  box-shadow:   0 4px 20px rgba(0, 0, 0, 0.4),
                0 0 0 1px rgba(255, 255, 255, 0.06) !important;
}

.purchase-button {
  background:       var(--glass-bg) !important;
  backdrop-filter:  var(--glass-blur) !important;
  color:            var(--text-active) !important;
  border:           1px solid rgba(255, 255, 255, 0.2) !important;
  border-radius:    var(--radius-sm) !important;
  font-weight:      700 !important;
  text-shadow:      none !important;
  box-shadow:       none !important;
  filter:           none !important;
  background-image: none !important;
  transition:       color var(--transition-fast),
                    border-color var(--transition-fast),
                    background var(--transition-fast) !important;
}

.purchase-button:hover {
  background:   rgba(255, 255, 255, 0.08) !important;
  border-color: rgba(255, 255, 255, 0.35) !important;
  box-shadow:   none !important;
}

.purchase-button:active {
  background:   rgba(255, 255, 255, 0.05) !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
}


.game-stats {
  color:            var(--text-mid) !important;
  font-size:        14px !important;
  line-height:      24px !important;
  width:            100% !important;
  background:       var(--glass-bg) !important;
  background-image: none !important;
  backdrop-filter:  var(--glass-blur) !important;
  border:           1px solid var(--glass-border) !important;
  border-radius:    var(--radius-md) !important;
  box-shadow:       0 2px 12px rgba(0, 0, 0, 0.3) !important;
  filter:           none !important;
}

.game-stats .data {
  font-weight: 700 !important;
  color:       var(--text-active) !important;
}

.game-stats .caption {
  padding:    0 10px !important;
  color:      var(--text-dim) !important;
  font-size:  12px !important;
}

.game-stats .stats-item > div {
  color:        var(--text-mid) !important;
  border-right: 1px solid var(--glass-border) !important;
  transition:   color var(--transition-fast) !important;
}

.game-stats .stats-item > div:hover {
  color: var(--text-active) !important;
}

.game-stats .stats-item:last-child > div {
  border: none !important;
}

#like-btn,
.play-now {
  background:       var(--glass-bg) !important;
  backdrop-filter:  var(--glass-blur) !important;
  background-image: none !important;
  filter:           none !important;
  border:           1px solid var(--glass-border) !important;
  border-radius:    var(--radius-sm) !important;
  font-weight:      700 !important;
  text-shadow:      none !important;
  box-shadow:       none !important;
  transition:       color var(--transition-fast),
                    border-color var(--transition-fast),
                    background var(--transition-fast) !important;
}

#like-btn {
  color: var(--text-mid) !important;
}

.play-now {
  color: var(--text-active) !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
}

#like-btn:hover,
.play-now:hover {
  background:   rgba(255, 255, 255, 0.08) !important;
  border-color: rgba(255, 255, 255, 0.3) !important;
}

#like-btn:hover {
  color: var(--text-active) !important;
}

#like-btn:active,
.play-now:active {
  background:   rgba(255, 255, 255, 0.05) !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
}

  `;

  function inject() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.type = "text/css";
    style.textContent = CSS;

    const target = document.head || document.documentElement;
    target.prepend(style);
  }

  inject();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject, { once: true });
  }

  const observer = new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          inject();
          return;
        }
      }
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  window.addEventListener(
    "load",
    function () {
      observer.disconnect();
    },
    { once: true },
  );
})();
