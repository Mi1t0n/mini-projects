const output = document.querySelector('.passwordOut')

const upeerAl ='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerAl ='abcdefghijklmnopqrstuvwxyz'
const numbers ='0123456789'
const symbols ='!@#$%^&*()_+="'

function getletter(arr){
    return arr[Math.floor(Math.random() * arr.length)]
}
function checkbox (selector){ 
    return document.querySelector(`${selector}`).checked
}

const passwordGenerate = () =>{
    event.preventDefault()

    const lengthVal = document.querySelector('#length').value
    if(lengthVal<5) return  output.textContent ='Min length 5!'
    if(lengthVal>35) return  output.textContent ='Max length 35!'
    
    let password = ''
    for(i=0;i<lengthVal;i++){
        const lettersArray = []
        checkbox('#number') && lettersArray.push(getletter(numbers))
        checkbox('#upper') && lettersArray.push(getletter(upeerAl))
        checkbox('#lower') &&  lettersArray.push(getletter(lowerAl))
        checkbox('#symbols') &&  lettersArray.push(getletter(symbols))
        if(!lettersArray.length) return output.textContent ='You must use at least 1 chexbox'

        password += lettersArray[Math.floor(Math.random() * lettersArray.length)]
    }
    
    output.textContent = password
}
document.querySelector('form button').addEventListener('click',passwordGenerate)