import useStore from "../store";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

type Poke = {
  name: string;
  id: string;
  image: string;
  type: string;
};

const Monster = () => {
  const [poke, setPoke] = useState<Poke[]>([]);

  const fetchPokemon = async () => {
    const monsterData: any[] = [];
    for (let i = 1; i <= 10; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      monsterData.push(axios.get(url));
      console.log(monsterData.push(axios.get(url)));
    }

    const results = await Promise.all(monsterData);
    const pokemon = results.map((res) => ({
      name: res.data.name,
      id: res.data.id,
      image: res.data.sprites["front_default"],
      type: res.data.types
        .map((type: { type: { name: any } }) => type.type.name)
        .join(", "),
    }));
    console.log(pokemon);
    setPoke(pokemon);
  };
  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div>
      aaa
      {poke.map((items, index) => (
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
