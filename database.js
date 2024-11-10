
import mysql from 'mysql2'
import dotenv from 'dotenv'
import { text } from 'express'
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

export async function createNote(user_id,title, contents) {
    const [result] = await pool.query('INSERT INTO notes (title, post, owner_id) VALUES (?,?,?)',[title, contents, user_id])
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
    const [result] = await pool.query('INSERT INTO user (username, password, admin) VALUES (?,?,?)',[username, password, 0])
    const id = result.insertId
    return getNote(id)
}


export async function deletePost(id, username, password){
    const [rows] =await pool.query('DELETE FROM notes Where id = ? AND owner_id = (select id from user where username = ? AND password = ? OR admin)', [id, username, password])
    return rows[0]
}


export async function deleteUser(id,username,password){
    const [rows] =await pool.query('DELETE FROM user Where id = ? AND usename = ? AND password = ?', [id, username, password])
    return rows[0]
}



export async function updatePost(id,content, password){
    const temp = await getNote(id)
    if(content = null){
        text = temp.text
    }
    const [rows] =await pool.query('UPDATE notes SET contents = ? Where id = ? owner_id = (select id from user where password = ?)', [content,id, password])
    return rows[0]
}

export async function updateUser(id,username, old_username, password){
    const [rows] =await pool.query('UPDATE user SET username = ? Where id = ? AND owner_id = (select id from user where username = ? AND password = ?)', [username,id, old_username, password])
    return rows[0]
}


export async function CheckUser(username,password){
    let result = await pool.query("select password,id from user where username = ?;", [username]);
    console.log(result)
	if (result[0].length <= 0) return 0;
	return result[0][0]["id"];
}
