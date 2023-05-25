const {categoryModel,categoryValidate} = require('../models/category')
const {bookModel} = require('../models/book');

function addCategory(req,res){


    const{error} = categoryValidate(req.body);
    if(error){
        return res.status(400).json({error:error.details[0].message});
        
    }
    categoryModel.create(req.body,error=>{

        if(error){
            return res.json(error);
        }

        res.json({message:"Category Created Successfully"});
    })
}

function getCategories(req,res){

 categoryModel.find({},(error,categories)=>{


    if(error){
        return res.json(error)
    }
    return res.status(200).json(categories)
 })


}

function getCategory(req,res){

    const {id} = req.params
    categoryModel.find({_id:id},(error,category)=>{


        if (error){
            return res.json(error);
        }
        return res.status(200).json(category)
    })
}



function updateCategory(req,res){

    const {id} = req.params
    categoryModel.findByIdAndUpdate({_id:id},req.body,{new:true},(error,category)=>{
  
    if(error) {
        return res.json(error);
    }
    return res.status(200).json(category)

})
    
}

function deleteCategory(req,res) {

    const {id} = req.params
  
       bookModel.findOne({ categoryId: id }, (error, book) => {
      
      if (error) {
        return res.json(error);
      }
      if (book) {
        return res.json({"message": "Unable to delete category because there are books associated with this category"});
      }
      
      categoryModel.findByIdAndDelete({_id:id}, (error) => {
        if (error) {
          return res.json(error);
        }
        res.json({"message":"category Deleted Successfully"})
      });
    });
  }
  


module.exports={addCategory,getCategories,getCategory,updateCategory,deleteCategory}