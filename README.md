# Warframe.js

[![Supported by the Warframe Community Developers](https://img.shields.io/badge/Warframe_Comm_Devs-supported-blue.svg?color=2E96EF&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOTgiIGhlaWdodD0iMTczIiB2aWV3Qm94PSIwIDAgMjk4IDE3MyI%2BPHBhdGggZD0iTTE4NSA2N2MxNSA4IDI4IDE2IDMxIDE5czIzIDE4LTcgNjBjMCAwIDM1LTMxIDI2LTc5LTE0LTctNjItMzYtNzAtNDUtNC01LTEwLTEyLTE1LTIyLTUgMTAtOSAxNC0xNSAyMi0xMyAxMy01OCAzOC03MiA0NS05IDQ4IDI2IDc5IDI2IDc5LTMwLTQyLTEwLTU3LTctNjBsMzEtMTkgMzYtMjIgMzYgMjJ6TTU1IDE3M2wtMTctM2MtOC0xOS0yMC00NC0yNC01MC01LTctNy0xMS0xNC0xNWwxOC0yYzE2LTMgMjItNyAzMi0xMyAxIDYgMCA5IDIgMTQtNiA0LTIxIDEwLTI0IDE2IDMgMTQgNSAyNyAyNyA1M3ptMTYtMTFsLTktMi0xNC0yOWEzMCAzMCAwIDAgMC04LThoN2wxMy00IDQgN2MtMyAyLTcgMy04IDZhODYgODYgMCAwIDAgMTUgMzB6bTE3MiAxMWwxNy0zYzgtMTkgMjAtNDQgMjQtNTAgNS03IDctMTEgMTQtMTVsLTE4LTJjLTE2LTMtMjItNy0zMi0xMy0xIDYgMCA5LTIgMTQgNiA0IDIxIDEwIDI0IDE2LTMgMTQtNSAyNy0yNyA1M3ptLTE2LTExbDktMiAxNC0yOWEzMCAzMCAwIDAgMSA4LThoLTdsLTEzLTQtNCA3YzMgMiA3IDMgOCA2YTg2IDg2IDAgMCAxLTE1IDMwem0tNzktNDBsLTYtNmMtMSAzLTMgNi02IDdsNSA1YTUgNSAwIDAgMSAyIDB6bS0xMy0yYTQgNCAwIDAgMSAxLTJsMi0yYTQgNCAwIDAgMSAyLTFsNC0xNy0xNy0xMC04IDcgMTMgOC0yIDctNyAyLTgtMTItOCA4IDEwIDE3em0xMiAxMWE1IDUgMCAwIDAtNC0yIDQgNCAwIDAgMC0zIDFsLTMwIDI3YTUgNSAwIDAgMCAwIDdsNCA0YTYgNiAwIDAgMCA0IDIgNSA1IDAgMCAwIDMtMWwyNy0zMWMyLTIgMS01LTEtN3ptMzkgMjZsLTMwLTI4LTYgNmE1IDUgMCAwIDEgMCAzbDI2IDI5YTEgMSAwIDAgMCAxIDBsNS0yIDItMmMxLTIgMy01IDItNnptNS00NWEyIDIgMCAwIDAtNCAwbC0xIDEtMi00YzEtMy01LTktNS05LTEzLTE0LTIzLTE0LTI3LTEzLTIgMS0yIDEgMCAyIDE0IDIgMTUgMTAgMTMgMTNhNCA0IDAgMCAwLTEgMyAzIDMgMCAwIDAgMSAxbC0yMSAyMmE3IDcgMCAwIDEgNCAyIDggOCAwIDAgMSAyIDNsMjAtMjFhNyA3IDAgMCAwIDEgMSA0IDQgMCAwIDAgNCAwYzEtMSA2IDMgNyA0aC0xYTMgMyAwIDAgMCAwIDQgMiAyIDAgMCAwIDQgMGw2LTZhMyAzIDAgMCAwIDAtM3oiIGZpbGw9IiMyZTk2ZWYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg%3D%3D)](https://github.com/WFCD/banner/blob/master/PROJECTS.md)
[![ci](https://github.com/WFCD/Warframe.js/actions/workflows/ci.yaml/badge.svg)](https://github.com/WFCD/Warframe.js/actions/workflows/ci.yaml)
[![Coverage Status](https://coveralls.io/repos/github/WFCD/Warframe.js/badge.svg?branch=linting-tooling)](https://coveralls.io/github/WFCD/Warframe.js?branch=linting-tooling)


A JavaScript API Wrapper for Warframe's WorldState Data

# Installation

To install the Browser version simply add the JS file to your HTML by using the CDN Link or add `app.js` to your project:

#### CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/warframe.js@1.3.3/warframe.min.js"></script>
```

#### From your Project:

```html
<script src="app.js"></script>
```

#### NodeJS

To install the NodeJS Version, use `npm` like so:

```bash
$ npm i --save warframe.js
```


# Usage

For the NodeJS version, first `require` the module:

```js
const Warframe = require("warframe.js")
```

After loading in the Script initialize the `Warframe` class, like so:

```javascript
const WF = new Warframe(options);
```

Where `options` is an Object with the following structure:

```js
options = {
    platform: "pc"||"ps4"||"xb1"
}
```


Once initalized, you can use the newly created `WF` Object to access the getters, here is a table of those:


| Name                                  | Description                                              | Return Value      |
|---------------------------------------|----------------------------------------------------------|-------------------|
| Warframe.prototype.alerts             | The alerts and all data associated with them             | Promise           |
| Warframe.prototype.cycleCetus         | Current Day- or Nighttime on Cetus                       | Promise           |
| Warframe.prototype.cycleEarth         | Current Day- or Nighttime on Earth                       | Promise           |
| Warframe.prototype.conclaveChallenges | The active Conclave Challenges                           | Promise           |
| Warframe.prototype.dailyDeals         | Darvo's "Daily Deals"                                    | Promise           |
| Warframe.prototype.darkSectors        | The Dark Sectors and what Alliance/Clan has it           | Promise           |
| Warframe.prototype.events             | TBD                                                      | TBD               |
| Warframe.prototype.fissures           | Current Fissure Missions                                 | Promise           |
| Warframe.prototype.heartbeat          | Get a Heartbeat from the API                             | "Success" / Error |
| Warframe.prototype.invasions          | Current Invasion Missions / Infestation Outbreaks        | Promise           |
| Warframe.prototype.news               | News from the News Console (Updates, Prime Access, etc.) | Promise           |
| Warframe.prototype.simaris            | Simaris' current or last target                          | Promise           |
| Warframe.prototype.sorties            | The daily Sorties, Nodes and Conditions                  | Promise           |
| Warframe.prototype.syndicateMissions  | Current Missions of the Syndicates + Cetus Syndicates    | Promise           |
| Warframe.prototype.voidTrader         | When and where Baro will come, and what he carries       | Promise           |


## Examples

#### NodeJS:

```javascript
const Warframe = require("warframe.js");
let options = {platform: "pc"};

const WF = new Warframe(options);

WF.alerts.then(alerts => console.log(alerts));
```

#### Browser:

```javascript
let options = {platform: "pc"};

const WF = new Warframe(options);

(async function(){
    let alerts = await WF.alerts;
    console.log(alerts);
})();
```

To see this in action head over to [tests/test.html](https://lucakiebel.github.io/Warframe.js/tests/test.html)
