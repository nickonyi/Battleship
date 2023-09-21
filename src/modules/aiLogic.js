function aiLogic() {
//create a 2D array of available attack coordinates
const availableAttacks = createAttackArray();

return {
    availableAttacks
}
}

function createAttackArray(){
    const attackArray = [];
    for (let row = 0; row < 10; row++) {
        let rowArray = [];
        for (let col = 0; col < 10; col++) {
            rowArray.push([row,col]);   
        }
        attackArray.push(rowArray);
    }

    return attackArray;
}

export default aiLogic;