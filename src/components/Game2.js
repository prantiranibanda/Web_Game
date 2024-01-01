import { useEffect, useState } from "react";
let f = false;
function Game2(){
    const [randomDiceImg, setRandomDiceImg] = useState(<img src="/dice.png" alt="dice" ></img>);
    const [sum, setSum] = useState(0);
    const [randomNumber, setRandomNumber] = useState(1);
    const [flag, setFlag] = useState(false);
    const [isWin, setIsWIn] = useState(false);
    let arr = new Array();
    let k=111;
    for(let i=0; i<10; i++){
        if((i%2) !== 0){
            k = k-9;
        }
        else{
            k = k-11;
        }
        for(let j=0; j<10; j++){
            if((i%2) === 0){
                arr.push({
                    id: k,
                    data: "",
                    isEqualToSum: false,
                });
                k--;
            }
            else{
                arr.push({
                    id: k,
                    data: "",
                    isEqualToSum: false,
                });
                k++;
            }
        }
    }
    //console.log(arr);
    const [buttonArray, setButtonArray] = useState(arr);
    let temp;
    useEffect(()=>{
        setButtonArray(
            (prev)=>{
                temp = prev.map((eachbutton)=>
                    (eachbutton.id === sum)?{...eachbutton, data: "rounded-full bg-green-400", isEqualToSum: true}:{...eachbutton}
                )
                // console.log(temp);
                return temp;
            }    
        )
    },[randomNumber,sum])
    function handleWin(s){
        if(s === 100){
            setIsWIn(true);
            //console.log("Win");
        }
    }
    
    function rollDice(){
        setFlag(true);
        console.log("f",f);
        if(f === false){
            setButtonArray(
                (prev)=>{
                    temp = prev.map((eachbutton)=>
                        (eachbutton.id === sum)?{...eachbutton, data: "", isEqualToSum: false}:{...eachbutton}
                    )
                    // console.log(temp); 
                    return temp;
                }
            )
        }
        setRandomNumber(((Math.floor(Math.random() * 6))+1));
        setRandomDiceImg(<img src={`/images/ds${randomNumber}.jpg`} alt={`dice${randomNumber}`}></img>);
        let s = sum + randomNumber;
        if(s>100){
            f = true;
            console.log(f);
        }
        if(s <= 100){
            if(f === true){
                setButtonArray(
                    (prev)=>{
                        temp = prev.map((eachbutton)=>
                            (eachbutton.id === sum)?{...eachbutton, data: "", isEqualToSum: false}:{...eachbutton}
                        )
                        // console.log(temp); 
                        return temp;
                    }
                )
            }
            f = false;
            if(s === 5){
                setSum(s+53);
            }
            else if(s === 14){
                setSum(s+35);
            }
            else if(s === 53){
                setSum(s+19);
            }
            else if(s === 64){
                setSum(s+19);
            }
            else if(s === 38){
                setSum(s-18);
            }
            else if(s === 51){
                setSum(s-41);
            }
            else if(s === 76){
                setSum(s-22);
            }
            else if(s === 91){
                setSum(s-18);
            }
            else if(s === 97){
                setSum(s-36);
            }
            else{
                setSum(s);
            }
            
        }
        handleWin(s);
    }
    
    return (
        <div className="flex justify-center items-center h-[80vh]">
        <div className="h-[485px] w-[485px] bg-[url('/ludoboard.jpg')] bg-no-repeat bg-green-500 bg-auto bg-center">
            <div className="grid grid-cols-10 h-[485px] w-[485px]">
            {arr.map((ele, index)=>{
                return (<MyCell key={index} index={index} buttonArray={buttonArray}/>);
            })}
            </div>
            <div className="w-9 h-9 rounded-lg text-white font-bold text-2xl">{randomDiceImg}</div>
            <button className="bg-yellow-300 text-pink-700 px-6 py-3 rounded mt-5" onClick={rollDice}>{(flag)?"Click to roll":"start"}</button>
            <div className={`${(isWin)?"":"hidden"}`}>Win</div>    
        </div>
        </div>
  );
  function MyCell({index, buttonArray}){
    return (
            <div className={`${(buttonArray[index].isEqualToSum)?buttonArray[index].data:buttonArray[index].data}`}>{buttonArray[index].id}</div>
        
    );
  }
}
export default Game2;