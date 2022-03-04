//import pg from 'pg'
const res = require('express/lib/response')
const { append } = require('express/lib/response')
const { Pool } = require('pg')

// creamos nuestro pool de conexiones
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'repertorio',
  password: '1234',
  max: 20,
  min: 2,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
})

async function consultar() {
  const client = await pool.connect()
  const res = await client.query(
    "select * from repertorio"
  )
  client.release()
  return res.rows
}
module.exports= {consultar}

async function editar(id, cancion, artista, tono) {
      const client = await pool.connect()
      const res = await client.query({
        text: "update repertorio  set cancion=$2, artista=$3, tono=$4 where id=$1",
        values: [id, cancion, artista, tono]
      })

  client.release()
  return res
};  

async function insertar(id, cancion, artista, tono) {
  const client = await pool.connect()
  // ejemplo de consulta con 2 parámetros
  const res = await client.query(
    "insert into repertorio (id, cancion, artista, tono) values ($1, $2, $3, $4) returning *",
    [id, cancion, artista, tono]
  )
  client.release()
}




/*async function insertar() {
  let client 
  try {
    client = await pool.connect;
  } catch (conn_error) { console.log }
    
  }
  
(err) {
    
  }
    console.log("el error es: " + err)
    return;
  
  client.realese()
  return res.rows;
  }*/
  async function eliminar (id) {
  const client = await pool.connect()
  // ejemplo de consulta con 2 parámetros
  const res = await client.query(
    "delete from repertorio where id=$1",
    [id]
  )
  client.release()
}