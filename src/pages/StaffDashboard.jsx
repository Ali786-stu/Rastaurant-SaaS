import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';

const StaffDashboard = () => {
  const { orders, acceptOrder, markReady, markServed } = useOrders();
  const [activeFilter, setActiveFilter] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Filter orders based on status tab selection
  // Statuses in DB: 'Pending', 'Preparing', 'Ready', 'Served' (Served is archived)
  const filteredOrders = orders.filter((o) => {
    if (activeFilter === 'All') return o.status !== 'Served';
    return o.status === activeFilter;
  });

  const getCount = (status) => {
    if (status === 'All') return orders.filter(o => o.status !== 'Served').length;
    return orders.filter(o => o.status === status).length;
  };

  const handleAction = (orderId, currentStatus) => {
    if (currentStatus === 'Pending') acceptOrder(orderId);
    else if (currentStatus === 'Preparing') markReady(orderId);
    else if (currentStatus === 'Ready') markServed(orderId);
  };

  const getButtonContent = (status) => {
    if (status === 'Pending') {
      return (
        <>
          <span className="material-symbols-outlined">done</span>
          Accept Order
        </>
      );
    } else if (status === 'Preparing') {
      return (
        <>
          <span className="material-symbols-outlined">room_service</span>
          Mark Ready
        </>
      );
    } else if (status === 'Ready') {
      return (
        <>
          <span className="material-symbols-outlined">check_circle</span>
          Mark Served
        </>
      );
    }
  };

  return (
    <div className="bg-background text-on-background font-body-md h-screen overflow-hidden flex relative">
      {/* NavigationDrawer (Staff Sidebar - Desktop only) */}
      <nav className="hidden md:flex flex-col bg-surface-container-low border-r border-outline-variant/20 fixed left-0 top-0 h-full w-64 z-40 py-8">
        {/* Header: Profile */}
        <div className="px-6 mb-8 flex flex-col items-start">
          <div className="w-12 h-12 rounded-full bg-surface-variant overflow-hidden mb-4 border border-outline-variant/30">
            <img 
              alt="Kitchen Manager" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-qkQXEujwHXh5w4Xp1343GWnTrr14oUp6IIE9g18latJpFKfNhvyx8Fm2KjykmPq2zTPnC0UREuJQ2QcZacDYUd2BbZQaOxkHBqc1bZuriLQhQrKFdA8OTrap1CAuw9HhlSORg6BZ24EUDC4TTP-7bPyfMudySnlzyXNkjhg-3CmHfHQTJjr8hWNWfJElLW0-BwiLoGKQRm4uOxFtMQAw85NNrNX__uoGMI6aYpFitTduqZof2xp0uMAw-XapwZVO3QgjSuSAuCw"
            />
          </div>
          <h2 className="text-primary font-bold text-xl">WingsRiver</h2>
          <div className="mt-2">
            <p className="font-headline-md text-sm font-semibold text-on-surface">Kitchen Manager</p>
            <p className="font-body-sm text-xs text-on-surface-variant">Station 01</p>
            <p className="font-label-caps text-[10px] text-secondary mt-1 flex items-center gap-1.5 font-bold uppercase">
              <span className="w-2 h-2 rounded-full bg-[#506354] inline-block animate-pulse"></span> Online
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col gap-2 flex-grow overflow-y-auto custom-scrollbar">
          <li>
            <button 
              onClick={() => navigate('/analytics')}
              className="w-full text-left flex items-center gap-3 text-on-surface-variant hover:bg-surface-variant/30 rounded-r-full py-3 px-6 mr-4 transition-colors font-label-caps text-xs uppercase font-bold"
            >
              <span className="material-symbols-outlined">dashboard</span>
              Dashboard
            </button>
          </li>
          <li>
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full text-left flex items-center gap-3 bg-primary-container text-on-primary-container rounded-r-full py-3 px-6 mr-4 font-label-caps text-xs uppercase font-bold"
            >
              <span className="material-symbols-outlined">pending_actions</span>
              Live Orders
            </button>
          </li>
          <li>
            <button 
              onClick={() => navigate('/menu')}
              className="w-full text-left flex items-center gap-3 text-on-surface-variant hover:bg-surface-variant/30 rounded-r-full py-3 px-6 mr-4 transition-colors font-label-caps text-xs uppercase font-bold"
            >
              <span className="material-symbols-outlined">edit_note</span>
              Menu Editor
            </button>
          </li>
          <li>
            <button 
              onClick={() => navigate('/tracking')}
              className="w-full text-left flex items-center gap-3 text-on-surface-variant hover:bg-surface-variant/30 rounded-r-full py-3 px-6 mr-4 transition-colors font-label-caps text-xs uppercase font-bold"
            >
              <span className="material-symbols-outlined">route</span>
              Order Tracking
            </button>
          </li>
          <li>
            <button 
              onClick={() => navigate('/analytics')}
              className="w-full text-left flex items-center gap-3 text-on-surface-variant hover:bg-surface-variant/30 rounded-r-full py-3 px-6 mr-4 transition-colors font-label-caps text-xs uppercase font-bold"
            >
              <span className="material-symbols-outlined">analytics</span>
              Analytics
            </button>
          </li>
        </ul>

        {/* Logout Link */}
        <div className="mt-auto px-4">
          <button 
            onClick={() => navigate('/')}
            className="w-full text-left flex items-center gap-3 text-error hover:bg-error-container/20 rounded-lg py-3 px-4 transition-colors font-label-caps text-xs uppercase font-bold"
          >
            <span className="material-symbols-outlined">logout</span>
            Sign Out
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Slide-out */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-black/40 backdrop-blur-sm transition-opacity duration-300">
          <div className="w-64 bg-surface-container-low h-full p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-primary font-bold text-xl">WingsRiver</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 hover:bg-surface-variant/30 rounded-full">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <div className="flex items-center gap-3 border-b border-outline-variant/30 pb-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-surface-variant overflow-hidden shrink-0">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-qkQXEujwHXh5w4Xp1343GWnTrr14oUp6IIE9g18latJpFKfNhvyx8Fm2KjykmPq2zTPnC0UREuJQ2QcZacDYUd2BbZQaOxkHBqc1bZuriLQhQrKFdA8OTrap1CAuw9HhlSORg6BZ24EUDC4TTP-7bPyfMudySnlzyXNkjhg-3CmHfHQTJjr8hWNWfJElLW0-BwiLoGKQRm4uOxFtMQAw85NNrNX__uoGMI6aYpFitTduqZof2xp0uMAw-XapwZVO3QgjSuSAuCw" alt="KM" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-on-surface">Kitchen Manager</h4>
                  <p className="text-xs text-on-surface-variant">Station 01 • Active</p>
                </div>
              </div>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => { setMobileMenuOpen(false); navigate('/analytics'); }} className="w-full text-left flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-surface-variant/35 font-label-caps text-xs uppercase font-bold">
                    <span className="material-symbols-outlined">dashboard</span>
                    Dashboard
                  </button>
                </li>
                <li>
                  <button onClick={() => { setMobileMenuOpen(false); navigate('/dashboard'); }} className="w-full text-left flex items-center gap-3 py-3 px-4 rounded-lg bg-primary-container text-on-primary-container font-label-caps text-xs uppercase font-bold">
                    <span className="material-symbols-outlined">pending_actions</span>
                    Live Orders
                  </button>
                </li>
                <li>
                  <button onClick={() => { setMobileMenuOpen(false); navigate('/menu'); }} className="w-full text-left flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-surface-variant/35 font-label-caps text-xs uppercase font-bold">
                    <span className="material-symbols-outlined">edit_note</span>
                    Menu Editor
                  </button>
                </li>
                <li>
                  <button onClick={() => { setMobileMenuOpen(false); navigate('/tracking'); }} className="w-full text-left flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-surface-variant/35 font-label-caps text-xs uppercase font-bold">
                    <span className="material-symbols-outlined">route</span>
                    Order Tracking
                  </button>
                </li>
                <li>
                  <button onClick={() => { setMobileMenuOpen(false); navigate('/analytics'); }} className="w-full text-left flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-surface-variant/35 font-label-caps text-xs uppercase font-bold">
                    <span className="material-symbols-outlined">analytics</span>
                    Analytics
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <button onClick={() => navigate('/')} className="w-full flex items-center justify-center gap-2 bg-error-container/30 text-error py-2.5 rounded-lg font-bold font-label-caps text-xs uppercase">
                <span className="material-symbols-outlined text-[18px]">logout</span>
                Sign Out
              </button>
            </div>
          </div>
          <div className="flex-grow" onClick={() => setMobileMenuOpen(false)}></div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 md:ml-64 flex flex-col h-full bg-[#f9f9f8] relative">
        {/* TopAppBar */}
        <header className="bg-white/90 backdrop-blur-md sticky top-0 w-full z-30 border-b border-outline-variant/10 flex justify-between items-center px-4 md:px-8 h-16 shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Icon */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-primary hover:bg-surface-variant/20 p-1.5 rounded-full"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <h1 className="font-headline-md text-xl font-extrabold text-primary md:hidden tracking-tight">WingsRiver</h1>
            <h1 className="font-headline-md text-xl font-bold text-on-surface hidden md:block">Kitchen Live Orders</h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/analytics')}
              className="hidden sm:flex items-center gap-2 bg-primary text-on-primary font-label-caps text-xs py-2 px-4 rounded-full border-b-2 border-on-primary-fixed-variant hover:bg-primary/95 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">monitoring</span>
              Go to Analytics
            </button>
            <button className="relative p-2 text-on-surface-variant hover:bg-surface-variant/25 rounded-full transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">notifications_active</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full animate-pulse border border-white"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8">
          {/* Filters Bar */}
          <div className="mb-6 sticky top-0 bg-[#f9f9f8]/95 backdrop-blur z-10 py-2 border-b border-outline-variant/10 -mx-4 px-4">
            <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1.5 items-center">
              {['All', 'Pending', 'Preparing', 'Ready'].map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveFilter(status)}
                  className={`px-5 py-2.5 rounded-full font-bold text-xs whitespace-nowrap transition-all flex items-center gap-2 ${
                    activeFilter === status
                      ? 'bg-primary text-on-primary shadow-sm hover:brightness-110'
                      : 'border border-outline-variant text-on-surface-variant hover:bg-surface-variant/20'
                  }`}
                >
                  {status}
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    activeFilter === status ? 'bg-[#c5edc8] text-[#00210b]' : 'bg-surface-variant text-on-surface'
                  }`}>
                    {getCount(status)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout of Orders */}
          {filteredOrders.length === 0 ? (
            <div className="py-24 text-center flex flex-col items-center gap-3 text-on-surface-variant">
              <span className="material-symbols-outlined text-6xl opacity-20">check_circle</span>
              <h3 className="font-bold text-lg">No Orders in this queue</h3>
              <p className="text-sm max-w-xs">All caught up! New orders placed by customers from the digital menu will show up here instantly.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
              {filteredOrders.map((order) => (
                <div 
                  key={order.id} 
                  className={`bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-outline-variant/10 p-4 flex flex-col gap-4 border-l-4 transition-all duration-300 ${
                    order.status === 'Pending' ? 'border-l-error' :
                    order.status === 'Preparing' ? 'border-l-primary' : 'border-l-secondary'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-headline-md text-lg text-on-surface font-bold">{order.table}</span>
                        <span className={`font-label-caps text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          order.status === 'Pending' ? 'status-chip-pending' :
                          order.status === 'Preparing' ? 'status-chip-preparing' : 'status-chip-ready'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="font-body-sm text-xs text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">schedule</span> 
                        <span>{order.time} ({order.timeRaw})</span>
                      </p>
                    </div>
                    <span className="font-headline-lg text-xl text-primary font-extrabold font-mono">#{order.id}</span>
                  </div>

                  {/* Items List Inside Card */}
                  <div className="bg-surface rounded-lg p-3">
                    <ul className="flex flex-col gap-1">
                      {order.items.map((item, idx) => (
                        <li 
                          key={idx} 
                          className={`flex justify-between items-start border-b border-outline-variant/20 last:border-0 py-2.5 last:pb-0 ${
                            item.completed ? 'opacity-40 line-through' : ''
                          }`}
                        >
                          <div>
                            <p className="font-label-caps text-xs text-on-surface font-bold">
                              <span className="text-primary mr-1 font-extrabold">{item.quantity}x</span> {item.name}
                            </p>
                            {item.note && (
                              <p className={`font-body-sm text-xs mt-1 py-1 px-2 rounded-sm flex items-center gap-1.5 ${
                                item.warning ? 'bg-error-container/30 text-error font-medium' : 'bg-surface-container/60 text-on-surface-variant italic'
                              }`}>
                                {item.warning && <span className="material-symbols-outlined text-xs">warning</span>}
                                {item.note}
                              </p>
                            )}
                          </div>
                          {item.completed && (
                            <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions buttons */}
                  <div className="mt-auto flex gap-2">
                    {order.status === 'Preparing' && (
                      <button className="flex-1 bg-surface-variant text-on-surface font-label-caps text-xs font-bold py-3 rounded-lg hover:bg-surface-dim transition-colors">
                        Print
                      </button>
                    )}
                    <button 
                      onClick={() => handleAction(order.id, order.status)}
                      className={`flex-[2] text-on-primary font-label-caps text-xs font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-1.5 border-b-2 active:border-b-0 active:translate-y-[2px] ${
                        order.status === 'Pending' ? 'bg-primary hover:bg-primary-container border-primary-container' :
                        order.status === 'Preparing' ? 'bg-[#214329] hover:bg-primary border-primary' : 
                        'bg-[#506354] hover:bg-primary border-[#394b3d]'
                      }`}
                    >
                      {getButtonContent(order.status)}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
