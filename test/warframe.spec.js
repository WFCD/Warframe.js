'use strict';

const chai = require('chai');
const Warframe = require('../warframe');

const should = chai.should();

const keys = Object.getOwnPropertyNames(Warframe.prototype)
  .map((key) => [key, Object.getOwnPropertyDescriptor(Warframe.prototype, key)])
  .filter(([, descriptor]) => typeof descriptor.get === 'function')
  .map(([key]) => key)
  .filter((key) => !['get', 'heartbeat'].includes(key));

describe('Warframe API Client', () => {
  it('should default platform', () => {
    (() => new Warframe({})).should.not.throw();
  });

  it('should not fail when platform is set', () => {
    (() => new Warframe({ platform: 'pc' })).should.not.throw();
  });

  keys.forEach((key) => {
    it(`should successfully make a request to ${key} endpoint`, async () => {
      const thing = await new Warframe({ platform: 'pc' })[key];
      should.exist(thing);
    });
  });
  it('request to heartbeat endpoint works', async () => {
    const heartbeat = await new Warframe({ platform: 'pc' }).heartbeat;
    should.exist(heartbeat);
    heartbeat.should.be.an('object')
      .and.to.include({ msg: 'Success', code: 200 });
  });
  describe('platform', () => {
    it('should be settable', () => {
      (() => {
        const wf = new Warframe();
        wf.platform = 'ps4';
      }).should.not.throw();
    });
  });
});
