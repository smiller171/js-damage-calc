/* global
  firebase
  userData
*/
/* exported
  writeUserData
  writeSaveData
  loadOptionsList
  loadSaveData
  searchOptions
*/
function writeUserData() {
  firebase.database().ref("users/" + userData.uid).update({
    username: userData.displayName,
    email: userData.email,
    profile_picture: userData.photoURL
  });
}

function writeSaveData(saveName, statVars) {
  firebase.database().ref("saved/" + userData.uid + "/" + saveName).set({
    "shootingSkill": statVars.shootingSkill,
    "shootingRange": statVars.shootingRange,
    "cover": statVars.cover,
    "specialized": statVars.specialized,
    "mods": statVars.mods
  });
}

function loadOptionsList() {
  firebase.database().ref("/saved/" + userData.uid).on("value", function(snapshot) {
    if (snapshot.val() != null) {
      var options = [];
      $.each(Object.keys(snapshot.val()), function() {
        options.push("<option value='",
          this, "'>",
          this, "</option>");

        // options.append($("<option />").val(this).text(this));
      });
      $("#loadSelector").html(options.join(""));
      $("#loadSelector").prepend($("<option />").val("-----").text("-----"));
      $("#loadSelector").val("-----");
    }
  });
}

function searchOptions(query) {
  var ref = firebase.database().ref("/saved/" + userData.uid);
  ref.startAt(query).endAt(query + "\uf8ff").orderByKey().limitToFirst(5).once("value", function(snapshot) {
    if (snapshot.val() != null) {
      var options = [];
      $.each(Object.keys(snapshot.val()), function() {
        options.push("<option value='",
          this, "'>",
          this, "</option>");
      });
      $("#searchSuggestions").html(options.join(""));
    }
  });
  // console.log(results);
  // ref.child("tags").startAt(query).endAt(query + "\uf8ff").limit(5);
}

function loadSaveData(loadName) {
  firebase.database().ref("/saved/" + userData.uid + "/" + loadName).once("value").then(function(snapshot) {
    var statVars = {
      shootingSkill: snapshot.val().shootingSkill,
      shootingRange: snapshot.val().shootingRange,
      cover: snapshot.val().cover,
      specialized: snapshot.val().specialized,
      mods: snapshot.val().mods
    };

    $("#shootingSkill").val(statVars.shootingSkill);
    $("#shootingRange").val(statVars.shootingRange);
    $("#cover").val(statVars.cover);
    $("#mods").val(statVars.mods);
    $("input[name=specialized][value=" + statVars.specialized + "]").attr("checked","checked");
  });
}
