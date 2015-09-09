var pageSession = new ReactiveDict();

Template.Nom.rendered = function () {

};

Template.Nom.events({

});

Template.Nom.helpers({

});

Template.NomClaimNomForm.rendered = function () {
	pageSession.set("nomClaimNomFormInfoMessage", "");
	pageSession.set("nomClaimNomFormErrorMessage", "");

	$(".input-group.date").each(function () {
		var format = $(this).find("input[type='text']").attr("data-format");

		if (format) {
			format = format.toLowerCase();
		} else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.NomClaimNomForm.events({
	"submit": function (e, t) {
		e.preventDefault();
		pageSession.set("nomClaimNomFormInfoMessage", "");
		pageSession.set("nomClaimNomFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var nomClaimNomFormMode = "update";
			if (!t.find("#form-cancel-button")) {
				switch (nomClaimNomFormMode) {
				case "insert":
					{
						$(e.target)[0].reset();
					};
					break;

				case "update":
					{
						var message = msg || "Saved.";
						pageSession.set("nomClaimNomFormInfoMessage", message);
					};
					break;
				}
			}

			var nomFound = Noms.findOne({
				_id: t.data.nom._id
			});

			Meteor.call('sendEmail', nomFound);

			Router.go("home", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("nomClaimNomFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function (fieldName, fieldValue) {

			},
			function (msg) {

			},
			function (values) {

				Noms.update({
					_id: t.data.nom._id
				}, {
					$set: values
				}, function (e) {
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

Template.NomClaimNomForm.helpers({
	"infoMessage": function () {
		return pageSession.get("nomClaimNomFormInfoMessage");
	},
	"errorMessage": function () {
		return pageSession.get("nomClaimNomFormErrorMessage");
	}
});
