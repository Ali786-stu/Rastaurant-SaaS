import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';

const OrderTracking = () => {
  const { activeCustomerOrder } = useOrders();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const navigate = useNavigate();

  if (!activeCustomerOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-on-surface p-4">
        <div className="text-center bg-white rounded-xl shadow p-6 max-w-sm border border-outline-variant/10">
          <span className="material-symbols-outlined text-5xl text-primary mb-4">receipt_long</span>
          <h2 className="text-xl font-bold mb-2">No Active Order</h2>
          <p className="text-sm text-on-surface-variant mb-6">You haven't placed an order yet in this session. Head to our digital menu to place one!</p>
          <button onClick={() => navigate('/menu')} className="bg-primary text-on-primary font-label-caps py-2.5 px-6 rounded-lg w-full">
            View Menu
          </button>
        </div>
      </div>
    );
  }

  // Stages matching the order status
  // Status possibilities: 'Received', 'Accepted', 'Preparing', 'Ready', 'Served'
  const currentStatus = activeCustomerOrder.status;

  const getStageClass = (stageNum) => {
    // Stage Numbers: 1=Received, 2=Accepted, 3=Preparing, 4=Ready, 5=Served
    const statusMap = { 'Received': 1, 'Accepted': 2, 'Preparing': 3, 'Ready': 4, 'Served': 5 };
    const currentNum = statusMap[currentStatus] || 1;

    if (currentNum > stageNum) {
      return 'completed'; // Checked, muted green bg
    } else if (currentNum === stageNum) {
      return 'active'; // Glowing, pulsing green bg
    } else {
      return 'pending'; // Muted, gray border
    }
  };

  return (
    <div className="bg-background text-on-background antialiased pb-24 min-h-screen">
      {/* TopAppBar */}
      <header className="bg-surface/80 dark:bg-surface-container/80 backdrop-blur-md fixed top-0 left-0 right-0 w-full z-50 border-b border-outline-variant/30 flex justify-between items-center px-container-margin-mobile md:px-container-margin-desktop h-16 max-w-7xl mx-auto">
        <button 
          onClick={() => navigate('/menu')} 
          className="text-primary hover:bg-surface-variant/20 transition-colors p-2 rounded-full flex items-center justify-center"
        >
          <span className="material-symbols-outlined icon-fill">arrow_back</span>
        </button>
        <h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim">WingsRiver</h1>
        <button className="text-on-surface-variant hover:bg-surface-variant/20 transition-colors p-2 rounded-full flex items-center justify-center">
          <span class="material-symbols-outlined">notifications</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="pt-24 px-container-margin-mobile max-w-lg mx-auto flex flex-col gap-6">
        {/* Header / ETA Hero */}
        <section className="flex flex-col items-center text-center gap-2 mt-4">
          <p className="font-label-caps text-sm text-primary tracking-widest uppercase font-semibold">
            Order #{activeCustomerOrder.id}
          </p>
          <div className="bg-surface-container-lowest shadow-md rounded-xl p-6 w-full relative overflow-hidden flex flex-col items-center gap-2 border border-surface-variant/50">
            {/* Decorative background blob */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-container/20 rounded-full blur-2xl"></div>
            
            <h2 className="font-body-lg text-body-lg text-on-surface-variant">Estimated Time</h2>
            <div className="font-display-lg text-5xl font-bold text-primary">
              {activeCustomerOrder.etaMins > 0 ? (
                <>
                  {activeCustomerOrder.etaMins} <span className="font-headline-md text-2xl text-primary/70 font-semibold">mins</span>
                </>
              ) : (
                <span className="text-3xl">Ready to Serve!</span>
              )}
            </div>
            <p className="font-body-sm text-sm text-on-surface-variant mt-1">
              {activeCustomerOrder.status === 'Served' ? 'Order complete. Bon Appétit!' : `Expected arrival at ${activeCustomerOrder.expectedTime}`}
            </p>
          </div>
        </section>

        {/* Vertical Progress Bar */}
        <section className="bg-surface-container-lowest shadow-md rounded-xl p-6 border border-surface-variant/50 relative">
          <h3 className="font-headline-lg-mobile text-xl font-bold text-on-surface mb-6">Order Status</h3>
          
          <div className="relative flex flex-col gap-0">
            {/* Continuous Line Background */}
            <div className="absolute left-[19px] top-6 bottom-8 w-[2px] bg-surface-variant rounded-full z-0"></div>
            
            {/* Active Line Overlay */}
            <div 
              className="absolute left-[19px] top-6 w-[2px] bg-primary rounded-full z-0 transition-all duration-700"
              style={{
                height: 
                  currentStatus === 'Received' ? '0%' :
                  currentStatus === 'Accepted' ? '25%' :
                  currentStatus === 'Preparing' ? '50%' :
                  currentStatus === 'Ready' ? '75%' : '100%'
              }}
            ></div>

            {/* Stage 1: Received */}
            <div className="flex items-start gap-4 relative z-10 pb-8">
              {getStageClass(1) === 'completed' || getStageClass(1) === 'active' ? (
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center border-4 border-surface-container-lowest shrink-0 shadow-sm">
                  <span className="material-symbols-outlined icon-fill text-on-secondary-container text-sm">check</span>
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center border-4 border-surface-container-lowest shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-outline"></span>
                </div>
              )}
              <div className="flex flex-col pt-2">
                <span className={`font-label-md text-sm ${getStageClass(1) === 'active' ? 'text-primary font-bold' : 'text-on-surface'}`}>Order Received</span>
                <span className="font-body-sm text-xs text-on-surface-variant">{activeCustomerOrder.time}</span>
              </div>
            </div>

            {/* Stage 2: Accepted */}
            <div className="flex items-start gap-4 relative z-10 pb-8">
              {getStageClass(2) === 'completed' ? (
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center border-4 border-surface-container-lowest shrink-0">
                  <span className="material-symbols-outlined icon-fill text-on-secondary-container text-sm">check</span>
                </div>
              ) : getStageClass(2) === 'active' ? (
                <div className="relative w-10 h-10 shrink-0">
                  <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center border-4 border-surface-container-lowest relative z-20 shadow-[0_4px_12px_rgba(9,45,21,0.3)]">
                    <span className="material-symbols-outlined icon-fill text-on-primary text-sm">assignment_turned_in</span>
                  </div>
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center border-4 border-surface-container-lowest shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-outline-variant"></span>
                </div>
              )}
              <div className="flex flex-col pt-2">
                <span className={`font-label-md text-sm ${getStageClass(2) === 'active' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>Accepted</span>
                <span className="font-body-sm text-xs text-on-surface-variant">Order sent to the kitchen station</span>
              </div>
            </div>

            {/* Stage 3: Preparing */}
            <div className="flex items-start gap-4 relative z-10 pb-8">
              {getStageClass(3) === 'completed' ? (
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center border-4 border-surface-container-lowest shrink-0">
                  <span className="material-symbols-outlined icon-fill text-on-secondary-container text-sm">check</span>
                </div>
              ) : getStageClass(3) === 'active' ? (
                <div className="relative w-10 h-10 shrink-0">
                  <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center border-4 border-surface-container-lowest relative z-20 shadow-[0_4px_12px_rgba(9,45,21,0.3)]">
                    <span className="material-symbols-outlined icon-fill text-on-primary text-sm">skillet</span>
                  </div>
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center border-4 border-surface-container-lowest shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-outline-variant"></span>
                </div>
              )}
              <div className="flex flex-col pt-2">
                <span className={`font-label-md text-sm ${getStageClass(3) === 'active' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>Preparing</span>
                <span className="font-body-sm text-xs text-on-surface-variant">Chefs are handcraftedly preparing your food</span>
              </div>
            </div>

            {/* Stage 4: Ready */}
            <div className="flex items-start gap-4 relative z-10 pb-8">
              {getStageClass(4) === 'completed' ? (
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center border-4 border-surface-container-lowest shrink-0">
                  <span className="material-symbols-outlined icon-fill text-on-secondary-container text-sm">check</span>
                </div>
              ) : getStageClass(4) === 'active' ? (
                <div className="relative w-10 h-10 shrink-0">
                  <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center border-4 border-surface-container-lowest relative z-20 shadow-[0_4px_12px_rgba(9,45,21,0.3)]">
                    <span className="material-symbols-outlined icon-fill text-on-primary text-sm">room_service</span>
                  </div>
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center border-4 border-surface-container-lowest shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-outline-variant"></span>
                </div>
              )}
              <div className="flex flex-col pt-2">
                <span className={`font-label-md text-sm ${getStageClass(4) === 'active' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>Ready for Pickup</span>
                <span className="font-body-sm text-xs text-on-surface-variant">Hot & ready. Heading to your table soon</span>
              </div>
            </div>

            {/* Stage 5: Served */}
            <div className="flex items-start gap-4 relative z-10">
              {getStageClass(5) === 'active' || getStageClass(5) === 'completed' ? (
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center border-4 border-surface-container-lowest shrink-0">
                  <span className="material-symbols-outlined icon-fill text-on-secondary-container text-sm">check</span>
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center border-4 border-surface-container-lowest shrink-0">
                  <span className="material-symbols-outlined text-on-surface-variant text-sm">flag</span>
                </div>
              )}
              <div className="flex flex-col pt-2">
                <span className={`font-label-md text-sm ${getStageClass(5) === 'active' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>Served</span>
                <span className="font-body-sm text-xs text-on-surface-variant">Delivered & confirmed. Enjoy your dining!</span>
              </div>
            </div>
          </div>
        </section>

        {/* Order Summary */}
        <section className="bg-surface-container-lowest shadow-md rounded-xl p-6 border border-surface-variant/50">
          <h3 className="font-headline-md text-lg font-bold text-on-surface mb-4">Order Summary</h3>
          <div className="flex flex-col gap-4">
            {activeCustomerOrder.items.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <img 
                  alt={item.name} 
                  className="w-16 h-16 rounded-lg object-cover bg-surface-variant shrink-0" 
                  src={item.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMsjzWe9CWiG_gOnffdvfT0axrxdat-ts3cFqu6LBtSN7GgraQs8q3-psmU5gzU9iBstYqJW-FWLzC1ULuMTc0ZzNeWJkKFTG3tTPzugEYGZFLgUuphTforBX4Yocu7Pzvb-BcEnnu7xId0phMklUFXY-yc0X93q7CX8e0XCq-fzBNzWByWSqgrr3FX9-_dP0ENveC5mZUVACmJsVOpPQD3zYAzQdkuaD-SB1IySoy-MyGzU8X7jis2r3FiZ_hLckw66xGR-W1Xsg'} 
                />
                <div className="flex-1">
                  <h4 className="font-label-md text-sm font-bold text-on-surface">{item.name}</h4>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                    Qty: {item.quantity} {item.note && `• ${item.note}`}
                  </p>
                </div>
                <div className="font-label-md text-sm font-bold text-on-surface">
                  ${(item.price ? item.price * item.quantity : 15 * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-surface-variant flex justify-between items-center">
            <span className="font-body-md text-sm text-on-surface-variant">Total Cost</span>
            <span className="font-headline-md text-xl font-bold text-on-surface">${activeCustomerOrder.total.toFixed(2)}</span>
          </div>
        </section>

        {/* Push Notifications Toggle */}
        <section className="bg-surface-container-lowest shadow-md rounded-xl p-4 border border-surface-variant/50 flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">notifications_active</span>
            </div>
            <div>
              <h4 className="font-label-md text-sm font-bold text-on-surface">Live SMS / Push Updates</h4>
              <p className="font-body-sm text-xs text-on-surface-variant">Web push alerts {notificationsEnabled ? 'enabled' : 'disabled'}</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={notificationsEnabled} 
              onChange={() => setNotificationsEnabled(!notificationsEnabled)} 
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </section>
      </main>

      {/* Demo Notice (Absolute footer) */}
      <div className="text-center text-xs text-on-surface-variant pb-8 max-w-sm mx-auto">
        <p className="italic">💡 Demo Hint: Open the <b>Staff Live Orders Dashboard</b> in another tab to advance this order's status and see this screen react live!</p>
      </div>

      {/* BottomNavBar */}
      <nav className="bg-primary backdrop-blur-md fixed bottom-0 left-0 right-0 w-full z-50 rounded-t-xl border-t border-outline-variant/20 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] flex justify-around items-center h-16 pb-safe px-4 md:hidden max-w-md mx-auto">
        <button onClick={() => navigate('/menu')} className="flex flex-col items-center justify-center text-on-primary/75 hover:text-on-primary transition-colors">
          <span className="material-symbols-outlined">menu_book</span>
          <span className="font-label-sm text-[10px] mt-0.5">Menu</span>
        </button>
        {/* Active Nav Item */}
        <button className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1.5 scale-90 duration-200">
          <span className="material-symbols-outlined icon-fill">receipt_long</span>
          <span className="font-label-sm text-[10px] mt-0.5">Track</span>
        </button>
        <button onClick={() => navigate('/dashboard')} className="flex flex-col items-center justify-center text-on-primary/75 hover:text-on-primary transition-colors">
          <span className="material-symbols-outlined">admin_panel_settings</span>
          <span className="font-label-sm text-[10px] mt-0.5">Staff</span>
        </button>
      </nav>
    </div>
  );
};

export default OrderTracking;
