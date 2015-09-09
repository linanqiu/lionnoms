Meteor.publish("noms", function() {
	return Noms.find({}, {});
});

Meteor.publish("nom", function(nomId) {
	return Noms.find({_id:nomId}, {});
});

Meteor.publish("noms_find_one", function() {
	return Noms.find({}, {});
});

