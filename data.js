import bcrypt from 'bcryptjs'

const data = {
    users:[
        {
            name: "Ashker",
            password: bcrypt.hashSync('1234',8),
            email: "admin@example.com",
            isAdmin: true
        },
        {
            name: "John",
            password: bcrypt.hashSync('1234',8),
            email: "user@example.com",
            isAdmin: false
        }
    ],
    products : [
        {
            // _id: 1,
            name: "Nike Slim Shirts",
            category: "Shirts",
            image: "/images/p1.jpg",
            price: "120",
            brand: "Nike",
            rating: "4.5",
            numReviews: "10",
            description: "high Quality Product",
            countInStock: 10
        },
        {
            // _id: 2,
            name: "Adidas Fit Shirts",
            category: "Shirts",
            image: "/images/p2.jpg",
            price: "100",
            brand: "Adidas",
            rating: "4.0",
            numReviews: "10",
            description: "high Quality Product",
            countInStock: 0
        },
        {
            // _id: 3,
            name: "Lacoste Free Shirts",
            category: "Shirts",
            image: "/images/p3.jpg",
            price: "220",
            brand: "Lacoste",
            rating: "4.8",
            numReviews: "17",
            description: "high Quality Product",
            countInStock: 1
        },
        {
            // _id: 4,
            name: "Nike Slim Pants",
            category: "Pants",
            image: "/images/p4.jpg",
            price: "78",
            brand: "Nike",
            rating: "4.5",
            numReviews: "14",
            description: "high Quality Product",
            countInStock: 5
        },
        {
            // _id: 5,
            name: "Puma Slim Pants",
            category: "Pants",
            image: "/images/p5.jpg",
            price: "65",
            brand: "Puma",
            rating: "4.5",
            numReviews: "10",
            description: "high Quality Product",
            countInStock: 0
        },
        {
            // _id: 6,
            name: "Adidas Fit Pants",
            category: "Pants",
            image: "/images/p6.jpg",
            price: "139",
            brand: "Adidas",
            rating: "4.5",
            numReviews: "15",
            description: "high Quality Product",
            countInStock: 10
        },
    ]
}

export default data;