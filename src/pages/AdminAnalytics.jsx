import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';

const AdminAnalytics = () => {
  const { orders } = useOrders();
  const [timeFilter, setTimeFilter] = useState('This Week');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-background font-body-md h-screen overflow-hidden flex relative antialiased">
      {/* Navigation Drawer (SideNav - Desktop only) */}
      <nav className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 z-40 bg-surface-container-low border-r border-outline-variant/20 py-8">
        {/* Header Profile */}
        <div className="px-6 mb-8 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-headline-md text-xl font-bold shadow-sm">
            W
          </div>
          <div>
            <div className="font-headline-md text-lg text-primary font-bold">WingsRiver</div>
            <div className="font-label-caps text-[10px] text-on-surface-variant uppercase font-semibold">Station 01 • Active</div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto">
          <ul className="space-y-1">
            <li>
              <button 
                onClick={() => navigate('/dashboard')}
                className="w-full text-left flex items-center gap-3 text-on-surface-variant hover:bg-surface-variant/30 rounded-r-full py-3 px-6 mr-4 transition-all font-label-caps text-xs uppercase font-bold"
              >
                <span className="material-symbols-outlined">dashboard</span>
                Dashboard
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate('/dashboard')}
                className="w-full text-left flex items-center gap-3 text-on-surface-variant hover:bg-surface-variant/30 rounded-r-full py-3 px-6 mr-4 transition-all font-label-caps text-xs uppercase font-bold"
              >
                <span className="material-symbols-outlined">pending_actions</span>
                Live Orders
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate('/menu')}
                className="w-full text-left flex items-center gap-3 text-on-surface-variant hover:bg-surface-variant/30 rounded-r-full py-3 px-6 mr-4 transition-all font-label-caps text-xs uppercase font-bold"
              >
                <span className="material-symbols-outlined">edit_note</span>
                Menu Editor
              </button>
            </li>
            <li>
              {/* Active State */}
              <button className="w-full text-left flex items-center gap-3 bg-primary-container text-on-primary-container rounded-r-full py-3 px-6 mr-4 font-label-caps text-xs uppercase font-bold pointer-events-none">
                <span className="material-symbols-outlined icon-fill">analytics</span>
                Analytics
              </button>
            </li>
          </ul>
        </div>

        {/* Footer Link */}
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

      {/* Mobile Drawer Navigation */}
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
              <ul className="space-y-2">
                <li>
                  <button onClick={() => setMobileMenuOpen(false)} className="w-full text-left flex items-center gap-3 py-3 px-4 rounded-lg bg-primary-container text-on-primary-container font-label-caps text-xs uppercase font-bold">
                    <span className="material-symbols-outlined">analytics</span>
                    Analytics
                  </button>
                </li>
                <li>
                  <button onClick={() => { setMobileMenuOpen(false); navigate('/dashboard'); }} className="w-full text-left flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-surface-variant/35 font-label-caps text-xs uppercase font-bold">
                    <span className="material-symbols-outlined">pending_actions</span>
                    Live Orders
                  </button>
                </li>
                <li>
                  <button onClick={() => { setMobileMenuOpen(false); navigate('/menu'); }} className="w-full text-left flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-surface-variant/35 font-label-caps text-xs uppercase font-bold">
                    <span className="material-symbols-outlined">menu_book</span>
                    Customer Menu
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
      <main className="flex-1 md:ml-64 h-full overflow-y-auto flex flex-col relative bg-background pb-12">
        {/* Header Actions */}
        <header className="flex justify-between items-center px-container-margin-mobile md:px-container-margin-desktop py-6 sticky top-0 bg-background/95 backdrop-blur-md z-30 border-b border-outline-variant/10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-primary hover:bg-surface-variant/20 p-1.5 rounded-full"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <div>
              <h1 className="font-headline-lg text-2xl font-bold text-on-surface">Analytics Overview</h1>
              <p className="font-body-sm text-xs text-on-surface-variant mt-1">Thursday, October 26, 2023</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-primary text-on-primary font-label-caps text-xs px-4 py-2.5 rounded-full border-b-2 border-on-primary-fixed-variant hover:bg-primary/95 active:border-b-0 active:translate-y-[2px] transition-all">
            <span className="material-symbols-outlined text-[16px]">download</span>
            Export CSV
          </button>
        </header>

        {/* Dashboard Grid */}
        <div className="p-container-margin-mobile md:p-container-margin-desktop pt-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Key Metrics Grid */}
          <div className="col-span-1 md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Metric 1 */}
            <div className="bg-surface-container-lowest rounded-xl p-6 card-shadow border border-outline-variant/10 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div className="font-label-caps text-xs text-on-surface-variant uppercase font-bold">Today's Revenue</div>
                <div className="w-8 h-8 rounded-full bg-secondary-container/50 text-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">payments</span>
                </div>
              </div>
              <div>
                <div className="font-display-lg text-4xl font-extrabold text-on-surface">$1,245.50</div>
                <div className="flex items-center gap-1 text-secondary mt-1 font-label-caps text-[10px] font-bold uppercase">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span>
                  <span>+8.4% from yesterday</span>
                </div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-surface-container-lowest rounded-xl p-6 card-shadow border border-outline-variant/10 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div className="font-label-caps text-xs text-on-surface-variant uppercase font-bold">Orders Processed</div>
                <div className="w-8 h-8 rounded-full bg-primary-container/30 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                </div>
              </div>
              <div>
                <div className="font-display-lg text-4xl font-extrabold text-on-surface">45</div>
                <div className="flex items-center gap-1 text-on-surface-variant mt-1 font-label-caps text-[10px] font-bold uppercase">
                  <span className="material-symbols-outlined text-[14px]">trending_flat</span>
                  <span>On par with average</span>
                </div>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-surface-container-lowest rounded-xl p-6 card-shadow border border-outline-variant/10 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
                <span className="material-symbols-outlined text-[120px] translate-x-4 translate-y-4">table_restaurant</span>
              </div>
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="font-label-caps text-xs text-on-surface-variant uppercase font-bold">Active Tables</div>
                <div className="px-2.5 py-0.5 bg-secondary/15 text-secondary rounded-full font-label-caps text-[9px] font-extrabold flex items-center gap-1 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                  Live
                </div>
              </div>
              <div className="relative z-10">
                <div className="font-display-lg text-4xl font-extrabold text-on-surface">12<span className="text-on-surface-variant font-headline-md text-lg ml-1 font-semibold">/ 24</span></div>
                <div className="text-on-surface-variant mt-1 font-body-sm text-xs font-medium">
                  50% Dining Capacity
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Bar Chart (Span 8) */}
          <div className="col-span-1 md:col-span-8 bg-surface-container-lowest rounded-xl p-6 card-shadow border border-outline-variant/10 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline-md text-lg font-bold text-on-surface">Revenue Trends</h2>
              <select 
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="bg-surface-container rounded-lg border-0 text-on-surface font-label-caps text-xs py-1.5 pl-3 pr-8 focus:ring-1 focus:ring-primary cursor-pointer"
              >
                <option>This Week</option>
                <option>Last Week</option>
                <option>This Month</option>
              </select>
            </div>
            
            {/* Mock Chart Area */}
            <div className="flex-1 flex items-end gap-2 md:gap-4 h-64 mt-4 pb-6 relative border-b border-outline-variant/20">
              {/* Y-Axis Guides */}
              <div className="absolute w-full h-full flex flex-col justify-between pb-6 pointer-events-none">
                <div className="w-full border-t border-outline-variant/10"></div>
                <div className="w-full border-t border-outline-variant/10"></div>
                <div className="w-full border-t border-outline-variant/10"></div>
                <div className="w-full border-t border-outline-variant/10"></div>
              </div>
              
              {/* Bars */}
              <div className="flex-1 flex flex-col justify-end items-center group relative cursor-pointer">
                <div className="w-full max-w-[40px] bg-primary-container/40 rounded-t-md group-hover:bg-primary transition-colors" style={{ height: '40%' }}></div>
                <span className="text-on-surface-variant font-label-caps text-[10px] mt-2 absolute bottom-0 font-bold uppercase">Mon</span>
              </div>
              <div className="flex-1 flex flex-col justify-end items-center group relative cursor-pointer">
                <div className="w-full max-w-[40px] bg-primary-container/40 rounded-t-md group-hover:bg-primary transition-colors" style={{ height: '55%' }}></div>
                <span className="text-on-surface-variant font-label-caps text-[10px] mt-2 absolute bottom-0 font-bold uppercase">Tue</span>
              </div>
              <div className="flex-1 flex flex-col justify-end items-center group relative cursor-pointer">
                <div className="w-full max-w-[40px] bg-primary-container/40 rounded-t-md group-hover:bg-primary transition-colors" style={{ height: '45%' }}></div>
                <span className="text-on-surface-variant font-label-caps text-[10px] mt-2 absolute bottom-0 font-bold uppercase">Wed</span>
              </div>
              <div className="flex-1 flex flex-col justify-end items-center group relative cursor-pointer">
                <div className="w-full max-w-[40px] bg-primary rounded-t-md shadow-md" style={{ height: '80%' }}></div>
                <span className="text-primary font-label-caps text-[10px] mt-2 absolute bottom-0 font-bold uppercase">Thu</span>
              </div>
              <div className="flex-1 flex flex-col justify-end items-center group relative cursor-pointer">
                <div className="w-full max-w-[40px] bg-primary-container/20 rounded-t-md group-hover:bg-primary transition-colors" style={{ height: '65%' }}></div>
                <span className="text-on-surface-variant font-label-caps text-[10px] mt-2 absolute bottom-0 font-bold uppercase">Fri</span>
              </div>
              <div className="flex-1 flex flex-col justify-end items-center group relative cursor-pointer">
                <div className="w-full max-w-[40px] bg-primary-container/20 rounded-t-md group-hover:bg-primary transition-colors" style={{ height: '85%' }}></div>
                <span className="text-on-surface-variant font-label-caps text-[10px] mt-2 absolute bottom-0 font-bold uppercase">Sat</span>
              </div>
              <div className="flex-1 flex flex-col justify-end items-center group relative cursor-pointer">
                <div className="w-full max-w-[40px] bg-primary-container/20 rounded-t-md group-hover:bg-primary transition-colors" style={{ height: '35%' }}></div>
                <span className="text-on-surface-variant font-label-caps text-[10px] mt-2 absolute bottom-0 font-bold uppercase">Sun</span>
              </div>
            </div>
          </div>

          {/* Top Items List (Span 4) */}
          <div className="col-span-1 md:col-span-4 bg-surface-container-lowest rounded-xl p-6 card-shadow border border-outline-variant/10 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline-md text-lg font-bold text-on-surface">Top Items</h2>
              <button className="text-primary hover:underline font-label-caps text-xs font-bold uppercase">View All</button>
            </div>
            
            <div className="flex-1 flex flex-col gap-4">
              {/* Item 1 */}
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant">
                    <span className="material-symbols-outlined">local_dining</span>
                  </div>
                  <div>
                    <div className="font-label-caps text-xs font-bold text-on-surface">Truffle Burger</div>
                    <div className="font-body-sm text-xs text-on-surface-variant">24 ordered</div>
                  </div>
                </div>
                <div className="font-label-caps text-xs text-on-surface font-extrabold">$432</div>
              </div>

              {/* Item 2 */}
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant">
                    <span className="material-symbols-outlined">local_pizza</span>
                  </div>
                  <div>
                    <div className="font-label-caps text-xs font-bold text-on-surface">Margherita Pizza</div>
                    <div className="font-body-sm text-xs text-on-surface-variant">18 ordered</div>
                  </div>
                </div>
                <div className="font-label-caps text-xs text-on-surface font-extrabold">$270</div>
              </div>

              {/* Item 3 */}
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant">
                    <span className="material-symbols-outlined">local_cafe</span>
                  </div>
                  <div>
                    <div className="font-label-caps text-xs font-bold text-on-surface">Artisan Latte</div>
                    <div className="font-body-sm text-xs text-on-surface-variant">32 ordered</div>
                  </div>
                </div>
                <div className="font-label-caps text-xs text-on-surface font-extrabold">$160</div>
              </div>

              {/* Item 4 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant">
                    <span className="material-symbols-outlined">tapas</span>
                  </div>
                  <div>
                    <div className="font-label-caps text-xs font-bold text-on-surface">Calamari Fritti</div>
                    <div className="font-body-sm text-xs text-on-surface-variant">12 ordered</div>
                  </div>
                </div>
                <div className="font-label-caps text-xs text-on-surface font-extrabold">$144</div>
              </div>
            </div>
          </div>

          {/* Peak Hours Heatmap (Span 12) */}
          <div className="col-span-1 md:col-span-12 bg-surface-container-lowest rounded-xl p-6 card-shadow border border-outline-variant/10 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline-md text-lg font-bold text-on-surface">Peak Hours (Order Volume)</h2>
              <div className="flex items-center gap-2 font-label-caps text-[10px] text-on-surface-variant font-bold uppercase">
                <span>Low</span>
                <div className="flex gap-1">
                  <div className="w-4 h-4 rounded-sm bg-primary-container/10"></div>
                  <div className="w-4 h-4 rounded-sm bg-primary-container/40"></div>
                  <div className="w-4 h-4 rounded-sm bg-primary-container/70"></div>
                  <div className="w-4 h-4 rounded-sm bg-primary"></div>
                </div>
                <span>High</span>
              </div>
            </div>

            {/* Heatmap Grid Mockup */}
            <div className="w-full overflow-x-auto pb-2 custom-scrollbar">
              <div className="min-w-[700px]">
                {/* Hours Header */}
                <div className="flex ml-16 mb-2 font-label-caps text-[10px] text-on-surface-variant font-bold uppercase">
                  <div className="flex-1 text-center">11a</div>
                  <div className="flex-1 text-center">12p</div>
                  <div className="flex-1 text-center">1p</div>
                  <div className="flex-1 text-center">2p</div>
                  <div className="flex-1 text-center">3p</div>
                  <div className="flex-1 text-center">5p</div>
                  <div className="flex-1 text-center">6p</div>
                  <div className="flex-1 text-center">7p</div>
                  <div className="flex-1 text-center">8p</div>
                  <div className="flex-1 text-center">9p</div>
                </div>

                {/* Days Rows */}
                <div className="space-y-2">
                  {/* Mon */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 font-label-caps text-xs text-on-surface-variant text-right font-bold uppercase">Mon</div>
                    <div className="flex-1 flex gap-1">
                      <div className="flex-1 h-8 rounded bg-primary-container/10 hover:ring-2 ring-primary transition-all cursor-pointer"></div>
                      <div className="flex-1 h-8 rounded bg-primary-container/60 hover:ring-2 ring-primary transition-all cursor-pointer"></div>
                      <div className="flex-1 h-8 rounded bg-primary-container/40 hover:ring-2 ring-primary transition-all cursor-pointer"></div>
                      <div className="flex-1 h-8 rounded bg-primary-container/10 hover:ring-2 ring-primary transition-all cursor-pointer"></div>
                      <div className="flex-1 h-8 rounded bg-surface-variant/40 border border-dashed border-outline-variant/30 flex items-center justify-center text-outline-variant text-[9px] font-bold uppercase">Closed</div>
                      <div className="flex-1 h-8 rounded bg-primary-container/30 hover:ring-2 ring-primary transition-all cursor-pointer"></div>
                      <div className="flex-1 h-8 rounded bg-primary-container/70 hover:ring-2 ring-primary transition-all cursor-pointer"></div>
                      <div 
                        onMouseEnter={() => setActiveTooltip('mon-8')}
                        onMouseLeave={() => setActiveTooltip(null)}
                        className="flex-1 h-8 rounded bg-primary hover:ring-2 ring-primary transition-all cursor-pointer relative"
                      >
                        {activeTooltip === 'mon-8' && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-inverse-surface text-inverse-on-surface text-[10px] font-bold uppercase tracking-wider rounded-md py-1 px-2.5 shadow-lg z-55 pointer-events-none whitespace-nowrap">
                            32 Orders Volume
                          </div>
                        )}
                      </div>
                      <div className="flex-1 h-8 rounded bg-primary-container/70 hover:ring-2 ring-primary transition-all cursor-pointer"></div>
                      <div className="flex-1 h-8 rounded bg-primary-container/30 hover:ring-2 ring-primary transition-all cursor-pointer"></div>
                    </div>
                  </div>

                  {/* Tue */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 font-label-caps text-xs text-on-surface-variant text-right font-bold uppercase">Tue</div>
                    <div className="flex-1 flex gap-1">
                      <div className="flex-1 h-8 rounded bg-primary-container/10"></div>
                      <div className="flex-1 h-8 rounded bg-primary-container/40"></div>
                      <div className="flex-1 h-8 rounded bg-primary-container/30"></div>
                      <div className="flex-1 h-8 rounded bg-primary-container/10"></div>
                      <div className="flex-1 h-8 rounded bg-surface-variant/40 border border-dashed border-outline-variant/30 flex items-center justify-center text-outline-variant text-[9px] font-bold uppercase">Closed</div>
                      <div className="flex-1 h-8 rounded bg-primary-container/20"></div>
                      <div className="flex-1 h-8 rounded bg-primary-container/60"></div>
                      <div 
                        onMouseEnter={() => setActiveTooltip('tue-8')}
                        onMouseLeave={() => setActiveTooltip(null)}
                        className="flex-1 h-8 rounded bg-primary-container/90 hover:ring-2 ring-primary transition-all cursor-pointer relative"
                      >
                        {activeTooltip === 'tue-8' && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-inverse-surface text-inverse-on-surface text-[10px] font-bold uppercase tracking-wider rounded-md py-1 px-2.5 shadow-lg z-55 pointer-events-none whitespace-nowrap">
                            28 Orders Volume
                          </div>
                        )}
                      </div>
                      <div className="flex-1 h-8 rounded bg-primary-container/60"></div>
                      <div className="flex-1 h-8 rounded bg-primary-container/20"></div>
                    </div>
                  </div>

                  {/* Wed */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 font-label-caps text-xs text-on-surface-variant text-right font-bold uppercase">Wed</div>
                    <div className="flex-1 flex gap-1">
                      <div className="flex-1 h-8 rounded bg-primary-container/20"></div>
                      <div className="flex-1 h-8 rounded bg-primary-container/60"></div>
                      <div className="flex-1 h-8 rounded bg-primary-container/50"></div>
                      <div className="flex-1 h-8 rounded bg-primary-container/20"></div>
                      <div className="flex-1 h-8 rounded bg-surface-variant/40 border border-dashed border-outline-variant/30 flex items-center justify-center text-outline-variant text-[9px] font-bold uppercase">Closed</div>
                      <div className="flex-1 h-8 rounded bg-primary-container/40"></div>
                      <div className="flex-1 h-8 rounded bg-primary-container/70"></div>
                      <div 
                        onMouseEnter={() => setActiveTooltip('wed-8')}
                        onMouseLeave={() => setActiveTooltip(null)}
                        className="flex-1 h-8 rounded bg-primary hover:ring-2 ring-primary transition-all cursor-pointer relative"
                      >
                        {activeTooltip === 'wed-8' && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-inverse-surface text-inverse-on-surface text-[10px] font-bold uppercase tracking-wider rounded-md py-1 px-2.5 shadow-lg z-55 pointer-events-none whitespace-nowrap">
                            35 Orders Volume
                          </div>
                        )}
                      </div>
                      <div className="flex-1 h-8 rounded bg-primary-container/80"></div>
                      <div className="flex-1 h-8 rounded bg-primary-container/40"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminAnalytics;
