#Facebook parser
This parser get facebook group members from this page `https://m.facebook.com/graphsearch/184829834894371/likers?source=pivot` using puppeteer.
I use this data to create something like facemash, so the code is desired to solve my problem and you will have to modify it to make it work for you.
I hope that the code could be helpful to someone, guys.

#Preparing
1. Create `enviroment` directory in the project's root folder using `enviroment-example` as a boilerplate
2. Specify your facebook login and password in `enviroment.ts`
3. Specify the storage type in Storage variable ('firebase' or 'file') to save parsing results into DB on firebase.google or in .txt file
If you want to use firebase, you have to specify `FirebaseCredentials` in `enviroment.ts`
4. Install node
5. Run `npm i` in the root

#Running
1. Run `npm i parse` in the root. 
   If something goes wrong try `npm i serve` again. Sometimes facebook is trying to defend himself or puppeteer if failing. And the code is far from perfect =) 
2. Followers will be saved into `users.txt` (if ENVIROMENT.Storage === 'file') of in the firebase collection firebase.google. It is saving user ID, FIRST_NAME and SECOND_NAME.
3. Screenshots will be saved into `screenshots` folder. Sometimes the help you understand what is going on in the puppeteer.