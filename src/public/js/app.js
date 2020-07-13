fetch('127.0.0.1:3000/users/login').then((res) => {
    const user = res.user;
    console.log(user)
})