import { Router } from 'express';
import User from './app/models/Users';
import Student from './app/models/Students';

const routes = new Router();

routes.post('/', async (req, res) => {
  const user = await User.create({
    name: 'Abner 01',
    email: 'abner@gmail.com',
    password_hash: '123123',
  });
  return res.json(user);
});


routes.post('/students', async (req, res) => {
  const student = await Student.create({
    name: 'Abner Student',
    email: 'abner_student@gmail.com',
    age: 35,
    weight: 110.2,
    height: 170

  });
  return res.json(student);
});

export default routes;

