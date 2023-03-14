export {};

const fetch = require("isomorphic-unfetch");

module.exports = async (
  req: { query: { id: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: any): void; new (): any };
    };
  }
) => {
  const { id } = req.query;
  if (!id) {
    res.status(400).json({ error: "Missing ID" });
    return;
  }

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  if (!response.ok) {
    res.status(404).json({ error: "Pokemon not found" });
    return;
  }

  const data = await response.json();
  res.status(200).json(data);
};
