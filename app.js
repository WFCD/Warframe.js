/**
 * Warframe.js by Luca Kiebel
 *
 * Docs and more: https://github.com/lucakiebel/Warframe.js
 */

/**
 * @type {{new(Object): {voidTrader: Promise, events: Promise, syndicateMissions, sorties: Promise, darkSectors, cycleEarth: Promise, fissures, invasions, dailyDeals, heartbeat: Promise, news: Promise, alerts: Promise, cycleCetus: Promise, conclaveChallenges, simaris}}}
 */
const Warframe = class {
  /**
     *
     * @param options {Object} {platform = pc|ps4|xb1}
     */
  constructor(options) {
    if (options.platform) this.platform = options.platform;
    else throw new Error('Platform must be set in options');
    this.endpoint = `https://api.warframestat.us/${this.platform}`;
  }

  /**
     * Test whether the API can be reached
     * @returns {Promise}
     */
  get heartbeat() {
    return new Promise((resolve, reject) => {
      fetch('https://api.warframestat.us/pc').then((r) => r.json())
        .then((data) => resolve('Success'))
        .catch((err) => reject(err));
    });
  }

  /**
     * The alerts and all data associated with them
     * @returns {Promise}
     */
  get alerts() {
    return new Promise((resolve, reject) => {
      fetch(`${this.endpoint}/alerts`).then((r) => r.json()).then((json) => {
        let alerts = json;
        alerts = alerts.map((alert) => ({
          id: alert.id,
          since: new Date(alert.activation),
          until: new Date(alert.expiry),
          countdown: alert.eta,
          thumbnail: alert.mission.reward.thumbnail,
          mission: {
            node: alert.mission.node,
            type: alert.mission.type,
            archwing: alert.mission.archwingRequired,
            nightmare: alert.mission.nightmare,
          },
          enemy: {
            faction: alert.mission.faction,
            minLevel: alert.mission.minEnemyLevel,
            maxLevel: alert.mission.maxEnemyLevel,
          },
          reward: {
            types: alert.rewardTypes,
            items: alert.mission.reward.items,
            countedItems: alert.mission.reward.countedItems,
            credits: alert.mission.reward.credits,
            string: alert.mission.reward.itemString || alert.mission.reward.asString,
          },
        }));
        resolve(alerts);
      }).catch((e) => reject(e));
    });
  }

  /**
     * The current sorties and their conditions
     * @returns {Promise}
     */
  get sorties() {
    return new Promise((resolve, reject) => {
      fetch(`${this.endpoint}/sortie`).then((r) => r.json()).then((sorties) => {
        resolve({
          id: sorties.id,
          since: new Date(sorties.activation),
          until: new Date(sorties.expiry),
          countdown: sorties.eta,
          missions: sorties.variants.map((mission) => ({
            node: mission.node,
            type: mission.missionType,
            condition: mission.modifier,
            conditionDescription: mission.modifierDescription,
          })),
          enemy: {
            faction: sorties.faction,
            boss: sorties.boss,
          },
        });
      }).catch((e) => reject(e));
    });
  }

  /**
     * The current day/nighttime on cetus
     * @returns {Promise}
     */
  get cycleCetus() {
    return new Promise((resolve, reject) => {
      fetch(`${this.endpoint}/cetusCycle`).then((r) => r.json()).then((circle) => {
        resolve({
          state: circle.isDay ? 'day' : 'night',
          until: new Date(circle.expiry),
          timeLeft: circle.timeLeft,
          string: circle.shortString,
        });
      }).catch((e) => reject(e));
    });
  }

  /**
     * The current day/nighttime on earth
     * @returns {Promise}
     */
  get cycleEarth() {
    return new Promise((resolve, reject) => {
      fetch(`${this.endpoint}/earthCycle`).then((r) => r.json()).then((circle) => {
        const dn = circle.isDay ? 'Day' : 'Night';
        resolve({
          state: dn.toLowerCase(),
          until: new Date(circle.expiry),
          timeLeft: circle.timeLeft,
          string: `${circle.timeLeft.replace(/ \d{1,2}s/gmi, '')} to ${dn}`,
        });
      }).catch((e) => reject(e));
    });
  }

  /**
     * When the Void Trader arrives/leaves and what goodies they carry
     * @returns {Promise}
     */
  get voidTrader() {
    return new Promise((resolve, reject) => {
      fetch(`${this.endpoint}/voidTrader`).then((r) => r.json()).then((trader) => {
        const name = trader.character;
        resolve({
          id: trader.id,
          from: new Date(trader.activation),
          until: new Date(trader.expiry),
          name,
          relay: trader.location,
          goodies: trader.inventory,
          active: trader.active,
          fromString: `${name} arrives in ${trader.startString}`,
          untilString: `${name} leaves in ${trader.endString}`,
        });
      });
    });
  }

  /**
     * TODO: when an event is live, look at the data
     * @returns {Promise}
     */
  get events() {
    return new Promise((resolve, reject) => {
      fetch(`${this.endpoint}/events`).then((r) => r.json()).then((events) => {
        reject(new Error('Preprecated'));
      });
    });
  }

  /**
     * The current news in every language available
     * @returns {Promise}
     */
  get news() {
    return new Promise((resolve, reject) => {
      fetch(`${this.endpoint}/news`).then((r) => r.json()).then((news) => {
        news = (news.map((article) => {
          let newsArt = '';
          if (article.update) newsArt = 'Update';
          if (article.primeAccess) newsArt = 'Prime Access';
          if (article.stream) newsArt = 'Stream';
          return {
            id: article.id,
            link: article.link,
            date: new Date(article.date),
            since: article.eta,
            art: newsArt,
            image: article.imageLink,
            langStrings: article.translations,
          };
        }));

        resolve(news);
      }).catch((e) => reject(e));
    });
  }

  get syndicateMissions() {
    return new Promise((resolve, reject) => {
      fetch(`${this.endpoint}/syndicateMissions`).then((r) => r.json()).then((missions) => {
        missions = missions.map((mission) => {
          const r = {
            id: mission.id,
            since: new Date(mission.activation),
            until: new Date(mission.expiry),
            syndicate: mission.syndicate,

          };

          if (mission.nodes !== []) r.nodes = mission.nodes;
          if (mission.jobs !== []) {
            r.jobs = mission.jobs.map((job) => ({
              id: job.id,
              type: job.type,
              enemy: {
                minLevel: job.enemyLevels[0],
                maxLevel: job.enemyLevels[1],
              },
              standingStages: job.standingStages,
              rewardPool: job.rewardPool,
            }));
          }
          return r;
        });
        resolve(missions);
      }).catch((e) => reject(e));
    });
  }

  get fissures() {
    return new Promise((resolve, reject) => {
      fetch(`${this.endpoint}/fissures`).then((r) => r.json()).then((fissures) => {
        fissures = fissures.map((fissure) => ({
          id: fissure.id,
          node: fissure.node,
          type: fissure.missionType,
          since: new Date(fissure.activation),
          until: new Date(fissure.expiry),
          countdown: fissure.eta,
          tierClass: fissure.tier,
          tierNum: fissure.tierNum,
          enemy: {
            faction: fissure.enemy,
          },
        }));
        resolve(fissures);
      }).catch((e) => reject(e));
    });
  }

  get darkSectors() {
    return new Promise((resolve, reject) => {
      fetch(`${this.endpoint}/darkSectors`).then((r) => r.json()).then((sectors) => {
        resolve(sectors);
      }).catch((e) => reject(e));
    });
  }

  get invasions() {
    return new Promise((resolve, reject) => {
      fetch(`${this.endpoint}/invasions`).then((r) => r.json()).then((invasions) => {
        invasions = invasions.map((inv) => {
          inv.countdown = inv.eta;
          inv.eta = undefined;
          delete inv.eta;

          inv.attackerReward.color = undefined;
          delete inv.attackerReward.color;

          inv.defenderReward.color = undefined;
          delete inv.defenderReward.color;

          inv.from = new Date(inv.activation);
          inv.activation = undefined;
          delete inv.activation;

          return inv;
        });
        invasions = invasions.filter((inv) => !inv.completed); // only display invasions that aren't completed yet
        resolve(invasions);
      });
    });
  }

  get dailyDeals() {
    return new Promise((resolve, reject) => {
      fetch(`${this.endpoint}/dailyDeals`).then((r) => r.json()).then((deals) => {
        resolve(deals.map((deal) => {
          deal.countdown = deal.eta;
          deal.eta = undefined;
          delete deal.eta;

          deal.until = new Date(deal.expiry);
          deal.expiry = undefined;
          delete deal.expiry;

          return deal;
        }));
      }).catch((e) => reject(e));
    });
  }

  get simaris() {
    return fetch(`${this.endpoint}/simaris`).then((r) => r.json());
  }

  get conclaveChallenges() {
    return new Promise((resolve, reject) => {
      fetch(`${this.endpoint}/conclaveChallenges`).then((r) => r.json()).then((challenges) => {
        resolve(challenges.map((challenge) => {
          challenge.countdown = challenge.eta;
          challenge.eta = undefined;
          delete challenge.eta;

          challenge.until = new Date(challenge.expiry);
          challenge.expiry = undefined;
          delete challenge.expiry;

          return challenge;
        }).filter((cha) => !cha.expired));
      });
    });
  }
};
