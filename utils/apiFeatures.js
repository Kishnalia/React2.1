class APIFeatures {

    constructor(query, queryStr) {

        this.query = query;

        this.queryStr = queryStr;

        console.log(this.query, this.queryStr);

    }



    search() {

        const keyword = this.queryStr.keyword ? {

            name: {

                $regex: this.queryStr.keyword,

                $options: 'i'

            }

        } : {}

        const cloneObj ={ ...keyword };

        console.log(this.query.find())

        // console.log(this.queryStr);

        // this.query = this.query.find({ ...keyword });

        this.query = this.query.find(keyword)

        return this;

    }

    filter() {

        const queryCopy = { ...this.queryStr};
        console.log(queryCopy)

        const removeFields = ['keyword', 'limit', 'page']

        removeFields.forEach(el => delete queryCopy[el]);

        let queryStr = JSON.stringify(queryCopy);

        console.log(queryStr);

        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        console.log(queryStr);

        this.query = this.query.find(JSON.parse(queryStr));

        console.log(JSON.parse(queryStr));

        return this;
        
        }


        pagination(resPerPage) {

            const currentPage = Number(this.queryStr.page) || 1;
    
            const skip = resPerPage * (currentPage - 1);
    
    
    
            this.query = this.query.limit(resPerPage).skip(skip);
    
            return this;
    
        }

   }

   




module.exports = APIFeatures;
   
   

