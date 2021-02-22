module.exports = (sequelize, type) => {
    return sequelize.define('loans',{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userloan: {
            type: type.INTEGER,
            references: {
                model:'users',
                key: '_cel'    
            }
        },
        loanuser: {
            type: type.INTEGER,
            references: {
                model:'users',
                key: '_cel'    
            }
        },
        bookloan:{
           type: type.INTEGER,
           references: {
               model:'books',
               key: 'id_book'    
           }
        }
            
    });
};