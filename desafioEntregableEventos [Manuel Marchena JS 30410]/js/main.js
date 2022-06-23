let shop = document.getElementById('shop')
let cesta = []

let generateShop = () => {
    return (shop.innerHTML = shopItemsData
        .map((x) => {
            let { id, name, price, desc, img } = x
            let search = cesta.find((x) => x.id === id) || []
            return `
        <div id=product-id-${id} class="item">
            <img src=${img} alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i onClick="increment(${id})" class="bi bi-plus-circle"></i>
                        <div id=${id} class="quantity">
                        ${x.item === undefined ? 0 : search.item}
                        </div>
                        <i onClick="decrement(${id})" class="bi bi-dash-circle"></i>
                    </div>
                </div>

            </div>
        </div>
    `
        })
        .join(""))
}


generateShop()
    /**
     * ! addEventListener(click, increment(id))
     */
let increment = (id) => {
    let selectedItem = id
    let search = cesta.find((x) => x.id === selectedItem.id)

    if (search === undefined) {
        cesta.push({
            id: selectedItem.id,
            item: 1,
        })
    } else {
        search.item += 1
    }

    update(selectedItem.id)

}

let decrement = (id) => {
    let selectedItem = id
    let search = cesta.find((x) => x.id === selectedItem.id)

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    update(selectedItem.id)
    cesta = cesta.filter((x) => x.item !== 0)

}
let update = (id) => {
    let search = cesta.find((x) => x.id === id)
    document.getElementById(id).innerHTML = search.item
    calculation()
}

let calculation = () => {
    let cartIcon = document.getElementById("carritoCantidad")
    cartIcon.innerHTML = cesta.map((x) => x.item).reduce((x, y) => x + y, 0)
}
calculation()