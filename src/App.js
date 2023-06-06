import React, { useEffect, useState } from 'react';
import { db } from './firebase-config';
import { collection, getDocs, doc, addDoc, deleteDoc, updateDoc } from "firebase/firestore"
import {FaTrashAlt, FaEdit} from "react-icons/fa"

import "./App.css"

function App() {
  const [movies, setMovies] = useState([])
  const [moviesName, setMoviesName] = useState("")
  const [id, setId] = useState("")
  const [isWatched, setIsWatched] = useState(false)
  const getMoviesRef = collection(db, "movies")

const getMovies = async ()=>{
const data = await getDocs(getMoviesRef);
const movie = data.docs.map((movies) => {
  const newMovie = {
    ...movies.data(),
    id: movies.id
  }
  return newMovie;
});
setMovies(movie)
}

const addMovie = async () => {
  const newMovie = {
    isWatched,
    name: moviesName,
  }
  await addDoc(getMoviesRef, newMovie)
  
  
    getMovies()
    setMoviesName("")
    console.log(newMovie);
  // window.alert("enter movie's name")

}

const deleteMovie = async (id) => {
const moviedoc = doc(db, "movies", id)
await deleteDoc(moviedoc)

getMovies()

}

const editMovie = async () => {
  const moviedoc = doc(db, "movies", id)
    const movieObj = {
      isWatched,
      name: moviesName,
    }
      await updateDoc(moviedoc, movieObj)
      getMovies()
      setMoviesName("")
  }

  const test =async (item) => {
    setId(item.id)
    setMoviesName(item.name)
  }

useEffect(()=> {
getMovies()
}, [])



  return (
    <div className="App">
     <div>
      <div>
      <h2>Movies</h2>
      <input type='text' value={moviesName} onChange={({target}) => setMoviesName(target.value)} placeholder='enter movies name' />
      <br/>
      <label>  is watched?</label>
      <input type='checkbox' onChange={({target}) => setIsWatched(target.checked)} style={{cursor: "pointer"}} />
      </div>
      <button onClick={addMovie} style={{cursor: "pointer"}} >add movie</button>
      <button onClick={editMovie} style={{cursor: "pointer"}} >update</button>

     </div>
<br/>
<ul>

{movies.map((item) => {
  console.log(item);
  return <li key={item.id} > <h3> {item.name} <FaTrashAlt onClick={()=> deleteMovie(item.id)} style={{cursor: "pointer"}} /> <FaEdit onClick={()=> test(item)} style={{cursor: "pointer"}} /> </h3></li>
})}
</ul>
    </div>
  );
}

export default App;
