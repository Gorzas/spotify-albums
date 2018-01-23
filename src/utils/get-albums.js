const SpotifyWebApi = require('spotify-web-api-node');
const config = require('../config/config.json');

const spotifyApi = new SpotifyWebApi({
  clientId: config.client_id,
  clientSecret: config.client_secret,
});

function getAlbum(release) {
  return new Promise((resolve) => {
    if (!release.url) {
      spotifyApi.searchAlbums(`artist:${release.artist} album:${release.album}`, { limit: 1 })
        .then((data) => {
          const url = data.body.albums.items.length ?
            data.body.albums.items[0].external_urls.spotify :
            '';

          resolve(Object.assign(
            {},
            release,
            {
              url,
            },
          ));
        });
    } else {
      resolve(release);
    }
  });
}

async function getAlbums(data) {
  let cred;

  try {
    cred = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(cred.body.access_token);
  } catch (e) {
    console.error(e);

    return false;
  }

  return Promise.all(data.map(release => getAlbum(release)));
}

module.exports = getAlbums;
