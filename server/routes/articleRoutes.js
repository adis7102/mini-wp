const router = require('express').Router()
const images = require('../helpers/image')
const articleController = require('../controllers/articleController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', articleController.findAll)
router.use(authentication)
router.post('/', articleController.create)
router.get('/:id', articleController.findOne)
router.get('/getAll/myarticle', articleController.findMyArticles)
router.delete('/:id', authorization, articleController.delete)
router.patch('/:id', authorization, articleController.update)

router.post('/upload', images.multer.single('image'), images.sendUploadToGCS,
  (req, res) => {
    res.status(200).json(req.file.cloudStoragePublicUrl)
  })

module.exports = router