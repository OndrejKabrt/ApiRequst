import express from 'express';
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import {getNotes, getNote, createNote, getUserList, getUser , getNoteBytitle,
     createUser, deletePost, deleteUser, updatePost, updateUser,CheckUser} from './database.js';


const docYaml = YAML.load("./api.yaml");

const app = express()

app.use(express.json())
app.use("/api/about", swaggerUi.serve, swaggerUi.setup(docYaml));

/*app.use(cors());*/

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
    const {title, contents} = req.body
    const note = await createNote(title, contents)
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
    /* #Z kodu Adama Hlavačika 
if(await IsAdmin(username,password) >= 1){
 await deletePost(id) return res.status(200).send({message: "Blog deleted successfully"})
}
  const user_id = await GetBlogUser(id); if(await CheckUser(username,password) != user_id)
  { 
  return res.status(403).send({message: "Not allowed"}) 
  } 
  */ 
    
    else{
        await deletePost(id)
        return res.status(200).send({message: "Blog deleted successfully"})
    }
    
})


app.patch("/api/post" , async (req, res, next) => {
    try{
    const {id, content} = req.body
    const note = await updatePost(id, content)
    res.status(201).send(note)
    }
    catch (e){
        next(e)
    }
})

app.patch("/api/user" , async (req, res, next) => {
    try{
    const {id, content} = req.body
    const note = await updateUser(id, content)
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


  /* app.delete("/api/user/:id", async (req,res, next) => {
    try{ const id = req.params.id
    const response = await deleteUser(id) 
    if (response > 0)res.status(200).send(""); 
    else res.status(404).send("Not found"); } 
    catch (e){ next(e) } }) */

/*pro spusteni zadej node app.js*/