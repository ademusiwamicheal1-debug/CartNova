import { User, ShippingAddress, SavedPaymentCard } from '../types';

/**
 * List of email addresses granted master administrative access.
 * Only users in this list can view or operate the Admin Panels, catalog management, and tools.
 */
export const ADMIN_EMAILS: readonly string[] = [
  'ademusiwamicheal1@gmail.com'
];

/**
 * Security check helper: determines if a given user is the authorized store administrator.
 */
export function isUserAdmin(user: User | null | undefined): boolean {
  if (!user || !user.email) return false;
  const normalizedEmail = user.email.trim().toLowerCase();
  return ADMIN_EMAILS.some(adminEmail => adminEmail.toLowerCase() === normalizedEmail) || user.role === 'admin';
}

export const INITIAL_DEMO_USERS: User[] = [
  {
    id: 'usr-admin-1',
    name: 'Michael Ademusiwa',
    email: 'ademusiwamicheal1@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    role: 'admin',
    tier: 'Diamond Elite',
    coins: 9999,
    phone: '+1 (555) 382-9910',
    emailVerified: true,
    joinedDate: 'Master Administrator • Cart NOVA HQ',
    ordersCount: 28,
    wishlistCount: 12,
    shippingAddress: {
      id: 'addr-1',
      fullName: 'Michael Ademusiwa',
      phone: '+1 (555) 382-9910',
      address: '742 Evergreen Terrace, Suite 4B',
      street: '742 Evergreen Terrace, Suite 4B',
      city: 'Metropolis',
      state: 'NY',
      country: 'United States',
      postalCode: '10001',
      isDefault: true
    },
    savedAddresses: [
      {
        id: 'addr-1',
        fullName: 'Michael Ademusiwa',
        phone: '+1 (555) 382-9910',
        address: '742 Evergreen Terrace, Suite 4B',
        street: '742 Evergreen Terrace, Suite 4B',
        city: 'Metropolis',
        state: 'NY',
        country: 'United States',
        postalCode: '10001',
        isDefault: true
      },
      {
        id: 'addr-2',
        fullName: 'Michael (Work Hub)',
        phone: '+1 (555) 382-9910',
        address: '450 Innovation Boulevard, Tech Park Fl 12',
        street: '450 Innovation Boulevard, Tech Park Fl 12',
        city: 'Metropolis',
        state: 'NY',
        country: 'United States',
        postalCode: '10005',
        isDefault: false
      }
    ],
    savedPaymentCards: [
      {
        id: 'card-1',
        brand: 'visa',
        last4: '4242',
        expiry: '12/28',
        cardHolder: 'MICHAEL ADEMUSIWA',
        isDefault: true
      },
      {
        id: 'card-2',
        brand: 'mastercard',
        last4: '8891',
        expiry: '09/27',
        cardHolder: 'MICHAEL ADEMUSIWA',
        isDefault: false
      },
      {
        id: 'card-3',
        brand: 'applepay',
        last4: '1029',
        expiry: '04/29',
        cardHolder: 'Apple Cash Pay',
        isDefault: false
      }
    ]
  },
  {
    id: 'usr-seller-2',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@novamall.com',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    role: 'seller',
    tier: 'Diamond Elite',
    coins: 1250,
    phone: '+1 (555) 749-3382',
    emailVerified: true,
    joinedDate: 'Verified Merchant since 2023',
    ordersCount: 38,
    wishlistCount: 15,
    shippingAddress: {
      id: 'addr-seller-1',
      fullName: 'Sarah Jenkins (Nova Store HQ)',
      phone: '+1 (555) 749-3382',
      address: '880 Logistics Parkway, Bay 4',
      street: '880 Logistics Parkway, Bay 4',
      city: 'Seattle',
      state: 'WA',
      country: 'United States',
      postalCode: '98101',
      isDefault: true
    },
    savedAddresses: [
      {
        id: 'addr-seller-1',
        fullName: 'Sarah Jenkins (Nova Store HQ)',
        phone: '+1 (555) 749-3382',
        address: '880 Logistics Parkway, Bay 4',
        street: '880 Logistics Parkway, Bay 4',
        city: 'Seattle',
        state: 'WA',
        country: 'United States',
        postalCode: '98101',
        isDefault: true
      }
    ],
    savedPaymentCards: [
      {
        id: 'card-seller-1',
        brand: 'amex',
        last4: '0041',
        expiry: '08/30',
        cardHolder: 'SARAH JENKINS',
        isDefault: true
      }
    ]
  },
  {
    id: 'usr-shopper-3',
    name: 'Alex Chen',
    email: 'alex.chen@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    role: 'customer',
    tier: 'Standard',
    coins: 100,
    phone: '+1 (555) 912-4401',
    emailVerified: true,
    joinedDate: 'New Member (Joined Today)',
    ordersCount: 1,
    wishlistCount: 3,
    shippingAddress: {
      id: 'addr-shopper-1',
      fullName: 'Alex Chen',
      phone: '+1 (555) 912-4401',
      address: '120 Ocean View Ave',
      street: '120 Ocean View Ave',
      city: 'San Francisco',
      state: 'CA',
      country: 'United States',
      postalCode: '94107',
      isDefault: true
    },
    savedAddresses: [
      {
        id: 'addr-shopper-1',
        fullName: 'Alex Chen',
        phone: '+1 (555) 912-4401',
        address: '120 Ocean View Ave',
        street: '120 Ocean View Ave',
        city: 'San Francisco',
        state: 'CA',
        country: 'United States',
        postalCode: '94107',
        isDefault: true
      }
    ],
    savedPaymentCards: [
      {
        id: 'card-shopper-1',
        brand: 'visa',
        last4: '1129',
        expiry: '05/29',
        cardHolder: 'ALEX CHEN',
        isDefault: true
      }
    ]
  }
];

export function getInitialStoredUser(): User | null {
  try {
    const saved = localStorage.getItem('cartnova_current_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.id) return parsed;
    }
    // Default to the Gold VIP user for an instant premium interactive experience
    return INITIAL_DEMO_USERS[0];
  } catch {
    return INITIAL_DEMO_USERS[0];
  }
}
