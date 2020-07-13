const bcrypt = require('bcryptjs')

const stringPass = 'jordan1234';

const findByCredentials = async() => {
    const hash = await bcrypt.hash(stringPass, 8)
    const match = await bcrypt.compare(stringPass, hash)
    console.log(match)
}

findByCredentials()