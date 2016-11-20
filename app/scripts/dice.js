/* global define */
define(function () {
  function roll(skillLevel) {
    var roll = 1 + Math.floor(Math.random() * skillLevel);
    console.log(roll);
    return roll;
  }
  function aceableRoll(skillLevel) {
    var results = [];
    var result = skillLevel;
    while (result === skillLevel) {
      var result = roll(skillLevel);
      results.push(result);
    }
    return results;
  }
  ;
  return {
    roll: roll,
    aceableRoll: aceableRoll
  };
});
