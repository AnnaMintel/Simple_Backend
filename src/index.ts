import express, { Request, Response } from "express";

const app = express();
const port = 3000;

const products = [{ title: "tomato" }, { title: "oranges" }];
const addresses = [
  { id: 1, value: "Pritytskogo 12" },
  { id: 2, value: "Matusevicha 40" },
];

app.get("/products/:productTitle", (req: Request, res: Response) => {
  const product = products.find((el) => el.title === req.params.productTitle);

  if (product) {
    res.send(product);
  } else {
    res.sendStatus(404);
  }
});

app.get("/addresses", (req: Request, res: Response) => {
  res.send(addresses);
});

app.get("/addresses/:id", (req: Request, res: Response) => {
  const address = addresses.find((el) => el.id === +req.params.id);
  if (address) {
    res.send(address);
  } else {
    res.sendStatus(404);
  }
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
