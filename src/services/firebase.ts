import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  onSnapshot,
  Firestore
} from 'firebase/firestore';
import firebaseConfigJson from '../../firebase-applet-config.json';
import { User } from '../types';

// Fallback configuration if json config is missing or unparsed
export const firebaseConfig = {
  apiKey: firebaseConfigJson.apiKey || "AIzaSyAap0Ggpxz4d2rKTcE46tG1WG_U0kGdoP4",
  authDomain: firebaseConfigJson.authDomain || "ai-studio-applet-webapp-77398.firebaseapp.com",
  projectId: firebaseConfigJson.projectId || "ai-studio-applet-webapp-77398",
  storageBucket: firebaseConfigJson.storageBucket || "ai-studio-applet-webapp-77398.firebasestorage.app",
  messagingSenderId: firebaseConfigJson.messagingSenderId || "878330426394",
  appId: firebaseConfigJson.appId || "1:878330426394:web:584b92caff114727714da3"
};

// Initialize Firebase app singleton
export const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(firebaseApp);

// Initialize Firestore
const databaseId = firebaseConfigJson.firestoreDatabaseId || undefined;
export const db: Firestore = databaseId 
  ? getFirestore(firebaseApp, databaseId)
  : getFirestore(firebaseApp);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

/**
 * Format a Firebase User into our application User model
 */
export async function syncUserProfileFromFirestore(firebaseUser: FirebaseUser): Promise<User> {
  try {
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: firebaseUser.uid,
        name: data.name || firebaseUser.displayName || 'Nova Shopper',
        email: firebaseUser.email || '',
        avatar: data.avatar || firebaseUser.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        tier: data.tier || 'Gold VIP',
        coins: data.coins !== undefined ? data.coins : 520,
        phone: data.phone || '+1 (555) 234-5678',
        role: data.role || 'customer',
        joinedDate: data.joinedDate || 'Member since Today',
        shippingAddress: data.shippingAddress || {
          id: 'addr-default',
          fullName: data.name || firebaseUser.displayName || 'Nova Shopper',
          phone: data.phone || '+1 (555) 234-5678',
          street: '742 Evergreen Terrace, Apt 4B',
          address: '742 Evergreen Terrace, Apt 4B',
          city: 'Springfield',
          state: 'OR',
          postalCode: '97477',
          country: 'United States',
          isDefault: true
        },
        savedAddresses: data.savedAddresses || [
          {
            id: 'addr-default',
            fullName: data.name || firebaseUser.displayName || 'Nova Shopper',
            phone: data.phone || '+1 (555) 234-5678',
            street: '742 Evergreen Terrace, Apt 4B',
            address: '742 Evergreen Terrace, Apt 4B',
            city: 'Springfield',
            state: 'OR',
            postalCode: '97477',
            country: 'United States',
            isDefault: true
          }
        ],
        savedPaymentCards: data.savedPaymentCards || [
          {
            id: 'card-default-1',
            brand: 'visa',
            last4: '8824',
            expiry: '11/28',
            cardHolder: (data.name || firebaseUser.displayName || 'NOVA SHOPPER').toUpperCase(),
            isDefault: true
          }
        ]
      };
    } else {
      // First time login - create default firestore document
      const defaultUser: User = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || 'Nova Shopper',
        email: firebaseUser.email || '',
        avatar: firebaseUser.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        tier: 'Gold VIP',
        coins: 500, // Sign-up bonus
        phone: '+1 (555) 234-5678',
        role: 'customer',
        joinedDate: 'Joined Today (Firebase Verified)',
        shippingAddress: {
          id: 'addr-default',
          fullName: firebaseUser.displayName || 'Nova Shopper',
          phone: '+1 (555) 234-5678',
          street: '742 Evergreen Terrace, Apt 4B',
          address: '742 Evergreen Terrace, Apt 4B',
          city: 'Springfield',
          state: 'OR',
          postalCode: '97477',
          country: 'United States',
          isDefault: true
        },
        savedAddresses: [
          {
            id: 'addr-default',
            fullName: firebaseUser.displayName || 'Nova Shopper',
            phone: '+1 (555) 234-5678',
            street: '742 Evergreen Terrace, Apt 4B',
            address: '742 Evergreen Terrace, Apt 4B',
            city: 'Springfield',
            state: 'OR',
            postalCode: '97477',
            country: 'United States',
            isDefault: true
          }
        ],
        savedPaymentCards: [
          {
            id: 'card-1',
            brand: 'visa',
            last4: '8824',
            expiry: '11/28',
            cardHolder: (firebaseUser.displayName || 'NOVA SHOPPER').toUpperCase(),
            isDefault: true
          }
        ]
      };

      await setDoc(userDocRef, {
        ...defaultUser,
        createdAt: new Date().toISOString()
      });

      return defaultUser;
    }
  } catch (err) {
    console.warn('Firestore user doc sync error, using auth token profile:', err);
    return {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || 'Nova Shopper',
      email: firebaseUser.email || '',
      avatar: firebaseUser.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      tier: 'Gold VIP',
      coins: 500,
      phone: '+1 (555) 234-5678',
      role: 'customer',
      joinedDate: 'Joined Today',
      savedAddresses: [],
      savedPaymentCards: []
    };
  }
}

/**
 * Update user document in Firestore
 */
export async function saveUserProfileToFirestore(userId: string, updates: Partial<User>): Promise<void> {
  try {
    const userDocRef = doc(db, 'users', userId);
    await setDoc(userDocRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.warn('Error updating profile in Firestore:', error);
  }
}

export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  firebaseSignOut,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile
};
