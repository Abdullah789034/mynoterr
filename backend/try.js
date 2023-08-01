console.log('a');

const asynchronous = () => {
     
    return new Promise((resolve) => {
        setTimeout(()=>{
            resolve('b') 
        } , 2000)
        
    }) ;
}
const wait = async() => {
    var data = await asynchronous();
    console.log(data);
    console.log('c') 
}
wait();
