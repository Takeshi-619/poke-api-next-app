import { useState, useEffect } from "react";
import useStore from "../store";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import axios from "axios";

type Poke = {
  name: string;
  id: string;
  image: string;
  type: string;
};

const Monster = () => {
  const [poke, setPoke] = useState<Poke[]>([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const promises = [];
      for (let i = 1; i < 10; i++) {
        const url = `https:pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(axios.get(url));
      }

      const results = await Promise.all(promises);
      const pokemon = results.map((res) => ({
        name: res.data.name,
        id: res.data.id,
        image: res.data.sprites["front_default"],
        type: res.data.types
          .map((type: { type: { name: any } }) => type.type.name)
          .join(", "),
      }));
      setPoke(pokemon);
    };
    fetchPokemon();
  }, []);

  return (
    <div>
      aaa
      {poke.map((items, index) => (
        // eslint-disable-next-line react/jsx-key
        <div key={index}>
          <picture>
            <img src={items.image} alt="" />
          </picture>
          <p>{items.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Monster;
