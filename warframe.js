'use strict';

const fetch = require('node-fetch');

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
  static BASE = 'https://api.warframestat.us';

  /**
   * Get data from specified endpoint
   * @param {string} endpoint endpoint to fetch
   * @param {function} [map] mapping function to alter or filter data
   * @param {boolean} [skipPlatform] option to skip platform. useful for non-worldstate lookups
   * @returns {Promise}
   */
  static get = (endpoint, { map, skipPlatform = false } = { skipPlatform: false }) => new Promise((resolve, reject) => fetch(`${Warframe.BASE}/${skipPlatform ? '' : `${this.platform}/`}${endpoint}`)
    .then((d) => d.json())
    .then((data) => (Array.isArray(data) && map ? data.map(map) : data))
    .then((data) => resolve(data))
    .catch((e) => reject(e)));

  /**
   * Construct a worldstate with specified default platform
   * @param {string<'pc'|'ps4'|'xb1'|'swi'>} [platform] optional platform param
   * @constructor
   */
  constructor({ platform = 'pc' } = { platform: 'pc' }) {
    this.system = platform || 'pc';
  }

  set platform(platform) {
    this.system = platform;
  }

  /**
   * Test whether the API can be reached
   * @returns {Promise<Object>}
   */
  get heartbeat() {
    return Warframe.get('heartbeat', { skipPlatform: true });
  }

  /**
   * The alerts and all data associated with them
   * @returns {Promise<Array>}
   */
  get alerts() {
    return Warframe.get('alerts');
  }

  /**
   * The current sorties and their conditions
   * @returns {Promise}
   */
  get sorties() {
    return Warframe.get('sortie');
  }

  /**
   * The current day/nighttime on cetus
   * @returns {Promise}
   */
  get cycleCetus() {
    return Warframe.get('cetusCycle');
  }

  /**
   * The current day/nighttime on earth
   * @returns {Promise}
   */
  get cycleEarth() {
    return Warframe.get('earthCycle');
  }

  /**
   * When the Void Trader arrives/leaves and what goodies they carry
   * @returns {Promise}
   */
  get voidTrader() {
    return Warframe.get('voidTrader');
  }

  /**
   * TODO: when an event is live, look at the data
   * @returns {Promise}
   */
  get events() {
    return Warframe.get('events');
  }

  /**
   * The current news in every language available
   * @returns {Promise}
   */
  get news() {
    return Warframe.get('news');
    // return new Promise((resolve, reject) => {
    //   request(`${this.endpoint}/news`)
    //    .then((d) => new Promise((r, s) => r(JSON.parse(d)))).then((news) => {
    //     news = (news.map((article) => {
    //       let newsArt = '';
    //       if (article.update) newsArt = 'Update';
    //       if (article.primeAccess) newsArt = 'Prime Access';
    //       if (article.stream) newsArt = 'Stream';
    //       return {
    //         id: article.id,
    //         link: article.link,
    //         date: new Date(article.date),
    //         since: article.eta,
    //         art: newsArt,
    //         image: article.imageLink,
    //         langStrings: article.translations,
    //       };
    //     }));
    //
    //     resolve(news);
    //   }).catch((e) => reject(e));
    // });
  }

  get syndicateMissions() {
    return Warframe.get('syndicateMissions');
    // return new Promise((resolve, reject) => {
    //   request(`${this.endpoint}/syndicateMissions`)
    //    .then((d) => new Promise((r, s) => r(JSON.parse(d)))).then((missions) => {
    //     missions = missions.map((mission) => {
    //       const r = {
    //         id: mission.id,
    //         since: new Date(mission.activation),
    //         until: new Date(mission.expiry),
    //         syndicate: mission.syndicate,
    //
    //       };
    //
    //       if (mission.nodes !== []) r.nodes = mission.nodes;
    //       if (mission.jobs !== []) {
    //         r.jobs = mission.jobs.map((job) => ({
    //           id: job.id,
    //           type: job.type,
    //           enemy: {
    //             minLevel: job.enemyLevels[0],
    //             maxLevel: job.enemyLevels[1],
    //           },
    //           standingStages: job.standingStages,
    //           rewardPool: job.rewardPool,
    //         }));
    //       }
    //       return r;
    //     });
    //     resolve(missions);
    //   }).catch((e) => reject(e));
    // });
  }

  get fissures() {
    return Warframe.get('fissures');
    // return new Promise((resolve, reject) => {
    //   request(`${this.endpoint}/fissures`)
    //    .then((d) => new Promise((r, s) => r(JSON.parse(d)))).then((fissures) => {
    //     fissures = fissures.map((fissure) => ({
    //       id: fissure.id,
    //       node: fissure.node,
    //       type: fissure.missionType,
    //       since: new Date(fissure.activation),
    //       until: new Date(fissure.expiry),
    //       countdown: fissure.eta,
    //       tierClass: fissure.tier,
    //       tierNum: fissure.tierNum,
    //       enemy: {
    //         faction: fissure.enemy,
    //       },
    //     }));
    //     resolve(fissures);
    //   }).catch((e) => reject(e));
    // });
  }

  get darkSectors() {
    return Warframe.get('darkSectors');
    // return new Promise((resolve, reject) => {
    //   request(`${this.endpoint}/darkSectors`)
    //    .then((d) => new Promise((r, s) => r(JSON.parse(d)))).then((sectors) => {
    //     resolve(sectors);
    //   }).catch((e) => reject(e));
    // });
  }

  get invasions() {
    return Warframe.get('invasions');
    // return new Promise((resolve, reject) => {
    //   request(`${this.endpoint}/invasions`)
    //    .then((d) => new Promise((r, s) => r(JSON.parse(d)))).then((invasions) => {
    //     invasions = invasions.map((inv) => {
    //       inv.countdown = inv.eta;
    //       inv.eta = undefined;
    //       delete inv.eta;
    //
    //       inv.attackerReward.color = undefined;
    //       delete inv.attackerReward.color;
    //
    //       inv.defenderReward.color = undefined;
    //       delete inv.defenderReward.color;
    //
    //       inv.from = new Date(inv.activation);
    //       inv.activation = undefined;
    //       delete inv.activation;
    //
    //       return inv;
    //     });
    //     invasions = invasions
    //      .filter((inv) => !inv.completed); // only display invasions that aren't completed yet
    //     resolve(invasions);
    //   });
    // });
  }

  get dailyDeals() {
    return Warframe.get('dailyDeals');
    // return new Promise((resolve, reject) => {
    //   request(`${this.endpoint}/dailyDeals`)
    //    .then((d) => new Promise((r, s) => r(JSON.parse(d)))).then((deals) => {
    //     resolve(deals.map((deal) => {
    //       deal.countdown = deal.eta;
    //       deal.eta = undefined;
    //       delete deal.eta;
    //
    //       deal.until = new Date(deal.expiry);
    //       deal.expiry = undefined;
    //       delete deal.expiry;
    //
    //       return deal;
    //     }));
    //   }).catch((e) => reject(e));
    // });
  }

  get simaris() {
    return Warframe.get('simaris');
    // return request(`${this.endpoint}/simaris`)
    //  .then((d) => new Promise((r, s) => r(JSON.parse(d))));
  }

  get conclaveChallenges() {
    return Warframe.get('conclaveChallenges');
    // return new Promise((resolve, reject) => {
    //   request(`${this.endpoint}/conclaveChallenges`)
    //    .then((d) => new Promise((r, s) => r(JSON.parse(d)))).then((challenges) => {
    //     resolve(challenges.map((challenge) => {
    //       challenge.countdown = challenge.eta;
    //       challenge.eta = undefined;
    //       delete challenge.eta;
    //
    //       challenge.until = new Date(challenge.expiry);
    //       challenge.expiry = undefined;
    //       delete challenge.expiry;
    //
    //       return challenge;
    //     }).filter((cha) => !cha.expired));
    //   });
    // });
  }
};
