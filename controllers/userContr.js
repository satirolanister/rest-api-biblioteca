const userContr = {};

const {usersSeque} = require('../infodb/accessDB');


userContr.getAlluser = async (req, res) => {
    try {
        const users = await usersSeque.findAll();
        res.json(users);
    } catch (error) {
        res.json(error);
    }
};

userContr.getOneuser = async (req, res) => {
    const id = req.params.id;
    try {
        if(req.params.id === null || req.params.id === ''){
            res.json({
                Message: `Id de usuario proporcionado no puede ser vacio`
            })
        }else{
            const user = await usersSeque.findOne({
                where:{
                    _cel: id
                }
            });
            if(user === undefined || user === null || user === " "){
                res.status(404).json({message: `El usuario no existe`});
            }else{
                res.json({Message:`Información usuario`,user});
            }
        }
        
        
    } catch (error) {
        res.status(500).json(error)
    }
}

userContr.insertUser = async (req, res) => {
    const {_cel, nombre, apellido, f_nacimiento, dirección, telefono, role, userid} = req.body;
    const data ={
        _cel,
        nombre,
        apellido,
        f_nacimiento,
        dirección,
        telefono,
        role
    }
    const Userid = userid;

    if(req.body === undefined || req.body === { } || req.body === ' '){
        res.status(400).json({
            Message: `El body no debe estar vacio`
        })
    }else{
        if(_cel === undefined || _cel === " " || nombre === undefined || nombre === " " || 
           f_nacimiento === undefined || f_nacimiento === " " || apellido === undefined || apellido === "" ||
           dirección === undefined || dirección === " " || telefono === undefined || telefono === "" || role === undefined || role === " "){
             res.json({
                 Message: `Todos los campos deben ser llenados`
             });  
        }else{
            const user = await usersSeque.findOne({
                where:{
                    _cel: Userid
                }
            });
            if(user === null){
                res.status(404).json({
                    Message: `El id del usuario ${id} no existe`
                });
            }
            if(user.Role =! 1){
                res.status(403).json({
                    Message: "Usuario no autorizado para dicha acción"
                });
            }else{
                const iduser = await usersSeque.findOne({
                    where:{
                        _cel: _cel
                    }
                });
                if(iduser === null){

                    const user = await usersSeque.create(data);
                    res.status(200)
                       .json({
                        Message: "Usuaio creado",
                        user
                    });
                }else{
                    res.status(400).json({
                        Message: `El Usuario con id ${_cel} ya se encuentra en existencia`
                    });
                }
            }
        }
    }
};

userContr.updateUser = async (req, res) => {

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
        
        let valid = await usersSeque.findOne({
            where: {
                _cel: userid
            }
        })
        if (valid === null) {
            res.status(404)
                .json(`Usuario con id ${id} no encontrado`)
        } else {
            const user = await usersSeque.findOne({
                where: {
                    _cel: userid
                }
            })
            if(user === null){
                res.status(404).json({
                    Message: `El id del usuario ${id} no existe`
                });
            }
            if (user.Role = !1) {
                res.status(403)
                   .json({
                    Message: "Usuario no autorizado para dicha acción"
                });
            } else {

                await usersSeque.update(data, {
                    where: {
                        _cel: id
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

userContr.deleteUser = async (req, res) => {
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
        });
        if(user === null){
            res.status(404).json({
                Message: `El id del usuario ${id} no existe`
            });
        }
        if (user.Role = !1) {
            res.status(403).json({
                Message: "Usuario no autorizado para dicha acción"
            });
        } else {

            await usersSeque.destroy({
                where: {
                    _cel: id
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




module.exports = userContr;