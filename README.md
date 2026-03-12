# KSC Location Navigator

A Chrome extension that gives you quick access to all 45 Kelsey-Seybold Clinic location pages.

## Why

The KSC website doesn't make it easy to jump directly to a specific clinic's page. This extension puts every location one click away — no navigating through menus or searching the site.

## How it works

1. Click the extension icon (or press `Alt+Shift+L`)
2. A popup opens with every KSC location listed
3. Start typing to filter the list
4. Click a location or use arrow keys + Enter to open it in a new tab

## Install

1. Download or clone this repo
2. Go to `chrome://extensions` in Chrome
3. Turn on "Developer mode" (top right)
4. Click "Load unpacked" and select this folder
5. The extension icon will appear in your toolbar

## Updating locations

If KSC opens or closes a clinic, edit the `locations.js` file. Each entry has a name and URL:

```js
{ name: "Clinic Name", url: "https://www.kelsey-seybold.com/find-a-location/clinic-slug" }
```
