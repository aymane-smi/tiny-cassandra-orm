const cassandra = require("cassandra-driver");


exports.ORM = class ORM{
    constructor(contactPoints, localDataCenter, keySpace, table){
            try{
                this.client = new cassandra.Client({
                    contactPoints,
                    localDataCenter,
                    keyspace: keySpace,
                    // credentials: {
                    //     username: YOUR_CRED,
                    //     password: YOUR_CRED,
                    // }
                });
                this.client.connect();
            }catch(e){
                console.warn(e);
            }
            this.table = table;
    }
    //add data to table
    async create(data){
        //using "column" representation in case of column with sensitive name
        const columns = Object.keys(data).map((key)=>`"${key}"`).join(', ');
        const values = Object.values(data);
        //_ mean that the parameter is being ignored
        const indexes = Object.keys(data).map((_, index)=>'?').join(", ");
        const prepredQuery = `INSERT INTO ${this.table}(${columns}) VALUES(${indexes})`;
        try{
            const result = await this.client.execute(prepredQuery, values, { prepare: true });
            return true;
        }catch(e){
            console.log("error");
            console.warn(e.message);
            return false;
        }
    }

    //find from table

    async findBy(data){
        try{
            if(data.length === 0)
                throw new Error("the query require condition");
            const conditions = Object.keys(data).map((key)=>{
                if(typeof data[key] === 'number' || typeof data[key] ==='boolean')
                    return `${key} = ${data[key]}`;
                return `${key} = '${data[key]}'`
            }).join(', ');
            const preparedQuery = `SELECT * FROM ${this.table} WHERE ${conditions}`;
            const result = await this.client.execute(preparedQuery);
            console.info("execution result=>");
            console.table(result.rows[0]);
            return result.rows;
        }catch(e){
            console.warn(e.message);
            return false;
        }
    }

    //find record by id
    async findById(id){
        try{
            let query;
            if(typeof id === 'number')
                query = `SELECT * FROM ${this.table} WHERE id = ${id}`;
            else
                query = `SELECT * FROM ${this.table} WHERE id = '${id}'`;
            const result = await this.client.execute(query);
            console.info("execution result=>");
            console.table(result.rows);
            return result.rows;
        }catch(e){
            console.error(e.message);
            return false;
        }
    }

    //delete record by id
    async deleteById(id){
        try{
            let query;
            if(typeof id === 'number')
                query = `DELETE FROM ${this.table} WHERE id = ${id}`;
            else
                query = `DELETE FROM ${this.table} WHERE id = '${id}'`;
            const result = await this.client.execute(query);
            console.info("deleted");
            return true;
        }catch(e){
            console.error(e.message);
            return false;
        }
    }

    //update record

    async updateWith(condition, data){
        try{
            if(condition === null || condition === {})
                throw new Error("condition must not be empty");
            if(data === null || data === {})
                throw new Error("provided data must not be empty");

            const where = Object.keys(condition).map((key)=>{
                if(typeof condition[key] === 'number' || typeof condition[key] === 'boolean')
                    return `${key} = ${condition[key]}`;
                return `${key} = '${condition[key]}'`;
            }).join(", ");

            const set = Object.keys(data).map((key)=>{
                if(typeof data[key] === 'number' || typeof data[key] === 'boolean')
                    return `${key} = ${data[key]}`;
                return `${key} = '${data[key]}'`;
            }).join(', ');

            const query = `UPDATE ${this.table} SET ${set} WHERE ${where}`;
            const result = await this.client.execute(query);

            return true;
        }catch(e){
            console.log(e.message);
            return false;
        }
    }

    async close(){
        await this.client.shutdown();
    }
}
