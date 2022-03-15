'use strict'
//this file to create a table for articles 

const articles =(sequelize,DataTypes)=> sequelize.define('articles',{

typeOfarticles :{
type:DataTypes.STRING,
allowNull:false 
},
NameOfauthor :{
type:DataTypes.STRING,
}

})


module.exports=articles;