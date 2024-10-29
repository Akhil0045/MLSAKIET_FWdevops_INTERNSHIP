
const inputBox = document.getElementById('inputBox');


const buttons = document.querySelectorAll('button');


let inputString = ""; 


buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        let buttonText = event.target.innerText;

        if (buttonText === 'AC') {
           
            inputString = "";
            inputBox.value = "0";
        } else if (buttonText === 'DEL') {
            
            inputString = inputString.slice(0, -1);
            inputBox.value = inputString || "0"; 
        } else if (buttonText === '=') {
            try {
           
                inputString = eval(inputString).toString(); 
                inputBox.value = inputString;
            } catch {
                
                inputBox.value = "Error";
                inputString = "";
            }
        } else {
            
            inputString += buttonText;
            inputBox.value = inputString;
        }
    });
});
