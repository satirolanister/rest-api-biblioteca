const userContr = {};

userContr.get = (req, res) => {
    const {q, nombre='no name', apikey} = req.query;
    res.json({
        "msg":" get funciona controller",
        q,
        nombre,
        apikey
    });
};


userContr.put = (req, res) => {
    //params url
    const id = req.params.id

    res.status(400).json({
        "msg":" put funciona controller",
        "id":id
    });
};

userContr.post = (req, res) => {
    const {nombre, edad} = req.body;

    res.json({
        "msg":"post controller",
        nombre,
        edad
    })
};

userContr.delete = (req, res) => {
    res.json({
        "msg":"delete funciona controller"
    });
};

userContr.patch = (req, res) => {
    res.json({
        "msg":"patch funciona controller"
    });
};


module.exports = userContr;