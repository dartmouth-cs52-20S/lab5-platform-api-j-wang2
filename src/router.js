import { Router } from 'express';
import * as Posts from './controllers/post_controller';


const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

///your routes will go here
router.route('/posts')
    .post()
    .get()

router.route('/posts/:id')
    .post()
    .get()
    .delete()

export default router;
