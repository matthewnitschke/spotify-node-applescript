var util = require('util'),
    osascript = require("osascript-promise");

// Apple scripts
// ----------------------------------------------------------------------------
/*

 */
var scripts = {
    open: 'tell application \"Spotify\" to activate',
    state: `
    tell application "Spotify"
      set cstate to "{"
      set cstate to cstate & "\\"track_id\\": \\"" & current track's id & "\\""
      set cstate to cstate & ",\\"volume\\": " & sound volume
      set cstate to cstate & ",\\"position\\": " & (player position as integer)
      set cstate to cstate & ",\\"state\\": \\"" & player state & "\\""
      set cstate to cstate & "}"
      return cstate
    end tell
    `,
    track: `
    tell application "Spotify"
    	set ctrack to "{"
    	set ctrack to ctrack & "\\"artist\\": \\"" & current track's artist & "\\""
    	set ctrack to ctrack & ",\\"album\\": \\"" & current track's album & "\\""
    	set ctrack to ctrack & ",\\"disc_number\\": " & current track's disc number
    	set ctrack to ctrack & ",\\"duration\\": " & current track's duration
    	set ctrack to ctrack & ",\\"played_count\\": " & current track's played count
    	set ctrack to ctrack & ",\\"track_number\\": " & current track's track number
    	set ctrack to ctrack & ",\\"popularity\\": " & current track's popularity
    	set ctrack to ctrack & ",\\"id\\": \\"" & current track's id & "\\""
    	set ctrack to ctrack & ",\\"name\\": \\"" & current track's name & "\\""
    	set ctrack to ctrack & ",\\"album_artist\\": \\"" & current track's album artist & "\\""
    	set ctrack to ctrack & ",\\"artwork_url\\": \\"" & current track's artwork url & "\\""
    	set ctrack to ctrack & ",\\"spotify_url\\": \\"" & current track's spotify url & "\\""
    	set ctrack to ctrack & "}"
    end tell
    `,
    volumeUp:
        'tell application "Spotify" to set sound volume to (sound volume + 10)',
    volumeDown:
        'tell application "Spotify" to set sound volume to (sound volume - 10)',
    setVolume:
        'tell application "Spotify" to set sound volume to %s',
    play:
        `tell application "Spotify" to play`,
    playTrack:
        'tell application "Spotify" to play track "%s"',
    playTrackInContext:
        'tell application "Spotify" to play track "%s" in context "%s"',
    playPause:
        'tell application "Spotify" to playpause',
    pause:
        'tell application "Spotify" to pause',
    next:
        'tell application "Spotify" to next track',
    previous:
        'tell application "Spotify" to previous track',
    jumpTo:
        'tell application "Spotify" to set player position to %s',
    isRunning:
        'get running of application "Spotify"',
    isRepeating:
        'tell application "Spotify" to return repeating',
    isShuffling:
        'tell application "Spotify" to return shuffling',
    setRepeating:
        'tell application "Spotify" to set repeating to %s',
    setShuffling:
        'tell application "Spotify" to set shuffling to %s',
    toggleRepeating: `
    tell application "Spotify"
      if repeating then
        set repeating to false
      else
        set repeating to true
      end if
    end tell
    `,
    toggleShuffling: `
    tell application "Spotify"
      if shuffling then
        set shuffling to false
      else
        set shuffling to true
      end if
    end tell
    `
};

// Apple script execution
// ----------------------------------------------------------------------------


var execScript = function(scriptName, params, callback){
    if (arguments.length === 2 && typeof params === 'function'){
        // second argument is the callback
        callback = params;
        params = undefined;
    }

    // applescript lib needs a callback, but callback is not always useful
    if (!callback) callback = function(){};

    if (typeof params !== 'undefined' && !Array.isArray(params)){
        params = [params];
    }

    var script = scripts[scriptName];

    if (typeof params !== 'undefined'){
      script = util.format.apply(util, [script].concat(params));
    }

    return osascript(script).then(function(response){
      return JSON.parse(response);
    });
};

// API
// ----------------------------------------------------------------------------

// Open track

exports.open = function(){
    return execScript('open');
};

exports.playTrack = function(track){
    return execScript('playTrack', track);
};

exports.playTrackInContext = function(track, context){
    return execScript('playTrackInContext', [track, context]);
};

// Playback control

exports.play = function(){
    return execScript('play');
};

exports.pause = function(){
    return execScript('pause');
};

exports.playPause = function(){
    return execScript('playPause');
};

exports.next = function(){
    return execScript('next');
};

exports.previous = function(){
    return execScript('previous');
};

exports.jumpTo = function(position){
    return execScript('jumpTo', position);
};

exports.setRepeating = function(repeating){
    return execScript('setRepeating', repeating);
};

exports.setShuffling = function(shuffling){
    return execScript('setShuffling', shuffling);
};

exports.toggleRepeating = function(){
    return execScript('toggleRepeating');
};

exports.toggleShuffling = function(){
    return execScript('toggleShuffling');
};

// Volume control

var mutedVolume = null;

exports.volumeUp = function(){
    mutedVolume = null;
    return execScript('volumeUp');
};

exports.volumeDown = function(){
    mutedVolume = null;
    return execScript('volumeDown');
};

exports.setVolume = function(volume){
    mutedVolume = null;
    return execScript('setVolume', volume);
};

exports.muteVolume = function(){
    return execScript('state').then(function(resp){
      var volumeBeforeMute = resp.volume;
      return exports.setVolume(0).then(function(){
        // setVolume sets mutedVolume to null, so set mutedVolume after setVolume is done
        mutedVolume = volumeBeforeMute;
      });
    })
};

exports.unmuteVolume = function(){
    if (mutedVolume !== null) {
        return exports.setVolume(mutedVolume);
    } else {
      // volume not muted so return empty promise
      return new Promise((resolve, reject) => {
          reject("Volume not muted");
      });
    }
};

// State retrieval

exports.getTrack = function(){
    return execScript('track');
};

exports.getState = function(){
    return execScript('state');
};

exports.isRunning = function() {
    return execScript('isRunning');
};

exports.isRepeating = function(){
    return execScript('isRepeating');
};

exports.isShuffling = function(){
    return execScript('isShuffling');
};
