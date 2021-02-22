module.exports = (sequelize, type) => {
    return sequelize.define('generos',{
        Id_Gen: {
            type: type.INTEGER,
            primaryKey: true
        },
        descripcion: type.STRING
    });
};