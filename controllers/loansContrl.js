const loanContr = {};

const {loansSeque, bookSeque, usersSeque} = require('../infodb/accessDB');


loanContr.add = async(req, res) => {

    const {userloan, loanuser, bookloan} = req.body
    const data = {
        userloan,
        loanuser,
        bookloan
    };

    try {
        if(data === undefined || data === ' ' || data === { }){
            res.status(400).json('Body no pude estar incompleto')
        }else{
            let auth = await usersSeque.findOne({
                where: {
                    _cel: userloan
                }
               });
               let user = await usersSeque.findOne({
                   where:{
                       _cel: loanuser
                   }
               });
               let book = await bookSeque.findOne({
                   where:{
                    id_book: bookloan
                   }
               });

               if(auth === null ){
                   res.status(403).json({
                       Message: `User ${userloan} no se ha creado aun` 
                   });
               }else{
                if(auth.Role = !1){
                    res.status(403).json({
                        Message: `User ${userloan} no esta autorizado para esta acción`
                    });
                   }else{
                       if(user === null){
                           res.status(404).json({
                               Message: `El User ${loanuser} no existe`
                           });
                       }else{
                           if(book === null){
                                res.status(404).json({
                                Message: `El Libro con id ${bookloan} no existe`
                             });
                           }else{
                               if(book.estado === 'En prestamo'){
                                   res.status(409).json({
                                       Message : `El libro con id ${bookloan} Se encuentra en prestamo`
                                   });
                               }else{
                                                                      
                                   let loan = await loansSeque.create(data);
                                   await bookSeque.update({estado: 'En prestamo'}, {
                                    where: {
                                        id_book: bookloan
                                        }
                                    });
                                    res.status(200).json(loan);
                               }
                           }
                       }
                        
                   }
               }
        }
    } catch (error) {
        res.status(400).json(error)
    }


}; 

loanContr.updateLoan = async(req, res) =>{
    const {id, userloan, loanuser, bookloan} = req.body

    if(req.body === null || req.body === ' ' || req.body === { }){
        res.status(400).json('El body no puede quedar vacio')
    }else{
        let userLoan = await usersSeque.findOne({
            where:{
                _cel:userloan
            }
        });
        if(userLoan.Role =! 1){
            res.status(403).json({
                Message: `El user ${userLoan} no esta autorizado para hacer esta acción`
            });
        }else{
            let user = await usersSeque.findOne({
                where: {
                    _cel:loanuser
                }
            });
            if(user === null){
                res.status(404).json({
                    Message: `El usuario ${loanuser} no se encuentra creado`
                });
            }else{
                let book = await bookSeque.findOne({
                    where:{
                        id_book: bookloan
                    }
                });
                if(book === null){
                    res.status(404).json({
                        Message: `El libro ${bookloan} no se encuentra en inventario`
                    });
                }else{
                    await bookSeque.update({estado: 'disponible'}, {
                        where: {
                            id_book: bookloan
                            }
                    });
                    await loansSeque.update({updatedAt:book.updatedAt},{
                        where:{
                            id: id
                        }
                    })
                    res.status(200).json({
                        Message: `Entrega realizada`,
                        book: book.id_book,
                    })
                } 
            }
        }
    }
}



module.exports = loanContr;