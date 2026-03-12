# KSC Location Navigator

A Chrome extension that gives you quick access to all Kelsey-Seybold Clinic locations and specialties.

## Why

The KSC website doesn't make it easy to jump directly to a specific clinic or specialty page. This extension puts every location and specialty one click away — no navigating through menus or searching the site.

## How it works

1. Click the extension icon (or press `Alt+Shift+L`)
2. A popup opens with two tabs: **Locations** and **Specialties**
3. Start typing to filter the list
4. Click an item or use arrow keys + Enter to open it in a new tab

## Install

1. Download or clone this repo
2. Go to `chrome://extensions` in Chrome
3. Turn on "Developer mode" (top right)
4. Click "Load unpacked" and select this folder
5. The extension icon will appear in your toolbar

## Updating data

If KSC opens or closes a clinic, edit `locations.js`. If specialties change, edit `specialties.js`. Each entry has a name and URL:

```js
{ name: "Clinic Name", url: "https://www.kelsey-seybold.com/find-a-location/clinic-slug" }
{ name: "Specialty Name", url: "https://www.kelsey-seybold.com/medical-services-and-specialties/specialty-slug" }
```
