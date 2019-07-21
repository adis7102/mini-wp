const Article = require('../models/article')

class ArticleController {

    static findAll(req, res, next){
        // console.log(req.decoded.id)
        // console.log('masuk controller findAll')
        // console.log(req.decoded.id)    
        Article.find(/* { UserId : req.decoded.id } */)
        .then(data => {
            console.log(data)
            res.status(200).json(data)
        })
        .catch(next)
    }

    static findOne(req, res, next){
        Article.findOne({ _id : req.params.id })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static findMyArticles(req, res, next){
        console.log('hahahahahahahahahahahahahahahahahahahahaha')
        console.log(req.decoded.id)
        Article.find({UserId : req.decoded.id})
        .then(data => {
            console.log(data)
            res.status(200).json(data)
        })
        .catch(next)
    }

    static create(req, res, next){
        // console.log(req.decoded)
        // console.log(req.body)        
        const newArticle = {
            title : req.body.title,
            content : req.body.content,
            image : req.body.image || "https://utmsi.utexas.edu/components/com_easyblog/themes/wireframe/images/placeholder-image.png",                    
            UserId : req.decoded.id
        }
        Article.create(newArticle)
        .then(data => {
            console.log(data)
            res.status(201).json(data)
        })
        .catch(next)
    }

    static delete(req, res, next){
        console.log('asd')
        Article.deleteOne({ _id : req.params.id})
        .then(result => {
            console.log(result)
            res.status(200).json(result)
        })
        .catch(next)
    }

    static update(req, res, next){
        console.log(req.body)
        console.log(req.params.id)
        const newData = {
            title : req.body.title,
            content : req.body.content
        }
        Article.updateOne({ _id : req.params.id }, newData)
        .then(result => {
            console.log(result)
            res.status(200).json(result)
        })        
        .catch(next)
    }

   
}

module.exports = ArticleController