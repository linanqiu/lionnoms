this.NomController = RouteController.extend({
	template: "Nom",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("nom", this.params.nomId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		return {
			params: this.params || {},
			nom: Noms.findOne({_id:this.params.nomId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});
