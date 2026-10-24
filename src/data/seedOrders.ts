import { OrderDetails } from '../types';
import { PRODUCTS } from './products';

export const INITIAL_SEED_ORDERS: OrderDetails[] = [
  {
    orderId: 'AF-849201',
    date: 'Oct 24, 2026',
    timestamp: Date.now() - 1000 * 60 * 45, // 45 mins ago
    status: 'Pending',
    items: [
      {
        product: PRODUCTS[0], // Solenne Structured Bag ($385)
        selectedColor: PRODUCTS[0].colors[0], // Muted Sage
        quantity: 1,
      },
    ],
    subtotal: 385,
    shipping: 0,
    total: 385,
    currency: 'PKR',
    shippingMethod: 'Standard Atelier Dispatch',
    customer: {
      fullName: 'Mahnoor Khan',
      email: 'mahnoor.khan@example.com',
      phone: '+92 300 8521943',
      address: 'House 42, Street 19, Sector F-7/2',
      city: 'Islamabad',
      postalCode: '44000',
      country: 'Pakistan',
    },
    paymentMethod: 'cod',
    notes: 'Please call before dispatching to confirm house gate timing.',
  },
  {
    orderId: 'AF-718294',
    date: 'Oct 23, 2026',
    timestamp: Date.now() - 1000 * 60 * 60 * 18,
    status: 'Processing',
    items: [
      {
        product: PRODUCTS[1], // Elara Everyday Wallet ($115)
        selectedColor: PRODUCTS[1].colors[0],
        quantity: 1,
      },
      {
        product: PRODUCTS[2] || PRODUCTS[0], // Celine Tote ($420)
        selectedColor: (PRODUCTS[2] || PRODUCTS[0]).colors[0],
        quantity: 1,
      },
    ],
    subtotal: 535,
    shipping: 0,
    total: 535,
    currency: 'USD',
    shippingMethod: 'Priority Express Courier',
    customer: {
      fullName: 'Ayesha Malik',
      email: 'ayesha.m@atelierclub.pk',
      phone: '+92 321 4455889',
      address: 'Apartment 402, Block C, Gulberg III',
      city: 'Lahore',
      postalCode: '54000',
      country: 'Pakistan',
    },
    paymentMethod: 'bank_transfer',
    notes: 'Raast payment reference verified via HBL transfer.',
  },
  {
    orderId: 'AF-639108',
    date: 'Oct 22, 2026',
    timestamp: Date.now() - 1000 * 60 * 60 * 42,
    status: 'Shipped',
    items: [
      {
        product: PRODUCTS[3] || PRODUCTS[0], // Mira Slouchy ($340)
        selectedColor: (PRODUCTS[3] || PRODUCTS[0]).colors[1] || (PRODUCTS[3] || PRODUCTS[0]).colors[0],
        quantity: 1,
      },
    ],
    subtotal: 340,
    shipping: 15,
    total: 355,
    currency: 'PKR',
    shippingMethod: 'Standard Atelier Dispatch',
    customer: {
      fullName: 'Fatima Tariq',
      email: 'fatima.tariq@gmail.com',
      phone: '+92 333 9988112',
      address: 'Villa 18-B, Khayaban-e-Shamsheer, DHA Phase 5',
      city: 'Karachi',
      postalCode: '75500',
      country: 'Pakistan',
    },
    paymentMethod: 'cod',
    notes: 'TCS Tracking # AF-PK-981042 dispatched from Islamabad hub.',
  },
  {
    orderId: 'AF-512093',
    date: 'Oct 20, 2026',
    timestamp: Date.now() - 1000 * 60 * 60 * 96,
    status: 'Delivered',
    items: [
      {
        product: PRODUCTS[0], // Solenne Structured Bag ($385)
        selectedColor: PRODUCTS[0].colors[2] || PRODUCTS[0].colors[0], // Charcoal Noir
        quantity: 1,
      },
    ],
    subtotal: 385,
    shipping: 28,
    total: 413,
    currency: 'GBP',
    shippingMethod: 'Priority Air Courier',
    customer: {
      fullName: 'Sarah Jenkins',
      email: 's.jenkins@kensington.co.uk',
      phone: '+44 7700 900123',
      address: '42 Kensington Church Street',
      city: 'London',
      postalCode: 'W8 4DB',
      country: 'United Kingdom',
    },
    paymentMethod: 'card',
    notes: 'Delivered with bespoke monogram gift dustbag. Signature received.',
  },
];
