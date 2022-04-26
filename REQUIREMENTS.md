# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Users API

* Create
	* Describe: ``Create new user`` 
	* Endpoint: ``/users``
	* Authentication:  ``Not required``
	* HTTP verb:  ``POST``
	* Request body:  ``User`` object
		```javascript
		{
		    "username": "testUser",
		    "password": "testPassword",
		    "firstName": "test",
		    "lastName": "user",
		    "isActive": "true"
		}
		```
	* Response body:  ``User`` object
		```javascript
		{
			"id": "4779a1ad-90b0-4c26-86b7-0f0bab1099a9",
			"username": "testUser",
			"firstName": "test",
			"lastName": "user",
			"isActive": true
		}
		```
		
* Index:
	* Describe: ``Index all users`` 
	* Endpoint: ``/users``
	* Authentication: Require  ``Bareer Token``
	* HTTP verb:  ``GET``
	* Request body:  ``Not required``
	* Response body:   ``Array of User`` object
		```javascript
		[
			{
				"id": "4779a1ad-90b0-4c26-86b7-0f0bab1099a9",
				"username": "testUser",
				"firstName": "test",
				"lastName": "user",
				"isActive": true
			},
			...
		]
		```
		
* Show:
	* Describe: ``Show user with args(user id)`` 
	* Endpoint: ``/users/:id``
	* Authentication: Require  ``Bareer Token``
	* HTTP verb:  ``GET``
	* Request body:  ``Not required``
	* Response body:   ``User`` object
		```javascript
		{
			"id": "4779a1ad-90b0-4c26-86b7-0f0bab1099a9",
			"username": "testUser",
			"firstName": "test",
			"lastName": "user",
			"isActive": true
		}
		```
		
* Update:
	* Describe: ``Update user with args(user id)`` 
	* Endpoint: ``/users/:id``
	* Authentication: Require  ``Bareer Token``
	* HTTP verb:  ``PUT``
	* Request body:  ``Not required``
	* Response body:   ``User`` object with updated values
		```javascript
		{
			"id": "4779a1ad-90b0-4c26-86b7-0f0bab1099a9",
			"username": "testUser",
			"firstName": "test",
			"lastName": "user",
			"isActive": true
		}
		```
		
* Delete:
	* Describe: ``Delete user with args(user id)`` 
	* Endpoint: ``/users/:id``
	* Authentication: Require  ``Bareer Token``
	* HTTP verb:  ``Delete``
	* Request body:  ``Not required``
	* Response body:  Deleted  ``User`` object 
		```javascript
		{
			"id": "4779a1ad-90b0-4c26-86b7-0f0bab1099a9",
			"username": "testUser",
			"firstName": "test",
			"lastName": "user",
			"isActive": true
		}
		```
		
#### Products API 
* Create
	* Describe: ``Create new product`` 
	* Endpoint: ``/products``
	* Authentication:  Require  ``Bareer Token``
	* HTTP verb:  ``POST``
	* Request body:  ``Product`` object
		```javascript
		{
		    "name": "testProduct",
		    "price": 100,
		    "category": "test"
		}
		```
	* Response body:  ``Product`` object
		```javascript
		{
			"id": "24b5f3f6-fbd8-4225-82a1-1863021f0595",
			"name": "testProduct",
			"price": 100,
			"category": "test"
		}
		```
		
* Index:
	* Describe: ``Index all products`` 
	* Endpoint: ``/products``
	* Authentication: ``Not required``
	* HTTP verb:  ``GET``
	* Request body:  ``Not required``
	* Response body:   ``Array of Product`` object
		```javascript
		[
			{
				"id": "24b5f3f6-fbd8-4225-82a1-1863021f0595",
				"name": "testProduct",
				"price": 100,
				"category": "test"
			},
			...
		]
		```
		
* Show:
	* Describe: ``Show product with args(product id)`` 
	* Endpoint: ``/products/show/:id``
	*  Authentication:  ``Not required``
	* HTTP verb:  ``GET``
	* Request body:  ``Not required``
	* Response body:   ``Product`` object
		```javascript
		{
			"id": "24b5f3f6-fbd8-4225-82a1-1863021f0595",
			"name": "testProduct",
			"price": 100,
			"category": "test"
		}
		```

* Top 5 most popular products
	* Describe: ``Top 5 most popular products`` 
	* Endpoint: ``/topfive``
	*  Authentication:  ``Not required``
	* HTTP verb:  ``GET``
	* Request body:  ``Not required``
	* Response body:   ``Array of Product`` of top 5 most popular products 
		```javascript
		[
		  {
		    "id": "afa808c3-dc68-4032-9bea-0ce3a72b7690",
		    "name": "product2",
		    "price": 101,
		    "category": "home",
		    "order_times": "2"
		  },
		  ...
		 ]
		```

* Products by category
	* Describe: ``Show product with category args(category)`` 
	* Endpoint: ``/products/category/:category``
	*  Authentication:  ``Not required``
	* HTTP verb:  ``GET``
	* Request body:  ``Not required``
	* Response body:   ``Array of Product`` object with contain all products of requested category
		```javascript
		[
			{
				"id": "24b5f3f6-fbd8-4225-82a1-1863021f0595",
				"name": "testProduct",
				"price": 100,
				"category": "test"
			},
			...
		]
		```

#### Orders API
* Create
	* Describe: ``Create new order`` 
	* Endpoint: ``/orders``
	* Authentication:  Require  ``Bareer Token``
	* HTTP verb:  ``POST``
	* Request body:  ``Order`` object
		```javascript
		{
		    "user_id": "4779a1ad-90b0-4c26-86b7-0f0bab1099a9",
		    "product_id": "0e4eb4a3-e08c-484e-a41f-befd111d1c72",
		    "quantity": 1,
		    "status": "active"
		}
		```
	* Response body:  ``Order`` object
		```javascript
		{
			 "id": "5a07d5e4-1c10-4861-bd32-0bef17e8f9dd",
			 "user_id": "4779a1ad-90b0-4c26-86b7-0f0bab1099a9",
			 "product_id": "0e4eb4a3-e08c-484e-a41f-befd111d1c72",
			 "quantity": 1,
			 "status": "active"
		}
		```
		
* Active Order
	* Describe: ``Show all active user orders args(user id)`` 
	* Endpoint: ``/orders/active/:id``
	* Authentication:  Require  ``Bareer Token``
	* HTTP verb:  ``GET``
	* Request body:  ``Not required``
	* Response body:  ``Array of Order`` object with status ``active``
		```javascript
		[
			{
				 "id": "5a07d5e4-1c10-4861-bd32-0bef17e8f9dd",
				 "user_id": "4779a1ad-90b0-4c26-86b7-0f0bab1099a9",
				 "status": "active"
				 "total_order_items": "1",
			     "products": [
			       {
			         "name": "product97",
			         "price": 196,
			         "category": "headphone"
			       },
			       ...
			     ]
		 	},
			...
		]
		```

* Completed Orders
 	* Describe: ``Show all completed user orders args(user id)`` 
	* Endpoint: ``/orders/complete/:id``
	* Authentication:  Require  ``Bareer Token``
	* HTTP verb:  ``GET``
	* Request body:  ``Not required``
	* Response body: ``Array of Order`` object with status ``complete``
		```javascript
		[
			{
				 "id": "5a07d5e4-1c10-4861-bd32-0bef17e8f9dd",
				 "user_id": "4779a1ad-90b0-4c26-86b7-0f0bab1099a9",
				 "status": "active"
				 "total_order_items": "1",
			     "products": [
			       {
			         "name": "product97",
			         "price": 196,
			         "category": "headphone"
			       },
			       ...
			     ]
		 	},
			...
		]
		```

#### ProductOrder API
* Create
	* Describe: ``Create new product-order`` 
	* Endpoint: ``/product-order``
	* Authentication:  Require  ``Bareer Token``
	* HTTP verb:  ``POST``
	* Request body:  ``Order`` object
		```javascript
		{
		    "order_id": "4779a1ad-90b0-4c26-86b7-0f0bab1099a9",
		    "product_id": "0e4eb4a3-e08c-484e-a41f-befd111d1c72",
		    "quantity": "active"
		}
		```
	* Response body:  ``Order`` object
		```javascript
		{
			 "id": "5a07d5e4-1c10-4861-bd32-0bef17e8f9dd",
			 "user_id": "4779a1ad-90b0-4c26-86b7-0f0bab1099a9",
			 "status": "active"

			 "total_order_items": "1",
		     "products": [
		       {
		         "name": "product97",
		         "price": 196,
		         "category": "headphone"
		       },
		       ...
		     ]
	 	}
		```

* index
	* Describe: ``Index all product-order`` 
	* Endpoint: ``/product-order``
	* Authentication:  Require  ``Bareer Token``
	* HTTP verb:  ``GET``
	* Request body:  ``Not required`` 
	* Response body:  ``Order`` object
		```javascript
		[
			{
				 "id": "5a07d5e4-1c10-4861-bd32-0bef17e8f9dd",
				 "user_id": "4779a1ad-90b0-4c26-86b7-0f0bab1099a9",
				 "status": "active"
				 "total_order_items": "1",
			     "products": [
			       {
			         "name": "product97",
			         "price": 196,
			         "category": "headphone"
			       },
			       ...
			     ]
		 	},
			...
		]
		```

* show
	* Describe: ``Show product-order by order id`` 
	* Endpoint: ``/product-order/:id``
	* Authentication:  Require  ``Bareer Token``
	* HTTP verb:  ``GET``
	* Request body:  ``Not required`` 
	* Response body:  ``Order`` object
		```javascript
		{
			 "id": "5a07d5e4-1c10-4861-bd32-0bef17e8f9dd",
			 "user_id": "4779a1ad-90b0-4c26-86b7-0f0bab1099a9",
			 "status": "active"

			 "total_order_items": "1",
		     "products": [
		       {
		         "name": "product97",
		         "price": 196,
		         "category": "headphone"
		       },
		       ...
		     ]
	 	}
		```

## Schema
### Products Table
```sql
    CREATE TABLE products(
    id uuid DEFAULT uuid_generate_v4() UNIQUE PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    price INTEGER NOT NULL,
    category VARCHAR(50) NOT NULL
)
```

### Users Table
```sql
CREATE TABLE users(
    id uuid DEFAULT uuid_generate_v4() UNIQUE PRIMARY KEY NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    password VARCHAR(256) NOT NULL,
    isActive BOOLEAN DEFAULT TRUE NOT NULL
)
```

### Orders Table
```sql
CREATE TABLE orders(
    id uuid DEFAULT uuid_generate_v4() UNIQUE PRIMARY KEY NOT NULL,
    user_id uuid  REFERENCES users (id) NOT NULL,
    product_id uuid  REFERENCES products (id) NOT NULL,
    quantity INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL
)
```

### Orders Table
```sql
CREATE TABLE product_order(
  order_id uuid REFERENCES orders(id) NOT NULL,
  product_id uuid REFERENCES products(id) NOT NULL,
  quantity INTEGER NOT NULL,
  PRIMARY KEY (order_id, product_id)
);
)
```

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- username
- password
- firstName
- lastName
- isActive

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

