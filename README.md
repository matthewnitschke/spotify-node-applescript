# spotify-node-applescript-promise
Control Spotify on Mac OSX with NodeJS and AppleScript. A promise port of [spotify-node-applescript](https://github.com/andrehaveman/spotify-node-applescript)

## Installation

```
$ npm install spotify-node-applescript-promise
```

## Running unit tests

```
$ npm test
```

## API

### playTrack(uri)

Play a track with Spotify URI `uri`.

```javascript
var spotify = require('spotify-node-applescript');

spotify.playTrack('spotify:track:3AhXZa8sUQht0UEdBJgpGc').then(() => {
    // track is playing
});
```

### playTrackInContext(uri, contextUri)

Play a track in context of for example an album.

```javascript
var spotify = require('spotify-node-applescript');

spotify.playTrackInContext('spotify:track:0R8P9KfGJCDULmlEoBagcO', 'spotify:album:6ZG5lRT77aJ3btmArcykra').then(() => {
    // Track is playing in context of an album
});
```

### getTrack()

Get the current track. `callback` is called with the current track as second argument.

```javascript
var spotify = require('spotify-node-applescript');

spotify.getTrack().then((track) => {

    /*
    track = {
        artist: 'Bob Dylan',
        album: 'Highway 61 Revisited',
        disc_number: 1,
        duration: 370,
        played count: 0,
        track_number: 1,
        starred: false,
        popularity: 71,
        id: 'spotify:track:3AhXZa8sUQht0UEdBJgpGc',
        name: 'Like A Rolling Stone',
        album_artist: 'Bob Dylan',
        artwork_url: 'http://images.spotify.com/image/e3d720410b4a0770c1fc84bc8eb0f0b76758a358',
        spotify_url: 'spotify:track:3AhXZa8sUQht0UEdBJgpGc' }
    }
    */

});
```

### getState()

Get player state.

```javascript
var spotify = require('spotify-node-applescript');

spotify.getState().then((state) => {
    /*
    state = {
        volume: 99,
        position: 232,
        state: 'playing'
    }
    */
});
```

### jumpTo(second)

Jump to a specific second of the current song.

```javascript
var spotify = require('spotify-node-applescript');

spotify.jumpTo(15).then(() => {
    console.log('Jumped 15th second of the song');
});
```

### play()

Resume playing current track.

### pause()

Pause playing track.

### playPause()

Toggle play.

### next()

Play next track.

### previous()

Play previous track.

### volumeUp()

Turn volume up.

### volumeDown()

Turn volume down.

### setVolume(volume)

Sets the volume.

```javascript
var spotify = require('spotify-node-applescript');

spotify.setVolume(42).then(() => {
    spotify.getState(function(err, state) {
        console.log(state.volume);
    });
});
```

### muteVolume()

Reduces audio to 0, saving the previous volume.

### unmuteVolume()

Returns audio to original volume.

### isRunning()

Check if Spotify is running.

```javascript
var spotify = require('spotify-node-applescript');

spotify.isRunning().then((isRunning) => {
    console.log(isRunning); // true
});
```

### isRepeating()
Is repeating on or off?
```js
var spotify = require('spotify-node-applescript');

spotify.isRepeating().then((shuffling) => {
    console.log(shuffling); // true || false
});
```

### isShuffling()
Is shuffling on or off?
```js
var spotify = require('spotify-node-applescript');

spotify.isShuffling((shuffling) => {
    console.log(shuffling); // true || false
});
```
### setRepeating(repeating/\**boolean*\*/)
Sets repeating on or off

### setShuffling(shuffling/\**boolean*\*/)
Sets shuffling on or off

### toggleRepeating()
Toggles repeating

### toggleShuffling()
Toggles shuffling

## Contributors

* [Robin Mehner](https://github.com/rmehner)
* [Thorsten Ball](https://github.com/mrnugget)
* [Paul Marbach](https://github.com/fastfrwrd)
* [Matthew Nitschke](https://github.com/matthewnitschke)

## License

[MIT](LICENSE)
