export {};

const fetchUrl = require("isomorphic-unfetch");

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
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  res.status(200).json(data);
};
