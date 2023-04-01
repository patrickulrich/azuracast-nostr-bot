# AzuraCast Nostr Bot

AzuraCast Nostr Bot is a Node.js bot that broadcasts AzuraCast's 'Now Playing' information to a set of Nostr relays in real-time.

## Broadcast Now Playing Information on the Nostr Network

The bot listens for incoming webhooks from AzuraCast and publishes real-time "Now Playing" information about the currently playing song or podcast episode on your radio station to the defined Nostr relays. Listeners and followers on Nostr can stay updated about what's currently playing on your station and join the live broadcast with a single click.

## Key Features

- Real-time publication of "Now Playing" information to Nostr.
- Supports broadcasting to multiple Nostr relays for increased visibility.
- Configurable webhook endpoint and SSL support for secure communication.
- Easy integration with AzuraCast stations.

## Prerequisites

- Node.js and npm installed on your system.
- AzuraCast instance with webhook integration enabled.
- SSL certificate and key for secure communication (e.g., Let's Encrypt).
- A Nostr private key (hex format) to be specified in the configuration file.

## Setup and Configuration

1. Clone this repository or download the source code.

```
git clone https://github.com/patrickulrich/azuracast-nostr-bot.git
cd azuracast-nostr-bot
```

2. Install the required npm packages.

```
npm install
```

3. Configure the bot by editing the `config.js` file. Specify the following information:

- `privateKey`: Your pre-existing Nostr private key (hex string).
- `stationWebpageUrl`: The URL of your AzuraCast station's public webpage.
- `sslOptions`: The file paths for your SSL certificate and key.
- `relayUrls`: An array of Nostr relay URLs to which you want to publish events.

4. Start the bot.

```
node anb.js
```

The bot will start listening for incoming webhooks on port 3000.

5. Configure the webhook integration in your AzuraCast instance. Set the webhook URL to `https://your-domain:3000/webhook`.

## Usage

Once the bot is running and the webhook is configured, it will automatically publish "Now Playing" information to the specified Nostr relays whenever a new song or podcast episode starts playing on your AzuraCast station. The published event will include the title, artist, station name, and a link to the station's webpage.

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the [Issues](https://github.com/patrickulrich/azuracast-nostr-bot/issues) page if you want to contribute.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

- Patrick Ulrich - npub1patrlck0muvqevgytp4etpen0xsvrlw0hscp4qxgy40n852lqwwsz79h9a
- Project Link: https://github.com/patrickulrich/azuracast-nostr-bot

## Acknowledgements

- [AzuraCast](https://www.azuracast.com/)
- [Nostr](https://github.com/fiatjaf/nostr)
