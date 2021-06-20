
var assert = require("assert"); // node.js core module

describe('Array sanity check', function() {
    it ('returns -1 when value is not present', function() {
        assert.equal(-1, [1, 2, 3].indexOf(4)); // 4 is not present in this array so indexOf returns -1
    })
});
