import { useState } from "react";
import useStore from "../store";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";

type Poke = {
  name: string;
  id: string;
  image: string;
  type: string;
};

const Monster = () => {
  const [poke, setPoke] = useState<Poke[]>([]);
  const { pkData, setDetail } = useStore((state) => state);
  const router = useRouter();

  const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i < 120; i++) {
      const url = `https:pokeapi.co/api/v2/pokemon/${i}`;
      promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
      const pokemon = results.map((data) => ({
        name: data.name,
        id: data.id,
        image: data.sprites["front_default"],
        type: data.types
          .map((type: { type: { name: string } }) => type.type.name)
          .join(", "),
      }));
      setPoke(pokemon);
    });
  };
  fetchPokemon();

  const toDetail = (id: string) => {
    setDetail(id);
    router.push(`/detail`);
  };

  const [offset, setOffset] = useState(0);
  const perPage: number = 8;

  const handlePageChange = (data: { [x: string]: any }) => {
    console.log(data);
    let page_number = data["selected"]; // クリックした部分のページ数が{selected: 2}のような形で返ってくる
    setOffset(page_number * perPage);
  };
  return (
    <div className="container">
      <h1>pokemon図鑑</h1>
      <div className="poke-container">
        <ul id="pokedex">
          {poke.slice(offset, offset + perPage).map((pokemon, index) => (
            <li
              className="card"
              key={index}
              onClick={() => toDetail(pokemon.id)}>
              <picture>
                <img
                  className="card-image"
                  src={pokemon.image}
                  alt="monsters image"
                />
              </picture>
              <h2 className="card-title">{pokemon.name}</h2>
              <p className="card-subtitle">Type: {pokemon.type}</p>
            </li>
          ))}
        </ul>
      </div>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={Math.ceil(poke.length / perPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Monster;
