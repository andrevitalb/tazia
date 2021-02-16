const addButtons = Array.from(document.querySelectorAll('.products__product__button'));

addButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const desiredItem = button.dataset.target;
        let currentCart;

        const cartString = localStorage.getItem('shoppingCart');
        if(cartString !== null && cartString !== '[]') {
            currentCart = JSON.parse(cartString);
            let found = 0;

            currentCart.forEach((item) => {
                if(item.item === desiredItem) {
                    item.count++;
                    found++;
                }
            });

            if(!found) currentCart.push({
                item: desiredItem,
                count: 1
            });
        } else {
            currentCart = [];

            currentCart.push({
                item: desiredItem,
                count: 1
            });
        }

        localStorage.setItem('shoppingCart', JSON.stringify(currentCart));
        alert('¡Producto agregado con éxito!');
    })
});