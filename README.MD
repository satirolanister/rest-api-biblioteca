# Api rest biblioteca

# Descargar modulos de node
``` npm install ```

# Iniciar proyecto
 *Este comando se debe ejecutar por terminal en el directorio del proyecto*
``` npm run start ```

# Rutas

  # Libros
    peticiones (get, post, put, delete)
   ```http://localhost:3000/api/libros ```

    ## GET
        No recibe parametros, ni solicita datos del Body
        http://localhost:3000/api/libros

    ## GET con id   
        Solo recibe un parametro id del libro a consultar
        http://localhost:3000/api/libros/id(Integer)

    ## POST
        En un objeto JSON se recibe los siguientes datos en el Body y va sin parametros adicionales   
        {
        "id_book": Integer,
        "titulo": String,
        "autor": String,
        "year": Integer,
        "editorial": String,
        "genero": Integer relacionado con el id de la tabla generos,
        "userid": Integer relacionado con el id de la tabla users con role 1 este role se relaciona con la tabla roles
        }

    ## PUT
        En un objeto JSON se recibe los siguientes datos en el Body de acuerdo con los campos que se desean modificar,
        a su vez recibe unos parametros en la url de la petición    

        Body:
        {
        "titulo": String,
        "autor": String,
        "year": Integer,
        "editorial": String,
        "genero": Integer relacionado con el id de la tabla generos,
        }
        Parametros:
        {
            id: Integer id_book de la tabla books
            userid: Integer _cel de la tabla users con role 1
        }

    ## DELETE  
        Esta petición no requiere nada en el Body, pero si require parametros en la url de la petición
        Parametros:
        {
            id: Integer id_book de la tabla books
            userid: Integer _cel de la tabla users con role 1
        }  

  # Usuarios 
    peticiones (get, post, put, delete)
   ```http://localhost:3000/api/users ```

    ## GET
        No recibe parametros, ni solicita datos del Body
        http://localhost:3000/api/users 

    ## GET con id   
        Solo recibe un parametro id del usuario a consultar
        http://localhost:3000/api/users/id(Integer) 

    ## POST
        En un objeto JSON se recibe los siguientes datos en el Body y va sin parametros adicionales   
        {
        _cel: Integer,
        nombre: String ,
        apellido: String,
        f_nacimiento: Date,
        dirección: String,
        telefono: Integer,
        role: Integer este campo se relaciona con la tabla roles
        "userid": Integer relacionado con el id de la tabla users con role 1 este role se relaciona con la tabla roles
        }

    ## PUT
        En un objeto JSON se recibe los siguientes datos en el Body de acuerdo con los campos que se desean modificar,
        a su vez recibe unos parametros en la url de la petición    

        Body:
        {
        nombre: String ,
        apellido: String,
        f_nacimiento: Date,
        dirección: String,
        telefono: Integer,
        role: Integer este campo se relaciona con la tabla roles
        }
        Parametros:
        {
            id: Integer id del usuario a modificar
            userid: Integer de la tabla users con role 1
        }

    ## DELETE  
        Esta petición no requiere nada en el Body, pero si require parametros en la url de la petición
        Parametros:
        {
            id: Integer id del usuario a eliminar
            userid: Integer id de la tabla users con role 1
        }
 # prestamos
    peticiones (post, put)
   ```http://localhost:3000/api/loans/ ```


    ##POST
            Esta petición no requiere parametros, pero el Body debe llevar algunos datos.

            Body:
            {
                "userloan" : id usuario con role 1 en la tabla users,
                "loanuser" : id usuario que solicita el prestamo,
                "bookloan" : id libro que se va a prestar   
            }
    ##PUT
            Esta petición no requiere parametros, pero el Body debe llevar algunos datos.
            
            Body:
            {
                "id": id del prestamo realizado,     
                "userloan" : id usuario con role 1 en la tabla users
            }             
