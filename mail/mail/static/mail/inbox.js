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
  document.querySelector('#email-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}


function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#email-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#emails-view').style.display = 'block';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // Make GET request for emails in mailbox
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
      console.log(emails);
      emails.forEach(email => render_email_row(email));
  });
}


function render_email_row(email) {

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

  // Add on-click event listener to email item
  item.addEventListener('click', () => view_email(email.id));

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


function view_email(email_id) {

  // Make GET request for specific email
  fetch(`/emails/${email_id}`)
  .then(response => response.json())
  .then(email => {
      console.log(email);
      render_email(email);
      if (!email.read) {
        mark_as_read(email_id);
      }
  });
}


function render_email(email) {

  // Show the email and hide other views
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'block';

  // Display email fields
  document.getElementById('email-from').innerHTML = email.sender;
  document.getElementById('email-to').innerHTML = email.recipients;
  document.getElementById('email-subject').innerHTML = email.subject;
  document.getElementById('email-timestamp').innerHTML = email.timestamp;
  document.getElementById('email-body').innerHTML = email.body;

  // Remove existing event listener from reply button and add new listener
  document.getElementById('reply').removeEventListener('click', reply);
  document.getElementById('reply').addEventListener('click', () => reply(email));


  // Append archive button
  add_archive_button(email.id);
}


function reply(email) {
  
  // Go to compose email form
  compose_email();

  // Pre-fill form
  const subject = `${email.subject.substring(0, 4)==='Re: ' ? '' : 'Re: '}${email.subject}`;
  document.querySelector('#compose-recipients').value = email.sender;
  document.querySelector('#compose-subject').value = subject;
  document.querySelector('#compose-body').value = `On ${email.timestamp} ${email.sender} wrote: \n${email.body}`;
}


function mark_as_read(email_id) {
  
  // Send PUT request to update email as read
  fetch(`/emails/${email_id}`, {
    method: 'PUT',
    body: JSON.stringify({
        read: true
    })
  });
}


function toggle_archive(email_id, mailbox) {
  
  const current_archive_status = mailbox==='Inbox' ? false : true;

  // Send PUT request to toggle archive status
  fetch(`/emails/${email_id}`, {
    method: 'PUT',
    body: JSON.stringify({
        archived: !current_archive_status
    })
  })
  .then(() => load_mailbox('inbox'));
}


function add_archive_button(email_id) {
  
  // Clear an existing buttons
  document.getElementById('archive-button').innerHTML = '';

  // Determine button text
  const mailbox = document.querySelector('h3').innerHTML;
  const button_color = mailbox==='Inbox' ? 'danger' : 'primary'

  // Append archive button
  if (mailbox !== 'Sent') {
    const archive_button = document.createElement('button');
    archive_button.setAttribute('class', `btn btn-sm btn-${button_color}`);
    archive_button.setAttribute('id', 'archive');
    archive_button.innerHTML = mailbox==='Inbox' ? 'Archive' : 'Unarchive';
    archive_button.addEventListener('click', () => toggle_archive(email_id, mailbox));
    
    document.getElementById('archive-button').append(archive_button);
  }

}