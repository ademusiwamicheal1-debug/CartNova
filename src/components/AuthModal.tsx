import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { INITIAL_DEMO_USERS } from '../services/authService';
import {
  LogIn,
  UserPlus,
  KeyRound,
  Mail,
  Lock,
  User,
  X,
  Sparkles,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  Gift,
  ArrowRight,
  Fingerprint,
  Phone
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    signIn,
    signUp,
    signInWithDemo,
    signInWithGoogle,
    showToast
  } = useShop();

  // Sign In Form state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up Form state
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpReferral, setSignUpReferral] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Forgot Password state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStep, setForgotStep] = useState<'input' | 'sent'>('input');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail || !signInPassword) {
      showToast('Please provide both email and password', 'warning');
      return;
    }
    setIsSubmitting(true);
    try {
      await signIn(signInEmail, signInPassword);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpName || !signUpEmail || !signUpPassword) {
      showToast('Please fill in all required fields', 'warning');
      return;
    }
    if (!agreeTerms) {
      showToast('Please accept the Terms of Service to continue', 'warning');
      return;
    }
    setIsSubmitting(true);
    try {
      await signUp(signUpName, signUpEmail, signUpPassword, signUpReferral);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      showToast('Please enter your account email address', 'warning');
      return;
    }
    setForgotStep('sent');
    showToast(`Password reset OTP code sent to ${forgotEmail}`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsAuthModalOpen(false)}
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 transition-all">
        {/* Header with gradient branding */}
        <div className="relative px-6 py-5 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight">
                  {authModalTab === 'signin' && 'Welcome Back to Cart NOVA'}
                  {authModalTab === 'signup' && 'Create Your Cart NOVA Account'}
                  {authModalTab === 'forgot' && 'Reset Your Password'}
                </h2>
                <p className="text-xs text-orange-100">
                  {authModalTab === 'signin' && 'Sign in to access VIP pricing, tracking, & saved cards'}
                  {authModalTab === 'signup' && 'Unlock +300 NOVA Coins & $25 welcome gift voucher'}
                  {authModalTab === 'forgot' && 'Receive an instant recovery code to your inbox'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 mt-4 bg-black/20 p-1 rounded-2xl">
            <button
              type="button"
              onClick={() => setAuthModalTab('signin')}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                authModalTab === 'signin'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => setAuthModalTab('signup')}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                authModalTab === 'signup'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Sign Up</span>
            </button>

            <button
              type="button"
              onClick={() => setAuthModalTab('forgot')}
              className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                authModalTab === 'forgot'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[72vh] overflow-y-auto space-y-5">
          {/* TAB 1: SIGN IN */}
          {authModalTab === 'signin' && (
            <form onSubmit={handleSignInSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={signInEmail}
                    onChange={e => setSignInEmail(e.target.value)}
                    placeholder="e.g. ademusiwamicheal1@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setAuthModalTab('forgot')}
                    className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={signInPassword}
                    onChange={e => setSignInPassword(e.target.value)}
                    placeholder="Enter your account password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me checkbox */}
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded text-orange-500 focus:ring-orange-400"
                  />
                  <span>Remember my login session</span>
                </label>
                <span className="text-slate-400">256-Bit SSL Encrypted</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
              >
                <LogIn className="w-4 h-4 text-slate-950" />
                <span>{isSubmitting ? 'Signing In...' : 'Sign In to Account'}</span>
              </button>

              {/* 1-Click Demo Profiles */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                  <span>⚡ 1-Click Instant Demo Logins</span>
                  <span className="text-orange-500 font-bold">Fast Test</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {INITIAL_DEMO_USERS.map((demoUser, idx) => (
                    <button
                      key={demoUser.id}
                      type="button"
                      onClick={() => signInWithDemo(idx)}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-orange-500 bg-slate-50 dark:bg-slate-800/60 hover:bg-orange-50/50 dark:hover:bg-orange-950/20 text-left transition-all cursor-pointer flex flex-col gap-1"
                    >
                      <div className="flex items-center gap-1.5">
                        <img
                          src={demoUser.avatar}
                          alt={demoUser.name}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="text-[11px] font-bold text-slate-900 dark:text-white truncate">
                          {demoUser.name.split(' ')[0]}
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold text-orange-600 dark:text-orange-400">
                        {demoUser.tier}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Social Login Options */}
              <div className="pt-2">
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                  <span className="flex-shrink mx-3 text-xs text-slate-400 font-medium">Or continue with</span>
                  <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 mt-1">
                  <button
                    type="button"
                    onClick={() => signInWithGoogle()}
                    className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                    <span>Google Login</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      showToast('Passkey biometric authentication verified!', 'success');
                      signInWithDemo(0);
                    }}
                    className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Fingerprint className="w-4 h-4 text-purple-500" />
                    <span>Passkey / Face ID</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* TAB 2: SIGN UP */}
          {authModalTab === 'signup' && (
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={signUpName}
                    onChange={e => setSignUpName(e.target.value)}
                    placeholder="e.g. Ademusiwa Micheal"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={signUpEmail}
                    onChange={e => setSignUpEmail(e.target.value)}
                    placeholder="e.g. yourname@domain.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Create Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={signUpPassword}
                    onChange={e => setSignUpPassword(e.target.value)}
                    placeholder="Min 6 characters with letters & numbers"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Referral / Voucher Bonus Code */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Referral / VIP Invite Code (Optional)</span>
                  <span className="text-amber-500 font-bold text-[10px]">+150 Coins Bonus</span>
                </label>
                <div className="relative">
                  <Gift className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
                  <input
                    type="text"
                    value={signUpReferral}
                    onChange={e => setSignUpReferral(e.target.value.toUpperCase())}
                    placeholder="e.g. NOVA-VIP-2026"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm font-mono uppercase outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="text-xs">
                <label className="flex items-start gap-2 text-slate-600 dark:text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={e => setAgreeTerms(e.target.checked)}
                    className="rounded text-orange-500 focus:ring-orange-400 mt-0.5"
                  />
                  <span>
                    I agree to the Cart NOVA <span className="text-orange-500 underline font-semibold">Terms of Service</span>, <span className="text-orange-500 underline font-semibold">Privacy Policy</span>, and Buyer Protection Guarantee.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 hover:opacity-95 text-slate-950 font-black text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
              >
                <UserPlus className="w-4 h-4 text-slate-950" />
                <span>{isSubmitting ? 'Creating Account...' : 'Complete Sign Up & Claim Perks'}</span>
              </button>
            </form>
          )}

          {/* TAB 3: FORGOT PASSWORD */}
          {authModalTab === 'forgot' && (
            <div className="space-y-4">
              {forgotStep === 'input' ? (
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Account Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={forgotEmail}
                        onChange={e => setForgotEmail(e.target.value)}
                        placeholder="Enter the email associated with your account"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                      />
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    We'll email you a secure 6-digit one-time code and link to choose a new password.
                  </p>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm shadow-md hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>Send Reset Code</span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-4 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Reset Instructions Sent!
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    We sent a verification code to <span className="font-bold text-slate-900 dark:text-white">{forgotEmail}</span>. Check your inbox and spam folder.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotStep('input');
                      setAuthModalTab('signin');
                    }}
                    className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline cursor-pointer"
                  >
                    Back to Sign In
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
