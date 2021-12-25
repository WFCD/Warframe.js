'use strict';

const fetch = require('node-fetch');

const BASE = 'https://api.warframestat.us';

/**
 * Warframe Class
 *
 * Warframe.js by Luca Kiebel
 * Contributors:
 *   - Tobiah <tobiah@pm.me>
 *
 * Docs and more: https://github.com/WFCD/Warframe.js
 */
module.exports = class Warframe {
  /**
   * Construct a worldstate with specified default platform
   * @param {string<'pc'|'ps4'|'xb1'|'swi'>} [platform] optional platform param
   * @constructor
   */
  constructor({ platform = 'pc' } = { platform: 'pc' }) {
    this.system = platform || 'pc';
  }

  /**
   * Get data from specified endpoint
   * @param {string} endpoint endpoint to fetch
   * @param {function} [map] mapping function to alter or filter data
   * @param {boolean} [skipPlatform] option to skip platform. useful for non-worldstate lookups
   * @returns {Promise}
   */
  get(endpoint, { map, skipPlatform = false } = { skipPlatform: false }) {
    return new Promise((resolve, reject) => fetch(`${BASE}/${skipPlatform ? '' : `${this.system}/`}${endpoint}`)
      .then((d) => d.json())
      .then((data) => (Array.isArray(data) && map ? data.map(map) : data))
      .then((data) => resolve(data))
      .catch((e) => reject(e)));
  }

  set platform(platform) {
    this.system = platform;
  }

  /**
   * Test whether the API can be reached
   * @returns {Promise<Object>}
   */
  get heartbeat() {
    return this.get('heartbeat', { skipPlatform: true });
  }

  /**
   * The alerts and all data associated with them
   * @returns {Promise<Array>}
   */
  get alerts() {
    return this.get('alerts');
  }

  /**
   * The current sorties and their conditions
   * @returns {Promise}
   */
  get sorties() {
    return this.get('sortie');
  }

  /**
   * The current day/nighttime on cetus
   * @returns {Promise}
   */
  get cycleCetus() {
    return this.get('cetusCycle');
  }

  /**
   * The current day/nighttime on earth
   * @returns {Promise}
   */
  get cycleEarth() {
    return this.get('earthCycle');
  }

  /**
   * When the Void Trader arrives/leaves and what goodies they carry
   * @returns {Promise}
   */
  get voidTrader() {
    return this.get('voidTrader');
  }

  /**
   * TODO: when an event is live, look at the data
   * @returns {Promise}
   */
  get events() {
    return this.get('events');
  }

  /**
   * The current news in every language available
   * @returns {Promise}
   */
  get news() {
    return this.get('news');
  }

  get syndicateMissions() {
    return this.get('syndicateMissions');
  }

  get fissures() {
    return this.get('fissures');
  }

  get darkSectors() {
    return this.get('darkSectors');
  }

  get invasions() {
    return this.get('invasions');
  }

  get dailyDeals() {
    return this.get('dailyDeals');
  }

  get simaris() {
    return this.get('simaris');
  }

  get conclaveChallenges() {
    return this.get('conclaveChallenges');
  }
};
