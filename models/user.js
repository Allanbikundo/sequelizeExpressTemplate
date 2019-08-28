module.exports = (sequelize, DataTypes) => {
    var user = sequelize.define('user', {
        first: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    })
    return user
}
