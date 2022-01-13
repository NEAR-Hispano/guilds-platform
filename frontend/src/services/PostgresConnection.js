import { Client } from 'pg'

const connectionData = {
    user: '',
    host: '',
    database: '',
    password: '',
    port: 5432,
}

const client = new Client(connectionData)

export async function GetData() {
    client.connect()
    client.query('SELECT * FROM table')
    .then(response => {
        client.end()
        return(response.rows)
    })
    .catch(err => {
        console.log(err)
        client.end()
    })
}