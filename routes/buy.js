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


router.get('/category/:cat', function (req,res, next){
    let message= String(req.params.cat);
  res.render('category', {category: message});
});

router.get('/searchItem/:cat', function (req,res, next){
    let category = String(req.params.cat);
  if(category== "Instruments"){
      client.keys('item*Instruments',function(err, data){
        if(err){
            console.log(err);
        }
        else{
            let itemlist = {};
            for(let d=0; d<data.length; d++){
                    let item= "catalog"+d;
                    itemlist[item]= data[d];
        }
        res.render('searchItem', itemlist);
    };

  });
}
  if(category== "Clothes"){
      client.keys('item*Clothes',function(err, data){
        if(err){
            console.log(err);
        }
        else{
            let itemlist = {};
            for(let d=0; d<data.length; d++){
                    let item= "catalog"+d;
                    itemlist[item]= data[d];
        }
        console.log(itemlist);
        res.render('searchItem', itemlist);
    };

  }
)};
  if(category== "Technology"){
      client.keys('item*Technology',function(err, data){
        if(err){
            console.log(err);
        }
        else{
            let itemlist = {};
            for(let d=0; d<data.length; d++){
                    let item= "catalog"+d;
                    itemlist[item]= data[d];
        }
        res.render('searchItem', itemlist);
    };

  }
)};
  if(category== "Appliances"){
      client.keys('item*Appliances',function(err, data){
        if(err){
            console.log(err);
        }
        else{
            let itemlist = {};
            for(let d=0; d<data.length; d++){
                console.log(data[d].category);
                    let item= "catalog"+d;
                    itemlist[item]= data[d];
        }
        res.render('searchItem', itemlist);
    };

  }
)};
});

router.get('/item/itemInfo/:catalog', function (req,res, next){
    let catalog= req.params.catalog;

    client.hgetall(catalog,function(err,obj){
           if(!obj){
               console.log(catalog);
               res.render('index',{
                   error: 'item does not exist',
                   title: 'NO!'
               });
           }
           else{
               console.log(obj);
               obj.id = req.params.catalog;
               res.render('itemDisplay',{
                   item:obj
               });
           }
       })



});


router.delete('/delete/:id',function(req,res){
    client.del(req.params.id);
    res.redirect('/buy/boughtGoods')
});
router.get('/boughtGoods', function (req,res, next){

  res.render('boughtGoods');
});
module.exports = router;
