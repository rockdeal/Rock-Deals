import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  MapPin, 
  Calendar, 
  Wallet, 
  Building2, 
  CheckCircle2, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Maximize2, 
  Phone, 
  Download, 
  Share2, 
  Calculator, 
  Filter,
  Sparkles,
  Layers,
  Home,
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { OFFPLAN_PROJECTS, OffPlanProject } from '../data/offplanProjects';
import { SocialShare } from './SocialShare';

interface OffPlanViewProps {
  onBack: () => void;
  onEnquire: (projectName?: string) => void;
  onOpenCalculator?: (price?: number) => void;
  initialSearch?: string;
}

export const OffPlanView: React.FC<OffPlanViewProps> = ({ 
  onBack, 
  onEnquire, 
  onOpenCalculator,
  initialSearch = ''
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedDeveloper, setSelectedDeveloper] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('All');
  const [selectedHandover, setSelectedHandover] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<OffPlanProject | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  // Extract unique developers and locations
  const developers = useMemo(() => {
    const list = Array.from(new Set(OFFPLAN_PROJECTS.map(p => p.developer))).filter(Boolean);
    return ['All', ...list.sort()];
  }, []);

  const locations = useMemo(() => {
    const list = Array.from(new Set(OFFPLAN_PROJECTS.map(p => p.location))).filter(Boolean);
    return ['All', ...list.sort()];
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return OFFPLAN_PROJECTS.filter(project => {
      // Search text
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = project.name.toLowerCase().includes(q);
        const matchesDev = project.developer.toLowerCase().includes(q);
        const matchesLoc = project.location.toLowerCase().includes(q) || project.fullAddress.toLowerCase().includes(q);
        if (!matchesName && !matchesDev && !matchesLoc) return false;
      }

      // Developer filter
      if (selectedDeveloper !== 'All' && project.developer !== selectedDeveloper) {
        return false;
      }

      // Location filter
      if (selectedLocation !== 'All' && project.location !== selectedLocation) {
        return false;
      }

      // Price filter
      if (selectedPriceRange !== 'All') {
        const price = project.startingPrice;
        if (selectedPriceRange === 'under1m' && price >= 1000000) return false;
        if (selectedPriceRange === '1m-2m' && (price < 1000000 || price > 2000000)) return false;
        if (selectedPriceRange === '2m-5m' && (price < 2000000 || price > 5000000)) return false;
        if (selectedPriceRange === 'over5m' && price <= 5000000) return false;
      }

      // Handover filter
      if (selectedHandover !== 'All') {
        if (!project.handover.includes(selectedHandover)) return false;
      }

      return true;
    });
  }, [searchQuery, selectedDeveloper, selectedLocation, selectedPriceRange, selectedHandover]);

  const openWhatsApp = (project: OffPlanProject) => {
    const message = encodeURIComponent(
      `Hello Rock Deals, I am interested in the off-plan project "${project.name}" by ${project.developer} (${project.priceFormatted}, Handover ${project.handover}). Please share floor plans, current availability, and exclusive launch offers.`
    );
    window.open(`https://wa.me/971501234567?text=${message}`, '_blank');
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDeveloper('All');
    setSelectedLocation('All');
    setSelectedPriceRange('All');
    setSelectedHandover('All');
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] font-sans text-dark">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 md:gap-8">
            <button 
              onClick={onBack}
              className="group flex items-center gap-2.5 text-dark/50 hover:text-porsche-red transition-colors text-xs font-technical font-bold uppercase tracking-widest min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </button>
            <div className="h-4 w-px bg-gray-200 hidden sm:block"></div>
            <div className="flex items-baseline gap-1">
              <span className="text-dark font-display font-black text-xl tracking-tighter">ROCK</span>
              <span className="text-dark/40 font-display font-light text-xl tracking-tighter">DEALS</span>
              <span className="text-porsche-red font-display font-black text-xl">.</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 bg-porsche-red/10 text-porsche-red text-[11px] font-technical font-bold tracking-widest uppercase rounded-full">
              <Sparkles className="w-3 h-3" />
              Direct Developer Catalog
            </span>
            <button
              onClick={() => onEnquire()}
              className="bg-dark hover:bg-porsche-red text-white text-[11px] font-technical font-black tracking-widest uppercase px-5 py-2.5 rounded-full shadow-sm transition-all duration-300"
            >
              VIP Off-Plan Access
            </button>
          </div>
        </div>
      </header>

      {/* Hero Headline Section */}
      <section className="relative bg-dark text-white pt-16 md:pt-24 pb-16 md:pb-24 px-4 md:px-8 overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-porsche-red/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-porsche-red"></span>
                <span className="text-porsche-red text-xs md:text-sm font-technical font-black uppercase tracking-[0.3em]">
                  Live Dubai Launch Registry
                </span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight leading-none uppercase">
                Accurate Off-Plan <br />
                <span className="text-porsche-red">Dubai Projects.</span>
              </h1>
            </div>

            <p className="text-white/60 text-sm md:text-base max-w-md font-light leading-relaxed">
              Explore authentic Dubai off-plan developments with verified developer pricing, handover schedules, and flexible payment plans. 0% agency fees with full DLD transparency.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 backdrop-blur-md">
            <div>
              <p className="text-white/40 text-[10px] font-technical font-bold uppercase tracking-widest mb-1">Total Verified Projects</p>
              <p className="text-2xl md:text-3xl font-display font-black text-white">{OFFPLAN_PROJECTS.length} Developments</p>
            </div>
            <div>
              <p className="text-white/40 text-[10px] font-technical font-bold uppercase tracking-widest mb-1">Starting Price From</p>
              <p className="text-2xl md:text-3xl font-display font-black text-porsche-red">AED 624K</p>
            </div>
            <div>
              <p className="text-white/40 text-[10px] font-technical font-bold uppercase tracking-widest mb-1">Payment Schemes</p>
              <p className="text-2xl md:text-3xl font-display font-black text-white">1% / 80/20 / 60/40</p>
            </div>
            <div>
              <p className="text-white/40 text-[10px] font-technical font-bold uppercase tracking-widest mb-1">Agency Commission</p>
              <p className="text-2xl md:text-3xl font-display font-black text-white">0% Free Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="sticky top-[73px] z-40 bg-white border-b border-gray-200 shadow-sm py-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-3">
          {/* Main Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark/40" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by project name, developer (e.g. Emaar, Omniyat, Nakheel), or area (e.g. Dubai Islands, Palm Jumeirah)..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-10 py-3 text-sm text-dark placeholder:text-dark/30 focus:outline-none focus:border-porsche-red/50 focus:bg-white transition-all font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-dark/40 hover:text-dark"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
            {/* Developer Selector */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-dark/40 font-technical uppercase font-bold text-[10px]">Developer:</span>
              <select 
                value={selectedDeveloper}
                onChange={(e) => setSelectedDeveloper(e.target.value)}
                className="bg-gray-100 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-dark focus:outline-none focus:border-porsche-red"
              >
                {developers.map(dev => (
                  <option key={dev} value={dev}>{dev === 'All' ? 'All Developers' : dev}</option>
                ))}
              </select>
            </div>

            {/* Location Selector */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-dark/40 font-technical uppercase font-bold text-[10px]">Community:</span>
              <select 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="bg-gray-100 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-dark focus:outline-none focus:border-porsche-red"
              >
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc === 'All' ? 'All Communities' : loc}</option>
                ))}
              </select>
            </div>

            {/* Price Selector */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-dark/40 font-technical uppercase font-bold text-[10px]">Price:</span>
              <select 
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="bg-gray-100 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-dark focus:outline-none focus:border-porsche-red"
              >
                <option value="All">All Prices</option>
                <option value="under1m">Under AED 1,000,000</option>
                <option value="1m-2m">AED 1M - 2M</option>
                <option value="2m-5m">AED 2M - 5M</option>
                <option value="over5m">Ultra Luxury (AED 5M+)</option>
              </select>
            </div>

            {/* Handover Selector */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-dark/40 font-technical uppercase font-bold text-[10px]">Handover:</span>
              <select 
                value={selectedHandover}
                onChange={(e) => setSelectedHandover(e.target.value)}
                className="bg-gray-100 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-dark focus:outline-none focus:border-porsche-red"
              >
                <option value="All">All Handover Dates</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>
            </div>

            {(selectedDeveloper !== 'All' || selectedLocation !== 'All' || selectedPriceRange !== 'All' || selectedHandover !== 'All' || searchQuery) && (
              <button 
                onClick={resetFilters}
                className="text-porsche-red hover:underline text-[11px] font-technical uppercase font-bold flex-shrink-0 ml-2"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-technical uppercase tracking-widest text-dark/40 font-bold">
              Showing <span className="text-porsche-red font-black">{filteredProjects.length}</span> of {OFFPLAN_PROJECTS.length} Projects
            </p>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm max-w-lg mx-auto">
            <Building2 className="w-12 h-12 text-dark/20 mx-auto mb-4" />
            <h3 className="font-display font-black text-xl uppercase text-dark mb-2">No Projects Found</h3>
            <p className="text-sm text-dark/50 mb-6 font-light">
              We couldn't find any off-plan projects matching your current filter criteria.
            </p>
            <button
              onClick={resetFilters}
              className="bg-dark hover:bg-porsche-red text-white text-xs font-technical uppercase font-bold px-6 py-3 rounded-full transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
              >
                {/* Image Container */}
                <div 
                  className="relative aspect-[16/10] overflow-hidden bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <img 
                    src={project.heroImage} 
                    alt={project.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="bg-white/90 backdrop-blur-md text-dark text-[10px] font-technical font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                      {project.developer}
                    </span>
                    <span className="bg-porsche-red text-white text-[10px] font-technical font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                      {project.handover}
                    </span>
                  </div>

                  {/* Bottom Image Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                    <div className="flex items-center gap-1.5 text-white/80 text-[11px] font-technical font-bold uppercase tracking-wider mb-1">
                      <MapPin className="w-3.5 h-3.5 text-porsche-red flex-shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>
                    <h3 className="text-white font-display font-black text-2xl tracking-tight leading-none uppercase drop-shadow-md">
                      {project.name}
                    </h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Price & Payment Plan Bar */}
                    <div className="flex items-end justify-between border-b border-gray-100 pb-4 mb-4">
                      <div>
                        <p className="text-[10px] font-technical uppercase font-bold text-dark/40 tracking-wider">Starting Price</p>
                        <p className="text-xl font-technical font-black text-porsche-red tracking-tight">
                          {project.priceFormatted}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-technical uppercase font-bold text-dark/40 tracking-wider">Payment Scheme</p>
                        <span className="inline-block bg-gray-100 text-dark font-technical font-bold text-[11px] px-2.5 py-1 rounded-md">
                          {project.paymentPlan}
                        </span>
                      </div>
                    </div>

                    {/* Description preview */}
                    <p className="text-xs text-dark/60 font-light line-clamp-2 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Unit Types Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.unitTypes.slice(0, 3).map((u, i) => (
                        <span key={i} className="text-[10px] font-technical font-medium bg-gray-50 text-dark/70 px-2 py-1 rounded border border-gray-100">
                          {u.type}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-50">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="w-full bg-dark hover:bg-porsche-red text-white text-[11px] font-technical font-black tracking-widest uppercase py-3 rounded-xl transition-colors text-center"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => openWhatsApp(project)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-technical font-black tracking-widest uppercase py-3 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Comprehensive Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[120] overflow-y-auto bg-black/80 backdrop-blur-md flex items-start justify-center p-0 md:p-6 lg:p-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-5xl rounded-none md:rounded-3xl shadow-2xl overflow-hidden min-h-screen md:min-h-0 my-auto"
            >
              {/* Modal Top Header */}
              <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="bg-porsche-red text-white text-[10px] font-technical font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    {selectedProject.type}
                  </span>
                  <span className="text-dark/40 text-xs font-technical font-bold uppercase tracking-wider">
                    By {selectedProject.developer}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-porsche-red hover:text-white transition-colors flex items-center justify-center text-dark"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Gallery Carousel */}
              <div className="relative aspect-[16/9] md:aspect-[21/9] bg-dark overflow-hidden">
                <img 
                  src={selectedProject.gallery[activeGalleryIndex] || selectedProject.heroImage} 
                  alt={selectedProject.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>

                {/* Carousel Controls */}
                {selectedProject.gallery.length > 1 && (
                  <>
                    <button 
                      onClick={() => setActiveGalleryIndex((prev) => (prev > 0 ? prev - 1 : selectedProject.gallery.length - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-all"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={() => setActiveGalleryIndex((prev) => (prev < selectedProject.gallery.length - 1 ? prev + 1 : 0))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-all"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Project Title Overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-center gap-2 text-white/80 text-xs font-technical uppercase tracking-widest mb-2">
                    <MapPin className="w-4 h-4 text-porsche-red" />
                    <span>{selectedProject.fullAddress}</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black tracking-tight leading-none uppercase">
                    {selectedProject.name}
                    <span className="text-porsche-red">.</span>
                  </h2>
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {selectedProject.gallery.length > 1 && (
                <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 flex gap-2 overflow-x-auto no-scrollbar">
                  {selectedProject.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveGalleryIndex(idx)}
                      className={`relative w-20 h-12 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                        activeGalleryIndex === idx ? 'border-porsche-red scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}

              {/* Modal Body */}
              <div className="p-6 md:p-10 space-y-10">
                {/* Highlight Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-gray-50 border border-gray-100 rounded-2xl p-4 md:p-6">
                  <div>
                    <p className="text-[10px] font-technical uppercase font-bold text-dark/40 tracking-wider mb-1">Starting Price</p>
                    <p className="text-xl md:text-2xl font-technical font-black text-porsche-red">{selectedProject.priceFormatted}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-technical uppercase font-bold text-dark/40 tracking-wider mb-1">Handover Date</p>
                    <p className="text-xl md:text-2xl font-technical font-black text-dark">{selectedProject.handover}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-technical uppercase font-bold text-dark/40 tracking-wider mb-1">Payment Plan</p>
                    <p className="text-base md:text-xl font-technical font-black text-dark">{selectedProject.paymentPlan}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-technical uppercase font-bold text-dark/40 tracking-wider mb-1">Master Developer</p>
                    <p className="text-base md:text-xl font-technical font-black text-dark">{selectedProject.developer}</p>
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <h4 className="text-xs font-technical uppercase tracking-[0.3em] font-black text-porsche-red mb-3">
                    Project Overview
                  </h4>
                  <p className="text-sm md:text-base text-dark/70 font-light leading-relaxed whitespace-pre-line">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Payment Plan Milestones */}
                <div>
                  <h4 className="text-xs font-technical uppercase tracking-[0.3em] font-black text-porsche-red mb-4">
                    Payment Plan Breakdown
                  </h4>
                  <div className="space-y-2.5">
                    {selectedProject.paymentPlanBreakdown.map((milestone, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100"
                      >
                        <span className="text-xs font-technical font-bold text-dark/80 uppercase tracking-wider">
                          {milestone.milestone}
                        </span>
                        <span className="text-lg font-display font-black text-dark">
                          {milestone.percentage}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Unit Types & Configurations */}
                {selectedProject.unitTypes.length > 0 && (
                  <div>
                    <h4 className="text-xs font-technical uppercase tracking-[0.3em] font-black text-porsche-red mb-4">
                      Available Unit Floor Plans & Sizes
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedProject.unitTypes.map((unit, idx) => (
                        <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                          <p className="text-xs font-technical font-bold uppercase text-dark mb-1">{unit.type}</p>
                          <p className="text-xs text-dark/50 font-light mb-2">{unit.size}</p>
                          <p className="text-sm font-technical font-black text-porsche-red">{unit.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Amenities */}
                <div>
                  <h4 className="text-xs font-technical uppercase tracking-[0.3em] font-black text-porsche-red mb-4">
                    Amenities & Lifestyle
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedProject.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <CheckCircle2 className="w-4 h-4 text-porsche-red flex-shrink-0" />
                        <span className="text-xs font-technical font-bold uppercase text-dark/80 tracking-wide">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Share & Calculator CTA */}
                <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-technical uppercase font-bold text-dark/40">Share Project:</span>
                    <SocialShare 
                      title={`${selectedProject.name} by ${selectedProject.developer} | Dubai Off-Plan`}
                      url={window.location.href}
                    />
                  </div>

                  {onOpenCalculator && (
                    <button
                      onClick={() => {
                        setSelectedProject(null);
                        onOpenCalculator(selectedProject.startingPrice);
                      }}
                      className="flex items-center gap-2 text-xs font-technical font-bold uppercase text-dark hover:text-porsche-red transition-colors"
                    >
                      <Calculator className="w-4 h-4 text-porsche-red" />
                      <span>Calculate Mortgage & Monthly Installments</span>
                    </button>
                  )}
                </div>

                {/* Action CTA Box */}
                <div className="bg-dark text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h5 className="font-display font-black text-2xl uppercase tracking-tight mb-1">
                      Request Official Floor Plans & VIP Pricing
                    </h5>
                    <p className="text-xs text-white/50 font-light">
                      Speak directly with our senior luxury property advisors for {selectedProject.name}.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                      onClick={() => openWhatsApp(selectedProject)}
                      className="flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-technical font-black tracking-widest uppercase px-6 py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Brochure</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProject(null);
                        onEnquire(selectedProject.name);
                      }}
                      className="flex-1 md:flex-none bg-porsche-red hover:bg-red-700 text-white text-xs font-technical font-black tracking-widest uppercase px-6 py-4 rounded-xl transition-colors"
                    >
                      Request Callback
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OffPlanView;
