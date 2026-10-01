import React, { useState, useEffect } from 'react';
import { 
  X, 
  Database, 
  Layers, 
  GitBranch, 
  Table, 
  Key, 
  CheckCircle2, 
  BookOpen, 
  GraduationCap, 
  ChevronRight, 
  Info, 
  ArrowRight,
  ShieldCheck,
  Search,
  SlidersHorizontal,
  ExternalLink,
  Code2,
  Boxes,
  Network,
  ListOrdered,
  FileCheck
} from 'lucide-react';
import { AcademicProject } from '../types/portfolio';

interface EcommerceDatabaseCaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: AcademicProject;
  initialTab?: 'overview' | 'normalization' | 'entities' | 'relationships' | 'integrity';
}

export const EcommerceDatabaseCaseStudyModal: React.FC<EcommerceDatabaseCaseStudyModalProps> = ({
  isOpen,
  onClose,
  project,
  initialTab = 'overview'
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'normalization' | 'entities' | 'relationships' | 'integrity'>(initialTab);
  const [selectedDomain, setSelectedDomain] = useState<'all' | 'customer' | 'catalog' | 'orders' | 'shipping'>('all');
  const [entitySearch, setEntitySearch] = useState('');
  const [selectedNormalizationStage, setSelectedNormalizationStage] = useState<'all' | '1nf' | '2nf' | '3nf'>('3nf');
  const [activeEntityId, setActiveEntityId] = useState<string>('customers');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // The 19 Normalized Entities categorized into business domains
  const normalizedEntities = [
    // Customer Domain
    {
      id: 'customers',
      name: 'Customers',
      domain: 'customer',
      domainLabel: 'Customer Management',
      pk: 'customer_id (PK)',
      fks: ['status_id (FK -> Customer Status)'],
      description: 'Central customer identity master record storing core profile identification.',
      attributes: ['customer_id (INT, PK)', 'first_name (VARCHAR)', 'last_name (VARCHAR)', 'registration_date (DATETIME)', 'status_id (INT, FK)'],
      normalizationStage: '3NF',
      rationale: 'Separated from contact details and historical statuses to prevent transitive redundancy.',
      relationships: [
        { target: 'Customer Contact', type: '1:M', description: 'One customer can have multiple contact methods (email, phone, alternate phone).' },
        { target: 'Customer Address', type: '1:M', description: 'One customer can link to multiple shipping or billing addresses.' },
        { target: 'Customer Status History', type: '1:M', description: 'Tracks lifecycle status changes over time.' },
        { target: 'Orders', type: '1:M', description: 'One customer can place multiple e-commerce orders.' }
      ]
    },
    {
      id: 'customer_contact',
      name: 'Customer Contact',
      domain: 'customer',
      domainLabel: 'Customer Management',
      pk: 'contact_id (PK)',
      fks: ['customer_id (FK -> Customers)'],
      description: 'Dedicated multi-channel contact attributes (primary email, mobile, work phone).',
      attributes: ['contact_id (INT, PK)', 'customer_id (INT, FK)', 'contact_type (VARCHAR)', 'contact_value (VARCHAR)', 'is_primary (BOOLEAN)'],
      normalizationStage: '1NF',
      rationale: 'Resolves repeating groups of contact numbers/emails found in initial flat records.',
      relationships: [
        { target: 'Customers', type: 'M:1', description: 'Belongs to a specific Customer record.' }
      ]
    },
    {
      id: 'customer_status',
      name: 'Customer Status',
      domain: 'customer',
      domainLabel: 'Customer Management',
      pk: 'status_id (PK)',
      fks: [],
      description: 'Lookup entity for defined customer lifecycle states (Active, Inactive, Suspended, Flagged).',
      attributes: ['status_id (INT, PK)', 'status_code (VARCHAR)', 'status_name (VARCHAR)', 'description (TEXT)'],
      normalizationStage: '3NF',
      rationale: 'Lookup entity eliminating update anomalies and redundant status strings.',
      relationships: [
        { target: 'Customers', type: '1:M', description: 'Defines current status for customers.' },
        { target: 'Customer Status History', type: '1:M', description: 'Logged in status history transitions.' }
      ]
    },
    {
      id: 'customer_status_history',
      name: 'Customer Status History',
      domain: 'customer',
      domainLabel: 'Customer Management',
      pk: 'history_id (PK)',
      fks: ['customer_id (FK -> Customers)', 'status_id (FK -> Customer Status)'],
      description: 'Audit log capturing chronological customer state transitions, remarks, and timestamps.',
      attributes: ['history_id (INT, PK)', 'customer_id (INT, FK)', 'status_id (INT, FK)', 'changed_at (TIMESTAMP)', 'reason (VARCHAR)'],
      normalizationStage: '3NF',
      rationale: 'Maintains historical compliance without modifying master customer attributes in-place.',
      relationships: [
        { target: 'Customers', type: 'M:1', description: 'Belongs to customer.' },
        { target: 'Customer Status', type: 'M:1', description: 'References the logged status state.' }
      ]
    },
    {
      id: 'address',
      name: 'Address',
      domain: 'customer',
      domainLabel: 'Customer Management',
      pk: 'address_id (PK)',
      fks: ['location_id (FK -> Location)'],
      description: 'Normalized physical street address record separated from geographic location definitions.',
      attributes: ['address_id (INT, PK)', 'street_line1 (VARCHAR)', 'street_line2 (VARCHAR)', 'postal_code (VARCHAR)', 'location_id (INT, FK)'],
      normalizationStage: '3NF',
      rationale: 'Decouples street lines from postal and city/state hierarchies.',
      relationships: [
        { target: 'Location', type: 'M:1', description: 'Links to normalized geographic location entity.' },
        { target: 'Customer Address', type: '1:M', description: 'Associated with customers via junction entity.' },
        { target: 'Shipments', type: '1:M', description: 'Destination address for parcel shipments.' }
      ]
    },
    {
      id: 'location',
      name: 'Location',
      domain: 'customer',
      domainLabel: 'Customer Management',
      pk: 'location_id (PK)',
      fks: [],
      description: 'Geographic entity storing City, State/Province, and Country classifications.',
      attributes: ['location_id (INT, PK)', 'city (VARCHAR)', 'state_province (VARCHAR)', 'country (VARCHAR)', 'region_code (VARCHAR)'],
      normalizationStage: '3NF',
      rationale: 'Eliminates transitive dependencies where Postal Code / City determined State and Country.',
      relationships: [
        { target: 'Address', type: '1:M', description: 'Provides regional classification for multiple addresses.' }
      ]
    },
    {
      id: 'customer_address',
      name: 'Customer Address',
      domain: 'customer',
      domainLabel: 'Customer Management',
      pk: 'customer_address_id (PK)',
      fks: ['customer_id (FK -> Customers)', 'address_id (FK -> Address)'],
      description: 'Associative bridge entity connecting customers to multiple billing and shipping addresses.',
      attributes: ['customer_address_id (INT, PK)', 'customer_id (INT, FK)', 'address_id (INT, FK)', 'address_type (ENUM: Billing, Shipping)', 'is_default (BOOLEAN)'],
      normalizationStage: '2NF',
      rationale: 'Resolves M:M relationship between customers and addresses, preserving address reusability.',
      relationships: [
        { target: 'Customers', type: 'M:1', description: 'Links to customer.' },
        { target: 'Address', type: 'M:1', description: 'Links to normalized physical address.' }
      ]
    },

    // Catalog & Inventory Domain
    {
      id: 'category',
      name: 'Category',
      domain: 'catalog',
      domainLabel: 'Product & Inventory',
      pk: 'category_id (PK)',
      fks: ['parent_category_id (FK -> Self Recursive)'],
      description: 'Hierarchical product classification taxonomy supporting multi-tier category structures.',
      attributes: ['category_id (INT, PK)', 'category_name (VARCHAR)', 'parent_category_id (INT, FK Nullable)', 'slug (VARCHAR)', 'is_active (BOOLEAN)'],
      normalizationStage: '3NF',
      rationale: 'Isolated from the base Product table to eliminate redundant category naming repeats.',
      relationships: [
        { target: 'Product', type: '1:M', description: 'One category organizes multiple products.' },
        { target: 'Category (Self)', type: '1:M', description: 'Self-referential hierarchy for subcategories.' }
      ]
    },
    {
      id: 'brand',
      name: 'Brand',
      domain: 'catalog',
      domainLabel: 'Product & Inventory',
      pk: 'brand_id (PK)',
      fks: [],
      description: 'Manufacturer / brand entity preserving distinct maker identity and metadata.',
      attributes: ['brand_id (INT, PK)', 'brand_name (VARCHAR)', 'manufacturer_origin (VARCHAR)', 'support_contact (VARCHAR)'],
      normalizationStage: '3NF',
      rationale: 'Prevents transitive dependencies between product SKUs and corporate brand metadata.',
      relationships: [
        { target: 'Product', type: '1:M', description: 'A brand can manufacture multiple catalog products.' }
      ]
    },
    {
      id: 'product',
      name: 'Product',
      domain: 'catalog',
      domainLabel: 'Product & Inventory',
      pk: 'product_id (PK)',
      fks: ['category_id (FK -> Category)', 'brand_id (FK -> Brand)'],
      description: 'Core product catalog entity storing item attributes, SKU, base pricing, and status.',
      attributes: ['product_id (INT, PK)', 'sku (VARCHAR UNIQUE)', 'product_name (VARCHAR)', 'base_price (DECIMAL)', 'category_id (INT, FK)', 'brand_id (INT, FK)', 'created_at (TIMESTAMP)'],
      normalizationStage: '3NF',
      rationale: 'Contains only direct functional dependencies on product_id with clean external keys.',
      relationships: [
        { target: 'Category', type: 'M:1', description: 'Classified under category.' },
        { target: 'Brand', type: 'M:1', description: 'Manufactured by brand.' },
        { target: 'Inventory', type: '1:M', description: 'Stock levels tracked across warehouse inventory.' },
        { target: 'Order Items', type: '1:M', description: 'Purchased in order line items.' }
      ]
    },
    {
      id: 'inventory',
      name: 'Inventory',
      domain: 'catalog',
      domainLabel: 'Product & Inventory',
      pk: 'inventory_id (PK)',
      fks: ['product_id (FK -> Product)', 'supplier_id (FK -> Suppliers)'],
      description: 'Warehouse stock tracking tracking available quantity, reserved units, and reorder levels.',
      attributes: ['inventory_id (INT, PK)', 'product_id (INT, FK)', 'supplier_id (INT, FK)', 'quantity_on_hand (INT)', 'reorder_threshold (INT)', 'warehouse_code (VARCHAR)'],
      normalizationStage: '3NF',
      rationale: 'Separated from Product table to allow multiple stock locations and supplier replenishment.',
      relationships: [
        { target: 'Product', type: 'M:1', description: 'Associated product item.' },
        { target: 'Suppliers', type: 'M:1', description: 'Replenishing supplier vendor.' }
      ]
    },
    {
      id: 'suppliers',
      name: 'Suppliers',
      domain: 'catalog',
      domainLabel: 'Product & Inventory',
      pk: 'supplier_id (PK)',
      fks: [],
      description: 'Vendor supplier records for procurement, inventory stocking, and vendor lead times.',
      attributes: ['supplier_id (INT, PK)', 'supplier_name (VARCHAR)', 'contact_email (VARCHAR)', 'phone_number (VARCHAR)', 'tax_identifier (VARCHAR)'],
      normalizationStage: '3NF',
      rationale: 'Normalized vendor entity removing supplier contact duplication from inventory rows.',
      relationships: [
        { target: 'Inventory', type: '1:M', description: 'Supplies products to inventory warehouses.' }
      ]
    },

    // Sales, Orders & Payments Domain
    {
      id: 'orders',
      name: 'Orders',
      domain: 'orders',
      domainLabel: 'Orders & Payments',
      pk: 'order_id (PK)',
      fks: ['customer_id (FK -> Customers)'],
      description: 'Master order header recording transaction date, customer linkage, and lifecycle state.',
      attributes: ['order_id (INT, PK)', 'order_number (VARCHAR UNIQUE)', 'customer_id (INT, FK)', 'order_date (DATETIME)', 'order_status (VARCHAR)'],
      normalizationStage: '2NF',
      rationale: 'Clean header entity without repeating items or derived financial totals.',
      relationships: [
        { target: 'Customers', type: 'M:1', description: 'Customer who initiated the purchase.' },
        { target: 'Order Items', type: '1:M', description: 'Constituent line items ordered.' },
        { target: 'Order Financials', type: '1:1', description: 'Dedicated financial calculations and ledger.' },
        { target: 'Payments', type: '1:M', description: 'Payment transactions applied to this order.' },
        { target: 'Shipments', type: '1:M', description: 'Fulfillment shipments executing delivery.' }
      ]
    },
    {
      id: 'order_financials',
      name: 'Order Financials',
      domain: 'orders',
      domainLabel: 'Orders & Payments',
      pk: 'financial_id (PK)',
      fks: ['order_id (FK -> Orders UNIQUE)'],
      description: 'Isolated accounting entity tracking subtotal, tax amount, shipping fee, discount, and grand total.',
      attributes: ['financial_id (INT, PK)', 'order_id (INT, FK UNIQUE)', 'subtotal (DECIMAL)', 'discount_amount (DECIMAL)', 'tax_amount (DECIMAL)', 'shipping_fee (DECIMAL)', 'grand_total (DECIMAL)'],
      normalizationStage: '3NF',
      rationale: 'Separates mutable financial ledger calculations from structural order orchestration.',
      relationships: [
        { target: 'Orders', type: '1:1', description: 'Strict 1:1 financial audit ledger for the order header.' }
      ]
    },
    {
      id: 'order_items',
      name: 'Order Items',
      domain: 'orders',
      domainLabel: 'Orders & Payments',
      pk: 'order_item_id (PK)',
      fks: ['order_id (FK -> Orders)', 'product_id (FK -> Product)'],
      description: 'Individual line-item details capturing unit purchase price, quantity, and line discounts.',
      attributes: ['order_item_id (INT, PK)', 'order_id (INT, FK)', 'product_id (INT, FK)', 'quantity (INT)', 'unit_price_at_purchase (DECIMAL)', 'item_total (DECIMAL)'],
      normalizationStage: '2NF',
      rationale: 'Resolves composite order/product partial dependencies. Freezes price at transaction time.',
      relationships: [
        { target: 'Orders', type: 'M:1', description: 'Belongs to order header.' },
        { target: 'Product', type: 'M:1', description: 'References purchased product.' }
      ]
    },
    {
      id: 'payments',
      name: 'Payments',
      domain: 'orders',
      domainLabel: 'Orders & Payments',
      pk: 'payment_id (PK)',
      fks: ['order_id (FK -> Orders)', 'method_id (FK -> Payment Method)', 'status_id (FK -> Payment Status)'],
      description: 'Payment transaction record supporting partial payments, installment splits, or multiple cards.',
      attributes: ['payment_id (INT, PK)', 'order_id (INT, FK)', 'method_id (INT, FK)', 'status_id (INT, FK)', 'amount_paid (DECIMAL)', 'transaction_ref (VARCHAR)', 'paid_at (DATETIME)'],
      normalizationStage: '3NF',
      rationale: 'Decoupled from order header to support multi-tender, partial payments, and refunds.',
      relationships: [
        { target: 'Orders', type: 'M:1', description: 'Applied against order balance.' },
        { target: 'Payment Method', type: 'M:1', description: 'Tender type used.' },
        { target: 'Payment Status', type: 'M:1', description: 'Settlement status.' }
      ]
    },
    {
      id: 'payment_method',
      name: 'Payment Method',
      domain: 'orders',
      domainLabel: 'Orders & Payments',
      pk: 'method_id (PK)',
      fks: [],
      description: 'Lookup table of supported payment channels (Credit Card, Debit, Bank Transfer, JazzCash, EasyPaisa, COD).',
      attributes: ['method_id (INT, PK)', 'method_code (VARCHAR)', 'method_name (VARCHAR)', 'provider (VARCHAR)', 'is_active (BOOLEAN)'],
      normalizationStage: '3NF',
      rationale: 'Lookup entity avoiding redundant method string entry across transactional payment logs.',
      relationships: [
        { target: 'Payments', type: '1:M', description: 'Used by payments.' }
      ]
    },
    {
      id: 'payment_status',
      name: 'Payment Status',
      domain: 'orders',
      domainLabel: 'Orders & Payments',
      pk: 'status_id (PK)',
      fks: [],
      description: 'Lookup table for gateway lifecycle (Authorized, Captured, Failed, Refunded, Chargeback).',
      attributes: ['status_id (INT, PK)', 'status_code (VARCHAR)', 'status_label (VARCHAR)', 'is_terminal (BOOLEAN)'],
      normalizationStage: '3NF',
      rationale: 'Standardizes gateway status codes into consistent lookup entities.',
      relationships: [
        { target: 'Payments', type: '1:M', description: 'Classifies settlement states.' }
      ]
    },

    // Logistics & Shipping Domain
    {
      id: 'shipments',
      name: 'Shipments',
      domain: 'shipping',
      domainLabel: 'Logistics & Fulfillment',
      pk: 'shipment_id (PK)',
      fks: ['order_id (FK -> Orders)', 'carrier_id (FK -> Carriers)', 'service_level_id (FK -> Service Levels)', 'destination_address_id (FK -> Address)'],
      description: 'Fulfillment consignment tracking dispatch, carrier, tracking code, and delivery status.',
      attributes: ['shipment_id (INT, PK)', 'order_id (INT, FK)', 'carrier_id (INT, FK)', 'service_level_id (INT, FK)', 'destination_address_id (INT, FK)', 'tracking_number (VARCHAR)', 'shipped_at (DATETIME)', 'delivery_status (VARCHAR)'],
      normalizationStage: '3NF',
      rationale: 'Allows split-shipments from multiple warehouses with distinct tracking numbers.',
      relationships: [
        { target: 'Orders', type: 'M:1', description: 'Fulfills order consignment.' },
        { target: 'Carriers', type: 'M:1', description: 'Logistics freight provider.' },
        { target: 'Service Levels', type: 'M:1', description: 'Speed agreement (Standard, Express, Overnight).' },
        { target: 'Address', type: 'M:1', description: 'Destination physical delivery address.' }
      ]
    },
    {
      id: 'carriers',
      name: 'Carriers',
      domain: 'shipping',
      domainLabel: 'Logistics & Fulfillment',
      pk: 'carrier_id (PK)',
      fks: [],
      description: 'Logistics freight carriers and courier partners (TCS, Leopards, DHL, FedEx, Pakistan Post).',
      attributes: ['carrier_id (INT, PK)', 'carrier_code (VARCHAR)', 'carrier_name (VARCHAR)', 'tracking_portal_url (VARCHAR)', 'contact_phone (VARCHAR)'],
      normalizationStage: '3NF',
      rationale: 'Lookup entity preventing carrier names and API portals from replicating across shipments.',
      relationships: [
        { target: 'Shipments', type: '1:M', description: 'Transports shipments.' },
        { target: 'Service Levels', type: '1:M', description: 'Offers selectable service tiers.' }
      ]
    },
    {
      id: 'service_levels',
      name: 'Service Levels',
      domain: 'shipping',
      domainLabel: 'Logistics & Fulfillment',
      pk: 'service_level_id (PK)',
      fks: ['carrier_id (FK -> Carriers)'],
      description: 'Delivery speed agreements (Overnight, Standard Ground, Expedited, Same-Day).',
      attributes: ['service_level_id (INT, PK)', 'carrier_id (INT, FK)', 'level_code (VARCHAR)', 'level_name (VARCHAR)', 'estimated_delivery_days (INT)'],
      normalizationStage: '3NF',
      rationale: 'Normalizes transit SLAs and rate tiers independently of single parcel dispatches.',
      relationships: [
        { target: 'Carriers', type: 'M:1', description: 'Carrier providing this service tier.' },
        { target: 'Shipments', type: '1:M', description: 'Service level contracted for shipment.' }
      ]
    }
  ];

  // Base tables (Initial 9 tables prior to 3NF)
  const initialBaseTables = [
    { name: '1. Base Customers Table', issues: 'Contained repeating phone/emails, unnormalized addresses, embedded status strings, and postal codes that determined cities.' },
    { name: '2. Base Products Table', issues: 'Embedded brand names, brand country, parent categories, and supplier contact numbers directly in product rows (heavy transitive dependencies).' },
    { name: '3. Base Orders Table', issues: 'Combined order header, line items, item pricing, and calculated grand totals in a single table with multi-attribute repeating groups.' },
    { name: '4. Base Inventory Table', issues: 'Mixed supplier phone numbers, warehouse addresses, and product details together with quantity counts.' },
    { name: '5. Base Payments Table', issues: 'Payment methods, payment gateway codes, credit card statuses, and order totals mashed without lookup relations.' },
    { name: '6. Base Shipping Table', issues: 'Courier phone numbers, tracking URLs, service level descriptions, and destination address strings stored as raw text.' },
    { name: '7. Base Suppliers Table', issues: 'Suppliers with multi-valued catalog products and repeated address fields.' },
    { name: '8. Base Categories Table', issues: 'Lacked recursive hierarchy, causing multi-level subcategories to be stored as comma-delimited text.' },
    { name: '9. Base Locations Table', issues: 'Denormalized state, province, city, and zip tables leading to insertion and deletion anomalies.' }
  ];

  const filteredEntities = normalizedEntities.filter(entity => {
    const matchesDomain = selectedDomain === 'all' || entity.domain === selectedDomain;
    const matchesSearch = entity.name.toLowerCase().includes(entitySearch.toLowerCase()) || 
                          entity.attributes.some(a => a.toLowerCase().includes(entitySearch.toLowerCase())) ||
                          entity.pk.toLowerCase().includes(entitySearch.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  const activeEntity = normalizedEntities.find(e => e.id === activeEntityId) || normalizedEntities[0];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div 
        className="relative w-full max-w-6xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="p-5 sm:px-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-20 backdrop-blur-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                <Database className="w-3 h-3" />
                Project 04 · Academic Project
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-mono text-[10px] font-semibold">
                <GraduationCap className="w-3 h-3" />
                Semester 3 • Database Systems
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-semibold">
                <CheckCircle2 className="w-3 h-3" />
                Individual Academic Project
              </span>
            </div>
            <h2 id="case-study-title" className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              E-Commerce Database Design & Normalization
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Transforming 9 Base Tables into 19 Normalized Entities through 1NF, 2NF, & 3NF Relational Principles
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Live Demo Button */}
            <a
              href="https://e-commerce-database-design-109.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-sm hover:-translate-y-0.5"
              title="Open Live E-Commerce Database Demo (new tab)"
            >
              <span>Live App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-950/40 px-4 sm:px-8 overflow-x-auto no-scrollbar gap-1">
          {[
            { id: 'overview', label: 'Executive Overview', icon: BookOpen },
            { id: 'normalization', label: '1NF · 2NF · 3NF Journey', icon: Layers },
            { id: 'entities', label: '19 Normalized Entities', icon: Table },
            { id: 'relationships', label: 'ERD & Cardinality', icon: GitBranch },
            { id: 'integrity', label: 'Keys & Data Integrity', icon: ShieldCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-3 px-3.5 border-b-2 font-medium text-xs whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 bg-white/50 dark:bg-slate-900/50'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-500' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8 select-text">
          
          {/* ================= TAB 1: EXECUTIVE OVERVIEW ================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Highlight Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <span className="font-mono text-[10px] uppercase text-cyan-600 dark:text-cyan-400 font-bold block">
                    Normalized Entities
                  </span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">
                    19 Entities
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                    From 9 initial base tables
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <span className="font-mono text-[10px] uppercase text-indigo-600 dark:text-indigo-400 font-bold block">
                    Normalization Degree
                  </span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">
                    1NF · 2NF · 3NF
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                    Zero transitive dependencies
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <span className="font-mono text-[10px] uppercase text-emerald-600 dark:text-emerald-400 font-bold block">
                    Business Domains
                  </span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">
                    4 Core Modules
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                    Customer, Catalog, Sales, Shipping
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <span className="font-mono text-[10px] uppercase text-amber-600 dark:text-amber-400 font-bold block">
                    Referential Integrity
                  </span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">
                    100% PK / FK
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                    No orphaned records allowed
                  </span>
                </div>
              </div>

              {/* Core Project Summary */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <Boxes className="w-4 h-4 text-cyan-500" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                    Project Overview & Academic Intent
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {project.description}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Modern e-commerce architectures require robust data integrity, fast querying, and zero operational anomalies. In this Semester 3 Database Systems project, an initial un-normalized enterprise database comprising 9 flat base tables was systematically analyzed, decomposed, and remodeled into 19 distinct third-normal-form (3NF) relational entities.
                </p>
              </div>

              {/* The 4 Core Architectural Modules */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <Network className="w-4 h-4 text-cyan-500" />
                  Four Functional E-Commerce Domains
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Module 1: Customer Management */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-cyan-500" />
                        01. Customer Management & Identity
                      </span>
                      <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400">7 Entities</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Separated monolithic customer rows into dedicated entities for master profiles, multi-channel contact methods, lifecycle status lookups, chronological audit logs, physical addresses, geographic locations, and customer-to-address mappings.
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1 text-[10px] font-mono text-slate-500">
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">Customers</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">Customer Contact</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">Customer Status</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">Customer Status History</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">Address</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">Location</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">Customer Address</span>
                    </div>
                  </div>

                  {/* Module 2: Catalog & Inventory */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-indigo-500" />
                        02. Product Cataloging & Inventory
                      </span>
                      <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400">5 Entities</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Eliminated transitive brand and category metadata from individual product SKUs. Built hierarchical self-referential categories, brand registers, warehouse inventory tracking with reorder thresholds, and vendor supplier records.
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1 text-[10px] font-mono text-slate-500">
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">Category</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">Brand</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">Product</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">Inventory</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">Suppliers</span>
                    </div>
                  </div>

                  {/* Module 3: Orders & Payments */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        03. Orders & Payment Processing
                      </span>
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">6 Entities</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Decoupled order headers from line items, isolated mutable financials into a 1:1 audit ledger, and normalized multi-tender payment transactions across normalized Payment Methods and Payment Status lookups.
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1 text-[10px] font-mono text-slate-500">
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">Orders</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">Order Financials</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">Order Items</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">Payments</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">Payment Method</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">Payment Status</span>
                    </div>
                  </div>

                  {/* Module 4: Logistics & Fulfillment */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        04. Logistics, Carriers & Fulfillment
                      </span>
                      <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400">3 Entities</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Enabled multi-package dispatches and split fulfillment by establishing distinct Shipments entities linked to normalized Freight Carriers and Service Level tiers (e.g. Standard, Express, Overnight) with live tracking links.
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1 text-[10px] font-mono text-slate-500">
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">Shipments</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">Carriers</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">Service Levels</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Key Work Checklist (From Prompt) */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Key Work Completed
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {project.points.map((pt, index) => (
                    <div 
                      key={index}
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ================= TAB 2: NORMALIZATION JOURNEY ================= */}
          {activeTab === 'normalization' && (
            <div className="space-y-6">
              
              <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 space-y-1.5">
                <span className="font-mono text-[10px] text-cyan-600 dark:text-cyan-400 uppercase font-semibold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  Relational Decomposition: 1NF → 2NF → 3NF
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Normalization is the formal process of structuring a relational database to reduce data redundancy and improve data integrity. Explore the specific stages applied to convert 9 flat base tables into 19 normalized 3NF entities.
                </p>
              </div>

              {/* Normalization Stages Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* 1NF Card */}
                <div 
                  onClick={() => setSelectedNormalizationStage('1nf')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedNormalizationStage === '1nf'
                      ? 'border-cyan-500 bg-cyan-500/5 dark:bg-cyan-500/10 ring-1 ring-cyan-500'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400">STAGE 01</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">Atomic Values</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">1NF · First Normal Form</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    Eliminated repeating groups, arrays, and multi-valued fields. Guaranteed atomic columns and unique primary keys.
                  </p>
                </div>

                {/* 2NF Card */}
                <div 
                  onClick={() => setSelectedNormalizationStage('2nf')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedNormalizationStage === '2nf'
                      ? 'border-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/10 ring-1 ring-indigo-500'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">STAGE 02</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">Full Key Dependency</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">2NF · Second Normal Form</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    Eliminated partial dependencies on composite keys. All non-key attributes are fully functionally dependent on the whole key.
                  </p>
                </div>

                {/* 3NF Card */}
                <div 
                  onClick={() => setSelectedNormalizationStage('3nf')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedNormalizationStage === '3nf'
                      ? 'border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10 ring-1 ring-emerald-500'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">STAGE 03</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">Transitive Freedom</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">3NF · Third Normal Form</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    Eliminated transitive dependencies (non-key determining non-key). Lookup tables and isolated financial ledgers created.
                  </p>
                </div>

              </div>

              {/* Stage Specific Deep-Dive Comparison */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-4">
                
                {selectedNormalizationStage === '1nf' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase">
                        First Normal Form (1NF) Resolution
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 space-y-2">
                        <span className="font-mono text-[10px] font-bold text-red-600 dark:text-red-400 uppercase block">
                          Before 1NF: Repeating Groups & Multi-Valued Attributes
                        </span>
                        <p className="text-slate-600 dark:text-slate-400">
                          Initial customer records stored multiple phone numbers and email addresses in single delimited strings (e.g. <code className="text-red-500 font-mono">"0300-1234567, 0321-7654321"</code>). Similarly, order tables held item arrays in un-atomic rows.
                        </p>
                        <div className="font-mono text-[10px] p-2 rounded bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300">
                          ❌ Violation: Non-atomic columns prevent indexing, filtering, and constraint enforcement.
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                        <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase block">
                          After 1NF: Atomic Decomposition & Dedicated Entities
                        </span>
                        <p className="text-slate-600 dark:text-slate-400">
                          Extracted repeating contact channels into a dedicated <strong className="text-slate-900 dark:text-white">Customer Contact</strong> entity with individual contact rows, contact types, and primary flags. Extracted order line items into <strong className="text-slate-900 dark:text-white">Order Items</strong>.
                        </p>
                        <div className="font-mono text-[10px] p-2 rounded bg-slate-100 dark:bg-slate-900 text-emerald-600 dark:text-emerald-400">
                          ✓ 1NF Conformance: Every field contains atomic, single-valued attributes with unique Primary Keys.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedNormalizationStage === '2nf' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                        Second Normal Form (2NF) Resolution
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 space-y-2">
                        <span className="font-mono text-[10px] font-bold text-red-600 dark:text-red-400 uppercase block">
                          Before 2NF: Partial Functional Dependencies
                        </span>
                        <p className="text-slate-600 dark:text-slate-400">
                          In composite key tables like <code className="text-red-500 font-mono">(order_id, product_id)</code>, attributes like <code className="text-slate-700 dark:text-slate-300 font-mono">product_name</code> or <code className="text-slate-700 dark:text-slate-300 font-mono">unit_base_price</code> depended only on <code className="text-slate-700 dark:text-slate-300 font-mono">product_id</code>, NOT the full composite key.
                        </p>
                        <div className="font-mono text-[10px] p-2 rounded bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300">
                          ❌ Violation: Product descriptions replicated across every order item row in history.
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                        <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase block">
                          After 2NF: Full Functional Dependency Isolation
                        </span>
                        <p className="text-slate-600 dark:text-slate-400">
                          Separated <strong className="text-slate-900 dark:text-white">Product</strong> into its own master entity. <strong className="text-slate-900 dark:text-white">Order Items</strong> now contains only attributes strictly dependent on the purchase transaction: <code className="font-mono">quantity</code>, <code className="font-mono">unit_price_at_purchase</code>, and <code className="font-mono">item_total</code>.
                        </p>
                        <div className="font-mono text-[10px] p-2 rounded bg-slate-100 dark:bg-slate-900 text-emerald-600 dark:text-emerald-400">
                          ✓ 2NF Conformance: In 1NF and no non-key attribute is partially dependent on any candidate key.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedNormalizationStage === '3nf' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                        Third Normal Form (3NF) Resolution
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 space-y-2">
                        <span className="font-mono text-[10px] font-bold text-red-600 dark:text-red-400 uppercase block">
                          Before 3NF: Transitive Dependencies (A → B → C)
                        </span>
                        <p className="text-slate-600 dark:text-slate-400">
                          In Address tables: <code className="text-red-500 font-mono">address_id → postal_code → city → state → country</code>. In Product tables: <code className="text-red-500 font-mono">product_id → brand_id → brand_origin</code>. Non-key attributes determined other non-key attributes!
                        </p>
                        <div className="font-mono text-[10px] p-2 rounded bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300">
                          ❌ Violation: Deleting the last customer in a city would unintentionally delete that city from the system (Deletion Anomaly).
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                        <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase block">
                          After 3NF: Transitive Elimination via Dedicated Relational Lookups
                        </span>
                        <p className="text-slate-600 dark:text-slate-400">
                          Created dedicated lookup entities: <strong className="text-slate-900 dark:text-white">Location</strong>, <strong className="text-slate-900 dark:text-white">Brand</strong>, <strong className="text-slate-900 dark:text-white">Category</strong>, <strong className="text-slate-900 dark:text-white">Payment Method</strong>, <strong className="text-slate-900 dark:text-white">Payment Status</strong>, <strong className="text-slate-900 dark:text-white">Carriers</strong>, and <strong className="text-slate-900 dark:text-white">Service Levels</strong>.
                        </p>
                        <div className="font-mono text-[10px] p-2 rounded bg-slate-100 dark:bg-slate-900 text-emerald-600 dark:text-emerald-400">
                          ✓ 3NF Conformance: In 2NF and every non-key attribute depends only on the primary key, directly and non-transitively.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Transformation Review: 9 Base Tables to 19 Entities */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <ListOrdered className="w-4 h-4 text-cyan-500" />
                  Initial 9 Base Tables vs Normalized Outcomes
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {initialBaseTables.map((tbl, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-1.5"
                    >
                      <span className="font-bold text-slate-900 dark:text-white font-mono text-[11px] block">
                        {tbl.name}
                      </span>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                        {tbl.issues}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ================= TAB 3: 19 NORMALIZED ENTITIES ================= */}
          {activeTab === 'entities' && (
            <div className="space-y-6">
              
              {/* Filter and Search Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                
                {/* Domain Pill Filter */}
                <div className="flex flex-wrap gap-1">
                  {[
                    { id: 'all', label: 'All 19 Entities' },
                    { id: 'customer', label: 'Customer (7)' },
                    { id: 'catalog', label: 'Product & Inventory (5)' },
                    { id: 'orders', label: 'Orders & Payments (6)' },
                    { id: 'shipping', label: 'Logistics (3)' }
                  ].map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setSelectedDomain(d.id as any)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                        selectedDomain === d.id
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>

                {/* Search Input */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search entities or attributes..."
                    value={entitySearch}
                    onChange={(e) => setEntitySearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                  />
                </div>

              </div>

              {/* Master-Detail Layout: Entities List and Detailed Inspector */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Entities List (5 Cols) */}
                <div className="lg:col-span-5 space-y-2 max-h-[500px] overflow-y-auto pr-1">
                  {filteredEntities.map((ent) => {
                    const isSelected = ent.id === activeEntity.id;
                    return (
                      <div
                        key={ent.id}
                        onClick={() => setActiveEntityId(ent.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-cyan-500 bg-cyan-500/10 dark:bg-cyan-500/15 ring-1 ring-cyan-500'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                            <Table className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-500' : 'text-slate-400'}`} />
                            {ent.name}
                          </span>
                          <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                            {ent.normalizationStage}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-cyan-600 dark:text-cyan-400 block mt-1">
                          PK: {ent.pk}
                        </span>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {ent.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Entity Schema Inspector (7 Cols) */}
                <div className="lg:col-span-7 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-4">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div>
                      <span className="font-mono text-[10px] text-cyan-600 dark:text-cyan-400 uppercase font-bold tracking-wider">
                        {activeEntity.domainLabel}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{activeEntity.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                          {activeEntity.normalizationStage} Compliant
                        </span>
                      </h3>
                    </div>

                    <div className="font-mono text-xs text-slate-500">
                      Entity ID: <code className="text-slate-900 dark:text-white">{activeEntity.id}</code>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activeEntity.description}
                  </p>

                  {/* Attributes Table */}
                  <div className="space-y-1.5">
                    <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Schema Attributes & Constraints:
                    </span>
                    <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 text-[10px]">
                          <tr>
                            <th className="py-2 px-3">Attribute Name</th>
                            <th className="py-2 px-3">Key Type</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[11px]">
                          {activeEntity.attributes.map((attr, idx) => {
                            const isPK = attr.includes('PK');
                            const isFK = attr.includes('FK');
                            return (
                              <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                                <td className="py-2 px-3 text-slate-800 dark:text-slate-200">
                                  {attr}
                                </td>
                                <td className="py-2 px-3">
                                  {isPK && (
                                    <span className="inline-flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                                      <Key className="w-3 h-3" /> PRIMARY KEY
                                    </span>
                                  )}
                                  {isFK && (
                                    <span className="inline-flex items-center gap-1 text-[10px] text-cyan-600 dark:text-cyan-400 font-bold">
                                      <GitBranch className="w-3 h-3" /> FOREIGN KEY
                                    </span>
                                  )}
                                  {!isPK && !isFK && (
                                    <span className="text-[10px] text-slate-400">Regular Attribute</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Normalization Rationale */}
                  <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block">
                      Normalization Rationale:
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                      {activeEntity.rationale}
                    </p>
                  </div>

                  {/* Relational Cardinality Connections */}
                  <div className="space-y-1.5">
                    <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Linked Relationships & Cardinality:
                    </span>
                    <div className="space-y-1.5">
                      {activeEntity.relationships.map((rel, i) => (
                        <div key={i} className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 flex items-start justify-between gap-2 text-xs">
                          <div className="space-y-0.5">
                            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                              <span>→ {rel.target}</span>
                            </span>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                              {rel.description}
                            </p>
                          </div>
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold shrink-0">
                            {rel.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ================= TAB 4: ERD & CARDINALITY ================= */}
          {activeTab === 'relationships' && (
            <div className="space-y-6">
              
              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-1.5">
                <span className="font-mono text-[10px] text-indigo-600 dark:text-indigo-400 uppercase font-semibold flex items-center gap-1.5">
                  <GitBranch className="w-3.5 h-3.5" />
                  Entity-Relationship Modeling & Cardinality Mapping
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Defined logical cardinalities across customer accounts, order transactions, payment settlements, and fulfillment dispatches to guarantee referential integrity and data consistency.
                </p>
              </div>

              {/* Cardinality Matrix Breakdown */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <Network className="w-4 h-4 text-cyan-500" />
                  Core Cardinality Rules
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">Customers ↔ Orders</span>
                      <span className="font-mono text-xs text-cyan-600 dark:text-cyan-400 font-bold">1 : M (One-to-Many)</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      A single registered customer can place zero or multiple orders over time. Each order record must belong to exactly one customer foreign key (<code className="font-mono">customer_id</code>).
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">Orders ↔ Order Financials</span>
                      <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">1 : 1 (One-to-One)</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      Every order header maps to exactly one dedicated financial calculations ledger via a UNIQUE foreign key (<code className="font-mono">order_id</code>), cleanly isolating accounting figures.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">Orders ↔ Order Items</span>
                      <span className="font-mono text-xs text-cyan-600 dark:text-cyan-400 font-bold">1 : M (One-to-Many)</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      An order consists of one or many item lines. Each item line records the purchased quantity and locks the historical price at purchase time to protect against subsequent catalog price edits.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">Customers ↔ Address (via Customer Address)</span>
                      <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-bold">M : M (Many-to-Many)</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      Resolved through the <strong className="text-slate-900 dark:text-white">Customer Address</strong> bridge entity. A customer can maintain multiple shipping and billing addresses, and addresses can be shared across family accounts.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">Orders ↔ Payments</span>
                      <span className="font-mono text-xs text-cyan-600 dark:text-cyan-400 font-bold">1 : M (One-to-Many)</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      Enables multi-tender transactions, gift-card splits, partial installment payments, and subsequent refund allocations against an order without corrupting order header status.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">Shipments ↔ Carriers & Service Levels</span>
                      <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold">M : 1 (Many-to-One)</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      Shipment dispatches link to freight providers (TCS, DHL, FedEx) and predefined Service Level agreements (Next-Day, Ground), allowing split-warehouse fulfillments for single orders.
                    </p>
                  </div>

                </div>
              </div>

              {/* Visual Schema Flow Map */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-4">
                <span className="font-mono text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                  Interactive Relational Flow Overview
                </span>

                <div className="space-y-3 font-mono text-xs">
                  
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold">Customers</span>
                      <span className="text-slate-400">1 ──── M</span>
                      <span className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold">Orders</span>
                    </div>
                    <span className="text-[11px] text-slate-500">Foreign Key: orders.customer_id → customers.customer_id</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold">Orders</span>
                      <span className="text-slate-400">1 ──── 1</span>
                      <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">Order Financials</span>
                    </div>
                    <span className="text-[11px] text-slate-500">Foreign Key (UNIQUE): order_financials.order_id → orders.order_id</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold">Orders</span>
                      <span className="text-slate-400">1 ──── M</span>
                      <span className="px-2 py-1 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold">Order Items</span>
                      <span className="text-slate-400">M ──── 1</span>
                      <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">Product</span>
                    </div>
                    <span className="text-[11px] text-slate-500">Junction line items bridging order headers to catalog items</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold">Orders</span>
                      <span className="text-slate-400">1 ──── M</span>
                      <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">Payments</span>
                      <span className="text-slate-400">M ──── 1</span>
                      <span className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Payment Method</span>
                    </div>
                    <span className="text-[11px] text-slate-500">Multi-tender payments linked to standardized payment lookup methods</span>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* ================= TAB 5: KEYS & DATA INTEGRITY ================= */}
          {activeTab === 'integrity' && (
            <div className="space-y-6">
              
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
                <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Referential Integrity & Anomaly Mitigation
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Review how 3NF normalization eliminates the classic relational database anomalies (Insertion, Update, and Deletion) while enforcing strict referential integrity rules.
                </p>
              </div>

              {/* Relational Anomalies Solved */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Three Classic Relational Anomalies Mitigated
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 space-y-2">
                    <span className="font-mono text-[10px] uppercase font-bold text-cyan-600 dark:text-cyan-400 block">
                      1. Insertion Anomaly
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-white">Independent Entity Creation</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      In un-normalized schemas, a new Product could not be added unless an active Order or Supplier was already recorded. In this 3NF design, Categories, Brands, Products, and Suppliers exist independently.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 space-y-2">
                    <span className="font-mono text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 block">
                      2. Update Anomaly
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-white">Single-Row Consistency</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      If a Brand name or Courier tracking portal URL changes, it is updated in exactly one row in the lookup table, immediately propagating across thousands of related products or shipments without inconsistency.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 space-y-2">
                    <span className="font-mono text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">
                      3. Deletion Anomaly
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-white">Preserved Master Data</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      Deleting an obsolete order or cancelled shipment does not inadvertently delete the underlying customer, product catalog SKU, or carrier definition from the database.
                    </p>
                  </div>

                </div>
              </div>

              {/* DDL Schema Implementation Snippet */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-cyan-500" />
                    Sample DDL Implementation Snippet (SQL)
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">PostgreSQL / MySQL Compatible</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto space-y-2">
                  <pre className="text-cyan-400">{"-- 1. Master Customers Entity with Foreign Key Status"}</pre>
                  <pre className="text-slate-300">{`CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    registration_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status_id INT NOT NULL,
    CONSTRAINT fk_customer_status FOREIGN KEY (status_id) 
        REFERENCES customer_status(status_id)
);`}</pre>

                  <pre className="text-cyan-400 pt-2">{"-- 2. 1:1 Isolated Order Financials Table"}</pre>
                  <pre className="text-slate-300">{`CREATE TABLE order_financials (
    financial_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL UNIQUE,
    subtotal DECIMAL(10,2) NOT NULL,
    discount_amount DECIMAL(10,2) DEFAULT 0.00,
    tax_amount DECIMAL(10,2) NOT NULL,
    shipping_fee DECIMAL(10,2) DEFAULT 0.00,
    grand_total DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_financials_order FOREIGN KEY (order_id) 
        REFERENCES orders(order_id) ON DELETE RESTRICT
);`}</pre>

                  <pre className="text-cyan-400 pt-2">{"-- 3. Composite Order Items with Historical Price Freeze"}</pre>
                  <pre className="text-slate-300">{`CREATE TABLE order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price_at_purchase DECIMAL(10,2) NOT NULL,
    item_total DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_item_order FOREIGN KEY (order_id) REFERENCES orders(order_id),
    CONSTRAINT fk_item_product FOREIGN KEY (product_id) REFERENCES product(product_id)
);`}</pre>
                </div>
              </div>

              {/* Academic Context Reflection */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-cyan-500" />
                  <span className="font-mono text-xs font-bold text-slate-900 dark:text-white uppercase">
                    Academic Coursework Reflection
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {project.businessAnalyticsPerspective || "Designed and normalized a relational database for a comprehensive e-commerce system covering customer management, product cataloging, inventory, orders, payments, and shipment logistics. Demonstrates mastery of database architecture, relational normal forms, cardinality rules, and referential constraints."}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-mono text-slate-700 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 sm:px-8 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>19 Entities Fully Normalized to 3NF</span>
            <span>·</span>
            <span>COMSATS University Islamabad (Semester 3)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Close Case Study
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
