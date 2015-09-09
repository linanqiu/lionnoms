var pageSession = new ReactiveDict();

Template.Addnom.rendered = function () {

};

Template.Addnom.events({

});

Template.Addnom.helpers({

});

Template.AddnomSubmitNomForm.rendered = function () {

	this.$('.datetimepicker').datetimepicker();

	pageSession.set("addnomSubmitNomFormInfoMessage", "");
	pageSession.set("addnomSubmitNomFormErrorMessage", "");

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.AddnomSubmitNomForm.events({
	"submit": function (e, t) {
		e.preventDefault();
		pageSession.set("addnomSubmitNomFormInfoMessage", "");
		pageSession.set("addnomSubmitNomFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var addnomSubmitNomFormMode = "insert";
			if (!t.find("#form-cancel-button")) {
				switch (addnomSubmitNomFormMode) {
				case "insert":
					{
						$(e.target)[0].reset();
					};
					break;

				case "update":
					{
						var message = msg || "Saved.";
						pageSession.set("addnomSubmitNomFormInfoMessage", message);
					};
					break;
				}
			}

			Router.go("home", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("addnomSubmitNomFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function (fieldName, fieldValue) {

			},
			function (msg) {

			},
			function (values) {
				values.time = new Date(values.time);
				newId = Noms.insert(values, function (e) {
					if (e) errorAction(e);
					else submitAction();
				});
			}
		);

		return false;
	},
	"click #form-cancel-button": function (e, t) {
		e.preventDefault();



		Router.go("home", {});
	},
	"click #form-close-button": function (e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function (e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}


});

Template.AddnomSubmitNomForm.helpers({
	"infoMessage": function () {
		return pageSession.get("addnomSubmitNomFormInfoMessage");
	},
	"errorMessage": function () {
		return pageSession.get("addnomSubmitNomFormErrorMessage");
	}

});
