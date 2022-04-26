
CREATE TABLE product_order(
  order_id uuid REFERENCES orders(id) NOT NULL,
  product_id uuid REFERENCES products(id) NOT NULL,
  quantity INTEGER NOT NULL,
  PRIMARY KEY (order_id, product_id)
);