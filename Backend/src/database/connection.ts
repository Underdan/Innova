import {Sequelize} from "sequelize";


const sequelize = new Sequelize('login_innova', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

export default sequelize