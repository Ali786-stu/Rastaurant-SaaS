import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (termsAccepted) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex items-center justify-center p-4 md:p-8 font-body-md relative overflow-hidden">
      {/* Atmospheric Background Decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-fixed-dim/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary-fixed/30 blur-[100px]"></div>
      </div>

      {/* Main Container */}
      <main className="w-full max-w-md mx-auto z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-container text-on-primary mb-4 shadow-sm shadow-primary-container/20">
            <span className="material-symbols-outlined text-3xl icon-fill">restaurant</span>
          </div>
          <h1 className="font-headline-lg text-primary mb-2 hidden md:block">WingsRiver</h1>
          <h1 className="font-headline-xl-mobile text-primary mb-2 md:hidden">WingsRiver</h1>
          <p className="font-body-md text-on-surface-variant">Create an account to manage your operations.</p>
        </div>

        {/* Registration Card */}
        <div className="glass-card rounded-xl p-8 w-full border border-outline-variant/10">
          {/* Quick Actions */}
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full flex items-center justify-center gap-3 bg-surface-container-lowest border border-outline-variant rounded-lg py-3 px-4 hover:bg-surface-variant/20 transition-colors mb-6 group" 
            type="button"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
            <span className="font-body-md text-on-surface group-hover:text-primary transition-colors">Sign up with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-outline-variant flex-1"></div>
            <span className="font-label-caps text-on-surface-variant uppercase text-[10px]">Or register with email</span>
            <div className="h-px bg-outline-variant flex-1"></div>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="space-y-1">
              <label className="block font-label-caps text-on-surface-variant uppercase text-xs" htmlFor="fullName">Full Name</label>
              <div className="relative">
                <span className={`material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 ml-3 transition-colors ${nameFocused ? 'text-primary' : 'text-outline'}`} style={{ fontSize: '20px' }}>person</span>
                <input 
                  className="input-field block w-full bg-[#F1F3F1] border-0 border-b border-outline-variant text-on-surface font-body-md py-2.5 pl-10 pr-3 focus:ring-0 transition-colors" 
                  id="fullName" 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setNameFocused(true)}
                  onBlur={() => setNameFocused(false)}
                  placeholder="John Doe" 
                  required 
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="block font-label-caps text-on-surface-variant uppercase text-xs" htmlFor="email">Email Address</label>
              <div className="relative">
                <span className={`material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 ml-3 transition-colors ${emailFocused ? 'text-primary' : 'text-outline'}`} style={{ fontSize: '20px' }}>mail</span>
                <input 
                  className="input-field block w-full bg-[#F1F3F1] border-0 border-b border-outline-variant text-on-surface font-body-md py-2.5 pl-10 pr-3 focus:ring-0 transition-colors" 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  placeholder="john@example.com" 
                  required 
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="block font-label-caps text-on-surface-variant uppercase text-xs" htmlFor="password">Password</label>
              <div className="relative">
                <span className={`material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 ml-3 transition-colors ${passwordFocused ? 'text-primary' : 'text-outline'}`} style={{ fontSize: '20px' }}>lock</span>
                <input 
                  className="input-field block w-full bg-[#F1F3F1] border-0 border-b border-outline-variant text-on-surface font-body-md py-2.5 pl-10 pr-10 focus:ring-0 transition-colors" 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  placeholder="••••••••" 
                  required 
                />
                <button 
                  className="absolute right-0 top-1/2 -translate-y-1/2 mr-3 text-outline hover:text-primary transition-colors focus:outline-none" 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start pt-2">
              <div className="flex items-center h-5">
                <input 
                  className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary-fixed bg-surface-container-lowest" 
                  id="terms" 
                  type="checkbox" 
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  required 
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-body-sm text-on-surface-variant" htmlFor="terms">
                  I agree to the <a className="text-primary hover:underline font-medium" href="#">Terms of Service</a> and <a className="text-primary hover:underline font-medium" href="#">Privacy Policy</a>.
                </label>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4">
              <button 
                className="w-full flex items-center justify-center gap-2 bg-[#214329] text-on-primary rounded-lg py-3 px-4 font-body-md font-medium hover:bg-primary transition-colors shadow-md shadow-primary-container/20" 
                type="submit"
              >
                Create Account
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span>
              </button>
            </div>
          </form>
        </div>

        {/* Footer Link */}
        <p className="mt-8 text-center font-body-sm text-on-surface-variant">
          Already have an account? <Link className="text-primary font-medium hover:underline transition-all ml-1" to="/">Log in here</Link>
        </p>
      </main>
    </div>
  );
};

export default SignUp;
