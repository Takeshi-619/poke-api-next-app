import axios from "axios";

export default async function handler(req: any, res: any) {
  const errorHandler = (error: string) => {
    console.log(error);
  };
  try {
    const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: errorHandler("missing") });
  }
}
