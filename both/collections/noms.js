this.Noms = new Mongo.Collection("noms");

this.Noms.userCanInsert = function(userId, doc) {
	return true;
}

this.Noms.userCanUpdate = function(userId, doc) {
	return true;
}

this.Noms.userCanRemove = function(userId, doc) {
	return true;
}
