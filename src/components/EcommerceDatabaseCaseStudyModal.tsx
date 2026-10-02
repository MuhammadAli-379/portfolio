import React, { useState, useEffect } from 'react';
import {
  Database,
  Layers,
  GitBranch,
  Table,
  Key,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  Search,
  Code2,
  Boxes,
  Network,
  ListOrdered,
} from 'lucide-react';
import { AcademicProject } from '../types/portfolio';
import { CaseStudyModalShell } from './CaseStudyModalShell';

interface EcommerceDatabaseCaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: AcademicProject;
  initialTab?: 'overview' | 'normalization' | 'entities' | 'relationships' | 'integrity';
}

const LIVE_DEMO_URL = 'https://e-commerce-database-design-109.vercel.app/';

export const EcommerceDatabaseCaseStudyModal: React.FC<EcommerceDatabaseCaseStudyModalProps> = ({
  isOpen,
  onClose,
  project,
  initialTab = 'overview',
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
        { target: 'Orders', type: '1:M', description: 'One customer can place multiple e-commerce orders.' },
      ],
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
        { target: 'Customers', type: 'M:1', description: 'Belongs to a specific Customer record.' },
      ],
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
        { target: 'Customer Status History', type: '1:M', description: 'Logged in status history transitions.' },
      ],
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
        { target: 'Customer Status', type: 'M:1', description: 'References the logged status state.' },
      ],
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
        { target: 'Shipments', type: '1:M', description: 'Destination address for parcel shipments.' },
      ],
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
        { target: 'Address', type: '1:M', description: 'Provides regional classification for multiple addresses.' },
      ],
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
        { target: 'Address', type: 'M:1', description: 'Links to normalized physical address.' },
      ],
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
        { target: 'Category (Self)', type: '1:M', description: 'Self-referential hierarchy for subcategories.' },
      ],
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
        { target: 'Product', type: '1:M', description: 'A brand can manufacture multiple catalog products.' },
      ],
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
        { target: 'Order Items', type: '1:M', description: 'Purchased in order line items.' },
      ],
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
        { target: 'Suppliers', type: 'M:1', description: 'Replenishing supplier vendor.' },
      ],
    },
    {
      id: 'suppliers',
      name: 'Suppliers',
      domain: 'catalog',
      domainLabel: 'Product & Inventory',
      pk: 'supplier_id (PK)',
      fks: [],
      description: 'Vendor supplier records managing stock acquisition sources, business licensing, and contacts.',
      attributes: ['supplier_id (INT, PK)', 'supplier_name (VARCHAR)', 'contact_person (VARCHAR)', 'contact_email (VARCHAR)', 'country (VARCHAR)'],
      normalizationStage: '3NF',
      rationale: 'Removes supplier names and addresses from repeating across warehouse inventory lots.',
      relationships: [
        { target: 'Inventory', type: '1:M', description: 'Supplies products to inventory lots.' },
      ],
    },

    // Orders & Sales Domain
    {
      id: 'orders',
      name: 'Orders',
      domain: 'orders',
      domainLabel: 'Orders & Payments',
      pk: 'order_id (PK)',
      fks: ['customer_id (FK -> Customers)'],
      description: 'Header sales order capturing transaction timestamp, operational order status, and customer link.',
      attributes: ['order_id (INT, PK)', 'customer_id (INT, FK)', 'order_date (DATETIME)', 'order_status (VARCHAR)'],
      normalizationStage: '3NF',
      rationale: 'Pure transaction header decoupled from pricing calculations and physical line items.',
      relationships: [
        { target: 'Customers', type: 'M:1', description: 'Placed by customer.' },
        { target: 'Order Financials', type: '1:1', description: 'Associated with dedicated order financials ledger.' },
        { target: 'Order Items', type: '1:M', description: 'Contains multiple purchased product lines.' },
        { target: 'Payments', type: '1:M', description: 'Settled via one or more payment records.' },
        { target: 'Shipments', type: '1:M', description: 'Dispatched in one or more shipments.' },
      ],
    },
    {
      id: 'order_financials',
      name: 'Order Financials',
      domain: 'orders',
      domainLabel: 'Orders & Payments',
      pk: 'financial_id (PK)',
      fks: ['order_id (FK -> Orders, UNIQUE)'],
      description: '1:1 audit ledger calculating subtotals, tax sums, discounts, shipping fees, and grand totals.',
      attributes: ['financial_id (INT, PK)', 'order_id (INT, FK UNIQUE)', 'subtotal (DECIMAL)', 'discount_amount (DECIMAL)', 'tax_amount (DECIMAL)', 'shipping_fee (DECIMAL)', 'grand_total (DECIMAL)'],
      normalizationStage: '3NF',
      rationale: 'Separated from Orders table to isolate calculated monetary ledgers from transactional lifecycle states.',
      relationships: [
        { target: 'Orders', type: '1:1', description: 'Calculates financial ledger for order.' },
      ],
    },
    {
      id: 'order_items',
      name: 'Order Items',
      domain: 'orders',
      domainLabel: 'Orders & Payments',
      pk: 'order_item_id (PK)',
      fks: ['order_id (FK -> Orders)', 'product_id (FK -> Product)'],
      description: 'Transaction line items capturing selected SKU, purchased quantity, and frozen purchase price.',
      attributes: ['order_item_id (INT, PK)', 'order_id (INT, FK)', 'product_id (INT, FK)', 'quantity (INT)', 'unit_price_at_purchase (DECIMAL)', 'item_total (DECIMAL)'],
      normalizationStage: '2NF/3NF',
      rationale: 'Historical purchase price is frozen per transaction, decoupling from future catalog changes.',
      relationships: [
        { target: 'Orders', type: 'M:1', description: 'Belongs to order.' },
        { target: 'Product', type: 'M:1', description: 'References purchased product.' },
      ],
    },
    {
      id: 'payments',
      name: 'Payments',
      domain: 'orders',
      domainLabel: 'Orders & Payments',
      pk: 'payment_id (PK)',
      fks: ['order_id (FK -> Orders)', 'method_id (FK -> Payment Method)', 'status_id (FK -> Payment Status)'],
      description: 'Settlement transaction supporting multi-tender splits, partial installments, and refund links.',
      attributes: ['payment_id (INT, PK)', 'order_id (INT, FK)', 'method_id (INT, FK)', 'status_id (INT, FK)', 'amount_paid (DECIMAL)', 'gateway_transaction_id (VARCHAR)', 'paid_at (DATETIME)'],
      normalizationStage: '3NF',
      rationale: 'Allows multiple payments or split tenders against a single order without modifying order rows.',
      relationships: [
        { target: 'Orders', type: 'M:1', description: 'Settles balance for order.' },
        { target: 'Payment Method', type: 'M:1', description: 'Processed via method.' },
        { target: 'Payment Status', type: 'M:1', description: 'Classified by status.' },
      ],
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
        { target: 'Payments', type: '1:M', description: 'Used by payments.' },
      ],
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
        { target: 'Payments', type: '1:M', description: 'Classifies settlement states.' },
      ],
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
        { target: 'Address', type: 'M:1', description: 'Destination physical delivery address.' },
      ],
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
        { target: 'Service Levels', type: '1:M', description: 'Offers selectable service tiers.' },
      ],
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
        { target: 'Shipments', type: '1:M', description: 'Service level contracted for shipment.' },
      ],
    },
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
    { name: '9. Base Locations Table', issues: 'Denormalized state, province, city, and zip tables leading to insertion and deletion anomalies.' },
  ];

  const filteredEntities = normalizedEntities.filter((entity) => {
    const matchesDomain = selectedDomain === 'all' || entity.domain === selectedDomain;
    const matchesSearch =
      entity.name.toLowerCase().includes(entitySearch.toLowerCase()) ||
      entity.attributes.some((a) => a.toLowerCase().includes(entitySearch.toLowerCase())) ||
      entity.pk.toLowerCase().includes(entitySearch.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  const activeEntity = normalizedEntities.find((e) => e.id === activeEntityId) || normalizedEntities[0];

  const tabs = [
    { id: 'overview', label: 'Executive Overview' },
    { id: 'normalization', label: '1NF · 2NF · 3NF Journey' },
    { id: 'entities', label: '19 Normalized Entities' },
    { id: 'relationships', label: 'ERD & Cardinality' },
    { id: 'integrity', label: 'Keys & Data Integrity' },
  ];

  return (
    <CaseStudyModalShell
      isOpen={isOpen}
      onClose={onClose}
      projectNumber="04"
      category="Database Systems"
      title={project.title}
      subtitle={project.semesterTag || 'Semester 3 • Individual Project'}
      metadataText="Relational Schema Normalization • 9 Base Tables Decomposed to 19 3NF Entities"
      liveDemoUrl={LIVE_DEMO_URL}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(tabId) => setActiveTab(tabId as any)}
    >
      {/* ================= TAB 1: EXECUTIVE OVERVIEW ================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Highlight Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50">
              <span className="font-mono text-[10px] uppercase text-[var(--theme-accent)] font-bold block">
                Normalized Entities
              </span>
              <span className="text-2xl font-bold font-mono text-[var(--theme-text)] mt-1 block tabular-nums">
                19 Entities
              </span>
              <span className="text-[11px] font-mono text-[var(--theme-text-muted)] block mt-0.5">
                From 9 initial base tables
              </span>
            </div>

            <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50">
              <span className="font-mono text-[10px] uppercase text-[var(--theme-accent)] font-bold block">
                Normalization Degree
              </span>
              <span className="text-2xl font-bold font-mono text-[var(--theme-text)] mt-1 block">
                1NF · 2NF · 3NF
              </span>
              <span className="text-[11px] font-mono text-[var(--theme-text-muted)] block mt-0.5">
                Zero transitive dependencies
              </span>
            </div>

            <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50">
              <span className="font-mono text-[10px] uppercase text-[var(--theme-accent)] font-bold block">
                Business Domains
              </span>
              <span className="text-2xl font-bold font-mono text-[var(--theme-text)] mt-1 block">
                4 Core Modules
              </span>
              <span className="text-[11px] font-mono text-[var(--theme-text-muted)] block mt-0.5">
                Customer, Catalog, Sales, Shipping
              </span>
            </div>

            <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50">
              <span className="font-mono text-[10px] uppercase text-[var(--theme-accent)] font-bold block">
                Referential Integrity
              </span>
              <span className="text-2xl font-bold font-mono text-[var(--theme-text)] mt-1 block">
                100% PK / FK
              </span>
              <span className="text-[11px] font-mono text-[var(--theme-text-muted)] block mt-0.5">
                No orphaned records allowed
              </span>
            </div>
          </div>

          {/* Core Project Summary */}
          <div className="p-5 sm:p-6 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] space-y-3 shadow-none">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--theme-accent)]">
              <Boxes className="h-3.5 w-3.5 text-[var(--theme-accent)]" aria-hidden="true" />
              <span>Relational Architecture</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-normal tracking-tight text-[var(--theme-text)]">
              Project Overview &amp; Relational Architecture
            </h3>
            <p className="max-w-[70ch] font-body text-[16px] sm:text-[17px] leading-relaxed text-[var(--theme-text)]/90">
              {project.description}
            </p>
            <p className="max-w-[70ch] font-body text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
              Modern e-commerce architectures require robust data integrity, fast querying, and zero operational anomalies. In this Semester 3 Database Systems project, an initial un-normalized enterprise database comprising 9 flat base tables was systematically analyzed, decomposed, and remodeled into 19 distinct third-normal-form (3NF) relational entities.
            </p>
          </div>

          {/* The 4 Core Architectural Modules */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--theme-accent)]">
              <Network className="h-3.5 w-3.5 text-[var(--theme-accent)]" aria-hidden="true" />
              <span>Domain Partitioning</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-normal tracking-tight text-[var(--theme-text)]">
              Four Functional E-Commerce Domains
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Module 1: Customer Management */}
              <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--theme-text)] flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[var(--theme-accent)]" aria-hidden="true" />
                    01. Customer Management &amp; Identity
                  </span>
                  <span className="font-mono text-[10px] text-[var(--theme-accent)] font-semibold">7 Entities</span>
                </div>
                <p className="font-body text-xs text-[var(--theme-text-secondary)] leading-relaxed">
                  Separated monolithic customer rows into dedicated entities for master profiles, multi-channel contact methods, lifecycle status lookups, chronological audit logs, physical addresses, geographic locations, and customer-to-address mappings.
                </p>
                <div className="flex flex-wrap gap-1 pt-1 font-mono text-[10px] text-[var(--theme-text-muted)]">
                  <span className="px-1.5 py-0.5 rounded border border-[var(--theme-border)] bg-[var(--theme-surface)]">Customers</span>
                  <span className="px-1.5 py-0.5 rounded border border-[var(--theme-border)] bg-[var(--theme-surface)]">Customer Contact</span>
                  <span className="px-1.5 py-0.5 rounded border border-[var(--theme-border)] bg-[var(--theme-surface)]">Customer Status</span>
                  <span className="px-1.5 py-0.5 rounded border border-[var(--theme-border)] bg-[var(--theme-surface)]">Customer Status History</span>
                  <span className="px-1.5 py-0.5 rounded border border-[var(--theme-border)] bg-[var(--theme-surface)]">Address</span>
                  <span className="px-1.5 py-0.5 rounded border border-[var(--theme-border)] bg-[var(--theme-surface)]">Location</span>
                  <span className="px-1.5 py-0.5 rounded border border-[var(--theme-border)] bg-[var(--theme-surface)]">Customer Address</span>
                </div>
              </div>

              {/* Module 2: Catalog & Inventory */}
              <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--theme-text)] flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[var(--theme-accent)]" aria-hidden="true" />
                    02. Product Cataloging &amp; Inventory
                  </span>
                  <span className="font-mono text-[10px] text-[var(--theme-accent)] font-semibold">5 Entities</span>
                </div>
                <p className="font-body text-xs text-[var(--theme-text-secondary)] leading-relaxed">
                  Eliminated transitive brand and category metadata from individual product SKUs. Built hierarchical self-referential categories, brand registers, warehouse inventory tracking with reorder thresholds, and vendor supplier records.
                </p>
                <div className="flex flex-wrap gap-1 pt-1 font-mono text-[10px] text-[var(--theme-text-muted)]">
                  <span className="px-1.5 py-0.5 rounded border border-[var(--theme-border)] bg-[var(--theme-surface)]">Category</span>
                  <span className="px-1.5 py-0.5 rounded border border-[var(--theme-border)] bg-[var(--theme-surface)]">Brand</span>
                  <span className="px-1.5 py-0.5 rounded border border-[var(--theme-border)] bg-[var(--theme-surface)]">Product</span>
                  <span className="px-1.5 py-0.5 rounded border border-[var(--theme-border)] bg-[var(--theme-surface)]">Inventory</span>
                  <span className="px-1.5 py-0.5 rounded border border-[var(--theme-border)] bg-[var(--theme-surface)]">Suppliers</span>
                </div>
              </div>

              {/* Module 3: Orders & Payments */}
              <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--theme-text)] flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[var(--theme-accent)]" aria-hidden="true" />
                    03. Orders &amp; Payment Processing
                  </span>
                  <span className="font-mono text-[10px] text-[var(--theme-accent)] font-semibold">6 Entities</span>
                </div>
                <p className="font-body text-xs text-[var(--theme-text-secondary)] leading-relaxed">
                  Decoupled order headers from line items, isolated mutable financials into a 1:1 audit ledger, and normalized multi-tender payment transactions across normalized Payment Methods and Payment Status lookups.
                </p>
                <div className="flex flex-wrap gap-1 pt-1 font-mono text-[10px] text-[var(--theme-text-muted)]">
                  <span className="px-1.5 py-0.5 rounded border border-[var(--theme-border)] bg-[var(--theme-surface)]">Orders</span>
                  <span className="px-1.5 py-0.5 rounded border border-[var(--theme-border)] bg-[var(--theme-surface)]">Order Financials</span>
                  <span className="px-1.5 py-0.5 rounded border border-[var(--theme-border)] bg-[var(--theme-surface)]">Order Items</span>
                  <span className="px-1.5 py-0.5 rounded border border-[var(--theme-border)] bg-[var(--theme-surface)]">Payments</span>
                  <span className="px-1.5 py-0.5 rounded border border-[var(--theme-border)] bg-[var(--theme-surface)]">Payment Method</span>
                  <span className="px-1.5 py-0.5 rounded border border-[var(--theme-border)] bg-[var(--theme-surface)]">Payment Status</span>
                </div>
              </div>

              {/* Module 4: Logistics & Fulfillment */}
              <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--theme-text)] flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[var(--theme-accent)]" aria-hidden="true" />
                    04. Logistics, Carriers &amp; Fulfillment
                  </span>
                  <span className="font-mono text-[10px] text-[var(--theme-accent)] font-semibold">3 Entities</span>
                </div>
                <p className="font-body text-xs text-[var(--theme-text-secondary)] leading-relaxed">
                  Enabled multi-package dispatches and split fulfillment by establishing distinct Shipments entities linked to normalized Freight Carriers and Service Level tiers (e.g. Standard, Express, Overnight) with live tracking links.
                </p>
                <div className="flex flex-wrap gap-1 pt-1 font-mono text-[10px] text-[var(--theme-text-muted)]">
                  <span className="px-1.5 py-0.5 rounded border border-[var(--theme-border)] bg-[var(--theme-surface)]">Shipments</span>
                  <span className="px-1.5 py-0.5 rounded border border-[var(--theme-border)] bg-[var(--theme-surface)]">Carriers</span>
                  <span className="px-1.5 py-0.5 rounded border border-[var(--theme-border)] bg-[var(--theme-surface)]">Service Levels</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Work Checklist */}
          <div className="space-y-3">
            <h3 className="font-display text-base font-normal text-[var(--theme-text)] flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[var(--theme-accent)]" aria-hidden="true" />
              Key Work Completed
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {project.points.map((pt, index) => (
                <div
                  key={index}
                  className="p-3.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] flex items-start gap-2.5"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-[var(--theme-accent)] shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="font-body text-xs leading-relaxed text-[var(--theme-text)]/90">{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: NORMALIZATION JOURNEY ================= */}
      {activeTab === 'normalization' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl border border-[var(--theme-accent)]/20 bg-[var(--theme-accent)]/5 space-y-1.5">
            <span className="font-mono text-xs text-[var(--theme-accent)] uppercase font-semibold flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5" aria-hidden="true" />
              Relational Decomposition: 1NF → 2NF → 3NF
            </span>
            <p className="max-w-[70ch] font-body text-xs sm:text-sm text-[var(--theme-text)]/90 leading-relaxed">
              Normalization is the formal process of structuring a relational database to reduce data redundancy and improve data integrity. Explore the specific stages applied to convert 9 flat base tables into 19 normalized 3NF entities.
            </p>
          </div>

          {/* Normalization Stages Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* 1NF Card */}
            <button
              type="button"
              onClick={() => setSelectedNormalizationStage('1nf')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                selectedNormalizationStage === '1nf'
                  ? 'border-[var(--theme-accent)] bg-[var(--theme-accent)]/10'
                  : 'border-[var(--theme-border)] bg-[var(--theme-surface)] hover:border-[var(--theme-border)]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-[var(--theme-accent)]">STAGE 01</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-[var(--theme-border)] bg-[var(--theme-background-soft)] text-[var(--theme-text-muted)]">Atomic Values</span>
              </div>
              <h4 className="font-display text-base font-normal text-[var(--theme-text)]">1NF · First Normal Form</h4>
              <p className="font-body text-xs text-[var(--theme-text-secondary)] mt-1 leading-relaxed">
                Eliminated repeating groups, arrays, and multi-valued fields. Guaranteed atomic columns and unique primary keys.
              </p>
            </button>

            {/* 2NF Card */}
            <button
              type="button"
              onClick={() => setSelectedNormalizationStage('2nf')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                selectedNormalizationStage === '2nf'
                  ? 'border-[var(--theme-accent)] bg-[var(--theme-accent)]/10'
                  : 'border-[var(--theme-border)] bg-[var(--theme-surface)] hover:border-[var(--theme-border)]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-[var(--theme-accent)]">STAGE 02</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-[var(--theme-border)] bg-[var(--theme-background-soft)] text-[var(--theme-text-muted)]">Full Key Dependency</span>
              </div>
              <h4 className="font-display text-base font-normal text-[var(--theme-text)]">2NF · Second Normal Form</h4>
              <p className="font-body text-xs text-[var(--theme-text-secondary)] mt-1 leading-relaxed">
                Eliminated partial dependencies on composite keys. All non-key attributes are fully functionally dependent on the whole key.
              </p>
            </button>

            {/* 3NF Card */}
            <button
              type="button"
              onClick={() => setSelectedNormalizationStage('3nf')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                selectedNormalizationStage === '3nf'
                  ? 'border-[var(--theme-accent)] bg-[var(--theme-accent)]/10'
                  : 'border-[var(--theme-border)] bg-[var(--theme-surface)] hover:border-[var(--theme-border)]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-[var(--theme-accent)]">STAGE 03</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-[var(--theme-border)] bg-[var(--theme-background-soft)] text-[var(--theme-text-muted)]">Transitive Freedom</span>
              </div>
              <h4 className="font-display text-base font-normal text-[var(--theme-text)]">3NF · Third Normal Form</h4>
              <p className="font-body text-xs text-[var(--theme-text-secondary)] mt-1 leading-relaxed">
                Eliminated transitive dependencies (non-key determining non-key). Lookup tables and isolated financial ledgers created.
              </p>
            </button>
          </div>

          {/* Stage Specific Deep-Dive Comparison */}
          <div className="p-5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50 space-y-4 shadow-none">
            {selectedNormalizationStage === '1nf' && (
              <div className="space-y-4">
                <span className="font-mono text-xs font-bold text-[var(--theme-accent)] uppercase">
                  First Normal Form (1NF) Resolution
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] space-y-2">
                    <span className="font-mono text-[10px] font-bold text-[var(--theme-text-muted)] uppercase block">
                      Before 1NF: Repeating Groups &amp; Multi-Valued Attributes
                    </span>
                    <p className="font-body text-xs leading-relaxed text-[var(--theme-text)]/90">
                      Initial customer records stored multiple phone numbers and email addresses in single delimited strings (e.g. <code className="font-mono text-[var(--theme-accent)]">"0300-1234567, 0321-7654321"</code>). Similarly, order tables held item arrays in un-atomic rows.
                    </p>
                    <div className="font-mono text-[10px] p-2.5 rounded bg-[var(--theme-background-soft)] text-[var(--theme-text-secondary)]">
                      Violation: Non-atomic columns prevent indexing, filtering, and constraint enforcement.
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] space-y-2">
                    <span className="font-mono text-[10px] font-bold text-[var(--theme-accent)] uppercase block">
                      After 1NF: Atomic Decomposition &amp; Dedicated Entities
                    </span>
                    <p className="font-body text-xs leading-relaxed text-[var(--theme-text)]/90">
                      Extracted repeating contact channels into a dedicated <strong className="text-[var(--theme-text)]">Customer Contact</strong> entity with individual contact rows, contact types, and primary flags. Extracted order line items into <strong className="text-[var(--theme-text)]">Order Items</strong>.
                    </p>
                    <div className="font-mono text-[10px] p-2.5 rounded bg-[var(--theme-background-soft)] text-[var(--theme-accent)]">
                      ✓ 1NF Conformance: Every field contains atomic, single-valued attributes with unique Primary Keys.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedNormalizationStage === '2nf' && (
              <div className="space-y-4">
                <span className="font-mono text-xs font-bold text-[var(--theme-accent)] uppercase">
                  Second Normal Form (2NF) Resolution
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] space-y-2">
                    <span className="font-mono text-[10px] font-bold text-[var(--theme-text-muted)] uppercase block">
                      Before 2NF: Partial Functional Dependencies
                    </span>
                    <p className="font-body text-xs leading-relaxed text-[var(--theme-text)]/90">
                      In composite key tables like <code className="font-mono text-[var(--theme-accent)]">(order_id, product_id)</code>, attributes like <code className="font-mono">product_name</code> or <code className="font-mono">unit_base_price</code> depended only on <code className="font-mono">product_id</code>, NOT the full composite key.
                    </p>
                    <div className="font-mono text-[10px] p-2.5 rounded bg-[var(--theme-background-soft)] text-[var(--theme-text-secondary)]">
                      Violation: Product descriptions replicated across every order item row in history.
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] space-y-2">
                    <span className="font-mono text-[10px] font-bold text-[var(--theme-accent)] uppercase block">
                      After 2NF: Full Functional Dependency Isolation
                    </span>
                    <p className="font-body text-xs leading-relaxed text-[var(--theme-text)]/90">
                      Separated <strong className="text-[var(--theme-text)]">Product</strong> into its own master entity. <strong className="text-[var(--theme-text)]">Order Items</strong> now contains only attributes strictly dependent on the purchase transaction: <code className="font-mono">quantity</code>, <code className="font-mono">unit_price_at_purchase</code>, and <code className="font-mono">item_total</code>.
                    </p>
                    <div className="font-mono text-[10px] p-2.5 rounded bg-[var(--theme-background-soft)] text-[var(--theme-accent)]">
                      ✓ 2NF Conformance: In 1NF and no non-key attribute is partially dependent on any candidate key.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedNormalizationStage === '3nf' && (
              <div className="space-y-4">
                <span className="font-mono text-xs font-bold text-[var(--theme-accent)] uppercase">
                  Third Normal Form (3NF) Resolution
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] space-y-2">
                    <span className="font-mono text-[10px] font-bold text-[var(--theme-text-muted)] uppercase block">
                      Before 3NF: Transitive Dependencies (A → B → C)
                    </span>
                    <p className="font-body text-xs leading-relaxed text-[var(--theme-text)]/90">
                      In Address tables: <code className="font-mono text-[var(--theme-accent)]">address_id → postal_code → city → state → country</code>. In Product tables: <code className="font-mono text-[var(--theme-accent)]">product_id → brand_id → brand_origin</code>. Non-key attributes determined other non-key attributes!
                    </p>
                    <div className="font-mono text-[10px] p-2.5 rounded bg-[var(--theme-background-soft)] text-[var(--theme-text-secondary)]">
                      Violation: Deleting the last customer in a city would unintentionally delete that city from the system (Deletion Anomaly).
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] space-y-2">
                    <span className="font-mono text-[10px] font-bold text-[var(--theme-accent)] uppercase block">
                      After 3NF: Transitive Elimination via Dedicated Relational Lookups
                    </span>
                    <p className="font-body text-xs leading-relaxed text-[var(--theme-text)]/90">
                      Created dedicated lookup entities: <strong className="text-[var(--theme-text)]">Location</strong>, <strong className="text-[var(--theme-text)]">Brand</strong>, <strong className="text-[var(--theme-text)]">Category</strong>, <strong className="text-[var(--theme-text)]">Payment Method</strong>, <strong className="text-[var(--theme-text)]">Payment Status</strong>, <strong className="text-[var(--theme-text)]">Carriers</strong>, and <strong className="text-[var(--theme-text)]">Service Levels</strong>.
                    </p>
                    <div className="font-mono text-[10px] p-2.5 rounded bg-[var(--theme-background-soft)] text-[var(--theme-accent)]">
                      ✓ 3NF Conformance: In 2NF and every non-key attribute depends only on the primary key, directly and non-transitively.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Transformation Review: 9 Base Tables to 19 Entities */}
          <div className="space-y-3">
            <h3 className="font-display text-base font-normal text-[var(--theme-text)] flex items-center gap-2">
              <ListOrdered className="h-4 w-4 text-[var(--theme-accent)]" aria-hidden="true" />
              Initial 9 Base Tables vs Normalized Outcomes
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {initialBaseTables.map((tbl, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] space-y-1.5"
                >
                  <span className="font-bold text-[var(--theme-text)] font-mono text-[11px] block">
                    {tbl.name}
                  </span>
                  <p className="font-body text-[11px] leading-relaxed text-[var(--theme-text-secondary)]">
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
            <div className="flex flex-wrap gap-1 font-mono text-xs">
              {[
                { id: 'all', label: 'All 19 Entities' },
                { id: 'customer', label: 'Customer (7)' },
                { id: 'catalog', label: 'Product & Inventory (5)' },
                { id: 'orders', label: 'Orders & Payments (6)' },
                { id: 'shipping', label: 'Logistics (3)' },
              ].map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedDomain(d.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                    selectedDomain === d.id
                      ? 'btn-accent-primary font-bold'
                      : 'border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)]'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="h-3.5 w-3.5 text-[var(--theme-text-muted)] absolute left-3 top-3" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search entities or attributes..."
                value={entitySearch}
                onChange={(e) => setEntitySearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-background-soft)] text-xs text-[var(--theme-text)] placeholder-[var(--theme-text-muted)]"
              />
            </div>
          </div>

          {/* Master-Detail Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Entities List (5 Cols) */}
            <div className="lg:col-span-5 space-y-2 max-h-[520px] overflow-y-auto pr-1 no-scrollbar">
              {filteredEntities.map((ent) => {
                const isSelected = ent.id === activeEntity.id;
                return (
                  <button
                    key={ent.id}
                    type="button"
                    onClick={() => setActiveEntityId(ent.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[var(--theme-accent)] bg-[var(--theme-accent)]/10'
                        : 'border-[var(--theme-border)] bg-[var(--theme-surface)] hover:border-[var(--theme-border)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[var(--theme-text)] flex items-center gap-1.5">
                        <Table className={`h-3.5 w-3.5 ${isSelected ? 'text-[var(--theme-accent)]' : 'text-[var(--theme-text-muted)]'}`} aria-hidden="true" />
                        {ent.name}
                      </span>
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-[var(--theme-border)] bg-[var(--theme-background-soft)] text-[var(--theme-text-muted)]">
                        {ent.normalizationStage}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[var(--theme-accent)] block mt-1">
                      PK: {ent.pk}
                    </span>
                    <p className="text-[11px] text-[var(--theme-text-secondary)] line-clamp-1 mt-0.5">
                      {ent.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Entity Schema Inspector (7 Cols) */}
            <div className="lg:col-span-7 p-5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50 space-y-4 shadow-none">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--theme-border)] pb-3">
                <div>
                  <span className="font-mono text-[10px] text-[var(--theme-accent)] uppercase font-bold tracking-wider">
                    {activeEntity.domainLabel}
                  </span>
                  <h3 className="text-lg font-display font-normal text-[var(--theme-text)] flex items-center gap-2">
                    <span>{activeEntity.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10 text-[var(--theme-accent)]">
                      {activeEntity.normalizationStage} Compliant
                    </span>
                  </h3>
                </div>

                <div className="font-mono text-xs text-[var(--theme-text-muted)]">
                  Entity ID: <code className="text-[var(--theme-text)]">{activeEntity.id}</code>
                </div>
              </div>

              <p className="font-body text-xs sm:text-sm text-[var(--theme-text)]/90 leading-relaxed">
                {activeEntity.description}
              </p>

              {/* Attributes Table */}
              <div className="space-y-1.5">
                <span className="font-mono text-[10px] font-bold text-[var(--theme-text-muted)] uppercase tracking-wider block">
                  Schema Attributes &amp; Constraints:
                </span>
                <div className="border border-[var(--theme-border)] rounded-xl overflow-hidden bg-[var(--theme-surface)]">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-[var(--theme-background-soft)] text-[var(--theme-text-muted)] text-[10px] border-b border-[var(--theme-border)]">
                      <tr>
                        <th className="py-2.5 px-3">Attribute Name</th>
                        <th className="py-2.5 px-3">Key Type</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--theme-border)]/60 text-[11px]">
                      {activeEntity.attributes.map((attr, idx) => {
                        const isPK = attr.includes('PK');
                        const isFK = attr.includes('FK');
                        return (
                          <tr key={idx} className="hover:bg-[var(--theme-background-soft)]/50">
                            <td className="py-2 px-3 text-[var(--theme-text)]">
                              {attr}
                            </td>
                            <td className="py-2 px-3">
                              {isPK && (
                                <span className="inline-flex items-center gap-1 text-[10px] text-[var(--theme-accent)] font-bold">
                                  <Key className="h-3 w-3" aria-hidden="true" /> PRIMARY KEY
                                </span>
                              )}
                              {isFK && (
                                <span className="inline-flex items-center gap-1 text-[10px] text-[var(--theme-text-secondary)] font-bold">
                                  <GitBranch className="h-3 w-3" aria-hidden="true" /> FOREIGN KEY
                                </span>
                              )}
                              {!isPK && !isFK && (
                                <span className="text-[10px] text-[var(--theme-text-muted)]">Regular Attribute</span>
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
              <div className="p-3.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] text-xs space-y-1">
                <span className="font-mono text-[10px] uppercase font-bold text-[var(--theme-text-muted)] block">
                  Normalization Rationale:
                </span>
                <p className="font-body text-[11px] leading-relaxed text-[var(--theme-text)]/90">
                  {activeEntity.rationale}
                </p>
              </div>

              {/* Relational Cardinality Connections */}
              <div className="space-y-1.5">
                <span className="font-mono text-[10px] font-bold text-[var(--theme-text-muted)] uppercase tracking-wider block">
                  Linked Relationships &amp; Cardinality:
                </span>
                <div className="space-y-1.5">
                  {activeEntity.relationships.map((rel, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] flex items-start justify-between gap-2 text-xs"
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold text-[var(--theme-text)] flex items-center gap-1">
                          <span>→ {rel.target}</span>
                        </span>
                        <p className="text-[11px] text-[var(--theme-text-muted)]">
                          {rel.description}
                        </p>
                      </div>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] font-bold shrink-0">
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
          <div className="p-4 rounded-xl border border-[var(--theme-accent)]/20 bg-[var(--theme-accent)]/5 space-y-1.5">
            <span className="font-mono text-xs text-[var(--theme-accent)] uppercase font-semibold flex items-center gap-1.5">
              <GitBranch className="h-3.5 w-3.5" aria-hidden="true" />
              Entity-Relationship Modeling &amp; Cardinality Mapping
            </span>
            <p className="max-w-[70ch] font-body text-xs sm:text-sm text-[var(--theme-text)]/90 leading-relaxed">
              Defined logical cardinalities across customer accounts, order transactions, payment settlements, and fulfillment dispatches to guarantee referential integrity and data consistency.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-display text-base font-normal text-[var(--theme-text)] flex items-center gap-2">
              <Network className="h-4 w-4 text-[var(--theme-accent)]" aria-hidden="true" />
              Core Cardinality Rules
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[var(--theme-text)]">Customers ↔ Orders</span>
                  <span className="font-mono text-xs text-[var(--theme-accent)] font-bold">1 : M (One-to-Many)</span>
                </div>
                <p className="font-body text-[11px] leading-relaxed text-[var(--theme-text-secondary)]">
                  A single registered customer can place zero or multiple orders over time. Each order record must belong to exactly one customer foreign key (<code className="font-mono">customer_id</code>).
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[var(--theme-text)]">Orders ↔ Order Financials</span>
                  <span className="font-mono text-xs text-[var(--theme-accent)] font-bold">1 : 1 (One-to-One)</span>
                </div>
                <p className="font-body text-[11px] leading-relaxed text-[var(--theme-text-secondary)]">
                  Every order header maps to exactly one dedicated financial calculations ledger via a UNIQUE foreign key (<code className="font-mono">order_id</code>), cleanly isolating accounting figures.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[var(--theme-text)]">Orders ↔ Order Items</span>
                  <span className="font-mono text-xs text-[var(--theme-accent)] font-bold">1 : M (One-to-Many)</span>
                </div>
                <p className="font-body text-[11px] leading-relaxed text-[var(--theme-text-secondary)]">
                  An order consists of one or many item lines. Each item line records the purchased quantity and locks the historical price at purchase time to protect against subsequent catalog price edits.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[var(--theme-text)]">Customers ↔ Address (via Customer Address)</span>
                  <span className="font-mono text-xs text-[var(--theme-accent)] font-bold">M : M (Many-to-Many)</span>
                </div>
                <p className="font-body text-[11px] leading-relaxed text-[var(--theme-text-secondary)]">
                  Resolved through the <strong className="text-[var(--theme-text)]">Customer Address</strong> bridge entity. A customer can maintain multiple shipping and billing addresses, and addresses can be shared across family accounts.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[var(--theme-text)]">Orders ↔ Payments</span>
                  <span className="font-mono text-xs text-[var(--theme-accent)] font-bold">1 : M (One-to-Many)</span>
                </div>
                <p className="font-body text-[11px] leading-relaxed text-[var(--theme-text-secondary)]">
                  Enables multi-tender transactions, gift-card splits, partial installment payments, and subsequent refund allocations against an order without corrupting order header status.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[var(--theme-text)]">Shipments ↔ Carriers &amp; Service Levels</span>
                  <span className="font-mono text-xs text-[var(--theme-accent)] font-bold">M : 1 (Many-to-One)</span>
                </div>
                <p className="font-body text-[11px] leading-relaxed text-[var(--theme-text-secondary)]">
                  Shipment dispatches link to freight providers (TCS, DHL, FedEx) and predefined Service Level agreements (Next-Day, Ground), allowing split-warehouse fulfillments for single orders.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Schema Flow Map */}
          <div className="p-5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] space-y-4 shadow-none">
            <span className="font-mono text-xs font-bold text-[var(--theme-text)] uppercase tracking-wider block">
              Interactive Relational Flow Overview
            </span>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] font-bold">Customers</span>
                  <span className="text-[var(--theme-text-muted)]">1 ──── M</span>
                  <span className="px-2 py-1 rounded border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text)] font-bold">Orders</span>
                </div>
                <span className="text-[11px] text-[var(--theme-text-muted)]">Foreign Key: orders.customer_id → customers.customer_id</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text)] font-bold">Orders</span>
                  <span className="text-[var(--theme-text-muted)]">1 ──── 1</span>
                  <span className="px-2 py-1 rounded border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] font-bold">Order Financials</span>
                </div>
                <span className="text-[11px] text-[var(--theme-text-muted)]">Foreign Key (UNIQUE): order_financials.order_id → orders.order_id</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text)] font-bold">Orders</span>
                  <span className="text-[var(--theme-text-muted)]">1 ──── M</span>
                  <span className="px-2 py-1 rounded border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] font-bold">Order Items</span>
                  <span className="text-[var(--theme-text-muted)]">M ──── 1</span>
                  <span className="px-2 py-1 rounded border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text)] font-bold">Product</span>
                </div>
                <span className="text-[11px] text-[var(--theme-text-muted)]">Junction line items bridging order headers to catalog items</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text)] font-bold">Orders</span>
                  <span className="text-[var(--theme-text-muted)]">1 ──── M</span>
                  <span className="px-2 py-1 rounded border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] font-bold">Payments</span>
                  <span className="text-[var(--theme-text-muted)]">M ──── 1</span>
                  <span className="px-2 py-1 rounded border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text)] font-bold">Payment Method</span>
                </div>
                <span className="text-[11px] text-[var(--theme-text-muted)]">Multi-tender payments linked to standardized payment lookup methods</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 5: KEYS & DATA INTEGRITY ================= */}
      {activeTab === 'integrity' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl border border-[var(--theme-accent)]/20 bg-[var(--theme-accent)]/5 space-y-1.5">
            <span className="font-mono text-xs text-[var(--theme-accent)] uppercase font-semibold flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Referential Integrity &amp; Anomaly Mitigation
            </span>
            <p className="max-w-[70ch] font-body text-xs sm:text-sm text-[var(--theme-text)]/90 leading-relaxed">
              Review how 3NF normalization eliminates the classic relational database anomalies (Insertion, Update, and Deletion) while enforcing strict referential integrity rules.
            </p>
          </div>

          {/* Relational Anomalies Solved */}
          <div className="space-y-3">
            <h3 className="font-display text-base font-normal text-[var(--theme-text)] flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[var(--theme-accent)]" aria-hidden="true" />
              Three Classic Relational Anomalies Mitigated
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] space-y-2">
                <span className="font-mono text-[10px] uppercase font-bold text-[var(--theme-accent)] block">
                  1. Insertion Anomaly
                </span>
                <h4 className="font-bold text-[var(--theme-text)]">Independent Entity Creation</h4>
                <p className="font-body text-[11px] text-[var(--theme-text-secondary)] leading-relaxed">
                  In un-normalized schemas, a new Product could not be added unless an active Order or Supplier was already recorded. In this 3NF design, Categories, Brands, Products, and Suppliers exist independently.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] space-y-2">
                <span className="font-mono text-[10px] uppercase font-bold text-[var(--theme-accent)] block">
                  2. Update Anomaly
                </span>
                <h4 className="font-bold text-[var(--theme-text)]">Single-Row Consistency</h4>
                <p className="font-body text-[11px] text-[var(--theme-text-secondary)] leading-relaxed">
                  If a Brand name or Courier tracking portal URL changes, it is updated in exactly one row in the lookup table, immediately propagating across thousands of related products or shipments without inconsistency.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] space-y-2">
                <span className="font-mono text-[10px] uppercase font-bold text-[var(--theme-accent)] block">
                  3. Deletion Anomaly
                </span>
                <h4 className="font-bold text-[var(--theme-text)]">Preserved Master Data</h4>
                <p className="font-body text-[11px] text-[var(--theme-text-secondary)] leading-relaxed">
                  Deleting an obsolete order or cancelled shipment does not inadvertently delete the underlying customer, product catalog SKU, or carrier definition from the database.
                </p>
              </div>
            </div>
          </div>

          {/* DDL Schema Implementation Snippet */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-normal text-[var(--theme-text)] flex items-center gap-2">
                <Code2 className="h-4 w-4 text-[var(--theme-accent)]" aria-hidden="true" />
                Sample DDL Implementation Snippet (SQL)
              </h3>
              <span className="font-mono text-[10px] text-[var(--theme-text-muted)]">PostgreSQL / MySQL Compatible</span>
            </div>

            <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/70 font-mono text-[11px] text-[var(--theme-text)] overflow-x-auto no-scrollbar space-y-2">
              <pre className="text-[var(--theme-accent)] font-semibold">{"-- 1. Master Customers Entity with Foreign Key Status"}</pre>
              <pre className="text-[var(--theme-text-secondary)]">{`CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    registration_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status_id INT NOT NULL,
    CONSTRAINT fk_customer_status FOREIGN KEY (status_id) 
        REFERENCES customer_status(status_id)
);`}</pre>

              <pre className="text-[var(--theme-accent)] font-semibold pt-2">{"-- 2. 1:1 Isolated Order Financials Table"}</pre>
              <pre className="text-[var(--theme-text-secondary)]">{`CREATE TABLE order_financials (
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

              <pre className="text-[var(--theme-accent)] font-semibold pt-2">{"-- 3. Composite Order Items with Historical Price Freeze"}</pre>
              <pre className="text-[var(--theme-text-secondary)]">{`CREATE TABLE order_items (
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
          <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] space-y-2">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-[var(--theme-accent)]" aria-hidden="true" />
              <span className="font-mono text-xs font-bold text-[var(--theme-text)] uppercase">
                Academic Coursework Reflection
              </span>
            </div>
            <p className="max-w-[70ch] font-body text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
              {project.businessAnalyticsPerspective || 'Designed and normalized a relational database for a comprehensive e-commerce system covering customer management, product cataloging, inventory, orders, payments, and shipment logistics. Demonstrates mastery of database architecture, relational normal forms, cardinality rules, and referential constraints.'}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-[var(--theme-border)]/60 bg-[var(--theme-background-soft)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--theme-text-secondary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </CaseStudyModalShell>
  );
};

export default EcommerceDatabaseCaseStudyModal;
