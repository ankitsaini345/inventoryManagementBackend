const router = require('express').Router();

const controller = require('./controller');
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
router.route('/').get(appStatus).post(appStatus);
  
router.get('/listdb', controller.listDBRoute);

router.get('/orders', controller.getOrders);
router.get('/orders/:id', controller.getOrder);
router.get('/orders/unique/:field', controller.getDistictOrder);
router.post('/orders', controller.addOrder);
router.put('/orders/:id', controller.editOrder);
router.delete('/orders/:id', controller.deleteOrder);

router.get('/cards', controller.getCards);
router.get('/cards/:id', controller.getCard);
router.post('/cards', controller.addCard);
router.put('/cards/:id', controller.editCard);
router.delete('/cards/:id', controller.deleteCard);

router.get('/txns', controller.getTxns);
router.get('/txns/:cname', controller.getTxn);
router.post('/txns', controller.addTxn);
router.put('/txns/:id', controller.editTxn);
router.delete('/txns/:id', controller.deleteTxn);

module.exports = router;