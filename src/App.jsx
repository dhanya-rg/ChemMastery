import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, BookOpen, Award, Menu, X } from 'lucide-react';
import Balancer from './components/Balancer';
import PracticeMode from './components/PracticeMode';

function App() {
    const [activeTab, setActiveTab] = useState('balancer');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="min-h-screen bg-background text-text font-sans selection:bg-primary/30">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg">
                                <Beaker className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                                ChemMastery
                            </span>
                        </div>

                        <div className="hidden md:block">
                            <div className="flex items-baseline space-x-4">
                                <NavButton
                                    active={activeTab === 'balancer'}
                                    onClick={() => setActiveTab('balancer')}
                                    icon={<Beaker className="w-4 h-4" />}
                                >
                                    Balancer
                                </NavButton>
                                <NavButton
                                    active={activeTab === 'practice'}
                                    onClick={() => setActiveTab('practice')}
                                    icon={<BookOpen className="w-4 h-4" />}
                                >
                                    Practice
                                </NavButton>
                            </div>
                        </div>

                        <div className="md:hidden">
                            <button onClick={toggleMenu} className="p-2 rounded-md text-muted hover:text-white">
                                {isMenuOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden glass-panel border-t border-white/5"
                        >
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                <MobileNavButton
                                    active={activeTab === 'balancer'}
                                    onClick={() => { setActiveTab('balancer'); setIsMenuOpen(false); }}
                                >
                                    Balancer
                                </MobileNavButton>
                                <MobileNavButton
                                    active={activeTab === 'practice'}
                                    onClick={() => { setActiveTab('practice'); setIsMenuOpen(false); }}
                                >
                                    Practice
                                </MobileNavButton>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Main Content */}
            <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                    {activeTab === 'balancer' ? (
                        <motion.div
                            key="balancer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Balancer />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="practice"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <PracticeMode />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

const NavButton = ({ children, active, onClick, icon }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${active
                ? 'bg-primary/20 text-primary border border-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                : 'text-muted hover:text-white hover:bg-white/5'
            }`}
    >
        {icon}
        {children}
    </button>
);

const MobileNavButton = ({ children, active, onClick }) => (
    <button
        onClick={onClick}
        className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${active
                ? 'bg-primary/20 text-primary'
                : 'text-muted hover:text-white hover:bg-white/5'
            }`}
    >
        {children}
    </button>
);

export default App;
