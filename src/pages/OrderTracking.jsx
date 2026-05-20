import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';

const OrderTracking = () => {
  const { activeCustomerOrder } = useOrders();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const navigate = useNavigate();

  // If there is no active order, show a beautiful empty state
  if (!activeCustomerOrder) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-[#f9f9f8] text-on-surface font-body-md">
        {/* Header */}
        <header className="bg-white border-b border-outline-variant/10 flex justify-between items-center px-4 h-16 w-full max-w-md mx-auto shrink-0">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-2xl font-bold">restaurant</span>
            <span className="font-headline-md text-xl font-extrabold tracking-tight">WingsRiver</span>
          </div>
          <button className="text-on-surface-variant p-2 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">notifications</span>
          </button>
        </header>

        {/* Empty State Content */}
        <main className="flex-grow flex items-center justify-center p-6 w-full max-w-md mx-auto">
          <div className="text-center bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-8 border border-outline-variant/10 w-full flex flex-col items-center">
            <span className="material-symbols-outlined text-6xl text-primary/20 mb-4">receipt_long</span>
            <h2 className="text-xl font-bold mb-2 text-on-surface">No Active Order</h2>
            <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
              You haven't placed an order yet in this session. Head to our digital menu to place one!
            </p>
            <button 
              onClick={() => navigate('/menu')} 
              className="bg-primary hover:bg-primary/95 text-on-primary font-label-caps text-xs py-3 px-6 rounded-lg w-full transition-all border-b-2 border-on-primary-fixed-variant flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              View Menu
            </button>
          </div>
        </main>

        {/* Bottom Navigation */}
        <nav className="bg-white border-t border-outline-variant/10 flex justify-around items-center h-16 pb-safe px-4 w-full max-w-md mx-auto shrink-0">
          <button onClick={() => navigate('/menu')} className="flex flex-col items-center justify-center text-on-surface-variant/70 hover:text-primary transition-colors py-1 w-16">
            <span className="material-symbols-outlined text-[24px]">menu_book</span>
            <span className="font-body-sm text-[10px] mt-0.5 font-medium">Menu</span>
          </button>
          <button className="flex flex-col items-center justify-center text-on-surface-variant/70 hover:text-primary transition-colors py-1 w-16">
            <span className="material-symbols-outlined text-[24px]">search</span>
            <span className="font-body-sm text-[10px] mt-0.5 font-medium">Search</span>
          </button>
          <button className="flex flex-col items-center justify-center py-1 w-16 text-primary">
            <div className="bg-[#d3e8d5] text-on-secondary-fixed-variant rounded-full px-5 py-1 flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-[22px] icon-fill">receipt_long</span>
            </div>
            <span className="font-body-sm text-[10px] mt-0.5 font-bold">Orders</span>
          </button>
          <button className="flex flex-col items-center justify-center text-on-surface-variant/70 hover:text-primary transition-colors py-1 w-16">
            <span className="material-symbols-outlined text-[24px]">person</span>
            <span className="font-body-sm text-[10px] mt-0.5 font-medium">Profile</span>
          </button>
        </nav>
      </div>
    );
  }

  const currentStatus = activeCustomerOrder.status;

  // Stages definition matching screenshot 2
  // Stages: 1=Received, 2=Accepted, 3=Preparing, 4=Ready, 5=Served
  const getStageState = (stageNum) => {
    const statusMap = { 'Received': 1, 'Accepted': 2, 'Preparing': 3, 'Ready': 4, 'Served': 5 };
    const currentNum = statusMap[currentStatus] || 1;

    if (currentNum > stageNum) return 'completed';
    if (currentNum === stageNum) return 'active';
    return 'pending';
  };

  return (
    <div className="bg-[#f9f9f8] text-on-background font-body-md min-h-screen flex flex-col justify-between antialiased">
      
      {/* Header bar matching Screenshot 2 */}
      <header className="bg-white border-b border-outline-variant/10 flex justify-between items-center px-4 h-16 w-full max-w-md mx-auto shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined text-2xl font-bold">restaurant</span>
          <span className="font-headline-md text-xl font-extrabold tracking-tight">WingsRiver</span>
        </div>
        <button className="text-on-surface-variant p-2 rounded-full flex items-center justify-center hover:bg-surface-variant/20 transition-colors">
          <span className="material-symbols-outlined text-2xl">notifications</span>
        </button>
      </header>

      {/* Main content scroll container */}
      <main className="flex-grow p-4 w-full max-w-md mx-auto flex flex-col gap-5 overflow-y-auto hide-scrollbar pb-24">
        
        {/* Order ID Subheader */}
        <div className="text-center font-label-caps text-xs text-on-surface-variant/80 tracking-widest font-semibold uppercase mt-2">
          Order #{activeCustomerOrder.id}
        </div>

        {/* Estimated Time Card matching Screenshot 2 */}
        <section className="bg-white rounded-xl border border-outline-variant/10 p-6 flex flex-col items-center justify-center text-center gap-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
          <h2 className="text-sm font-medium text-on-surface-variant/80">Estimated Time</h2>
          <div className="text-[44px] font-extrabold text-primary leading-tight flex items-baseline justify-center">
            {activeCustomerOrder.etaMins > 0 ? (
              <>
                {activeCustomerOrder.etaMins}
                <span className="text-lg font-semibold text-primary/70 ml-1.5">mins</span>
              </>
            ) : (
              <span className="text-2xl font-bold text-[#214329]">Ready to Serve!</span>
            )}
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">
            {activeCustomerOrder.status === 'Served' 
              ? 'Order complete. Bon Appétit!' 
              : `Expected arrival at ${activeCustomerOrder.expectedTime}`
            }
          </p>
        </section>

        {/* Status Tracker section matching Screenshot 2 */}
        <section className="bg-white rounded-xl border border-outline-variant/10 p-6 shadow-[0_4px_16px_rgba(0,0,0,0.02)] relative">
          <h3 className="text-md font-bold text-on-surface mb-6">Status</h3>
          
          <div className="relative flex flex-col gap-0">
            {/* Background Connector Line */}
            <div className="absolute left-[19px] top-5 bottom-5 w-[2px] bg-[#e1e3e2] z-0"></div>
            
            {/* Active Highlight Line */}
            <div 
              className="absolute left-[19px] top-5 w-[2px] bg-primary z-0 transition-all duration-700"
              style={{
                height: 
                  currentStatus === 'Received' ? '0px' :
                  currentStatus === 'Accepted' ? '64px' :
                  currentStatus === 'Preparing' ? '128px' :
                  currentStatus === 'Ready' ? '192px' : '256px'
              }}
            ></div>

            {/* Step 1: Received */}
            <div className="flex items-center gap-4 relative z-10 h-16">
              {getStageState(1) === 'completed' || getStageState(1) === 'active' ? (
                <div className="w-10 h-10 rounded-full bg-[#d3e8d5] flex items-center justify-center shrink-0 border-2 border-white shadow-sm">
                  <span className="material-symbols-outlined text-[16px] font-bold text-on-secondary-fixed-variant">check</span>
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#edeeed] flex items-center justify-center shrink-0 border-2 border-white">
                  <span className="w-2.5 h-2.5 rounded-full bg-outline-variant"></span>
                </div>
              )}
              <div className="flex flex-col justify-center">
                <span className={`text-sm ${getStageState(1) === 'active' ? 'font-bold text-on-surface' : 'text-on-surface-variant font-medium'}`}>Received</span>
                <span className="text-xs text-on-surface-variant/70">{activeCustomerOrder.time || '1:20 PM'}</span>
              </div>
            </div>

            {/* Step 2: Accepted */}
            <div className="flex items-center gap-4 relative z-10 h-16">
              {getStageState(2) === 'completed' ? (
                <div className="w-10 h-10 rounded-full bg-[#d3e8d5] flex items-center justify-center shrink-0 border-2 border-white shadow-sm">
                  <span className="material-symbols-outlined text-[16px] font-bold text-on-secondary-fixed-variant">check</span>
                </div>
              ) : getStageState(2) === 'active' ? (
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 border-2 border-white shadow-[0_0_12px_rgba(9,45,21,0.25)]">
                  <span className="material-symbols-outlined text-[18px] text-on-primary">assignment_turned_in</span>
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#edeeed] flex items-center justify-center shrink-0 border-2 border-white">
                  <span className="material-symbols-outlined text-[16px] text-outline-variant">assignment_turned_in</span>
                </div>
              )}
              <div className="flex flex-col justify-center">
                <span className={`text-sm ${getStageState(2) === 'active' ? 'font-bold text-on-surface' : getStageState(2) === 'completed' ? 'text-on-surface' : 'text-on-surface-variant/50 font-medium'}`}>Accepted</span>
                <span className="text-xs text-on-surface-variant/70">Order confirmed</span>
              </div>
            </div>

            {/* Step 3: Preparing */}
            <div className="flex items-center gap-4 relative z-10 h-16">
              {getStageState(3) === 'completed' ? (
                <div className="w-10 h-10 rounded-full bg-[#d3e8d5] flex items-center justify-center shrink-0 border-2 border-white shadow-sm">
                  <span className="material-symbols-outlined text-[16px] font-bold text-on-secondary-fixed-variant">check</span>
                </div>
              ) : getStageState(3) === 'active' ? (
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 border-2 border-white shadow-[0_0_12px_rgba(9,45,21,0.25)]">
                  <span className="material-symbols-outlined text-[18px] text-on-primary">cooking</span>
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#edeeed] flex items-center justify-center shrink-0 border-2 border-white">
                  <span className="material-symbols-outlined text-[16px] text-outline-variant">cooking</span>
                </div>
              )}
              <div className="flex flex-col justify-center">
                <span className={`text-sm ${getStageState(3) === 'active' ? 'font-bold text-on-surface' : getStageState(3) === 'completed' ? 'text-on-surface' : 'text-on-surface-variant/50 font-medium'}`}>Preparing</span>
                <span className="text-xs text-on-surface-variant/70">Chef is on it</span>
              </div>
            </div>

            {/* Step 4: Ready */}
            <div className="flex items-center gap-4 relative z-10 h-16">
              {getStageState(4) === 'completed' ? (
                <div className="w-10 h-10 rounded-full bg-[#d3e8d5] flex items-center justify-center shrink-0 border-2 border-white shadow-sm">
                  <span className="material-symbols-outlined text-[16px] font-bold text-on-secondary-fixed-variant">check</span>
                </div>
              ) : getStageState(4) === 'active' ? (
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 border-2 border-white shadow-[0_0_12px_rgba(9,45,21,0.25)]">
                  <span className="material-symbols-outlined text-[18px] text-on-primary">room_service</span>
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#edeeed] flex items-center justify-center shrink-0 border-2 border-white">
                  <span className="material-symbols-outlined text-[16px] text-outline-variant">room_service</span>
                </div>
              )}
              <div className="flex flex-col justify-center">
                <span className={`text-sm ${getStageState(4) === 'active' ? 'font-bold text-on-surface' : getStageState(4) === 'completed' ? 'text-on-surface' : 'text-on-surface-variant/50 font-medium'}`}>Ready</span>
                <span className="text-xs text-on-surface-variant/70">Ready for pickup</span>
              </div>
            </div>

            {/* Step 5: Served */}
            <div className="flex items-center gap-4 relative z-10 h-16">
              {getStageState(5) === 'active' || getStageState(5) === 'completed' ? (
                <div className="w-10 h-10 rounded-full bg-[#d3e8d5] flex items-center justify-center shrink-0 border-2 border-white shadow-sm">
                  <span className="material-symbols-outlined text-[16px] font-bold text-on-secondary-fixed-variant">check</span>
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#edeeed] flex items-center justify-center shrink-0 border-2 border-white">
                  <span className="material-symbols-outlined text-[16px] text-outline-variant">flag</span>
                </div>
              )}
              <div className="flex flex-col justify-center">
                <span className={`text-sm ${getStageState(5) === 'active' ? 'font-bold text-on-surface' : 'text-on-surface-variant/50 font-medium'}`}>Served</span>
                <span className="text-xs text-on-surface-variant/70">Order completed</span>
              </div>
            </div>

          </div>
        </section>

        {/* Order Summary Card matching Screenshot 2 */}
        <section className="bg-white rounded-xl border border-outline-variant/10 p-5 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
          <h3 className="text-md font-bold text-on-surface mb-4">Order Summary</h3>
          <div className="flex flex-col gap-4">
            {activeCustomerOrder.items.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <img 
                  alt={item.name} 
                  className="w-12 h-12 rounded-lg object-cover bg-surface-variant shrink-0" 
                  src={item.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMsjzWe9CWiG_gOnffdvfT0axrxdat-ts3cFqu6LBtSN7GgraQs8q3-psmU5gzU9iBstYqJW-FWLzC1ULuMTc0ZzNeWJkKFTG3tTPzugEYGZFLgUuphTforBX4Yocu7Pzvb-BcEnnu7xId0phMklUFXY-yc0X93q7CX8e0XCq-fzBNzWByWSqgrr3FX9-_dP0ENveC5mZUVACmJsVOpPQD3zYAzQdkuaD-SB1IySoy-MyGzU8X7jis2r3FiZ_hLckw66xGR-W1Xsg'} 
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-on-surface truncate">{item.name}</h4>
                  <p className="text-xs text-on-surface-variant/80 mt-0.5">
                    Qty: {item.quantity} {item.note && `• ${item.note}`}
                  </p>
                </div>
                <div className="text-sm font-semibold text-on-surface shrink-0">
                  ${(item.price ? item.price * item.quantity : 15 * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-5 pt-4 border-t border-[#f0f1f0] flex justify-between items-center">
            <span className="text-sm font-medium text-on-surface-variant/85">Total</span>
            <span className="text-lg font-bold text-on-surface">${activeCustomerOrder.total.toFixed(2)}</span>
          </div>
        </section>

        {/* Live Updates bar matching Screenshot 2 */}
        <section className="bg-white rounded-xl border border-outline-variant/10 p-4 shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#f3f4f3] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-xl">notifications_active</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-on-surface leading-snug">Live Updates</h4>
              <p className="text-xs text-on-surface-variant/80 mt-0.5">Web push notifications enabled</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input 
              type="checkbox" 
              checked={notificationsEnabled} 
              onChange={() => setNotificationsEnabled(!notificationsEnabled)} 
              className="sr-only peer" 
            />
            <div className="w-10 h-5.5 bg-[#e1e3e2] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[18px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2.5px] after:left-[2.5px] after:bg-white after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </section>

        {/* Demo Hint */}
        <div className="text-center text-xs text-on-surface-variant/60 italic mt-2">
          💡 Demo Hint: Open the Staff Dashboard in another tab to advance status live!
        </div>

      </main>

      {/* Bottom Navigation Bar matching Screenshot 2 */}
      <nav className="bg-white border-t border-outline-variant/10 flex justify-around items-center h-16 pb-safe px-4 w-full max-w-md mx-auto shrink-0 sticky bottom-0 z-50">
        <button onClick={() => navigate('/menu')} className="flex flex-col items-center justify-center text-on-surface-variant/70 hover:text-primary transition-colors py-1 w-16">
          <span className="material-symbols-outlined text-[24px]">menu_book</span>
          <span className="font-body-sm text-[10px] mt-0.5 font-medium">Menu</span>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface-variant/70 hover:text-primary transition-colors py-1 w-16">
          <span className="material-symbols-outlined text-[24px]">search</span>
          <span className="font-body-sm text-[10px] mt-0.5 font-medium">Search</span>
        </button>
        <button className="flex flex-col items-center justify-center py-1 w-16 text-primary">
          <div className="bg-[#d3e8d5] text-on-secondary-fixed-variant rounded-full px-5 py-1 flex flex-col items-center justify-center">
            <span className="material-symbols-outlined text-[22px] icon-fill">receipt_long</span>
          </div>
          <span className="font-body-sm text-[10px] mt-0.5 font-bold">Orders</span>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface-variant/70 hover:text-primary transition-colors py-1 w-16">
          <span className="material-symbols-outlined text-[24px]">person</span>
          <span className="font-body-sm text-[10px] mt-0.5 font-medium">Profile</span>
        </button>
      </nav>

    </div>
  );
};

export default OrderTracking;
