var mysql=require('mysql')
var pool=mysql.createPool(
    {host:'localhost',
    port:3306,
    user:'root',
    password:'hemu123',
    database:'vechile_project',
    connectionLimit:100,
    multipleStatements:'true'})
    
    module.exports=pool