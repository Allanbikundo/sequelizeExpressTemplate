module.exports = (sequelize, DataTypes) => {
    var article = sequelize.define('article', {
        title: DataTypes.STRING
    })
    return article
}
