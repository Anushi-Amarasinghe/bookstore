const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('projectDB.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

// Create the tables
db.serialize(() => {
    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS Users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        email TEXT NOT NULL,
        first_name TEXT,
        last_name TEXT,
        phone_number TEXT,
        type TEXT DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    // Books table
    db.run(`CREATE TABLE IF NOT EXISTS Books (
        book_id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT,
        publisher TEXT,
        genre TEXT,
        subGenre TEXT,
        publication_date DATE,
        ISBN TEXT UNIQUE,
        price REAL NOT NULL,
        stock_quantity INTEGER DEFAULT 0,
        description TEXT,
        cover_image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    // ShoppingCart table
    db.run(`CREATE TABLE IF NOT EXISTS ShoppingCart (
        cart_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES Users(user_id)
    )`);

    // CartItems table
    db.run(`CREATE TABLE IF NOT EXISTS CartItems (
        cart_item_id INTEGER PRIMARY KEY AUTOINCREMENT,
        cart_id INTEGER NOT NULL,
        book_id INTEGER NOT NULL,
        quantity INTEGER DEFAULT 1,
        FOREIGN KEY (cart_id) REFERENCES ShoppingCart(cart_id),
        FOREIGN KEY (book_id) REFERENCES Books(book_id)
    )`);

    // // PaymentMethods table
    // db.run(`CREATE TABLE IF NOT EXISTS PaymentMethods (
    //     payment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     payment_method TEXT NOT NULL,
    //     card_number TEXT,
    //     card_expiry_date TEXT,
    //     card_holder_name TEXT,
    //     CVC TEXT
    // )`);

    // // ShippingAddresses table
    // db.run(`CREATE TABLE IF NOT EXISTS ShippingAddresses (
    //     address_id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     order_id INTEGER NOT NULL,
    //     address_line1 TEXT NOT NULL,
    //     city TEXT NOT NULL,
    //     state TEXT NOT NULL,
    //     postal_code TEXT NOT NULL,
    //     country TEXT NOT NULL,
    //     phone_number TEXT,
    //     FOREIGN KEY (order_id) REFERENCES Orders(order_id)
    // )`);

    // Orders table
    db.run(`CREATE TABLE IF NOT EXISTS Orders (
        order_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status TEXT NOT NULL,
        total_amount REAL NOT NULL,
        payment_id INTEGER NULL,
        shipping_id INTEGER NULL,
        FOREIGN KEY (user_id) REFERENCES Users(user_id),
        FOREIGN KEY (payment_id) REFERENCES PaymentMethods(payment_id),
        FOREIGN KEY (shipping_id) REFERENCES ShippingAddresses(address_id)
    )`);

    // OrderItems table
    db.run(`CREATE TABLE IF NOT EXISTS OrderItems (
        order_item_id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        book_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,
        FOREIGN KEY (order_id) REFERENCES Orders(order_id),
        FOREIGN KEY (book_id) REFERENCES Books(book_id)
    )`);

    // OrderHistory table
    // db.run(`CREATE TABLE IF NOT EXISTS OrderHistory (
    //     history_id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     order_id INTEGER NOT NULL,
    //     status TEXT NOT NULL,
    //     status_change_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    //     FOREIGN KEY (order_id) REFERENCES Orders(order_id)
    // )`);

    // UserReviews table
    // db.run(`CREATE TABLE IF NOT EXISTS UserReviews (
    //     review_id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     user_id INTEGER NOT NULL,
    //     book_id INTEGER NOT NULL,
    //     rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    //     review_text TEXT,
    //     review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    //     FOREIGN KEY (user_id) REFERENCES Users(user_id),
    //     FOREIGN KEY (book_id) REFERENCES Books(book_id)
    // )`);

    // UserMessage table
    db.run(`
      CREATE TABLE IF NOT EXISTS UserMessages (
        message_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            
      );
    `);
    
  

    // Bestsellers table
    db.run(`CREATE TABLE IF NOT EXISTS Bestsellers (
        bestseller_id INTEGER PRIMARY KEY AUTOINCREMENT,
        book_id INTEGER NOT NULL,
        FOREIGN KEY (book_id) REFERENCES Books(book_id)
    )`);

    db.run(`INSERT INTO Users (username, password_hash, email, first_name, last_name, phone_number, type)
    VALUES ('admin', '$2a$10$3snEfgGIYtXdF3sUOBGUdOqaWuxTlpEMUMmx81c.88kDGZ18LyBzW', 'admin@example.com', 'Admin', 'User', '1234567890', 'admin')`,);

});
const books = [
   {
    title: "Garfield: The Fat Cat 3-Pack",
    author: "Jim Davis",
    publisher: "Ballantine Books",
    genre: "Comics",
    subGenre: "Humor",
    publication_date: "1993-09-12",
    ISBN: "9780345386549",
    price: 14.99,
    stock_quantity: 40,
    description: "A collection of three Garfield comic books featuring the lazy orange cat.",
    cover_image_url: "images/garfield.jpg"
  },
  {
    title: "Calvin and Hobbes: The Essential Collection",
    author: "Bill Watterson",
    publisher: "Andrews McMeel Publishing",
    genre: "Comics",
    subGenre: "Adventure",
    publication_date: "1995-10-17",
    ISBN: "9780836204384",
    price: 19.99,
    stock_quantity: 35,
    description: "The adventures of a mischievous boy and his imaginary tiger friend.",
    cover_image_url: "images/calvin_hobbes.jpg"
  },
  {
    title: "The Complete Peanuts Vol. 1",
    author: "Charles M. Schulz",
    publisher: "Fantagraphics Books",
    genre: "Comics",
    subGenre: "Classic",
    publication_date: "2004-05-25",
    ISBN: "9781560975892",
    price: 29.99,
    stock_quantity: 25,
    description: "A complete collection of Peanuts strips featuring Charlie Brown, Snoopy, and friends.",
    cover_image_url: "images/peanuts.jpg"
  },
  {
    title: "Tintin in Tibet",
    author: "Hergé",
    publisher: "Casterman",
    genre: "Comics",
    subGenre: "Adventure",
    publication_date: "1960-10-01",
    ISBN: "9781405206235",
    price: 12.99,
    stock_quantity: 30,
    description: "Tintin and his dog Snowy embark on an adventure in Tibet to rescue a lost friend.",
    cover_image_url: "images/tintin_tibet.jpg"
  },
  {
    title: "Asterix and Cleopatra",
    author: "René Goscinny",
    publisher: "Dargaud",
    genre: "Comics",
    subGenre: "Historical",
    publication_date: "1965-01-01",
    ISBN: "9780752866079",
    price: 10.99,
    stock_quantity: 20,
    description: "Asterix and Obelix travel to Egypt to help build a palace for Cleopatra.",
    cover_image_url: "images/asterix_cleopatra.jpg"
  }
   
];

// const bestsellers = [
//   {
//       book_id: 8,
//   },
//   {
//       book_id: 6,
//   },
//   {
//       book_id: 10,
//   },
//   {
//       book_id: 16,
//   },
//   {
//       book_id: 5,
//   }
// ];

// SQL Insert Statement
const insertBookQuery = `
  INSERT INTO Books (title, author, publisher, genre, subGenre, publication_date, ISBN, price, stock_quantity, description, cover_image_url)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

// Insert books one by one
cartoonBooks.forEach((book) => {
  db.run(insertBookQuery, [
    book.title,
    book.author,
    book.publisher,
    book.genre,
    book.subGenre,
    book.publication_date,
    book.ISBN,
    book.price,
    book.stock_quantity,
    book.description,
    book.cover_image_url
  ], (err) => {
    if (err) {
      console.error("Error inserting book:", err.message);
    } else {
      console.log(`Inserted: ${book.title}`);
    }
  });
});

db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Close the database connection.');
});
