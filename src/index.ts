import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3001;

const products = [
  { id: 1, title: "tomato" },
  { id: 2, title: "oranges" },
];
const addresses = [
  { id: 1, value: "Pritytskogo 12" },
  { id: 2, value: "Matusevicha 40" },
];

// middleware to parse data from req body(json) to javaScript object
const parserMiddleware = bodyParser.json({});
app.use(parserMiddleware);

//GET
// query params
app.get("/products", (req: Request, res: Response) => {
  if (req.query.title) {
    let searchString = req.query.title.toString();
    res.send(products.filter((el) => el.title.indexOf(searchString) > -1));
  }
  res.send();
});

app.get("/products/:id", (req: Request, res: Response) => {
  const product = products.find((el) => el.id === +req.params.id);
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

//DELETE
app.delete("/products/:id", (req: Request, res: Response) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === +req.params.id) {
      products.splice(i, 1);
      res.sendStatus(204);
      return;
    }
    res.sendStatus(404);
  }
});

//POST
app.post("/products", (req: Request, res: Response) => {
  const newProduct = { id: +new Date(), title: req.body.title };
  products.push(newProduct);
  res.sendStatus(201).send(newProduct);
});

//PUT
app.put("/products/:id", (req: Request, res: Response) => {
  const product = products.find((el) => el.id === +req.params.id);
  if (product) {
    product.title = req.body.title;
    res.send(product);
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
