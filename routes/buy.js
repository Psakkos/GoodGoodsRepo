const express = require('express');
const router = express.Router();
const redis = require('redis');

let client = redis.createClient();
client.on('connect',function(){
    console.log("Connected to redis... on users route");
});

router.get('/pickCategory', function (req,res, next){

  res.render('pickCategory', {json: 'data'});
});



router.get('/boughtGoods', function (req,res, next){

  res.render('boughtGoods', {json: 'data'});
});


router.get('/category/:cat', function (req,res, next){
    let message= String(req.params.cat);
  res.render('category', {category: message});
});

router.get('/item/:cat', function (req,res, next){
    let category = String(req.params.cat);
  if(category== "Instruments"){
      client.keys('item*',function(err, data){
        if(err){
            console.log(err);
        }
        else{
            let itemlist = {};
            for(let d=0; d<data.length; d++){
                if(data[d].category== category){
                    let item= "catalog"+d;
                    itemlist[item]= data[d];
                }
        }
        res.render('item', itemlist);
    };

  });
}
  if(category== "Clothes"){
      client.keys('item*',function(err, data){
        if(err){
            console.log(err);
        }
        else{
            let itemlist = {};
            for(let d=0; d<data.length; d++){
                if(data[d].category== category){
                    let item= "catalog"+d;
                    itemlist[item]= data[d];
                }
        }
        res.render('item', itemlist);
    };

  }
)};
  if(category== "Technology"){
      client.keys('item*',function(err, data){
        if(err){
            console.log(err);
        }
        else{
            let itemlist = {};
            for(let d=0; d<data.length; d++){
                if(data[d].category== category){
                    let item= "catalog"+d;
                    itemlist[item]= data[d];
                }
        }
        res.render('item', itemlist);
    };

  }
)};
  if(category== "Appliances"){
      client.keys('item*',function(err, data){
        if(err){
            console.log(err);
        }
        else{
            let itemlist = {};
            for(let d=0; d<data.length; d++){
                console.log(data[d].category);
                if(data[d].category== category){
                    let item= "catalog"+d;
                    itemlist[item]= data[d];
                }
        }
        res.render('item', itemlist);
    };

  }
)};
});

module.exports = router;
