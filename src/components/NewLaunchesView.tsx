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
  Flame,
  Award,
  ShieldCheck,
  TrendingUp,
  ExternalLink,
  MessageCircle,
  Clock,
  Zap,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NEW_LAUNCHES, NewLaunchProject } from '../data/newLaunches';
import { SocialShare } from './SocialShare';

interface NewLaunchesViewProps {
  onBack: () => void;
  onEnquire: (projectName?: string) => void;
  onOpenCalculator?: (price?: number) => void;
  initialSearch?: string;
}

export const NewLaunchesView: React.FC<NewLaunchesViewProps> = ({ 
  onBack, 
  onEnquire, 
  onOpenCalculator,
  initialSearch = ''
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedDeveloper, setSelectedDeveloper] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('All');
  const [selectedHandover, setSelectedHandover] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'roi'>('newest');
  
  const [selectedProject, setSelectedProject] = useState<NewLaunchProject | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  // Extract unique developers
  const developers = useMemo(() => {
    const list = Array.from(new Set(NEW_LAUNCHES.map(p => p.developer))).filter(Boolean);
    return ['All', ...list.sort()];
  }, []);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let list = NEW_LAUNCHES.filter(project => {
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

      // City filter
      if (selectedCity !== 'All' && project.city !== selectedCity) {
        return false;
      }

      // Property type filter
      if (selectedType !== 'All' && project.type !== selectedType) {
        return false;
      }

      // Price filter
      if (selectedPriceRange !== 'All') {
        const price = project.startingPrice;
        if (selectedPriceRange === 'under2m' && price >= 2000000) return false;
        if (selectedPriceRange === '2m-4m' && (price < 2000000 || price > 4000000)) return false;
        if (selectedPriceRange === '4m-8m' && (price < 4000000 || price > 8000000)) return false;
        if (selectedPriceRange === 'over8m' && price < 8000000) return false;
      }

      // Handover filter
      if (selectedHandover !== 'All') {
        if (!project.handover.includes(selectedHandover)) return false;
      }

      return true;
    });

    // Sorting
    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.startingPrice - a.startingPrice);
    } else if (sortBy === 'roi') {
      list = [...list].sort((a, b) => parseFloat(b.roiEstimate) - parseFloat(a.roiEstimate));
    }

    return list;
  }, [searchQuery, selectedDeveloper, selectedCity, selectedType, selectedPriceRange, selectedHandover, sortBy]);

  const openWhatsApp = (project: NewLaunchProject) => {
    const message = encodeURIComponent(
      `Hello Rock Deals, I am interested in the newly launched project "${project.name}" by ${project.developer} (${project.priceFormatted}, Handover ${project.handover}). Please provide VIP pre-launch allocation, unit layout sheets, and 0% commission pricing details.`
    );
    window.open(`https://wa.me/971529178630?text=${message}`, '_blank');
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDeveloper('All');
    setSelectedCity('All');
    setSelectedType('All');
    setSelectedPriceRange('All');
    setSelectedHandover('All');
    setSortBy('newest');
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-porsche-red/10 text-porsche-red text-[11px] font-technical font-bold tracking-widest uppercase rounded-full">
              <span className="w-2 h-2 rounded-full bg-porsche-red animate-pulse"></span>
              Live New Launches
            </span>
            <button
              onClick={() => onEnquire('VIP Launch Allocation')}
              className="px-4 py-2 bg-dark hover:bg-porsche-red text-white text-xs font-black tracking-widest uppercase transition-colors"
            >
              Register VIP
            </button>
          </div>
        </div>
      </header>

      {/* Hero Header Section */}
      <section className="bg-dark text-white relative overflow-hidden py-16 md:py-20 border-b border-white/10">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#D5001C_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-porsche-red text-white text-[10px] font-black uppercase tracking-[0.25em] mb-4">
                <Flame className="w-3.5 h-3.5" />
                OFFICIAL REVERSE-ENGINEERED LAUNCH REGISTRY
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black tracking-tight uppercase leading-[1.08]">
                Dubai & Abu Dhabi <br />
                <span className="text-porsche-red">Exclusive New Launches</span>
              </h1>
              <p className="mt-4 text-white/60 text-sm md:text-base max-w-2xl font-light leading-relaxed">
                Explore real-time off-plan releases directly from Dubai & Abu Dhabi’s top master developers. 
                Enjoy priority unit selection, pre-launch pricing, and 0% brokerage fees.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 shrink-0">
              <div className="bg-white/5 border border-white/10 p-4">
                <p className="text-[10px] font-technical uppercase tracking-widest text-white/40 mb-1">Live Launches</p>
                <p className="text-2xl font-display font-black text-white">{NEW_LAUNCHES.length}</p>
                <p className="text-[10px] text-porsche-red font-bold mt-1">Verified Inventory</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4">
                <p className="text-[10px] font-technical uppercase tracking-widest text-white/40 mb-1">Commission</p>
                <p className="text-2xl font-display font-black text-porsche-red">0%</p>
                <p className="text-[10px] text-white/60 font-bold mt-1">Direct Developer</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 col-span-2 sm:col-span-1">
                <p className="text-[10px] font-technical uppercase tracking-widest text-white/40 mb-1">Golden Visa</p>
                <p className="text-2xl font-display font-black text-white">Eligible</p>
                <p className="text-[10px] text-white/60 font-bold mt-1">Investments 2M+ AED</p>
              </div>
            </div>
          </div>

          {/* Quick Search Bar */}
          <div className="bg-white p-2 md:p-3 shadow-2xl flex flex-col md:flex-row gap-2 border border-white/20">
            <div className="flex-1 flex items-center gap-3 px-3 py-2 bg-gray-50 border border-gray-200">
              <Search className="w-4 h-4 text-dark/40" />
              <input 
                type="text" 
                placeholder="Search by project name, developer, or location (e.g. Palm Springs, Emaar, Yas Island)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-dark placeholder:text-dark/40 text-sm focus:outline-none font-medium"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-dark/40 hover:text-dark text-xs">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-3 py-3 bg-gray-50 border border-gray-200 text-dark text-xs font-technical font-bold uppercase tracking-wider focus:outline-none"
              >
                <option value="All">All Cities</option>
                <option value="Dubai">Dubai</option>
                <option value="Abu Dhabi">Abu Dhabi</option>
              </select>

              <select
                value={selectedDeveloper}
                onChange={(e) => setSelectedDeveloper(e.target.value)}
                className="px-3 py-3 bg-gray-50 border border-gray-200 text-dark text-xs font-technical font-bold uppercase tracking-wider focus:outline-none max-w-[170px]"
              >
                <option value="All">All Developers</option>
                {developers.filter(d => d !== 'All').map(dev => (
                  <option key={dev} value={dev}>{dev}</option>
                ))}
              </select>

              <button 
                onClick={resetFilters}
                className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-dark text-xs font-technical font-bold uppercase tracking-wider transition-colors whitespace-nowrap"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Chips Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-[69px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-dark/40 font-technical font-bold uppercase text-[10px] tracking-widest mr-1">
              Filters:
            </span>

            {/* Type Filter */}
            <div className="flex items-center gap-1">
              {['All', 'Apartment', 'Villa', 'Townhouse', 'Penthouse'].map(t => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-3 py-1 text-[11px] font-technical uppercase font-bold tracking-wider transition-colors ${
                    selectedType === t 
                      ? 'bg-dark text-white' 
                      : 'bg-gray-100 text-dark/60 hover:bg-gray-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="h-4 w-px bg-gray-300 hidden sm:block mx-1"></div>

            {/* Price Filter */}
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="px-2.5 py-1 bg-gray-100 text-dark text-[11px] font-technical uppercase font-bold tracking-wider focus:outline-none border-none"
            >
              <option value="All">Price: Any</option>
              <option value="under2m">Under AED 2M</option>
              <option value="2m-4m">AED 2M - 4M</option>
              <option value="4m-8m">AED 4M - 8M</option>
              <option value="over8m">Above AED 8M</option>
            </select>

            {/* Handover Filter */}
            <select
              value={selectedHandover}
              onChange={(e) => setSelectedHandover(e.target.value)}
              className="px-2.5 py-1 bg-gray-100 text-dark text-[11px] font-technical uppercase font-bold tracking-wider focus:outline-none border-none"
            >
              <option value="All">Handover: Any</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2">
            <span className="text-dark/40 font-technical font-bold uppercase text-[10px] tracking-widest">
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1 bg-gray-100 text-dark text-[11px] font-technical uppercase font-bold tracking-wider focus:outline-none border-none"
            >
              <option value="newest">Featured Newest</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="roi">Highest Target ROI</option>
            </select>
            <span className="text-xs font-technical text-dark/40 ml-2">
              Showing <span className="font-bold text-dark">{filteredProjects.length}</span> launches
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        {filteredProjects.length === 0 ? (
          <div className="bg-white border border-gray-200 p-12 text-center max-w-lg mx-auto">
            <Building2 className="w-12 h-12 text-dark/20 mx-auto mb-4" />
            <h3 className="text-lg font-display font-black uppercase text-dark mb-2">No Launches Found</h3>
            <p className="text-xs text-dark/50 mb-6 font-light">
              No new launches matched your exact filter combination. Try adjusting your search query or reset the filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 bg-porsche-red text-white text-xs font-bold uppercase tracking-widest hover:bg-dark transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group bg-white border border-gray-200 hover:border-dark hover:shadow-2xl hover:shadow-dark/10 transition-all duration-300 flex flex-col overflow-hidden relative"
              >
                {/* Top Image Container */}
                <div 
                  className="relative h-64 overflow-hidden bg-gray-900 cursor-pointer"
                  onClick={() => {
                    setSelectedProject(project);
                    setActiveGalleryIndex(0);
                  }}
                >
                  <img 
                    src={project.heroImage} 
                    alt={project.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none">
                    <span className="px-2.5 py-1 bg-porsche-red text-white text-[9px] font-black uppercase tracking-[0.2em] shadow-md flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      {project.badge}
                    </span>
                    <span className="px-2.5 py-1 bg-dark/80 backdrop-blur-md text-white text-[10px] font-technical font-bold uppercase tracking-wider">
                      {project.city}
                    </span>
                  </div>

                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[10px] font-technical uppercase tracking-widest text-white/70 mb-0.5">
                      {project.developer}
                    </p>
                    <h3 className="text-xl font-display font-black uppercase tracking-tight text-white group-hover:text-porsche-red transition-colors line-clamp-1">
                      {project.name}
                    </h3>
                  </div>

                  {/* Gallery count indicator */}
                  {project.gallery && project.gallery.length > 1 && (
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/70 text-white text-[9px] font-technical font-bold uppercase tracking-wider">
                      +{project.gallery.length} Photos
                    </div>
                  )}
                </div>

                {/* Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Location & Property Type */}
                    <div className="flex items-center justify-between text-xs text-dark/60 mb-4 pb-3 border-b border-gray-100">
                      <div className="flex items-center gap-1.5 truncate max-w-[200px]">
                        <MapPin className="w-3.5 h-3.5 text-porsche-red shrink-0" />
                        <span className="truncate font-medium">{project.location}</span>
                      </div>
                      <span className="px-2 py-0.5 bg-gray-100 text-dark/70 text-[10px] font-technical font-bold uppercase tracking-wider shrink-0">
                        {project.type}
                      </span>
                    </div>

                    {/* Key Technical Specs Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4 bg-gray-50/80 p-3 border border-gray-100">
                      <div>
                        <p className="text-[9px] font-technical uppercase tracking-widest text-dark/40">Starting From</p>
                        <p className="text-sm font-technical font-extrabold text-porsche-red">{project.priceFormatted}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-technical uppercase tracking-widest text-dark/40">Handover Date</p>
                        <p className="text-sm font-technical font-extrabold text-dark">{project.handover}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-technical uppercase tracking-widest text-dark/40">Payment Plan</p>
                        <p className="text-xs font-technical font-bold text-dark/80">{project.paymentPlan}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-technical uppercase tracking-widest text-dark/40">Est. ROI</p>
                        <p className="text-xs font-technical font-bold text-emerald-600 flex items-center gap-0.5">
                          <TrendingUp className="w-3 h-3" />
                          {project.roiEstimate}
                        </p>
                      </div>
                    </div>

                    {/* Description preview */}
                    <p className="text-xs text-dark/60 font-light line-clamp-2 leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setActiveGalleryIndex(0);
                      }}
                      className="flex-1 py-2.5 bg-dark hover:bg-porsche-red text-white text-xs font-black tracking-widest uppercase transition-colors flex items-center justify-center gap-1.5 min-h-[44px]"
                    >
                      <span>Explore</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => openWhatsApp(project)}
                      className="px-3 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center justify-center min-h-[44px]"
                      title="Direct WhatsApp Allocation"
                      aria-label="Direct WhatsApp Allocation"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>

                    {onOpenCalculator && (
                      <button
                        onClick={() => onOpenCalculator(project.startingPrice)}
                        className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 text-dark transition-colors flex items-center justify-center min-h-[44px]"
                        title="Calculate Mortgage & ROI"
                        aria-label="Calculate Mortgage & ROI"
                      >
                        <Calculator className="w-4 h-4 text-dark/70" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-white w-full max-w-5xl max-h-[92vh] overflow-y-auto shadow-2xl border border-white/20 relative flex flex-col"
            >
              {/* Sticky Modal Header */}
              <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-porsche-red text-white text-[9px] font-black uppercase tracking-[0.2em]">
                    {selectedProject.badge}
                  </span>
                  <span className="text-xs font-technical uppercase font-bold text-dark/40">
                    ID #{selectedProject.id} • {selectedProject.city}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-dark hover:text-white flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
                  aria-label="Close details"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Gallery Carousel */}
              <div className="relative bg-black h-72 sm:h-96 md:h-[440px] overflow-hidden select-none">
                <img 
                  src={selectedProject.gallery[activeGalleryIndex] || selectedProject.heroImage} 
                  alt={selectedProject.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>

                {/* Gallery Navigation Controls */}
                {selectedProject.gallery.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveGalleryIndex((prev) => (prev > 0 ? prev - 1 : selectedProject.gallery.length - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-porsche-red text-white flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveGalleryIndex((prev) => (prev < selectedProject.gallery.length - 1 ? prev + 1 : 0))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-porsche-red text-white flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/80 text-white text-xs font-technical font-bold uppercase tracking-widest rounded-full">
                      {activeGalleryIndex + 1} / {selectedProject.gallery.length}
                    </div>
                  </>
                )}

                {/* Overlay Title */}
                <div className="absolute bottom-4 left-6 right-20 text-white pointer-events-none">
                  <p className="text-xs font-technical uppercase tracking-widest text-porsche-red font-bold">
                    Official Master Launch • {selectedProject.developer}
                  </p>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black uppercase tracking-tight text-white drop-shadow-md">
                    {selectedProject.name}
                  </h2>
                </div>
              </div>

              {/* Gallery Thumbnails Strip */}
              {selectedProject.gallery.length > 1 && (
                <div className="px-6 py-3 bg-gray-900 flex items-center gap-2 overflow-x-auto">
                  {selectedProject.gallery.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveGalleryIndex(idx)}
                      className={`relative w-16 h-12 shrink-0 border-2 overflow-hidden transition-all ${
                        activeGalleryIndex === idx ? 'border-porsche-red scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Modal Body Content */}
              <div className="p-6 md:p-8 space-y-8">
                {/* Stats & Pricing Banner */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-5 border border-gray-200">
                  <div>
                    <p className="text-[10px] font-technical uppercase tracking-widest text-dark/40 mb-1">Starting Price</p>
                    <p className="text-xl font-display font-black text-porsche-red">{selectedProject.priceFormatted}</p>
                    <p className="text-[10px] text-dark/50 mt-0.5">0% Agency Brokerage</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-technical uppercase tracking-widest text-dark/40 mb-1">Handover Schedule</p>
                    <p className="text-xl font-display font-black text-dark">{selectedProject.handover}</p>
                    <p className="text-[10px] text-dark/50 mt-0.5">Target Completion</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-technical uppercase tracking-widest text-dark/40 mb-1">Payment Plan</p>
                    <p className="text-xl font-display font-black text-dark">{selectedProject.paymentPlan}</p>
                    <p className="text-[10px] text-dark/50 mt-0.5">Direct Developer Terms</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-technical uppercase tracking-widest text-dark/40 mb-1">Estimated ROI</p>
                    <p className="text-xl font-display font-black text-emerald-600">{selectedProject.roiEstimate}</p>
                    <p className="text-[10px] text-dark/50 mt-0.5">High Rental Yield</p>
                  </div>
                </div>

                {/* Description & Developer Profile */}
                <div>
                  <h4 className="text-xs font-technical uppercase tracking-widest font-black text-dark/40 mb-3">
                    Project Overview & Architecture
                  </h4>
                  <p className="text-sm md:text-base text-dark/70 font-light leading-relaxed whitespace-pre-line">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Key Investment Highlights */}
                <div>
                  <h4 className="text-xs font-technical uppercase tracking-widest font-black text-dark/40 mb-3">
                    Rock Deals Executive Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedProject.highlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 bg-gray-50 border border-gray-100 text-xs font-medium text-dark/80">
                        <CheckCircle2 className="w-4 h-4 text-porsche-red shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                    <div className="flex items-start gap-2.5 p-3 bg-gray-50 border border-gray-100 text-xs font-medium text-dark/80">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>DLD Approved & RERA Escrow Account Guaranteed</span>
                    </div>
                  </div>
                </div>

                {/* Payment Plan Milestones */}
                {selectedProject.paymentMilestones && selectedProject.paymentMilestones.length > 0 && (
                  <div>
                    <h4 className="text-xs font-technical uppercase tracking-widest font-black text-dark/40 mb-3">
                      Payment Milestone Schedule
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {selectedProject.paymentMilestones.map((ms, idx) => (
                        <div key={idx} className="p-4 bg-white border border-gray-200 shadow-sm relative">
                          <span className="text-[10px] font-technical uppercase tracking-widest text-dark/40 block mb-1">
                            Milestone #{idx + 1}
                          </span>
                          <p className="text-sm font-bold text-dark mb-1">{ms.milestone}</p>
                          <span className="text-lg font-display font-black text-porsche-red">
                            {ms.percentage || 'On Schedule'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Amenities Grid */}
                {selectedProject.amenities && selectedProject.amenities.length > 0 && (
                  <div>
                    <h4 className="text-xs font-technical uppercase tracking-widest font-black text-dark/40 mb-3">
                      World-Class Amenities & Features
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                      {selectedProject.amenities.map((amenity, i) => (
                        <div key={i} className="px-3 py-2 bg-gray-50 border border-gray-100 text-xs font-medium text-dark/80 flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-porsche-red shrink-0" />
                          <span className="truncate">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Location & Address */}
                <div className="bg-gray-50 p-5 border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-technical uppercase tracking-widest text-dark/40 mb-1">Prime Address</p>
                    <p className="text-sm font-bold text-dark flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-porsche-red" />
                      {selectedProject.fullAddress}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-dark/60 font-light">Direct Developer Allocation</span>
                  </div>
                </div>

                {/* Social Share Section */}
                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs font-technical font-bold uppercase tracking-wider text-dark/50">
                    <Share2 className="w-4 h-4" />
                    <span>Share This Launch:</span>
                  </div>
                  <SocialShare 
                    title={`${selectedProject.name} by ${selectedProject.developer} - New Launch in ${selectedProject.location}`}
                    url={window.location.href}
                    description={`Exclusive launch: ${selectedProject.name} starting from ${selectedProject.priceFormatted}. Handover ${selectedProject.handover}. 0% Commission with Rock Deals.`}
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => {
                      onEnquire(`${selectedProject.name} (VIP Launch Allocation)`);
                      setSelectedProject(null);
                    }}
                    className="w-full sm:flex-1 py-4 bg-porsche-red hover:bg-dark text-white text-xs font-black tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2 min-h-[48px]"
                  >
                    <span>Request VIP Priority Allocation</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => openWhatsApp(selectedProject)}
                    className="w-full sm:w-auto px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black tracking-[0.15em] uppercase transition-colors flex items-center justify-center gap-2 min-h-[48px]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Instant WhatsApp VIP Desk</span>
                  </button>

                  {onOpenCalculator && (
                    <button
                      onClick={() => {
                        onOpenCalculator(selectedProject.startingPrice);
                        setSelectedProject(null);
                      }}
                      className="w-full sm:w-auto px-5 py-4 bg-gray-100 hover:bg-gray-200 text-dark text-xs font-technical font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 min-h-[48px]"
                    >
                      <Calculator className="w-4 h-4" />
                      <span>ROI Calculator</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default NewLaunchesView;
