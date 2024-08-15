# Hugging Face Secrets Publisher

A Chrome extension that simplifies the process of publishing secrets to your Hugging Face Spaces.

## Features

- Automatically detects the current Hugging Face Space from the URL
- Parses .env file content and publishes secrets to your Space
- Works directly from the Hugging Face Space settings page
- Secure: uses your existing Hugging Face session for authentication

## Installation

### From Source

1. Clone this repository or download the source code:
   ```
   git clone https://github.com/yourusername/hf-secrets-publish.git
   ```
2. Open Google Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the directory containing the extension files

### From Chrome Web Store

*Coming soon*

## Usage

1. Navigate to your Hugging Face Space settings page (e.g., `https://huggingface.co/spaces/yourusername/yourspace/settings`)
2. Click on the Hugging Face Secrets Publisher extension icon in your Chrome toolbar
3. In the popup, you'll see the detected model space. Verify that it's correct.
4. Paste your .env file contents into the text area
5. Click "Publish Secrets"
6. The extension will publish each secret to your Hugging Face Space

## Development

### Project Structure

- `manifest.json`: Extension manifest file
- `popup.html`: HTML for the extension popup
- `popup.js`: JavaScript for the popup functionality
- `inject.js`: Script injected into the Hugging Face page to make API calls

### Building

No build step is required. The extension can be loaded directly from the source files.

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Privacy

This extension does not collect or store any user data. It only sends data directly to Hugging Face using your existing session.

## License

[MIT License](LICENSE)

## Support

If you encounter any issues or have questions, please file an issue on the GitHub issue tracker.

## Disclaimer

This is an unofficial tool and is not affiliated with or endorsed by Hugging Face.
