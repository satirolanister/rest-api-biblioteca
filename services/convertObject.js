module.exports = data => {
    let ti =Object.keys(data);
    let uy = Object.values(data);

    for (let i = 0; i < uy.length; i++) {
        for(let j = 0; j <ti.length; j++ ){
            if (ti[i] === 'userid') {
                    uy.splice(i, 1);
                    ti.splice(i, 1);
             }
        }
      }  
    return {
        ti,
        uy
    };
}