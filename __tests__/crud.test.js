const {ORM} = require("../orm");

const operation = new ORM(["localhost"], "datacenter1", "audit_tool", "operations");
const order = new ORM(["localhost"], "datacenter1", "audit_tool", "orders");

describe("testing operation", ()=>{
    it("read operation using the id andit must match id, to, from", async()=>{
        await  operation.create({id: 1, from: "0x123", to: "0x321"});
        let result = await operation.findBy({id: 1});
        expect(result[0].id).toBe(1);
        expect(result[0].from).toBe("0x123");
        expect(result[0].to).toBe("0x321");
    });

    it("reading operation with invalid id should return empty array", async()=>{
        let result = await operation.findById(6);
        expect(result).toStrictEqual([]);
    });

    it("creating operation with invalid column", async()=>{
        let result = await operation.create({idd: 12});
        expect(result).toBeFalsy();
    });

    it("creating operation with invalid column type", async()=>{
        let result = await operation.create({idd: '12'});
        expect(result).toBeFalsy();
    });

    it("update operation with invalid column", async()=>{
        let result = await operation.updateWith({id: 1}, {notexist: true});
        expect(result).toBeFalsy();
    });

    it("update operation with invalid column type", async()=>{
        let result = await operation.updateWith({id: 1}, {id: 'true'});
        expect(result).toBeFalsy();
    });

    it("delete operation with valid id should always be true", async()=>{
        let result = await operation.deleteById(1);
        expect(result).toBeTruthy();
    });

    it("delete operation with invalid id tyep should always be false", async()=>{
        let result = await operation.deleteById('1');
        expect(result).toBeFalsy();
    });
});

describe("testing order", ()=>{
    it("read order using the id and it must match the given id", async()=>{
        await  order.create({id: "0x111", success: true, threshold: 30000, price: "27000.12345789"});
        let result = await order.findBy({id: "0x111"});
        expect(result[0]).toMatchObject({id: "0x111", success: true, threshold: 30000, price: "27000.12345789"});
    });

    it("reading order with invalid id should return empty array", async()=>{
        let result = await operation.findById(6);
        expect(result).toStrictEqual([]);
    });

    it("findBy should always receive not empry array", async()=>{
        let result = await order.findById([]);
        expect(result).toBeFalsy();
    });

    it("creating order with invalid column", async()=>{
        let result = await order.create({idd: 12});
        expect(result).toBeFalsy();
    });

    it("creating order with invalid column type", async()=>{
        let result = await operation.create({idd: '12'});
        expect(result).toBeFalsy();
    });

    it("update order with invalid column", async()=>{
        let result = await order.updateWith({id: 1}, {notexist: true});
        expect(result).toBeFalsy();
    });

    it("update order with invalid column type", async()=>{
        let result = await order.updateWith({id: 1}, {id: true});
        expect(result).toBeFalsy();
    });

    it("update order using boolean", async()=>{
        let result = await order.updateWith({id: "0x111"}, {success: true});
        expect(result).toBeTruthy();
    });

    it("delete order with valid id should always be true", async()=>{
        let result = await order.deleteById('0x111');
        expect(result).toBeTruthy();
    });

    it("delete order with invalid id tyep should always be false", async()=>{
        let result = await order.deleteById(1);
        expect(result).toBeFalsy();
    });
});