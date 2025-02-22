import { Router } from 'express';
import * as Posts from './controllers/post_controller';
import * as UserController from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

router.post('/signin', requireSignin, UserController.signin);
// router.post('/signin', UserController.signin);

router.post('/signup', UserController.signup);

// your routes will go here
router.route('/posts')
    .post(requireAuth, Posts.createPost)
    .get((req, res) => {
        Posts.getPosts(req, res);
    });

router.route('/posts/:id')
    .put(requireAuth, (req, res) => {
        Posts.updatePost(req, res);
    })
    .get((req, res) => {
        Posts.getPost(req, res);
    })
    .delete(requireAuth, (req, res) => {
        Posts.deletePost(req, res);
    });

export default router;
