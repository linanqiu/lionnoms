Meteor.methods({
  sendEmail: function (nom) {
    this.unblock();

    var emailGiver = nom.email;
    var emailTaker = nom.nommeremail;

    var subject = 'New Nom!';
    var body = 'Lion Noms found a nom buddy for you!\n\n';
    body += 'Nom Sharer: ' + nom.name + '\n';
    body += 'Nom Sharer Phone: ' + nom.phone + '\n';
    body += 'Nom Sharer Email: ' + nom.email + '\n';
    body += 'Nom Buddy: ' + nom.nommername + '\n';
    body += 'Nom Buddy Phone: ' + nom.nommerphone + '\n';
    body += 'Nom Buddy Email: ' + nom.nommeremail + '\n';
    body += '\n';
    body += 'Nom Location: ' + nom.locationdining + '\n';
    body += 'Meeting Location: ' + nom.locationmeeting + '\n';
    body += 'Nom Date/Time: ' + nom.time;

    emailHelper(emailGiver, 'lionnoms.mailer@gmail.com', subject, body);
    emailHelper(emailTaker, 'lionnoms.mailer@gmail.com', subject, body);
  }
});

function emailHelper(to, from, subject, text) {
  // Let other method calls from the same client start running,
  // without waiting for the email sending to complete.
  Email.send({
    to: to,
    from: from,
    subject: subject,
    text: text
  });
}
