#Server

I use Javascript, Express.js, Nodejs in order to create my Back-end side. Inside the server,the main
directory is src which contains controllers, database, routes, services, index,js, etc. The routes involve the
file cryptoRoutes.js with my necessary routes for my request. The controllers have the cryptoController.js
file which try my request and return the data.  The services have the cryptoService.js file which involve a
middleware, so as helps my app to success better control.The database directory contains my queries to CoinGecko
API. I use (https://github.com/miscavage/CoinGecko-API) for my queries. Finally, the index.js run my code.

##Run:

```bash
 git clone git@github.com:alkosmas92/Cyberscope-Junior-Full-Stack-Assignment.git
 cd Cyberscope-Junior-Full-Stack-Assignment
 cd server
 npm install
 npm run dev
```
http://localhost:3000/

#Client

I use Javascript and React.js with Parcel bundler in order to create the Front-End side. Inside the 
client, I have a directory src which is the main part of my code. The main contains of src directory 
is my components App.js, Market.js , MarketId.js which create the main part of my app interface with 
necessary style and fetches of data. In addition, the scr directory have the styled components in the
directory style. Also, I have the function paginate(https://www.zacfukuda.com/blog/pagination-algorithm)
inside the functions' directory.


if you have clone the repository:
##Run:
```bash
 cd client
 npm install
 npm run dev
```
run in your Browser:
http://localhost:1234/markets/coins

#Test

I use Jest in order to test my functions in cryptoService.js. I have four test you can check it:

if you have clone the repository:
##Run:
```bash
 cd lib
 npm install
 npm run test
```






