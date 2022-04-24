# Storefront Backend Project

**Table of Contents**
- [Storefront Backend Project](#storefront-backend-project)
	- [Overview](#overview)
	- [Requirements](#requirements)
	- [Project structure](#project-structure)
	- [Scripts](#scripts)
	- [Instructions](#instructions)
			- [Before startup the app you should](#before-startup-the-app-you-should)
			- [Application startup](#application-startup)
			- [Application testing](#application-testing)
	- [Database schema](#database-schema)
	- [Interfaces](#interfaces)
			- [User interface](#user-interface)
			- [Product interface](#product-interface)
			- [Order interface](#order-interface)
	- [API](#api)
			- [Users API](#users-api)
			- [Products API](#products-api)
			- [Orders API](#orders-api)
	- [Contributions](#contributions)
 
##  Overview
 The project is web app built to serve as backend for Storefront project with restful API to route to three models and pre-created database tables schema through db-migrate. The project also have error handler system that return custom error for user and log all errors into database for further investigation.

## Requirements
**Before stating you should have:**
* NodeJS installed on your machine
* PostgreSQL  installed on your machine
 
##  Project structure
```
storefront_backend
 ├── migrations/ (all migrations files) 
 ├── spec/ (jasmine spec files) 
 ├── src/ (project typescript source code) 
 │ ├── app/ (main express app) 
 │ ├── config/ (environment variables and database configurations) 
 │ ├── controller/ (controller perform data processing before pass data to the models) 
 │ ├── middleware/ (Authentication and Error Handler middelwares) 
 │ ├── models / (user, product and order models that process CRUD operations) 
 │ ├── routes/ (restfull API routes) 
 │ │ ├── routeHandler.ts (route handdler) 
 │ │ └── api/ (user, product and order API routes) 
 │ ├── tests/ (all project test cases) 
 │ │ ├── helpers/ (jasmine helpers) 
 │ │ ├── configSpec/ (database connection test case) 
 │ │ ├── modelSpec/ (user, product and order test cases) 
 │ │ ├── routesSpec/ (API routes test cases) 
 │ │ └── indexSpec.ts (server status test case) 
 │ └── utility/ (password and jwt (token) utilities functions) 
 └── server.ts (server configuration)
 ├── tsconfig.json (TypeScript configration) 
 ├── eslint.js (Eslint configration) 
 ├── .prettierignore (Prettier ignore) 
 ├── .prettierrc.json (Prettier configration) 
 ├── .env (environment variables file) 
 └── database.json (db-migrate database configrations)
```
##  Scripts
```json
{
	"scripts": {
		"tsc": "tsc", //to compile typeScript
		"start": "node build/server.js", //to start the server
		"prettier": "prettier --write src/**/*.ts", //to formate the code
		"eslint": "eslint src/**/*.ts", //to check the code by eslint
		"jasmine": "jasmine", //to testing the code
		"init-db": "db-migrate up", //to create migration tables for dev database
		"down-db": "db-migrate down", //to drop migration tables for dev database
		"init-test-db": "set APP_ENV=test&& db-migrate --env test up", //to create migration tables for test database
		"down-test-db": "set APP_ENV=test&& db-migrate reset", //to drop migration tables for test database
		"dev": "npm run prettier && npm run eslint && rimraf build/* && npm run tsc && npm run start", //one script for setup and run server for development
		"test": "set APP_ENV=test&& npm run init-test-db && npm run prettier && npm run eslint && rimraf build/* && npm run tsc && npm run jasmine && npm run down-test-db" ////one script for setup and run server for testing
	}
}
```

## Instructions

#### Before startup the app you should

* install node dependencies by using command: 
	```bash
	npm install
	```
* crate postgreSQL database for development  with name ```storefront_dev_db```
* crate postgreSQL database for testing with name ```storefront_dev_db```
* setup dev database schema through db-migrate by run command:
	```bash
	npm run init-db
	``` 
* check .env file if you need to make any modification  
	
#### Application startup
* startup the server for development  by run command:
	```bash
	npm run dev
	``` 
* you can access server on ``localhost:3000``
#### Application testing
* startup unit testing by run command:
	```bash
	npm run test
	``` 
## Database schema

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="911px" viewBox="-0.5 -0.5 911 481" content="&lt;mxfile host=&quot;app.diagrams.net&quot; modified=&quot;2022-04-23T23:37:35.720Z&quot; agent=&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36&quot; etag=&quot;C84rzKbU7YBr6evvojEc&quot; version=&quot;17.4.6&quot; type=&quot;device&quot;&gt;&lt;diagram id=&quot;aVvy9X4y-OBOh9UbMBUV&quot; name=&quot;Page-1&quot;&gt;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&lt;/diagram&gt;&lt;/mxfile&gt;" onclick="(function(svg){var src=window.event.target||window.event.srcElement;while (src!=null&amp;&amp;src.nodeName.toLowerCase()!='a'){src=src.parentNode;}if(src==null){if(svg.wnd!=null&amp;&amp;!svg.wnd.closed){svg.wnd.focus();}else{var r=function(evt){if(evt.data=='ready'&amp;&amp;evt.source==svg.wnd){svg.wnd.postMessage(decodeURIComponent(svg.getAttribute('content')),'*');window.removeEventListener('message',r);}};window.addEventListener('message',r);svg.wnd=window.open('https://viewer.diagrams.net/?client=1&amp;page=0&amp;edit=_blank');}}})(this);" style="cursor:pointer;max-width:100%;max-height:481px;"><defs><clipPath id="mx-clip-540-30-30-30-0"><rect x="540" y="30" width="30" height="30"/></clipPath><clipPath id="mx-clip-576-30-334-30-0"><rect x="576" y="30" width="334" height="30"/></clipPath><clipPath id="mx-clip-576-60-334-30-0"><rect x="576" y="60" width="334" height="30"/></clipPath><clipPath id="mx-clip-576-90-334-30-0"><rect x="576" y="90" width="334" height="30"/></clipPath><clipPath id="mx-clip-576-120-334-30-0"><rect x="576" y="120" width="334" height="30"/></clipPath><clipPath id="mx-clip-576-150-334-30-0"><rect x="576" y="150" width="334" height="30"/></clipPath><clipPath id="mx-clip-576-180-334-30-0"><rect x="576" y="180" width="334" height="30"/></clipPath><clipPath id="mx-clip-515-350-30-30-0"><rect x="515" y="350" width="30" height="30"/></clipPath><clipPath id="mx-clip-551-350-339-30-0"><rect x="551" y="350" width="339" height="30"/></clipPath><clipPath id="mx-clip-551-380-339-30-0"><rect x="551" y="380" width="339" height="30"/></clipPath><clipPath id="mx-clip-551-410-339-30-0"><rect x="551" y="410" width="339" height="30"/></clipPath><clipPath id="mx-clip-551-440-339-30-0"><rect x="551" y="440" width="339" height="30"/></clipPath><clipPath id="mx-clip-0-100-30-30-0"><rect x="0" y="100" width="30" height="30"/></clipPath><clipPath id="mx-clip-36-100-354-30-0"><rect x="36" y="100" width="354" height="30"/></clipPath><clipPath id="mx-clip-0-130-30-30-0"><rect x="0" y="130" width="30" height="30"/></clipPath><clipPath id="mx-clip-36-130-354-30-0"><rect x="36" y="130" width="354" height="30"/></clipPath><clipPath id="mx-clip-0-160-30-30-0"><rect x="0" y="160" width="30" height="30"/></clipPath><clipPath id="mx-clip-36-160-354-30-0"><rect x="36" y="160" width="354" height="30"/></clipPath><clipPath id="mx-clip-36-190-354-30-0"><rect x="36" y="190" width="354" height="30"/></clipPath><clipPath id="mx-clip-36-220-334-65-0"><rect x="36" y="220" width="334" height="65"/></clipPath></defs><g><path d="M 540 30 L 540 0 L 910 0 L 910 30" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="all"/><path d="M 540 30 L 540 220 L 910 220 L 910 30" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><path d="M 540 30 L 910 30" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><path d="M 570 30 L 570 60 L 570 90 L 570 120 L 570 150 L 570 180 L 570 210" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" font-weight="bold" pointer-events="none" text-anchor="middle" font-size="12px"><text x="724.5" y="19.5">users</text></g><path d="M 540 30 M 910 30 M 910 60 L 540 60" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><path d="M 540 30 M 570 30 M 570 60 M 540 60" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" font-weight="bold" pointer-events="none" clip-path="url(#mx-clip-540-30-30-30-0)" text-anchor="middle" font-size="12px"><text x="554.5" y="49.5">PK</text></g><path d="M 570 30 M 910 30 M 910 60 M 570 60" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" font-weight="bold" text-decoration="underline" pointer-events="none" clip-path="url(#mx-clip-576-30-334-30-0)" font-size="12px"><text x="577.5" y="49.5">id uuid DEFAULT uuid_generate_v4() UNIQUE  NOT NULL</text></g><path d="M 540 60 M 570 60 M 570 90 M 540 90" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><path d="M 570 60 M 910 60 M 910 90 M 570 90" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" pointer-events="none" clip-path="url(#mx-clip-576-60-334-30-0)" font-size="12px"><text x="577.5" y="79.5">username VARCHAR(50) UNIQUE NOT NULL</text></g><path d="M 540 90 M 570 90 M 570 120 M 540 120" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><path d="M 570 90 M 910 90 M 910 120 M 570 120" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" pointer-events="none" clip-path="url(#mx-clip-576-90-334-30-0)" font-size="12px"><text x="577.5" y="109.5">firstname VARCHAR(50) NOT NULL</text></g><path d="M 540 120 M 570 120 M 570 150 M 540 150" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><path d="M 570 120 M 910 120 M 910 150 M 570 150" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" pointer-events="none" clip-path="url(#mx-clip-576-120-334-30-0)" font-size="12px"><text x="577.5" y="139.5">lastname VARCHAR(50) NOT NULL</text></g><path d="M 540 150 M 570 150 M 570 180 M 540 180" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><path d="M 570 150 M 910 150 M 910 180 M 570 180" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" pointer-events="none" clip-path="url(#mx-clip-576-150-334-30-0)" font-size="12px"><text x="577.5" y="169.5">password VARCHAR(256) NOT NULL</text></g><path d="M 540 180 M 570 180 M 570 210 M 540 210" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><path d="M 570 180 M 910 180 M 910 210 M 570 210" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" pointer-events="none" clip-path="url(#mx-clip-576-180-334-30-0)" font-size="12px"><text x="577.5" y="199.5">isActive BOOLEAN DEFAULT TRUE NOT NULL</text></g><path d="M 515 350 L 515 320 L 890 320 L 890 350" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><path d="M 515 350 L 515 480 L 890 480 L 890 350" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><path d="M 515 350 L 890 350" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><path d="M 545 350 L 545 380 L 545 410 L 545 440 L 545 470" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" font-weight="bold" pointer-events="none" text-anchor="middle" font-size="12px"><text x="702" y="339.5">products</text></g><path d="M 515 350 M 890 350 M 890 380 L 515 380" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><path d="M 515 350 M 545 350 M 545 380 M 515 380" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" font-weight="bold" pointer-events="none" clip-path="url(#mx-clip-515-350-30-30-0)" text-anchor="middle" font-size="12px"><text x="529.5" y="369.5">PK</text></g><path d="M 545 350 M 890 350 M 890 380 M 545 380" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" font-weight="bold" text-decoration="underline" pointer-events="none" clip-path="url(#mx-clip-551-350-339-30-0)" font-size="12px"><text x="552.5" y="369.5">id uuid DEFAULT uuid_generate_v4() UNIQUE  NOT NULL</text></g><path d="M 515 380 M 545 380 M 545 410 M 515 410" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><path d="M 545 380 M 890 380 M 890 410 M 545 410" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" pointer-events="none" clip-path="url(#mx-clip-551-380-339-30-0)" font-size="12px"><text x="552.5" y="399.5">name VARCHAR(50) NOT NULL</text></g><path d="M 515 410 M 545 410 M 545 440 M 515 440" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><path d="M 545 410 M 890 410 M 890 440 M 545 440" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" pointer-events="none" clip-path="url(#mx-clip-551-410-339-30-0)" font-size="12px"><text x="552.5" y="429.5">price INTEGER NOT NULL</text></g><path d="M 515 440 M 545 440 M 545 470 M 515 470" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><path d="M 545 440 M 890 440 M 890 470 M 545 470" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" pointer-events="none" clip-path="url(#mx-clip-551-440-339-30-0)" font-size="12px"><text x="552.5" y="459.5">category VARCHAR(50) NOT NULL</text></g><path d="M 0 100 L 0 70 L 390 70 L 390 100" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><path d="M 0 100 L 0 285 L 390 285 L 390 100" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><path d="M 0 100 L 390 100" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><path d="M 30 100 L 30 130 L 30 160 L 30 190 L 30 220 L 30 285" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><path d="M 370 100 L 370 285" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" font-weight="bold" pointer-events="none" text-anchor="middle" font-size="12px"><text x="194.5" y="89.5">orders</text></g><path d="M 0 100 M 390 100 M 390 130 L 0 130" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><path d="M 0 100 M 30 100 M 30 130 M 0 130" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" font-weight="bold" pointer-events="none" clip-path="url(#mx-clip-0-100-30-30-0)" text-anchor="middle" font-size="12px"><text x="14.5" y="119.5">PK</text></g><path d="M 30 100 M 390 100 M 390 130 M 30 130" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" font-weight="bold" text-decoration="underline" pointer-events="none" clip-path="url(#mx-clip-36-100-354-30-0)" font-size="12px"><text x="37.5" y="119.5">id uuid DEFAULT uuid_generate_v4() UNIQUE  NOT NULL</text></g><path d="M 0 130 M 30 130 M 30 160 M 0 160" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" pointer-events="none" clip-path="url(#mx-clip-0-130-30-30-0)" text-anchor="middle" font-size="12px"><text x="14.5" y="149.5">FK 1</text></g><path d="M 30 130 M 390 130 M 390 160 M 30 160" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" pointer-events="none" clip-path="url(#mx-clip-36-130-354-30-0)" font-size="12px"><text x="37.5" y="149.5">user_id uuid  REFERENCES users (id) NOT NULL</text></g><path d="M 0 160 M 30 160 M 30 190 M 0 190" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" pointer-events="none" clip-path="url(#mx-clip-0-160-30-30-0)" text-anchor="middle" font-size="12px"><text x="14.5" y="179.5">FK 2</text></g><path d="M 30 160 M 390 160 M 390 190 M 30 190" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" pointer-events="none" clip-path="url(#mx-clip-36-160-354-30-0)" font-size="12px"><text x="37.5" y="179.5">product_id uuid  REFERENCES products (id) NOT NULL</text></g><path d="M 0 190 M 30 190 M 30 220 M 0 220" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><path d="M 30 190 M 390 190 M 390 220 M 30 220" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" pointer-events="none" clip-path="url(#mx-clip-36-190-354-30-0)" font-size="12px"><text x="37.5" y="209.5">quantity INTEGER NOT NULL</text></g><path d="M 0 220 M 30 220 M 30 285 M 0 285" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><path d="M 30 220 M 370 220 M 370 285 M 30 285" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" pointer-events="none" clip-path="url(#mx-clip-36-220-334-65-0)" font-size="12px"><text x="37.5" y="257">status VARCHAR(50) NOT NULL</text></g><ellipse cx="380" cy="252.5" rx="3" ry="3" fill="rgb(0, 0, 0)" stroke="none" pointer-events="none"/><path d="M 390 175 L 452.5 175 L 452.5 365 L 508.63 365" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><path d="M 513.88 365 L 506.88 368.5 L 508.63 365 L 506.88 361.5 Z" fill="rgb(0, 0, 0)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><path d="M 390 145 L 465 145 L 465 45 L 533.63 45" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><path d="M 538.88 45 L 531.88 48.5 L 533.63 45 L 531.88 41.5 Z" fill="rgb(0, 0, 0)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/></g></svg>

## Interfaces
#### User interface
```javascript
interface  User = {
	id?: string;
	username: string;
	password: string;
	firstName?: string;
	lastName?: string;
	isActive?: boolean;
	token?: string;
};
```
#### Product interface
```javascript
interface  Product {
	id?: string;
	name: string;
	price: number;
	category: string;
}
```
#### Order interface
```javascript
interface  Order {
	id?: string;
	user_id: string;
	product_id: string;
	quantity: number;
	status: string;
}
```
## API
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
		    "isActive": "true
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
	* Response body:   ``Array of Product.name`` of top 5 most popular products 
		```javascript
		[
		  {
		    "name": "product7"
		  },
		  {
		    "name": "product8"
		  },
		  {
		    "name": "product12"
		  },
		  {
		    "name": "product13"
		  },
		  {
		    "name": "product14"
		  }
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
				 "product_id": "0e4eb4a3-e08c-484e-a41f-befd111d1c72",
				 "quantity": 1,
				 "status": "active"
			},
			...
		]
		```

* Completed Orders
 	* Describe: ``Show all completed user orders args(user id)`` 
	* Endpoint: ``/orders//complete/:id``
	* Authentication:  Require  ``Bareer Token``
	* HTTP verb:  ``GET``
	* Request body:  ``Not required``
	* Response body: ``Array of Order`` object with status ``complete``
		```javascript
		[
			{
				 "id": "5a07d5e4-1c10-4861-bd32-0bef17e8f9dd",
				 "user_id": "4779a1ad-90b0-4c26-86b7-0f0bab1099a9",
				 "product_id": "0e4eb4a3-e08c-484e-a41f-befd111d1c72",
				 "quantity": 1,
				 "status": "active"
			},
			...
		]
		```

## Contributions
**Acknowledgments**
* Udacity
* FWD initiative

**Author**
Mohamed Al-Bashir