import { DataState } from "@/redux/search/searchSlice";
import { ItemData } from "@/types";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import ItemCard from "../ui/ItemCard";
import GridLayout from "../layout/GridLayout";
import Heading from "../ui/Heading";

type SearchResultsProps = {
  data: DataState;
};

const SearchResults: FC<SearchResultsProps> = ({ data }) => {
  const { loading, searchData, error } = data;
  const movies = searchData?.filter((item) => item.media_type === "movie");
  const tvShows = searchData?.filter((item) => item.media_type === "tv");
  return (
    <main>
      <Heading as="h1">Search Results</Heading>
      {loading && <p>Loading...</p>}
      {!loading && error ? <p>error</p> : null}
      <section>
        <Heading as="h2">Movies</Heading>
        {!loading && movies && movies?.length !== 0 ? (
          <GridLayout>
            {movies?.map((movie: Partial<ItemData>) => (
              <NavLink to={`/movie/${movie.id}`} key={movie.id}>
                <ItemCard
                  imgSrc={movie.backdrop_path}
                  releaseDate={movie.release_date?.substring(0, 4)}
                  mediaType={movie.media_type}
                  ratings={movie.adult ? "18+" : "PG"}
                  title={movie.title}
                />
              </NavLink>
            ))}
          </GridLayout>
        ) : (
          <div className="">No movies match your search</div>
        )}
      </section>
      <section>
        <Heading as="h2">TV Shows</Heading>
        {!loading && tvShows && tvShows?.length !== 0 ? (
          <GridLayout>
            {tvShows?.map((tvShow: Partial<ItemData>) => (
              <NavLink to={`/tv/${tvShow.id}`} key={tvShow.id}>
                <ItemCard
                  imgSrc={tvShow.backdrop_path}
                  releaseDate={tvShow.first_air_date?.substring(0, 4)}
                  mediaType="tv"
                  ratings={tvShow.adult ? "18+" : "PG"}
                  title={tvShow.name}
                />
              </NavLink>
            ))}
          </GridLayout>
        ) : (
          <div className="">No movies match your search</div>
        )}
      </section>
    </main>
  );
};
export default SearchResults;