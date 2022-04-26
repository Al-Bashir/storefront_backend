# Storefront Backend Project

**Table of Contents**
**Table of Contents**
* [Overview](#Overviwe)
* [Requirements](#Requirements)
* [Project structure](#Project_structure)
* [Scripts](#Scripts)
* [Instructions](#Instructions)
	 * [Before startup](#Before_startup_the_app_you_should)
	 * [Application startup](#Application_startup)
	 * [Application testing](#Application_testing)
* [Database schema](#Database_schema)
* [Interfaces](#Interfaces)
	* [User interface](#User_interface)
	 * [Product interfaces](#Product_interface)
	 *  [Order interface](#Order_interface)
* [API](#API)
	 * [Users API](#Users_API)
	 * [Products API](#Products_API)
	 * [Orders API](#Orders_API)
	 * [ProductOrder API](#Orders_API)
* [Contributions](#Contributions)
 
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

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="1168px" viewBox="-0.5 -0.5 1168 462" content="&lt;mxfile host=&quot;Electron&quot; modified=&quot;2022-04-26T18:38:21.240Z&quot; agent=&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) draw.io/17.4.2 Chrome/100.0.4896.60 Electron/18.0.1 Safari/537.36&quot; etag=&quot;xoshj0860qirP6_05e_a&quot; version=&quot;17.4.2&quot; type=&quot;device&quot;&gt;&lt;diagram id=&quot;aVvy9X4y-OBOh9UbMBUV&quot; name=&quot;Page-1&quot;&gt;7V3dcto4GH0aZrIX6eD4h+QyEKftLE26JNndXmVULIy6xnJlUUiffiVbAoNwgifBJpYyzMT+LGRZ5+g7+EiYjj2YLT8SkEy/4ABGnbNusOzYV50z9td12T8eecojVrdn5ZGQoEDE1oE79BvKgiI6RwFMNwpSjCOKks3gGMcxHNONGCAELzaLTXC0edYEhFAJ3I1BpEb/QQGd5tHzs946/gmicCrPbHkX+ZEZkIXFlaRTEOBFIWT7HXtAMKb51mw5gBHvPdkv+fuuS46uGkZgTPd5w2Ly0/r6JZj1+vTb6Ed/nFyf/ndqCXx+gWgurnieQpKKJtMn2Q+s9QnfpOA7D/VTCggVcNldFmAAUIBiSFjAyvajCCQpyornkSmKgiF4wnMqK5J7/QlawmCUo8XLMuCGrDK+yyufsMrvRGP4YRChMGbbY3bt/Ix9AlPWliFIqSghLgsSCpelHWatYGAEhngGKXliRcQbTi0JnSCvY4v9xZoJdk/EpgUWrDAHgn3hqvI1QGxDYFQFL0/B63moRpxy/Skm6DcHKBIdWoQv21+gWQRixmUQbIX6OBu8GQwoigY4whzjGMdQgZkXCghO7gEJIRWBBKOYZh3h9tmLdc2g+8HtuKytA7ZvrffZixcndIDjlBJGJ14HZKguIEe2T3EiKo3gRNZPRMfz7e+YUjyrwoFnhoXKDEGEfXlgH4wGPYUGX/8sJQK7XIpANGL5EcRhNnwx65VJlKWjKQoCGOcjmKdQsIZyB947EVj1+jYc2+P2FYh4uxEpQlARAVHZulsq1wYiln1iQNkYmcdBqsC6aucrkD5XkGblz7rzefbvyr++fBjei8BjCFkCZu15/OWc/MGCDzef/3rwOzwddW9uebGbh+GwFqLIFJ3TpCJv0gSMURwO86LeFpPcgzBpWT62nbdl1j7V1UGtC6Mle2lJ95Ba4jWtJfKzyj40aE5JXtH/F3oqh+ygrY/2MZjx9v59ORp8uhyduN0NnXjfIvH2JNFOFOTgN6LQpChcNC4KdrtFIb8cDUXBUXCdIJLSnaqgqxiUkUM/MVDdQSMGtYvByoZsTg0quI7vUg1KAGi9Gqg2YgSMGOzFDf3EQHUijRjULwZu42JQwTZ8l2JwrqcYyFMWcE1Ami4wCQpicOZ6WqtBCTm0UwNbdReNGtSvBudNq4FdwS98j2pgl6wRab0aqAYgSi/HFP3i7e3f3g79y5tOcQL6fqT1DEIZUfRTBtViTAgO5mNqVpUVYZJriaw9U7jlHSyHG5uvjkVl+cA43kVlturytXxRma2p72ervp9ZVHYQJumn/sYlrOO+8AUtaXxRmd1yk9DW1CSUWaaAq5kt2oMX2umAY/zBI9CBxteROS23Bx1N7UFHtQcTgsa8sZ9v7v2P/khjESgjhX4ioFqBRgRqF4Hm1485FQzGd6kCJQC0XgVUx3DMThji7OrNHcFz3NBPDFTTEZPAPGsgx2PrUQOes2fOtg6XtI2TV8esUD4sjndWyFGdvJbPCjmaentyZamZFXqrWaEyJmmn/a5xA+u4EXxBSxqfFXJb7ga6mrqBruoG8kcNPBblg71G/rU/8m8G/h0P548Z656gQOfbwzLK6CcRxis8AolofMLIbblV6GpqFbqqVchGKp2nxih8gRn6KYFqFIoF5I+ZYfi8LOjhF3ryiz8ib7vdPelxOL/QNX5hHQLuVvcLq6aJ19Gg5Sv/XE3dQWkebE/fbNzkbdzh5bM7ut/fVbcArbelzz7V1cEfYwEegTzssgBrlQev5Ragp6kF6O1aEJh/aC8VCPm1UM0loowy+kmEsQCPQCJ2WYD1SkTLLUBPUwvQUy3An3MQU0T51Ztl42W80E8HegrwMAihNNlYCp3iEMcg8tfRPuHNgTK/r8sMcQYo991+QEqfhC6AOcVcO+gsEkfhEtF/xdv59je+/cEVe1fLwqErqRl5O3njSqEWoRTPyRg+c9FyuR2V6lKavkvuKAmMQPZ4luJp3z45n2uIjXxAxovYlH2UqwmbCw2xkb+I9fK4ORA2bHf9I255Clz/Fp7t/w8=&lt;/diagram&gt;&lt;/mxfile&gt;" onclick="(function(svg){var src=window.event.target||window.event.srcElement;while (src!=null&amp;&amp;src.nodeName.toLowerCase()!='a'){src=src.parentNode;}if(src==null){if(svg.wnd!=null&amp;&amp;!svg.wnd.closed){svg.wnd.focus();}else{var r=function(evt){if(evt.data=='ready'&amp;&amp;evt.source==svg.wnd){svg.wnd.postMessage(decodeURIComponent(svg.getAttribute('content')),'*');window.removeEventListener('message',r);}};window.addEventListener('message',r);svg.wnd=window.open('https://viewer.diagrams.net/?client=1&amp;page=0&amp;edit=_blank');}}})(this);" style="cursor:pointer;max-width:100%;max-height:462px;"><defs><clipPath id="mx-clip-27-150-30-30-0"><rect x="27" y="150" width="30" height="30"/></clipPath><clipPath id="mx-clip-63-150-334-30-0"><rect x="63" y="150" width="334" height="30"/></clipPath><clipPath id="mx-clip-63-180-334-30-0"><rect x="63" y="180" width="334" height="30"/></clipPath><clipPath id="mx-clip-63-210-334-30-0"><rect x="63" y="210" width="334" height="30"/></clipPath><clipPath id="mx-clip-63-240-334-30-0"><rect x="63" y="240" width="334" height="30"/></clipPath><clipPath id="mx-clip-63-270-334-30-0"><rect x="63" y="270" width="334" height="30"/></clipPath><clipPath id="mx-clip-63-300-334-30-0"><rect x="63" y="300" width="334" height="30"/></clipPath><clipPath id="mx-clip-487-30-30-30-0"><rect x="487" y="30" width="30" height="30"/></clipPath><clipPath id="mx-clip-523-30-334-30-0"><rect x="523" y="30" width="334" height="30"/></clipPath><clipPath id="mx-clip-523-60-334-30-0"><rect x="523" y="60" width="334" height="30"/></clipPath><clipPath id="mx-clip-523-90-334-30-0"><rect x="523" y="90" width="334" height="30"/></clipPath><clipPath id="mx-clip-523-120-334-30-0"><rect x="523" y="120" width="334" height="30"/></clipPath><clipPath id="mx-clip-467-360-30-30-0"><rect x="467" y="360" width="30" height="30"/></clipPath><clipPath id="mx-clip-503-360-334-30-0"><rect x="503" y="360" width="334" height="30"/></clipPath><clipPath id="mx-clip-503-390-334-30-0"><rect x="503" y="390" width="334" height="30"/></clipPath><clipPath id="mx-clip-503-420-334-30-0"><rect x="503" y="420" width="334" height="30"/></clipPath><clipPath id="mx-clip-863-220-304-30-0"><rect x="863" y="220" width="304" height="30"/></clipPath><clipPath id="mx-clip-863-250-304-30-0"><rect x="863" y="250" width="304" height="30"/></clipPath><clipPath id="mx-clip-863-280-304-30-0"><rect x="863" y="280" width="304" height="30"/></clipPath></defs><g><path d="M 27 150 L 27 120 L 397 120 L 397 150" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="all"/><path d="M 27 150 L 27 340 L 397 340 L 397 150" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><path d="M 27 150 L 397 150" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><path d="M 57 150 L 57 180 L 57 210 L 57 240 L 57 270 L 57 300 L 57 330" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" font-weight="bold" pointer-events="none" text-anchor="middle" font-size="12px"><text x="211.5" y="139.5">users</text></g><path d="M 27 150 M 397 150 M 397 180 L 27 180" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><path d="M 27 150 M 57 150 M 57 180 M 27 180" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" font-weight="bold" pointer-events="none" clip-path="url(#mx-clip-27-150-30-30-0)" text-anchor="middle" font-size="12px"><text x="41.5" y="169.5">PK</text></g><path d="M 57 150 M 397 150 M 397 180 M 57 180" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" font-weight="bold" text-decoration="underline" pointer-events="none" clip-path="url(#mx-clip-63-150-334-30-0)" font-size="12px"><text x="64.5" y="169.5">id uuid DEFAULT uuid_generate_v4() UNIQUE  NOT NULL</text></g><path d="M 27 180 M 57 180 M 57 210 M 27 210" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><path d="M 57 180 M 397 180 M 397 210 M 57 210" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" pointer-events="none" clip-path="url(#mx-clip-63-180-334-30-0)" font-size="12px"><text x="64.5" y="199.5">username VARCHAR(50) UNIQUE NOT NULL</text></g><path d="M 27 210 M 57 210 M 57 240 M 27 240" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><path d="M 57 210 M 397 210 M 397 240 M 57 240" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" pointer-events="none" clip-path="url(#mx-clip-63-210-334-30-0)" font-size="12px"><text x="64.5" y="229.5">firstname VARCHAR(50) NOT NULL</text></g><path d="M 27 240 M 57 240 M 57 270 M 27 270" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><path d="M 57 240 M 397 240 M 397 270 M 57 270" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" pointer-events="none" clip-path="url(#mx-clip-63-240-334-30-0)" font-size="12px"><text x="64.5" y="259.5">lastname VARCHAR(50) NOT NULL</text></g><path d="M 27 270 M 57 270 M 57 300 M 27 300" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><path d="M 57 270 M 397 270 M 397 300 M 57 300" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" pointer-events="none" clip-path="url(#mx-clip-63-270-334-30-0)" font-size="12px"><text x="64.5" y="289.5">password VARCHAR(256) NOT NULL</text></g><path d="M 27 300 M 57 300 M 57 330 M 27 330" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><path d="M 57 300 M 397 300 M 397 330 M 57 330" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" pointer-events="none" clip-path="url(#mx-clip-63-300-334-30-0)" font-size="12px"><text x="64.5" y="319.5">isActive BOOLEAN DEFAULT TRUE NOT NULL</text></g><path d="M 487 30 L 487 0 L 857 0 L 857 30" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><path d="M 487 30 L 487 160 L 857 160 L 857 30" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><path d="M 487 30 L 857 30" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><path d="M 517 30 L 517 60 L 517 90 L 517 120 L 517 150" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" font-weight="bold" pointer-events="none" text-anchor="middle" font-size="12px"><text x="671.5" y="19.5">products</text></g><path d="M 487 30 M 857 30 M 857 60 L 487 60" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><path d="M 487 30 M 517 30 M 517 60 M 487 60" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" font-weight="bold" pointer-events="none" clip-path="url(#mx-clip-487-30-30-30-0)" text-anchor="middle" font-size="12px"><text x="501.5" y="49.5">PK</text></g><path d="M 517 30 M 857 30 M 857 60 M 517 60" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" font-weight="bold" text-decoration="underline" pointer-events="none" clip-path="url(#mx-clip-523-30-334-30-0)" font-size="12px"><text x="524.5" y="49.5">id uuid DEFAULT uuid_generate_v4() UNIQUE  NOT NULL</text></g><path d="M 487 60 M 517 60 M 517 90 M 487 90" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><path d="M 517 60 M 857 60 M 857 90 M 517 90" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" pointer-events="none" clip-path="url(#mx-clip-523-60-334-30-0)" font-size="12px"><text x="524.5" y="79.5">name VARCHAR(50) NOT NULL</text></g><path d="M 487 90 M 517 90 M 517 120 M 487 120" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><path d="M 517 90 M 857 90 M 857 120 M 517 120" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" pointer-events="none" clip-path="url(#mx-clip-523-90-334-30-0)" font-size="12px"><text x="524.5" y="109.5">price INTEGER NOT NULL</text></g><path d="M 487 120 M 517 120 M 517 150 M 487 150" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><path d="M 517 120 M 857 120 M 857 150 M 517 150" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" pointer-events="none" clip-path="url(#mx-clip-523-120-334-30-0)" font-size="12px"><text x="524.5" y="139.5">category VARCHAR(50) NOT NULL</text></g><path d="M 467 360 L 467 330 L 837 330 L 837 360" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><path d="M 467 360 L 467 460 L 837 460 L 837 360" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><path d="M 467 360 L 837 360" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><path d="M 497 360 L 497 390 L 497 420 L 497 450" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" font-weight="bold" pointer-events="none" text-anchor="middle" font-size="12px"><text x="651.5" y="349.5">orders</text></g><path d="M 467 360 M 837 360 M 837 390 L 467 390" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><path d="M 467 360 M 497 360 M 497 390 M 467 390" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" font-weight="bold" pointer-events="none" clip-path="url(#mx-clip-467-360-30-30-0)" text-anchor="middle" font-size="12px"><text x="481.5" y="379.5">PK</text></g><path d="M 497 360 M 837 360 M 837 390 M 497 390" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" font-weight="bold" text-decoration="underline" pointer-events="none" clip-path="url(#mx-clip-503-360-334-30-0)" font-size="12px"><text x="504.5" y="379.5">id uuid DEFAULT uuid_generate_v4() UNIQUE  NOT NULL</text></g><path d="M 467 390 M 497 390 M 497 420 M 467 420" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><path d="M 497 390 M 837 390 M 837 420 M 497 420" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" pointer-events="none" clip-path="url(#mx-clip-503-390-334-30-0)" font-size="12px"><text x="504.5" y="409.5">user_id uuid  REFERENCES users (id) NOT NULL</text></g><path d="M 467 420 M 497 420 M 497 450 M 467 450" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><path d="M 497 420 M 837 420 M 837 450 M 497 450" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" pointer-events="none" clip-path="url(#mx-clip-503-420-334-30-0)" font-size="12px"><text x="504.5" y="439.5">status VARCHAR(50) NOT NULL</text></g><path d="M 827 220 L 827 190 L 1167 190 L 1167 220" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><path d="M 827 220 L 827 320 L 1167 320 L 1167 220" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><path d="M 827 220 L 1167 220" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><path d="M 857 220 L 857 250 L 857 280 L 857 310" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" font-weight="bold" pointer-events="none" text-anchor="middle" font-size="12px"><text x="996.5" y="209.5">product_order</text></g><path d="M 827 220 M 857 220 M 857 250 M 827 250" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><path d="M 857 220 M 1167 220 M 1167 250 M 857 250" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" pointer-events="none" clip-path="url(#mx-clip-863-220-304-30-0)" font-size="12px"><text x="864.5" y="239.5">order_id uuid REFERENCES orders(id) NOT NULL</text></g><path d="M 827 250 M 857 250 M 857 280 M 827 280" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><path d="M 857 250 M 1167 250 M 1167 280 M 857 280" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" pointer-events="none" clip-path="url(#mx-clip-863-250-304-30-0)" font-size="12px"><text x="864.5" y="269.5">product_id uuid REFERENCES products(id) NOT NULL</text></g><path d="M 827 280 M 857 280 M 857 310 M 827 310" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><path d="M 857 280 M 1167 280 M 1167 310 M 857 310" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="square" stroke-miterlimit="10" pointer-events="none"/><g fill="rgb(0, 0, 0)" font-family="Helvetica" pointer-events="none" clip-path="url(#mx-clip-863-280-304-30-0)" font-size="12px"><text x="864.5" y="299.5">quantity INTEGER NOT NULL</text></g><path d="M 467 375 L 447 375 L 447 235 L 820.63 235" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><path d="M 825.88 235 L 818.88 238.5 L 820.63 235 L 818.88 231.5 Z" fill="rgb(0, 0, 0)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><path d="M 487 45 L 467 45 L 467 265 L 820.63 265" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><path d="M 825.88 265 L 818.88 268.5 L 820.63 265 L 818.88 261.5 Z" fill="rgb(0, 0, 0)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><path d="M 27 165 L 7 165 L 7 405 L 460.63 405" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/><path d="M 465.88 405 L 458.88 408.5 L 460.63 405 L 458.88 401.5 Z" fill="rgb(0, 0, 0)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="none"/></g></svg>

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
	status: string;
	products?: Product[];
	total_order_items?: number;
}
```
#### ProductOrder interface
```javascript
interface  ProductOrder {
	order_id: string;
	product_id: string;
	quantity: number;
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

## Contributions
**Acknowledgments**
* Udacity
* FWD initiative

**Author**
Mohamed Al-Bashir