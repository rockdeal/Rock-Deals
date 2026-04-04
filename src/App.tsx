import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight, 
  ArrowLeft,
  CreditCard, 
  Calculator, 
  Bell, 
  HandCoins,
  MapPin,
  Instagram,
  Linkedin,
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
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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

const NavLink = ({ href, children, active = false }: { href: string; children: React.ReactNode; active?: boolean }) => (
  <a 
    href={href} 
    className={`text-[10px] tracking-[0.25em] uppercase font-black transition-all duration-300 cursor-pointer whitespace-nowrap relative group ${active ? 'text-dark' : 'text-dark/50 hover:text-dark'}`}
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
      <span className="bg-gray-100 text-dark/40 text-[7px] font-black px-3 py-1 tracking-[0.3em] uppercase whitespace-nowrap group-hover:bg-porsche-red group-hover:text-white transition-colors duration-500">
        {badge}
      </span>
    </div>
    <h3 className="text-dark font-display font-black text-xl mb-4 tracking-tight uppercase">
      {title}
    </h3>
    <p className="text-dark/50 text-sm leading-relaxed font-light">
      {description}
    </p>
    <div className="mt-10 flex items-center gap-3 text-porsche-red text-[9px] font-black tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
      {onClick ? 'Open Calculator' : 'Explore Details'} <ArrowRight className="w-3 h-3" />
    </div>
  </div>
);

const PaymentCalculator = ({ onBack }: { onBack: () => void }) => {
  const [price, setPrice] = useState<number>(1000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(10);
  const [selectedPlan, setSelectedPlan] = useState('60/40');

  const plans: Record<string, { during: number; handover: number; post?: number }> = {
    '60/40': { during: 60, handover: 40 },
    '70/30': { during: 70, handover: 30 },
    '50/50': { during: 50, handover: 50 },
    '80/20': { during: 80, handover: 20 },
    '40/60 (Post Handover)': { during: 40, handover: 0, post: 60 },
  };

  const currentPlan = plans[selectedPlan] || plans['60/40'];
  
  const dpAmount = (price * downPaymentPercent) / 100;
  const duringAmount = (price * (currentPlan.during - downPaymentPercent)) / 100;
  const handoverAmount = (price * currentPlan.handover) / 100;
  const postAmount = currentPlan.post ? (price * currentPlan.post) / 100 : 0;

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="min-h-screen bg-white font-sans text-dark">
      {/* Header */}
      <header className="px-8 lg:px-24 py-8 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-xl z-50">
        <div className="flex items-baseline gap-1">
          <span className="text-dark font-display font-black text-2xl tracking-tighter">ROCK</span>
          <span className="text-dark/40 font-display font-light text-2xl tracking-tighter">DEALS</span>
        </div>
        <button 
          onClick={onBack}
          className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase font-black hover:text-porsche-red transition-colors"
        >
          <X className="w-4 h-4" /> Close Calculator
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-24">
        <div className="mb-20">
          <p className="text-porsche-red text-[10px] tracking-[0.5em] uppercase font-black mb-6">Financial Intelligence</p>
          <h1 className="text-6xl md:text-8xl font-display font-black text-dark tracking-tighter leading-none uppercase">
            Payment Plan<br />
            <span className="text-porsche-red">Calculator.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Inputs */}
          <div className="space-y-12">
            <div className="space-y-4">
              <label className="text-[10px] tracking-[0.3em] uppercase font-black text-dark/40">Property Price (AED)</label>
              <div className="relative group">
                <input 
                  type="number" 
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full bg-gray-50 border-b-2 border-gray-100 py-6 px-0 text-3xl font-technical font-bold focus:border-porsche-red outline-none transition-all"
                />
                <div className="absolute right-0 bottom-6 text-dark/20 font-technical font-bold">AED</div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] tracking-[0.3em] uppercase font-black text-dark/40">Down Payment (%)</label>
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
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full h-full border-2 border-gray-100 bg-gray-50 px-4 text-center font-technical font-bold focus:border-porsche-red outline-none"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black opacity-20">%</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] tracking-[0.3em] uppercase font-black text-dark/40">Select Payment Plan</label>
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
                  <p className="text-white/40 text-[9px] tracking-[0.3em] uppercase font-black mb-2">Down Payment</p>
                  <p className="text-white font-technical font-bold text-xl">{downPaymentPercent}%</p>
                </div>
                <p className="text-porsche-red font-technical font-bold text-2xl">{formatCurrency(dpAmount)}</p>
              </div>

              <div className="flex justify-between items-end border-b border-white/10 pb-6">
                <div>
                  <p className="text-white/40 text-[9px] tracking-[0.3em] uppercase font-black mb-2">During Construction</p>
                  <p className="text-white font-technical font-bold text-xl">{currentPlan.during - downPaymentPercent}%</p>
                </div>
                <p className="text-white font-technical font-bold text-2xl">{formatCurrency(duringAmount)}</p>
              </div>

              {currentPlan.handover > 0 && (
                <div className="flex justify-between items-end border-b border-white/10 pb-6">
                  <div>
                    <p className="text-white/40 text-[9px] tracking-[0.3em] uppercase font-black mb-2">On Handover</p>
                    <p className="text-white font-technical font-bold text-xl">{currentPlan.handover}%</p>
                  </div>
                  <p className="text-white font-technical font-bold text-2xl">{formatCurrency(handoverAmount)}</p>
                </div>
              )}

              {currentPlan.post !== undefined && currentPlan.post > 0 && (
                <div className="flex justify-between items-end border-b border-white/10 pb-6">
                  <div>
                    <p className="text-white/40 text-[9px] tracking-[0.3em] uppercase font-black mb-2">Post Handover</p>
                    <p className="text-white font-technical font-bold text-xl">{currentPlan.post}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-porsche-red font-technical font-bold text-2xl">{formatCurrency(postAmount)}</p>
                    <p className="text-white/20 text-[8px] tracking-widest uppercase mt-1">Est. {formatCurrency(postAmount / 36)} / mo (3 yrs)</p>
                  </div>
                </div>
              )}

              <div className="pt-12 flex justify-between items-center">
                <p className="text-white/60 text-[10px] tracking-[0.4em] uppercase font-black">Total Commitment</p>
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
  const [price, setPrice] = useState<number>(2000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(25);
  const [monthlyRent, setMonthlyRent] = useState<number>(15000);
  const [serviceCharges, setServiceCharges] = useState<number>(15000);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [loanTenure, setLoanTenure] = useState<number>(25);
  const [appreciation, setAppreciation] = useState<number>(5);
  const [holdingPeriod, setHoldingPeriod] = useState<number>(5);
  const [maintenance, setMaintenance] = useState<number>(1);
  const [vacancy, setVacancy] = useState<number>(5);

  const [showResults, setShowResults] = useState(false);

  // Calculations
  const annualRent = monthlyRent * 12;
  const grossYield = (annualRent / price) * 100;
  const effectiveRent = annualRent * (1 - vacancy / 100);
  const maintenanceCost = (price * maintenance) / 100;
  const netRentalIncome = effectiveRent - serviceCharges - maintenanceCost;
  const netYield = (netRentalIncome / price) * 100;
  
  const loanAmount = price * (1 - downPaymentPercent / 100);
  const monthlyInterestRate = (interestRate / 100) / 12;
  const numberOfPayments = loanTenure * 12;
  const monthlyMortgage = loanAmount > 0 
    ? (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
    : 0;
  
  const annualMortgage = monthlyMortgage * 12;
  const annualCashFlow = netRentalIncome - annualMortgage;
  
  const futureValue = price * Math.pow(1 + appreciation / 100, holdingPeriod);
  const capitalGain = futureValue - price;
  const totalRentalIncome = netRentalIncome * holdingPeriod;
  const totalProfit = totalRentalIncome + capitalGain;
  const initialInvestment = (price * downPaymentPercent / 100) + (price * 0.04); // Including 4% DLD fee
  const totalROI = (totalProfit / initialInvestment) * 100;

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED', maximumFractionDigits: 0 }).format(val);

  const chartData = [
    { name: 'Year 0', value: price },
    ...Array.from({ length: holdingPeriod }, (_, i) => ({
      name: `Year ${i + 1}`,
      value: price * Math.pow(1 + appreciation / 100, i + 1)
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
      <header className="px-8 lg:px-24 py-8 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#0A0A0A]/80 backdrop-blur-xl z-50">
        <div className="flex items-baseline gap-1">
          <span className="text-white font-display font-black text-2xl tracking-tighter">ROCK</span>
          <span className="text-white/40 font-display font-light text-2xl tracking-tighter">DEALS</span>
        </div>
        <button 
          onClick={onBack}
          className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase font-black hover:text-[#B12B28] transition-colors"
        >
          <X className="w-4 h-4" /> Exit Calculator
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-24">
        <div className="max-w-3xl mb-24">
          <p className="text-[#B12B28] text-[10px] tracking-[0.5em] uppercase font-black mb-6">Investment Analytics</p>
          <h1 className="text-6xl md:text-8xl font-display font-black text-white tracking-tighter leading-none uppercase mb-8">
            Property ROI<br />
            <span className="text-[#B12B28]">Calculator.</span>
          </h1>
          <p className="text-[#BFBFBF] text-xl font-light leading-relaxed">
            Calculate rental yield, ROI and future value in seconds with precision-engineered financial modeling.
          </p>
          <button 
            onClick={() => {
              setShowResults(true);
              window.scrollTo({ top: 800, behavior: 'smooth' });
            }}
            className="mt-12 bg-[#B12B28] text-white px-12 py-6 text-[10px] tracking-[0.4em] uppercase font-black hover:bg-white hover:text-black transition-all duration-500"
          >
            Calculate ROI
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          {/* Inputs Section */}
          <div className="lg:col-span-5 space-y-16">
            <div className="space-y-12">
              <h3 className="text-white/20 text-[10px] tracking-[0.4em] uppercase font-black border-b border-white/5 pb-4">Core Parameters</h3>
              
              <div className="space-y-6">
                <label className="text-[10px] tracking-[0.3em] uppercase font-black text-[#BFBFBF]">Property Price (AED)</label>
                <div className="relative group">
                  <input 
                    type="number" 
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-3xl font-technical font-bold focus:border-[#B12B28] outline-none transition-all"
                  />
                  <div className="absolute right-0 bottom-4 text-white/20 font-technical font-bold">AED</div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] tracking-[0.3em] uppercase font-black text-[#BFBFBF]">Down Payment</label>
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
                  <label className="text-[10px] tracking-[0.3em] uppercase font-black text-[#BFBFBF]">Monthly Rent</label>
                  <input 
                    type="number" value={monthlyRent}
                    onChange={(e) => setMonthlyRent(Number(e.target.value))}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-technical font-bold focus:border-[#B12B28] outline-none"
                  />
                </div>
                <div className="space-y-6">
                  <label className="text-[10px] tracking-[0.3em] uppercase font-black text-[#BFBFBF]">Service Charges (Annual)</label>
                  <input 
                    type="number" value={serviceCharges}
                    onChange={(e) => setServiceCharges(Number(e.target.value))}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-technical font-bold focus:border-[#B12B28] outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <h3 className="text-white/20 text-[10px] tracking-[0.4em] uppercase font-black border-b border-white/5 pb-4">Mortgage & Growth</h3>
              
              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] tracking-[0.3em] uppercase font-black text-[#BFBFBF]">Interest Rate</label>
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
                  <label className="text-[10px] tracking-[0.3em] uppercase font-black text-[#BFBFBF]">Loan Tenure (Yrs)</label>
                  <input 
                    type="number" value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-technical font-bold focus:border-[#B12B28] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] tracking-[0.3em] uppercase font-black text-[#BFBFBF]">Appreciation</label>
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
                  <label className="text-[10px] tracking-[0.3em] uppercase font-black text-[#BFBFBF]">Holding Period (Yrs)</label>
                  <input 
                    type="number" value={holdingPeriod}
                    onChange={(e) => setHoldingPeriod(Number(e.target.value))}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-technical font-bold focus:border-[#B12B28] outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <h3 className="text-white/20 text-[10px] tracking-[0.4em] uppercase font-black border-b border-white/5 pb-4">Optional Overheads</h3>
              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-6">
                  <label className="text-[10px] tracking-[0.3em] uppercase font-black text-[#BFBFBF]">Maintenance (%)</label>
                  <input 
                    type="range" min="0" max="5" step="0.5"
                    value={maintenance}
                    onChange={(e) => setMaintenance(Number(e.target.value))}
                    className="w-full accent-[#B12B28] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="space-y-6">
                  <label className="text-[10px] tracking-[0.3em] uppercase font-black text-[#BFBFBF]">Vacancy Rate (%)</label>
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
                        <p className="text-[10px] tracking-widest uppercase font-black">Strong Rental Investment</p>
                      </div>
                    )}
                    {appreciation > 5 && (
                      <div className="bg-white/5 border border-white/10 p-6 flex items-center gap-4">
                        <TrendingUp className="text-white w-6 h-6" />
                        <p className="text-[10px] tracking-widest uppercase font-black">High Growth Potential</p>
                      </div>
                    )}
                    {annualCashFlow > 0 && (
                      <div className="bg-white/5 border border-white/10 p-6 flex items-center gap-4">
                        <DollarSign className="text-white w-6 h-6" />
                        <p className="text-[10px] tracking-widest uppercase font-black">Positive Cash Flow</p>
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
                        <p className="text-white/40 text-[9px] tracking-[0.4em] uppercase font-black mb-4">{item.label}</p>
                        <p className={`text-4xl font-display font-black tracking-tighter ${item.color}`}>{item.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* ROI Highlight */}
                  <div className="bg-[#B12B28] p-12 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div>
                      <p className="text-white/60 text-[10px] tracking-[0.4em] uppercase font-black mb-2">Total ROI over {holdingPeriod} years</p>
                      <h2 className="text-7xl font-display font-black text-white tracking-tighter">{totalROI.toFixed(1)}%</h2>
                    </div>
                    <button className="bg-white text-black px-10 py-5 text-[10px] tracking-[0.4em] uppercase font-black hover:bg-black hover:text-white transition-all duration-500 flex items-center gap-3">
                      <Download className="w-4 h-4" /> Export Report
                    </button>
                  </div>

                  {/* Charts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
                    <div className="bg-white/5 p-8 border border-white/10">
                      <h4 className="text-[10px] tracking-[0.4em] uppercase font-black text-white/40 mb-10">Future Value Growth</h4>
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
                      <h4 className="text-[10px] tracking-[0.4em] uppercase font-black text-white/40 mb-10">Profit Breakdown</h4>
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
                      
                      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                            <input type="text" placeholder="Full Name" className="w-full bg-gray-50 border border-gray-100 py-4 pl-12 pr-4 text-black outline-none focus:border-[#B12B28]" />
                          </div>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                            <input type="tel" placeholder="Phone Number" className="w-full bg-gray-50 border border-gray-100 py-4 pl-12 pr-4 text-black outline-none focus:border-[#B12B28]" />
                          </div>
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                          <input type="email" placeholder="Email Address" className="w-full bg-gray-50 border border-gray-100 py-4 pl-12 pr-4 text-black outline-none focus:border-[#B12B28]" />
                        </div>
                        <button className="w-full bg-[#B12B28] text-white py-6 text-[10px] tracking-[0.4em] uppercase font-black hover:bg-black transition-all duration-500">
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
      <span className="text-porsche-red text-[10px] tracking-[0.6em] font-black uppercase opacity-60 group-hover:opacity-100 transition-opacity duration-500">Phase {number}</span>
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
    coords: { x: '45%', y: '32%' },
    link: 'https://www.bayut.com/mybayut/dubai-sales-market-report-h1-2023/'
  },
  {
    id: 'marina',
    name: 'Marina & JBR',
    areas: ['Dubai Marina', 'JBR', 'Blue Waters', 'Marsa Dubai'],
    yield: '7.8%',
    pricePerSqft: '2,100 AED',
    description: 'A vibrant waterfront community known for its high-rise towers, luxury yachts, and a bustling promenade with world-class dining.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
    coords: { x: '35%', y: '38%' },
    link: 'https://www.bayut.com/mybayut/dubai-sales-market-report-h1-2023/'
  },
  {
    id: 'downtown',
    name: 'Downtown Core',
    areas: ['Downtown Dubai', 'Business Bay', 'DIFC', 'Burj Dubai'],
    yield: '6.5%',
    pricePerSqft: '2,950 AED',
    description: 'The heart of Dubai, home to the Burj Khalifa (formerly Burj Dubai), Dubai Mall, and the city\'s premier financial hubs.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',
    coords: { x: '65%', y: '28%' },
    link: 'https://www.bayut.com/mybayut/dubai-sales-market-report-h1-2023/'
  },
  {
    id: 'hills',
    name: 'Emirates Hills',
    areas: ['Emirates Hills', 'Jumeirah Islands', 'Meadows', 'Montgomerie'],
    yield: '5.8%',
    pricePerSqft: '2,450 AED',
    description: 'Exclusive gated communities featuring sprawling villas, lush greenery, and championship golf courses for elite living.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    coords: { x: '38%', y: '48%' },
    link: 'https://www.bayut.com/mybayut/dubai-sales-market-report-h1-2023/'
  },
  {
    id: 'jvc',
    name: 'JVC & Sports City',
    areas: ['JVC', 'JVT', 'Sports City', 'Motor City'],
    yield: '8.2%',
    pricePerSqft: '1,150 AED',
    description: 'Rapidly developing residential areas offering high rental yields and modern lifestyle amenities for families and professionals.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
    coords: { x: '42%', y: '58%' },
    link: 'https://www.bayut.com/mybayut/dubai-sales-market-report-h1-2023/'
  },
  {
    id: 'creek',
    name: 'Creek Harbour',
    areas: ['Dubai Creek Harbour', 'Meydan', 'The Lagoons'],
    yield: '6.9%',
    pricePerSqft: '1,950 AED',
    description: 'A futuristic waterfront destination blending modern architecture with natural beauty, set to become the new heart of the city.',
    image: 'https://images.unsplash.com/photo-1549944850-84e00be4203b?auto=format&fit=crop&q=80&w=800',
    coords: { x: '78%', y: '22%' },
    link: 'https://www.bayut.com/mybayut/dubai-sales-market-report-h1-2023/'
  },
  {
    id: 'jebel-ali',
    name: 'Jebel Ali Village',
    areas: ['Jebel Ali', 'Discovery Gardens', 'The Gardens'],
    yield: '7.1%',
    pricePerSqft: '1,050 AED',
    description: 'The southern gateway of Dubai, featuring massive industrial hubs and established residential communities like Discovery Gardens.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',
    coords: { x: '12%', y: '55%' },
    link: 'https://www.bayut.com/mybayut/dubai-sales-market-report-h1-2023/'
  },
  {
    id: 'al-barsha',
    name: 'Al Barsha District',
    areas: ['Al Barsha', 'Al Quoz', 'Mall of Emirates'],
    yield: '6.7%',
    pricePerSqft: '1,350 AED',
    description: 'A central residential and commercial hub, home to the Mall of the Emirates and a diverse range of property options.',
    image: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&q=80&w=800',
    coords: { x: '55%', y: '42%' },
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

        <svg viewBox="0 0 800 600" className="w-full h-full">
          {/* Detailed Coastline Path */}
          <motion.path
            d="M0,520 L80,500 L120,480 L180,440 L250,410 L320,380 L400,350 L480,320 L550,280 L620,240 L700,180 L800,120"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1.5"
            strokeDasharray="8 4"
          />

          {/* Major Road Networks (Stylized) */}
          {/* Sheikh Zayed Road (E11) */}
          <motion.path
            d="M0,580 L100,540 L200,500 L350,440 L500,380 L650,300 L800,220"
            fill="none"
            stroke="rgba(213,0,28,0.2)"
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <text x="50" y="565" className="fill-white/20 text-[6px] font-technical font-bold uppercase tracking-widest">E11 - Sheikh Zayed Rd</text>
          
          {/* Al Khail Road (E44) */}
          <motion.path
            d="M100,600 L250,540 L400,480 L550,400 L700,320 L800,280"
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1.5"
          />
          <text x="180" y="575" className="fill-white/10 text-[6px] font-technical font-bold uppercase tracking-widest">E44 - Al Khail Rd</text>

          {/* Emirates Road (E611) */}
          <motion.path
            d="M200,600 L400,540 L600,460 L800,380"
            fill="none"
            stroke="rgba(255,255,255,0.02)"
            strokeWidth="1"
          />
          <text x="350" y="565" className="fill-white/5 text-[6px] font-technical font-bold uppercase tracking-widest">E611 - Emirates Rd</text>

          {/* Stylized Palm Jebel Ali */}
          <g transform="translate(120, 480) scale(0.4) rotate(-25)">
            {[...Array(10)].map((_, i) => (
              <line key={i} x1="0" y1="0" x2={Math.cos(i * 0.35) * 65} y2={Math.sin(i * 0.35) * 65} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            ))}
          </g>

          {/* Stylized Palm Jumeirah */}
          <g transform="translate(420, 320) scale(0.7) rotate(-15)">
            <path d="M-10,0 Q0,-60 10,0 T30,0" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            {[...Array(14)].map((_, i) => {
              if (i === 6 || i === 10) return null;
              return (
                <line key={i} x1="0" y1="0" x2={Math.cos(i * 0.25) * 75} y2={Math.sin(i * 0.25) * 75} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              );
            })}
          </g>

          {/* Stylized The World Islands */}
          <g transform="translate(580, 200) scale(0.5)">
            {[...Array(25)].map((_, i) => (
              <circle 
                key={i} 
                cx={Math.sin(i) * 60 + (Math.random() * 20)} 
                cy={Math.cos(i) * 40 + (Math.random() * 20)} 
                r={Math.random() * 4 + 1.5} 
                fill="rgba(255,255,255,0.15)" 
              />
            ))}
          </g>

          {/* Burj Al Arab Landmark */}
          <g transform="translate(480, 280)">
            <path d="M0,0 L-5,-15 L5,-15 Z" fill="#d5001c" />
            <circle cx="0" cy="-18" r="2" fill="#d5001c" />
            <text x="10" y="-15" className="fill-white/40 text-[5px] font-technical font-bold uppercase tracking-widest">Burj Al Arab</text>
          </g>

          {/* Burj Khalifa Landmark */}
          <g transform="translate(680, 240)">
            <path d="M-2,0 L0,-40 L2,0 Z" fill="#d5001c" />
            <circle cx="0" cy="-42" r="1.5" fill="#d5001c" className="animate-pulse" />
            <text x="10" y="-35" className="fill-white/40 text-[5px] font-technical font-bold uppercase tracking-widest">Burj Khalifa</text>
          </g>

          {/* Additional Landmarks from Image */}
          <g transform="translate(520, 260)">
            <circle cx="0" cy="0" r="1.5" fill="rgba(255,255,255,0.2)" />
            <text x="5" y="2" className="fill-white/10 text-[4px] font-technical font-bold uppercase tracking-widest">Dubai Zoo</text>
          </g>

          <g transform="translate(580, 280)">
            <rect x="-1.5" y="-1.5" width="3" height="3" fill="rgba(255,255,255,0.1)" />
            <text x="5" y="2" className="fill-white/10 text-[4px] font-technical font-bold uppercase tracking-widest">Safa Park</text>
          </g>

          <g transform="translate(280, 520)">
            <circle cx="0" cy="0" r="1.5" fill="rgba(255,255,255,0.2)" />
            <text x="5" y="2" className="fill-white/10 text-[4px] font-technical font-bold uppercase tracking-widest">Sports City</text>
          </g>

          <g transform="translate(180, 540)">
            <circle cx="0" cy="0" r="1.5" fill="rgba(255,255,255,0.2)" />
            <text x="5" y="2" className="fill-white/10 text-[4px] font-technical font-bold uppercase tracking-widest">IMPZ</text>
          </g>

          <g transform="translate(150, 450)">
            <circle cx="0" cy="0" r="1.5" fill="rgba(255,255,255,0.2)" />
            <text x="5" y="2" className="fill-white/10 text-[4px] font-technical font-bold uppercase tracking-widest">Discovery Gardens</text>
          </g>

          <g transform="translate(320, 480)">
            <circle cx="0" cy="0" r="1.5" fill="rgba(255,255,255,0.2)" />
            <text x="5" y="2" className="fill-white/10 text-[4px] font-technical font-bold uppercase tracking-widest">Jumeirah Golf Estates</text>
          </g>

          {/* Madinat Jumeirah / Wild Wadi Area */}
          <g transform="translate(460, 295)">
            <rect x="-2" y="-2" width="4" height="4" fill="rgba(255,255,255,0.1)" />
            <text x="6" y="2" className="fill-white/20 text-[4px] font-technical font-bold uppercase tracking-widest">Madinat Jumeirah</text>
          </g>

          {/* Stylized Palm Deira / Creek Harbour */}
          <g transform="translate(780, 80) scale(0.8) rotate(-5)">
            {[...Array(18)].map((_, i) => (
              <line key={i} x1="0" y1="0" x2={Math.cos(i * 0.18) * 100} y2={Math.sin(i * 0.18) * 100} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            ))}
          </g>
          
          {/* Grid Lines (Technical Overlay) */}
          {[...Array(25)].map((_, i) => (
            <line key={`v-${i}`} x1={i * 32} y1="0" x2={i * 32} y2="600" stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" />
          ))}
          {[...Array(20)].map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={i * 30} x2="800" y2={i * 30} stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" />
          ))}

          {/* Zone Hotspots */}
          {ZONES.map((zone) => (
            <g 
              key={zone.id} 
              className="cursor-pointer group/zone"
              onClick={() => setActiveZone(zone)}
            >
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
                  <line x1={parseFloat(zone.coords.x) - 4 + '%'} y1={zone.coords.y} x2={parseFloat(zone.coords.x) + 4 + '%'} y2={zone.coords.y} stroke="#d5001c" strokeWidth="0.5" strokeDasharray="2 2" />
                  <line x1={zone.coords.x} y1={parseFloat(zone.coords.y) - 4 + '%'} x2={zone.coords.x} y2={parseFloat(zone.coords.y) + 4 + '%'} stroke="#d5001c" strokeWidth="0.5" strokeDasharray="2 2" />
                </g>
              )}
              
              {/* Zone Label */}
              <text
                x={zone.coords.x}
                y={parseFloat(zone.coords.y) - 18 + '%'}
                textAnchor="middle"
                className={`text-[7px] font-technical font-bold tracking-[0.25em] uppercase transition-all duration-500 ${activeZone.id === zone.id ? 'opacity-100 fill-white text-[11px] glow-porsche' : 'opacity-30 fill-white/30 group-hover/zone:opacity-100 group-hover/zone:fill-white'}`}
              >
                {zone.name}
              </text>
            </g>
          ))}
        </svg>

        {/* Technical Data Overlays */}
        <div className="absolute top-10 left-10 flex flex-col gap-6">
          <div className="flex flex-col">
            <span className="text-[6px] font-mono text-white/20 tracking-[0.6em] uppercase mb-2">Telemetry_Stream</span>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-porsche-red animate-pulse"></div>
              <span className="text-[10px] font-mono text-white/50 tracking-[0.2em] uppercase">LAT: 25.2048° N</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-porsche-red animate-pulse delay-75"></div>
              <span className="text-[10px] font-mono text-white/50 tracking-[0.2em] uppercase">LNG: 55.2708° E</span>
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
            <div className="flex items-center gap-4 mb-10">
              <div className="w-3 h-3 bg-porsche-red"></div>
              <span className="text-white/30 text-[9px] tracking-[0.6em] font-black uppercase">Zone_Intelligence_Report</span>
            </div>

            <h3 className="text-6xl md:text-8xl font-display font-black text-white mb-10 tracking-tighter leading-[0.85] uppercase">
              {activeZone.name.split(' ').map((word, i) => (
                <span key={i} className={i === 0 ? 'block' : 'block text-porsche-red'}>{word}</span>
              ))}
            </h3>

            <p className="text-white/50 text-lg leading-relaxed font-light mb-16 max-w-lg">
              {activeZone.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/5 mb-16 border border-white/5">
              <div className="bg-dark p-10">
                <span className="text-white/20 text-[8px] tracking-[0.5em] uppercase font-technical font-bold block mb-4">Yield_Index</span>
                <span className="text-white font-display font-black text-5xl tracking-tighter">{activeZone.yield}</span>
              </div>
              <div className="bg-dark p-10">
                <span className="text-white/20 text-[8px] tracking-[0.5em] uppercase font-technical font-bold block mb-4">Price_Per_Sqft</span>
                <span className="text-white font-display font-black text-4xl tracking-tighter">{activeZone.pricePerSqft}</span>
              </div>
              <div className="bg-dark p-10 col-span-2 md:col-span-1">
                <span className="text-white/20 text-[8px] tracking-[0.5em] uppercase font-technical font-bold block mb-4">District_Count</span>
                <span className="text-white font-display font-black text-5xl tracking-tighter">{activeZone.areas.length}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8 mb-16">
              <motion.a 
                href="#property-types"
                onClick={() => onSearch?.('All Properties')}
                whileHover={{ x: 20 }}
                className="group flex items-center gap-8 text-white text-[10px] tracking-[0.5em] font-technical font-bold uppercase"
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
                className="group flex items-center gap-8 text-white/40 text-[10px] tracking-[0.5em] font-technical font-bold uppercase"
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
  { id: 1, title: 'The Royal Palm Villa', category: 'Luxury Villas', price: 'AED 45,000,000', location: 'Palm Jumeirah', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Skyline Penthouse', category: 'Penthouses', price: 'AED 28,500,000', location: 'Downtown Dubai', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Marina Edge Apartment', category: 'Apartments', price: 'AED 4,200,000', location: 'Dubai Marina', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'Desert Rose Townhouse', category: 'Townhouses', price: 'AED 3,800,000', location: 'Arabian Ranches', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800' },
  { id: 5, title: 'The Crystal Tower', category: 'Off-Plan', price: 'Starting AED 1,500,000', location: 'Business Bay', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800' },
  { id: 6, title: 'Modern Creek Residence', category: 'Ready to Move', price: 'AED 2,100,000', location: 'Dubai Creek Harbour', image: 'https://images.unsplash.com/photo-1600607687940-47a0f9259d4b?auto=format&fit=crop&q=80&w=800' },
  { id: 7, title: 'Azure Waterfront Villa', category: 'Luxury Villas', price: 'AED 32,000,000', location: 'Jumeirah Bay', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800' },
];

const DEVELOPERS = [
  {
    id: 1,
    name: 'Emaar Properties',
    logo: 'https://logo.clearbit.com/emaar.com',
    description: 'The global developer of iconic landmarks including Burj Khalifa and Dubai Mall.',
    projects: [
      { name: 'Burj Khalifa', type: 'Iconic Landmark', location: 'Downtown Dubai', details: 'The world\'s tallest building, featuring luxury residences and corporate suites.' },
      { name: 'Dubai Hills Estate', type: 'Master Community', location: 'Dubai Hills', details: 'A vast green community with villas, apartments, and a championship golf course.' }
    ]
  },
  {
    id: 2,
    name: 'Nakheel',
    logo: 'https://logo.clearbit.com/nakheel.com',
    description: 'Renowned for world-famous projects like Palm Jumeirah and The World Islands.',
    projects: [
      { name: 'Palm Jumeirah', type: 'Island Community', location: 'The Palm', details: 'The world\'s largest man-made island, home to ultra-luxury villas and resorts.' },
      { name: 'The World Islands', type: 'Archipelago', location: 'Dubai Coast', details: 'A collection of 300 man-made private islands shaped like the world map.' }
    ]
  },
  {
    id: 3,
    name: 'DAMAC Properties',
    logo: 'https://logo.clearbit.com/damacproperties.com',
    description: 'Leading luxury real estate developer in the Middle East since 2002.',
    projects: [
      { name: 'DAMAC Hills', type: 'Golf Community', location: 'Dubailand', details: 'Luxury villas and apartments centered around the Trump International Golf Club.' },
      { name: 'Cavalli Tower', type: 'Ultra-Luxury Residential', location: 'Dubai Marina', details: 'The only Cavalli-branded tower in the world with private pools and beach access.' }
    ]
  },
  {
    id: 4,
    name: 'Sobha Realty',
    logo: 'https://logo.clearbit.com/sobharealty.com',
    description: 'A global luxury developer committed to redefining the art of living.',
    projects: [
      { name: 'Sobha Hartland', type: 'Master Community', location: 'MBR City', details: 'An 8 million sq. ft. waterfront community featuring luxury apartments and villas.' },
      { name: 'Sobha SeaHaven', type: 'Waterfront Living', location: 'Dubai Harbour', details: 'Ultra-luxury apartments with panoramic views of the Palm and Dubai Marina.' }
    ]
  },
  {
    id: 5,
    name: 'Meraas',
    logo: 'https://logo.clearbit.com/meraas.com',
    description: 'Creating destinations that enhance the Dubai lifestyle through innovation.',
    projects: [
      { name: 'Bluewaters Island', type: 'Lifestyle Destination', location: 'Dubai Coast', details: 'Home to Ain Dubai, featuring premium residences and retail experiences.' },
      { name: 'City Walk', type: 'Urban Living', location: 'Al Wasl', details: 'A sophisticated urban destination with high-end retail, dining, and residences.' }
    ]
  },
  {
    id: 6,
    name: 'Dubai Properties',
    logo: 'https://logo.clearbit.com/dp.ae',
    description: 'Developing and managing some of the most iconic destinations in Dubai.',
    projects: [
      { name: 'Jumeirah Beach Residence (JBR)', type: 'Beachfront Community', location: 'Dubai Marina', details: 'One of the most popular residential and tourist destinations in the city.' },
      { name: 'Business Bay', type: 'Commercial & Residential', location: 'Business Bay', details: 'The central business district of Dubai with high-rise towers and canal views.' }
    ]
  },
  {
    id: 7,
    name: 'Deyaar',
    logo: 'https://logo.clearbit.com/deyaar.ae',
    description: 'One of the largest real estate developers in Dubai with a diverse portfolio.',
    projects: [
      { name: 'Regalia', type: 'Luxury Residential', location: 'Business Bay', details: 'A 70-storey luxury residential tower with high-end amenities and smart home tech.' },
      { name: 'Midtown', type: 'Integrated Community', location: 'IMPZ', details: 'An expansive residential community with retail and leisure facilities.' }
    ]
  },
  {
    id: 8,
    name: 'Azizi Developments',
    logo: 'https://logo.clearbit.com/azizidevelopments.com',
    description: 'Committed to creating quality living spaces and vibrant communities.',
    projects: [
      { name: 'Azizi Riviera', type: 'Waterfront Community', location: 'Meydan', details: 'A French Mediterranean-inspired community with retail and leisure attractions.' },
      { name: 'Azizi Venice', type: 'Waterfront Living', location: 'Dubai South', details: 'A massive crystal lagoon community with luxury villas and apartments.' }
    ]
  },
  {
    id: 9,
    name: 'Ellington Properties',
    logo: 'https://logo.clearbit.com/ellingtonproperties.ae',
    description: 'Dubai\'s leading design-led real estate developer.',
    projects: [
      { name: 'Belgravia', type: 'Design-led Residential', location: 'JVC', details: 'Award-winning residential developments known for their modern design and quality.' },
      { name: 'The Portman', type: 'Luxury Apartments', location: 'JVC', details: 'A contemporary residential building with a focus on wellness and community.' }
    ]
  },
  {
    id: 10,
    name: 'Omniyat',
    logo: 'https://logo.clearbit.com/omniyat.com',
    description: 'Creating unique architectural masterpieces and ultra-luxury experiences.',
    projects: [
      { name: 'One at Palm Jumeirah', type: 'Ultra-Luxury Residential', location: 'Palm Jumeirah', details: 'Managed by Dorchester Collection, featuring some of the most expensive penthouses.' },
      { name: 'The Opus', type: 'Architectural Landmark', location: 'Business Bay', details: 'Designed by Zaha Hadid, a unique building housing residences and a hotel.' }
    ]
  }
];

const DevelopersView = ({ onBack }: { onBack: () => void }) => {
  const [selectedDeveloper, setSelectedDeveloper] = useState<typeof DEVELOPERS[0] | null>(null);

  return (
    <div className="min-h-screen bg-white selection:bg-dark selection:text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="px-8 lg:px-16 py-6 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <button 
              onClick={onBack}
              className="group flex items-center gap-3 text-dark/40 hover:text-porsche-red transition-colors"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase">Return Home</span>
            </button>
            <div className="flex items-baseline gap-1">
              <span className="text-dark font-display font-black text-2xl tracking-tighter">ROCK</span>
              <span className="text-dark/40 font-display font-light text-2xl tracking-tighter">DEALS</span>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-48 px-8 lg:px-24">
        <AnimatePresence mode="wait">
          {!selectedDeveloper ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-7xl mx-auto"
            >
              <div className="mb-24">
                <p className="text-porsche-red text-[10px] tracking-[0.5em] uppercase font-black mb-6">Industry Leaders</p>
                <h2 className="text-7xl md:text-9xl font-display font-black text-dark tracking-tighter leading-none">
                  DUBAI<br />
                  <span className="text-porsche-red">DEVELOPERS.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {DEVELOPERS.map((dev) => (
                  <motion.div
                    key={dev.id}
                    whileHover={{ y: -10 }}
                    className="group bg-gray-50 p-12 rounded-[2rem] border border-transparent hover:border-porsche-red/20 transition-all duration-500 cursor-pointer"
                    onClick={() => setSelectedDeveloper(dev)}
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden mb-10 bg-white p-4 shadow-sm group-hover:shadow-xl transition-all duration-500 flex items-center justify-center">
                      <img 
                        src={dev.logo} 
                        alt={dev.name} 
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent && !parent.querySelector('.fallback-icon')) {
                            const icon = document.createElement('div');
                            icon.className = 'fallback-icon flex flex-col items-center justify-center text-center';
                            icon.innerHTML = `
                              <div class="text-porsche-red mb-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>
                              </div>
                              <span class="text-[8px] font-bold uppercase tracking-tighter text-dark/40">${dev.name.split(' ')[0]}</span>
                            `;
                            parent.appendChild(icon);
                          }
                        }}
                      />
                    </div>
                    <h3 className="text-3xl font-display font-black text-dark mb-4 uppercase tracking-tight">
                      {dev.name}
                      <span className="text-porsche-red">.</span>
                    </h3>
                    <p className="text-dark/40 text-sm font-light leading-relaxed mb-10">
                      {dev.description}
                    </p>
                    <div className="flex items-center gap-4 text-porsche-red text-[10px] font-black tracking-[0.3em] uppercase">
                      <span>View Projects</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-7xl mx-auto"
            >
              <button 
                onClick={() => setSelectedDeveloper(null)}
                className="group flex items-center gap-4 text-dark/40 hover:text-porsche-red transition-colors mb-16"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] font-black tracking-[0.3em] uppercase">Back to Developers</span>
              </button>

              <div className="flex flex-col lg:flex-row gap-24 items-start mb-32">
                <div className="lg:w-1/3">
                  <div className="w-32 h-32 rounded-3xl overflow-hidden mb-10 bg-gray-50 p-6">
                    <img 
                      src={selectedDeveloper.logo} 
                      alt={selectedDeveloper.name} 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h2 className="text-6xl font-display font-black text-dark mb-6 uppercase tracking-tighter">
                    {selectedDeveloper.name}
                    <span className="text-porsche-red">.</span>
                  </h2>
                  <p className="text-dark/50 text-lg font-light leading-relaxed">
                    {selectedDeveloper.description}
                  </p>
                </div>

                <div className="lg:w-2/3 w-full">
                  <p className="text-porsche-red text-[10px] tracking-[0.5em] uppercase font-black mb-12">Famous Projects</p>
                  <div className="space-y-8">
                    {selectedDeveloper.projects.map((project, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-gray-50 p-12 rounded-[2.5rem] border border-gray-100 hover:border-porsche-red/20 transition-all duration-500"
                      >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                          <div>
                            <span className="text-porsche-red text-[9px] tracking-[0.4em] uppercase font-black block mb-2">{project.type}</span>
                            <h4 className="text-4xl font-display font-black text-dark uppercase tracking-tight">{project.name}</h4>
                          </div>
                          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm">
                            <MapPin className="w-4 h-4 text-porsche-red" />
                            <span className="text-dark font-technical font-bold text-xs uppercase tracking-widest">{project.location}</span>
                          </div>
                        </div>
                        <p className="text-dark/50 text-base font-light leading-relaxed">
                          {project.details}
                        </p>
                        <div className="mt-10 pt-10 border-t border-gray-200 flex justify-end">
                          <button className="bg-dark text-white px-10 py-4 text-[10px] font-black tracking-[0.3em] uppercase hover:bg-porsche-red transition-colors">
                            Enquire Details
                          </button>
                        </div>
                      </motion.div>
                    ))}
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
    
    window.location.href = `mailto:Rockdeals.ae@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
            className="bg-dark text-white px-12 py-6 text-[10px] tracking-[0.4em] uppercase font-black hover:bg-porsche-red transition-all duration-500"
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
      <header className="px-8 lg:px-24 py-8 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-xl z-50">
        <div className="flex items-baseline gap-1">
          <span className="text-dark font-display font-black text-2xl tracking-tighter">ROCK</span>
          <span className="text-dark/40 font-display font-light text-2xl tracking-tighter">DEALS</span>
        </div>
        <button 
          onClick={onBack}
          className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase font-black hover:text-porsche-red transition-colors"
        >
          <X className="w-4 h-4" /> Cancel Application
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-24">
        <div className="mb-20">
          <p className="text-porsche-red text-[10px] tracking-[0.5em] uppercase font-black mb-6">Mortgage Intelligence</p>
          <h1 className="text-6xl md:text-8xl font-display font-black text-dark tracking-tighter leading-none uppercase">
            Free Pre-<br />
            <span className="text-porsche-red">Approval.</span>
          </h1>
          <p className="mt-8 text-dark/40 text-xl font-light max-w-2xl leading-relaxed">
            Secure your financing before you browse. Our experts work with top UAE banks to get you the best rates and terms.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {/* Personal Info */}
          <div className="space-y-12">
            <h3 className="text-[10px] tracking-[0.4em] uppercase font-black text-dark/20 border-b border-gray-100 pb-4">Personal Information</h3>
            
            <div className="space-y-4">
              <label className="text-[10px] tracking-[0.3em] uppercase font-black text-dark/40">Full Name (As per Passport)</label>
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
                <label className="text-[10px] tracking-[0.3em] uppercase font-black text-dark/40">Email Address</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-50 border-b-2 border-gray-100 py-4 px-0 text-lg font-technical font-bold focus:border-porsche-red outline-none transition-all"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] tracking-[0.3em] uppercase font-black text-dark/40">Mobile Number</label>
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
              <label className="text-[10px] tracking-[0.3em] uppercase font-black text-dark/40">UAE Residency Status</label>
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
          <div className="space-y-12">
            <h3 className="text-[10px] tracking-[0.4em] uppercase font-black text-dark/20 border-b border-gray-100 pb-4">Income Details</h3>
            
            <div className="space-y-4">
              <label className="text-[10px] tracking-[0.3em] uppercase font-black text-dark/40">Employment Type</label>
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
              <label className="text-[10px] tracking-[0.3em] uppercase font-black text-dark/40">Monthly Salary / Income (AED)</label>
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
                <label className="text-[10px] tracking-[0.3em] uppercase font-black text-dark/40">Company Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full bg-gray-50 border-b-2 border-gray-100 py-4 px-0 text-lg font-technical font-bold focus:border-porsche-red outline-none transition-all"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] tracking-[0.3em] uppercase font-black text-dark/40">Primary Bank</label>
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
              <label className="text-[10px] tracking-[0.3em] uppercase font-black text-dark/40">Other Monthly Income (Optional)</label>
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
              className="w-full max-w-md bg-porsche-red text-white py-5 font-black tracking-[0.3em] uppercase text-[10px] hover:bg-dark transition-all duration-500 shadow-[0_15px_30px_rgba(213,0,28,0.2)]"
            >
              Request Pre-Approval Assessment
            </button>
            <p className="mt-8 text-center text-[9px] text-dark/30 tracking-widest uppercase font-black">
              By submitting, you agree to our financial privacy terms and banking data protocols.
            </p>
          </div>
        </form>
      </main>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<'home' | 'calculator' | 'roi-calculator' | 'developers' | 'pre-approval'>('home');
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
Price: ${searchPrice.min || '0'} - ${searchPrice.max || 'Any'} AED
Beds: ${searchBeds.beds}
Baths: ${searchBeds.baths}
Property Type: ${searchPropertyType}
Furnish: ${searchFurnishStatus}
    `;
    
    window.location.href = `mailto:Rockdeals.ae@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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

  if (view === 'calculator') {
    return <PaymentCalculator onBack={() => setView('home')} />;
  }

  if (view === 'roi-calculator') {
    return <ROICalculator onBack={() => setView('home')} />;
  }

  if (view === 'developers') {
    return <DevelopersView onBack={() => setView('home')} />;
  }

  if (view === 'pre-approval') {
    return <PreApprovalForm onBack={() => setView('home')} />;
  }

  return (
    <div className="min-h-screen bg-white selection:bg-dark selection:text-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
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
          <div className={`flex items-center justify-between transition-all duration-500 gap-4 ${isScrolled ? 'h-[60px]' : 'h-[80px]'}`}>
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
                  { name: 'Developers', onClick: () => setView('developers') },
                  { name: 'ROI Calculator', onClick: () => setView('roi-calculator') },
                  { name: 'Payment Plans', onClick: () => setView('calculator') },
                  { name: 'Enquire Now', href: 'https://forms.google.com' },
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
                    className={`tracking-[0.25em] uppercase font-black transition-all duration-300 cursor-pointer whitespace-nowrap border-b-2 border-transparent hover:text-porsche-red py-2 ${isScrolled ? 'text-dark text-[9px]' : 'text-white text-[10px]'}`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            <button 
              className={`md:hidden w-10 h-10 flex items-center justify-center cursor-pointer ${isScrolled ? 'text-dark' : 'text-white'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
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
              className="fixed inset-0 bg-white z-[100] p-10 flex flex-col"
            >
              <div className="flex justify-end mb-12">
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-dark"><X className="w-8 h-8" /></button>
              </div>
              <div className="flex flex-col gap-8">
                {[
                  { name: 'Properties', href: '#property-types' },
                  { name: 'Developers', onClick: () => setView('developers') },
                  { name: 'ROI Calculator', onClick: () => setView('roi-calculator') },
                  { name: 'Payment Plans', onClick: () => setView('calculator') },
                  { name: 'Enquire Now', href: 'https://forms.google.com' },
                  { name: 'Features', href: '#features' },
                  { name: 'Contact', href: '#contact' }
                ].map((item) => (
                  <a 
                    key={item.name} 
                    href={item.href} 
                    target={item.href?.startsWith('http') ? '_blank' : undefined}
                    rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    onClick={(e) => {
                      setIsMobileMenuOpen(false);
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      }
                    }} 
                    className="text-3xl font-display font-black tracking-tight text-dark uppercase"
                  >
                    {item.name}
                  </a>
                ))}
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="mt-8 bg-dark text-white px-8 py-5 text-sm font-black tracking-[0.2em] uppercase text-center">
                  Book Viewing
                </a>
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

        <div className="relative w-full px-8 lg:px-16 pt-20 flex flex-col items-center text-center">
          <div className="max-w-5xl mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <div className="w-12 h-[2px] bg-porsche-red"></div>
              <p className="text-white text-[10px] tracking-[0.3em] uppercase font-technical font-bold opacity-60">
                The New Standard of Luxury
              </p>
              <div className="w-12 h-[2px] bg-porsche-red"></div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-script font-bold text-white leading-tight mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            >
              Your Dream Home <span className="text-porsche-red glow-porsche">Awaits.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/50 text-[10px] md:text-xs font-light tracking-[0.4em] uppercase"
            >
              The Journey To Modern Living Starts Here At Rock Deals
            </motion.p>
          </div>

          {/* Advanced Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="w-full max-w-4xl bg-black/30 backdrop-blur-3xl border border-white/10 rounded-xl p-2 md:p-3.5 shadow-[0_0_80px_rgba(0,0,0,0.6)] relative z-[45] overflow-hidden group"
          >
            {/* Animated Border Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-porsche-red/10 via-transparent to-porsche-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
            
            {/* Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-1 mb-3.5 relative z-10">
              {['RENT', 'BUY', 'OFF PLAN', 'COMMERCIAL'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSearchTab(tab)}
                  className={`px-4 py-1.5 rounded-lg text-[12px] font-technical font-bold tracking-[0.25em] transition-all duration-500 ${
                    searchTab === tab 
                      ? 'bg-porsche-red text-white shadow-[0_0_15px_rgba(213,0,28,0.5)]' 
                      : 'bg-white/2 text-white/30 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-1.5 relative z-10">
              {/* Location Input */}
              <div className="relative lg:col-span-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 text-porsche-red" />
                <input 
                  type="text"
                  placeholder="Search Location"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full bg-white/2 border border-white/5 rounded-lg py-2 pl-9 pr-3 text-white text-[14px] font-technical tracking-widest focus:outline-none focus:border-porsche-red/40 transition-all placeholder:text-white/10"
                />
              </div>

              {/* Price Dropdown */}
              <div className="relative lg:col-span-2">
                <button 
                  onClick={() => setActivePopover(activePopover === 'price' ? null : 'price')}
                  className="w-full bg-white/2 border border-white/5 rounded-lg py-2 px-3 text-white text-[14px] font-technical tracking-widest flex items-center justify-between hover:bg-white/10 transition-all whitespace-nowrap overflow-hidden"
                >
                  <span className="truncate">{searchPrice.min || searchPrice.max ? `${searchPrice.min}-${searchPrice.max} AED` : 'Price'}</span>
                  <ChevronDown className={`w-2.5 h-2.5 text-white/30 transition-transform flex-shrink-0 ml-1 ${activePopover === 'price' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activePopover === 'price' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 right-0 mt-3 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 z-50 shadow-2xl"
                    >
                      <p className="text-white/40 text-[10px] font-technical font-bold tracking-widest uppercase mb-4">Price Range (AED)</p>
                      <div className="flex gap-3 mb-4">
                        <input 
                          type="number" 
                          placeholder="Min"
                          value={searchPrice.min}
                          onChange={(e) => setSearchPrice({...searchPrice, min: e.target.value})}
                          className="w-1/2 bg-white/2 border border-white/10 rounded-xl py-3 px-4 text-white text-sm font-technical focus:outline-none focus:border-porsche-red/50"
                        />
                        <input 
                          type="number" 
                          placeholder="Max"
                          value={searchPrice.max}
                          onChange={(e) => setSearchPrice({...searchPrice, max: e.target.value})}
                          className="w-1/2 bg-white/2 border border-white/10 rounded-xl py-3 px-4 text-white text-sm font-technical focus:outline-none focus:border-porsche-red/50"
                        />
                      </div>
                      <button 
                        onClick={() => { setSearchPrice({min: '', max: ''}); setActivePopover(null); }}
                        className="w-full py-2 text-[10px] font-technical font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors"
                      >
                        Reset
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Beds & Baths Dropdown */}
              <div className="relative lg:col-span-2">
                <button 
                  onClick={() => setActivePopover(activePopover === 'beds' ? null : 'beds')}
                  className="w-full bg-white/2 border border-white/5 rounded-lg py-2 px-3 text-white text-[14px] font-technical tracking-widest flex items-center justify-between hover:bg-white/10 transition-all whitespace-nowrap overflow-hidden"
                >
                  <span className="truncate">{searchBeds.beds || searchBeds.baths ? `${searchBeds.beds}B / ${searchBeds.baths}Ba` : 'Beds & Baths'}</span>
                  <ChevronDown className={`w-2.5 h-2.5 text-white/30 transition-transform flex-shrink-0 ml-1 ${activePopover === 'beds' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activePopover === 'beds' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 right-0 mt-3 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 z-50 shadow-2xl min-w-[280px]"
                    >
                      <div className="space-y-6">
                        <div>
                          <p className="text-white/40 text-[10px] font-technical font-bold tracking-widest uppercase mb-3">Bedrooms</p>
                          <div className="flex flex-wrap gap-1.5">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                              <button 
                                key={n}
                                onClick={() => setSearchBeds({...searchBeds, beds: n})}
                                className={`w-8 h-8 rounded-lg text-[11px] font-technical font-bold transition-all ${searchBeds.beds === n ? 'bg-porsche-red text-white shadow-[0_0_15px_rgba(213,0,28,0.4)]' : 'bg-white/2 text-white/40 hover:bg-white/10'}`}
                              >
                                {n}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-white/40 text-[10px] font-technical font-bold tracking-widest uppercase mb-3">Bathrooms</p>
                          <div className="flex flex-wrap gap-1.5">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                              <button 
                                key={n}
                                onClick={() => setSearchBeds({...searchBeds, baths: n})}
                                className={`w-8 h-8 rounded-lg text-[11px] font-technical font-bold transition-all ${searchBeds.baths === n ? 'bg-porsche-red text-white shadow-[0_0_15px_rgba(213,0,28,0.4)]' : 'bg-white/2 text-white/40 hover:bg-white/10'}`}
                              >
                                {n}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                          <button 
                            onClick={() => { setSearchBeds({beds: 0, baths: 0}); setActivePopover(null); }}
                            className="flex-1 py-3 bg-white/2 text-[10px] font-technical font-bold text-white/40 uppercase tracking-widest hover:bg-white/10 transition-all rounded-xl"
                          >
                            Reset
                          </button>
                          <button 
                            onClick={() => setActivePopover(null)}
                            className="flex-1 py-3 bg-porsche-red text-[10px] font-technical font-bold text-white uppercase tracking-widest hover:bg-porsche-red/80 transition-all rounded-xl shadow-[0_0_15px_rgba(213,0,28,0.4)]"
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
                  className="w-full bg-white/2 border border-white/5 rounded-lg py-2 px-3 text-white text-[14px] font-technical tracking-widest flex items-center justify-between hover:bg-white/10 transition-all whitespace-nowrap overflow-hidden"
                >
                  <span className="truncate">{searchPropertyType}</span>
                  <ChevronDown className={`w-2.5 h-2.5 text-white/30 transition-transform flex-shrink-0 ml-1 ${activePopover === 'type' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activePopover === 'type' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 right-0 mt-3 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 z-50 shadow-2xl"
                    >
                      {['Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Land'].map(type => (
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
                  className="w-full bg-white/2 border border-white/5 rounded-lg py-2 px-3 text-white text-[14px] font-technical tracking-widest flex items-center justify-between hover:bg-white/10 transition-all whitespace-nowrap overflow-hidden"
                >
                  <span className="truncate">{searchFurnishStatus === 'Furnish Status' ? 'Furnish' : searchFurnishStatus}</span>
                  <ChevronDown className={`w-2.5 h-2.5 text-white/30 transition-transform flex-shrink-0 ml-1 ${activePopover === 'furnish' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activePopover === 'furnish' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 right-0 mt-3 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 z-50 shadow-2xl"
                    >
                      {['Furnished', 'Unfurnished', 'Partly Furnished'].map(status => (
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
                className="lg:col-span-2 bg-porsche-red text-white rounded-lg py-2 px-3 text-[12px] font-technical font-bold tracking-[0.25em] uppercase hover:bg-porsche-red/80 transition-all shadow-[0_0_15px_rgba(213,0,28,0.4)] active:scale-95"
              >
                Submit Enquiry
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <section 
        id="filters" 
        className={`px-8 lg:px-16 py-3 bg-white/90 backdrop-blur-md border-b border-gray-100 sticky z-40 transition-all duration-500 ${isScrolled ? 'top-[60px] shadow-lg' : 'top-[80px] shadow-sm'}`}
      >
        <div className="max-w-7xl mx-auto overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-center gap-3 min-w-max px-4">
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
                className={`group flex items-center gap-2 rounded-full border font-black tracking-[0.2em] uppercase transition-all duration-500 shadow-sm hover:shadow-md whitespace-nowrap 
                  ${filter === 'Developers' 
                    ? 'bg-porsche-red text-white border-porsche-red shadow-[0_0_15px_rgba(213,0,28,0.3)]' 
                    : activeFilter === filter 
                      ? 'bg-dark text-white border-dark' 
                      : 'bg-white text-dark border-gray-100 hover:bg-gray-50'
                  } 
                  ${isScrolled ? 'px-4 py-1.5 text-[7px]' : 'px-5 py-2 text-[8px]'}`}
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
      <section className="px-8 lg:px-24 py-40 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-[1px] bg-porsche-red"></div>
              <span className="text-porsche-red text-[10px] tracking-[0.4em] uppercase font-black">Philosophy</span>
            </motion.div>
            <h2 className="text-5xl md:text-8xl font-display font-black text-dark leading-[0.9] mb-12 tracking-tighter">
              PRECISION<br />
              <span className="text-porsche-red">IN EVERY</span><br />
              DEAL.
            </h2>
            <p className="text-dark/60 text-lg md:text-xl leading-relaxed font-light max-w-xl mb-12">
              Rock Deals combines luxury property expertise with next-generation technology to deliver the most advanced real estate experience in the region.
            </p>
            <motion.button
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 text-dark text-[10px] font-black tracking-[0.4em] uppercase group"
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
              <div key={i} className="bg-white p-12 hover:bg-gray-50 transition-colors group">
                <div className="text-5xl font-display font-black text-dark mb-4 group-hover:text-porsche-red transition-colors">{stat.value}</div>
                <div className="text-dark/30 text-[9px] tracking-[0.3em] uppercase font-black">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Types Section (Filtered Grid) */}
      <section id="property-types" className="px-8 lg:px-24 py-48 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
          <div className="max-w-3xl">
            <p className="text-porsche-red text-[10px] tracking-[0.5em] uppercase font-black mb-6">Portfolio</p>
            <h2 className="text-7xl md:text-[10rem] font-display font-black text-dark tracking-tighter leading-[0.8]">
              FEATURED<br />
              <span className="text-porsche-red">LISTINGS.</span>
            </h2>
          </div>
          <p className="text-dark/40 text-base max-w-md leading-relaxed font-light mb-4">
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
                  <span className="text-white/60 text-[8px] font-black tracking-[0.3em] uppercase">
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
                    <p className="text-white/60 text-[10px] tracking-[0.2em] uppercase font-medium mt-1">{prop.location} — {prop.price}</p>
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
          <div className="py-40 text-center">
            <p className="text-dark/20 text-xl font-light tracking-widest uppercase">No properties found in this category.</p>
          </div>
        )}
      </section>

      {/* Features Grid */}
      <section id="features" className="px-8 lg:px-24 py-40 bg-gray-50/50">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-2xl">
            <p className="text-porsche-red text-[10px] tracking-[0.5em] uppercase font-black mb-6">Innovation</p>
            <h2 className="text-6xl md:text-9xl font-display font-black text-dark tracking-tighter leading-[0.8]">
              THE<br />SMART HUB.
            </h2>
          </div>
          <p className="text-dark/40 text-base max-w-md font-light leading-relaxed mb-4">
            Experience real estate through the lens of high-performance technology and uncompromising luxury standards.
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
      <section id="journey" className="px-8 lg:px-24 py-48 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-48">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block border border-dark/10 px-10 py-4 mb-12"
            >
              <span className="text-dark text-[11px] tracking-[0.8em] uppercase font-black">Technical_Process_Flow</span>
            </motion.div>
            <h2 className="text-7xl md:text-[12rem] font-display font-black text-dark tracking-tighter leading-none">
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
      <section id="explore" className="px-8 lg:px-24 py-48 bg-dark">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-32">
          <div className="max-w-3xl">
            <p className="text-porsche-red text-[10px] tracking-[0.5em] uppercase font-black mb-6">Location Intelligence</p>
            <h2 className="text-7xl md:text-[10rem] font-display font-black text-white tracking-tighter leading-[0.8]">
              ZONE<br />
              <span className="text-porsche-red">EXPLORER.</span>
            </h2>
          </div>
          <p className="text-white/40 text-base max-w-md leading-relaxed font-light mb-4">
            Navigate the most prestigious investment zones in the UAE. Our interactive map provides real-time yield data and district insights.
          </p>
        </div>
        
        <DubaiMap onSearch={(filter) => setActiveFilter(filter)} />
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-white border-t border-gray-100">
        <div className="px-8 lg:px-24 py-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-20">
            <div className="md:col-span-4">
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-dark font-display font-black text-4xl tracking-tighter">ROCK</span>
                <span className="text-dark/40 font-display font-light text-4xl tracking-tighter">DEALS</span>
              </div>
              <p className="text-porsche-red text-[10px] tracking-[0.5em] uppercase font-black mb-12">
                A DEAL FOR EVERYONE
              </p>
              <p className="text-dark/50 text-base leading-relaxed mb-8 max-w-xs font-light">
                Redefining luxury real estate in the UAE. Connecting discerning buyers with the finest properties across Dubai and Abu Dhabi.
              </p>
              <div className="mb-12">
                <a href="tel:+971529178630" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full border border-dark/5 flex items-center justify-center group-hover:bg-porsche-red group-hover:border-porsche-red transition-all duration-500">
                    <Phone className="w-4 h-4 text-dark/40 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-dark font-technical font-bold text-lg tracking-tight group-hover:text-porsche-red transition-colors">+971 529178630</span>
                </a>
              </div>
              <div className="flex items-center gap-8">
                {[
                  { Icon: Instagram, href: 'https://www.instagram.com/rockdeals.ae/' },
                  { Icon: Linkedin, href: '#' },
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
              <h4 className="text-dark text-[10px] tracking-[0.4em] uppercase font-black mb-10">Explore</h4>
              <ul className="space-y-5">
                {[
                  { name: 'Properties', href: '#property-types' },
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
              <h4 className="text-dark text-[10px] tracking-[0.4em] uppercase font-black mb-10">Property Types</h4>
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
              <h4 className="text-dark text-[10px] tracking-[0.4em] uppercase font-black mb-10">Newsletter</h4>
              <p className="text-dark/40 text-sm mb-8 font-light leading-relaxed">Stay updated with exclusive property launches and market intelligence.</p>
              <div className="flex border-b border-dark/10 pb-4 group focus-within:border-porsche-red transition-colors">
                <input type="email" placeholder="Email Address" className="bg-transparent border-none outline-none text-sm w-full placeholder:text-dark/20" />
                <button className="text-dark/20 group-focus-within:text-porsche-red hover:text-porsche-red transition-colors"><ArrowRight className="w-6 h-6" /></button>
              </div>
            </div>
          </div>

          <div className="mt-32 pt-12 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-8">
            <p className="text-dark/20 text-[10px] tracking-widest uppercase font-black">© 2026 Rock Deals Real Estate. All Rights Reserved.</p>
            <div className="flex items-center gap-12">
              {['Privacy Policy', 'Terms', 'Cookies'].map((item) => (
                <a key={item} className="text-dark/20 text-[10px] tracking-widest uppercase font-black hover:text-dark transition-colors cursor-pointer">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Enquiry Modal */}
      <AnimatePresence>
        {isEnquiryModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
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
                    <p className="text-porsche-red text-[9px] tracking-[0.4em] uppercase font-black mb-2">Enquiry Form</p>
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
                    <label className="block text-[8px] font-black tracking-widest uppercase text-dark/40 mb-3 ml-1">Full Name</label>
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
                    <label className="block text-[8px] font-black tracking-widest uppercase text-dark/40 mb-3 ml-1">Email Address</label>
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
                    <label className="block text-[8px] font-black tracking-widest uppercase text-dark/40 mb-3 ml-1">Mobile Number</label>
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
                    className="w-full bg-dark text-white rounded-2xl py-5 text-[10px] font-black tracking-[0.4em] uppercase hover:bg-porsche-red transition-all shadow-xl hover:shadow-porsche-red/20 active:scale-95 mt-4"
                  >
                    Send Enquiry Now
                  </button>
                  
                  <p className="text-center text-[8px] text-dark/20 uppercase tracking-widest font-bold">
                    By submitting, you agree to our privacy policy.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
