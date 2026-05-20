import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  // Pre-populated mock orders matching the staff dashboard and analytics screens
  const [orders, setOrders] = useState([
    {
      id: 1042,
      table: 'Table 12',
      status: 'Pending', // Pending, Preparing, Ready, Served
      time: '2 mins ago',
      timeRaw: '18:45',
      items: [
        { name: 'Truffle Fries', quantity: 2, note: 'Extra crispy' },
        { name: 'Wagyu Burger', quantity: 1, note: 'No Onions, Medium Rare', warning: true }
      ]
    },
    {
      id: 1038,
      table: 'Table 04',
      status: 'Preparing',
      time: '5 mins ago',
      timeRaw: '18:42',
      items: [
        { name: 'Caesar Salad', quantity: 1, completed: true },
        { name: 'Ribeye Steak', quantity: 1, note: 'Medium' },
        { name: 'Roasted Vegetables', quantity: 1 }
      ]
    },
    {
      id: 1035,
      table: 'Table 08',
      status: 'Ready',
      time: '12 mins ago',
      timeRaw: '18:35',
      items: [
        { name: 'Lemonade', quantity: 2, completed: true },
        { name: 'Salmon Filet', quantity: 1, completed: true }
      ]
    },
    {
      id: 1040,
      table: 'Bar',
      status: 'Preparing',
      time: '8 mins ago',
      timeRaw: '18:39',
      items: [
        { name: 'Craft Beer - IPA', quantity: 3 },
        { name: 'Charcuterie Board', quantity: 1, note: 'Gluten-free crackers' }
      ]
    }
  ]);

  const [cart, setCart] = useState([]);
  const [activeCustomerOrder, setActiveCustomerOrder] = useState(null);
  const [tableNumber, setTableNumber] = useState('7');

  // Load active tracking order if there is none
  useEffect(() => {
    if (!activeCustomerOrder) {
      setActiveCustomerOrder({
        id: 4092,
        status: 'Preparing', // Received, Accepted, Preparing, Ready, Served
        time: '1:20 PM',
        expectedTime: '1:45 PM',
        etaMins: 12,
        items: [
          { name: 'Avocado Super Greens', quantity: 1, note: 'No onions', price: 14.50, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMsjzWe9CWiG_gOnffdvfT0axrxdat-ts3cFqu6LBtSN7GgraQs8q3-psmU5gzU9iBstYqJW-FWLzC1ULuMTc0ZzNeWJkKFTG3tTPzugEYGZFLgUuphTforBX4Yocu7Pzvb-BcEnnu7xId0phMklUFXY-yc0X93q7CX8e0XCq-fzBNzWByWSqgrr3FX9-_dP0ENveC5mZUVACmJsVOpPQD3zYAzQdkuaD-SB1IySoy-MyGzU8X7jis2r3FiZ_hLckw66xGR-W1Xsg' },
          { name: 'Bistro Classic Burger', quantity: 1, note: 'Medium Rare', price: 18.00, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVh0CRjkJP9HTkEwjHZO9eJbieJmpFWGitcW0zfHCMHIIvkmPJ-ii6bTJbe8Idu--8KrG3IGh_DpxxKwlTIBKaRHJISKFIeppFxquWb1igPavW2LZGRUPW7BJwCBofzqmUvKItgETGhIr5cXrrg7EN9YDiGK9xsdbL6MMUKrdmyY5IDrfWMx8eqNowyu8YruojkTrf9SW5xFqGCqukXy_SlziFwBbEWuAIoe8F338i9bgaXGpVVA2JOoyioQ6KmvGq0SrpCUQzzbc' }
        ],
        total: 32.50
      });
    }
  }, []);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateCartQuantity = (itemId, quantity, note) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((i) => i.id !== itemId));
    } else {
      setCart((prev) => prev.map((i) => (i.id === itemId ? { ...i, quantity, note: note !== undefined ? note : i.note } : i)));
    }
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map((i) => (i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i));
      }
      return prev.filter((i) => i.id !== itemId);
    });
  };

  const placeOrder = () => {
    if (cart.length === 0) return;

    const newOrderId = Math.floor(1000 + Math.random() * 9000);
    const newOrder = {
      id: newOrderId,
      table: `Table ${tableNumber}`,
      status: 'Pending',
      time: 'Just now',
      timeRaw: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        note: item.note || ''
      }))
    };

    // Add to staff dashboard
    setOrders((prev) => [newOrder, ...prev]);

    // Set active tracking order for customer
    const totalCost = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const trackingOrder = {
      id: newOrderId,
      status: 'Received',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      expectedTime: new Date(Date.now() + 25 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      etaMins: 25,
      items: [...cart],
      total: totalCost
    };
    setActiveCustomerOrder(trackingOrder);
    setCart([]); // Clear cart
    return newOrderId;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );

    // Sync with active customer order if it matches
    if (activeCustomerOrder && activeCustomerOrder.id === orderId) {
      setActiveCustomerOrder((prev) => ({
        ...prev,
        status: newStatus,
        etaMins: newStatus === 'Preparing' ? 12 : newStatus === 'Ready' ? 2 : 0
      }));
    }
  };

  // Helper functions for easy staff operations
  const acceptOrder = (orderId) => updateOrderStatus(orderId, 'Preparing');
  const markReady = (orderId) => updateOrderStatus(orderId, 'Ready');
  const markServed = (orderId) => updateOrderStatus(orderId, 'Served');

  return (
    <OrderContext.Provider
      value={{
        orders,
        cart,
        activeCustomerOrder,
        tableNumber,
        setTableNumber,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        placeOrder,
        updateOrderStatus,
        acceptOrder,
        markReady,
        markServed
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
