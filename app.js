import express from 'express';
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import cors from 'cors';

import {getNotes, getNote, createNote, getUserList, getUser , getNoteBytitle,
     createUser, deletePost, deleteUser, updatePost, updateUser,CheckUser} from './database.js';


const docYaml = YAML.load("./api.yaml");

const app = express()

app.use(express.json())
app.use(cors());
app.use("/api/about", swaggerUi.serve, swaggerUi.setup(docYaml));


app.get("/api/notes", async (req, res, next) => {
    try{
        const notes = await getNotes()
        res.send(notes)
    }
    catch (e){
         next(e)
    }
    
})

app.get("/api/note/:id", async(req, res, next) =>{
    try{
    const id = req.params.id
    const note = await getNote(id)
    res.send(note)
    }
    catch (e){
        next(e)
    }
})

app.post("/api/notes", async (req, res, next) =>{
    try{
    const {user_id,title, contents} = req.body
    const note = await createNote(user_id,title, contents)
    res.status(201).send(note)
    }
    catch (e){
        next(e)
    }

})

app.get("/api/users", async (req, res, next) => {
    try{
    const users = await getUserList()
    res.send(users)
    }
    catch (e){
        next(e)
    }
})

app.get("/api/user/:id", async(req, res, next) =>{
    try{
    const id = req.params.id
    const user = await getUser(id)
    res.send(user)
    }
    catch (e){
        next(e)
    }
})

app.get("/api/note/:title", async(req, res, next) =>{
    try{
    const title = req.params.title
    const note = await getNoteBytitle(title)
    res.send(user)
    }
    catch (e){
        next(e)
    }
})

app.post("/api/user", async (req, res, next) =>{
    try{
    const {username, password} = req.body
    const note = await createUser(username, password)
    res.status(201).send(note)
    }
    catch (e){
        next(e)
    }
})

app.delete("/api/post/:id",async(req,res) => {
    const id =req.params.id;
    const {username,password} = req.body;
    if(!await getNote(id)){
        return res.status(404).send({ message: "Blog not found" });
    }
 
    
    else{
        await deletePost(id, username, password)
        return res.status(200).send({message: "Blog deleted successfully"})
    }
    
})


app.patch("/api/post" , async (req, res, next) => {
    try{
    const {id, content, password} = req.body
    const note = await updatePost(id, content, password)
    res.status(201).send(note)
    }
    catch (e){
        next(e)
    }
})

app.patch("/api/user" , async (req, res, next) => {
    try{
    const {id,username, old_username, password} = req.body
    const note = await updateUser(id,username, old_username, password)
    res.status(201).send(note)
    }
    catch (e){
        next(e)
    }
})


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080, () => {
    return('Server is running on port 8080')
})
