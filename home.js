const form = document.getElementById('Form')
const item = document.querySelector('.experiment')
const username = document.querySelector('.username')
const address = document.querySelector('.address')
const price = document.querySelector('.price')
const unitNumber = document.querySelector('.unitNumber')
const Bot4 = document.querySelector('.Bot4')

Bot4.addEventListener('click', (e) => {
    e.preventDefault()

    const newItem = document.createElement('div');
    newItem.classList.add('ex');


    item.appendChild(newItem)

    let fileInput = document.getElementById('img');


    let img = document.createElement('img')
    newItem.appendChild(img)
    let reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0])
    reader.onload = () => {
        img.setAttribute('src', reader.result)
    }



    const newItem2 = document.createElement('div')
    newItem2.classList.add('tt')
    newItem.appendChild(newItem2)



    const tt2 = document.createElement('p');
    tt2.classList.add('p1')
    tt2.textContent = address.value;
    newItem2.appendChild(tt2)

    const tt3 = document.createElement('p');
    tt3.classList.add('p2')
    tt3.textContent = username.value;
    newItem2.appendChild(tt3)

    const tt4 = document.createElement('p');
    tt4.classList.add('p3')
    tt4.textContent = price.value;
    newItem2.appendChild(tt4)

    form.reset()

    console.log(newItem)
    // localStorage.setItem('info', newItem)

})
















