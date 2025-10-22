const express = require('express');
const app = express();
const port = 3500;

app.use(express.json());

let books = require('./books.json');
console.log(books);

app.get('/',(req,res)=>{
  res.send("<h2>welcome to book store</h2> <br> <h3> Books are Here <a href='/books'>Books</a></h3>")
})

app.get('/books',(req,res)=>{
  res.json(books);
})

app.post('/books',(req,res)=>{
  const nbook = req.body;
  let len = books.length;
  books.push({...nbook,id:len+1});
  res.json({...nbook,id:len+1});
})

app.put('/books/:id',(req,res)=>{
  let id = req.params.id;
  id = Number(id);
  const upbook = req.body;
  books = books.map((book)=>{
    if(book.id===id){
      return {...upbook,id:id};
    }
    return book;
  })
  res.json({msg:"Book Updated",books});
})

app.delete('/books/:id',(req,res)=>{
  let id = req.params.id;
  id = Number(id);
  books = books.filter((book)=>book.id!==id);
  res.json({msg:"Book Deleted",books});
})

app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
})