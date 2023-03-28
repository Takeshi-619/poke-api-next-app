import useStore from "../store";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
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
  const { pkData, setDetail } = useStore((state) => state);
  const router = useRouter();

  const fetchPokemon = async () => {
    const monsterData: any[] = [];
    for (let i = 1; i <= 120; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      monsterData.push(axios.get(url));
    }

    const results = await Promise.all(monsterData);
    const pokemon = results.map((res) => ({
      name: res.data.name,
      id: res.data.id,
      image: res.data.sprites["front_default"],
      type: res.data.types
        .map((type: { type: { name: string } }) => type.type.name)
        .join(", "),
    }));
    // console.log(pokemon);
    setPoke(pokemon);
  };
  useEffect(() => {
    fetchPokemon();
  }, []);

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
    <section className="card_wrapper">
      <h1 className="card_wrapper_title">ポケモン図鑑</h1>
      <div className="card_wrapper_content">
        {poke.slice(offset, offset + perPage).map((items, index) => (
          <div
            key={index}
            className="card_wrapper_content_box"
            onClick={() => toDetail(items.id)}>
            <picture className="card_wrapper_content_box_image">
              <img src={items.image} alt={items.name} />
            </picture>
            <p className="card_wrapper_content_box_name">{items.name}</p>
            <p className="card_wrapper_content_box_type">{items.type}</p>
          </div>
        ))}
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
    </section>
  );
};

export default Monster;
