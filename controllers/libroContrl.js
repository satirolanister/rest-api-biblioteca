const {
    bookSeque,
    usersSeque
} = require('../infodb/accessDB');
const service = require('../services/convertObject');

const libroContr = {};


libroContr.getAllbooks = async (req, res) => {

    try {
        const books = await bookSeque.findAll();
        res.json(books);
    } catch (error) {
        res.json(error);
    }


};
libroContr.getOneBook = async (req, res) => {

    const id = req.params.id
    try {
        const book = await bookSeque.findOne({
            where: {
                id_book: id
            }
        });
        if (book === null || book === undefined || book === " ") {
            res.status(404).json({
                message: 'id del libro no encontrado'
            })
        } else {
            res.status(200).json(book);
        }

    } catch (error) {
        res.json(error);
    }


};

libroContr.insertBook = async (req, res) => {
    // body
    const {
        id_book,
        titulo,
        autor,
        year,
        editorial,
        genero,
        userid
    } = req.body;
    const data = {
        id_book: id_book,
        titulo: titulo,
        autor: autor,
        year: year,
        editorial: editorial,
        genero: genero,
        estado: "Disponible"
    };
    const id = userid;
    try {
        if (data.id_book === undefined || data.id_book === ' ' || data.titulo === undefined || data.titulo === ' ' ||
            data.autor === undefined || data.autor === ' ' || data.year === undefined || data.year === ' ' ||
            data.editorial === undefined || data.editorial === ' ' || data.genero === undefined || data.genero === ' ' ||
            id === undefined || id === ' ') {
            res.status(400).json(`Se requiere todos los campos debe ser llenados`);
        } else {
            const user = await usersSeque.findOne({
                where: {
                    _cel: id
                }
            });
            if (user.Role = !1) {
                res.status(403).json({
                    Message: "Usuario no autorizado para dicha acción"
                });
            } else {

                const bookid = await bookSeque.findOne({
                    where: {
                        id_book: id_book
                    }
                });

                if (bookid === null) {

                    
                    const book = await bookSeque.create(data);

                    res.status(200)
                       .json({
                        Message: "libro creado",
                        libro: book
                    });

                } else {
                    res.json({
                        Message: `el libro con id ${id_book} ya se encuentra en existencia`
                    });

                };
            };

        }

    } catch (error) {
        res.json(error)
    }

};

libroContr.updateBook = async (req, res) => {

    let id;
    let userid;
    let data;

    if(req.body === undefined || req.body === { } || req.body === ' '){
        res.status(400).json({
            Message: `El body no debe estar vacio`
        })
    }else{
        if(req.query.id === undefined || req.query.userid === undefined || req.query.userid  === {}
            ||  req.query.id === { } || req.query.userid === ' ' || req.query.id === ' '){
            res.status(400).json({
                Message: `Los parametros deben ser colocados`
            })
        }else{
            id = req.query.id;
            userid = req.query.userid;
            data = req.body;

        }
    }

    try {
        let valid = await bookSeque.findOne({
            where: {
                id_book: id
            }
        })
        if (valid === null) {
            res.status(404)
                .json(`Libro con id ${id} no encontrado`)
        } else {
            const user = await usersSeque.findOne({
                where: {
                    _cel: userid
                }
            })
            if (user.Role = !1) {
                res.status(403)
                   .json({
                    Message: "Usuario no autorizado para dicha acción"
                });
            } else {

                await bookSeque.update(data, {
                    where: {
                        id_book: id
                    }
                });
                res.status(200).json({
                    Message: `Datos actulizados`
                });
            }

        }

    } catch (error) {
        res.json({
            Message: `Error contenido del body ${data}`,
            error
        });
    }
};

libroContr.deleteBook = async (req, res) => {

    let id;
    let userid;


    
        if(req.query.id === undefined || req.query.userid === undefined || req.query.userid  === {}
            ||  req.query.id === { } || req.query.userid === ' ' || req.query.id === ' '){
            res.status(400).json({
                Message: `Los parametros deben ser colocados`
            })
        }else{
            id = req.query.id;
            userid = req.query.userid;
            data = req.body;

        }
    


    try {

        const user = await usersSeque.findOne({
            where: {
                _cel: userid
            }
        })
        if (user.Role = !1) {
            res.status(403).json({
                Message: "Usuario no autorizado para dicha acción"
            });
        } else {

            await bookSeque.destroy({
                where: {
                    id_book: id
                }
            });
            res.json({
                Message: `Eliminado ${id}`
            });
        }

    } catch (error) {
        res.json({
            Message: `Error contenido del body ${data}`,
            error
        });
    }
};



module.exports = libroContr;