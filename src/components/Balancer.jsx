import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { balanceEquation } from '../utils/chemistry';

const Balancer = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [isBalancing, setIsBalancing] = useState(false);

    const handleBalance = () => {
        if (!input.trim()) return;

        setIsBalancing(true);
        setError('');
        setResult(null);

        // Simulate a small delay for effect
        setTimeout(() => {
            const res = balanceEquation(input);
            if (res.error) {
                setError(res.error);
            } else {
                setResult(res);
            }
            setIsBalancing(false);
        }, 600);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleBalance();
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    Equation Balancer
                </h2>
                <p className="text-muted text-lg">
                    Enter a chemical equation and let us balance it for you.
                </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted">Chemical Equation</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="e.g. H2 + O2 -> H2O"
                            className="w-full bg-background/50 border border-white/10 rounded-xl px-6 py-4 text-xl font-mono focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner"
                        />
                        <button
                            onClick={handleBalance}
                            disabled={isBalancing}
                            className="absolute right-2 top-2 bottom-2 btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isBalancing ? (
                                <RefreshCw className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Balance <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>
                    <p className="text-xs text-muted pl-2">
                        Tip: Use standard chemical symbols. Case matters (e.g., 'Co' is Cobalt, 'CO' is Carbon Monoxide).
                    </p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-error/10 border border-error/20 rounded-xl flex items-center gap-3 text-error"
                    >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>{error}</p>
                    </motion.div>
                )}

                {result && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6"
                    >
                        <div className="p-6 bg-success/10 border border-success/20 rounded-xl text-center space-y-2">
                            <div className="flex items-center justify-center gap-2 text-success mb-2">
                                <CheckCircle2 className="w-6 h-6" />
                                <span className="font-bold">Balanced Successfully</span>
                            </div>
                            <div className="text-3xl font-mono font-bold text-white tracking-wide break-words">
                                {result.balanced.split('->').map((part, i) => (
                                    <span key={i}>
                                        {i > 0 && <span className="text-muted mx-2">→</span>}
                                        {part.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                <h3 className="font-medium text-muted mb-3">Reactants</h3>
                                <div className="space-y-2">
                                    {result.compounds.slice(0, result.compounds.length - result.balanced.split('->')[1].split('+').length).map((c, i) => (
                                        <div key={i} className="flex justify-between items-center">
                                            <span className="font-mono">{c}</span>
                                            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-bold">
                                                {result.coefficients[i]}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                <h3 className="font-medium text-muted mb-3">Products</h3>
                                <div className="space-y-2">
                                    {result.compounds.slice(result.compounds.length - result.balanced.split('->')[1].split('+').length).map((c, i) => {
                                        const offset = result.compounds.length - result.balanced.split('->')[1].split('+').length;
                                        return (
                                            <div key={i} className="flex justify-between items-center">
                                                <span className="font-mono">{c}</span>
                                                <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-bold">
                                                    {result.coefficients[offset + i]}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Balancer;
