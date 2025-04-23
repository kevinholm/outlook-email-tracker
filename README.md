
# Outlook Email Tracker

This is a custom Outlook Add-in that injects a tracking pixel into outgoing emails and logs when they are opened.

## Features
- Track email opens with a 1x1 invisible image
- Avoid tracking yourself via IP filter
- Logs IP, timestamp, and user-agent
- Web interface viewable in Outlook taskpane

## Setup
1. Deploy the app to [Railway](https://railway.app) or similar
2. Replace 'yourdomain.com' in manifest.xml with your deployed URL
3. Upload the updated manifest.xml to Outlook Web -> Settings -> Add-ins -> Upload custom add-in
4. Add `<img src="https://yourdomain.com/track/UNIQUE_ID" style="display:none;">` manually in emails for now

Enjoy!
