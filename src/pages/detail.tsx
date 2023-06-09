/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import useStore from "../store";
import axios from "axios";
import Btn from "@/component/Btn";
import { useRouter } from "next/router";

type Poke = {
  name: string;
  id: string;
  image: string;
  stats: any;
  ability: string;
  type: string;
  [key: string]: any;
};

const detail = () => {
  const detailId = useStore((state) => state.detailId);
  const [pageId, setPageId] = useState(detailId);
  const router = useRouter();

  console.log(`this is  ${pageId}`);
  const [poke, setPoke] = useState<Poke[]>([]);

  const fetchPokemon = async () => {
    const monsterData = [];
    const url = `https://pokeapi.co/api/v2/pokemon/${detailId}`;
    monsterData.push(axios.get(url));

    const results = await Promise.all(monsterData);
    const pokemon: Poke[] = results.map((res) => ({
      name: res.data.name,
      id: res.data.id,
      image: res.data.sprites["front_default"],
      stats: res.data.stats.map((item: any) => item.stat.name),
      base_stats: res.data.stats.map((i: { base_stat: string }) => i.base_stat),
      ability: res.data.abilities
        .map((ability: any) => ability.ability.name)
        .join(", "),
      type: res.data.types
        .map((type: { type: { name: string } }) => type.type.name)
        .join(", "),
    }));
    console.log(pokemon);
    setPoke(pokemon);
  };

  const pageHandler = async (e: string) => {
    console.log(e);
    e === "b"
      ? await backPages()
      : e === "c"
      ? await nextPages()
      : router.push("/");
  };

  async function newData() {
    const monsterData = [];
    const url = `https://pokeapi.co/api/v2/pokemon/${pageId}`;
    monsterData.push(axios.get(url));

    const results = await Promise.all(monsterData);
    const pokemon: Poke[] = results.map((res) => ({
      name: res.data.name,
      id: res.data.id,
      image: res.data.sprites["front_default"],
      stats: res.data.stats.map((item: any) => item.stat.name),
      base_stats: res.data.stats.map((i: { base_stat: string }) => i.base_stat),
      ability: res.data.abilities
        .map((ability: any) => ability.ability.name)
        .join(", "),
      type: res.data.types
        .map((type: { type: { name: string } }) => type.type.name)
        .join(", "),
    }));
    setPoke(pokemon);
  }

  const nextPages = async () => {
    const pages = String(+pageId + 1);
    setPageId(pages);
  };
  const backPages = () => {
    if (+pageId === 1) return;
    const pages = String(+pageId - 1);
    setPageId(pages);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);
  useEffect(() => {
    newData();
  }, [pageId]);
  return (
    <div className="details">
      {poke &&
        poke.map((i, index) => (
          <div key={index} className="details_content">
            <div className="details_content_monster">
              <picture>
                <img
                  className="details_content_monster_image"
                  src={i.image}
                  alt=""
                />
              </picture>
              <h3 className="details_content_monster_name">
                <span>NO.{i.id}</span>
                {i.name}
              </h3>
              <div className="details_content_monster_info content-flex">
                <h3>Ability</h3>
                {i.ability}
              </div>
              <div className="details_content_monster_info content-flex">
                <h3>Type</h3>
                {i.type}
              </div>
            </div>
            <div className="details_content_stats">
              <h3>Stats ＜＜</h3>
              <div className="details_content_stats_box">
                {i.stats
                  .reduce((pre: any, cur: any, index: any) => {
                    pre.push({
                      stat: cur,
                      num: i.base_stats[index],
                    });
                    return pre;
                  }, [])
                  .map((item: any, i: any) => (
                    <span key={i} className="details_content_stats_content">
                      <p className="details_content_stats_content_first">
                        {item.stat}
                      </p>
                      <p className="details_content_stats_content_sec">
                        {item.num}
                      </p>
                    </span>
                  ))}
              </div>
            </div>
          </div>
        ))}

      <div className="details_footer">
        <button
          className="details_footer_topBtn"
          onClick={(e) => pageHandler(e.currentTarget.value)}>
          TOP
        </button>
        <div className="details_footer_pages">
          <button
            className="details_footer_pages_btns"
            value="b"
            onClick={(e) => pageHandler(e.currentTarget.value)}>
            PREV
          </button>
          <button
            className="details_footer_pages_btns"
            value="c"
            onClick={(e) => pageHandler(e.currentTarget.value)}>
            NEXT
          </button>
        </div>
      </div>
      <Btn href={`/monster`} text={"To Back"}></Btn>
    </div>
  );
};

export default detail;
