/**
 * Get Spotify albums links
 * --------------------------------------------------
 * 
 * Script for Node based in the examples provided for Spotify.
 * 
 * - Spotify original examples: 
 * https://github.com/spotify/web-api-auth-examples/
 *
 *
 * Usage:
 *   node get_albums.js
 * 
 **/
// Variables
const csv = require('csv');
const SpotifyWebApi = require('spotify-web-api-node');
const fs = require('fs');
const config = require('./config.json');
let accessToken;
let spotifyApi;
/**
 * exportAlbums
 * ----------------------
 * 
 * Receives a JSON Object and exports it in a text file.
 *
 * The text file is an ordered list in markdown with a list of the total of
 * artists of the playlist. 
 * 
 * This is an example of retrieving data with the Spotify API and you can
 * modify this code as you like.
 * 
 * @param  {Object} json JSON response of the Spotify API
 * 
 * @return {Boolean}     True if everything went OK
 */
function exportAlbums(json) {
  var items = json.albums.items;
  var tags = [];
  var text = 'Playlist id: ' + playlist_id +'\n\n';
  var songs = [];
  var i = 1;

  if ('undefined' !== typeof items && items.length) {
    fs.writeFile('./export.md', items[0].external_urls.spotify, function (err) {
      if(err) {
        console.log(err);
      } else {
        console.log("The file was saved!");
      }
    });

    return true;
  }

  return false;
}

// check if config file is correct
if (!config.client_id || !config.client_secret) {
  console.log('Error: incorrect config data');
  process.exit();
}

spotifyApi = new SpotifyWebApi({
  clientId : config.client_id,
  clientSecret : config.client_secret,
});

spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);

    spotifyApi.searchAlbums(`artist:The Bloody Beetroots album:The Great Electronic Swindle`, { limit: 1 })
      .then(data => console.log(data.body))
      .catch(data => console.log(data))
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err.message);
  });

// try {
//   let data = await spotifyApi.clientCredentialsGrant();

//   spotifyApi.setAccessToken(data.body['access_token']);
// } catch (e) {
//   console.log(e);

//   return false;
// }

// spotifyApi.searchAlbums(`artist:The Bloody Beetroots album:The Great Electronic Swindle`, { limit: 1 })
//   .then(data => console.log(data))
//   .catch(data => console.log(data))


// fs.createReadStream('albums.csv')
//   .pipe(csv.parse())
//   .on(
//     'data', 
//     (data) => {
//       if (data.length) {
//         Promise.all(
//           data.map(
//             values => spotifyApi.searchAlbums(`artist:${values[0]} album:${values[1]}`, { limit: 1 })
//           )
//         )
//         .then(spotifyAlbums => console.log(spotifyAlbums))
//         .catch(e => console.log(e));
//       }
//     }
//   );
