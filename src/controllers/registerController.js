import users from ('../model/dataUser.json');
import bcrypt from 'bcrypt';

const userDB = {
    users,
    setUsers: function (data) {this.users = data}
}

