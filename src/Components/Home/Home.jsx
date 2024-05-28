import React, { useEffect, useState } from 'react'
import "./Home.scss"
import axios from "axios"
import {Link} from "react-router-dom"
import {BiPlay} from "react-icons/bi"
import {AiOutlinePlus} from "react-icons/ai"

//https://api.themoviedb.org/4/account/6496c0c96f43ec00e27d5af0/lists?page=1
const apikey="3e94b9d20bccb8589065c7ba75cc478b";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original"
const popular = "popular"
const nowPlaying ="now_playing";
const upcoming = "upcoming";
const topRated = "top_rated"

const Card = ({ img })=>(
  <img className='card' src={img} alt="cover"/>
)

const Row = ({ title,
  arr=[
    {
  },
  ], 
  })=>(
    <div className="row">
      <h2>{title}</h2>
      <div>
        {
          arr.map((item, index)=>(
              <Card key={index} img={`${imgUrl}/${item.poster_path}`}/>
          ))
        }
      </div>
    </div>
  )
const Home = () => {
  const [popularMovies,setPopularMovies] = useState([]);
  const [upcomingMovies,setUpcomingMovies] = useState([]);
  const [nowPlayingMovies,setNowPlayingMovies] = useState([]);
  const [topRatedMovies,setTopRatedMovies] = useState([]);
  const [genre,setGenre] = useState([]);

  useEffect(()=>{
    const fetchPopular = async()=>{
        // const {data: {results}} = await axios.get(`${url}/movie/${popular}?api_key=${apikey}`)
        const {data: {results}} = await axios.get(`${url}/movie/${popular}?api_key=${apikey}&page=1`)
        
        setPopularMovies(results)
    };
    const fetchNowPlaying = async()=>{
        const {data: {results}} = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apikey}`)
        // const {data} = await axios.get(`${url}/movie/?api_key=${apikey}`)
        setNowPlayingMovies(results)
    };
    const fetchUpcoming = async()=>{
        const {data: {results}} = await axios.get(`${url}/movie/${upcoming}?api_key=${apikey}&page=1`)
        // const {data} = await axios.get(`${url}/movie/?api_key=${apikey}`)
        setUpcomingMovies(results)
    };
    const fetchTopRated = async()=>{
        const {data: {results}} = await axios.get(`${url}/movie/${topRated}?api_key=${apikey}`)
        // const {data} = await axios.get(`${url}/movie/?api_key=${apikey}`)
        setTopRatedMovies(results)
    };
    const getAllGenre = async()=>{
        const {data: {genres}} = await axios.get(`${url}/genre/movie/list?api_key=${apikey}`)
        // const {data} = await axios.get(`${url}/movie/?api_key=${apikey}`)
        setGenre(genres);
        console.log(genres);
    };
    fetchPopular();
    fetchNowPlaying();
    fetchUpcoming();
    fetchTopRated();
    getAllGenre();

  },[])


  return (
    <section className="home">
      <div className="banner" style={{
        backgroundImage: popularMovies[0]? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})` : "black"
      }}>
        
            {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
            {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

            <div>
              <button><BiPlay/> Play</button>
              <button>My List <AiOutlinePlus/></button>
            </div>

        {/* <img src={`${imgUrl}/${popularMovies[0].poster_path}`} alt="" /> */}
      </div>

      <Row title={"Popular Movies"} arr={popularMovies} />
      <Row title={"Now Playing Movies"} arr={nowPlayingMovies} />
      <Row title={"Upcoming Movies"} arr={upcomingMovies} />
      <Row title={"Top Rated Movies"} arr={topRatedMovies} />
      <div className="genreBox">
        {genre.map((item)=>(
          <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
        ))}
      </div>
    </section >
  );
};

export default Home