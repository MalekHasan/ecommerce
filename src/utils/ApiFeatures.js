'use strict'
class ApiFeatures{
    constructor(mogooseQuery,stringQuery){
        this.mogooseQuery=mogooseQuery;
        this.stringQuery=stringQuery;
    }

    paginate(){
        let page=this.stringQuery.page*1 || 1
        if(this.stringQuery.page<=0)page=1
        let skip=(page -1)*5;
        this.mogooseQuery.skip(skip).limit(5);
    return this;
    }
    
        filter(){
            const excludedQuery=['sort','keyword','filed','page']
            let objFeaturs={...this.stringQuery}
            excludedQuery.forEach(feat=>delete objFeaturs[feat])
            objFeaturs=JSON.stringify(objFeaturs)
            objFeaturs=objFeaturs.replace(/\b(gt|gte|lt|lte)/g,match=>`$${match}`)
            objFeaturs=JSON.parse(objFeaturs)
            // console.log(objFeaturs);
            this.mogooseQuery.find(objFeaturs)
            return this
    
        }

    sort(){
        if(this.stringQuery.sort) { 
        let sortedby= this.stringQuery.sort.split(',').join(" ")
        this.mogooseQuery.sort(sortedby)
        }
    return this;
    }


search(){
    if(this.stringQuery.keyword) { 
        this.mogooseQuery.find({
            $or:
                [
                    {name:{$regex:this.stringQuery.keyword,$options:i}},
                    {description:{$regex:this.stringQuery.keyword,$options:i}}
                ]
        })
        }
    return this;
    }

    
    selected(){
        if(this.stringQuery.filed) { 
        let fileds= this.stringQuery.filed.split(',').join(" ")
        this.mogooseQuery.select(fileds)
        }
    return this;
    }

}
module.exports=ApiFeatures;