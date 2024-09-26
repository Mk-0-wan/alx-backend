#!/usr/bin/env node
/**
 * Creating an app with express
 * Making a connection to the redis-server using createClient()
 * Setting items in redis using the itemId passed by the user in the request
 * Retriving the data from the redis database
 * Checking for the available stock in the database
 * Reserving an item in the stock
 */

import { createClient, print } from 'redis';
import express from "express";
import { promisify } from 'util';


const client = createClient();
const getAsync = promisify(client.get).bind(client);
const app = express();
const listProducts = [
  {'itemId': 1, 'itemName': 'Suitcase 250', 'price': 50, 'initialAvaliableQuantity': 4},
  {'itemId': 2, 'itemName': 'Suitcase 450', 'price': 100, 'initialAvaliableQuantity': 10},
  {'itemId': 3, 'itemName': 'Suitcase 650', 'price': 350, 'initialAvaliableQuantity': 2},
  {'itemId': 4, 'itemName': 'Suitcase 1050', 'price': 550, 'initialAvaliableQuantity': 5},
  {'itemId': 5, 'itemName': 'Suitcase 1050', 'price': 550, 'initialAvaliableQuantity': 0},
  {'itemId': 6, 'itemName': 'Suitcase 1152', 'price': 850, 'initialAvaliableQuantity': 1},
]


client.on('error', err => console.log('Redis client not connected to the server:', err));
client.on('ready', () => console.log('Redis client connected to the server'));
//app.set('json spaces', 4);

function getItemById(id) {
  if (id) {
    if (typeof id === 'string') {
      id = Number(id);
    } else {
      throw new Error("Can't convert the object into a number");
    }
    return listProducts.find(item => item.itemId === id);
  } else {
    throw new Error("No id provided");
  }
}

function gettingStock(id) {
  if (id) {
    if (typeof id === 'string') {
      id = Number(id);
    } else {
      throw new Error("Can't convert the object into a number");
    }
    const itemFound = listProducts.find(item => item.itemId === id);
    return itemFound.initialAvaliableQuantity;
  } else {
    throw new Error("No id provided");
  }
}

function reservedStockByid(itemId, stock) {
  if (typeof itemId !== 'undefined' && typeof stock !== 'undefined') {
    let setObject = getItemById(itemId);
    Object.assign(setObject, {'currentQuantity': stock});
    try {
      client.set(itemId, JSON.stringify(setObject), print);
    } catch (err) {
      console.log("Error while setting values through client: ", err);
    }
  } else {
    return 'pop';
  }
}

async function getCurrentReservedStockById(itemId) {
  if (typeof itemId !== 'undefined') {
    try {
      return JSON.parse(await getAsync(itemId));
    } catch (err) {
      console.log(err)
    }
  } else {
    console.log(`Invalid itemId: ${itemId}`);
  }
}

app.get("/", (_, res) => { 
  res.json(listProducts);
});

app.get("/list_products/:itemId", async (req, res) => { 
  const id = req.params.itemId;
  try {
    const stock = gettingStock(id);
    reservedStockByid(id, stock);
    const data = await getCurrentReservedStockById(id);
    res.json(data);
  } catch (_) {
    res.json({"status": "Product not found"});
  }
});

app.get('/reserve_product/:itemId', (req, res) => {
  const id = req.params.itemId;
  try {
    const stock = gettingStock(id);
    if (stock > 1) {
      res.json({"status": "Reservation confirmed", "itemId":id});
    } else {
      res.json({"status": "Not enough stock available", "item":id});
    }
  } catch (_) {
    res.json({"status": "Product not found"});
  }
});
app.listen(1245);
