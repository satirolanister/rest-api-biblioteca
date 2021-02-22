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
    const {id, userloan} = req.body

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
            const book = await loansSeque.findOne({
                where: {
                    id : id
                }
            })
            const idbook = book.bookloan
            if(idbook === null){
                res.status(400).json({
                    Message: `El libro con id ${idbook} no se encuentra en inventario`
                });
            }else{
                await bookSeque.update({estado: 'disponible'}, {
                    where: {
                        id_book: idbook
                        }
                });
                await loansSeque.update({updatedAt:book.updatedAt},{
                    where:{
                        id: id
                    }
                })
                res.status(200).json({
                    Message: `Entrega realizada`,
                    book: idbook,
                    fecha_entrega: book.updatedAt
                }); 
            }
            
        }
    }
}



module.exports = loanContr;