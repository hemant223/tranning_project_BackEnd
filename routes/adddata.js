var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

router.post('/add',upload.any(),function(req,res,next){
   console.log('555555',req.files,req.body)
   var obj = {}
   req.files.map((item)=>{
    if(!obj[item.fieldname]){
        obj[item.fieldname]=[]
    }
    obj[item.fieldname].push(item.filename) 
   })
   console.log('objjjj',obj)
   for(let key in obj){
    obj[key] = obj[key].join()
   }
   console.log('obj19',obj);
   req.body = {...req.body, ...obj}
   console.log(req.body);
   pool.query("insert into products set ?",req.body,function (error, result) {
    if(error){
        console.log('error a gyiii',error);
        res.status(500).json({status:false})
    }
    else{
        res.status(200).json({status:true,data:req.body})
    }
   })

})


router.post('/add_new_vendor',function(req, res, next) {
    console.log("BODYYY:", req.body)
   
    pool.query("insert into vendor(vendor_id,vendor_name,demand,demand_date,remark) values(?,?,?,?,?)",[req.body.vendor_id,req.body.vendor_name,req.body.demand,req.body.demand_date,req.body.remark], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ status: false })
        }
        else {
            return res.status(200).json({ status: true })
        }

    })
});



router.get('/display_all_vender_list', function (req, res, next) {
    pool.query("select * from vendor", function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ data: [] })
        }
        else {
            return res.status(200).json({ data: result })
        }

    })
});




module.exports = router;