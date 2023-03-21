/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import useStore from "../store";
import axios from "axios";
import Btn from "@/component/Btn";
import { useRouter } from "next/router";
import { stringify } from "querystring";

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
  const { pkData, setDetail } = useStore((state) => state);
  const [nextBtn, setNextBtn] = useState();
  const [backBtn, setBackBtn] = useState();
  const router = useRouter();

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

  const nextPages = () => {
    const page = +detailId + 1;
  };

  const pageHandler = (e: string) => {
    console.log(e);
    e === "b"
      ? console.log("back")
      : e === "c"
      ? nextPages()
      : router.push("/");
  };

  useEffect(() => {
    fetchPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {poke &&
        poke.map((i, index) => (
          <div key={index} className="details">
            <div className="details_monster">
              <picture>
                <img className="details_monster_image" src={i.image} alt="" />
              </picture>
              <h3 className="details_monster_name">
                <span>NO.{detailId}</span>
                {i.name}
              </h3>
              <div className="details_monster_info content-flex">
                <h3>Ability</h3>
                {i.ability}
              </div>
              <div className="details_monster_info content-flex">
                <h3>Type</h3>
                {i.type}
              </div>
            </div>
            <div className="details_stats">
              <h3>Stats</h3>
              {i.stats
                .reduce((pre: any, cur: any, index: any) => {
                  pre.push({
                    stat: cur,
                    num: i.base_stats[index],
                  });
                  return pre;
                }, [])
                .map((item: any, i: any) => (
                  <span key={i} className="details_stats_content">
                    <p className="details_stats_content_first">{item.stat}</p>
                    <p className="details_stats_content_sec">{item.num}</p>
                  </span>
                ))}
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
    </>
  );
};

export default detail;
