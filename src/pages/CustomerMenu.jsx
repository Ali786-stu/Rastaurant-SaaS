import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';

// Complete mock items list
const MENU_ITEMS = [
  // Mains
  {
    id: 'm1',
    category: 'Mains',
    name: 'Truffle Risotto',
    price: 24.00,
    tags: ['Vegetarian', 'GF'],
    description: 'Creamy Arborio rice slow-cooked with wild mushrooms, finished with white truffle oil and aged Parmesan.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMqrOw4APsNpZBChZthfOjEM7Z14XhBBwngSK2UfcljYGUQBwT8MMOZaBIwr0ZTthrh37A5P8351Go_po10TV0rSEdponplzWdGvukKt5O17CdPt4cpZsTHthbEZ5LusdAFnk-x71OEhoUSZNIRlYxLCYKHG4SMDBUEdtakJa1UGqgNdF3BG5qgaBq9nNb3Zfn7qDrJRfO50wKO-CR9UAF84_P4jMJaCje5sBObT_keCcPNcmEqP1z6ee5xeF_G1cpIIItEWeAXE'
  },
  {
    id: 'm2',
    category: 'Mains',
    name: 'Grilled Salmon',
    price: 28.50,
    tags: [],
    description: 'Atlantic salmon fillet with lemon herb butter, served over seasonal roasted vegetables and quinoa.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsc8w3qGGVdyAXBW6wzAkxCtQnqQtD8yJrc114wZruwF1gaLU-cqVQ7bXUlAY1PqbZZL22fxRXsPsOgBDKJHx78gd1uV5Cs5VVKqfJPVXacokI6nUQV_Z5HS2aGm-2o1p_ESh2ukGR5KcV8YWj1-I723gdA2xm8TmDpxFQqWTxx3-LzhtgGiWDYwDYIeRFzH1UiH286EJxa2I3Mt3JTiBPf7FcLNDMg9emVaaYNczP-RaYqtnV_iup1TX3xF-hE-TQNlOFd3dh9As'
  },
  {
    id: 'm3',
    category: 'Mains',
    name: 'Signature Burger',
    price: 18.00,
    tags: [],
    soldOut: true,
    description: 'Wagyu beef patty, aged cheddar, caramelized onions, and house sauce on a toasted brioche bun.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBF8J5yRdalRn4fIdAzDp9Nt_8NCQyrezW59RffWgkruOksJJ7V4JddyLV0bvs-R0RDbM3DldS_jHiZCcolt3je1zYUUbmqmrVVMKCFLt9HyjwoBmuB4odNAej5Pw86HwyxVt5dMszYmFbjl31EZq1BBXjwgsAPJl2RpVHhtb09GNJePskZakR3mEw7eq6bIhI1w7MB61eG_lgVWye3a75UV61VkAjCiBz9uNyW3yw7gjNUi31tp-QVtPgIzhRC_nUuWC0ifwpCYjg'
  },
  {
    id: 'm4',
    category: 'Mains',
    name: 'Harvest Bowl',
    price: 16.50,
    tags: ['Vegan'],
    description: 'Roasted sweet potatoes, quinoa, kale, avocado, and toasted seeds with a tahini lemon dressing.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4_d5ZClzLyM4nGRPfIbTkkBxUn7ZPkpAfd-sq0iGJ0ptKO70LZ1YR7HGU5U_AtqtNy9jQ-d_NXLcuT5rl-hVMEZ_juRyeA3Ca70YHA_dIzFnNL0sLxkVGcYaJQmoqZmW_EQfqvMNibKyHMkjga1CYMrzKoe3duFCFGtJOkLoa9gmufk8Z98SVAvVzLfkUzNZsE5itmmSuSSb77-Gwpac0B-6lLZtklK2P_SuFZczeNTix_ASDU_8icd5LKETG9r3-9vqD7DFShTs'
  },
  // Starters
  {
    id: 's1',
    category: 'Starters',
    name: 'Truffle Fries',
    price: 9.50,
    tags: ['Vegetarian'],
    description: 'Extra crispy golden fries tossed in aromatic truffle oil, freshly shaved parmesan, and herbs.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMsjzWe9CWiG_gOnffdvfT0axrxdat-ts3cFqu6LBtSN7GgraQs8q3-psmU5gzU9iBstYqJW-FWLzC1ULuMTc0ZzNeWJkKFTG3tTPzugEYGZFLgUuphTforBX4Yocu7Pzvb-BcEnnu7xId0phMklUFXY-yc0X93q7CX8e0XCq-fzBNzWByWSqgrr3FX9-_dP0ENveC5mZUVACmJsVOpPQD3zYAzQdkuaD-SB1IySoy-MyGzU8X7jis2r3FiZ_hLckw66xGR-W1Xsg'
  },
  {
    id: 's2',
    category: 'Starters',
    name: 'Caesar Salad',
    price: 12.00,
    tags: [],
    description: 'Crisp romaine lettuce hearts, buttery garlic croutons, dynamic parmesan cheese, and creamy caesar dressing.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVh0CRjkJP9HTkEwjHZO9eJbieJmpFWGitcW0zfHCMHIIvkmPJ-ii6bTJbe8Idu--8KrG3IGh_DpxxKwlTIBKaRHJISKFIeppFxquWb1igPavW2LZGRUPW7BJwCBofzqmUvKItgETGhIr5cXrrg7EN9YDiGK9xsdbL6MMUKrdmyY5IDrfWMx8eqNowyu8YruojkTrf9SW5xFqGCqukXy_SlziFwBbEWuAIoe8F338i9bgaXGpVVA2JOoyioQ6KmvGq0SrpCUQzzbc'
  },
  {
    id: 's3',
    category: 'Starters',
    name: 'Charcuterie Board',
    price: 19.00,
    tags: ['GF Available'],
    description: 'A curation of premium imported cheeses, gourmet salami, prosciutto, seasonal berries, honey, and crackers.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-qkQXEujwHXh5w4Xp1343GWnTrr14oUp6IIE9g18latJpFKfNhvyx8Fm2KjykmPq2zTPnC0UREuJQ2QcZacDYUd2BbZQaOxkHBqc1bZuriLQhQrKFdA8OTrap1CAuw9HhlSORg6BZ24EUDC4TTP-7bPyfMudySnlzyXNkjhg-3CmHfHQTJjr8hWNWfJElLW0-BwiLoGKQRm4uOxFtMQAw85NNrNX__uoGMI6aYpFitTduqZof2xp0uMAw-XapwZVO3QgjSuSAuCw'
  },
  // Drinks
  {
    id: 'd1',
    category: 'Drinks',
    name: 'Lemonade',
    price: 4.50,
    tags: ['Vegan', 'Agave'],
    description: 'Agave sweetened fresh organic lemons squeezed daily over ice and pure spring water.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4_d5ZClzLyM4nGRPfIbTkkBxUn7ZPkpAfd-sq0iGJ0ptKO70LZ1YR7HGU5U_AtqtNy9jQ-d_NXLcuT5rl-hVMEZ_juRyeA3Ca70YHA_dIzFnNL0sLxkVGcYaJQmoqZmW_EQfqvMNibKyHMkjga1CYMrzKoe3duFCFGtJOkLoa9gmufk8Z98SVAvVzLfkUzNZsE5itmmSuSSb77-Gwpac0B-6lLZtklK2P_SuFZczeNTix_ASDU_8icd5LKETG9r3-9vqD7DFShTs'
  },
  {
    id: 'd2',
    category: 'Drinks',
    name: 'Craft Beer - IPA',
    price: 7.00,
    tags: ['Local'],
    description: 'Crisp locally brewed West Coast double India Pale Ale loaded with refreshing citrus pine hop details.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMqrOw4APsNpZBChZthfOjEM7Z14XhBBwngSK2UfcljYGUQBwT8MMOZaBIwr0ZTthrh37A5P8351Go_po10TV0rSEdponplzWdGvukKt5O17CdPt4cpZsTHthbEZ5LusdAFnk-x71OEhoUSZNIRlYxLCYKHG4SMDBUEdtakJa1UGqgNdF3BG5qgaBq9nNb3Zfn7qDrJRfO50wKO-CR9UAF84_P4jMJaCje5sBObT_keCcPNcmEqP1z6ee5xeF_G1cpIIItEWeAXE'
  }
];

const CustomerMenu = () => {
  const { cart, addToCart, removeFromCart, updateCartQuantity, placeOrder, tableNumber, setTableNumber } = useOrders();
  const [activeCategory, setActiveCategory] = useState('Mains');
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  const categories = ['Mains', 'Starters', 'Drinks'];
  const filteredItems = MENU_ITEMS.filter((item) => item.category === activeCategory);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    const orderId = placeOrder();
    setCartOpen(false);
    navigate('/tracking');
  };

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-32">
      {/* TopAppBar */}
      <header className="bg-primary backdrop-blur-md fixed top-0 left-0 right-0 w-full z-50 border-b border-outline-variant/30 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-on-primary">
          <span className="material-symbols-outlined icon-fill">restaurant</span>
          <span className="font-headline-md text-headline-md font-bold">WingsRiver</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full font-label-caps text-xs flex items-center gap-1">
            Table 
            <input 
              type="text" 
              value={tableNumber} 
              onChange={(e) => setTableNumber(e.target.value)} 
              className="bg-transparent border-0 p-0 text-center w-6 focus:ring-0 font-bold"
            />
          </div>
          <button 
            onClick={() => setCartOpen(true)}
            aria-label="Cart" 
            className="text-on-primary hover:bg-white/10 transition-colors rounded-full p-2 relative"
          >
            <span className="material-symbols-outlined">shopping_bag</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-tertiary-container text-on-tertiary-container w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
        {/* Category Tabs */}
        <nav className="flex overflow-x-auto hide-scrollbar gap-base py-base mb-4 sticky top-16 z-40 bg-background/95 backdrop-blur-sm -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-6 py-2 rounded-full font-label-caps text-xs transition-colors border ${
                activeCategory === category
                  ? 'bg-primary-container text-on-primary-container border-primary-container font-semibold'
                  : 'border-outline-variant text-on-surface-variant hover:bg-surface-variant/20'
              }`}
            >
              {category}
            </button>
          ))}
        </nav>

        <h1 className="font-headline-xl-mobile md:font-headline-lg text-headline-xl-mobile md:text-headline-lg mb-4 text-on-background">
          {activeCategory} Courses
        </h1>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-gutter">
          {filteredItems.map((item) => {
            const cartItem = cart.find((i) => i.id === item.id);
            return (
              <article 
                key={item.id} 
                className={`bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col border border-outline-variant/10 transition-transform ${
                  item.soldOut ? 'opacity-60 grayscale-[50%] pointer-events-none' : ''
                }`}
              >
                <div className="relative h-48 w-full bg-surface-variant">
                  {item.soldOut && (
                    <div className="absolute inset-0 bg-surface/50 z-10 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="bg-error text-on-error px-4 py-2 rounded-full font-label-caps text-xs uppercase tracking-wider">Sold Out</span>
                    </div>
                  )}
                  <img 
                    alt={item.name} 
                    className="w-full h-full object-cover rounded-t-xl" 
                    src={item.image} 
                    loading="lazy" 
                  />
                  <div className="absolute top-2 left-2 flex gap-1 z-20">
                    {item.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="bg-secondary-container/90 text-on-secondary-container px-2.5 py-0.5 rounded-full font-body-sm text-xs backdrop-blur-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="font-headline-md text-xl text-on-surface line-clamp-1">{item.name}</h2>
                    <span className="font-headline-md text-lg text-primary font-bold">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="font-body-sm text-sm text-on-surface-variant line-clamp-2 mb-4 flex-grow">
                    {item.description}
                  </p>

                  {/* Quantity Actions or Add Button */}
                  {cartItem ? (
                    <div className="flex items-center justify-between bg-surface-container rounded-lg p-1">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Decrease quantity" 
                        className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm hover:brightness-95 active:scale-95 transition-transform"
                      >
                        <span className="material-symbols-outlined text-[20px]">remove</span>
                      </button>
                      <span className="font-label-caps text-sm text-on-surface px-4 font-bold">{cartItem.quantity}</span>
                      <button 
                        onClick={() => addToCart(item)}
                        aria-label="Increase quantity" 
                        className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm hover:brightness-110 active:scale-95 transition-transform"
                      >
                        <span className="material-symbols-outlined text-[20px]">add</span>
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => addToCart(item)}
                      className="w-full bg-primary hover:bg-primary/95 text-on-primary font-label-caps text-xs py-3.5 rounded-lg transition-all border-b-2 border-on-primary-fixed-variant flex items-center justify-center gap-2 active:border-b-0 active:translate-y-[2px]"
                    >
                      <span className="material-symbols-outlined text-[18px]">add</span>
                      Add to Order
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </main>

      {/* Floating Cart Bar (Mobile Only view shortcut) */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-20 left-0 right-0 w-full px-margin-mobile md:px-margin-desktop z-40 md:hidden pointer-events-none">
          <div 
            onClick={() => setCartOpen(true)}
            className="max-w-md mx-auto bg-inverse-surface text-inverse-on-surface rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] p-4 flex items-center justify-between pointer-events-auto active:scale-95 transition-transform cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center font-label-caps text-xs font-bold">
                {cartItemCount}
              </div>
              <span className="font-label-caps text-xs uppercase tracking-wider">View Cart & Checkout</span>
            </div>
            <span className="font-headline-md text-lg font-bold">${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* Shopping Cart Modal Side-Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end transition-opacity duration-300">
          {/* Backdrop Closer */}
          <div className="flex-1" onClick={() => setCartOpen(false)}></div>
          
          {/* Drawer Panel */}
          <div className="w-full max-w-md bg-surface-container-lowest h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-slide-in relative">
            <div>
              {/* Drawer Header */}
              <div className="flex justify-between items-center border-b border-outline-variant/30 pb-4 mb-6">
                <h2 className="font-headline-md text-xl font-bold text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined">shopping_bag</span>
                  Your Table {tableNumber} Cart
                </h2>
                <button 
                  onClick={() => setCartOpen(false)}
                  className="p-1 hover:bg-surface-variant/30 rounded-full transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Cart Items list */}
              {cart.length === 0 ? (
                <div className="text-center py-12 flex flex-col items-center gap-4 text-on-surface-variant">
                  <span className="material-symbols-outlined text-6xl opacity-30">restaurant_menu</span>
                  <p className="font-body-md">Your cart is feeling dynamic but empty!</p>
                  <button 
                    onClick={() => setCartOpen(false)} 
                    className="text-primary underline font-medium"
                  >
                    Browse delicious mains
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-outline-variant/10 pb-4 last:border-0">
                      <img className="w-16 h-16 rounded-lg object-cover bg-surface-variant shrink-0" src={item.image} alt={item.name} />
                      <div className="flex-grow">
                        <div className="flex justify-between font-bold">
                          <span className="font-label-md text-on-surface">{item.name}</span>
                          <span className="text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-on-surface-variant mb-2">Unit: ${item.price.toFixed(2)}</p>
                        
                        {/* Option Note */}
                        <input 
                          type="text" 
                          placeholder="Special instructions (e.g. no onions)" 
                          value={item.note || ''}
                          onChange={(e) => updateCartQuantity(item.id, item.quantity, e.target.value)}
                          className="w-full text-xs bg-surface-container border-0 rounded p-1.5 focus:ring-1 focus:ring-primary mb-2 text-on-surface"
                        />

                        {/* Quantity controls */}
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="bg-surface-container hover:bg-surface-dim rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold"
                          >
                            -
                          </button>
                          <span className="text-sm font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="bg-surface-container hover:bg-surface-dim rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="border-t border-outline-variant/30 pt-6 mt-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-on-surface-variant font-body-md text-md">Grand Total</span>
                  <span className="font-headline-lg text-2xl font-bold text-primary">${cartTotal.toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-[#214329] hover:bg-[#092d15] text-on-primary font-label-caps py-4 rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-2 border-b-4 border-[#00210b] active:border-b-0 active:translate-y-[4px]"
                >
                  <span className="material-symbols-outlined">send</span>
                  Place Table Order
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* BottomNavBar (Mobile Only) */}
      <nav className="bg-primary backdrop-blur-md fixed bottom-0 left-0 right-0 w-full z-50 rounded-t-xl shadow-[0_-4px_12px_rgba(0,0,0,0.06)] flex justify-around items-center h-16 pb-safe px-4 md:hidden max-w-md mx-auto">
        <button className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1.5 active:scale-90 transition-transform">
          <span className="material-symbols-outlined icon-fill">menu_book</span>
          <span className="font-body-sm text-[10px] mt-0.5">Menu</span>
        </button>
        <button 
          onClick={() => navigate('/tracking')}
          className="flex flex-col items-center justify-center text-on-primary/75 hover:text-on-primary active:scale-90 transition-transform relative"
        >
          <span className="material-symbols-outlined">receipt_long</span>
          <span className="font-body-sm text-[10px] mt-0.5">Track Order</span>
          <span className="absolute top-0 right-3 w-2 h-2 bg-error rounded-full animate-ping"></span>
        </button>
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex flex-col items-center justify-center text-on-primary/75 hover:text-on-primary active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined">admin_panel_settings</span>
          <span className="font-body-sm text-[10px] mt-0.5">Staff</span>
        </button>
      </nav>
    </div>
  );
};

export default CustomerMenu;
