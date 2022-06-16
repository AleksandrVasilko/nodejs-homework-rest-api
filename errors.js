// class ValidationError extends Error { 
//     constructor(status, massege) {
//         super(massege);
//         this.status = status
//     }
// }

// module.exports = {
//     ValidationError
// }


const createError = (status,message) => { 
    const e = new Error();
    e.status = status;
    e.message = message;
    return e;
} 

module.exports = {createError};