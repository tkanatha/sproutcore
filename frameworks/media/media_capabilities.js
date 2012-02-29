// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2012 Michael Krotscheck and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/**
 * @class
 * 
 * An easy-to-reference list of media capabilities which the current running
 * browser supports such as HTML5 and Plugin detection. It is modeled after
 * Flash Player's browser capabilities class, with all the non-media related
 * properties removed. The browser version support reference is
 * http://caniuse.com, and we've taken a very bullish approach: Partial support
 * or support via browser-custom properties is not considered "supported" for
 * our purposes.
 * 
 * @see http://caniuse.com/
 * @since SproutCore 1.8
 * @author Michael Krotscheck
 */
SC.mediaCapabilities = SC.Object.create({});

console.log("FOO");

/**
 * Automatic detection of various browser media capabilities.
 */
(function() {
  /**
   * Specifies whether the browser supports the HTML5 <audio> tag. Versions
   * are taken from http://caniuse.com
   * 
   * @see http://caniuse.com
   * @name SC.mediaCapabilities.isHTML5AudioSupported
   * @type Boolean
   */
  SC.mediaCapabilities.isHTML5AudioSupported = NO;
  try {
    var doc = document.createElement('audio');
    isAudioSupported = !!doc.canPlayType;
    delete doc;
    SC.mediaCapabilities.isHTML5AudioSupported = YES;
  } catch (e) {
  }

  /**
   * Specifies whether the browser supports the HTML5 <video> tag.
   * 
   * @name SC.mediaCapabilities.isHTML5AudioSupported
   * @type Boolean
   */
  SC.mediaCapabilities.isHTML5VideoSupported = NO;
  try {
    var doc = document.createElement('video');
    isVideoSupported = !!doc.canPlayType;
    delete doc;
    SC.mediaCapabilities.isHTML5VideoSupported = YES;
  } catch (e) {
  }

  /**
   * Specifies whether the browser supports the Adobe Flash plugin.
   * 
   * @name SC.mediaCapabilities.isHTML5AudioSupported
   * @type Boolean
   */
  SC.mediaCapabilities.isFlashSupported = NO;
  // Non-IE detection
  if (navigator.plugins) {
    for ( var i = 0; i < navigator.plugins.length; i++) {
      if (navigator.plugins[i].name.indexOf("Shockwave Flash") >= 0) {
        SC.mediaCapabilities.isFlashSupported = YES;
      }
    }
  }
  // IE ActiveX detection
  if (window.ActiveXObject) {
    try {
      var control = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
      delete control;
      SC.mediaCapabilities.isFlashSupported = YES;
    } catch (e) {
      // Do nothing- The ActiveX object isn't available.
    }
  }

  /**
   * Specifies whether the browser supports quicktime media playback.
   * 
   * @type Boolean
   */
  SC.mediaCapabilities.isQuicktimeSupported = NO;

  // Non-IE detection
  if (navigator.plugins) {
    for ( var i = 0; i < navigator.plugins.length; i++) {
      if (navigator.plugins[i].name.indexOf("QuickTime") >= 0) {
        SC.mediaCapabilities.isQuicktimeSupported = YES;
      }
    }
  }
  // IE ActiveX detection
  if (window.ActiveXObject) {
    var control = null;
    try {
      control = new ActiveXObject('QuickTime.QuickTime');
      delete control;
      SC.mediaCapabilities.isQuicktimeSupported = YES;
    } catch (e) {
      // Do nothing- the ActiveX object isn't available.
    }

    try {
      // This generates a user prompt in Internet Explorer 7
      control = new ActiveXObject('QuickTimeCheckObject.QuickTimeCheck');
      delete control;
      SC.mediaCapabilities.isQuicktimeSupported = YES;
    } catch (e) {
      // Do nothing- The ActiveX object isn't available.
    }
  }

  /**
   * Specifies whether the browser supports the HTML5 getUserMedia/Stream API.
   * 
   * NOTE: As of February 2012, this feature is still in Draft status and is
   * likely to change frequently. It's included here for the sake of
   * completeness, however concrete implementations don't yet exist.
   * 
   * @name SC.mediaCapabilities.isHTML5StreamApiSupported
   * @type Boolean
   */
  SC.mediaCapabilities.isHTML5StreamApiSupported = !!navigator.getUserMedia;

  /**
   * Specifies whether the browser supports audio recording via the HTML5
   * stream API or the Adobe Flash plugin.
   * 
   * @name SC.mediaCapabilities.hasMicrophone
   * @type Boolean
   */
  SC.mediaCapabilities.hasMicrophone = SC.mediaCapabilities.isHTML5StreamApiSupported || SC.mediaCapabilities.isFlashSupported;

  /**
   * Specifies whether the browser supports video recording via the HTML5
   * stream API or the Adobe Flash Plugin.
   * 
   * @name SC.mediaCapabilities.hasMicrophone
   * @type Boolean
   */
  SC.mediaCapabilities.hasVideoCamera = SC.mediaCapabilities.isHTML5StreamApiSupported || SC.mediaCapabilities.isFlashSupported;

  /**
   * Specifies whether the browser has audio playback capabilities.
   * 
   * @name SC.mediaCapabilities.hasAudioPlayback
   * @type Boolean
   */
  SC.mediaCapabilities.hasAudioPlayback = SC.mediaCapabilities.isHTML5AudioSupported || SC.mediaCapabilities.isQuicktimeSupported || SC.mediaCapabilities.isFlashSupported;

  /**
   * Specifies whether the browser has video playback capabilities.
   * 
   * @name SC.mediaCapabilities.hasVideoPlayback
   * @type Boolean
   */
  SC.mediaCapabilities.hasVideoPlayback = SC.mediaCapabilities.isHTML5VideoSupported || SC.mediaCapabilities.isQuicktimeSupported || SC.mediaCapabilities.isFlashSupported;

})();
