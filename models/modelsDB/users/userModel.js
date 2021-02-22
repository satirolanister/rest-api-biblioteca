module.exports = (sequelize, type) => {
    return sequelize.define('users',{
        _cel: {
            type: type.INTEGER,
            primaryKey: true
        },
        nombre: type.STRING,
        apellido: type.STRING,
        f_nacimiento: type.DATE,
        direccion: type.STRING,
        telefono: type.INTEGER,
        Role:{
           type: type.INTEGER,
           references: {
               model:'roles',
               key: 'Id_Role'    
           }
        }
            
    });
};
