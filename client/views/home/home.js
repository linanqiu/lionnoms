var pageSession = new ReactiveDict();

Template.Home.rendered = function () {

};

Template.Home.events({

});

Template.Home.helpers({

});

var HomeNomsViewItems = function (cursor) {
	if (!cursor) {
		return [];
	}

	var searchString = pageSession.get("HomeNomsViewSearchString");
	var sortBy = pageSession.get("HomeNomsViewSortBy");
	var sortAscending = pageSession.get("HomeNomsViewSortAscending");
	if (typeof (sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if (!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "phone", "email", "locationdining", "locationmeeting", "time"];
		filtered = _.filter(raw, function (item) {
			var match = false;
			_.each(searchFields, function (field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if (match) {
					return false;
				}
			});
			
			return match;
		});
	}

	// sort
	if (sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if (!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var HomeNomsViewExport = function (cursor, fileType) {
	var data = HomeNomsViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.HomeNomsView.rendered = function () {
	pageSession.set("HomeNomsViewStyle", "table");
};

Template.HomeNomsView.events({
	"submit #dataview-controls": function (e, t) {
		return false;
	},

	"click #dataview-search-button": function (e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if (form) {
			var searchInput = form.find("#dataview-search-input");
			if (searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("HomeNomsViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function (e, t) {
		if (e.which === 13) {
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if (form) {
				var searchInput = form.find("#dataview-search-input");
				if (searchInput) {
					var searchString = searchInput.val();
					pageSession.set("HomeNomsViewSearchString", searchString);
				}

			}
			return false;
		}

		if (e.which === 27) {
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if (form) {
				var searchInput = form.find("#dataview-search-input");
				if (searchInput) {
					searchInput.val("");
					pageSession.set("HomeNomsViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function (e, t) {
		e.preventDefault();
		/**/
	},

	"click #dataview-export-default": function (e, t) {
		e.preventDefault();
		HomeNomsViewExport(this.noms, "csv");
	},

	"click #dataview-export-csv": function (e, t) {
		e.preventDefault();
		HomeNomsViewExport(this.noms, "csv");
	},

	"click #dataview-export-tsv": function (e, t) {
		e.preventDefault();
		HomeNomsViewExport(this.noms, "tsv");
	},

	"click #dataview-export-json": function (e, t) {
		e.preventDefault();
		HomeNomsViewExport(this.noms, "json");
	}


});

Template.HomeNomsView.helpers({
	"isEmpty": function () {
		return !this.noms || this.noms.count() == 0;
	},
	"isNotEmpty": function () {
		return this.noms && this.noms.count() > 0;
	},
	"isNotFound": function () {
		return this.noms && pageSession.get("HomeNomsViewSearchString") && HomeNomsViewItems(this.noms).length == 0;
	},
	"searchString": function () {
		return pageSession.get("HomeNomsViewSearchString");
	},
	"viewAsTable": function () {
		return pageSession.get("HomeNomsViewStyle") == "table";
	},
	"viewAsList": function () {
		return pageSession.get("HomeNomsViewStyle") == "list";
	},
	"viewAsGallery": function () {
		return pageSession.get("HomeNomsViewStyle") == "gallery";
	}
});


Template.HomeNomsViewTable.rendered = function () {

};

Template.HomeNomsViewTable.events({
	"click .th-sortable": function (e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("HomeNomsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("HomeNomsViewSortBy", newSortBy);
		if (oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("HomeNomsViewSortAscending") || false;
			pageSession.set("HomeNomsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("HomeNomsViewSortAscending", true);
		}
	}
});

Template.HomeNomsViewTable.helpers({
	"tableItems": function () {
		return HomeNomsViewItems(this.noms);
	}
});


Template.HomeNomsViewTableItems.rendered = function () {

};

Template.HomeNomsViewTableItems.events({
	"click td": function (e, t) {
		e.preventDefault();
		Router.go("nom", {
			nomId: this._id
		});
		return false;
	},

	"click .inline-checkbox": function (e, t) {
		e.preventDefault();

		if (!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if (!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Noms.update({
			_id: this._id
		}, {
			$set: values
		});

		return false;
	},

	"click #delete-button": function (e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function () {
						Noms.remove({
							_id: me._id
						});
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function (e, t) {
		e.preventDefault();
		/**/
		return false;
	}
});

Template.HomeNomsViewTableItems.helpers({
	"checked": function (value) {
		return value ? "checked" : ""
	}
});
