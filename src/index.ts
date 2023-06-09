import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './components/router';
import { connectToDatabase, db } from './components/config/database';
import { createorder, deletuser, getAllUsers } from './components/Auth.tsx/AuthCotroller';
import { registerUserViaMobile } from './components/modals/User';
const PORT = 8092
const application = express();
application.use(express.json());
const corsConfig = {
  origin: '*',
  methods: '*',
};

application.use(cors(corsConfig));
application.use(helmet.xssFilter());

application.use('/', router);

connectToDatabase()
console.log(" data base --->>", connectToDatabase())
console.log("usercreated db ======>>> " ,getAllUsers())
// getAllUsers()
// deletuser()
createorder()
application.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});