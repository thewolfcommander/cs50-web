document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // Send email when submit form
  document.querySelector('#compose-form').onsubmit = submit_compose_form;

  // By default, load the inbox
  load_mailbox('inbox');

});


function submit_compose_form() {

  // Get values from submitted form
  const recipients = document.querySelector('#compose-recipients').value;
  const subject = document.querySelector('#compose-subject').value;
  const body = document.querySelector('#compose-body').value;

  // Send email with form values
  send_email(recipients, subject, body);
  return false;
}


function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}


function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // Make GET request for emails in mailbox
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
      console.log(emails);
      emails.forEach(email => render_email(email));
  });
}


function render_email(email) {

  // Create container div to hold mail item
  const item = document.createElement('div');
  item.setAttribute('id', email.id);
  item.setAttribute('class', 'container mail-item');

  const row = document.createElement('div');
  row.setAttribute('id', `${email.id}-row`);
  row.setAttribute('class', 'row');

  // White background if email is undread; otherwise grey
  row.style.backgroundColor = email.read ? '#E8E8E8' : 'white';

  // Create columns for sender, subject and timestamps
  const sender = document.createElement('div');
  sender.setAttribute('class', 'col sender');
  sender.innerHTML = email.sender;

  const subject = document.createElement('div');
  subject.setAttribute('class', 'col-6 subject');
  subject.innerHTML = email.subject;

  const timestamp = document.createElement('div');
  timestamp.setAttribute('class', 'col timestamp');
  timestamp.innerHTML = email.timestamp;

  // Append mail item to page
  document.querySelector('#emails-view').append(item);
  document.getElementById(email.id).appendChild(row);
  document.getElementById(`${email.id}-row`).appendChild(sender);
  document.getElementById(`${email.id}-row`).appendChild(subject);
  document.getElementById(`${email.id}-row`).appendChild(timestamp);
}


function send_email(recipients, subject, body) {
  
  // Send email by making POST request
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
        recipients: recipients,
        subject: subject,
        body: body
    })
  })
  .then(response => response.json())
  .then(result => {
      console.log(result);
      load_mailbox('sent');
  });
}