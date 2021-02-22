module.exports = (sequelize, type) => {
    return sequelize.define('books',{
        id_book: {
            type: type.INTEGER,
            primaryKey: true
        },
        titulo: type.STRING,
        autor: type.STRING,
        year: type.INTEGER,
        editorial: type.STRING,
        genero:{
           type: type.INTEGER,
           references: {
               model:'generos',
               key: 'Id_Gen'    
           }
        },
        estado: type.STRING
            
    });
};