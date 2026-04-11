import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  ArrowRight, 
  ArrowLeft,
  CreditCard, 
  Calculator, 
  Bell, 
  HandCoins,
  MapPin,
  Instagram,
  Linkedin,
  Facebook,
  Phone,
  Twitter,
  TrendingUp,
  DollarSign,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  Download,
  Mail,
  User,
  Search,
  Building2,
  Home,
  Key,
  Briefcase,
  Calendar,
  Bed,
  Bath,
  Maximize,
  MessageSquare,
  Layout,
  Layers,
  CheckCircle2,
  Image as ImageIcon,
  ExternalLink,
  Clock,
  Wallet
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area 
} from 'recharts';

import { DEVELOPERS } from './data/developers';
import { PROJECTS } from './data/projects';
import { Developer, Project, PropertyType } from './types';

const NavLink = ({ href, children, active = false }: { href: string; children: React.ReactNode; active?: boolean }) => (
  <a 
    href={href} 
    className={`text-[12px] tracking-[0.25em] uppercase font-black transition-all duration-300 cursor-pointer whitespace-nowrap relative group ${active ? 'text-dark' : 'text-dark/50 hover:text-dark'}`}
  >
    {children}
    <span className={`absolute -bottom-1 left-0 w-0 h-[2px] bg-porsche-red transition-all duration-300 group-hover:w-full ${active ? 'w-full' : ''}`}></span>
  </a>
);

const FeatureCard = ({ icon: Icon, title, description, badge, onClick }: { icon: any; title: string; description: string; badge: string; onClick?: () => void }) => (
  <div 
    onClick={onClick}
    className={`group bg-white p-10 hover:shadow-2xl hover:shadow-dark/5 transition-all duration-700 border border-gray-50 relative overflow-hidden ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
  >
    <div className="absolute top-0 left-0 w-1 h-0 bg-porsche-red transition-all duration-500 group-hover:h-full"></div>
    <div className="flex items-start justify-between mb-12">
      <div className="w-16 h-16 flex items-center justify-center bg-dark text-white rounded-none transition-all duration-500 group-hover:bg-porsche-red group-hover:rotate-[360deg]">
        <Icon className="w-7 h-7" />
      </div>
      <span className="bg-gray-100 text-dark/40 text-[8px] md:text-[7px] font-black px-3 py-1 tracking-[0.3em] uppercase whitespace-nowrap group-hover:bg-porsche-red group-hover:text-white transition-colors duration-500">
        {badge}
      </span>
    </div>
    <h3 className="text-dark font-display font-black text-xl mb-4 tracking-tight uppercase">
      {title}
    </h3>
    <p className="text-dark/50 text-sm leading-relaxed font-light">
      {description}
    </p>
    <div className="mt-10 flex items-center gap-3 text-porsche-red text-[11px] font-black tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
      {onClick ? 'Open Calculator' : 'Explore Details'} <ArrowRight className="w-3 h-3" />
    </div>
  </div>
);

const PaymentCalculator = ({ onBack }: { onBack: () => void }) => {
  const [price, setPrice] = useState<number | string>(1000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number | string>(10);
  const [selectedPlan, setSelectedPlan] = useState('60/40');

  const plans: Record<string, { during: number; handover: number; post?: number }> = {
    '60/40': { during: 60, handover: 40 },
    '70/30': { during: 70, handover: 30 },
    '50/50': { during: 50, handover: 50 },
    '80/20': { during: 80, handover: 20 },
    '40/60 (Post Handover)': { during: 40, handover: 0, post: 60 },
  };

  const currentPlan = plans[selectedPlan] || plans['60/40'];
  
  const numPrice = Number(price) || 0;
  const numDPPercent = Number(downPaymentPercent) || 0;

  const dpAmount = (numPrice * numDPPercent) / 100;
  const duringAmount = (numPrice * (currentPlan.during - numDPPercent)) / 100;
  const handoverAmount = (numPrice * currentPlan.handover) / 100;
  const postAmount = currentPlan.post ? (numPrice * currentPlan.post) / 100 : 0;

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="min-h-screen bg-white font-sans text-dark">
      {/* Header */}
      <header className="px-6 md:px-8 lg:px-24 py-4 md:py-8 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-xl z-[100]">
        <div className="flex items-baseline gap-1">
          <span className="text-dark font-display font-black text-xl md:text-2xl tracking-tighter">ROCK</span>
          <span className="text-dark/40 font-display font-light text-xl md:text-2xl tracking-tighter">DEALS</span>
        </div>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 md:gap-3 text-[11px] md:text-[12px] tracking-[0.2em] md:tracking-[0.3em] uppercase font-black hover:text-porsche-red transition-colors min-h-[44px]"
        >
          <X className="w-4 h-4" /> <span className="hidden sm:inline">Close Calculator</span><span className="sm:hidden">Close</span>
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-6 md:px-8 py-8 md:py-16">
        <div className="mb-10 md:mb-12">
          <p className="text-porsche-red text-[11px] md:text-[12px] tracking-[0.4em] md:tracking-[0.5em] uppercase font-black mb-4 md:mb-6">Financial Intelligence</p>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-black text-dark tracking-tighter leading-none uppercase">
            Payment Plan<br />
            <span className="text-porsche-red">Calculator.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Inputs */}
          <div className="space-y-12">
            <div className="space-y-4">
              <label className="text-[12px] tracking-[0.3em] uppercase font-black text-dark/40">Property Price (AED)</label>
              <div className="relative group">
                <input 
                  type="number" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full bg-gray-50 border-b-2 border-gray-100 py-6 px-0 text-3xl font-technical font-bold focus:border-porsche-red outline-none transition-all"
                />
                <div className="absolute right-0 bottom-6 text-dark/20 font-technical font-bold">AED</div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[12px] tracking-[0.3em] uppercase font-black text-dark/40">Down Payment (%)</label>
              <div className="flex gap-4">
                {[10, 20, 25].map((pct) => (
                  <button 
                    key={pct}
                    onClick={() => setDownPaymentPercent(pct)}
                    className={`flex-1 py-4 border-2 transition-all font-technical font-bold ${downPaymentPercent === pct ? 'border-porsche-red bg-porsche-red text-white' : 'border-gray-100 hover:border-dark/10'}`}
                  >
                    {pct}%
                  </button>
                ))}
                <div className="flex-1 relative">
                  <input 
                    type="number" 
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full h-full border-2 border-gray-100 bg-gray-50 px-4 text-center font-technical font-bold focus:border-porsche-red outline-none"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] font-black opacity-20">%</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[12px] tracking-[0.3em] uppercase font-black text-dark/40">Select Payment Plan</label>
              <select 
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-100 py-6 px-8 text-lg font-technical font-bold focus:border-porsche-red outline-none appearance-none cursor-pointer"
              >
                {Object.keys(plans).map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="bg-dark p-12 rounded-none relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-porsche-red/10 blur-3xl rounded-full"></div>
            
            <h2 className="text-white font-display font-black text-2xl mb-12 tracking-tight uppercase">Breakdown</h2>
            
            <div className="space-y-8">
              <div className="flex justify-between items-end border-b border-white/10 pb-6">
                <div>
                  <p className="text-white/40 text-[11px] tracking-[0.3em] uppercase font-black mb-2">Down Payment</p>
                  <p className="text-white font-technical font-bold text-xl">{downPaymentPercent}%</p>
                </div>
                <p className="text-porsche-red font-technical font-bold text-2xl">{formatCurrency(dpAmount)}</p>
              </div>

              <div className="flex justify-between items-end border-b border-white/10 pb-6">
                <div>
                  <p className="text-white/40 text-[11px] tracking-[0.3em] uppercase font-black mb-2">During Construction</p>
                  <p className="text-white font-technical font-bold text-xl">{currentPlan.during - downPaymentPercent}%</p>
                </div>
                <p className="text-white font-technical font-bold text-2xl">{formatCurrency(duringAmount)}</p>
              </div>

              {currentPlan.handover > 0 && (
                <div className="flex justify-between items-end border-b border-white/10 pb-6">
                  <div>
                    <p className="text-white/40 text-[11px] tracking-[0.3em] uppercase font-black mb-2">On Handover</p>
                    <p className="text-white font-technical font-bold text-xl">{currentPlan.handover}%</p>
                  </div>
                  <p className="text-white font-technical font-bold text-2xl">{formatCurrency(handoverAmount)}</p>
                </div>
              )}

              {currentPlan.post !== undefined && currentPlan.post > 0 && (
                <div className="flex justify-between items-end border-b border-white/10 pb-6">
                  <div>
                    <p className="text-white/40 text-[11px] tracking-[0.3em] uppercase font-black mb-2">Post Handover</p>
                    <p className="text-white font-technical font-bold text-xl">{currentPlan.post}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-porsche-red font-technical font-bold text-2xl">{formatCurrency(postAmount)}</p>
                    <p className="text-white/20 text-[8px] tracking-widest uppercase mt-1">Est. {formatCurrency(postAmount / 36)} / mo (3 yrs)</p>
                  </div>
                </div>
              )}

              <div className="pt-12 flex justify-between items-center">
                <p className="text-white/60 text-[12px] tracking-[0.4em] uppercase font-black">Total Commitment</p>
                <p className="text-white font-display font-black text-4xl tracking-tighter">{formatCurrency(price)}</p>
              </div>
            </div>

            <button className="w-full mt-16 bg-porsche-red text-white py-6 font-black tracking-[0.4em] uppercase text-xs hover:bg-white hover:text-dark transition-all duration-500">
              Download PDF Report
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

const ROICalculator = ({ onBack }: { onBack: () => void }) => {
  const [price, setPrice] = useState<number | string>(2000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number | string>(25);
  const [monthlyRent, setMonthlyRent] = useState<number | string>(15000);
  const [serviceCharges, setServiceCharges] = useState<number | string>(15000);
  const [interestRate, setInterestRate] = useState<number | string>(4.5);
  const [loanTenure, setLoanTenure] = useState<number | string>(25);
  const [appreciation, setAppreciation] = useState<number | string>(5);
  const [holdingPeriod, setHoldingPeriod] = useState<number | string>(5);
  const [maintenance, setMaintenance] = useState<number | string>(1);
  const [vacancy, setVacancy] = useState<number | string>(5);

  const [showResults, setShowResults] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportForm, setExportForm] = useState({ name: '', email: '', mobile: '' });
  const [isExporting, setIsExporting] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleExport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsExporting(true);

    try {
      // 1. Generate PDF
      const doc = new jsPDF('p', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      
      // Add Header
      doc.setFillColor(177, 43, 40); // Porsche Red
      doc.rect(0, 0, pageWidth, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('ROCK DEALS', 20, 25);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('INVESTMENT ANALYTICS REPORT', 20, 32);

      // Add User Info
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.text(`Prepared for: ${exportForm.name}`, 20, 55);
      doc.text(`Email: ${exportForm.email}`, 20, 62);
      doc.text(`Mobile: ${exportForm.mobile}`, 20, 69);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - 60, 55);

      // Add Property Details
      doc.setDrawColor(230, 230, 230);
      doc.line(20, 75, pageWidth - 20, 75);
      doc.setFont('helvetica', 'bold');
      doc.text('PROPERTY PARAMETERS', 20, 85);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(`Property Price: ${formatCurrency(numPrice)}`, 20, 95);
      doc.text(`Down Payment: ${numDPPercent}%`, 20, 102);
      doc.text(`Monthly Rent: ${formatCurrency(numMonthlyRent)}`, 20, 109);
      doc.text(`Interest Rate: ${numInterestRate}%`, 20, 116);
      doc.text(`Holding Period: ${numHoldingPeriod} Years`, 20, 123);

      // Add Results
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('INVESTMENT PERFORMANCE', 20, 140);
      doc.line(20, 142, pageWidth - 20, 142);
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const results = [
        ['Gross Rental Yield', `${grossYield.toFixed(2)}%`],
        ['Net Rental Yield', `${netYield.toFixed(2)}%`],
        ['Monthly Mortgage', formatCurrency(monthlyMortgage)],
        ['Annual Cash Flow', formatCurrency(annualCashFlow)],
        ['Future Value', formatCurrency(futureValue)],
        ['Capital Gain', formatCurrency(capitalGain)],
        ['Total ROI', `${totalROI.toFixed(1)}%`]
      ];

      let yPos = 152;
      results.forEach(([label, value]) => {
        doc.text(label, 20, yPos);
        doc.setFont('helvetica', 'bold');
        doc.text(value, pageWidth - 60, yPos);
        doc.setFont('helvetica', 'normal');
        yPos += 8;
      });

      // Footer
      doc.setFillColor(245, 245, 245);
      doc.rect(0, 280, pageWidth, 17, 'F');
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text('This report is generated by Rock Deals ROI Calculator. All projections are estimates.', pageWidth / 2, 290, { align: 'center' });

      doc.save(`RockDeals_ROI_Report_${exportForm.name.replace(/\s+/g, '_')}.pdf`);

      // 2. Trigger Official Email
      const subject = `ROI Report Exported: ${exportForm.name}`;
      const body = `
User Details:
-------------
Name: ${exportForm.name}
Email: ${exportForm.email}
Mobile: ${exportForm.mobile}

Investment Details:
-------------------
Property Price: ${formatCurrency(numPrice)}
Down Payment: ${numDPPercent}%
Monthly Rent: ${formatCurrency(numMonthlyRent)}
Interest Rate: ${numInterestRate}%
Holding Period: ${numHoldingPeriod} Years

Performance:
------------
Gross Yield: ${grossYield.toFixed(2)}%
Net Yield: ${netYield.toFixed(2)}%
Monthly Mortgage: ${formatCurrency(monthlyMortgage)}
Annual Cash Flow: ${formatCurrency(annualCashFlow)}
Future Value: ${formatCurrency(futureValue)}
Capital Gain: ${formatCurrency(capitalGain)}
Total ROI: ${totalROI.toFixed(1)}%
      `;
      
      const mailtoLink = `mailto:info@rock-deals.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // 3. Trigger WhatsApp
      const waMessage = `Hello Rock Deals, I just generated an ROI report.\n\nName: ${exportForm.name}\nEmail: ${exportForm.email}\nProperty Price: ${formatCurrency(numPrice)}\nTotal ROI: ${totalROI.toFixed(1)}%`;
      const waLink = `https://wa.me/971529178630?text=${encodeURIComponent(waMessage)}`;

      // Execute triggers
      window.open(waLink, '_blank');
      window.location.href = mailtoLink;

      setIsExportModalOpen(false);
      setExportForm({ name: '', email: '', mobile: '' });
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  // Calculations
  const numPrice = Number(price) || 0;
  const numDPPercent = Number(downPaymentPercent) || 0;
  const numMonthlyRent = Number(monthlyRent) || 0;
  const numServiceCharges = Number(serviceCharges) || 0;
  const numInterestRate = Number(interestRate) || 0;
  const numLoanTenure = Number(loanTenure) || 0;
  const numAppreciation = Number(appreciation) || 0;
  const numHoldingPeriod = Number(holdingPeriod) || 0;
  const numMaintenance = Number(maintenance) || 0;
  const numVacancy = Number(vacancy) || 0;

  const annualRent = numMonthlyRent * 12;
  const grossYield = numPrice > 0 ? (annualRent / numPrice) * 100 : 0;
  const effectiveRent = annualRent * (1 - numVacancy / 100);
  const maintenanceCost = (numPrice * numMaintenance) / 100;
  const netRentalIncome = effectiveRent - numServiceCharges - maintenanceCost;
  const netYield = numPrice > 0 ? (netRentalIncome / numPrice) * 100 : 0;
  
  const loanAmount = numPrice * (1 - numDPPercent / 100);
  const monthlyInterestRate = (numInterestRate / 100) / 12;
  const numberOfPayments = numLoanTenure * 12;
  const monthlyMortgage = loanAmount > 0 && monthlyInterestRate > 0
    ? (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
    : 0;
  
  const annualMortgage = monthlyMortgage * 12;
  const annualCashFlow = netRentalIncome - annualMortgage;
  
  const futureValue = numPrice * Math.pow(1 + numAppreciation / 100, numHoldingPeriod);
  const capitalGain = futureValue - numPrice;
  const totalRentalIncome = netRentalIncome * numHoldingPeriod;
  const totalProfit = totalRentalIncome + capitalGain;
  const initialInvestment = (numPrice * numDPPercent / 100) + (numPrice * 0.04); // Including 4% DLD fee
  const totalROI = initialInvestment > 0 ? (totalProfit / initialInvestment) * 100 : 0;

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED', maximumFractionDigits: 0 }).format(val);

  const chartData = [
    { name: 'Year 0', value: numPrice },
    ...Array.from({ length: Math.floor(numHoldingPeriod) }, (_, i) => ({
      name: `Year ${i + 1}`,
      value: numPrice * Math.pow(1 + numAppreciation / 100, i + 1)
    }))
  ];

  const pieData = [
    { name: 'Rental Income', value: totalRentalIncome },
    { name: 'Capital Gain', value: capitalGain }
  ];

  const COLORS = ['#B12B28', '#FFFFFF'];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#B12B28] selection:text-white">
      {/* Header */}
      <header className="px-6 md:px-8 lg:px-24 py-4 md:py-8 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#0A0A0A]/80 backdrop-blur-xl z-[100]">
        <div className="flex items-baseline gap-1">
          <span className="text-white font-display font-black text-xl md:text-2xl tracking-tighter">ROCK</span>
          <span className="text-white/40 font-display font-light text-xl md:text-2xl tracking-tighter">DEALS</span>
        </div>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 md:gap-3 text-[11px] md:text-[12px] tracking-[0.2em] md:tracking-[0.3em] uppercase font-black hover:text-[#B12B28] transition-colors min-h-[44px]"
        >
          <X className="w-4 h-4" /> <span className="hidden sm:inline">Exit Calculator</span><span className="sm:hidden">Exit</span>
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-16">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="text-[#B12B28] text-[11px] md:text-[12px] tracking-[0.4em] md:tracking-[0.5em] uppercase font-black mb-4 md:mb-6">Investment Analytics</p>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-black text-white tracking-tighter leading-none uppercase mb-6 md:mb-8">
            Property ROI<br />
            <span className="text-[#B12B28]">Calculator.</span>
          </h1>
          <p className="text-[#BFBFBF] text-lg md:text-xl font-light leading-relaxed">
            Calculate rental yield, ROI and future value in seconds with precision-engineered financial modeling.
          </p>
          <button 
            onClick={() => {
              setShowResults(true);
              window.scrollTo({ top: 800, behavior: 'smooth' });
            }}
            className="mt-8 md:mt-12 bg-[#B12B28] text-white px-8 md:px-12 py-5 md:py-6 text-[11px] md:text-[12px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-black hover:bg-white hover:text-black transition-all duration-500 min-h-[48px]"
          >
            Calculate ROI
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Inputs Section */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              <h3 className="text-white/20 text-[12px] tracking-[0.4em] uppercase font-black border-b border-white/5 pb-4">Core Parameters</h3>
              
              <div className="space-y-6">
                <label className="text-[12px] tracking-[0.3em] uppercase font-black text-[#BFBFBF]">Property Price (AED)</label>
                <div className="relative group">
                  <input 
                    type="number" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-3xl font-technical font-bold focus:border-[#B12B28] outline-none transition-all"
                  />
                  <div className="absolute right-0 bottom-4 text-white/20 font-technical font-bold">AED</div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="text-[12px] tracking-[0.3em] uppercase font-black text-[#BFBFBF]">Down Payment</label>
                  <span className="text-[#B12B28] font-technical font-bold">{downPaymentPercent}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-[#B12B28] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-6">
                  <label className="text-[12px] tracking-[0.3em] uppercase font-black text-[#BFBFBF]">Monthly Rent</label>
                  <input 
                    type="number" value={monthlyRent}
                    onChange={(e) => setMonthlyRent(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-technical font-bold focus:border-[#B12B28] outline-none"
                  />
                </div>
                <div className="space-y-6">
                  <label className="text-[12px] tracking-[0.3em] uppercase font-black text-[#BFBFBF]">Service Charges (Annual)</label>
                  <input 
                    type="number" value={serviceCharges}
                    onChange={(e) => setServiceCharges(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-technical font-bold focus:border-[#B12B28] outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-white/20 text-[12px] tracking-[0.4em] uppercase font-black border-b border-white/5 pb-4">Mortgage & Growth</h3>
              
              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <label className="text-[12px] tracking-[0.3em] uppercase font-black text-[#BFBFBF]">Interest Rate</label>
                    <span className="text-[#B12B28] font-technical font-bold">{interestRate}%</span>
                  </div>
                  <input 
                    type="range" min="1" max="10" step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-[#B12B28] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="space-y-6">
                  <label className="text-[12px] tracking-[0.3em] uppercase font-black text-[#BFBFBF]">Loan Tenure (Yrs)</label>
                  <input 
                    type="number" value={loanTenure}
                    onChange={(e) => setLoanTenure(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-technical font-bold focus:border-[#B12B28] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <label className="text-[12px] tracking-[0.3em] uppercase font-black text-[#BFBFBF]">Appreciation</label>
                    <span className="text-[#B12B28] font-technical font-bold">{appreciation}%</span>
                  </div>
                  <input 
                    type="range" min="0" max="20" step="1"
                    value={appreciation}
                    onChange={(e) => setAppreciation(Number(e.target.value))}
                    className="w-full accent-[#B12B28] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="space-y-6">
                  <label className="text-[12px] tracking-[0.3em] uppercase font-black text-[#BFBFBF]">Holding Period (Yrs)</label>
                  <input 
                    type="number" value={holdingPeriod}
                    onChange={(e) => setHoldingPeriod(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-technical font-bold focus:border-[#B12B28] outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <h3 className="text-white/20 text-[12px] tracking-[0.4em] uppercase font-black border-b border-white/5 pb-4">Optional Overheads</h3>
              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-6">
                  <label className="text-[12px] tracking-[0.3em] uppercase font-black text-[#BFBFBF]">Maintenance (%)</label>
                  <input 
                    type="range" min="0" max="5" step="0.5"
                    value={maintenance}
                    onChange={(e) => setMaintenance(Number(e.target.value))}
                    className="w-full accent-[#B12B28] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="space-y-6">
                  <label className="text-[12px] tracking-[0.3em] uppercase font-black text-[#BFBFBF]">Vacancy Rate (%)</label>
                  <input 
                    type="range" min="0" max="20" step="1"
                    value={vacancy}
                    onChange={(e) => setVacancy(Number(e.target.value))}
                    className="w-full accent-[#B12B28] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-7">
            <AnimatePresence>
              {showResults ? (
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-12"
                >
                  {/* Smart Insights */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {netYield > 7 && (
                      <div className="bg-[#B12B28]/10 border border-[#B12B28]/20 p-6 flex items-center gap-4">
                        <TrendingUp className="text-[#B12B28] w-6 h-6" />
                        <p className="text-[12px] tracking-widest uppercase font-black">Strong Rental Investment</p>
                      </div>
                    )}
                    {appreciation > 5 && (
                      <div className="bg-white/5 border border-white/10 p-6 flex items-center gap-4">
                        <TrendingUp className="text-white w-6 h-6" />
                        <p className="text-[12px] tracking-widest uppercase font-black">High Growth Potential</p>
                      </div>
                    )}
                    {annualCashFlow > 0 && (
                      <div className="bg-white/5 border border-white/10 p-6 flex items-center gap-4">
                        <DollarSign className="text-white w-6 h-6" />
                        <p className="text-[12px] tracking-widest uppercase font-black">Positive Cash Flow</p>
                      </div>
                    )}
                  </div>

                  {/* Glass Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: 'Gross Rental Yield', value: `${grossYield.toFixed(2)}%`, color: 'text-white' },
                      { label: 'Net Rental Yield', value: `${netYield.toFixed(2)}%`, color: 'text-[#B12B28]' },
                      { label: 'Monthly Mortgage', value: formatCurrency(monthlyMortgage), color: 'text-white' },
                      { label: 'Annual Cash Flow', value: formatCurrency(annualCashFlow), color: 'text-white' },
                      { label: 'Future Value', value: formatCurrency(futureValue), color: 'text-white' },
                      { label: 'Capital Gain', value: formatCurrency(capitalGain), color: 'text-[#B12B28]' },
                      { label: 'Total Rental Income', value: formatCurrency(totalRentalIncome), color: 'text-white' },
                      { label: 'Total Profit', value: formatCurrency(totalProfit), color: 'text-white' }
                    ].map((item, i) => (
                      <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-10 group hover:bg-white/10 transition-all duration-500">
                        <p className="text-white/40 text-[11px] tracking-[0.4em] uppercase font-black mb-4">{item.label}</p>
                        <p className={`text-4xl font-display font-black tracking-tighter ${item.color}`}>{item.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* ROI Highlight */}
                  <div className="bg-[#B12B28] p-12 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div>
                      <p className="text-white/60 text-[12px] tracking-[0.4em] uppercase font-black mb-2">Total ROI over {holdingPeriod} years</p>
                      <h2 className="text-7xl font-display font-black text-white tracking-tighter">{totalROI.toFixed(1)}%</h2>
                    </div>
                    <button 
                      onClick={() => setIsExportModalOpen(true)}
                      className="bg-white text-black px-10 py-5 text-[12px] tracking-[0.4em] uppercase font-black hover:bg-black hover:text-white transition-all duration-500 flex items-center gap-3"
                    >
                      <Download className="w-4 h-4" /> Export Report
                    </button>
                  </div>

                  {/* Charts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
                    <div className="bg-white/5 p-8 border border-white/10">
                      <h4 className="text-[12px] tracking-[0.4em] uppercase font-black text-white/40 mb-10">Future Value Growth</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chartData}>
                            <defs>
                              <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#B12B28" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#B12B28" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={10} />
                            <YAxis hide />
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid rgba(255,255,255,0.1)', fontSize: '10px' }}
                              itemStyle={{ color: '#B12B28' }}
                            />
                            <Area type="monotone" dataKey="value" stroke="#B12B28" fillOpacity={1} fill="url(#colorVal)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="bg-white/5 p-8 border border-white/10">
                      <h4 className="text-[12px] tracking-[0.4em] uppercase font-black text-white/40 mb-10">Profit Breakdown</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid rgba(255,255,255,0.1)', fontSize: '10px' }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex justify-center gap-8 mt-4">
                        {pieData.map((entry, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-2 h-2" style={{ backgroundColor: COLORS[i] }}></div>
                            <span className="text-[8px] tracking-widest uppercase text-white/40">{entry.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Lead Capture */}
                  <div className="bg-white p-16 mt-24">
                    <div className="max-w-xl mx-auto text-center">
                      <h3 className="text-black font-display font-black text-4xl tracking-tighter uppercase mb-6">Want the best property deals in Dubai?</h3>
                      <p className="text-black/50 text-sm font-light mb-12">Our AI-driven platform identifies high-yield opportunities before they hit the open market.</p>
                      
                      <form className="space-y-6" onSubmit={(e) => {
                        e.preventDefault();
                        const target = e.target as any;
                        const name = target[0].value;
                        const phone = target[1].value;
                        const email = target[2].value;
                        const subject = `Investment Deal Request from ${name}`;
                        const body = `Investment Deal Request:\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nROI Parameters:\nPrice: ${price}\nYield: ${netYield.toFixed(2)}%`;
                        window.location.href = `mailto:info@rock-deals.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                      }}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                            <input required type="text" placeholder="Full Name" className="w-full bg-gray-50 border border-gray-100 py-4 pl-12 pr-4 text-black outline-none focus:border-[#B12B28]" />
                          </div>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                            <input required type="tel" placeholder="Phone Number" className="w-full bg-gray-50 border border-gray-100 py-4 pl-12 pr-4 text-black outline-none focus:border-[#B12B28]" />
                          </div>
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                          <input required type="email" placeholder="Email Address" className="w-full bg-gray-50 border border-gray-100 py-4 pl-12 pr-4 text-black outline-none focus:border-[#B12B28]" />
                        </div>
                        <button type="submit" className="w-full bg-[#B12B28] text-white py-6 text-[12px] tracking-[0.4em] uppercase font-black hover:bg-black transition-all duration-500">
                          Get Investment Deals
                        </button>
                      </form>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-24 border border-white/5 bg-white/[0.02]">
                  <Calculator className="w-16 h-16 text-white/10 mb-8" />
                  <h3 className="text-white/20 font-display font-black text-2xl tracking-tight uppercase mb-4">Ready to analyze?</h3>
                  <p className="text-white/10 text-sm max-w-xs">Adjust the parameters on the left and click calculate to see your potential returns.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Export Modal */}
      <AnimatePresence>
        {isExportModalOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExportModalOpen(false)}
              className="absolute inset-0 bg-dark/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] p-10 md:p-12 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-porsche-red" />
              <button 
                onClick={() => setIsExportModalOpen(false)}
                className="absolute top-6 right-6 text-dark/20 hover:text-dark transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-10">
                <p className="text-porsche-red text-[10px] tracking-[0.5em] uppercase font-black mb-4">Secure Export</p>
                <h2 className="text-4xl font-display font-black text-dark tracking-tighter uppercase leading-none">
                  Get Your<br />
                  <span className="text-porsche-red">Full Report.</span>
                </h2>
                <p className="mt-4 text-dark/40 text-sm font-light leading-relaxed">
                  Enter your details to receive the professional investment analysis via PDF, Email, and WhatsApp.
                </p>
              </div>

              <form onSubmit={handleExport} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black tracking-widest uppercase text-dark/40 mb-3 ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-porsche-red" />
                    <input 
                      required
                      type="text" 
                      value={exportForm.name}
                      onChange={(e) => setExportForm({...exportForm, name: e.target.value})}
                      placeholder="John Doe"
                      className="w-full bg-gray-50 border-b-2 border-gray-100 py-5 pl-14 pr-6 text-dark font-technical font-bold focus:border-porsche-red outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black tracking-widest uppercase text-dark/40 mb-3 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-porsche-red" />
                    <input 
                      required
                      type="email" 
                      value={exportForm.email}
                      onChange={(e) => setExportForm({...exportForm, email: e.target.value})}
                      placeholder="john@example.com"
                      className="w-full bg-gray-50 border-b-2 border-gray-100 py-5 pl-14 pr-6 text-dark font-technical font-bold focus:border-porsche-red outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black tracking-widest uppercase text-dark/40 mb-3 ml-1">Mobile Number</label>
                  <div className="relative">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-porsche-red" />
                    <input 
                      required
                      type="tel" 
                      value={exportForm.mobile}
                      onChange={(e) => setExportForm({...exportForm, mobile: e.target.value})}
                      placeholder="+971 50 000 0000"
                      className="w-full bg-gray-50 border-b-2 border-gray-100 py-5 pl-14 pr-6 text-dark font-technical font-bold focus:border-porsche-red outline-none transition-all"
                    />
                  </div>
                </div>

                <button 
                  disabled={isExporting}
                  type="submit"
                  className="w-full bg-porsche-red text-white py-6 text-[12px] font-black tracking-[0.4em] uppercase shadow-[0_20px_40px_rgba(213,0,28,0.2)] hover:bg-dark transition-all duration-500 disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {isExporting ? (
                    <>Generating...</>
                  ) : (
                    <>
                      <Download className="w-4 h-4" /> Generate Report
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const JourneyStep = ({ number, title, description, index }: { number: string; title: string; description: string; index: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay: index * 0.1 }}
    className="flex-shrink-0 w-[300px] lg:flex-1 flex flex-col items-center text-center px-6 relative group"
  >
    {/* Phase Label */}
    <div className="h-12 flex items-center justify-center mb-6">
      <span className="text-porsche-red text-[12px] tracking-[0.6em] font-black uppercase opacity-60 group-hover:opacity-100 transition-opacity duration-500">Phase {number}</span>
    </div>
    
    {/* Node Container */}
    <div className="relative flex flex-col items-center mb-14 h-16 w-full">
      <div className="w-16 h-16 bg-white border border-dark/5 flex items-center justify-center z-10 shadow-2xl group-hover:border-porsche-red/30 transition-colors duration-500">
        <div className="w-4 h-4 bg-dark group-hover:bg-porsche-red transition-all duration-700 group-hover:rotate-45"></div>
      </div>
      
      {/* Technical Coordinates */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span className="text-[8px] font-mono text-dark/10 tracking-[0.5em] uppercase group-hover:text-porsche-red/20 transition-colors duration-500">NODE_REF_0{number}</span>
      </div>
    </div>

    {/* Content */}
    <h3 className="text-dark font-display font-black text-2xl mb-6 tracking-tighter uppercase leading-none min-h-[3rem] flex items-center justify-center group-hover:text-porsche-red transition-colors duration-500">{title}</h3>
    <p className="text-dark/40 text-sm leading-relaxed font-light max-w-[240px] group-hover:text-dark/60 transition-colors duration-500">
      {description}
    </p>
  </motion.div>
);

const ZONES = [
  {
    id: 'palm-jumeirah',
    name: 'Palm Jumeirah',
    areas: ['The Fronds', 'The Crescent', 'Golden Mile', 'Atlantis'],
    yield: '7.2%',
    pricePerSqft: '3,200 AED',
    description: 'The world\'s most famous man-made island, offering ultra-luxury villas and high-end apartments with private beach access.',
    image: 'https://images.unsplash.com/photo-1549944850-84e00be4203b?auto=format&fit=crop&q=80&w=800',
    coords: { x: '22%', y: '62%' },
    link: 'https://www.bayut.com/mybayut/dubai-sales-market-report-h1-2023/'
  },
  {
    id: 'marina',
    name: 'Dubai Marina',
    areas: ['Dubai Marina', 'JBR', 'Blue Waters', 'Marsa Dubai'],
    yield: '7.8%',
    pricePerSqft: '2,100 AED',
    description: 'A vibrant waterfront community known for its high-rise towers, luxury yachts, and a bustling promenade with world-class dining.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
    coords: { x: '32%', y: '74%' },
    link: 'https://www.bayut.com/mybayut/dubai-sales-market-report-h1-2023/'
  },
  {
    id: 'downtown',
    name: 'Downtown Dubai',
    areas: ['Burj Khalifa', 'Dubai Mall', 'Old Town', 'The Address'],
    yield: '6.5%',
    pricePerSqft: '2,800 AED',
    description: 'The heart of the city, home to the Burj Khalifa and Dubai Mall. Offers premium urban living with iconic views and unmatched convenience.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',
    coords: { x: '63%', y: '52%' },
    link: 'https://www.bayut.com/mybayut/dubai-sales-market-report-h1-2023/'
  },
  {
    id: 'business-bay',
    name: 'Business Bay',
    areas: ['Executive Towers', 'Bay Square', 'Marasi Drive'],
    yield: '7.4%',
    pricePerSqft: '1,850 AED',
    description: 'A major business district with a mix of commercial and residential towers, offering a cosmopolitan lifestyle along the Dubai Canal.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
    coords: { x: '66%', y: '58%' },
    link: 'https://www.bayut.com/mybayut/dubai-sales-market-report-h1-2023/'
  },
  {
    id: 'creek-harbour',
    name: 'Creek Harbour',
    areas: ['Creek Island', 'The Island District', 'Creek Beach'],
    yield: '8.1%',
    pricePerSqft: '1,950 AED',
    description: 'A sustainable waterfront community offering a mix of residential, commercial, and retail spaces with stunning views of the Dubai skyline.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
    coords: { x: '78%', y: '48%' },
    link: 'https://www.bayut.com/mybayut/dubai-sales-market-report-h1-2023/'
  },
  {
    id: 'hills-estate',
    name: 'Dubai Hills Estate',
    areas: ['Sidra', 'Maple', 'Park Heights', 'Golf Grove'],
    yield: '6.8%',
    pricePerSqft: '1,650 AED',
    description: 'A master-planned community centered around an 18-hole championship golf course, offering a serene and family-friendly environment.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
    coords: { x: '58%', y: '68%' },
    link: 'https://www.bayut.com/mybayut/dubai-sales-market-report-h1-2023/'
  },
  {
    id: 'arabian-ranches',
    name: 'Arabian Ranches',
    areas: ['Ranches 1', 'Ranches 2', 'Ranches 3'],
    yield: '6.2%',
    pricePerSqft: '1,450 AED',
    description: 'A premium gated community offering a range of villas and townhouses, known for its lush greenery and world-class amenities.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
    coords: { x: '45%', y: '78%' },
    link: 'https://www.bayut.com/mybayut/dubai-sales-market-report-h1-2023/'
  },
  {
    id: 'jumeirah-beach',
    name: 'Jumeirah Beach',
    areas: ['JBR', 'La Mer', 'Pearl Jumeirah'],
    yield: '7.0%',
    pricePerSqft: '2,400 AED',
    description: 'A prime coastal area offering luxury beachfront living with a mix of residential and leisure destinations.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
    coords: { x: '50%', y: '45%' },
    link: 'https://www.bayut.com/mybayut/dubai-sales-market-report-h1-2023/'
  },
  {
    id: 'bur-dubai',
    name: 'Bur Dubai',
    areas: ['Al Mankhool', 'Al Karama', 'Oud Metha'],
    yield: '7.9%',
    pricePerSqft: '1,250 AED',
    description: 'A historic district known for its cultural landmarks, traditional architecture, and vibrant community life.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
    coords: { x: '65%', y: '45%' },
    link: 'https://www.bayut.com/mybayut/dubai-sales-market-report-h1-2023/'
  },
  {
    id: 'deira',
    name: 'Deira',
    areas: ['Al Rigga', 'Al Muraqqabat', 'Naif'],
    yield: '8.5%',
    pricePerSqft: '1,100 AED',
    description: 'One of the oldest parts of Dubai, Deira is a bustling commercial hub with a rich cultural heritage and a variety of traditional souks.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
    coords: { x: '80%', y: '38%' },
    link: 'https://www.bayut.com/mybayut/dubai-sales-market-report-h1-2023/'
  }
];

const DubaiMap = ({ onSearch }: { onSearch?: (filter: string) => void }) => {
  const [activeZone, setActiveZone] = useState(ZONES[3]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      {/* Interactive SVG Map */}
      <div className="lg:col-span-7 relative aspect-[4/3] bg-white/5 border border-white/10 overflow-hidden group">
        {/* Scanning Line Effect */}
        <motion.div 
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 bottom-0 w-48 bg-gradient-to-r from-transparent via-porsche-red/10 to-transparent skew-x-12 pointer-events-none z-20"
        />

        <div className="w-full h-full relative overflow-hidden">
          <motion.img 
            src="https://storage.googleapis.com/birdview-public-assets/projects/ais-dev-x2tn27z2sm6defbgavbyxz-632468988127/assets/map_image.png" 
            alt="Dubai Map"
            className="w-full h-full object-cover opacity-90 scale-105 origin-center"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.9, scale: 1.05 }}
            transition={{ duration: 1.5 }}
          />
          {/* Technical Overlay Grid */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
          
          {/* Red Glowing Road Effect (Simulated) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-porsche-red/5 via-transparent to-porsche-red/5 pointer-events-none" />

          {/* Masking the logo in bottom right */}
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-dark/90 blur-3xl pointer-events-none z-20" />
          
          <svg viewBox="0 0 800 600" className="absolute inset-0 w-full h-full z-10 pointer-events-none">
            {/* Technical Crosshair Overlay */}
            <line x1="0" y1="300" x2="800" y2="300" stroke="rgba(213,0,28,0.05)" strokeWidth="0.5" />
            <line x1="400" y1="0" x2="400" y2="600" stroke="rgba(213,0,28,0.05)" strokeWidth="0.5" />
            
            {/* Zone Hotspots */}
            {ZONES.map((zone) => (
              <g 
                key={zone.id} 
                className="cursor-pointer group/zone pointer-events-auto"
                onClick={() => setActiveZone(zone)}
              >
                {/* Pulsing Aura */}
                <motion.circle
                  cx={zone.coords.x}
                  cy={zone.coords.y}
                  r="12"
                  fill="rgba(213,0,28,0.1)"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Zone Marker */}
                <motion.circle
                  cx={zone.coords.x}
                  cy={zone.coords.y}
                  r="6"
                  fill={activeZone.id === zone.id ? "#d5001c" : "rgba(255,255,255,0.4)"}
                  whileHover={{ scale: 2.5, fill: "#d5001c" }}
                  transition={{ duration: 0.4 }}
                  className="shadow-[0_0_20px_rgba(213,0,28,0.5)]"
                />

                {/* Technical Crosshair for Active Zone */}
                {activeZone.id === zone.id && (
                  <g>
                    <line x1={parseFloat(zone.coords.x) - 10 + '%'} y1={zone.coords.y} x2={parseFloat(zone.coords.x) + 10 + '%'} y2={zone.coords.y} stroke="#d5001c" strokeWidth="0.5" strokeDasharray="2 2" />
                    <line x1={zone.coords.x} y1={parseFloat(zone.coords.y) - 10 + '%'} x2={zone.coords.x} y2={parseFloat(zone.coords.y) + 10 + '%'} stroke="#d5001c" strokeWidth="0.5" strokeDasharray="2 2" />
                  </g>
                )}
                
                {/* Zone Label */}
                <text
                  x={zone.coords.x}
                  y={parseFloat(zone.coords.y) - 18 + '%'}
                  textAnchor="middle"
                  className={`text-[8px] font-technical font-black tracking-[0.3em] uppercase transition-all duration-500 ${activeZone.id === zone.id ? 'opacity-100 fill-white text-[12px] glow-porsche' : 'opacity-40 fill-white/40 group-hover/zone:opacity-100 group-hover/zone:fill-white'}`}
                >
                  {zone.name}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Technical Data Overlays */}
        <div className="absolute top-10 left-10 flex flex-col gap-6">
          <div className="flex flex-col">
            <span className="text-[6px] font-mono text-white/20 tracking-[0.6em] uppercase mb-2">Telemetry_Stream</span>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-porsche-red animate-pulse"></div>
              <span className="text-[12px] font-mono text-white/50 tracking-[0.2em] uppercase">LAT: 25.2048° N</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-porsche-red animate-pulse delay-75"></div>
              <span className="text-[12px] font-mono text-white/50 tracking-[0.2em] uppercase">LNG: 55.2708° E</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 text-right">
          <span className="text-[6px] font-mono text-white/20 tracking-[0.6em] uppercase block mb-3">Map_Revision: 2026.04</span>
          <div className="h-px w-32 bg-white/10 ml-auto"></div>
        </div>
      </div>

      {/* Zone Details Panel */}
      <div className="lg:col-span-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeZone.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-4 mb-6 md:mb-10">
              <div className="w-3 h-3 bg-porsche-red"></div>
              <span className="text-white/30 text-[11px] tracking-[0.6em] font-black uppercase">Zone_Intelligence_Report</span>
            </div>

            <h3 className="text-6xl md:text-8xl font-display font-black text-white mb-6 md:mb-10 tracking-tighter leading-[0.85] uppercase">
              {activeZone.name.split(' ').map((word, i) => (
                <span key={i} className={i === 0 ? 'block' : 'block text-porsche-red'}>{word}</span>
              ))}
            </h3>

            <p className="text-white/50 text-lg leading-relaxed font-light mb-10 md:mb-16 max-w-lg">
              {activeZone.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/5 mb-10 md:mb-16 border border-white/5">
              <div className="bg-dark p-6 md:p-10">
                <span className="text-white/20 text-[8px] tracking-[0.5em] uppercase font-technical font-bold block mb-4">Yield_Index</span>
                <span className="text-white font-display font-black text-5xl tracking-tighter">{activeZone.yield}</span>
              </div>
              <div className="bg-dark p-6 md:p-10">
                <span className="text-white/20 text-[8px] tracking-[0.5em] uppercase font-technical font-bold block mb-4">Price_Per_Sqft</span>
                <span className="text-white font-display font-black text-4xl tracking-tighter">{activeZone.pricePerSqft}</span>
              </div>
              <div className="bg-dark p-6 md:p-10 col-span-2 md:col-span-1">
                <span className="text-white/20 text-[8px] tracking-[0.5em] uppercase font-technical font-bold block mb-4">District_Count</span>
                <span className="text-white font-display font-black text-5xl tracking-tighter">{activeZone.areas.length}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8 mb-10 md:mb-16">
              <motion.a 
                href="#property-types"
                onClick={() => onSearch?.('All Properties')}
                whileHover={{ x: 20 }}
                className="group flex items-center gap-8 text-white text-[12px] tracking-[0.5em] font-technical font-bold uppercase"
              >
                <span className="group-hover:text-porsche-red transition-colors">Initialize Search</span>
                <div className="w-16 h-[1px] bg-white/10 group-hover:bg-porsche-red group-hover:w-24 transition-all duration-700"></div>
                <ArrowRight className="w-5 h-5 text-porsche-red" />
              </motion.a>

              <motion.a 
                href={activeZone.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 20 }}
                className="group flex items-center gap-8 text-white/40 text-[12px] tracking-[0.5em] font-technical font-bold uppercase"
              >
                <span className="group-hover:text-white transition-colors">Market Report</span>
                <div className="w-16 h-[1px] bg-white/5 group-hover:bg-white/20 group-hover:w-24 transition-all duration-700"></div>
                <ArrowRight className="w-5 h-5 text-white/20" />
              </motion.a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const PROPERTIES = [
  { id: 1, title: 'Luxury Palm Villa | Dubai Best Deal', category: 'Luxury Villas', price: 'AED 45,000,000', location: 'Palm Jumeirah', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Skyline Penthouse | High ROI Investment', category: 'Penthouses', price: 'AED 28,500,000', location: 'Downtown Dubai', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Marina Edge | Apartments for Sale in Dubai', category: 'Apartments', price: 'AED 4,200,000', location: 'Dubai Marina', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'Desert Rose | Villas for Sale in Dubai', category: 'Townhouses', price: 'AED 3,800,000', location: 'Arabian Ranches', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800' },
  { id: 5, title: 'Crystal Tower | Dubai Off Plan Properties', category: 'Off-Plan', price: 'Starting AED 1,500,000', location: 'Business Bay', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800' },
  { id: 6, title: 'Modern Creek | Ready to Move Property', category: 'Ready to Move', price: 'AED 2,100,000', location: 'Dubai Creek Harbour', image: 'https://images.unsplash.com/photo-1600607687940-47a0f9259d4b?auto=format&fit=crop&q=80&w=800' },
  { id: 7, title: 'Azure Waterfront | Dubai Distress Deals', category: 'Luxury Villas', price: 'AED 32,000,000', location: 'Jumeirah Bay', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800' },
];

const COMMUNITIES = [
  {
    id: 'jvc',
    name: 'Jumeirah Village Circle',
    tagline: 'Family-Centric Urban Living',
    description: 'Jumeirah Village Circle (JVC) is one of Dubai\'s most popular family-friendly communities. Developed by Nakheel, it offers a serene lifestyle with a mix of modern apartments, villas, and townhouses surrounded by lush greenery and over 30 landscaped parks.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop',
    roi: '7.5% - 8.2%',
    avgPrice: '1,200 AED/sqft',
    highlights: [
      'Over 30 Landscaped Parks',
      'Circle Mall Shopping Hub',
      'Family-Oriented Atmosphere',
      'High Rental Demand'
    ],
    amenities: [
      { name: 'Education', detail: 'JSS International School, Sunmarke School' },
      { name: 'Healthcare', detail: 'Right Health JVC, Magnum Family Medical Center' },
      { name: 'Retail', detail: 'Circle Mall, Spinneys, Choithrams' },
      { name: 'Leisure', detail: 'Five JVC Hotel, Community Parks, Fitness Centers' }
    ],
    connectivity: [
      { point: 'Dubai Marina', time: '15 Mins' },
      { point: 'Downtown Dubai', time: '20 Mins' },
      { point: 'DXB Airport', time: '30 Mins' }
    ]
  },
  {
    id: 'downtown',
    name: 'Downtown Dubai',
    tagline: 'The Center of Now',
    description: 'Home to the iconic Burj Khalifa and Dubai Mall, Downtown Dubai is the city\'s most prestigious square kilometer. It offers an unparalleled urban lifestyle with luxury high-rises, world-class dining, and the spectacular Dubai Fountain.',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1974&auto=format&fit=crop',
    roi: '5.5% - 6.5%',
    avgPrice: '2,800 AED/sqft',
    highlights: [
      'Burj Khalifa & Dubai Mall',
      'Dubai Opera District',
      'Premium Luxury Living',
      'Iconic Landmark Views'
    ],
    amenities: [
      { name: 'Education', detail: 'Hartland International, Dubai Modern High' },
      { name: 'Healthcare', detail: 'Mediclinic Dubai Mall, Emirates Hospital' },
      { name: 'Retail', detail: 'The Dubai Mall, Souk Al Bahar' },
      { name: 'Leisure', detail: 'Burj Park, Fountain Shows, Fine Dining' }
    ],
    connectivity: [
      { point: 'Dubai Marina', time: '20 Mins' },
      { point: 'DXB Airport', time: '15 Mins' },
      { point: 'DIFC', time: '5 Mins' }
    ]
  },
  {
    id: 'marina',
    name: 'Dubai Marina',
    tagline: 'Waterfront Sophistication',
    description: 'Dubai Marina is a stunning man-made canal city, famous for its glittering skyline and vibrant waterfront lifestyle. It\'s a top choice for professionals and expats seeking high-rise living with immediate access to the beach and Marina Walk.',
    image: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=2070&auto=format&fit=crop',
    roi: '6.8% - 7.4%',
    avgPrice: '1,900 AED/sqft',
    highlights: [
      '7km Waterfront Promenade',
      'Marina Mall & Yacht Club',
      'Proximity to JBR Beach',
      'Vibrant Nightlife'
    ],
    amenities: [
      { name: 'Education', detail: 'Emirates International School' },
      { name: 'Healthcare', detail: 'Marina Medical Center, King\'s College' },
      { name: 'Retail', detail: 'Dubai Marina Mall, Waitrose' },
      { name: 'Leisure', detail: 'Yacht Club, Skydiving, Beach Clubs' }
    ],
    connectivity: [
      { point: 'Downtown Dubai', time: '20 Mins' },
      { point: 'Palm Jumeirah', time: '10 Mins' },
      { point: 'DWC Airport', time: '25 Mins' }
    ]
  },
  {
    id: 'business-bay',
    name: 'Business Bay',
    tagline: 'The Corporate & Residential Hub',
    description: 'Strategically located next to Downtown, Business Bay is a fast-evolving district that blends commercial power with luxury residential living. With the Dubai Canal flowing through it, it offers unique waterfront views and high-end amenities.',
    image: 'https://images.unsplash.com/photo-1549944850-84e00be4203b?q=80&w=2070&auto=format&fit=crop',
    roi: '6.5% - 7.2%',
    avgPrice: '1,750 AED/sqft',
    highlights: [
      'Dubai Canal Waterfront',
      'Proximity to DIFC & Downtown',
      'Modern Architectural Icons',
      'High Capital Appreciation'
    ],
    amenities: [
      { name: 'Education', detail: 'Dubai International School' },
      { name: 'Healthcare', detail: 'Emirates Hospital, Aster Clinic' },
      { name: 'Retail', detail: 'Bay Avenue Mall, Executive Towers' },
      { name: 'Leisure', detail: 'Canal Walk, La Perle, Luxury Hotels' }
    ],
    connectivity: [
      { point: 'Downtown Dubai', time: '5 Mins' },
      { point: 'DXB Airport', time: '15 Mins' },
      { point: 'Jumeirah Beach', time: '10 Mins' }
    ]
  },
  {
    id: 'palm-jumeirah',
    name: 'Palm Jumeirah',
    tagline: 'The Eighth Wonder of the World',
    description: 'Palm Jumeirah is the world\'s largest man-made island and a global icon of luxury. It features ultra-luxury villas, high-end apartments, and some of the world\'s finest hotels, including Atlantis The Royal. It offers a truly unique beachfront lifestyle.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
    roi: '4.5% - 5.5%',
    avgPrice: '4,500 AED/sqft',
    highlights: [
      'Iconic Palm-Shaped Island',
      'Private Beach Access',
      'World-Class Luxury Resorts',
      'High Capital Appreciation'
    ],
    amenities: [
      { name: 'Education', detail: 'Asya\'s Nursery, Redwood Montessori' },
      { name: 'Healthcare', detail: 'Al Das Medical Clinic, Emirates Hospital' },
      { name: 'Retail', detail: 'Nakheel Mall, The Pointe' },
      { name: 'Leisure', detail: 'Atlantis, Aquaventure, Beach Clubs' }
    ],
    connectivity: [
      { point: 'Dubai Marina', time: '10 Mins' },
      { point: 'Downtown Dubai', time: '20 Mins' },
      { point: 'DXB Airport', time: '30 Mins' }
    ]
  },
  {
    id: 'creek-harbour',
    name: 'Dubai Creek Harbour',
    tagline: 'The Future of Dubai',
    description: 'Dubai Creek Harbour is a massive waterfront development that blends modern living with nature. Home to the Ras Al Khor Wildlife Sanctuary and the future Creek Tower, it offers a sustainable and smart urban environment with stunning skyline views.',
    image: 'https://images.unsplash.com/photo-1600607687940-47a0f9259d4b?q=80&w=2070&auto=format&fit=crop',
    roi: '6.2% - 7.0%',
    avgPrice: '1,850 AED/sqft',
    highlights: [
      'Ras Al Khor Wildlife Sanctuary',
      'Creek Marina & Yacht Club',
      'Future Iconic Creek Tower',
      'Sustainable Urban Design'
    ],
    amenities: [
      { name: 'Education', detail: 'Swiss International Scientific School' },
      { name: 'Healthcare', detail: 'Mediclinic, Aster Clinic' },
      { name: 'Retail', detail: 'Dubai Square (Future), Creek Marina Retail' },
      { name: 'Leisure', detail: 'Viewing Point, Central Park, Yacht Club' }
    ],
    connectivity: [
      { point: 'Downtown Dubai', time: '10 Mins' },
      { point: 'DXB Airport', time: '15 Mins' },
      { point: 'Dubai Marina', time: '25 Mins' }
    ]
  },
  {
    id: 'dubai-hills',
    name: 'Dubai Hills Estate',
    tagline: 'The Green Heart of Dubai',
    description: 'Dubai Hills Estate is a master-planned community centered around an 18-hole championship golf course. It offers a mix of luxury villas, townhouses, and apartments, along with a massive central park and the Dubai Hills Mall.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2070&auto=format&fit=crop',
    roi: '6.5% - 7.5%',
    avgPrice: '1,650 AED/sqft',
    highlights: [
      'Championship Golf Course',
      'Dubai Hills Mall',
      '1.4 Million Sqm Central Park',
      'Top International Schools'
    ],
    amenities: [
      { name: 'Education', detail: 'GEMS Wellington Academy, GEMS New Millennium' },
      { name: 'Healthcare', detail: 'King\'s College Hospital London' },
      { name: 'Retail', detail: 'Dubai Hills Mall' },
      { name: 'Leisure', detail: 'Golf Club, Splash Park, Ice Rink' }
    ],
    connectivity: [
      { point: 'Downtown Dubai', time: '15 Mins' },
      { point: 'Dubai Marina', time: '15 Mins' },
      { point: 'DXB Airport', time: '20 Mins' }
    ]
  },
  {
    id: 'palm-jebel-ali',
    name: 'Palm Jebel Ali',
    tagline: 'The Future of Island Living',
    description: 'Palm Jebel Ali is the next frontier of luxury in Dubai. Twice the size of Palm Jumeirah, this mega-project will feature over 80 hotels and resorts, pristine beaches, and ultra-luxury villas. It is set to become a global destination for waterfront living.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2070&auto=format&fit=crop',
    roi: '7.0% - 8.5%',
    avgPrice: '3,200 AED/sqft',
    highlights: [
      'Twice the Size of Palm Jumeirah',
      '110km of New Coastline',
      '80+ Hotels & Resorts',
      'Ultra-Luxury Signature Villas'
    ],
    amenities: [
      { name: 'Education', detail: 'Planned International Schools' },
      { name: 'Healthcare', detail: 'Premium Medical Centers' },
      { name: 'Retail', detail: 'Luxury Malls & Boutiques' },
      { name: 'Leisure', detail: 'Theme Parks, Marinas, Beach Clubs' }
    ],
    connectivity: [
      { point: 'Dubai Marina', time: '15 Mins' },
      { point: 'DWC Airport', time: '15 Mins' },
      { point: 'Downtown Dubai', time: '30 Mins' }
    ]
  },
  {
    id: 'dubai-south',
    name: 'Dubai South',
    tagline: 'The City of You',
    description: 'Dubai South is a massive 145 sqkm city-within-a-city, home to the Al Maktoum International Airport and the Expo City Dubai. It is designed to be a sustainable urban hub with a focus on logistics, aviation, and high-quality residential living.',
    image: 'https://images.unsplash.com/photo-1549944850-84e00be4203b?q=80&w=2070&auto=format&fit=crop',
    roi: '7.5% - 9.0%',
    avgPrice: '950 AED/sqft',
    highlights: [
      'Home to Al Maktoum Airport',
      'Expo City Dubai Proximity',
      'Future Global Logistics Hub',
      'High Rental Yields'
    ],
    amenities: [
      { name: 'Education', detail: 'Dove Green Private School' },
      { name: 'Healthcare', detail: 'NMC Royal Hospital' },
      { name: 'Retail', detail: 'Dubai South Mall (Planned)' },
      { name: 'Leisure', detail: 'Expo City, Golf Courses, Parks' }
    ],
    connectivity: [
      { point: 'DWC Airport', time: '5 Mins' },
      { point: 'Dubai Marina', time: '20 Mins' },
      { point: 'Downtown Dubai', time: '35 Mins' }
    ]
  },
  {
    id: 'arabian-ranches',
    name: 'Arabian Ranches III',
    tagline: 'The Ultimate Family Destination',
    description: 'Arabian Ranches III is a premium gated community designed for family living. It offers a wide range of townhouses and villas with private gardens, surrounded by lush green parks and world-class amenities.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    roi: '5.8% - 6.5%',
    avgPrice: '1,450 AED/sqft',
    highlights: [
      'Gated Family Community',
      'Central Park & Sports Facilities',
      'Lazy River & Clubhouse',
      'High Capital Appreciation'
    ],
    amenities: [
      { name: 'Education', detail: 'Ranches Primary School, JESS' },
      { name: 'Healthcare', detail: 'Aster Clinic, Mediclinic' },
      { name: 'Retail', detail: 'The Ranches Souk' },
      { name: 'Leisure', detail: 'Golf Club, Polo Club, Parks' }
    ],
    connectivity: [
      { point: 'Downtown Dubai', time: '20 Mins' },
      { point: 'DXB Airport', time: '25 Mins' },
      { point: 'Global Village', time: '5 Mins' }
    ]
  },
  {
    id: 'tilal-al-ghaf',
    name: 'Tilal Al Ghaf',
    tagline: 'Resort Living Reimagined',
    description: 'Tilal Al Ghaf is a flagship mixed-use community by Majid Al Futtaim. Centered around a stunning crystal lagoon (Lagoon Al Ghaf), it offers luxury villas and townhouses with a focus on wellness and outdoor living.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2070&auto=format&fit=crop',
    roi: '6.5% - 7.2%',
    avgPrice: '1,800 AED/sqft',
    highlights: [
      'Crystal Lagoon & Sandy Beaches',
      'Majid Al Futtaim Quality',
      'Wellness-Focused Design',
      'Premium Luxury Villas'
    ],
    amenities: [
      { name: 'Education', detail: 'Royal Grammar School Guildford' },
      { name: 'Healthcare', detail: 'Burjeel Hospital, Mediclinic' },
      { name: 'Retail', detail: 'City Centre Me\'aisem' },
      { name: 'Leisure', detail: 'Beach Club, Water Sports, Parks' }
    ],
    connectivity: [
      { point: 'Dubai Marina', time: '15 Mins' },
      { point: 'Downtown Dubai', time: '20 Mins' },
      { point: 'DXB Airport', time: '30 Mins' }
    ]
  },
  {
    id: 'mbr-city',
    name: 'MBR City (Meydan)',
    tagline: 'The Heart of Modern Dubai',
    description: 'Mohammed Bin Rashid City (MBR City) is one of the largest mixed-use developments in Dubai. Home to the Meydan Racecourse and the future Meydan One Mall, it offers luxury villas and apartments in a prime location.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop',
    roi: '6.8% - 7.5%',
    avgPrice: '1,950 AED/sqft',
    highlights: [
      'Meydan Racecourse & Grandstand',
      'Future Meydan One Mall',
      'Crystal Lagoons & Parks',
      'Ultra-Luxury Mansions'
    ],
    amenities: [
      { name: 'Education', detail: 'North London Collegiate School' },
      { name: 'Healthcare', detail: 'Emirates Hospital, Mediclinic' },
      { name: 'Retail', detail: 'Meydan One Mall (Planned)' },
      { name: 'Leisure', detail: 'Golf Course, Tennis Academy, Canal' }
    ],
    connectivity: [
      { point: 'Downtown Dubai', time: '5 Mins' },
      { point: 'DXB Airport', time: '15 Mins' },
      { point: 'DIFC', time: '10 Mins' }
    ]
  },
  {
    id: 'jlt',
    name: 'Jumeirah Lake Towers',
    tagline: 'The Professional Lifestyle Hub',
    description: 'JLT is a vibrant community consisting of 80 towers built around three man-made lakes. It is a popular choice for professionals and families seeking high-rise living with a wide range of dining, retail, and leisure options.',
    image: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=2070&auto=format&fit=crop',
    roi: '7.2% - 8.0%',
    avgPrice: '1,400 AED/sqft',
    highlights: [
      'Vibrant Lakefront Living',
      'DMCC Free Zone Hub',
      'Over 600 Dining Outlets',
      'Excellent Metro Connectivity'
    ],
    amenities: [
      { name: 'Education', detail: 'Emirates International School' },
      { name: 'Healthcare', detail: 'Life Medical Center, Aster' },
      { name: 'Retail', detail: 'Marina Mall (Nearby), Spinneys' },
      { name: 'Leisure', detail: 'JLT Park, Fitness Centers, Bars' }
    ],
    connectivity: [
      { point: 'Dubai Marina', time: '5 Mins' },
      { point: 'Downtown Dubai', time: '20 Mins' },
      { point: 'DXB Airport', time: '30 Mins' }
    ]
  }
];

const AreaGuide = ({ onBack }: { onBack: () => void }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedCommunity = COMMUNITIES.find(c => c.id === selectedId);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-porsche-red">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5">
        <div className="px-6 md:px-12 lg:px-24 py-6 flex items-center justify-between">
          <button 
            onClick={() => selectedId ? setSelectedId(null) : onBack()}
            className="group flex items-center gap-3 text-white/40 hover:text-porsche-red transition-colors"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[12px] font-black tracking-[0.3em] uppercase">
              {selectedId ? 'Back to Communities' : 'Return Home'}
            </span>
          </button>
          <div className="flex items-baseline gap-1">
            <span className="text-white font-display font-black text-2xl tracking-tighter">ROCK</span>
            <span className="text-white/40 font-display font-light text-2xl tracking-tighter">DEALS</span>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!selectedId ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-16">
                <p className="text-porsche-red text-[12px] tracking-[0.5em] uppercase font-black mb-6">Area Guide</p>
                <h1 className="text-6xl md:text-8xl font-display font-black text-white tracking-tighter leading-none uppercase">
                  Explore Dubai<br />
                  <span className="text-porsche-red">Communities.</span>
                </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {COMMUNITIES.map((community) => (
                  <motion.div
                    key={community.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedId(community.id)}
                    className="group relative h-[400px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl"
                  >
                    <img 
                      src={community.image} 
                      alt={community.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                    <div className="absolute bottom-10 left-10 right-10">
                      <p className="text-porsche-red text-[10px] font-black tracking-[0.4em] uppercase mb-2">{community.tagline}</p>
                      <h3 className="text-4xl font-display font-black text-white uppercase tracking-tighter mb-4">{community.name}</h3>
                      <div className="flex items-center gap-8">
                        <div>
                          <p className="text-white/40 text-[8px] font-black tracking-widest uppercase mb-1">Avg ROI</p>
                          <p className="text-white font-technical font-bold text-lg">{community.roi}</p>
                        </div>
                        <div>
                          <p className="text-white/40 text-[8px] font-black tracking-widest uppercase mb-1">Price/Sqft</p>
                          <p className="text-white font-technical font-bold text-lg">{community.avgPrice}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="details"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="space-y-16"
            >
              {/* Hero */}
              <div className="relative h-[50vh] rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src={selectedCommunity?.image} 
                  alt={selectedCommunity?.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent"></div>
                <div className="absolute bottom-12 left-12">
                  <p className="text-porsche-red text-[12px] tracking-[0.5em] uppercase font-black mb-4">{selectedCommunity?.tagline}</p>
                  <h2 className="text-6xl md:text-8xl font-display font-black text-white tracking-tighter leading-none uppercase">
                    {selectedCommunity?.name}<span className="text-porsche-red">.</span>
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-8 space-y-16">
                  {/* Overview */}
                  <div>
                    <h3 className="text-porsche-red text-[12px] tracking-[0.4em] uppercase font-black mb-8">Overview</h3>
                    <p className="text-white/60 text-xl md:text-2xl font-light leading-relaxed">
                      {selectedCommunity?.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedCommunity?.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-4 p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-porsche-red/20 transition-all">
                        <CheckCircle2 className="w-5 h-5 text-porsche-red" />
                        <span className="text-white font-technical font-bold text-xs uppercase tracking-widest">{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Amenities */}
                  <div>
                    <h3 className="text-porsche-red text-[12px] tracking-[0.4em] uppercase font-black mb-8">Key Amenities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {selectedCommunity?.amenities.map((a, i) => (
                        <div key={i} className="space-y-2">
                          <p className="text-white/20 text-[10px] font-black tracking-widest uppercase">{a.name}</p>
                          <p className="text-white font-technical font-bold text-sm">{a.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-12">
                  {/* Stats Card */}
                  <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/5">
                    <div className="space-y-8">
                      <div>
                        <p className="text-white/20 text-[10px] font-black tracking-widest uppercase mb-2">Investment Potential</p>
                        <p className="text-porsche-red font-display font-black text-4xl">{selectedCommunity?.roi}</p>
                        <p className="text-white/40 text-[10px] font-light mt-1">Average Annual Rental Yield</p>
                      </div>
                      <div className="pt-8 border-t border-white/5">
                        <p className="text-white/20 text-[10px] font-black tracking-widest uppercase mb-2">Market Entry</p>
                        <p className="text-white font-display font-black text-3xl">{selectedCommunity?.avgPrice}</p>
                        <p className="text-white/40 text-[10px] font-light mt-1">Average Price per Square Foot</p>
                      </div>
                    </div>
                  </div>

                  {/* Connectivity */}
                  <div className="bg-porsche-red p-10 rounded-[2.5rem] shadow-2xl shadow-porsche-red/10">
                    <h4 className="text-white text-[12px] tracking-[0.3em] uppercase font-black mb-8">Connectivity</h4>
                    <div className="space-y-6">
                      {selectedCommunity?.connectivity.map((c, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-white/60 text-[10px] font-black tracking-widest uppercase">{c.point}</span>
                          <span className="text-white font-technical font-bold text-sm">{c.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};


const DevelopersView = ({ onBack, onEnquire }: { onBack: () => void; onEnquire: () => void }) => {
  const [subView, setSubView] = useState<'list' | 'projects' | 'details'>('list');
  const [selectedDevId, setSelectedDevId] = useState<number | null>(null);
  const [selectedProjId, setSelectedProjId] = useState<number | null>(null);

  // Filter states
  const [filterLocation, setFilterLocation] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [filterPrice, setFilterPrice] = useState('All');
  const [filterHandover, setFilterHandover] = useState('All');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9;

  // Search state
  const [projectSearch, setProjectSearch] = useState('');

  const selectedDeveloper = DEVELOPERS.find(d => d.id === selectedDevId);
  const selectedProject = PROJECTS.find(p => p.id === selectedProjId);

  const filteredProjects = PROJECTS.filter(p => {
    if (selectedDevId && p.developerId !== selectedDevId) return false;
    if (filterLocation !== 'All' && p.location !== filterLocation) return false;
    if (filterType !== 'All' && p.type !== filterType) return false;
    
    // Search filter
    if (projectSearch && !p.name.toLowerCase().includes(projectSearch.toLowerCase()) && !p.location.toLowerCase().includes(projectSearch.toLowerCase())) return false;

    // Simple price filter logic for demo
    if (filterPrice !== 'All') {
      const priceVal = parseInt(p.price.replace(/[^0-9]/g, ''));
      if (filterPrice === 'Under 2M' && priceVal >= 2000000) return false;
      if (filterPrice === '2M - 5M' && (priceVal < 2000000 || priceVal > 5000000)) return false;
      if (filterPrice === 'Above 5M' && priceVal <= 5000000) return false;
    }
    if (filterHandover !== 'All' && !p.handover.includes(filterHandover)) return false;
    return true;
  });

  // Get current projects
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const locations = Array.from(new Set(PROJECTS.map(p => p.location)));
  const propertyTypes = Array.from(new Set(PROJECTS.map(p => p.type)));
  const handoverYears = Array.from(new Set(PROJECTS.map(p => p.handover.split(' ').pop())));

  const handleDevClick = (id: number) => {
    setSelectedDevId(id);
    setSubView('projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProjClick = (id: number) => {
    setSelectedProjId(id);
    setSubView('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setFilterLocation('All');
    setFilterType('All');
    setFilterPrice('All');
    setFilterHandover('All');
  };

  return (
    <div className="min-h-screen bg-white selection:bg-dark selection:text-white font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-[60] bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="px-6 md:px-12 lg:px-16 py-3 md:py-6 flex items-center justify-between">
          <div className="flex items-center gap-6 md:gap-12">
            <button 
              onClick={() => {
                if (subView === 'details') setSubView('projects');
                else if (subView === 'projects') {
                  setSubView('list');
                  setSelectedDevId(null);
                }
                else onBack();
              }}
              className="group flex items-center gap-2 md:gap-3 text-dark/40 hover:text-porsche-red transition-colors"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[11px] md:text-[12px] font-black tracking-[0.2em] md:tracking-[0.3em] uppercase">
                {subView === 'list' ? 'Return Home' : subView === 'projects' ? 'Back to Developers' : 'Back to Projects'}
              </span>
            </button>
            <div className="flex items-baseline gap-1">
              <span className="text-dark font-display font-black text-xl md:text-2xl tracking-tighter">ROCK</span>
              <span className="text-dark/40 font-display font-light text-xl md:text-2xl tracking-tighter">DEALS</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="https://wa.me/971529178630" target="_blank" rel="noreferrer" className="text-[12px] font-black tracking-[0.3em] uppercase hover:text-porsche-red transition-colors">WhatsApp</a>
            <button 
              onClick={onEnquire}
              className="bg-dark text-white px-6 py-2.5 text-[12px] font-black tracking-[0.3em] uppercase hover:bg-porsche-red transition-all"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </header>

      <main className="pt-20 md:pt-32 pb-12 md:pb-24">
        <AnimatePresence mode="wait">
          {subView === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto"
            >
              <div className="mb-8 md:mb-12">
                <p className="text-porsche-red text-[11px] md:text-[12px] tracking-[0.4em] md:tracking-[0.5em] uppercase font-black mb-4 md:mb-6">Industry Leaders</p>
                <h2 className="text-5xl md:text-8xl lg:text-9xl font-display font-black text-dark tracking-tighter leading-none">
                  DUBAI<br />
                  <span className="text-porsche-red">DEVELOPERS.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
                {DEVELOPERS.map((dev) => (
                  <motion.div
                    key={dev.id}
                    whileHover={{ y: -10 }}
                    className="group bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 hover:border-porsche-red/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 cursor-pointer flex flex-col"
                    onClick={() => handleDevClick(dev.id)}
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden mb-4 md:mb-6 bg-white p-4 border border-gray-50 shadow-sm group-hover:shadow-md transition-all duration-500 flex items-center justify-center">
                      <img 
                        src={dev.logo} 
                        alt={dev.name} 
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-black text-dark mb-3 md:mb-4 uppercase tracking-tight">
                      {dev.name}
                      <span className="text-porsche-red">.</span>
                    </h3>
                    <p className="text-porsche-red text-[10px] md:text-[11px] font-black tracking-[0.3em] uppercase mb-4">{dev.tagline}</p>
                    <p className="text-dark/40 text-sm font-light leading-relaxed mb-8 md:mb-10 line-clamp-3">
                      {dev.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2 text-dark/30 text-[11px] font-black tracking-widest uppercase">
                        <Layers className="w-3 h-3" />
                        <span>{dev.projectCount} Projects</span>
                      </div>
                      <div className="flex items-center gap-3 text-porsche-red text-[11px] font-black tracking-[0.3em] uppercase group-hover:gap-5 transition-all">
                        <span>View Projects</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {subView === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto"
            >
              <div className="mb-10 md:mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <div>
                  <p className="text-porsche-red text-[11px] md:text-[12px] tracking-[0.4em] md:tracking-[0.5em] uppercase font-black mb-4 md:mb-6">
                    {selectedDeveloper ? selectedDeveloper.name : 'All Projects'}
                  </p>
                  <h2 className="text-5xl md:text-8xl font-display font-black text-dark tracking-tighter leading-none uppercase">
                    Featured<br />
                    <span className="text-porsche-red">Projects.</span>
                  </h2>
                </div>
                
                <div className="flex flex-col gap-6 w-full lg:w-auto">
                  {/* Search Bar */}
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark/20 group-focus-within:text-porsche-red transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Search projects or locations..."
                      value={projectSearch}
                      onChange={(e) => {
                        setProjectSearch(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full lg:w-[400px] bg-gray-50 border border-gray-100 rounded-xl py-4 pl-12 pr-6 text-[12px] font-black tracking-widest uppercase outline-none focus:border-porsche-red/30 transition-all"
                    />
                  </div>

                  {/* Filters */}
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    <select 
                      value={filterLocation}
                      onChange={(e) => {
                        setFilterLocation(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 text-[12px] font-black tracking-widest uppercase outline-none focus:border-porsche-red/30 transition-all"
                    >
                      <option value="All">Location: All</option>
                      {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                    </select>
                    <select 
                      value={filterType}
                      onChange={(e) => {
                        setFilterType(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 text-[12px] font-black tracking-widest uppercase outline-none focus:border-porsche-red/30 transition-all"
                    >
                      <option value="All">Type: All</option>
                      {propertyTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                    <select 
                      value={filterPrice}
                      onChange={(e) => {
                        setFilterPrice(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 text-[12px] font-black tracking-widest uppercase outline-none focus:border-porsche-red/30 transition-all"
                    >
                      <option value="All">Price: All</option>
                      <option value="Under 2M">Under 2M</option>
                      <option value="2M - 5M">2M - 5M</option>
                      <option value="Above 5M">Above 5M</option>
                    </select>
                    <select 
                      value={filterHandover}
                      onChange={(e) => {
                        setFilterHandover(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 text-[12px] font-black tracking-widest uppercase outline-none focus:border-porsche-red/30 transition-all"
                    >
                      <option value="All">Handover: All</option>
                      {handoverYears.map(year => <option key={year} value={year}>{year}</option>)}
                    </select>
                    <button 
                      onClick={() => {
                        resetFilters();
                        setProjectSearch('');
                        setCurrentPage(1);
                      }}
                      className="bg-dark text-white rounded-lg px-4 py-2.5 text-[12px] font-black tracking-widest uppercase hover:bg-porsche-red transition-all"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              {currentProjects.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {currentProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      whileHover={{ y: -10 }}
                      className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 hover:border-porsche-red/20 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-700 cursor-pointer flex flex-col"
                      onClick={() => handleProjClick(project.id)}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img 
                          src={project.heroImage} 
                          alt={project.name} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute top-6 left-6">
                          <span className="bg-white/90 backdrop-blur-md text-dark text-[8px] font-black px-4 py-1.5 rounded-full tracking-[0.2em] uppercase shadow-sm">
                            {project.type}
                          </span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="flex items-center gap-2 text-white text-[11px] font-black tracking-widest uppercase">
                            <ImageIcon className="w-3 h-3" />
                            <span>View Gallery</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-8 md:p-10 flex flex-col flex-1">
                        <div className="flex items-center gap-2 text-porsche-red text-[8px] font-black tracking-widest uppercase mb-3">
                          <MapPin className="w-3 h-3" />
                          <span>{project.location}</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-display font-black text-dark mb-6 uppercase tracking-tight group-hover:text-porsche-red transition-colors">
                          {project.name}
                        </h3>
                        
                        <div className="grid grid-cols-2 gap-6 mb-8 py-6 border-y border-gray-50">
                          <div>
                            <p className="text-dark/30 text-[8px] font-black tracking-widest uppercase mb-1">Starting Price</p>
                            <p className="text-dark font-technical font-bold text-sm">{project.price}</p>
                          </div>
                          <div>
                            <p className="text-dark/30 text-[8px] font-black tracking-widest uppercase mb-1">Handover</p>
                            <p className="text-dark font-technical font-bold text-sm">{project.handover}</p>
                          </div>
                        </div>
                        
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2 text-dark/40 text-[11px] font-black tracking-widest uppercase">
                            <Wallet className="w-3 h-3" />
                            <span>{project.paymentPlan}</span>
                          </div>
                          <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-porsche-red group-hover:border-porsche-red transition-all duration-500">
                            <ArrowRight className="w-4 h-4 text-dark/40 group-hover:text-white transition-colors" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-20 flex items-center justify-center gap-4">
                    <button 
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center transition-all ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:border-porsche-red hover:text-porsche-red'}`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <button
                          key={number}
                          onClick={() => paginate(number)}
                          className={`w-12 h-12 rounded-full text-[12px] font-black transition-all ${currentPage === number ? 'bg-porsche-red text-white shadow-lg shadow-porsche-red/20' : 'hover:bg-gray-50 text-dark/40'}`}
                        >
                          {number}
                        </button>
                      ))}
                    </div>

                    <button 
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center transition-all ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:border-porsche-red hover:text-porsche-red'}`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            ) : (
                <div className="py-16 text-center border-2 border-dashed border-gray-100 rounded-[3rem]">
                  <Search className="w-12 h-12 text-dark/10 mx-auto mb-6" />
                  <p className="text-dark/30 text-xl font-light tracking-widest uppercase">No projects match your filters.</p>
                  <button onClick={resetFilters} className="mt-8 text-porsche-red text-[12px] font-black tracking-[0.3em] uppercase hover:underline">Clear all filters</button>
                </div>
              )}
            </motion.div>
          )}

          {subView === 'details' && selectedProject && (
            <motion.div
              key="details"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24"
            >
              {/* Hero Section */}
              <div className="relative h-[60vh] md:h-[80vh] rounded-[3rem] overflow-hidden mb-12 md:mb-16 shadow-2xl">
                <img 
                  src={selectedProject.heroImage} 
                  alt={selectedProject.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-12 md:bottom-24 left-8 md:left-16 right-8 md:right-16">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="bg-porsche-red text-white text-[11px] font-black px-5 py-2 rounded-full tracking-[0.3em] uppercase">
                          {selectedProject.type}
                        </span>
                        <div className="flex items-center gap-2 text-white/60 text-[12px] font-black tracking-widest uppercase">
                          <MapPin className="w-4 h-4 text-porsche-red" />
                          <span>{selectedProject.location}</span>
                        </div>
                      </div>
                      <h1 className="text-5xl md:text-8xl lg:text-9xl font-display font-black text-white tracking-tighter leading-none uppercase mb-4">
                        {selectedProject.name}
                        <span className="text-porsche-red">.</span>
                      </h1>
                      <p className="text-white/60 text-lg md:text-xl font-light tracking-widest uppercase">
                        By {DEVELOPERS.find(d => d.id === selectedProject.developerId)?.name}
                      </p>
                    </div>
                    
                    <div className="flex gap-4">
                      <button 
                        onClick={onEnquire}
                        className="bg-white text-dark px-8 md:px-12 py-4 md:py-5 text-[12px] font-black tracking-[0.3em] uppercase hover:bg-porsche-red hover:text-white transition-all duration-500 shadow-xl"
                      >
                        Enquire Now
                      </button>
                      <a 
                        href="https://wa.me/971529178630" 
                        target="_blank" 
                        rel="noreferrer"
                        className="bg-green-500 text-white p-4 md:p-5 rounded-full hover:bg-green-600 transition-all shadow-xl flex items-center justify-center"
                      >
                        <MessageSquare className="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
                {/* Left Column: Info & Overview */}
                <div className="lg:col-span-8">
                  {/* Key Info Box */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100 border border-gray-100 rounded-[2rem] overflow-hidden mb-12 md:mb-16 shadow-sm">
                    {[
                      { label: 'Starting Price', value: selectedProject.price, icon: DollarSign },
                      { label: 'Handover Date', value: selectedProject.handover, icon: Calendar },
                      { label: 'Payment Plan', value: selectedProject.paymentPlan, icon: Wallet },
                      { label: 'Property Type', value: selectedProject.type, icon: Home }
                    ].map((item, i) => (
                      <div key={i} className="bg-white p-8 md:p-10 flex flex-col items-center text-center group hover:bg-gray-50 transition-colors">
                        <item.icon className="w-6 h-6 text-porsche-red mb-6 group-hover:scale-110 transition-transform" />
                        <p className="text-dark/30 text-[8px] font-black tracking-widest uppercase mb-2">{item.label}</p>
                        <p className="text-dark font-technical font-bold text-sm md:text-base">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Overview */}
                  <div className="mb-12 md:mb-16">
                    <p className="text-porsche-red text-[12px] tracking-[0.5em] uppercase font-black mb-8">Project Overview</p>
                    <p className="text-dark/60 text-xl md:text-2xl font-light leading-relaxed mb-12">
                      {selectedProject.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {selectedProject.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl border border-transparent hover:border-porsche-red/10 transition-all">
                          <CheckCircle2 className="w-5 h-5 text-porsche-red flex-shrink-0" />
                          <span className="text-dark font-technical font-bold text-xs uppercase tracking-widest">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-12 md:mb-16">
                    <p className="text-porsche-red text-[12px] tracking-[0.5em] uppercase font-black mb-12">World-Class Amenities</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                      {selectedProject.amenities.map((amenity, i) => (
                        <div key={i} className="flex flex-col gap-4 group">
                          <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-porsche-red group-hover:text-white transition-all duration-500">
                            <Layout className="w-5 h-5" />
                          </div>
                          <span className="text-dark font-technical font-bold text-[12px] uppercase tracking-widest">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Plan Breakdown */}
                  {selectedProject.paymentPlanBreakdown && (
                    <div className="mb-12 md:mb-16">
                      <p className="text-porsche-red text-[12px] tracking-[0.5em] uppercase font-black mb-12">Payment Plan Breakdown</p>
                      <div className="space-y-4">
                        {selectedProject.paymentPlanBreakdown.map((plan, i) => (
                          <div key={i} className="flex items-center justify-between p-8 bg-gray-50 rounded-2xl group hover:bg-dark hover:text-white transition-all duration-500">
                            <span className="text-dark/60 group-hover:text-white/60 font-technical font-bold text-xs uppercase tracking-widest">{plan.milestone}</span>
                            <span className="text-dark group-hover:text-porsche-red font-display font-black text-2xl">{plan.percentage}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Gallery & CTA */}
                <div className="lg:col-span-4">
                  <div className="sticky top-32 space-y-12">
                    {/* Gallery Preview */}
                    <div>
                      <p className="text-porsche-red text-[12px] tracking-[0.5em] uppercase font-black mb-8">Gallery</p>
                      <div className="grid grid-cols-1 gap-6">
                        {selectedProject.gallery.map((img, i) => (
                          <div key={i} className="relative aspect-video rounded-3xl overflow-hidden group cursor-pointer shadow-lg">
                            <img src={img} alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Maximize className="w-8 h-8 text-white" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Side CTA */}
                    <div className="bg-dark p-10 md:p-12 rounded-[3rem] text-center shadow-2xl">
                      <p className="text-porsche-red text-[11px] tracking-[0.5em] uppercase font-black mb-6">Interested?</p>
                      <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-8">Start Your Journey<span className="text-porsche-red">.</span></h3>
                      <div className="space-y-4">
                        <button 
                          onClick={onEnquire}
                          className="w-full bg-porsche-red text-white py-5 text-[12px] font-black tracking-[0.3em] uppercase hover:bg-white hover:text-dark transition-all duration-500"
                        >
                          Enquire Now
                        </button>
                        <button className="w-full bg-white/10 text-white py-5 text-[12px] font-black tracking-[0.3em] uppercase hover:bg-white/20 transition-all duration-500">
                          Download Brochure
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

const PreApprovalForm = ({ onBack }: { onBack: () => void }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    salary: '',
    bank: '',
    company: '',
    otherIncome: '',
    employmentType: 'Salaried',
    residencyStatus: 'Resident'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Mortgage Pre-Approval Request - ${formData.fullName}`;
    const body = `
Pre-Approval Application Details:
--------------------------------
Full Name: ${formData.fullName}
Email: ${formData.email}
Mobile: ${formData.mobile}
Monthly Salary: ${formData.salary} AED
Bank Name: ${formData.bank}
Company Name: ${formData.company}
Other Monthly Income: ${formData.otherIncome || 'None'}
Employment Type: ${formData.employmentType}
Residency Status: ${formData.residencyStatus}

This request was generated from the Rock Deals Smart Hub.
    `;
    
    window.location.href = `mailto:info@rock-deals.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setIsSubmitted(true);
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED', maximumFractionDigits: 0 }).format(val);

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 bg-porsche-red text-white flex items-center justify-center mx-auto mb-12">
            <CreditCard className="w-10 h-10" />
          </div>
          <h2 className="text-4xl font-display font-black text-dark uppercase tracking-tighter mb-6">Application Sent.</h2>
          <p className="text-dark/50 text-lg font-light mb-12 leading-relaxed">
            Your pre-approval request has been submitted. Our banking specialists will contact you within 24 hours to finalize your assessment.
          </p>
          <button 
            onClick={onBack}
            className="bg-dark text-white px-12 py-6 text-[12px] tracking-[0.4em] uppercase font-black hover:bg-porsche-red transition-all duration-500"
          >
            Return to Hub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-dark">
      {/* Header */}
      <header className="px-6 md:px-8 lg:px-24 py-4 md:py-8 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-xl z-[100]">
        <div className="flex items-baseline gap-1">
          <span className="text-dark font-display font-black text-2xl tracking-tighter">ROCK</span>
          <span className="text-dark/40 font-display font-light text-2xl tracking-tighter">DEALS</span>
        </div>
        <button 
          onClick={onBack}
          className="flex items-center gap-3 text-[12px] tracking-[0.3em] uppercase font-black hover:text-porsche-red transition-colors"
        >
          <X className="w-4 h-4" /> Cancel Application
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-6 md:px-8 py-8 md:py-16">
        <div className="mb-12">
          <p className="text-porsche-red text-[12px] tracking-[0.5em] uppercase font-black mb-6">Mortgage Intelligence</p>
          <h1 className="text-6xl md:text-8xl font-display font-black text-dark tracking-tighter leading-none uppercase">
            Free Pre-<br />
            <span className="text-porsche-red">Approval.</span>
          </h1>
          <p className="mt-8 text-dark/40 text-xl font-light max-w-2xl leading-relaxed">
            Secure your financing before you browse. Our experts work with top UAE banks to get you the best rates and terms.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
          {/* Personal Info */}
          <div className="space-y-8">
            <h3 className="text-[12px] tracking-[0.4em] uppercase font-black text-dark/20 border-b border-gray-100 pb-4">Personal Information</h3>
            
            <div className="space-y-4">
              <label className="text-[12px] tracking-[0.3em] uppercase font-black text-dark/40">Full Name (As per Passport)</label>
              <input 
                required
                type="text" 
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full bg-gray-50 border-b-2 border-gray-100 py-4 px-0 text-xl font-technical font-bold focus:border-porsche-red outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[12px] tracking-[0.3em] uppercase font-black text-dark/40">Email Address</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-50 border-b-2 border-gray-100 py-4 px-0 text-lg font-technical font-bold focus:border-porsche-red outline-none transition-all"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[12px] tracking-[0.3em] uppercase font-black text-dark/40">Mobile Number</label>
                <input 
                  required
                  type="tel" 
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  className="w-full bg-gray-50 border-b-2 border-gray-100 py-4 px-0 text-lg font-technical font-bold focus:border-porsche-red outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[12px] tracking-[0.3em] uppercase font-black text-dark/40">UAE Residency Status</label>
              <div className="flex gap-4">
                {['Resident', 'Non-Resident'].map((status) => (
                  <button 
                    key={status}
                    type="button"
                    onClick={() => setFormData({...formData, residencyStatus: status})}
                    className={`flex-1 py-4 border-2 transition-all font-technical font-bold text-[11px] tracking-widest uppercase ${formData.residencyStatus === status ? 'border-porsche-red bg-porsche-red text-white' : 'border-gray-100 hover:border-dark/10'}`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Income Info */}
          <div className="space-y-8">
            <h3 className="text-[12px] tracking-[0.4em] uppercase font-black text-dark/20 border-b border-gray-100 pb-4">Income Details</h3>
            
            <div className="space-y-4">
              <label className="text-[12px] tracking-[0.3em] uppercase font-black text-dark/40">Employment Type</label>
              <div className="flex gap-4">
                {['Salaried', 'Self-Employed'].map((type) => (
                  <button 
                    key={type}
                    type="button"
                    onClick={() => setFormData({...formData, employmentType: type})}
                    className={`flex-1 py-4 border-2 transition-all font-technical font-bold text-[11px] tracking-widest uppercase ${formData.employmentType === type ? 'border-porsche-red bg-porsche-red text-white' : 'border-gray-100 hover:border-dark/10'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[12px] tracking-[0.3em] uppercase font-black text-dark/40">Monthly Salary / Income (AED)</label>
              <div className="relative">
                <input 
                  required
                  type="number" 
                  value={formData.salary}
                  onChange={(e) => setFormData({...formData, salary: e.target.value})}
                  className="w-full bg-gray-50 border-b-2 border-gray-100 py-4 px-0 text-xl font-technical font-bold focus:border-porsche-red outline-none transition-all"
                />
                <div className="absolute right-0 bottom-4 text-dark/20 font-technical font-bold">AED</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[12px] tracking-[0.3em] uppercase font-black text-dark/40">Company Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full bg-gray-50 border-b-2 border-gray-100 py-4 px-0 text-lg font-technical font-bold focus:border-porsche-red outline-none transition-all"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[12px] tracking-[0.3em] uppercase font-black text-dark/40">Primary Bank</label>
                <input 
                  required
                  type="text" 
                  value={formData.bank}
                  onChange={(e) => setFormData({...formData, bank: e.target.value})}
                  className="w-full bg-gray-50 border-b-2 border-gray-100 py-4 px-0 text-lg font-technical font-bold focus:border-porsche-red outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[12px] tracking-[0.3em] uppercase font-black text-dark/40">Other Monthly Income (Optional)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={formData.otherIncome}
                  onChange={(e) => setFormData({...formData, otherIncome: e.target.value})}
                  className="w-full bg-gray-50 border-b-2 border-gray-100 py-4 px-0 text-lg font-technical font-bold focus:border-porsche-red outline-none transition-all"
                />
                <div className="absolute right-0 bottom-4 text-dark/20 font-technical font-bold">AED</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 pt-12 flex flex-col items-center">
            <button 
              type="submit"
              className="w-full max-w-md bg-porsche-red text-white py-5 font-black tracking-[0.3em] uppercase text-[12px] hover:bg-dark transition-all duration-500 shadow-[0_15px_30px_rgba(213,0,28,0.2)]"
            >
              Request Pre-Approval Assessment
            </button>
            <p className="mt-8 text-center text-[11px] text-dark/30 tracking-widest uppercase font-black">
              By submitting, you agree to our financial privacy terms and banking data protocols.
            </p>
          </div>
        </form>
      </main>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<'home' | 'calculator' | 'roi-calculator' | 'developers' | 'pre-approval' | 'area-guide'>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All Properties');

  // Search Bar State
  const [searchTab, setSearchTab] = useState('RENT');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchPrice, setSearchPrice] = useState({ min: '', max: '' });
  const [searchBeds, setSearchBeds] = useState({ beds: 0, baths: 0 });
  const [searchPropertyType, setSearchPropertyType] = useState('Property Type');
  const [searchFurnishStatus, setSearchFurnishStatus] = useState('Furnish Status');
  const [activePopover, setActivePopover] = useState<string | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setActivePopover(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Enquiry Modal State
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({ name: '', email: '', mobile: '' });

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `New Property Enquiry from ${enquiryForm.name}`;
    const body = `
Enquiry Details:
----------------
Name: ${enquiryForm.name}
Email: ${enquiryForm.email}
Mobile: ${enquiryForm.mobile}

Search Criteria:
----------------
Type: ${searchTab}
Location: ${searchLocation || 'Not specified'}
Price: ${searchPrice.max || 'Not specified'} AED
Beds: ${searchBeds.beds === 0 ? 'Studio' : searchBeds.beds}
Baths: ${searchBeds.baths}
Property Type: ${searchPropertyType}
Furnish: ${searchFurnishStatus}
    `;
    
    window.location.href = `mailto:info@rock-deals.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setIsEnquiryModalOpen(false);
    setEnquiryForm({ name: '', email: '', mobile: '' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {view === 'calculator' ? (
        <PaymentCalculator onBack={() => setView('home')} />
      ) : view === 'roi-calculator' ? (
        <ROICalculator onBack={() => setView('home')} />
      ) : view === 'developers' ? (
        <DevelopersView onBack={() => setView('home')} onEnquire={() => setIsEnquiryModalOpen(true)} />
      ) : view === 'area-guide' ? (
        <AreaGuide onBack={() => setView('home')} />
      ) : view === 'pre-approval' ? (
        <PreApprovalForm onBack={() => setView('home')} />
      ) : (
        <div className="min-h-screen bg-white selection:bg-dark selection:text-white">
          {/* Header */}
          <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
        {/* Scroll Progress Bar */}
        <motion.div 
          className="absolute top-0 left-0 h-[3px] bg-porsche-red z-[60]"
          style={{ 
            width: '0%',
            scaleX: 0,
            transformOrigin: 'left'
          }}
          animate={{ 
            scaleX: typeof window !== 'undefined' ? (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) : 0
          }}
        />
        
        <div className="px-6 lg:px-12">
          <div className={`flex items-center justify-between transition-all duration-500 gap-4 ${isScrolled ? 'h-[50px] md:h-[60px]' : 'h-[60px] md:h-[80px]'}`}>
            <a className="cursor-pointer group flex-shrink-0" href="/">
              <div className="flex flex-col leading-none">
                <div className="flex items-baseline gap-1">
                  <span className={`${isScrolled ? 'text-dark text-xl' : 'text-white text-2xl'} font-display font-black tracking-tight transition-all duration-500`}>ROCK</span>
                  <span className={`font-display font-light tracking-tight transition-all duration-500 ${isScrolled ? 'text-dark/40 text-xl' : 'text-white/40 text-2xl'}`}>DEALS</span>
                </div>
              </div>
            </a>

            <div className="hidden lg:flex items-center justify-end flex-1">
              <div className={`flex items-center transition-all duration-500 ${isScrolled ? 'gap-8' : 'gap-12'}`}>
                {[
                  { name: 'Properties', href: '#property-types' },
                  { name: 'Area Guide', onClick: () => setView('area-guide') },
                  { name: 'Developers', onClick: () => setView('developers') },
                  { name: 'ROI Calculator', onClick: () => setView('roi-calculator') },
                  { name: 'Payment Plans', onClick: () => setView('calculator') },
                  { name: 'Enquire Now', onClick: () => setIsEnquiryModalOpen(true) },
                  { name: 'Contact', href: '#contact' }
                ].map((item) => (
                  <a 
                    key={item.name}
                    href={item.href}
                    target={item.href?.startsWith('http') ? '_blank' : undefined}
                    rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      }
                    }}
                    className={`tracking-[0.25em] uppercase font-black transition-all duration-300 cursor-pointer whitespace-nowrap border-b-2 border-transparent hover:text-porsche-red py-2 ${isScrolled ? 'text-dark text-[11px]' : 'text-white text-[12px]'}`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            <button 
              className={`lg:hidden w-12 h-12 flex items-center justify-center cursor-pointer transition-colors ${isScrolled ? 'text-dark' : 'text-white'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-white z-[200] p-6 md:p-10 flex flex-col"
            >
              <div className="flex justify-end mb-12">
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-dark"><X className="w-8 h-8" /></button>
              </div>
              <div className="flex flex-col gap-6 md:gap-8">
                {[
                  { name: 'Properties', href: '#property-types' },
                  { name: 'Developers', onClick: () => setView('developers') },
                  { name: 'ROI Calculator', onClick: () => setView('roi-calculator') },
                  { name: 'Payment Plans', onClick: () => setView('calculator') },
                  { name: 'Enquire Now', onClick: () => setIsEnquiryModalOpen(true) },
                  { name: 'Features', href: '#features' },
                  { name: 'Contact', href: '#contact' }
                ].map((item, index) => (
                  <motion.a 
                    key={item.name} 
                    href={item.href} 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    target={item.href?.startsWith('http') ? '_blank' : undefined}
                    rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    onClick={(e) => {
                      setIsMobileMenuOpen(false);
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      }
                    }} 
                    className="text-2xl md:text-3xl font-display font-black tracking-tight text-dark uppercase hover:text-porsche-red transition-colors"
                  >
                    {item.name}
                  </motion.a>
                ))}
                <motion.a 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  href="#contact" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="mt-8 md:mt-12 bg-porsche-red text-white px-8 py-5 text-[12px] font-black tracking-[0.3em] uppercase text-center shadow-[0_15px_30px_rgba(213,0,28,0.2)] active:scale-95 transition-all"
                >
                  Book Viewing
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            alt="Luxury Dubai Skyline Real Estate" 
            className="w-full h-full object-cover object-center" 
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1920"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Technical Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] [background-size:160px_160px]"></div>
          </div>
        </div>

        <div className="relative w-full px-6 md:px-8 lg:px-16 pt-16 md:pt-20 flex flex-col items-center text-center">
          <div className="max-w-5xl mb-6 md:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6"
            >
              <div className="w-8 md:w-12 h-[2px] bg-porsche-red"></div>
              <p className="text-white text-[10px] md:text-[12px] tracking-[0.3em] uppercase font-technical font-bold opacity-60">
                The New Standard of Luxury
              </p>
              <div className="w-8 md:w-12 h-[2px] bg-porsche-red"></div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-script font-bold text-white leading-tight mb-6 md:mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            >
              Best Property Deals in <span className="text-porsche-red glow-porsche">Dubai.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/50 text-[8px] md:text-xs font-light tracking-[0.3em] md:tracking-[0.4em] uppercase max-w-xs md:max-w-none mx-auto"
            >
              Buy Property in Dubai with 1% Payment Plans and Zero Commission
            </motion.p>
          </div>

          {/* Advanced Search Bar */}
          <motion.div
            ref={popoverRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="w-full max-w-4xl bg-black/20 backdrop-blur-3xl border border-white/10 rounded-2xl p-3 md:p-5 shadow-[0_0_100px_rgba(0,0,0,0.6)] relative z-10 group"
          >
            {/* Animated Border Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-porsche-red/10 via-transparent to-porsche-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
            
            {/* Tabs */}
            <div className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-1.5 mb-4 relative z-10">
              {['RENT', 'BUY', 'OFF PLAN', 'COMMERCIAL'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSearchTab(tab)}
                  className={`px-3 md:px-4 py-2 md:py-1.5 rounded-lg text-[12px] md:text-[14px] font-technical font-bold tracking-[0.2em] md:tracking-[0.25em] transition-all duration-500 min-h-[40px] md:min-h-0 ${
                    searchTab === tab 
                      ? 'bg-porsche-red text-white shadow-[0_0_15px_rgba(213,0,28,0.5)]' 
                      : 'bg-white/1 text-white/30 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-1.5 md:gap-1.5 relative z-10">
              {/* Location Input */}
              <div className="relative lg:col-span-3">
                <Search className="absolute left-4 md:left-3 top-1/2 -translate-y-1/2 w-3 h-3 md:w-2.5 md:h-2.5 text-porsche-red" />
                <input 
                  type="text"
                  placeholder="Search Location"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full bg-white/1 border border-white/5 rounded-lg py-3.5 md:py-2 pl-11 md:pl-9 pr-4 md:pr-3 text-white text-[14px] font-technical tracking-widest focus:outline-none focus:border-porsche-red/40 transition-all placeholder:text-white/10"
                />
              </div>

              {/* Price Input */}
              <div className="relative lg:col-span-2">
                <div className="relative h-full">
                  <input 
                    type="text"
                    placeholder="Price (AED)"
                    value={searchPrice.max}
                    onChange={(e) => setSearchPrice({...searchPrice, max: e.target.value.replace(/[^0-9]/g, '')})}
                    className="w-full h-full bg-white/1 border border-white/5 rounded-lg py-3.5 md:py-2 px-4 md:px-3 text-white text-[14px] font-technical tracking-widest focus:outline-none focus:border-porsche-red/40 transition-all placeholder:text-white/10 min-h-[48px] md:min-h-0"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-white/20 pointer-events-none">AED</div>
                </div>
              </div>

              {/* Beds & Baths Dropdown */}
              <div className="relative lg:col-span-2">
                <button 
                  onClick={() => setActivePopover(activePopover === 'beds' ? null : 'beds')}
                  className="w-full bg-white/1 border border-white/5 rounded-lg py-3.5 md:py-2 px-4 md:px-3 text-white text-[14px] font-mono tracking-widest flex items-center justify-between hover:bg-white/10 transition-all whitespace-nowrap overflow-hidden min-h-[48px] md:min-h-0"
                >
                  <span className="truncate">
                    {searchBeds.beds === 0 && searchBeds.baths === 0 ? 'Beds & Baths' : 
                     searchBeds.beds === 0 ? `Studio / ${searchBeds.baths}Ba` : 
                     `${searchBeds.beds}B / ${searchBeds.baths}Ba`}
                  </span>
                  <ChevronDown className={`w-3 h-3 md:w-2.5 md:h-2.5 text-white/30 transition-transform flex-shrink-0 ml-1 ${activePopover === 'beds' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activePopover === 'beds' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 md:left-auto md:right-0 mt-3 bg-black/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-6 z-[60] shadow-2xl min-w-[280px] md:min-w-[320px]"
                    >
                      <div className="space-y-6">
                        <div>
                          <p className="text-white/40 text-[12px] font-technical font-bold tracking-widest uppercase mb-3">Bedrooms</p>
                          <div className="flex flex-wrap gap-1.5">
                            {['ST', 1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                              <button 
                                key={n}
                                onClick={() => setSearchBeds({...searchBeds, beds: n === 'ST' ? 0 : Number(n)})}
                                className={`w-10 h-10 rounded-lg text-[11px] font-technical font-bold transition-all ${((n === 'ST' && searchBeds.beds === 0) || (typeof n === 'number' && searchBeds.beds === n)) ? 'bg-porsche-red text-white shadow-[0_0_15px_rgba(213,0,28,0.4)]' : 'bg-white/1 text-white/40 hover:bg-white/10'}`}
                              >
                                {n}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-white/40 text-[12px] font-technical font-bold tracking-widest uppercase mb-3">Bathrooms</p>
                          <div className="flex flex-wrap gap-1.5">
                            {[1, 2, 3, 4, 5, 6].map(n => (
                              <button 
                                key={n}
                                onClick={() => setSearchBeds({...searchBeds, baths: n})}
                                className={`w-10 h-10 rounded-lg text-[11px] font-technical font-bold transition-all ${searchBeds.baths === n ? 'bg-porsche-red text-white shadow-[0_0_15px_rgba(213,0,28,0.4)]' : 'bg-white/1 text-white/40 hover:bg-white/10'}`}
                              >
                                {n}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                          <button 
                            onClick={() => { setSearchBeds({beds: 0, baths: 0}); setActivePopover(null); }}
                            className="flex-1 py-3 bg-white/1 text-[12px] font-technical font-bold text-white/40 uppercase tracking-widest hover:bg-white/10 transition-all rounded-xl"
                          >
                            Reset
                          </button>
                          <button 
                            onClick={() => setActivePopover(null)}
                            className="flex-1 py-3 bg-porsche-red text-[12px] font-technical font-bold text-white uppercase tracking-widest hover:bg-porsche-red/80 transition-all rounded-xl shadow-[0_0_15px_rgba(213,0,28,0.4)]"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Property Type Dropdown */}
              <div className="relative lg:col-span-2">
                <button 
                  onClick={() => setActivePopover(activePopover === 'type' ? null : 'type')}
                  className="w-full bg-white/1 border border-white/5 rounded-lg py-3.5 md:py-2 px-4 md:px-3 text-white text-[14px] font-mono tracking-widest flex items-center justify-between hover:bg-white/10 transition-all whitespace-nowrap overflow-hidden min-h-[48px] md:min-h-0"
                >
                  <span className="truncate">{searchPropertyType}</span>
                  <ChevronDown className={`w-3 h-3 md:w-2.5 md:h-2.5 text-white/30 transition-transform flex-shrink-0 ml-1 ${activePopover === 'type' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activePopover === 'type' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 md:left-auto md:right-0 mt-3 bg-black/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-2 z-[60] shadow-2xl min-w-[200px]"
                    >
                      {['Studio', 'Apartment', 'Townhouse', 'Villa', 'Hotel Apartments'].map(type => (
                        <button 
                          key={type}
                          onClick={() => { setSearchPropertyType(type); setActivePopover(null); }}
                          className="w-full text-left px-4 py-3 text-[11px] font-technical font-bold tracking-widest uppercase text-white/40 hover:text-white hover:bg-white/2 rounded-xl transition-all"
                        >
                          {type}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Furnish Status Dropdown */}
              <div className="relative lg:col-span-1">
                <button 
                  onClick={() => setActivePopover(activePopover === 'furnish' ? null : 'furnish')}
                  className="w-full bg-white/1 border border-white/5 rounded-lg py-3.5 md:py-2 px-4 md:px-3 text-white text-[14px] font-technical tracking-widest flex items-center justify-between hover:bg-white/10 transition-all whitespace-nowrap overflow-hidden min-h-[48px] md:min-h-0"
                >
                  <span className="truncate">{searchFurnishStatus === 'Furnish Status' ? 'Furnish' : searchFurnishStatus}</span>
                  <ChevronDown className={`w-3 h-3 md:w-2.5 md:h-2.5 text-white/30 transition-transform flex-shrink-0 ml-1 ${activePopover === 'furnish' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activePopover === 'furnish' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 md:left-auto md:right-0 mt-3 bg-black/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-2 z-[60] shadow-2xl min-w-[200px]"
                    >
                      {['Furnished', 'Fully Furnished', 'Semi Furnished', 'Vacant'].map(status => (
                        <button 
                          key={status}
                          onClick={() => { setSearchFurnishStatus(status); setActivePopover(null); }}
                          className="w-full text-left px-4 py-3 text-[11px] font-technical font-bold tracking-widest uppercase text-white/40 hover:text-white hover:bg-white/2 rounded-xl transition-all"
                        >
                          {status}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit Enquiry Button */}
              <button 
                onClick={() => setIsEnquiryModalOpen(true)}
                className="lg:col-span-2 bg-porsche-red text-white rounded-lg py-3.5 md:py-2 px-4 md:px-3 text-[12px] font-technical font-bold tracking-[0.25em] uppercase hover:bg-porsche-red/80 transition-all shadow-[0_0_15px_rgba(213,0,28,0.4)] active:scale-95 min-h-[48px] md:min-h-0"
              >
                Submit Enquiry
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <section 
        id="filters" 
        className={`px-4 md:px-8 lg:px-16 py-4 bg-white/90 backdrop-blur-md border-b border-gray-100 sticky z-40 transition-all duration-500 ${isScrolled ? 'top-[60px] shadow-lg' : 'top-[80px] shadow-sm'}`}
      >
        <div className="max-w-7xl mx-auto overflow-x-auto no-scrollbar -mx-4 px-4">
          <div className="flex items-center justify-start md:justify-center gap-3 min-w-max">
            {['All Properties', 'Luxury Villas', 'Apartments', 'Townhouses', 'Off-Plan', 'Ready to Move', 'Developers'].map((filter) => (
              <button 
                key={filter} 
                onClick={() => {
                  if (filter === 'Developers') {
                    setView('developers');
                  } else {
                    setActiveFilter(filter);
                  }
                }}
                className={`group flex items-center gap-2 rounded-full border font-black tracking-[0.2em] uppercase transition-all duration-500 shadow-sm hover:shadow-md whitespace-nowrap min-h-[40px] md:min-h-0
                  ${filter === 'Developers' 
                    ? 'bg-porsche-red text-white border-porsche-red shadow-[0_0_15px_rgba(213,0,28,0.3)]' 
                    : activeFilter === filter 
                      ? 'bg-dark text-white border-dark' 
                      : 'bg-white text-dark border-gray-100 hover:bg-gray-50'
                  } 
                  ${isScrolled ? 'px-4 py-2 md:py-1.5 text-[10px] md:text-[9px]' : 'px-5 py-2.5 md:py-2 text-[11px] md:text-[10px]'}`}
              >
                <span className={`rounded-full transition-all duration-300 
                  ${filter === 'Developers' 
                    ? 'bg-white scale-125' 
                    : activeFilter === filter 
                      ? 'bg-white scale-125' 
                      : 'bg-porsche-red group-hover:scale-125'
                  } 
                  ${isScrolled ? 'w-1 h-1' : 'w-1.5 h-1.5'}`}
                ></span>
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="px-6 md:px-8 lg:px-24 py-12 md:py-20 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6 md:mb-8"
            >
              <div className="w-10 md:w-12 h-[1px] bg-porsche-red"></div>
              <span className="text-porsche-red text-[11px] md:text-[12px] tracking-[0.4em] uppercase font-black">Philosophy</span>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-display font-black text-dark leading-[0.9] mb-8 md:mb-12 tracking-tighter">
              DUBAI<br />
              <span className="text-porsche-red">REAL ESTATE</span><br />
              DEALS.
            </h2>
            <p className="text-dark/60 text-base md:text-xl leading-relaxed font-light max-w-xl mb-8 md:mb-12">
              Rock Deals specializes in Dubai distress deals, off-plan properties, and high ROI investments. We provide a comprehensive Dubai property investment guide to help you find the cheapest property in Dubai with the best payment plans.
            </p>
            <motion.button
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 text-dark text-[12px] font-black tracking-[0.4em] uppercase group min-h-[44px]"
            >
              Learn Our Method <ArrowRight className="w-4 h-4 text-porsche-red group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </div>
          <div className="grid grid-cols-2 gap-px bg-gray-100 border border-gray-100">
            {[
              { label: 'Legal Transparency', value: '100%' },
              { label: 'Expert Support', value: '24/7' },
              { label: 'Smart Analytics', value: 'AI' },
              { label: 'Verified Listings', value: 'DLD' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 md:p-12 hover:bg-gray-50 transition-colors group">
                <div className="text-3xl md:text-5xl font-display font-black text-dark mb-2 md:mb-4 group-hover:text-porsche-red transition-colors">{stat.value}</div>
                <div className="text-dark/30 text-[11px] md:text-[11px] tracking-[0.3em] uppercase font-black">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Types Section (Filtered Grid) */}
      <section id="property-types" className="px-6 md:px-8 lg:px-24 py-12 md:py-24 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8 md:gap-12">
          <div className="max-w-3xl">
            <p className="text-porsche-red text-[11px] md:text-[12px] tracking-[0.5em] uppercase font-black mb-4 md:mb-6">Portfolio</p>
            <h2 className="text-5xl sm:text-7xl md:text-[10rem] font-display font-black text-dark tracking-tighter leading-[0.8]">
              FEATURED<br />
              <span className="text-porsche-red">LISTINGS.</span>
            </h2>
          </div>
          <p className="text-dark/40 text-sm md:text-base max-w-md leading-relaxed font-light">
            Discover our curated selection of the UAE's most prestigious properties, filtered by your specific requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {PROPERTIES.filter(p => activeFilter === 'All Properties' || p.category === activeFilter).map((prop) => (
              <motion.div 
                layout
                key={prop.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group relative aspect-[3/2] rounded-[2rem] overflow-hidden bg-gray-100 cursor-pointer"
              >
                <img 
                  src={prop.image} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  alt={prop.title}
                  referrerPolicy="no-referrer"
                />
                
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                
                {/* Category Badge (Optional, kept subtle) */}
                <div className="absolute top-6 left-8">
                  <span className="text-white/60 text-[13px] md:text-[12px] font-black tracking-[0.3em] uppercase">
                    {prop.category}
                  </span>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="text-white font-technical font-bold text-xl md:text-2xl tracking-tight uppercase flex items-center">
                      {prop.title}
                      <span className="text-porsche-red ml-1">.</span>
                    </h3>
                    <p className="text-white/60 text-[13px] md:text-[12px] tracking-[0.2em] uppercase font-medium mt-1">{prop.location} — {prop.price}</p>
                  </div>
                  
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
                    <ArrowRight className="w-4 h-4 text-white group-hover:text-dark transition-colors" />
                  </div>
                </div>

                <a href="#contact" className="absolute inset-0 z-10"></a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {PROPERTIES.filter(p => activeFilter === 'All Properties' || p.category === activeFilter).length === 0 && (
          <div className="py-20 text-center">
            <p className="text-dark/20 text-xl font-light tracking-widest uppercase">No properties found in this category.</p>
          </div>
        )}
      </section>

      {/* Features Grid */}
      <section id="features" className="px-6 md:px-8 lg:px-24 py-12 md:py-20 bg-gray-50/50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-8 md:gap-12">
          <div className="max-w-2xl">
            <p className="text-porsche-red text-[11px] md:text-[12px] tracking-[0.5em] uppercase font-black mb-4 md:mb-6">Innovation</p>
            <h2 className="text-5xl md:text-9xl font-display font-black text-dark tracking-tighter leading-[0.8]">
              THE<br />SMART HUB.
            </h2>
          </div>
          <p className="text-dark/40 text-sm md:text-base max-w-md font-light leading-relaxed">
            Experience the Dubai property market through the lens of high-performance technology. Find the best off-plan projects in Dubai and new launch projects with high ROI.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
          <FeatureCard 
            icon={CreditCard} 
            title="Free Pre-Approval" 
            description="Get a complimentary mortgage pre-approval from our banking partners — know your budget before you browse."
            badge="100% Free"
            onClick={() => setView('pre-approval')}
          />
          <FeatureCard 
            icon={Calculator} 
            title="ROI Calculator" 
            description="Instantly calculate rental yield, capital appreciation, and break-even timelines on any property."
            badge="Free Tool"
            onClick={() => setView('roi-calculator')}
          />
          <FeatureCard 
            icon={Bell} 
            title="Smart Alerts" 
            description="Set property alerts based on your criteria and get notified the moment a match goes live."
            badge="Real-Time"
          />
          <FeatureCard 
            icon={HandCoins} 
            title="Payment Plans" 
            description="Access flexible 5–10 year payment plans directly from the UAE's top developers."
            badge="50+ Plans"
            onClick={() => setView('calculator')}
          />
        </div>
      </section>

      {/* The Journey - Mapped Blueprint */}
      <section id="journey" className="px-6 md:px-8 lg:px-24 py-12 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block border border-dark/10 px-6 md:px-10 py-3 md:py-4 mb-8 md:mb-12"
            >
              <span className="text-dark text-[11px] md:text-[13px] tracking-[0.5em] md:tracking-[0.8em] uppercase font-black">Technical_Process_Flow</span>
            </motion.div>
            <h2 className="text-6xl md:text-[12rem] font-display font-black text-dark tracking-tighter leading-none">
              THE<br />
              <span className="text-porsche-red">JOURNEY.</span>
            </h2>
          </div>

          <div className="relative">
            {/* Horizontal Connecting Line (The Track) */}
            <div className="absolute top-[104px] left-0 right-0 h-[1px] bg-gray-100 hidden lg:block">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                className="h-full bg-dark/10 origin-left"
              />
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
                className="h-full bg-porsche-red w-1/4 absolute top-0 left-0 shadow-[0_0_15px_rgba(213,0,28,0.3)]"
              />
            </div>

            <div className="relative z-10 flex flex-row overflow-x-auto lg:overflow-x-visible no-scrollbar gap-8 lg:gap-0 pb-20 lg:pb-0 snap-x snap-mandatory">
              <div className="snap-center">
                <JourneyStep 
                  number="01" 
                  title="Browse & Shortlist" 
                  description="Search our verified listings and save your favourites to a personal collection using our smart filtering engine." 
                  index={0}
                />
              </div>
              <div className="snap-center">
                <JourneyStep 
                  number="02" 
                  title="Consult Our Experts" 
                  description="Speak to a dedicated consultant who knows your target market inside out, providing data-backed investment advice." 
                  index={1}
                />
              </div>
              <div className="snap-center">
                <JourneyStep 
                  number="03" 
                  title="Virtual or In-Person Tour" 
                  description="Experience the property before committing — remotely via 4K virtual tours or in person with private transport." 
                  index={2}
                />
              </div>
              <div className="snap-center">
                <JourneyStep 
                  number="04" 
                  title="Secure the Deal" 
                  description="We handle all legal, financial, and DLD registration steps end to end, ensuring a seamless ownership transfer." 
                  index={3}
                />
              </div>
            </div>

            {/* Final Marker */}
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5 }}
              className="flex flex-col items-center mt-32"
            >
              <div className="w-8 h-8 bg-porsche-red rotate-45 mb-8 shadow-[0_0_30px_rgba(213,0,28,0.4)] flex items-center justify-center">
                <div className="w-2 h-2 bg-white rotate-45"></div>
              </div>
              <span className="text-dark font-display font-black text-[11px] tracking-[0.6em] uppercase">Destination Reached</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Area Guide Section - Interactive Map */}
      <section id="explore" className="px-6 md:px-8 lg:px-24 py-12 md:py-24 bg-dark">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 md:gap-12 mb-12 md:mb-20">
          <div className="max-w-3xl">
            <p className="text-porsche-red text-[11px] md:text-[12px] tracking-[0.5em] uppercase font-black mb-4 md:mb-6">Location Intelligence</p>
            <h2 className="text-5xl sm:text-7xl md:text-[10rem] font-display font-black text-white tracking-tighter leading-[0.8]">
              ZONE<br />
              <span className="text-porsche-red">EXPLORER.</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm md:text-base max-w-md leading-relaxed font-light">
            Navigate the most prestigious investment zones in the UAE. Our interactive map provides real-time yield data and district insights.
          </p>
        </div>
        
        <DubaiMap onSearch={(filter) => setActiveFilter(filter)} />
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-white border-t border-gray-100">
        <div className="px-6 md:px-8 lg:px-24 py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-20">
            <div className="md:col-span-4">
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-dark font-display font-black text-3xl md:text-4xl tracking-tighter">ROCK</span>
                <span className="text-dark/40 font-display font-light text-3xl md:text-4xl tracking-tighter">DEALS</span>
              </div>
              <p className="text-porsche-red text-[11px] md:text-[12px] tracking-[0.4em] md:tracking-[0.5em] uppercase font-black mb-8 md:mb-12">
                A DEAL FOR EVERYONE
              </p>
              <p className="text-dark/50 text-sm md:text-base leading-relaxed mb-8 max-w-xs font-light">
                Redefining luxury real estate in the UAE. Find Dubai real estate deals, luxury properties in Dubai, and apartments for sale in Dubai with zero commission.
              </p>
              <div className="mb-8 md:mb-12 space-y-4">
                <a href="tel:+971529178630" className="flex items-center gap-4 group min-h-[44px]">
                  <div className="w-10 h-10 rounded-full border border-dark/5 flex items-center justify-center group-hover:bg-porsche-red group-hover:border-porsche-red transition-all duration-500">
                    <Phone className="w-4 h-4 text-dark/40 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-dark font-technical font-bold text-[16px] tracking-tight group-hover:text-porsche-red transition-colors">+971 529178630</span>
                </a>
                <a href="mailto:info@rock-deals.com" className="flex items-center gap-4 group min-h-[44px]">
                  <div className="w-10 h-10 rounded-full border border-dark/5 flex items-center justify-center group-hover:bg-porsche-red group-hover:border-porsche-red transition-all duration-500">
                    <Mail className="w-4 h-4 text-dark/40 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-dark font-[Arial] font-bold text-[14px] tracking-tight group-hover:text-porsche-red transition-colors uppercase">info@rock-deals.com</span>
                </a>
              </div>
              <div className="flex items-center gap-6 md:gap-8">
                {[
                  { Icon: Instagram, href: 'https://www.instagram.com/rockdeals.ae/' },
                  { Icon: Facebook, href: 'https://www.facebook.com/people/Rock-Deals/61574389357052' },
                  { Icon: Linkedin, href: 'https://www.linkedin.com/in/rock-deals-b826103b5/' },
                  { Icon: Phone, href: 'tel:+971529178630' },
                  { Icon: Twitter, href: '#' }
                ].map(({ Icon, href }, i) => (
                  <a 
                    key={i} 
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-dark/20 hover:text-porsche-red transition-all duration-300 cursor-pointer hover:scale-110"
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-dark text-[12px] tracking-[0.4em] uppercase font-black mb-10">Explore</h4>
              <ul className="space-y-5">
                {[
                  { name: 'Properties', href: '#property-types' },
                  { name: 'Area Guide', onClick: () => setView('area-guide') },
                  { name: 'Developers', onClick: () => setView('developers') },
                  { name: 'Gallery', href: '#property-types' },
                  { name: 'Features', href: '#features' },
                  { name: 'Contact', href: '#contact' }
                ].map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.href}
                      onClick={(e) => {
                        if (item.onClick) {
                          e.preventDefault();
                          item.onClick();
                        }
                      }}
                      className="text-dark/40 text-sm hover:text-porsche-red transition-colors font-light cursor-pointer"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-dark text-[12px] tracking-[0.4em] uppercase font-black mb-10">Property Types</h4>
              <ul className="space-y-5">
                {['Luxury Villas', 'Penthouses', 'Apartments', 'Townhouses', 'Off-Plan'].map((item) => (
                  <li key={item}>
                    <a 
                      href="#property-types"
                      onClick={() => setActiveFilter(item)}
                      className="text-dark/40 text-sm hover:text-porsche-red transition-colors font-light cursor-pointer"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-dark text-[12px] tracking-[0.4em] uppercase font-black mb-10">Newsletter</h4>
              <p className="text-dark/40 text-sm mb-8 font-light leading-relaxed">Stay updated with exclusive property launches and market intelligence.</p>
              <div className="flex border-b border-dark/10 pb-4 group focus-within:border-porsche-red transition-colors">
                <input type="email" placeholder="Email Address" className="bg-transparent border-none outline-none text-sm w-full placeholder:text-dark/20" />
                <button className="text-dark/20 group-focus-within:text-porsche-red hover:text-porsche-red transition-colors"><ArrowRight className="w-6 h-6" /></button>
              </div>
            </div>
          </div>

          <div className="mt-32 pt-12 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-8">
            <p className="text-dark/20 text-[12px] tracking-widest uppercase font-black">© 2026 Rock Deals Real Estate. All Rights Reserved.</p>
            <div className="flex items-center gap-12">
              {['Privacy Policy', 'Terms', 'Cookies'].map((item) => (
                <a key={item} className="text-dark/20 text-[12px] tracking-widest uppercase font-black hover:text-dark transition-colors cursor-pointer">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )}

      {/* Enquiry Modal */}
      <AnimatePresence>
        {isEnquiryModalOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEnquiryModalOpen(false)}
              className="absolute inset-0 bg-dark/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl overflow-hidden"
            >
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-porsche-red/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-porsche-red text-[11px] tracking-[0.4em] uppercase font-black mb-2">Enquiry Form</p>
                    <h3 className="text-3xl font-display font-black text-dark uppercase tracking-tight">Submit Details<span className="text-porsche-red">.</span></h3>
                  </div>
                  <button 
                    onClick={() => setIsEnquiryModalOpen(false)}
                    className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-dark/20 hover:text-porsche-red transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleEnquirySubmit} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black tracking-widest uppercase text-dark/40 mb-3 ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-porsche-red" />
                      <input 
                        required
                        type="text" 
                        placeholder="Your Name"
                        value={enquiryForm.name}
                        onChange={(e) => setEnquiryForm({...enquiryForm, name: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-14 pr-6 text-dark text-xs font-technical tracking-widest focus:outline-none focus:border-porsche-red/50 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black tracking-widest uppercase text-dark/40 mb-3 ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-porsche-red" />
                      <input 
                        required
                        type="email" 
                        placeholder="email@example.com"
                        value={enquiryForm.email}
                        onChange={(e) => setEnquiryForm({...enquiryForm, email: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-14 pr-6 text-dark text-xs font-technical tracking-widest focus:outline-none focus:border-porsche-red/50 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black tracking-widest uppercase text-dark/40 mb-3 ml-1">Mobile Number</label>
                    <div className="relative">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-porsche-red" />
                      <input 
                        required
                        type="tel" 
                        placeholder="+971 00 000 0000"
                        value={enquiryForm.mobile}
                        onChange={(e) => setEnquiryForm({...enquiryForm, mobile: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-14 pr-6 text-dark text-xs font-technical tracking-widest focus:outline-none focus:border-porsche-red/50 transition-all"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-dark text-white rounded-2xl py-5 text-[12px] font-black tracking-[0.4em] uppercase hover:bg-porsche-red transition-all shadow-xl hover:shadow-porsche-red/20 active:scale-95 mt-4"
                  >
                    Send Enquiry Now
                  </button>

                  <div className="relative py-4 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-100"></div>
                    </div>
                    <span className="relative bg-white px-4 text-[8px] font-black tracking-widest uppercase text-dark/20">or</span>
                  </div>

                  <a 
                    href="https://wa.me/971529178630"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-[#25D366] text-white rounded-2xl py-5 text-[12px] font-black tracking-[0.4em] uppercase hover:bg-[#128C7E] transition-all shadow-xl flex items-center justify-center gap-3"
                  >
                    <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
                  </a>
                  
                  <p className="text-center text-[8px] text-dark/20 uppercase tracking-widest font-bold mt-4">
                    By submitting, you agree to our privacy policy.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
