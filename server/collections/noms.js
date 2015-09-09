Noms.allow({
	insert: function (userId, doc) {
		return Noms.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Noms.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Noms.userCanRemove(userId, doc);
	}
});

Noms.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Noms.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Noms.before.remove(function(userId, doc) {
	
});

Noms.after.insert(function(userId, doc) {
	
});

Noms.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Noms.after.remove(function(userId, doc) {
	
});
