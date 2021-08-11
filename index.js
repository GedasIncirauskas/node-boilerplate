const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

let products = [
  {
    id: '21',
    url: 'https://image.flaticon.com/icons/png/512/81/81960.png',
    title: 'Produktas',
    price: 1.99,
  },
  {
    id: '1',
    url: 'https://image.flaticon.com/icons/png/512/81/81960.png',
    title: 'Testas',
    price: 3.99,
  },
];

app.get('/', (req, res) => {
  res.send('OK');
});

app.get('/products', (req, res) => {
  res.send(products);
});

app.post('/products', (req, res) => {
  if (req.body.title.length > 0) {
    products.push({
      id: req.body.id,
      url: req.body.url,
      title: req.body.url,
      price: Number(req.body.price),
    });
    res.send({ msg: 'All good' });
  } else {
    res.status(400).send({ msg: 'Bad data' });
  }
});

app.delete('/products/:id', (req, res) => {
  if (products.length) {
    products = products.filter((x) => x.id !== req.params.id);
    res.send({ msg: 'Deleted' });
  } else {
    res.status(400).send({ msg: 'Not found' });
  }
});

app.all('*', (req, res) => {
  res.status(400).send({ msg: 'Page not found' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Now working on ${port}`));
