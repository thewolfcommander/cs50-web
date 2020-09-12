document.addEventListener('DOMContentLoaded', function () {
    disable_submit();
    add_toggle_likes();
});

// Disable submit button for new form until user types something in
function disable_submit() {
    document.getElementById('new-post-submit').disabled = true;

    document.getElementById('new-post-content').onkeyup = () => {
        if (document.getElementById('new-post-content').value.length > 0) {
            document.getElementById('new-post-submit').disabled = false;
        } else {
            document.getElementById('new-post-submit').disabled = true;
        }
    };
}

function add_toggle_likes() {
    document.querySelectorAll('.bi').forEach(element => add_toggle_like(element))
}

function add_toggle_like(element) {
    element.onclick = () => console.log("Hi!")
}