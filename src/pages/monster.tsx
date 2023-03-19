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

  useEffect(() => {
    const fetchPokemon = async () => {
      const monsterData: any[] = [];
      for (let i = 1; i < 10; i++) {
        const url = `/api/pokemon?id=${i}`;
        const response = await fetch(url);
        const data = await response.json();
        monsterData.push(data);
      }

      const pokemon = monsterData.map((res) => ({
        name: res.name,
        id: res.id,
        image: res.sprites["front_default"],
        type: res.types
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
