const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const Connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'furniture_ecommerce'
})

Connection.connect((error) => {
    if (error) {
        console.error('Error connecting to MySQL:', error);
        return;
    }
    console.log('Connected to MySQL Database!');
})

// Get all products (no pagination, for sidebar etc.)
app.get('/all-products', (req, res) => {
  Connection.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(200).json({ error: "DB error" });
    res.json(results);
  });
});

app.post('/products', (req, res) => {
    const product_id = req.body.product_id;
    const category_id = req.body.category_id;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const stock = req.body.stock;
    const sku = req.body.sku;
    const thumbnail_image = req.body.thumbnail_image;

    Connection.query('INSERT INTO `products` (`product_id`, `category_id`, `name`, `description`, `price`, `stock`, `sku`, `thumbnail_image`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [product_id, category_id, name, description, price, stock, sku, thumbnail_image], (error, results) => {
        if (error) {
            console.error('Error Executing Query:', error);
            return;
        }
        
        const data = {'message': 'Data Inserted Successfully'};
        res.status(200).json(data);
    })
})

// Get single product by ID
app.get('/products/:id', (req, res) => {
  const id = req.params.id;

  Connection.query('SELECT * FROM products WHERE id=?', [id], (error, results) => {
    if (error) {
      console.error('Error Fetching Single Product:', error);
      return res.status(200).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(200).json({ message: "Product not found" });
    }
    res.json(results[0]);
  });
});

// Limit and Skip

app.get('/products', (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 5;
  const page = parseInt(req.query.page, 10) || 1; // frontend sends page
  const skip = (page - 1) * limit; // calculate offset

  Connection.query('SELECT COUNT(*) AS total FROM products', (error, countResult) => {
    if (error) {
      console.error('Count query error:', error);
      return res.status(200).json({ error: 'Database error' });
    }
    const total = countResult[0].total;

    Connection.query('SELECT * FROM products LIMIT ? OFFSET ?', [limit, skip], (error2, results) => {
      if (error2) {
        console.error('Data query error:', error2);
        return res.status(200).json({ error: 'Database error' });
      }
      res.json({
        products: results,
        total: total,
        limit: limit,
        skip: skip,
      });
    });
  });
});

// Rate a product
app.post("/products/:id/rating", (req, res) => {
  const productId = req.params.id;
  const { rating } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be between 1 and 5" });
  }

  const sql = `
    UPDATE products 
    SET rating = ((rating * rating_count) + ?) / (rating_count + 1),
        rating_count = rating_count + 1
    WHERE id = ?
  `;

  Connection.query(sql, [rating, productId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Rating added successfully" });
  });
});

// Cookie

app.get("/setcookie", (req, res) => {
    res.cookie("username", "student123").send("Cookie set!");
    app.get("/getcookie", (req, res) => {
        res.send("Cookie value: " + req.cookies.username);
        app.get("/clearcookie", (req, res) => {
            res.clearCookie("username").send("Cookie cleared!");
        });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log('Server Running on Port ${PORT}');
})