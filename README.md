<p align="center">
  <a href="https://github.com/Kibibit/kb-steam-card/" target="blank"><img src="https://thatkookooguy.github.io/https-assets/screenshots/kb-steam-card-logo.png" width="500" alt="achievibit Logo" />
  </a>
  <h2 align="center">
    @kibibit/hass-kibibit-theme
  </h2>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/@kibibit/kb-steam-card"><img src="https://img.shields.io/npm/v/@kibibit/kb-steam-card/latest.svg?style=for-the-badge&logo=npm&color=CB3837"></a>
</p>
<p align="center">
  <a href="https://github.com/custom-components/hacs"><img src="https://img.shields.io/badge/HACS-Default-orange.svg"></a>
  <a href="https://imgur.com/gallery/SQJNbWb"><img src="https://img.shields.io/badge/Screenshots-Click_Here-ff3860.svg"></a>
</p>
<p align="center">
  A Home Assistant card for Steam integrations
</p>
<hr>

([Theme](https://github.com/kibibit/hass-kibibit-theme) used in screenshots)

## Screenshots

### away \ offline state

![away \ offline state](https://thatkookooguy.github.io/https-assets/screenshots/kb-steam-card-offline.jpeg)

### online state

![online state](https://thatkookooguy.github.io/https-assets/screenshots/kb-steam-card-online.jpeg)

### while playing a game

![now playing](https://thatkookooguy.github.io/https-assets/screenshots/kb-steam-card-now-playing.jpeg)

## Installation

### Prerequisites
You need at least one [steam integration](https://www.home-assistant.io/integrations/steam_online/) to use with this card.

### HACS (recommended)

1. Go to the Community Store.
2. Search for `steam card`.
3. Press `Install`.

### Manual Installation

```yaml
resources:
  url: '<url-to-card.js>'
  type: module
```

## Usage

for a single user card, use `entity`:

```yaml
entity: sensor.steam_<steam-id>
type: 'custom:kb-steam-card'
```

you can change the username using the following:

```yaml
entity: sensor.steam_<steam-id>
friendly_name: Myself
type: 'custom:kb-steam-card'
```

for multiple users, use the `entities` attribute:
![](screenshots/multi.png)

```yaml
entities:
  - sensor.steam_<steam-id>
  - sensor.steam_<steam-id>
  - sensor.steam_<steam-id>
type: 'custom:kb-steam-card'
```

you can also use a prefix selector to select all steam sensors:

```yaml
type: 'custom:kb-steam-card'
entities: sensor.steam_
```

to show only **online users**, add the `online_only` attribute:

```yaml
type: 'custom:kb-steam-card'
entities: sensor.steam_
online_only: true
```

you can also show the game header image as background with `game_background: true`:
![](screenshots/game-bg.png)

```yaml
entities:
  - sensor.steam_<steam-id>
  - sensor.steam_<steam-id>
  - sensor.steam_<steam-id>
friendly_name: hello
game_background: true
type: 'custom:kb-steam-card'
```

to adjust the card title you can use the `title` attribute:

```yaml
type: 'custom:kb-steam-card'
entities: sensor.steam_
title: Steam Friends
```

## Stay in touch

- Author - [Neil Kalman](https://github.com/thatkookooguy)
- Website - [https://github.com/kibibit](https://github.com/kibibit)
- StackOverflow - [thatkookooguy](https://stackoverflow.com/users/1788884/thatkookooguy)
- Twitter - [@thatkookooguy](https://twitter.com/thatkookooguy)
- Twitter - [@kibibit_opensrc](https://twitter.com/kibibit_opensrc)

## Support

Hey dude! Help me out for a couple of :beers: or a :coffee: by clicking on the sponsering link!
