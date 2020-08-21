const utils = require("./../../../src/utils");

describe("utils test", () => {
    describe("convert key to camel case", () => {
        it("returns object whose keys are converted to camel case", () => {
            const inputObj = {
                key_one: "valueOne",
            };

            const expectedObj = {
                keyOne: inputObj.key_one,
            };

            const result = utils.convertKeysToCamelCase(inputObj);

            expect(result).toEqual(expectedObj);
        });
    });
});
