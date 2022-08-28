let myInput = document.querySelector(".input")
let myLabel = document.querySelector(".inp-label")
let myResult = document.querySelector(".results")
let myLeftSelection = document.querySelector("#LI")
let myRightSelection = document.querySelector("#RI")
let myBtn = document.querySelector(".mybtn")
fetch("../country-list.json")
.then((e)=> e.json())
.then((data)=>{
    // console.log(data);
    let newData = Object.keys(data).map((r)=> `<option value = "${r}">${r}</option>`).join("")
    // console.log(newData);
    
    myLeftSelection.innerHTML = newData
    myRightSelection.innerHTML = newData

})
myLeftSelection.addEventListener("change" ,()=>{
    let myLChoose = myLeftSelection.value
    // console.log(myLChoose);
    fetch(`https://v6.exchangerate-api.com/v6/ae1285f53a5f612b1fb420cc/latest/${myLChoose}`)
    .then(nowV => nowV.json())
    .then((v)=>{
        // console.log(v.conversion_rates);
        myRightSelection.addEventListener("change",() => {
            let myRChoose = myRightSelection.value
            // console.log(myRChoose);
            myBtn.addEventListener("click",()=>{
                let myOperation = myInput.value * v.conversion_rates[myRChoose]
                myResult.innerHTML = `${myInput.value} ${myLChoose} = ${myOperation} ${myRChoose}`
            })
        })
    })
})