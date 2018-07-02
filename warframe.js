/**
 * Warframe.js by Luca Kiebel
 *
 * Docs and more: https://github.com/lucakiebel/Warframe.js
 */

const request = require("request-promise");

/**
 * Warframe Class
 * @type {{new(Object): {voidTrader: Promise, events: Promise, syndicateMissions, cycleEarth: Promise, sorties: Promise, darkSectors, fissures, cyleCetus: Promise, invasions, dailyDeals, heartbeat: Promise, news: Promise, alerts: Promise, conclaveChallenges, simaris}}}
 */
module.exports = class {

    /**
     *
     * @param options {Object} {platform = pc|ps4|xb1}
     */
    constructor(options) {
        if (options.platform) this.platform = options.platform;
        else throw ("Platform must be set in options");
        this.endpoint = `https://api.warframestat.us/${this.platform}`;
    }

	/**
	 * Test whether the API can be reached
     * @returns {Promise}
     */
    get heartbeat() {
        return new Promise((resolve, reject) => {
            request("https://api.warframestat.us/heartbeat").then(data => resolve(data)).catch(err => reject(err));
        })
    }

    /**
     * The alerts and all data associated with them
     * @returns {Promise}
     */
    get alerts() {
        return new Promise((resolve, reject) => {
            request(`${this.endpoint}/alerts`).then(d => new Promise((r, s) => r(JSON.parse(d)))).then(json => {
                let alerts = json;
                alerts = alerts.map(alert => {
                    return {
                        id:alert.id,
                        since: new Date(alert.activation),
                        until: new Date(alert.expiry),
                        countdown: alert.eta,
                        thumbnail: alert.mission.reward.thumbnail,
                        mission: {
                            node: alert.mission.node,
                            type: alert.mission.type,
                            archwing: alert.mission.archwingRequired,
                            nightmare: alert.mission.nightmare
                        },
                        enemy: {
                            faction: alert.mission.faction,
                            minLevel: alert.mission.minEnemyLevel,
                            maxLevel: alert.mission.maxEnemyLevel
                        },
                        reward: {
                            types: alert.rewardTypes,
                            items: alert.mission.reward.items,
                            countedItems: alert.mission.reward.countedItems,
                            credits: alert.mission.reward.credits,
                            "string": alert.mission.reward.itemString || alert.mission.reward.asString
                        }
                    }
                });
                resolve(alerts);
            }).catch(e => reject(e));
        })
    }

    /**
     * The current sorties and their conditions
     * @returns {Promise}
     */
    get sorties() {
        return new Promise((resolve, reject) => {
            request(`${this.endpoint}/sortie`).then(d => new Promise((r, s) => r(JSON.parse(d)))).then(sorties => {
                resolve({
                    id:sorties.id,
                    since: new Date(sorties.activation),
                    until: new Date(sorties.expiry),
                    countdown: sorties.eta,
                    missions: sorties.variants.map(mission => {
                        return {
                            node: mission.node,
                            type: mission.missionType,
                            condition: mission.modifier,
                            conditionDescription: mission.modifierDescription
                        }
                    }),
                    enemy: {
                        faction: sorties.faction,
                        boss: sorties.boss
                    }
                });
            }).catch(e => reject(e));
        })
    }

    /**
     * The current day/nighttime on cetus
     * @returns {Promise}
     */
    get cycleCetus() {
        return new Promise((resolve, reject) => {
            request(`${this.endpoint}/cetusCycle`).then(d => new Promise((r, s) => r(JSON.parse(d)))).then(circle => {
                resolve({
                    state: circle.isDay ? "day" : "night",
                    until: new Date(circle.expiry),
                    timeLeft: circle.timeLeft,
                    "string": circle.shortString
                })
            }).catch(e => reject(e));
        });
    }

    /**
     * The current day/nighttime on earth
     * @returns {Promise}
     */
    get cycleEarth() {
        return new Promise((resolve, reject) => {
            request(`${this.endpoint}/earthCycle`).then(d => new Promise((r, s) => r(JSON.parse(d)))).then(circle => {
                let dn = circle.isDay ? "Day" : "Night";
                resolve({
                    state: dn.toLowerCase(),
                    until: new Date(circle.expiry),
                    timeLeft: circle.timeLeft,
                    "string": `${circle.timeLeft.replace(/ \d{1,2}s/gmi, "")} to ${dn}`
                })
            }).catch(e => reject(e));
        });
    }


    /**
     * When the Void Trader arrives/leaves and what goodies they carry
     * @returns {Promise}
     */
    get voidTrader() {
        return new Promise((resolve, reject) => {
            request(`${this.endpoint}/voidTrader`).then(d => new Promise((r, s) => r(JSON.parse(d)))).then(trader => {
                let name = trader.character;
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
                })
            });
        });
    }

    /**
     * TODO: when an event is live, look at the data
     * @returns {Promise}
     */
    get events() {
        return new Promise((resolve, reject) => {
            request(`${this.endpoint}/events`).then(d => new Promise((r, s) => r(JSON.parse(d)))).then(events => {
                reject(new Error("Preprecated"));
            });
        });
    }

    /**
     * The current news in every language available
     * @returns {Promise}
     */
    get news() {
        return new Promise((resolve, reject) => {
            request(`${this.endpoint}/news`).then(d => new Promise((r, s) => r(JSON.parse(d)))).then(news => {
                news = (news.map(article => {
                    let newsArt = "";
                    if (article.update) newsArt = "Update";
                    if (article.primeAccess) newsArt = "Prime Access";
                    if (article.stream) newsArt = "Stream";
                    return {
                        id: article.id,
                        link: article.link,
                        date: new Date(article.date),
                        since: article.eta,
                        art: newsArt,
                        image: article.imageLink,
                        langStrings: article.translations
                    };
                }));

                resolve(news);
            }).catch(e => reject(e));
        });
    }

    get syndicateMissions() {
        return new Promise((resolve, reject) => {
            request(`${this.endpoint}/syndicateMissions`).then(d => new Promise((r, s) => r(JSON.parse(d)))).then(missions => {
                missions = missions.map(mission => {
                    let r = {
                        id: mission.id,
                        since: new Date(mission.activation),
                        until: new Date(mission.expiry),
                        syndicate: mission.syndicate,

                    };

                    if(mission.nodes !== []) r.nodes = mission.nodes;
                    if(mission.jobs !== []) {
                        r.jobs = mission.jobs.map(job => {
                            return {
                                id: job.id,
                                type: job.type,
                                enemy: {
                                    minLevel: job.enemyLevels[0],
                                    maxLevel: job.enemyLevels[1]
                                },
                                standingStages: job.standingStages,
                                rewardPool: job.rewardPool
                            }
                        });
                    }
                    return r;
                });
                resolve(missions)
            }).catch(e => reject(e));
        });
    }

    get fissures() {
        return new Promise((resolve, reject) => {
            request(`${this.endpoint}/fissures`).then(d => new Promise((r, s) => r(JSON.parse(d)))).then(fissures => {
                fissures = fissures.map(fissure => {
                    return {
                        id: fissure.id,
                        node: fissure.node,
                        type: fissure.missionType,
                        since: new Date(fissure.activation),
                        until: new Date(fissure.expiry),
                        countdown: fissure.eta,
                        tierClass: fissure.tier,
                        tierNum: fissure.tierNum,
                        enemy: {
                            faction: fissure.enemy
                        }
                    }
                });
                resolve(fissures)
            }).catch(e => reject(e));
        });
    }

    get darkSectors() {
        return new Promise((resolve, reject) => {
            request(`${this.endpoint}/darkSectors`).then(d => new Promise((r, s) => r(JSON.parse(d)))).then(sectors => {
                resolve(sectors);
            }).catch(e => reject(e));
        });
    }

    get invasions() {
        return new Promise((resolve, reject) => {
            request(`${this.endpoint}/invasions`).then(d => new Promise((r, s) => r(JSON.parse(d)))).then(invasions => {
                invasions = invasions.map(inv => {
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
                invasions = invasions.filter(inv => !inv.completed); // only display invasions that aren't completed yet
                resolve(invasions)
            });
        });
    }

    get dailyDeals() {
        return new Promise((resolve, reject) => {
            request(`${this.endpoint}/dailyDeals`).then(d => new Promise((r, s) => r(JSON.parse(d)))).then(deals => {
                resolve(deals.map(deal => {
                    deal.countdown = deal.eta;
                    deal.eta = undefined;
                    delete deal.eta;

                    deal.until = new Date(deal.expiry);
                    deal.expiry = undefined;
                    delete deal.expiry;

                    return deal;
                }))
            }).catch(e => reject(e));
        });
    }

    get simaris() {
        return request(`${this.endpoint}/simaris`).then(d => new Promise((r, s) => r(JSON.parse(d))));
    }

    get conclaveChallenges() {
        return new Promise((resolve, reject) => {
            request(`${this.endpoint}/conclaveChallenges`).then(d => new Promise((r, s) => r(JSON.parse(d)))).then(challenges => {
                resolve(challenges.map(challenge => {
                    challenge.countdown = challenge.eta;
                    challenge.eta = undefined;
                    delete challenge.eta;

                    challenge.until = new Date(challenge.expiry);
                    challenge.expiry = undefined;
                    delete challenge.expiry;

                    return challenge;
                }).filter(cha => !cha.expired))
            });
        });
    }



};
