import {
    createContext,
    useState,
    useEffect
} from 'react';


export const CartContext = createContext();


const CartProvider = ({ children }) => {

    const [cart, setCart] = useState(() => {

        const savedCart =
            localStorage.getItem('cart');

        return savedCart
            ? JSON.parse(savedCart)
            : [];

    });


    useEffect(() => {

        localStorage.setItem(
            'cart',
            JSON.stringify(cart)
        );

    }, [cart]);


    // ADD TO CART
    const addToCart = (plant) => {

        setCart([...cart, plant]);

    };


    // REMOVE FROM CART
    const removeFromCart = (id) => {

        const updatedCart =
            cart.filter(
                (item) => item._id !== id
            );

        setCart(updatedCart);

    };


    return (

        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart
            }}
        >

            {children}

        </CartContext.Provider>

    );

};

export default CartProvider;