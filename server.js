const express = require('express')
const { consultar } = require('./db.js');

const app = express()
app.use(express.static('static'))
app.use(express.json())

app.get('/canciones', async (req, res) => {
  let canciones = await consultar()
  res.json(canciones)

})


app.post('/cancion', async (req, res) => {
  let body = ""

  req.on("data", (data) => {
    body += data
  })

  req.on("end", async () => {

    const datos = Object.values(JSON.parse(body));
  })
})

app.put("/cancion", async (req, res) => {
  let body = "";
  req.on("data", (data) => {
    body += data;
  });

  req.on("end", async () => {
    const datos = Object.values(JSON.parse(body));
    console.log(datos);
    const algo = await editar(Number(datos[0]), datos[1], datos[2], datos[3]);
    res.status(201).json(algo);
  });
});
    
app.delete()
    

//1.
//2. Crear una ruta GET /canciones que devuelva un JSON con los registros de la tabla repertorio.

//3. Crear una ruta PUT /cancion que reciba los datos de una canción que se desea
//editar, ejecuta una función asíncrona para hacer la consulta SQL correspondiente y
//actualice ese registro de la tabla repertorio.

//4. Crear una ruta DELETE /cancion que reciba por queryString el id de una canción y
//realiza una consulta SQL a través de una función asíncrona para eliminarla de la base de datos.



app.listen(3000, () => console.log('Servidor en puerto 3000'))








