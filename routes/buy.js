const express = require('express');
const router = express.Router();
const redis = require('redis');

let client = redis.createClient();
client.on('connect',function(){
    console.log("Connected to redis... on users route");
});

router.get('/goodsSearch', function (req,res, next){

  res.render('goodsSearch', {json: 'data'});
});

router.get('/goodsScroll', function (req,res, next){

  res.render('goodsScroll', {json: 'data'});
});

router.get('/goodsInfo', function (req,res, next){

  res.render('goodsInfo', {json: 'data'});
});

router.get('/boughtGoods', function (req,res, next){

  res.render('boughtGoods', {json: 'data'});
});


router.get('/keyword/:cat', function (req,res, next){
    let categoryid= "category:"+req.params.cat;
    client.hgetall(categoryid,function(err,reply){
           if(err){
               console.log(err);
           }
           else{
               console.log(reply);
               res.render('keyword', reply);
           }
       }
       );
    //get keyword information
  res.render('keyword', {json: 'data'});
});
module.exports = router;
