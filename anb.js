// anb.js
const fs = require('fs');
const https = require('https');
const { getPublicKey, signEvent, getEventHash, relayInit } = require('nostr-tools');
const config = require('./config');

// Use values from the config
const sk = config.privateKey;
const pk = getPublicKey(sk);
const stationWebpageUrl = config.stationWebpageUrl;
const sslOptions = {
  key: fs.readFileSync(config.sslOptions.key),
  cert: fs.readFileSync(config.sslOptions.cert),
};
const relayUrls = config.relayUrls;

// Initialize and connect to each relay
const relays = relayUrls.map(url => {
  const relay = relayInit(url);
  relay.connect().catch(error => {
    console.error(`Failed to connect to relay ${url}:`, error);
  });
  return relay;
});

// Create an HTTPS server to listen for incoming webhooks from AzuraCast
const server = https.createServer(sslOptions, (req, res) => {
  if (req.method === 'POST' && req.url === '/webhook') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      // Parse the JSON payload from the webhook request (NowPlaying data)
      const nowPlayingData = JSON.parse(body);

      // Extract relevant information from the NowPlaying data
      const songTitle = nowPlayingData.now_playing.song.title;
      const artistName = nowPlayingData.now_playing.song.artist;
      const stationName = nowPlayingData.station.name;

      // Create a Nostr event with the extracted information and a link to the station webpage
      const event = {
        kind: 1, // Custom event kind
        created_at: Math.floor(Date.now() / 1000),
        tags: [],
        content: `Song "${songTitle}" by ${artistName} is now playing on station "${stationName}". Listen here: ${stationWebpageUrl}`,
        pubkey: pk,
      };
      event.id = getEventHash(event);
      event.sig = signEvent(event, sk);

      // Publish the event to each Nostr relay
      relays.forEach(relay => {
        const pub = relay.publish(event);
        pub.on('ok', () => {
          console.log(`Successfully published event to ${relay.url}`);
        });
        pub.on('failed', reason => {
          console.error(`Failed to publish to ${relay.url}: ${reason}`);
        });
      });

      res.end('Event published');
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

// Start the HTTPS server
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
