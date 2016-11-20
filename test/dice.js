/* global require */
const requirejs = require('requirejs');
const assert = requirejs('assert');
// var expect = requirejs('chai').expect;
const sinon = requirejs('sinon');
const dice = requirejs('app/scripts/dice.js');

describe('Dice', function () {
  describe('Roll', function () {
    it('rolls a die randomly', sinon.test(function () {
      var rand = this.stub(Math, 'random');
      rand.onCall(0).returns(0.5);
      var roll = dice.roll(4);
      assert.equal(roll, 3, 'roll should equal 3 when skill is 4 and rand is 0.5');
      rand.onCall(1).returns(0.9);
      var roll = dice.roll(4);
      assert.equal(roll, 4, 'roll should equal 4 when skill is 4 and rand is 0.9');

      rand.onCall(2).returns(0.5);
      var roll = dice.roll(8);
      assert.equal(roll, 5, 'roll should equal 5 when skill is 8 and rand is 0.5');
      rand.onCall(3).returns(0.9);
      var roll = dice.roll(8);
      assert.equal(roll, 8, 'roll should equal 8 when skill is 8 and rand is 0.9');
    }));
  });
  describe('aceableRoll', function () {
    it('calculates the total if a roll can be aced',
      sinon.test(function () {
        var rand = this.stub(Math, 'random');
        rand.onCall(0).returns(0.5);
        rand.onCall(1).returns(0.9);
        rand.onCall(2).returns(0.5);
        rand.onCall(3).returns(0.9);
        rand.onCall(4).returns(0.9);
        rand.onCall(5).returns(0.5);
        var result = dice.aceableRoll(4);
        assert.deepEqual(result, [3], 'should return a roll of 3');
        var result = dice.aceableRoll(4);
        assert.deepEqual(result, [4,3], 'should return rolls 4,3');
        var result = dice.aceableRoll(4);
        assert.deepEqual(result, [4,4,3], 'should return rolls 4,4,3');
      })
    );
  });
});
// describe('Aceable Roll', function () {
//   it('should return 3 when skill is 4 with rand of 0.5', function () {
//     assert.ok(true);
//   });
//   it('should return 7 when skill is 4 with rand of 0.9,0.5');
//   it('should return 5 when skill is 8 with rand of 0.5');
//   it('should return 13 when skill is 8 with rand of 0.9,0.5');
// });
