console.log('Script is being loaded into browser')

const form = document.querySelector('form');
const fields = {
    name: document.querySelector('input#name').textContent,
    email: document.querySelector('input#email').textContent,
    password: document.querySelector('input#pWord').textContent,
    age: document.querySelector('input#age').textContent
}
window.addEventListener("load", function() {
    form.addEventListener('submit', (event) => {
        console.log('submit button clicked!')
        event.preventDefault()

        fetch('/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(fields),
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.log('Error', data)
                } else {
                    console.log('Success:', data)
                }
            })
    })
});

$('.login-form .form-toggle').on('click', function(e) {
    console.log('CLICKED 1')
    e.preventDefault()
    $(this).parent().toggleClass('d-none')
    $('.signUp-form').toggleClass('d-none')
})
$('.signUp-form .form-toggle').on('click', function(e) {
    console.log('CLICKED 1')
    e.preventDefault()
    $(this).parent().toggleClass('d-none')
    $('.login-form').toggleClass('d-none')
})