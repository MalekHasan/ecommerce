'use strict'
const slugify = require('slugify')
const ApiFeatures = require('./ApiFeatures')
class Collection{
    constructor(model,isSlug){
        this.model=model
        this.isSlug=isSlug || false
    }
    async get(_id){
        if (_id) {
            const result =await this.model.find({_id:_id});
            return result
        }
    }
    async getAllFeatures(obj){
        const result =await this.model.find(obj);
        return result
    }
    async create(obj){
        if(this.isSlug)obj.slug=slugify(obj.name)
        const result =await this.model.insertMany(obj);
        return result
    }
   async update(_id,obj){
        if(this.isSlug)obj.slug=slugify(obj.name)
        const result =await this.model.findOneAndUpdate(_id,obj,{new:true});
        return result
    }
    async delete(_id){
        const result =await this.model.findOneAndDelete(_id);
        return result
    }

}
module.exports=Collection;