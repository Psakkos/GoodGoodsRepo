const express = require('express');
const router = express.Router();
const redis= require('redis');

let client= redis.createClient();

client.on('connect',function(){
    console.log("Connected to redis ... on sell route");
});

router.get('/', function (req,res, next){
  res.render('postGoods');
});
router.get('/', function (req,res, next){
  res.render('index');
});
router.get('/postGoods', function (req,res, next){

  res.render('postGoods');
});
router.get('/test', function (req,res, next){
    let sample=req.body.sample;
    let sample2= req.body.sample2;
    client.hmset(sample, [
        'sample2', sample2
    ], function(err, reply){
        if(err){
            console.log(err);
        }
        else{
            console.log(reply);
            res.redirect('/sell/test');
        }
    });
});

router.post('/postGoods', function (req,res){
    console.log(req.body);
    let item= req.body.item;
    let seller= req.body.seller;
    let category= req.body.category;
    let price= req.body.price;

    client.hmset("item"+item, [
        'seller', seller,
        'category', category,
        'price', price,
    ], function(err,reply){
        if(err){
            console.log(err);
        }
        else{
            console.log(reply);
            res.redirect('/sell/postConfirmed');
        }
    });
});

router.get('/postConfirmed', function (req,res, next){

  res.render('postConfirmed', {json: 'data'});
});

module.exports= router;
