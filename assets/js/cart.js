const productData = [
    {
        name: 'Sunny Day',
        image: 'https://cdn.shopify.com/s/files/1/0251/7706/3523/products/Tazia-Bomber-Sunny-Day-Azul-Rosa-Lila-Naranja-Amarillo-Blanco-Frontal_17d70697-5d03-410c-921e-3cf79f078166_720x.jpg?v=1603826796',
        price: 1160
    },
    {
        name: 'Copito de Nieve',
        image: 'https://cdn.shopify.com/s/files/1/0251/7706/3523/products/Tazia-Acid-Pastel-Frontal_dfe76bd3-e1d1-4599-ac3a-030fd1749c26_1512x.jpg?v=1606245025',
        price: 1100
    },
    {
        name: 'Rebel',
        image: 'https://cdn.shopify.com/s/files/1/0251/7706/3523/products/Tazia-Bomber-Rebel-Azul-Rosa-Amarillo-Blanco-Frontal_1296x.jpg?v=16038276799',
        price: 1160
    },
    {
        name: 'Windbreaker Malva',
        image: 'https://cdn.shopify.com/s/files/1/0251/7706/3523/products/Malva-Tazia-Chamarra-Azul-Rosa-Lila-Amarillo-Frontal_720x.jpg?v=1594676207',
        price: 1160
    },
    {
        name: 'ONG-20',
        image: 'https://cdn.shopify.com/s/files/1/0251/7706/3523/products/a1_99a17505-e044-4bf6-b795-d1cfce13431a_1296x.jpg?v=1589388821',
        price: 899
    },
    {
        name: 'Chamarra Alfabeto',
        image: 'https://cdn.shopify.com/s/files/1/0251/7706/3523/products/Tazia-Chamarra-Alfabeto-Negro-Estampado-Frontal-Abierta_1296x.jpg?v=1603310049',
        price: 980
    },
    {
        name: 'Windbreaker Lúdico',
        image: 'https://cdn.shopify.com/s/files/1/0251/7706/3523/products/Tazia-Chamarra-Winbreaker-Ludico-Negro-Amarillo-Verde-Azul-Jade-Rojo-Lateral_14cc5586-f881-4f55-a2d1-36cc2ce6c8b5_1296x.jpg?v=1594489444',
        price: 980
    },
    {
        name: 'Trooper',
        image: 'https://cdn.shopify.com/s/files/1/0251/7706/3523/products/Tazia-Chamarra-Windbreaker-Trooper-Blanco-Negro-Frontal_800x.jpg?v=1594331785',
        price: 999
    },
    {
        name: 'MZ-20 / A',
        image: 'https://cdn.shopify.com/s/files/1/0251/7706/3523/products/Tazia-Chamarra-MZ-20-A1-Verde-Amarillo-Morado-Frontal_1296x.jpg?v=1594339412',
        price: 999
    },
    {
        name: 'Windbreaker Frapper',
        image: 'https://cdn.shopify.com/s/files/1/0251/7706/3523/products/Tazia-Chamarra-Windbreaker-Frapper-Crema-Azul-Naranja-Bolsillos_1296x.jpg?v=1594413600',
        price: 1100
    },
    {
        name: 'Pastel Marble',
        image: 'https://cdn.shopify.com/s/files/1/0251/7706/3523/products/G04_1296x.jpg?v=1581633065',
        price: 1160
    },
    {
        name: 'Jacket Pastel',
        image: 'https://cdn.shopify.com/s/files/1/0251/7706/3523/products/Tazia-BomberJacketPastelUnisex-Azul-Verde-Blanco-Lila-Amarillo-Rosa-Frontal_3a7b86d4-5d59-4ad0-ac89-e8abd9333a69_720x.jpg?v=1603307860',
        price: 1100
    }
];

const changeCart = (target, qty) => {
    const currentCart = JSON.parse(localStorage.getItem('shoppingCart'));

    currentCart.forEach((item, index) => {
        if(item.item === target) {
            item.count += qty;
            if(item.count === 0) currentCart.splice(index, 1);
        }
    });

    localStorage.setItem('shoppingCart', JSON.stringify(currentCart));
}

const calculateTotal = () => {
    const cartSubtotalContainer = document.querySelector('.shopping-cart__subTotal__value');
    const cartDiscountContainer = document.querySelector('.shopping-cart__discount__value');
    const cartTotalContainer = document.querySelector('.shopping-cart__total__value');
    const discountAmount = document.querySelector('.shopping-cart__discount__amount');
    const discountTitle = document.querySelector('.shopping-cart__discount__title');
    const subtotalTitle = document.querySelector('.shopping-cart__subTotal__title');
    const currentDiscount = localStorage.getItem('discount');

    const currentCart = JSON.parse(localStorage.getItem('shoppingCart'));
    let cartTotal = 0;

    currentCart.forEach((product) =>  cartTotal += productData[product.item].price * product.count);

    let discountPrice = 0;

    currentDiscount !== null && currentDiscount !== '0' ? (
        discountTitle.classList.remove('d-none'),
        subtotalTitle.classList.remove('d-none'),
        cartDiscountContainer.classList.remove('d-none'),
        cartSubtotalContainer.classList.remove('d-none'),
        discountAmount.textContent = currentDiscount + '%',
        discountPrice = (cartTotal * (currentDiscount / 100)).toFixed(2),
        cartDiscountContainer.textContent = '-$' + discountPrice
    ) : (
        discountTitle.classList.add('d-none'),
        subtotalTitle.classList.add('d-none'),
        cartDiscountContainer.classList.add('d-none'),
        cartSubtotalContainer.classList.add('d-none'),
        discountAmount.textContent = '0'
    );
    
    cartSubtotalContainer.textContent = '$' + cartTotal + '.00';
    cartTotalContainer.textContent = '$' + (cartTotal - discountPrice).toFixed(2);
}

const loadCart = () => {
    const cartString = localStorage.getItem('shoppingCart');
    const itemContainer = document.querySelector('.shopping-cart__item-container');

    if(cartString !== null && cartString !== '[]') {
        const currentCart = JSON.parse(cartString);

        currentCart.forEach((product) => {
            const item = `
                <div class="col-12 shopping-cart__item" id="item__${product.item}">
                    <div class="col-12 col-md-2 shopping-cart__item__image-container">
                        <img src="${productData[product.item].image}" class="shopping-cart__item__image">
                    </div>
                    <div class="col-12 col-md-5">
                        <h3 class="shopping-cart__item__name">${productData[product.item].name}</h3>
                    </div>
                    <div class="col-12 col-md-2 shopping-cart__item__quantity">
                        <button class="shopping-cart__item__button shopping-cart__item__button--minus btn btn-light" data-target="${product.item}">
                            <i class="fal fa-minus"></i>
                        </button>
                        <input type="text" class="shopping-cart__item__count" id="input__${product.item}" value="${product.count}">
                        <button class="shopping-cart__item__button shopping-cart__item__button--plus btn btn-light" data-target="${product.item}">
                            <i class="fal fa-plus"></i>
                        </button>
                    </div>
                    <div class="col-12 col-md-2 text-center">
                        <p class="shopping-cart__item__price">$${productData[product.item].price}.00</p>
                    </div>
                    <div class="col-12 col-md-1 text-right">
                        <button class="shopping-cart__item__button shopping-cart__item__button--delete btn btn-danger" data-target="${product.item}">
                            <i class="fal fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            
            itemContainer.insertAdjacentHTML('beforeend', item);
        });
    } else {
        const emptyCartMsg = `
            <div class="col-12 shopping-cart__emptyCartMsg-container">
                <p class="shopping-cart__emptyCartMsg">Tu carrito está vacío. Agrega productos para verlos aquí.</p>
            </div>
        `;
        itemContainer.insertAdjacentHTML('beforeend', emptyCartMsg);
    }

    calculateTotal();

    const minusButtons = Array.from(document.querySelectorAll('.shopping-cart__item__button--minus'));
    const plusButtons = Array.from(document.querySelectorAll('.shopping-cart__item__button--plus'));
    const deleteButtons = Array.from(document.querySelectorAll('.shopping-cart__item__button--delete'));

    minusButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const target = button.dataset.target;
            const wantedInput = document.querySelector('#input__' + target);
            const wantedElement = document.querySelector('#item__' + target);

            wantedInput.value - 1 > 0 ? (
                wantedInput.value--,
                changeCart(target, -1)
            ) : (
                confirm('¿Desea eliminar este producto de su carrito?') ? (
                    wantedElement.remove(),
                    changeCart(target, -1)
                ) : wantedInput.value
            );

            calculateTotal();
        });
    });

    plusButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const target = button.dataset.target;
            const wantedInput = document.querySelector('#input__' + target);

            wantedInput.value++;
            changeCart(target, 1);
            
            calculateTotal();
        });
    });

    deleteButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const target = button.dataset.target;
            const wantedInput = document.querySelector('#input__' + target);
            const wantedElement = document.querySelector('#item__' + target);

            confirm('¿Desea eliminar este producto de su carrito?') ? (
                wantedElement.remove(),
                changeCart(target, wantedInput.value * -1)
            ) : wantedInput.value;

            calculateTotal();
        });
    });
};