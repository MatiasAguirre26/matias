const boxProduct = document.getElementById('box-product')
const boxProduct__img = document.getElementById('box-product__imgZ');

// Cuando el curso esta por dentro del elemento se incrementa los valores del Transform.
boxProduct.addEventListener('mousemove' , (e)=>{
    // En esta parte se leen los valores de x  e y
    clientX = e.clientX - boxProduct.offsetTop
    clientY = e.clientY - boxProduct.offsetLeft

    //Se leen los valores deL ANCHO Y ALTO 
    mWidth = boxProduct.offsetWidth;
    mHeight = boxProduct.offsetHeight;

    clientX = clientX / mWidth *100;
    clientY = clientY / mHeight *100;
    
    boxProduct__img.style.transform = 'translate(-'+ clientX+'% , -'+clientY+'%) scale(2)'
})
// Cuando el cursor este por fuera del elemento se restaura al valor original 
boxProduct.addEventListener('mouseleave', ()=>{
    boxProduct__img.style.transform = 'translate(-50%  , -50%) scale(1)'
})