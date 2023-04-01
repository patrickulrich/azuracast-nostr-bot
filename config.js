// config.js
module.exports = {
  // Your pre-existing Nostr private key (hex string)
  privateKey: 'YOUR_NOSTR_PRIVATE_KEY',

  // The URL of your AzuraCast station's public webpage
  stationWebpageUrl: 'YOUR_AZURACAST_STATION_WEBPAGE_URL',

  // File paths for your SSL certificate and key (e.g., Let's Encrypt)
  sslOptions: {
    key: 'PATH_TO_YOUR_SSL_PRIVATE_KEY',
    cert: 'PATH_TO_YOUR_SSL_CERTIFICATE',
  },

  // An array of Nostr relay URLs to which you want to publish events
  relayUrls: [
    'NOSTR_RELAY_URL_1',
    'NOSTR_RELAY_URL_2',
    // Add more relay URLs as needed
  ],
};
