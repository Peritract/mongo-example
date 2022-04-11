db = connect("localhost:27017/supermarket");

db.list.insertMany([
    { name: 'hummus', price: 1.99, category: 'snacks' },
    { name: 'poppadoms', price: 1.50, category: 'snacks' },
    { name: 'coffee', price: 11.49, category: 'drinks' },
    { name: 'cider', price: 3.50, category: 'drinks' },
    { name: 'milk', price: 1.99, category: 'drinks' },
    { name: 'tofu', price: 3.50, category: 'fresh' }
])

// calculate total price of all items
function totalPrice(){
    return db.list.aggregate({$group: { _id: '', total: { $sum: '$price'} }})
}

// calculate total price of each category
function categoryTotals(){
    return db.list.aggregate({$group: { _id: '$category', total: { $sum: '$price'} }})
}

// get only items that cost more x then calculate price of each matching category
function categoryTotalsForItemsOver(x){
    return db.list.aggregate([
        {$match: { price: { $gt: x} }},
        {$group: { _id: '$category', total: { $sum: '$price'} }}
    ])
}