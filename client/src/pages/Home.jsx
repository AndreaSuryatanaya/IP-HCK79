import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnime } from "../redux/animeSlice";
import AnimeCard from "../components/AnimeCard";

export default function Home() {
  const dispatch = useDispatch();
  const { animeList, loading } = useSelector((state) => state.anime);

  useEffect(() => {
    dispatch(fetchAnime());
  }, [dispatch]);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Top Anime</h1>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {animeList.map((anime) => (
            <div className="col" key={anime.mal_id}>
              <AnimeCard anime={anime} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
