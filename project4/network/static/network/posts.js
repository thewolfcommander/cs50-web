document.addEventListener('DOMContentLoaded', function () {
    add_toggle_likes();
});

function add_toggle_likes() {
    document.querySelectorAll('.bi').forEach(element => add_toggle_like(element));
}

function add_toggle_like(element) {
    element.onclick = () => toggle_like(element)
}

function toggle_like(element) {
    
    // Check if post is currently liked
    const liked = element.attributes.fill.value.trim()==='red' ? true : false;

    // Update liked status via PUT request
    fetch(`toggle_like/${element.id}`, {
        method: 'PUT',
        body: JSON.stringify({
            liked: !liked
        })
    });

    // Update like count and icon displayed on page
    const like_count = parseInt(document.getElementById(`like-count-${element.id}`).innerText);
    if (liked) {
        document.getElementById(`like-count-${element.id}`).innerText = like_count - 1;
        element.setAttribute('fill', 'black');
    } else {
        document.getElementById(`like-count-${element.id}`).innerText = like_count + 1;
        element.setAttribute('fill', 'red');
    }

}