
import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
}).promise()

export async function getNotes(){
    const [rows] = await pool.query("SELECT * FROM notes")
    return (rows)
}


export async function getNote(id){
    const [rows] =await pool.query('SELECT * FROM notes Where id = ?', [id])
    return rows[0]
}

export async function createNote(title, contents) {
    const [result] = await pool.query('INSERT INTO notes (title, contents) VALUES (?,?)',[title, contents])
    const id = result.insertId
    return getNote(id)
}


export async function getUserList(){
    const [rows] = await pool.query("SELECT * FROM user")
    return (rows)
}


export async function getUser(id){
    const [rows] =await pool.query('SELECT * FROM user Where id = ?', [id])
    return rows[0]
}


export async function getNoteBytitle(title){
    const [rows] =await pool.query('SELECT * FROM notes Where title = ?', [title])
    return rows[0]
}



export async function createUser(username, password) {
    const [result] = await pool.query('INSERT INTO user (username, password) VALUES (?,?)',[username, password])
    const id = result.insertId
    return getNote(id)
}


export async function deletePost(id){
    const [rows] =await pool.query('DELETE FROM notes Where id = ?', [id])
    return rows[0]
}


export async function deleteUser(id){
    const [rows] =await pool.query('DELETE FROM user Where id = ?', [id])
    return rows[0]
}



export async function updatePost(id,content){
    const [rows] =await pool.query('UPDATE notes SET contents = ? Where id = ?', [content,id])
    return rows[0]
}

export async function updateUser(id,username){
    const [rows] =await pool.query('UPDATE user SET username = ? Where id = ?', [username,id])
    return rows[0]
}

export async function CheckUser(username,password){
    let result = await pool.query("select password,id from user where username = ?;", [username]);
    console.log(result)
	if (result[0].length <= 0) return 0;
	return result[0][0]["id"];
}
