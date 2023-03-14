import { useState } from "react";
import useStore from "../store";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import useSWR from "swr";

const Monster = () => {
  // const [id, setId] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setId(Number(event.target.value));
  // };

  for (let i = 1; i <= 10; i++) {
    const id = i;
  }

  async function display(id: number) {
    const response = await fetch(`/api/pokemon/${id}`);
    const data = await response.json();
    setName(data.name);
    setImageUrl(data.sprites.front_default);
  }

  return <div></div>;
};

export default Monster;
