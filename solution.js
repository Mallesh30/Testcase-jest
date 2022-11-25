const add = (...a) => {
    try {
        return a.reduce((accum, current) => {
            return accum + current;
        });
    } catch (e) {
        console.log(e)
    }

};


const listToObject = (list) => {
    const resultvalue = {};
    list.forEach((l) => {
        resultvalue[l["name"]] =
            JSON.parse(JSON.stringify(l["value"]));
    });
    return resultvalue;
};


const objectToList = (objectvalue) => {
    let object = JSON.parse(JSON.stringify(objectvalue));
    let arr= [];
    Object.keys(object).map((item) => {
        let objectsample = {
            name: item,
            value: object[item],
        };
        arr.push(objectsample)
    });

    return arr;
};

const deserialize = (obj) => {
    let finalArray = [];
    let total = Object.keys(obj).find((data)=> !/\d/.test(data));
    let str = Object.keys(obj).find((data)=>/\d/.test(data));
    let row = str.substring(0, str.indexOf(str.match(/\d/)));

    let arrayKeys = Object.keys(obj);
    for (let i=0; i < arrayKeys.length - 1; i++){
        let finalObject= {};
        arrayKeys.map((item)=>{
            if (item.includes(String(i))) {
                let key = item.substring(item.indexOf(item.match(/_/)) + 1);
                if (typeof obj[item] != "object") {
                    finalObject[key]= obj[item];
                } else {
                    let obj1 = obj[item];
                    let finalArray = [];
                    let str = Object.keys(obj1).find((item)=> /\d/.test(item));
                    let row = str.substring(0, str.indexOf(str.match(/\d/)));
                    let arrayKeys = Object.keys(obj1);
                    for (let i = 0; i < arrayKeys.length; i++) {
                        let finalObject = {};
                        arrayKeys.map((item)=>{
                            if (item.includes(String(i))) {
                                let key = item.substring(item.indexOf(item.match(/_/)) + 1);
                                if (typeof obj1[item] != "object") {
                                    if (obj1[item].length > 4 && obj1[item].includes("t:")) {
                                        let today = new Date(parseInt(obj1[item].substring(2)));
                                        let dd = String (today.getDate()).padStart(2, "0");
                                        let mm = String (today.getMonth() + 1).padStart(2, "0");
                                        let yyy = today.getFullYear();
                                        today = dd + "/" + mm + "/" + yyy ;
                                        finalObject [key] = today;
                                    }  else {
                                        finalObject[key] = obj1[item];
                                    } 
                                    } else {
                                        let obj2 = obj1[item];
                                        let finalArray = [];
                                        let str = Object.keys(obj2).find((item)=> /\d/.test(item));
                                        let row = str.substring(0, str.lastIndexOf(str.match(/\d/)));
                                        let arrayKeys = Object.keys(obj2);
                                        for (let i = 0; i < arrayKeys.length; i++) {
                                            let finalObject = {};
                                            arrayKeys.map((item)=>{
                                                if (item.includes(String(i))) {
                                                    let key = item.substring (
                                                      item.indexOf(item.match(/_/)) + 1
                                                    );
                                                    if (typeof obj2[item] !="object") {
                                                        if (
                                                            obj2[item].length> 4 &&
                                                            obj2[item].includes("t:")
                                                        ){
                                                            let today = new Date(
                                                                parseInt(obj1[item].substring(2))
                                                            );
                                                            let dd = String(today.getDate()).padStart(2,"0");
                                                            let mm = String(today.getMonth() + 1).padStart(
                                                                2,
                                                                "0"
                                                            );
                                                            let yyyy = today.getFullYear();
                                                            today = dd + "/" + mm + "/" + yyyy;
                                                            finalObject[key] = today;
                                                        } else {
                                                            finalObject[key] = obj2[item];
                                                        }
                                                    } else {
                                                        //finalResult
                                                    }
                                                }
                                            });
                                            Object.keys(finalObject).length > 0
                                            ? finalArray.push(finalObject)
                                            : null;
                                        }
                                        //
                                        let finalObj2 = {
                                            [row]: finalArray,
                                        };
                                        finalObject[key] = finalObj2;
                                    } 
                                
                            }
                        });
                        Object.keys(finalObject).length > 0
                        ? finalArray.push(finalObject)
                        : null;
                    }
                    let finalObj1 = {
                        [row] : finalArray,
                    };
                    finalObject[key] = finalObj1;
                }

            }
        });
        Object.keys(finalObject).length > 0 ? finalArray.push(finalObject) : null;
    }
    let finalObj = {
        [row] : finalArray,
        [total] : obj[total],
    };
    return finalObj;
};

export { add, listToObject, objectToList, deserialize};