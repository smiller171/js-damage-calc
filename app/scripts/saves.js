function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture : imageUrl
    });
}

function writeSaveData(saveName) {
    firebase.database().ref('saved/' + uid + '/' + saveName).set({
        "shootingSkill": shootingSkill,
        "shootingRange": shootingRange,
        "cover": cover,
        "specialized": specialized,
        "mods": mods
    });
}

function loadOptionsList() {
    firebase.database().ref('/saved/' + uid).once('value').then(function(snapshot) {
        if (snapshot.val() != null) {
            var options = $("#loadSelector");
            $.each(Object.keys(snapshot.val()), function() {
                options.append($("<option />").val(this).text(this));
            });
        }
    });
}

function loadSaveData(loadName) {
    firebase.database().ref('/saved/' + uid + '/' + loadName).once('value').then(function(snapshot) {
        var shootingSkill = snapshot.val().shootingSkill,
            shootingRange = snapshot.val().shootingRange,
            cover = snapshot.val().cover,
            specialized = snapshot.val().specialized,
            mods = snapshot.val().mods;
        $("#shootingSkill").val(shootingSkill);
        $("#shootingRange").val(shootingRange);
        $("#cover").val(cover);
        $("#mods").val(mods);
        $("input[name=specialized][value=" + specialized + "]").attr('checked','checked');
    });
}
