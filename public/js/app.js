console.log('Script is being loaded into browser')

const signUpForm = $('form .signUp-form');
const loginForm = $('form .login-form');
const fields = {
        name: $('input#name').val(),
        email: $('input#email').val(),
        password: $('input#pWord').val(),
        age: $('input#age').val()
    }
    // window.addEventListener("load", function() {
    //     form.addEventListener("submit", (event) => {
    //         event.preventDefault()
    //         fetch('/users', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/x-www-form-urlencoded',
    //                 },
    //                 body: JSON.stringify(fields),
    //             })
    //             .then(response => response.json()).then(data => {
    //                 if (data.error) {
    //                     console.log('Error', data)
    //                 } else {
    //                     console.log('Success:', data)
    //                     return data
    //                 }
    //             })
    //     })
    // });

$('document').on('ready', function() {
    $(signUpForm).on('sumbit', function(e) {
        e.preventDefault();
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
                    return data
                }
            })
    })
})

// TEST THIS
$('document').on('ready', function() {
    $(login).on('sumbit', function(e) {
        e.preventDefault();
        fetch('/users/login', {
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
                    return data
                }
            })
    })
})

// Change form
$('.login-form .form-toggle').on('click', function(e) {
    e.preventDefault()
    $(this).parent().toggleClass('d-none')
    $('.signUp-form').toggleClass('d-none')
})
$('.signUp-form .form-toggle').on('click', function(e) {
    e.preventDefault()
    $(this).parent().toggleClass('d-none')
    $('.login-form').toggleClass('d-none')
})