const router = require('express').Router();
const controller = require('./controller');
const auth = require('./auth/auth.controller');

function appStatus(req,res) {
    res.status(200).json({
        status: 'application route is working.',
        requesHeaders: req.headers,
        requestBody: req.body,
        requestCookies: req.cookies,
        requestUrl: req.url,
        query: req.query
      });
}

router.use((req, res, next) => {
  console.log(req.method + ' ' + req.url);
  next();
})

router.route('/').get(appStatus).post(appStatus);
router.post('/login', auth.login);
router.post('/signup', auth.signup);

router.get('/refresh', auth.refreshToken);

router.use(auth.verifyToken);


router.get('/geteditdetail', controller.getLastEditDetails);
router.put('/updateeditdetail/:id', controller.updateLastEditDetails);

router.get('/listdb', controller.listDBRoute);

router.get('/orders', controller.getOrders);
router.get('/orders/:id', controller.getOrder);
router.get('/orders/unique/:field', controller.getDistictOrder);
router.post('/orders', controller.addOrder);
router.put('/orders/:id', controller.editOrder);
router.delete('/orders/:id', controller.deleteOrder);

router.get('/cards', controller.getCards);
router.get('/cards/:name', controller.getCard);
router.post('/cards', controller.addCard);
router.put('/cards/:id', controller.editCard);
router.delete('/cards/:id', controller.deleteCard);

router.get('/txns', controller.getTxns);
router.get('/txns/:cname', controller.getTxn);
router.post('/txns', controller.addTxn);
router.put('/txns/:id', controller.editTxn);
router.delete('/txns/:id', controller.deleteTxn);

router.get('/payees', controller.getPayees);
router.post('/payees', controller.addPayee);
router.put('/payees/:id', controller.editPayee);
router.delete('/payees/:id', controller.deletePayee);

router.get('/payments', controller.getPayments);
router.post('/payments', controller.addPayment);
router.put('/payments/:id', controller.editPayment);
router.delete('/payments/:id', controller.deletePayment);

router.get('/getenv', (req,res) => {
  console.log('/getenv route');
  res.status(200).json(process.env);
})

module.exports = router;