const Warframe = require("../warframe.js");

it('should fail when platform is not set', () => {
	expect(() => new Warframe({})).toThrow();
});

it('should not fail when platform is set', () => {
	expect(() => new Warframe({platform: "pc"})).not.toThrow();
});

test("request to endpoint works", () => {
	new Warframe({platform: "pc"}).heartbeat
		.then(data => expext(data).toBe("Success"));
});

