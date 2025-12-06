import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { GrRadialSelected } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";

const startersItem = [
  {
    id: 1,
    name: "Paneer Tikka",
    price: 250,
    category: "Vegetarian",
  },
  {
    id: 2,
    name: "Chicken Tikka",
    price: 300,
    category: "Non-Vegetarian",
  },
  {
    id: 3,
    name: "Tandoori Chicken",
    price: 350,
    category: "Non-Vegetarian",
  },
  {
    id: 4,
    name: "Samosa",
    price: 100,
    category: "Vegetarian",
  },
  {
    id: 5,
    name: "Aloo Tikki",
    price: 120,
    category: "Vegetarian",
  },
  {
    id: 6,
    name: "Hara Bhara Kebab",
    price: 220,
    category: "Vegetarian",
  },
];

const mainCourse = [
  {
    id: 1,
    name: "Butter Chicken",
    price: 400,
    category: "Non-Vegetarian",
  },
  {
    id: 2,
    name: "Paneer Butter Masala",
    price: 350,
    category: "Vegetarian",
  },
  {
    id: 3,
    name: "Chicken Biryani",
    price: 450,
    category: "Non-Vegetarian",
  },
  {
    id: 4,
    name: "Dal Makhani",
    price: 180,
    category: "Vegetarian",
  },
  {
    id: 5,
    name: "Kadai Paneer",
    price: 300,
    category: "Vegetarian",
  },
  {
    id: 6,
    name: "Rogan Josh",
    price: 500,
    category: "Non-Vegetarian",
  },
];

const beverages = [
  {
    id: 1,
    name: "Masala Chai",
    price: 50,
    category: "Hot",
  },
  {
    id: 2,
    name: "Lemon Soda",
    price: 80,
    category: "Cold",
  },
  {
    id: 3,
    name: "Mango Lassi",
    price: 120,
    category: "Cold",
  },
  {
    id: 4,
    name: "Cold Coffee",
    price: 150,
    category: "Cold",
  },
  {
    id: 5,
    name: "Fresh Lime Water",
    price: 60,
    category: "Cold",
  },
  {
    id: 6,
    name: "Iced Tea",
    price: 100,
    category: "Cold",
  },
];

const soups = [
  {
    id: 1,
    name: "Tomato Soup",
    price: 120,
    category: "Vegetarian",
  },
  {
    id: 2,
    name: "Sweet Corn Soup",
    price: 130,
    category: "Vegetarian",
  },
  {
    id: 3,
    name: "Hot & Sour Soup",
    price: 140,
    category: "Vegetarian",
  },
  {
    id: 4,
    name: "Chicken Clear Soup",
    price: 160,
    category: "Non-Vegetarian",
  },
  {
    id: 5,
    name: "Mushroom Soup",
    price: 150,
    category: "Vegetarian",
  },
  {
    id: 6,
    name: "Lemon Coriander Soup",
    price: 110,
    category: "Vegetarian",
  },
];

const desserts = [
  {
    id: 1,
    name: "Gulab Jamun",
    price: 100,
    category: "Vegetarian",
  },
  {
    id: 2,
    name: "Kulfi",
    price: 150,
    category: "Vegetarian",
  },
  {
    id: 3,
    name: "Chocolate Lava Cake",
    price: 250,
    category: "Vegetarian",
  },
  {
    id: 4,
    name: "Ras Malai",
    price: 180,
    category: "Vegetarian",
  },
];

const pizzas = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: 350,
    category: "Vegetarian",
  },
  {
    id: 2,
    name: "Veg Supreme Pizza",
    price: 400,
    category: "Vegetarian",
  },
  {
    id: 3,
    name: "Pepperoni Pizza",
    price: 450,
    category: "Non-Vegetarian",
  },
];

const alcoholicDrinks = [
  {
    id: 1,
    name: "Beer",
    price: 200,
    category: "Alcoholic",
  },
  {
    id: 2,
    name: "Whiskey",
    price: 500,
    category: "Alcoholic",
  },
  {
    id: 3,
    name: "Vodka",
    price: 450,
    category: "Alcoholic",
  },
  {
    id: 4,
    name: "Rum",
    price: 350,
    category: "Alcoholic",
  },
  {
    id: 5,
    name: "Tequila",
    price: 600,
    category: "Alcoholic",
  },
  {
    id: 6,
    name: "Cocktail",
    price: 400,
    category: "Alcoholic",
  },
];

const salads = [
  {
    id: 1,
    name: "Caesar Salad",
    price: 200,
    category: "Vegetarian",
  },
  {
    id: 2,
    name: "Greek Salad",
    price: 250,
    category: "Vegetarian",
  },
  {
    id: 3,
    name: "Fruit Salad",
    price: 150,
    category: "Vegetarian",
  },
  {
    id: 4,
    name: "Chicken Salad",
    price: 300,
    category: "Non-Vegetarian",
  },
  {
    id: 5,
    name: "Tuna Salad",
    price: 350,
  },
];

const menus = [
  {
    id: 1,
    name: "Starters",
    bgColor: "#b73e3e",
    icon: "🍲",
    items: startersItem,
  },
  {
    id: 2,
    name: "Main Course",
    bgColor: "#5b45b0",
    icon: "🍛",
    items: mainCourse,
  },
  {
    id: 3,
    name: "Beverages",
    bgColor: "#7f167f",
    icon: "🍹",
    items: beverages,
  },
  { id: 4, name: "Soups", bgColor: "#735f32", icon: "🍜", items: soups },
  { id: 5, name: "Desserts", bgColor: "#1d2569", icon: "🍰", items: desserts },
  { id: 6, name: "Pizzas", bgColor: "#285430", icon: "🍕", items: pizzas },
  {
    id: 7,
    name: "Alcoholic Drinks",
    bgColor: "#b73e3e",
    icon: "🍺",
    items: alcoholicDrinks,
  },
  { id: 8, name: "Salads", bgColor: "#5b45b0", icon: "🥗", items: salads },
];

// main function starts here
    const MenuContainer = () => {

    const [selectedMenu, setSelectedMenu] = useState(menus[0]);
    const [itemCount, setItemCount] = useState(0)
    const [itemId, setItemId] = useState()


    const increaseGuestCount = (id) => {
        setItemId(id)

        setItemCount((prev) => {
            return prev + 1
        })
    }
    const decreaseGuestCount = (id) => {
        setItemId(id)

        // setItemCount(prev => prev > 0 ?  prev - 1 : prev)
        setItemCount(prev => Math.max(prev-1, 0));
    }

    const dispatch = useDispatch()

    const handleAddToCart = (item) => {
        if(itemCount === 0){
            return 
        }

        const {name, price} = item
        const newObj = {
            id: new Date(), 
            name,
            pricePerQuantity: price,
            quantity: itemCount,
            price : price * itemCount 
        }

        // dispath data to store
        dispatch(addItem(newObj))
        setItemCount(0) // so new item can be added
    }

    return (
    <>
        <div className="grid grid-cols-4 gap-5 px-10 py-2 w-full">
        
            {menus.map((menu) => {
                return (
                <div
                    key={menu.id}
                    style={{ backgroundColor: menu.bgColor }}
                    className="flex flex-col items-start justify-between p-3 rounded h-[90px] cursor-pointer"
                    onClick={() => {
                      setSelectedMenu(menu)
                      setItemCount(0)
                    }}
                >
                    <div className="flex items-center justify-between w-full">
                        
                        <h1 className="text-[#f5f5f5] text-base font-semibold">
                            {menu.icon} {menu.name}
                        </h1>
                        {selectedMenu.id == menu.id && (
                            <GrRadialSelected className="text-white" size={20} />
                        )}
                    </div>

                    <p className="text-[#ababab] text-sm font-semibold">
                    {menu.items.length} Items
                    </p>
                </div>
                );
            })}
        </div>

        <hr className="border-[#2a2a2a] border-t-2 mt-2" />

        <div className="grid grid-cols-4 gap-5 px-10 py-2 mt-1 w-full">
            {selectedMenu?.items.map((item) => {
                return (
                    <div
                        key={item.id}
                        className="flex flex-col items-start justify-between p-2 rounded h-[115px] cursor-pointer bg-[#1a1a1a] hover:bg-[#2a2a2a]"
                    >
                        <div className="flex items-start justify-between w-full">
                            <h1 className="text-[#f5f5f5] text-base font-semibold">
                                {item.name}
                            </h1>

                            <button
                                onClick={() => handleAddToCart(item)} 
                                className="bg-[#2e4a40] text-[#02ca3e] p-2 rounded-lg cursor-pointer"
                            >
                                <FaShoppingCart size={15}/>
                            </button>
                        </div>

                        <div className="flex items-center justify-between w-full">
                            <p className="text-[#f5f5f5] text-base font-bold">
                                Rs{item.price}
                            </p>

                            <div className="flex items-center justify-between gap-6 bg-[#1f1f1f] px-3 py-1 rounded-lg">
                                <button
                                onClick={() => decreaseGuestCount(item.id)}
                                className="text-yellow-500 text-xl cursor-pointer"
                                >
                                &minus;
                                </button>
                                <span className="text-white"> {item.id === itemId ? itemCount : "0"} </span>
                                <button
                                onClick={() => increaseGuestCount(item.id)}
                                className="text-yellow-500 text-xl cursor-pointer"
                                >
                                &#43;
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}        
        </div>
    </>
    );
};

export default MenuContainer;
