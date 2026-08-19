import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShippingAddress, SavedPaymentCard } from '../types';
import {
  User,
  X,
  ShieldCheck,
  Award,
  Coins,
  MapPin,
  CreditCard,
  Package,
  Heart,
  LogOut,
  Plus,
  Trash2,
  Check,
  Sparkles,
  Phone,
  Mail,
  Calendar,
  ChevronRight,
  Edit2,
  Eye,
  Sliders,
  Palette
} from 'lucide-react';

export const UserProfileModal: React.FC = () => {
  const {
    currentUser,
    isAdminUser,
    setIsAdminOpen,
    isUserProfileModalOpen,
    setIsUserProfileModalOpen,
    setIsThemeModalOpen,
    signOut,
    updateUserProfile,
    addSavedAddress,
    addSavedCard,
    setIsTrackingModalOpen,
    setIsWishlistOpen,
    setIsLuckyWheelOpen,
    orders,
    wishlist,
    showToast
  } = useShop();

  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'addresses' | 'cards' | 'security'>('overview');

  // Edit Profile Form
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');
  const [editAvatar, setEditAvatar] = useState(currentUser?.avatar || '');

  // Add Address Form
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newZip, setNewZip] = useState('');

  // Add Card Form
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardHolder, setNewCardHolder] = useState('');
  const [newCardExpiry, setNewCardExpiry] = useState('');
  const [newCardBrand, setNewCardBrand] = useState<'visa' | 'mastercard' | 'amex'>('visa');

  if (!isUserProfileModalOpen || !currentUser) return null;

  const AVATAR_PRESETS = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80'
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: editName,
      phone: editPhone,
      avatar: editAvatar
    });
    setActiveTab('overview');
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newStreet || !newCity) {
      showToast('Please fill in complete address details', 'warning');
      return;
    }
    const newAddr: ShippingAddress = {
      id: `addr-${Date.now()}`,
      fullName: newFullName,
      phone: newPhone || currentUser.phone || '',
      street: newStreet,
      address: newStreet,
      city: newCity,
      state: newState,
      postalCode: newZip,
      country: 'United States',
      isDefault: false
    };
    addSavedAddress(newAddr);
    setIsAddingAddress(false);
    setNewFullName('');
    setNewStreet('');
    setNewCity('');
    setNewState('');
    setNewZip('');
  };

  const handleCreateCard = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNum = newCardNumber.replace(/\D/g, '');
    if (cleanNum.length < 4) {
      showToast('Please enter a valid card number', 'warning');
      return;
    }
    const newCard: SavedPaymentCard = {
      id: `card-${Date.now()}`,
      brand: newCardBrand,
      last4: cleanNum.slice(-4),
      expiry: newCardExpiry || '12/29',
      cardHolder: (newCardHolder || currentUser.name).toUpperCase(),
      isDefault: false
    };
    addSavedCard(newCard);
    setIsAddingCard(false);
    setNewCardNumber('');
    setNewCardHolder('');
    setNewCardExpiry('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsUserProfileModalOpen(false)}
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 transition-all">
        {/* User Banner Header */}
        <div className="relative px-6 pt-6 pb-4 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/40">
              Account Management Center
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsUserProfileModalOpen(false);
                  setIsThemeModalOpen(true);
                }}
                className="text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
              >
                <Palette className="w-3.5 h-3.5 text-amber-400" />
                <span>Themes</span>
              </button>

              <button
                onClick={() => setIsUserProfileModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* User Identity Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-orange-500/80 shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-0.5 rounded-full ring-2 ring-slate-900">
                  <Check className="w-3 h-3" />
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-white">{currentUser.name}</h3>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {currentUser.tier}
                  </span>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3 h-3 text-slate-500" />
                  <span>{currentUser.email}</span>
                </p>
              </div>
            </div>

            {/* Quick Nova Coins & Sign Out */}
            <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsUserProfileModalOpen(false);
                  setIsLuckyWheelOpen(true);
                }}
                className="bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-amber-500/20 transition-all cursor-pointer"
              >
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentUser.coins} Coins</span>
              </button>

              <button
                type="button"
                id="btn-user-profile-sign-out"
                onClick={signOut}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-1.5 mt-4 overflow-x-auto no-scrollbar pt-1">
            {[
              { id: 'overview', label: 'Overview', icon: ShieldCheck },
              { id: 'profile', label: 'Edit Info', icon: Edit2 },
              { id: 'addresses', label: 'Address Book', icon: MapPin },
              { id: 'cards', label: 'Payment Cards', icon: CreditCard }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* Master Administrator Privilege Card */}
              {isAdminUser && (
                <div className="p-4 rounded-2xl bg-linear-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-lg border border-amber-500/30">
                      👑
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-amber-500 dark:text-amber-400 flex items-center gap-1.5 uppercase tracking-wide">
                        <span>Master Store Administrator</span>
                        <span className="bg-emerald-500/20 text-emerald-500 text-[9px] px-1.5 py-0.2 rounded-md font-bold">Authorized</span>
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        You have exclusive authority over the catalog, scrapers, profit margins & inventory.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsUserProfileModalOpen(false);
                      setIsAdminOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold shadow-md shadow-orange-500/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Launch Admin Studio</span>
                  </button>
                </div>
              )}

              {/* Stat Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/40 rounded-2xl">
                  <div className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase">Tier Status</div>
                  <div className="text-base font-black text-slate-900 dark:text-white mt-0.5">{currentUser.tier}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Exclusive 15% VIP discount</div>
                </div>

                <div
                  onClick={() => {
                    setIsUserProfileModalOpen(false);
                    setIsTrackingModalOpen(true);
                  }}
                  className="p-3.5 bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-900/40 rounded-2xl cursor-pointer hover:border-cyan-400 transition-colors"
                >
                  <div className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase">Orders Placed</div>
                  <div className="text-base font-black text-slate-900 dark:text-white mt-0.5">{orders.length} Orders</div>
                  <div className="text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold">Track package &rarr;</div>
                </div>

                <div
                  onClick={() => {
                    setIsUserProfileModalOpen(false);
                    setIsWishlistOpen(true);
                  }}
                  className="p-3.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 rounded-2xl cursor-pointer hover:border-rose-400 transition-colors"
                >
                  <div className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase">Saved Wishlist</div>
                  <div className="text-base font-black text-slate-900 dark:text-white mt-0.5">{wishlist.length} Items</div>
                  <div className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold">View items &rarr;</div>
                </div>
              </div>

              {/* Primary Shipping Address & Default Card Overview */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Default Logistics & Payment
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Default Address */}
                  <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                        <MapPin className="w-3.5 h-3.5 text-orange-500" />
                        <span>Primary Address</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                        Default
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                      {currentUser.shippingAddress?.fullName || currentUser.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {currentUser.shippingAddress?.street || currentUser.shippingAddress?.address || '742 Evergreen Terrace, Suite 4B'}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {currentUser.shippingAddress?.city}, {currentUser.shippingAddress?.state} {currentUser.shippingAddress?.postalCode}
                    </p>
                  </div>

                  {/* Default Payment */}
                  <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                        <CreditCard className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Primary Payment</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    </div>
                    {currentUser.savedPaymentCards && currentUser.savedPaymentCards.length > 0 ? (
                      <div>
                        <p className="text-xs text-slate-900 dark:text-white font-mono font-bold uppercase">
                          {currentUser.savedPaymentCards[0].brand} •••• {currentUser.savedPaymentCards[0].last4}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Expires: {currentUser.savedPaymentCards[0].expiry}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500">No payment card saved yet.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* VIP Benefits Ribbon */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent border border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">VIP Club Membership Perks Active</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Free NovaExpress shipping on all orders + double daily spin rewards
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsUserProfileModalOpen(false);
                    setIsLuckyWheelOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-600 transition-colors cursor-pointer"
                >
                  Spin & Win
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: EDIT PROFILE */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Full Display Name
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Contact Phone
                </label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={e => setEditPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm outline-none focus:border-orange-500"
                />
              </div>

              {/* Avatar Preset Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Choose Profile Avatar
                </label>
                <div className="flex items-center gap-3">
                  {AVATAR_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setEditAvatar(preset)}
                      className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        editAvatar === preset ? 'border-orange-500 ring-2 ring-orange-500/30 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={preset} alt="avatar" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-orange-500 text-white font-bold text-xs hover:bg-orange-600 transition-colors shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: ADDRESS BOOK */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Saved Delivery Addresses
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddingAddress(!isAddingAddress)}
                  className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Address</span>
                </button>
              </div>

              {/* Add Address Sub-form */}
              {isAddingAddress && (
                <form onSubmit={handleCreateAddress} className="p-4 rounded-2xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/50 space-y-3">
                  <div className="text-xs font-bold text-orange-600 dark:text-orange-400">Add New Shipping Address</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      required
                      placeholder="Recipient Full Name"
                      value={newFullName}
                      onChange={e => setNewFullName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="Phone Number"
                      value={newPhone}
                      onChange={e => setNewPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Street Address, Apt / Suite"
                    value={newStreet}
                    onChange={e => setNewStreet(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="City"
                      value={newCity}
                      onChange={e => setNewCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="State / Region"
                      value={newState}
                      onChange={e => setNewState(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="Postal Code"
                      value={newZip}
                      onChange={e => setNewZip(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsAddingAddress(false)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-orange-500 text-white font-bold text-xs hover:bg-orange-600"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              )}

              {/* Address List */}
              <div className="space-y-2.5">
                {(currentUser.savedAddresses || [currentUser.shippingAddress]).map((addr, idx) => (
                  <div
                    key={addr?.id || idx}
                    className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{addr?.fullName}</span>
                        {addr?.isDefault && (
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {addr?.street || addr?.address}, {addr?.city}, {addr?.state} {addr?.postalCode}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PAYMENT CARDS */}
          {activeTab === 'cards' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Saved Payment Methods
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddingCard(!isAddingCard)}
                  className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Card</span>
                </button>
              </div>

              {/* Add Card Sub-form */}
              {isAddingCard && (
                <form onSubmit={handleCreateCard} className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/50 space-y-3">
                  <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">Add New Payment Card</div>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={newCardBrand}
                      onChange={e => setNewCardBrand(e.target.value as any)}
                      className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      <option value="visa">Visa</option>
                      <option value="mastercard">Mastercard</option>
                      <option value="amex">American Express</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Cardholder Name"
                      value={newCardHolder}
                      onChange={e => setNewCardHolder(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white uppercase"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Card Number (•••• •••• •••• ••••)"
                      value={newCardNumber}
                      onChange={e => setNewCardNumber(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                    />
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={newCardExpiry}
                      onChange={e => setNewCardExpiry(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsAddingCard(false)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700"
                    >
                      Save Card
                    </button>
                  </div>
                </form>
              )}

              {/* Cards List */}
              <div className="space-y-2.5">
                {(currentUser.savedPaymentCards || []).map((card, idx) => (
                  <div
                    key={card.id || idx}
                    className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-[10px] uppercase">
                        {card.brand}
                      </div>
                      <div>
                        <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                          •••• •••• •••• {card.last4}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">
                          Expires: {card.expiry} • {card.cardHolder}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={signOut}
            className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out of Account</span>
          </button>

          <button
            type="button"
            onClick={() => setIsUserProfileModalOpen(false)}
            className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs px-5 py-2.5 rounded-xl hover:opacity-90 transition-all cursor-pointer shadow-md"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
